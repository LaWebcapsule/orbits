import EventEmitter from 'events';
import { resolve } from 'import-meta-resolve';
import { createRequire } from 'module';
import mongoose from 'mongoose';
import path from 'path';
import precinct from 'precinct';
import { fileURLToPath, pathToFileURL } from 'url';
import * as winston from 'winston';
import { Action, ActionSchemaInterface } from '../../index.js';
import { ActionCron } from '../action-job.js';
import { ActionError } from '../error/error.js';
import { LogSchemaInterface } from '../models/log.js';
import { ResourceSchemaInterface } from '../models/resource.js';
import { actionKind, actionKindSymbols } from './action-kind.js';
import { RuntimeDb, setDbConnection } from './db-connection.js';
import { getEnv } from './get-env.js';
import { defaultLogger, setLogger } from './logger.js';

/**
 * Describes how the runtime can be configured.
 */
export interface RuntimeConfig {
    /** db configuration */
    name?: string;
    db?: RuntimeDb;
    /** log driver configuration */
    logger?: winston.Logger;
    workers?: {
        quantity: number;
        filter?: Object;
    };
    autostart?: boolean;
    notActive?: boolean;
    entrypoint?: string;
}

export const ACTION_TAG = actionKindSymbols.get(actionKind.ACTION);

export class ActionRuntime {
    static activeRuntime: ActionRuntime;

    static runtimes: ActionRuntime[] = [];

    static resolveBootstrap;
    static rejectBootstrap;
    static waitForActiveRuntime = new Promise((resolve, reject) => {
        ActionRuntime.resolveBootstrap = resolve;
        ActionRuntime.rejectBootstrap = reject;
    });
    static bootstrapPath: string;

    private actionsRegistry = new Map<string, typeof Action>();
    private invertedActionsRegistry = new Map<typeof Action, string>();
    static importRuntimeConfig;

    logger = defaultLogger;

    imports: (typeof ActionRuntime)[] = [];
    declare: (typeof Action)[] = [];

    numberOfWorker = 3;

    /**
     * Used by ActionCron to
     * filter actions using their `filter` field
     */
    actionFilter?: Object;

    db: RuntimeDb = {
        mongo: {
            url: 'mongodb://localhost:27017/actions',
        },
    };

    ActionModel: mongoose.Model<ActionSchemaInterface>;
    ResourceModel: mongoose.Model<ResourceSchemaInterface<any, any>>;
    LogModel: mongoose.Model<LogSchemaInterface>;

    bootstrapPath: string;

    constructor(private opts?: RuntimeConfig) {
        if (opts?.logger) {
            this.logger = opts.logger;
        }
        if (opts?.db) {
            this.db = opts.db;
        }
        if (opts?.workers) {
            this.numberOfWorker = opts?.workers.quantity;
            this.actionFilter = opts?.workers.filter;
        }
        if (!ActionRuntime.activeRuntime) {
            ActionRuntime.activeRuntime = this;
        }
        ActionRuntime.runtimes.push(this);
        global.orbitsRuntimes = [...(global.orbitsRuntimes || []), this];
        if (!global.orbitsRuntimeEvent) {
            global.orbitsRuntimeEvent = new EventEmitter();
        }
        this.bootstrapPath = opts?.entrypoint;
        if (!opts?.entrypoint) {
            this.bootstrapPath = process.argv[1];
        }
        this.bootstrap();
        global.orbitsRuntimeEvent.emit('runtime', this);
    }

    /**
     * Register action in App registries.
     *
     * @param action
     */
    private registerAction(action: typeof Action) {
        let [ref, ...previousRefs] = Array.isArray(action.permanentRef)
            ? action.permanentRef
            : [action.permanentRef];
        [ref, ...previousRefs, action.name].map(
            (ref) => ref && this.actionsRegistry.set(ref, action)
        );
        this.invertedActionsRegistry.set(action, ref || action.name);
    }

    getActionFromRegistry(actionRef: string) {
        return this.actionsRegistry.get(actionRef);
    }

    getActionRefFromRegistry(action: typeof Action) {
        return this.invertedActionsRegistry.get(action);
    }

    getActionRefFromCtr(action: typeof Action) {
        let [ref, ...previousRefs] = Array.isArray(action.permanentRef)
            ? action.permanentRef
            : [action.permanentRef];
        return ref || action.name;
    }

    async scanModuleImport(moduleImport) {
        let hasAction = false;
        for (const key in moduleImport) {
            const value = moduleImport[key];
            if (value?.[ACTION_TAG]) {
                this.logger.debug(`registering ${key}`);
                this.registerAction(value);
                hasAction = true;
            }
        }
        return hasAction;
    }

    importedFiles = new Set<string>();

    private listDependenciesOfFile(pathFile: string) {
        let deps: string[];
        if (!path.extname(pathFile)) {
            //probably using commonjs here : try to get exact path file
            const require = createRequire(import.meta.url);
            pathFile = require.resolve(pathFile);
        }
        this.logger.debug(`reading ${pathFile}`);
        try {
            deps = precinct.paperwork(pathFile, {
                includeCore: false,
            });
        } catch (err) {
            if (err.code === 'ENOENT') {
                this.logger.debug(
                    `cannot read ${pathFile} ; fallback to ts extension`
                );
                try {
                    deps = precinct.paperwork(pathFile.replace('.js', '.ts'), {
                        includeCore: false,
                        ts: {
                            skipTypeImports: true,
                        },
                        tsx: {
                            skipTypeImports: true,
                        },
                    } as any);
                } catch (err2) {
                    this.logger.debug(
                        `cannot read ts extension neither ; got ${err2}`
                    );
                    throw err;
                }
            } else {
                throw err;
            }
        }
        return deps;
    }

    async recursiveImport(pathFile: string) {
        this.logger.debug(`dealing with ${pathFile}`);
        const deps = this.listDependenciesOfFile(pathFile);

        const moduleImport = await import(pathFile);
        await this.scanModuleImport(moduleImport);

        const baseDir = path.dirname(pathFile);
        this.logger.debug(`found deps: ${deps}`);

        for (const file of deps) {
            let importPath: string;
            if (file.startsWith('.')) {
                //import another file in same module
                importPath = path.join(baseDir, file);
            } else {
                //import an npm module
                const url = await resolve(file, pathToFileURL(pathFile) as any);
                importPath = fileURLToPath(url);
            }

            if (this.importedFiles.has(importPath)) {
                continue;
            }
            this.importedFiles.add(importPath);

            this.logger.debug(`exploring dep: ${file}`);

            if (file.startsWith('.')) {
                //import another file in same module
                await this.recursiveImport(importPath);
            } else {
                //import an npm module
                const moduleImport = await import(importPath);
                if (await this.scanModuleImport(moduleImport)) {
                    await this.recursiveImport(importPath);
                }
            }
        }
    }

    rejectBootstrap;
    resolveBootstrap;
    waitForBootstrap = new Promise((resolve, reject) => {
        this.rejectBootstrap = reject;
        this.resolveBootstrap = resolve;
    });
    bootstrap() {
        const isActiveRuntime = ActionRuntime.activeRuntime === this;
        if (isActiveRuntime) {
            setLogger(this);
        }
        if (isActiveRuntime && !(this.opts?.autostart === false)) {
            setDbConnection(this);
            return this.recursiveImport(this.bootstrapPath)
                .then(() => {
                    for (let i = 0; i < this.numberOfWorker; i++) {
                        new ActionCron(this.actionFilter);
                    }
                })
                .then(() => {
                    this.resolveBootstrap();
                    ActionRuntime.resolveBootstrap();
                });
        } else {
            return Promise.resolve([
                ActionRuntime.activeRuntime.recursiveImport(this.bootstrapPath),
                //this.recursiveImport(this.bootstrapPath)
            ])
                .then(() => {
                    return ActionRuntime.waitForActiveRuntime;
                })
                .then(() => {
                    this.resolveBootstrap();
                });
        }
    }

    setLogger(logger: winston.Logger) {
        this.logger = logger;
        setLogger(this);
    }

    static bootstrap(config: RuntimeConfig) {
        new ActionRuntime(config);
    }

    static async getActiveRuntime(
        opts = { timeout: 60 * 1000 }
    ): Promise<ActionRuntime> {
        return new Promise((resolve, reject) => {
            let activeRuntime, isResolved;
            setTimeout(() => {
                if (!activeRuntime && !isResolved) {
                    isResolved = true;
                    reject(
                        new ActionError('no active app found ; reached timeout')
                    );
                }
            }, opts.timeout);
            this.waitForActiveRuntime.then(() => {
                if (!isResolved) {
                    resolve(this.activeRuntime);
                }
            });
        });
    }

    // // ***************
    // // CRUD operations
    // // ***************

    // export class CRUD {
    // /**
    //  *
    //  * @param action
    //  * @param args
    //  */
    // static async run(actionRef: string, args: JSONObject): Promise<Action> {
    //     const ActionCtr =
    //         ActionRuntime.activeRuntime.getActionFromRegistry(actionRef);
    //     if (!ActionCtr) throw Error(`Action ${actionRef} not found`);
    //     const action = new ActionCtr().setArgument(args);
    //     await action.save();
    //     return action;
    // }

    // /**
    //  * Get action
    //  *
    //  * @param actionId
    //  * @param getContainer get containing workflow(s) state if any
    //  */
    // static async get(
    //     actionId: string,
    //     filter: {},
    //     getContainer: boolean = false
    // ): Promise<any> {
    //     let actionDb = await ActionRuntime.activeRuntime.ActionModel.findOne({
    //         _id: actionId,
    //         //filter: filter,
    //     });
    //     // let action = await Action.constructFromDb(actionDb);
    //     if (!getContainer) return actionDb;

    //     const results = [actionDb];
    //     // get parent workflows
    //     while (actionDb.workflowId) {
    //         actionDb = await ActionRuntime.activeRuntime.ActionModel.findOne({
    //             _id: actionDb.workflowId,
    //             filter: filter,
    //         });
    //         results.push(actionDb);
    //     }

    //     return results;
    // }

    // /**
    //  * List all actions in database (non utilitary ones by default)
    //  * @param filters type=workflow/action/resource, state=STATE and other filters…
    //  */
    // static async list(
    //     filters: {
    //         type?: string;
    //         state?: ActionState;
    //     } = {}
    // ) {
    //     const filter = {} as { state?: ActionState };
    //     if (filters.state) filter.state = filters.state;
    //     // other filters
    //     return await ActionRuntime.activeRuntime.ActionModel.find(filter);
    // }

    // /**
    //  * List all available actions from runtime registry
    //  *
    //  * Action => only Actions
    //  * Workflows => only Workflows
    //  * Resources => only Resources
    //  *
    //  * @param filters type=workflow/action/resource, state=STATE and other filters…
    //  */
    // static async listFromRegistry(
    //     kind?: actionKind,
    //     returnConstructor: boolean = false
    // ) {
    //     await ActionRuntime.waitForActiveRuntime;
    //     const actions = [];
    //     ActionRuntime.activeRuntime["actionsRegistry"].forEach((value, key) => {
    //         if (!kind) actions.push(returnConstructor ? value : key);
    //         // order is important as broader types have inherited tags
    //         for (const tagKind of [
    //             actionKind.RESOURCE,
    //             actionKind.RESOURCE_CONTROLLER,
    //             actionKind.COALESCING_WORKFLOW,
    //             actionKind.WORKFLOW,
    //             actionKind.ACTION,
    //         ]) {
    //             if (value[actionKindSymbols.get(tagKind)]) {
    //                 if (kind === tagKind)
    //                     actions.push(returnConstructor ? value : key);
    //                 break;
    //             }
    //         }
    //     });
    //     return actions;
    // }

    // /**
    //  * pause the action (useful for workflows)
    //  * @param actionId
    //  * @param duration in seconds
    //  */
    // static async pause(actionId: string, duration?: number) {
    //     let actionDb = await ActionRuntime.activeRuntime.ActionModel.findById(
    //         actionId
    //     );
    //     if (!actionDb) throw Error(`Action ${actionId} not found`);

    //     if (actionDb.state !== ActionState.IN_PROGRESS) return;

    //     const nextActivity = new Date();

    //     if (duration === undefined) nextActivity.setFullYear(9999);
    //     else
    //         nextActivity.setMilliseconds(
    //             nextActivity.getMilliseconds() + duration * 1000
    //         );

    //     // TODO: A TESTER
    //     // should pause children that are workflows
    //     // get registered actions and for each check if it has registered actions meaning it is a workflow
    //     (actionDb.bag as Workflow["IBag"])?.registeredActions?.forEach(
    //         async (subAction) => {
    //             const subActionDb =
    //                 await ActionRuntime.activeRuntime.ActionModel.findById(
    //                     subAction._id
    //                 );
    //             if (subActionDb?.bag.registeredActions) {
    //                 this.pause(subActionDb.id, duration);
    //             }
    //         }
    //     );

    //     actionDb.cronActivity.nextActivity = nextActivity;
    //     actionDb.cronActivity.paused = true;
    //     await actionDb.save();
    // }

    // /**
    //  * resume the action
    //  *
    //  * @param actionId
    //  */
    // static async resume(actionId: string) {
    //     let actionDb = await ActionRuntime.activeRuntime.ActionModel.findById(
    //         actionId
    //     );
    //     if (!actionDb) throw Error(`Action ${actionId} not found`);
    //     actionDb!.cronActivity.nextActivity = new Date();

    //     // resume children that are workflows
    //     // get registered actions and for each check if it has registered actions meaning it is a workflow
    //     (actionDb.bag as Workflow["IBag"])?.registeredActions?.forEach(
    //         async (subAction) => {
    //             const subActionDb =
    //                 await ActionRuntime.activeRuntime.ActionModel.findById(
    //                     subAction._id
    //                 );
    //             if (subActionDb?.bag.registeredActions) {
    //                 this.resume(subActionDb.id);
    //             }
    //         }
    //     );

    //     await actionDb!.save();
    // }

    // /**
    //  * End the action with provided state (default: `SUCCESS`).
    //  * For a workflow, end all sub actions.
    //  *
    //  * @param actionId
    //  * @param state state to use instead of `SUCCESS`
    //  */
    // static async end(
    //     actionId: string,
    //     state: ActionState.SUCCESS | ActionState.ERROR = ActionState.SUCCESS
    // ) {
    //     const actionDb = await ActionRuntime.activeRuntime.ActionModel.findById(
    //         actionId
    //     );

    //     if (
    //         actionDb.state == ActionState.ERROR ||
    //         actionDb.state == ActionState.SUCCESS
    //     )
    //         return;

    //     actionDb.state = state;
    //     await actionDb.save();

    //     // if actionId is a workflow, then end subActions
    //     (actionDb.bag as Workflow["IBag"])?.registeredActions?.forEach(
    //         async (subAction) => {
    //             await this.end(subAction._id, state);
    //         }
    //     );
    // }

    // /**
    //  * Replay an action, only possible for actions that were not closed.
    //  * Create a new action, do not call constructFromDb so there is no issue with unregistered actions
    //  *
    //  * @param actionId
    //  * @param state if given action is a workflow: optional step to replay from
    //  */
    // static async replay(actionId: string, step: number = -1) {
    //     const actionDb = await ActionRuntime.activeRuntime.ActionModel.findById(
    //         actionId
    //     );

    //     if (
    //         actionDb.state !== ActionState.CLOSED &&
    //         actionDb.state !== ActionState.ERROR &&
    //         actionDb.state !== ActionState.SUCCESS
    //     ) {
    //         throw Error(
    //             `Action cannot be replayed in its current state (${actionDb.state})`
    //         );
    //     }

    //     const newActionData = actionDb.toObject();
    //     delete newActionData._id;
    //     delete newActionData.__v;
    //     delete newActionData.createdAt;
    //     delete newActionData.updatedAt;

    //     newActionData.state = ActionState.SLEEPING;
    //     if ((newActionData.bag as Workflow["IBag"])?.registeredActions) {
    //         newActionData.bag.registeredActions = [];
    //         newActionData.markModified("actionDb.bag");
    //     }

    //     newActionData.cronActivity.nextActivity = new Date();

    //     const newActionDb =
    //         await ActionRuntime.activeRuntime.ActionModel.create(newActionData);
    //     return newActionDb._id;
    // }

    // // RESOURCES

    // /**
    //  * Run cmd on given resource.
    //  *
    //  * @param resourceRefOrId
    //  */
    // static async runResourceCmd(resourceRefOrId: string, cmd: string) {
    //     // TODO: find ref if id was provided

    //     const resourceRef = "";

    //     return this.run(resourceRef, {
    //         commandName: cmd,
    //     } as Resource["IArgument"]);
    // }

    // static getAllProperties(obj) {
    //     const props = new Set();

    //     while (obj && obj !== Object.prototype) {
    //         for (const key of Reflect.ownKeys(obj)) {
    //             props.add(key);
    //         }
    //         obj = Object.getPrototypeOf(obj);
    //     }

    //     return [...props];
    // }

    // /**
    //  * Run cmd on given resource.
    //  *
    //  * @param resourceRefOrId
    //  */
    // static async listResourceCommands(resourceRefOrId: string) {
    //     const resourceRef = ""; // TODO: find ref if id was provided

    //     // if id or identity is provided, first find corresponding ref
    //     // TODO: find ref

    //     const availableResources = await this.listResourcesFromRegistry(true);

    //     let resource: Resource;
    //     for (const resourceCls of availableResources) {
    //         console.log(resourceCls, resourceCls.permanentRef);
    //         if (
    //             resourceCls.permanentRef === resourceRefOrId ||
    //             new resourceCls().identity() == resourceRefOrId
    //         ) {
    //             resource = new resourceCls();
    //         }
    //     }

    //     return this.getAllProperties(resource)
    //         .filter(
    //             (member: string) =>
    //                 !["define", "defineDynamicAction", "defineCallMode"].includes(
    //                     member
    //                 ) && member.startsWith("define")
    //         )
    //         .map((cmd: string) => cmd.substring("define".length))
    // }

    // static async installResource(resourceRefOrId: string) {
    //     return this.runResourceCmd(resourceRefOrId, "install");
    // }

    // static async uninstallResource(resourceRefOrId: string) {
    //     return this.runResourceCmd(resourceRefOrId, "uninstall");
    // }

    // static async getResource(resourceId: string) {
    //     await ActionRuntime.waitForActiveRuntime;

    //     if (mongoose.Types.ObjectId.isValid(resourceId)) {
    //         const doc =
    //             await ActionRuntime.activeRuntime.ResourceModel.findById(
    //                 resourceId
    //             );
    //         if (doc) return doc;
    //     }

    //     // try identity
    //     return ActionRuntime.activeRuntime.ResourceModel.findOne({
    //         identity: resourceId,
    //     });
    // }

    // /**
    //  * list resources
    //  */
    // static async listResourcesFromRegistry(returnConstructor: boolean = false) {
    //     return this.listFromRegistry(actionKind.RESOURCE, returnConstructor);
    // }

    // static async listResources() {
    //     return await ActionRuntime.activeRuntime.ResourceModel.find();
    // }
}

const env = getEnv();

new ActionRuntime(env);
