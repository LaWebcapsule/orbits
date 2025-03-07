import {
    AwsCdkCli,
    ICloudAssemblyDirectoryProducer,
} from '@aws-cdk/cli-lib-alpha';
import { Action, ActionApp, ActionState } from '@wbce/orbits-core';
import { Cli } from '@wbce/services';
import * as cdk from 'aws-cdk-lib';
import { existsSync, readFileSync } from 'fs';
import { Transform } from 'stream';
import { DockerExecutor, PublicRegistry } from '../../executors/index.js';
import { CdkHelper } from './cdk-helper.js';

export class CdkAction
    extends Action
    implements ICloudAssemblyDirectoryProducer
{
    cli = new Cli();
    cdkApp = new cdk.App();
    StackConstructor: typeof cdk.Stack;
    stack: cdk.Stack;

    static cronDefaultSettings = {
        activityFrequency: 60 * 1000,
    };

    commandName: 'deploy' | 'bootstrap' | 'destroy';

    executor = new DockerExecutor({
        registry: new PublicRegistry('node', '16'),
    });

    IArgument: {
        cdkContext?: {
            [k: string]: any;
        };
        cdkVersion?: string;
        stackName?: string;
        stackProps?: any & cdk.StackProps;
    };

    IBag: {
        stackName?: string;
        env?: cdk.StackProps['env'];
    };

    IResult: any;

    async produce(context: Record<string, any>) {
        this.cdkApp = new cdk.App({ context });
        this.generateStack();
        this.stack.addMetadata('actionId', this._id.toString());
        return this.cdkApp.synth().directory;
    }

    generateStack() {
        this.stack = new this.StackConstructor(
            this.cdkApp,
            this.argument.stackName || this.bag.stackName,
            this.argument.stackProps
        );
    }

    init() {
        this.setContextFromArgument();
        return Promise.resolve();
    }

    main() {
        const cdkCli = AwsCdkCli.fromCloudAssemblyDirectoryProducer(this);
        let cdkError = '';
        let pingInterval = setInterval(() => {
            //just to mention that process is still live
            //every minute
            this.dbDoc.stateUpdatedAt = new Date();
            this.dbDoc.save();
        }, 60 * 1000);
        return cdkCli
            .synth({
                stacks: [this.argument.stackName || this.bag.stackName],
                exclusively: true,
            })
            .then(() => {
                const cdkVersion = this.argument.cdkVersion || 'latest';
                return this.cli.command('npm', [
                    'install',
                    `aws-cdk@${cdkVersion}`,
                ]);
            })
            .then(() => {
                let commandArguments: string[] = [this.commandName];
                switch (this.commandName) {
                    case 'bootstrap':
                        if (this.argument.stackProps?.env) {
                            const env =
                                this.argument.stackProps.env || this.bag.env;
                            commandArguments = [
                                ...commandArguments,
                                `aws://${env.account}/${env.region}`,
                            ];
                        }
                        break;

                    case 'deploy':
                        commandArguments = [
                            ...commandArguments,
                            '--method=direct',
                            '--exclusively',
                        ];
                        break;

                    case 'destroy':
                        commandArguments = [
                            ...commandArguments,
                            '--exclusively',
                            '--force',
                        ];
                        break;

                    default:
                        break;
                }
                commandArguments = [
                    ...commandArguments,
                    '--no-interactive',
                    '--require-approval=never',
                    '--app',
                    this.cdkApp.outdir,
                    this.argument.stackName || this.bag.stackName,
                ];
                let lines = [];
                let lastLine = '';
                const streamError = new Transform({
                    decodeStrings: true,
                    transform(chunk, encoding, callback) {
                        lastLine += chunk.toString();
                        lines = lastLine.split('\n');
                        for (const line of lines) {
                            if (line.includes('failed: Error')) {
                                cdkError = line;
                            }
                        }
                        lastLine = lines.pop();
                        callback(undefined, chunk);
                    },
                });
                streamError.pipe(process.stderr);
                return this.cli.command('npx', ['cdk', ...commandArguments], {
                    stderr: streamError,
                });
            })
            .catch((err) => {
                if (
                    cdkError.includes('ValidationError') &&
                    cdkError.includes('No updates are to be performed')
                ) {
                    // we consider this is a success
                    this.internalLog(
                        'caught error, not considered as a real error'
                    );
                    return;
                }
                if (cdkError) {
                    throw new Error(cdkError);
                } else {
                    throw err;
                }
            })
            .then(() => {
                if (existsSync(`./cdk.context.json`)) {
                    this.result = JSON.parse(
                        readFileSync(`./cdk.context.json`).toString()
                    );
                }
                return ActionState.SUCCESS;
            })
            .finally(() => {
                clearInterval(pingInterval);
            });
    }

    setContextFromArgument() {
        for (const k in this.argument.cdkContext) {
            this.cdkApp.node.setContext(k, this.argument.cdkContext[k]);
        }
    }

    watcher(): Promise<ActionState> {
        const opts = {};
        opts['region'] =
            this.argument.stackProps?.env.region || this.bag.env?.region;
        const cdkHelper = new CdkHelper(opts);
        return cdkHelper
            .describeStackFromName(
                this.argument.stackName || this.bag.stackName
            )
            .then((stackDescription) => {
                const lastDeployTime =
                    stackDescription.LastUpdatedTime ||
                    stackDescription.CreationTime; //after the first deploy of a stack, there is no LastUpdatedTime
                if (
                    lastDeployTime.getTime() <= this.dbDoc.createdAt.getTime()
                ) {
                    //it has not begin
                    return ActionState.SLEEPING;
                }
                if (stackDescription.StackStatus.includes('IN_PROGRESS')) {
                    return ActionState.IN_PROGRESS;
                }
                if (stackDescription.StackStatus.includes('ROLLBACK')) {
                    return ActionState.ERROR;
                }
                if (stackDescription.StackStatus.includes('COMPLETE')) {
                    return ActionState.SUCCESS;
                }
                return ActionState.UNKNOWN;
            })
            .catch((err: Error) => {
                if (
                    err.message.includes('Stack with id') &&
                    err.message.includes('doest not exist')
                ) {
                    return ActionState.SLEEPING;
                }
                throw err;
            });
    }
}

/**
 * @deprecated use CdkBootstrapAction
 */
export class CdkBoostrapAction extends CdkAction {
    commandName = 'bootstrap' as 'bootstrap';
}

export class CdkBootstrapAction extends CdkAction {
    commandName = 'bootstrap' as 'bootstrap';
}

export class CdkDeployAction extends CdkAction {
    commandName = 'deploy' as 'deploy';
    static defaultDelays = {
        [ActionState.EXECUTING_MAIN]: 10 * 60 * 1000,
        [ActionState.IN_PROGRESS]: 10 * 60 * 1000,
    };
    RollBackAction = CdkDestroyAction;
}

export class CdkDestroyAction extends CdkAction {
    commandName = 'destroy' as 'destroy';
    static defaultDelays = {
        [ActionState.EXECUTING_MAIN]: 10 * 60 * 1000,
        [ActionState.IN_PROGRESS]: 10 * 60 * 1000,
    };
}

export class CdkHelperApp extends ActionApp {
    declare = [
        CdkBoostrapAction,
        CdkBootstrapAction,
        CdkDeployAction,
        CdkDestroyAction,
    ];
}
