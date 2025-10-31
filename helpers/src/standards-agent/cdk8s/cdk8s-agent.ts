import { KubernetesObject, loadAllYaml } from '@kubernetes/client-node';

import {
    Action,
    ActionError,
    ActionState,
    Agent,
    Workflow,
} from '@orbi-ts/core';
import { Cli } from '@orbi-ts/services';

import * as cdk8s from 'cdk8s';
import { mkdir, rm, writeFile } from 'fs/promises';
import { KubeApi } from '../../kubernetes/kubernetes-api.js';

export class Cdk8sAgent extends Agent implements cdk8s.IResolver {
    cli = new Cli();
    kubeApi: KubeApi;

    cdkApp: cdk8s.App;
    StackConstructor: typeof cdk8s.Chart;
    stack: cdk8s.Chart;
    apiObjects: Set<cdk8s.ApiObject> = new Set();

    static cronDefaultSettings = {
        activityFrequency: 60 * 1000,
    };

    IArgument: Agent['IArgument'] & {
        kubeConfig?: {
            from: {
                file?: string;
                cluster?: boolean;
            };
        };
        stackName: string;
        clusterName?: string;
    } & Partial<
            Record<
                'stackProps',
                Partial<ConstructorParameters<this['StackConstructor']>[2]>
            >
        >;

    IBag: Workflow['IBag'] & {
        stackName?: string;
    };

    IResult: any;

    identity() {
        const identity = {};
        identity['stackName'] = this.argument.stackName;
        if (this.argument.clusterName) {
            identity['clusterName'] = this.argument.clusterName;
        }
        return identity;
    }

    configFilePath: string;

    isProduced = false;

    readonly PING_INTERVAL = 60 * 1000;

    /**
     * Generate stack and synthesize.
     *
     * @returns promise
     */
    async produce() {
        // this process is synchronous
        if (this.isProduced) return;
        this.cdkApp = this.generateApp();
        this.stack = await this.generateStack();
        this.cdkApp.synth();
        this.isProduced = true;
    }

    resolve(context: cdk8s.ResolutionContext): void {
        this.apiObjects.add(context.obj);
        if (
            context.obj.metadata &&
            !context.obj.metadata.getLabel('orbits/stackName')
        ) {
            context.obj.metadata.addLabel(
                'orbits/stackName',
                this.argument.stackName || this.bag.stackName
            );
        }
    }

    /**
     * Generate the cdk8s app.
     * Useful in order to clear previous objects
     * @returns the app.
     */
    generateApp(): cdk8s.App {
        return new cdk8s.App({
            outdir: `/tmp/cdk8s/${this._id.toString()}`,
            resolvers: [this],
        });
    }

    /**
     * Generate the stack.
     *
     * @returns promise that resolves the stack or the stack.
     */
    generateStack(): this['stack'] | Promise<this['stack']> {
        return new this.StackConstructor(
            this.cdkApp,
            this.argument.stackName || this.bag.stackName,
            this.argument.stackProps
        );
    }

    async init() {
        try {
            await this.setKubeApi();
        } catch (error) {
            throw new ActionError(`Unable to configure Kube api: ${error}`);
        }
    }

    async setKubeApi() {
        this.kubeApi = new KubeApi(this.argument.kubeConfig);
    }

    /**
     * Define the workflow.
     *
     * There are two branches depending on deployment success
     *
     * - success:
     *   **deploy** -- *no failure* --> **prune previous chart objects** -> **save applied chart**
     *
     * - failure:
     *   **deploy** -- *failure* --> **rollback** -> **prune current chart objects**
     *
     * In case of error during rollback, pruning or chart saving, deployment will be left untouched.
     * If pruning or chart saving fails, then newly added agents configuration won't be saved,
     * but deployment will still be operational.
     */
    async defineUpdate() {
        let hasRollback, rollbackErr: boolean, Error;
        try {
            await this.do('Deploy', {
                dynamicAction: () => {
                    const deployAction = new Action();
                    deployAction.main = this.deployMain.bind(this);
                    deployAction.watcher = this.actionWatcher.bind(
                        this,
                        'deploy'
                    );
                    deployAction.cronActivity.frequency = 60 * 1000;
                    deployAction.dbDoc.delay = 15 * 60 * 1000;
                    return deployAction;
                },
            });
        } catch (err) {
            hasRollback = true;
            rollbackErr = err;
            await this.do('Rollback', {
                dynamicAction: () => {
                    const rollbackAction = new Action();
                    rollbackAction.main =
                        this.rollbackDeploymentMain.bind(this);
                    rollbackAction.watcher = this.actionWatcher.bind(
                        this,
                        'rollback'
                    );
                    rollbackAction.cronActivity.frequency = 60 * 1000;
                    rollbackAction.dbDoc.delay = 15 * 60 * 1000;
                    rollbackAction.setRepeat({ [ActionState.ERROR]: 2 });
                    return rollbackAction;
                },
            });
        } finally {
            await this.do('Prune', {
                dynamicAction: () => {
                    const pruneAction = new Action();
                    pruneAction.main = this.pruneMain.bind(this, hasRollback);
                    pruneAction.setRepeat({ [ActionState.ERROR]: 2 });
                    return pruneAction;
                },
            });
        }

        if (hasRollback) {
            // Reject with error if rollback was set
            // Action will be in error
            throw new Error(rollbackErr);
        }

        await this.repeatDo(
            'StoreNewChart',
            this.storeNewChartMain.bind(this),
            { [ActionState.ERROR]: 2 }
        );
    }

    async defineUninstall() {
        await this.do('DeleteStack', {
            dynamicAction: () => {
                const pruneAction = new Action();
                pruneAction.main = this.pruneMain.bind(this);
                //refresh the production of the stack;
                this.isProduced = false;
                //define an empty stack and prune from this.
                this.generateStack = () => {
                    //empty stack
                    return new cdk8s.Chart(
                        this.cdkApp,
                        this.argument.stackName || this.bag.stackName
                    );
                };
                pruneAction.setRepeat({ [ActionState.ERROR]: 2 });

                return pruneAction;
            },
        });
        await this.do('DeleteSecret', () => {
            return this.kubeApi.deleteSecret(this.genSecretName());
        });
        await this.do('ResetOutput', () => {
            this.agentDbDoc.output = {};
            return this.agentDbDoc.save();
        });
    }

    /**
     * Format secret name to be used for
     * storing applied chart.
     *
     * Secret name is `orbits.${this.argument.stackName}`
     *
     * @returns the secret name
     */
    private genSecretName(): string {
        return `orbits.deployment.${this.argument.stackName}`;
    }

    /**
     * Retrieve previous chart that is stored in yaml format
     * in a kubernetes secret on cluster.
     *
     * @returns promise that resolves a string
     */
    private async retrievePreviousChart(): Promise<string> {
        return this.kubeApi
            .checkSecretExists(this.genSecretName())
            .then((doesExist) =>
                doesExist
                    ? this.kubeApi
                          .getSecret(this.genSecretName())
                          .then((secretData) => secretData.chart)
                    : ''
            );
    }

    /**
     * Prune deployment.
     *
     * Two cases depending on provided `rollback` boolean:
     *
     * - `false`, normal deployment:
     *
     *   Prune all objects (except PersistentVolumeClaim and Namespaces)
     *   that were applied during previous deployment.
     *   - Get applied chart from secret
     *     and current chart by synthesizing current app.
     *   - Call kube api delete for all objects
     *     from **applied** chart that are not in **current** one.
     *
     * - `true`, rollback deployment:
     *
     *   Prune all objects (except PersistentVolumeClaim and Namespaces)
     *   that were applied during current deployment.
     *   - Get applied chart from secret
     *     and current chart by synthesizing current app.
     *   - Call kube api delete for all objects
     *     from **current** chart that are not in **applied** one.
     *
     * NOTE: do not delete PersistentVolumeClaim nor Namespaces
     *
     * @param rollback whether we need to prune a rollback
     * @returns promise
     */
    private async pruneMain(rollback: boolean): Promise<any> {
        // do not delete PersistentVolumeClaim nor Namespaces for now
        const pruneExclusions = ['PersistentVolumeClaim', 'Namespace'];
        const [previousChart, newChart] = await Promise.all([
            this.retrievePreviousChart(),
            Promise.resolve(this.produce()).then(() => this.cdkApp.synthYaml()),
        ]);
        const sourceChart = loadAllYaml(rollback ? newChart : previousChart);
        const targetChart = loadAllYaml(rollback ? previousChart : newChart);
        // nothing to prune if sourceChart is empty
        if (!sourceChart.length) {
            this.internalLog('No objects to prune');
            return ActionState.SUCCESS;
        }
        const objectsToDelete = sourceChart.filter((srcObj) => {
            if (pruneExclusions.includes(srcObj.kind)) {
                this.internalLog(
                    `Ignoring ${srcObj.kind} ${srcObj.metadata.name} in namespace ${srcObj.metadata.namespace}`
                );
                return false;
            }
            for (const tgtObj of targetChart) {
                if (
                    srcObj.kind === tgtObj.kind &&
                    srcObj.metadata.name == tgtObj.metadata.name &&
                    srcObj.metadata.namespace == tgtObj.metadata.namespace
                ) {
                    return false;
                }
            }
            return true;
        });
        if (!objectsToDelete.length) {
            // nothing to prune, return SUCCESS
            this.internalLog('No objects to prune');
            return ActionState.SUCCESS;
        }
        // only log errors and always return SUCCESS
        return Promise.all(
            objectsToDelete.map((obj: KubernetesObject) =>
                this.kubeApi.deleteObject(obj).catch((err) => {
                    // if the object is not there anymore
                    // consider the request as successful
                    // so don't log anything
                    if (err.statusCode === 404) return;
                    this.internalLog(
                        `Error deleting object: ${err.body.message}`
                    );
                })
            )
        ).then(() => ActionState.SUCCESS);
    }

    /**
     * Store newly applied chart in yaml format
     * in a kubernetes secret on cluster.
     *
     * Create the secret if it doesn't exist.
     *
     * @returns promise
     */
    private async storeNewChartMain(): Promise<any> {
        try {
            this.cdkApp.node.findChild(
                this.argument.stackName || this.bag.stackName
            );
        } catch {
            await this.generateStack();
        }
        return (
            this.kubeApi
                .setSecret(this.genSecretName(), {
                    chart: this.cdkApp.synthYaml(),
                })
                // resolved promise will account for a SUCCESS, but since result will
                // be saved to database, just return nothing to prevent serialization error
                // with setSecret result
                .then(() => {})
                .catch((err) => {
                    this.internalLog(
                        `Unable to store new chart: ${err.body.message}`
                    );
                    throw err;
                })
        );
    }

    /**
     * Deploy stack to kubernetes.
     *
     * @returns promise
     */
    async deployMain(): Promise<ActionState> {
        const pingInterval = setInterval(() => {
            // just to mention that process is still live every minute
            this.dbDoc.stateUpdatedAt = new Date();
            this.dbDoc.save();
        }, this.PING_INTERVAL);
        return this.produce()
            .then(async () => {
                await this.writeConfigFile();
                return this.kubeCommand(
                    'apply',
                    this.argument.stackName || 'orbits-stack',
                    this.cdkApp.outdir
                );
            })
            .then(() => ActionState.IN_PROGRESS)
            .finally(() => {
                clearInterval(pingInterval);
                this.deleteConfigFile().catch(() => {});
                return this.deleteOutdir().catch(() => {});
            });
    }

    /**
     * Rollback failed deployment.
     *
     * @returns promise
     */
    async rollbackDeploymentMain(): Promise<void | ActionState> {
        const pingInterval = setInterval(() => {
            // just to mention that process is still live every minute
            this.dbDoc.stateUpdatedAt = new Date();
            this.dbDoc.save();
        }, this.PING_INTERVAL);
        return this.retrievePreviousChart()
            .then(async (previousChart) => {
                await this.writeConfigFile();
                if (!previousChart.length) {
                    // if previousChart is null, then delete what was just applied
                    return this.kubeCommand(
                        'delete',
                        this.argument.stackName,
                        this.cdkApp.outdir
                    );
                }
                const filePath = await this.writeRollbackFile(previousChart);
                return this.kubeCommand(
                    'apply',
                    this.argument.stackName,
                    filePath
                );
            })
            .then(() => ActionState.IN_PROGRESS)
            .finally(() => {
                clearInterval(pingInterval);
                this.deleteConfigFile().catch(() => {});
                return this.deleteOutdir().catch(() => {});
            });
    }

    /**
     * Watcher for the `deploy` and `rollback` actions.
     *
     * In `deploy` case, watch current objects,
     * else in `rollback` case, watch previous charts objects.
     *
     * @param type the type of the action that is watched
     * @returns promise
     */
    async actionWatcher(type: 'deploy' | 'rollback'): Promise<ActionState> {
        const apiObjects = await (type === 'deploy'
            ? this.produce().then(() => this.apiObjects)
            : this.retrievePreviousChart().then((chart) => loadAllYaml(chart)));

        const promises = [];
        for (const apiObject of apiObjects) {
            let p: Promise<ActionState>;
            let group: string, version: string, ns: string;
            const objName = apiObject.name || apiObject.metadata.name;
            switch (apiObject.kind) {
                case 'Deployment':
                    p = this.kubeApi.client
                        .readNamespacedDeployment({
                            name: objName,
                            namespace:
                                apiObject.metadata.namespace || 'default',
                        })
                        .then(
                            (deployment) => {
                                const progressingCondition =
                                    deployment.status?.conditions?.find(
                                        (cond) => cond.type === 'Progressing'
                                    );
                                if (!deployment.status) {
                                    return ActionState.IN_PROGRESS;
                                }
                                if (!deployment.status.updatedReplicas) {
                                    deployment.status.updatedReplicas = 0;
                                }
                                if (!deployment.status.replicas) {
                                    deployment.status.replicas = 0;
                                }
                                if (!deployment.status.availableReplicas) {
                                    deployment.status.availableReplicas = 0;
                                }
                                if (
                                    deployment.metadata?.generation <=
                                    deployment.status.observedGeneration
                                ) {
                                    if (
                                        progressingCondition?.reason ===
                                        'ProgressDeadlineExceeded'
                                    ) {
                                        this.internalLog(
                                            `deployment ${objName} exceeded its progress deadline`
                                        );
                                        return ActionState.ERROR;
                                    }
                                    if (
                                        deployment.status.updatedReplicas <
                                        deployment.spec?.replicas
                                    ) {
                                        this.internalLog(
                                            `deployment ${objName} not yet complete: ` +
                                                `${deployment.status?.updatedReplicas ?? 0} out of ` +
                                                `${deployment.spec.replicas ?? 0} new replicas have been updated`
                                        );
                                        return ActionState.IN_PROGRESS;
                                    }
                                    if (
                                        deployment.status.replicas >
                                        deployment.status.updatedReplicas
                                    ) {
                                        this.internalLog(
                                            `deployment ${objName} not yet complete: ` +
                                                `${(deployment.status?.replicas ?? 0) - (deployment.status?.updatedReplicas ?? 0)} ` +
                                                `old replicas are pending termination`
                                        );
                                        return ActionState.IN_PROGRESS;
                                    }
                                    if (
                                        deployment.status.availableReplicas <
                                        deployment.status.updatedReplicas
                                    ) {
                                        this.internalLog(
                                            `deployment ${objName} not yet complete: ` +
                                                `${deployment.status?.availableReplicas ?? 0} of ` +
                                                `${deployment.status?.updatedReplicas ?? 0} updated replicas are available`
                                        );
                                        return ActionState.IN_PROGRESS;
                                    }
                                    this.internalLog(
                                        `deployment ${objName} complete`
                                    );
                                    return ActionState.SUCCESS;
                                }
                                return ActionState.IN_PROGRESS;
                            },
                            (err) => {
                                // if there is an error, (for example 404), we consider that the deployment is not ok
                                // as there is a timeout, if the error persists, the action will fail
                                // we could be more specific here (e.g. 404 ==> ActionState.ERROR ? 404 ==> ActionState.SLEEPING ?)
                                this.internalLogError(err);
                                return ActionState.IN_PROGRESS;
                            }
                        );
                    promises.push(p);
                    break;
                case 'ManagedCertificate':
                    [group, version] = apiObject.apiVersion.split('/');
                    ns = apiObject.metadata.namespace || 'default';
                    p = this.kubeApi.customObjectApi
                        .getNamespacedCustomObject({
                            group,
                            version,
                            namespace: ns,
                            plural: 'managedcertificates',
                            name: apiObject.name || apiObject.metadata.name,
                        })
                        .then((ManagedCertificate) =>
                            ManagedCertificate?.status?.certificateStatus ===
                            'Active'
                                ? ActionState.SUCCESS
                                : ActionState.IN_PROGRESS
                        );
                    promises.push(p);
                    break;
                case 'Certificate':
                    [group, version] = apiObject.apiVersion.split('/');
                    ns = apiObject.metadata.namespace || 'default';
                    p = this.kubeApi.customObjectApi
                        .getNamespacedCustomObject({
                            group,
                            version,
                            namespace: ns,
                            plural: 'certificates',
                            name: apiObject.name || apiObject.metadata.name,
                        })
                        .then((certificate) => {
                            const readyCondition =
                                certificate.status?.conditions?.find(
                                    (cond) => cond.type === 'Ready'
                                );
                            if (
                                readyCondition.reason === 'Ready' &&
                                readyCondition.status === 'True'
                            ) {
                                this.internalLog(
                                    `certificate ${objName} ready`
                                );
                                return ActionState.SUCCESS;
                            }
                            return ActionState.IN_PROGRESS;
                        });
                    promises.push(p);
                    break;
                default:
                    break;
            }
        }
        const results = await Promise.all(promises);
        this.internalLog('Promises over -- getting results');

        let result = ActionState.SUCCESS;
        for (const status of results) {
            if (status == ActionState.IN_PROGRESS) {
                result = ActionState.IN_PROGRESS;
            }
            if (status == ActionState.ERROR) {
                this.internalLogError(new Error('Got an error, terminating'));
                return ActionState.ERROR;
            }
        }
        return result;
    }

    private async writeConfigFile() {
        this.configFilePath = `/tmp/kube/${this._id.toString()}.yaml`;
        await mkdir('/tmp/kube', { recursive: true });
        return writeFile(
            this.configFilePath,
            this.kubeApi.config.exportConfig()
        );
    }

    private deleteConfigFile() {
        if (this.configFilePath) {
            return rm(this.configFilePath, { force: true });
        }
        return Promise.resolve();
    }

    /**
     * Write chart as yaml in file.
     *
     * @param chart the chart to write
     * @returns promise that resolves with the created file path
     */
    private async writeRollbackFile(chart: string) {
        const rollbackFolderPath = `${this.cdkApp.outdir}/rollback`;
        const rollbackPath = `${rollbackFolderPath}/rollback.yaml`;

        await mkdir(rollbackFolderPath, { recursive: true });
        return writeFile(rollbackPath, chart).then(() => rollbackPath);
    }

    /**
     * Delete outdir folder.
     * As rollback folder is in outdir, will be cleared as well.
     *
     * @returns promise
     */
    private deleteOutdir() {
        return rm(this.cdkApp.outdir, { force: true, recursive: true });
    }

    /**
     * Run kubectl command.
     *
     * @param cmd command to run
     * @param stackName name of the stack to be used with selector option
     * @param file folder or file with yaml to apply
     * @returns promise
     */
    kubeCommand(cmd: 'apply' | 'delete', stackName: string, file: string) {
        return this.cli.command('kubectl', [
            cmd,
            '--kubeconfig',
            this.configFilePath,
            '-f',
            file,
            // `--selector=stackName=${stackName}`,
        ]);
    }
}
