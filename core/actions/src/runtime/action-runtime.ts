import { utils } from '@orbi-ts/services';
import mongoose, { set } from 'mongoose';
import path from 'path';
import precinct from 'precinct';
import * as winston from 'winston';
import { Action, ActionSchemaInterface } from '../../index.js';
import { ActionCron } from '../action-job.js';
import { ActionError } from '../error/error.js';
import { ResourceSchemaInterface } from '../models/resource.js';
import { RuntimeDb, setDbConnection } from './db-connection.js';
import { defaultLogger, setLogger } from './logger.js';
import { fileURLToPath, pathToFileURL } from 'url';
import {resolve} from 'import-meta-resolve';
import { getEnv } from './get-env.js';
import EventEmitter from 'events';
import { createRequire } from 'module';
import { actionKind, actionKindSymbols } from './action-kind.js';

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
    /**
     * @deprecated use bootstrapPath
     */
    static get boostrapPath() {
        return ActionRuntime.bootstrapPath;
    }

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
        global.orbitsRuntimes = [...global.orbitsRuntimes || [], this];
        if(!global.orbitsRuntimeEvent){
            global.orbitsRuntimeEvent = new EventEmitter();
        }
        this.bootstrapPath = opts?.entrypoint;
        if(!opts?.entrypoint){
            this.bootstrapPath = process.argv[1];
        };
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

    private listDependenciesOfFile(pathFile: string){
        let deps: string[];
        if(!path.extname(pathFile)){
            //probably using commonjs here : try to get exact path file
            const require = createRequire(import.meta.url);
            pathFile = require.resolve(pathFile);
        }
        this.logger.debug(
            `reading ${pathFile}`
        );
        try {
            deps = precinct.paperwork(pathFile, {
                includeCore: false
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
            let importPath : string;
            if (file.startsWith('.')) {
                //import another file in same module
                importPath = path.join(baseDir, file);
            } else {
                //import an npm module
                const url = await resolve(file, pathToFileURL(pathFile) as any);
                importPath = fileURLToPath(url);
            }

            if(this.importedFiles.has(importPath)){
                continue;
            }
            this.importedFiles.add(importPath)

            this.logger.debug(`exploring dep: ${file}`);

            if (file.startsWith('.')) {
                //import another file in same module
                await this.recursiveImport(importPath);
            } else {
                //import an npm module
                const moduleImport = await import(importPath);                 
                if(await this.scanModuleImport(moduleImport)){
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
            setDbConnection(this)
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
            ]).then(()=>{
                return ActionRuntime.waitForActiveRuntime;
            }).then(() => {
                this.resolveBootstrap();
            })
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
}

const env = getEnv();

new ActionRuntime(env);
