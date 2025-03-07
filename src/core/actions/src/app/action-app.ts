import { utils } from '@wbce/services';
import mongoose from 'mongoose';
import * as winston from 'winston';
import {
    Action,
    ActionSchemaInterface,
    RejectAction,
    ResolveAction,
    RevertAction,
    RevertWorkflow,
    RollBackAction,
    Workflow,
} from '../../index.js';
import { ActionCron } from '../action-job.js';
import { ActionError } from '../error/error.js';
import { AppDb, setDbConnection } from './db-connection.js';
import { defaultLogger, setLogger } from './logger.js';

/**
 * Describes how the app can be configured.
 */
export interface ActionAppConfig {
    /** db configuration */
    db?: AppDb;
    /** log driver configuration */
    logger?: winston.Logger;
    workers?: {
        quantity: number;
        filter?: Object;
    };
}

export class ActionApp {
    static activeApp: ActionApp;

    static appImportedRegistry = new Map();

    static resolveBootstrap;
    static rejectBootstrap;
    static waitForActiveApp = new Promise((resolve, reject) => {
        ActionApp.resolveBootstrap = resolve;
        ActionApp.rejectBootstrap = reject;
    });
    static bootstrapPath: string;

    private actionsRegistry = new Map<string, typeof Action>();
    private invertedActionsRegistry = new Map<typeof Action, string>();

    logger = defaultLogger;

    imports: (typeof ActionApp)[] = [];
    declare: (typeof Action)[] = [];

    numberOfWorker = 3;

    /**
     * Used by ActionCron to
     * filter actions using their `filter` field
     */
    actionFilter?: Object;

    db: AppDb = {
        mongo: {
            url: 'mongodb://localhost:27017/actions',
        },
    };

    ActionModel: mongoose.Model<ActionSchemaInterface>;

    /**
     * @deprecated use bootstrapPath
     */
    static get boostrapPath() {
        return ActionApp.bootstrapPath;
    }

    constructor(opts?: ActionAppConfig) {
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

    bootstrap() {
        if (ActionApp.activeApp && ActionApp.activeApp !== this) {
            throw new ActionError(
                'Only one app can be bootstrapped by process. Please merge your second app with the first.'
            );
        }
        this.imports.push(CoreActionApp);
        this.import();
        for (const action of this.declare) {
            this.registerAction(action);
        }
        ActionApp.activeApp = this;
        setLogger(this);
        return setDbConnection(this).then(() => {
            for (let i = 0; i < this.numberOfWorker; i++) {
                new ActionCron(this.actionFilter);
            }
        });
    }

    private import() {
        for (const appCtr of this.imports) {
            if (!ActionApp.appImportedRegistry.get(appCtr)) {
                const appToImport = new appCtr();
                appToImport.import();
                this.declare = [...this.declare, ...appToImport.declare];
            } else {
                ActionApp.appImportedRegistry.set(appCtr, true);
            }
        }
    }

    static getActiveApp(): ActionApp {
        if (!this.activeApp) {
            throw new ActionError('Please bootstrap an app before doing this.');
        }
        return this.activeApp;
    }
}

/**
 * Bootstrap an app, used as decorator.
 * @param opts - `ActionAppConfig | (() => (ActionAppConfig|Promise<ActionAppConfig>))`
 * Either an object of class `ActionAppConfig` or a callback returning a Promise that return an `ActionAppConfig`.
 */
export function bootstrapApp(
    opts: ActionAppConfig | (() => ActionAppConfig | Promise<ActionAppConfig>)
) {
    return function (classTargetConstructor: any) {
        if (typeof opts === 'function') {
            // if opts is a callback,
            // we get the result and we deal with it as if it was a promise.
            // then we just call bootstrapApp again with the result.
            const p = Promise.resolve(opts());
            p.then((result) => bootstrapApp(result)(classTargetConstructor));
            return;
        }
        if (ActionApp.activeApp) {
            throw new ActionError(
                'Only one app can be bootstrapped by process. Please merge your second app with the first.'
            );
        }
        const stackPaths = utils.getStackTracePaths();
        let bootstrapPath = stackPaths[2];
        if (bootstrapPath.includes('tslib')) {
            bootstrapPath = stackPaths[3];
        }
        ActionApp.bootstrapPath = bootstrapPath;
        ActionApp.activeApp = new classTargetConstructor(opts);
        ActionApp.activeApp
            .bootstrap()
            .then(() => {
                ActionApp.resolveBootstrap();
            })
            .catch((err) => {
                ActionApp.rejectBootstrap(err);
            });
    };
}

export class CoreActionApp extends ActionApp {
    declare = [
        ResolveAction,
        RejectAction,
        RollBackAction,
        RevertAction,
        RevertWorkflow,
        Action,
        Workflow,
    ];
}
