import { resolve } from 'import-meta-resolve';
import mongoose from 'mongoose';
import path from 'path';
import precinct from 'precinct';
import { pathToFileURL } from 'url';
import * as winston from 'winston';
import { Action, ACTION_TAG, ActionSchemaInterface } from '../../index.js';
import { ActionCron } from '../action-job.js';
import { ActionError } from '../error/error.js';
import { ResourceSchemaInterface } from '../models/resource.js';
import { BufferedEmitter } from './buffered-emitter.js';
import { RuntimeDb, setDbConnection } from './db-connection.js';
import { getEnv } from './get-env.js';
import { defaultLogger, setLogger } from './logger.js';

declare global {
    var orbitsRuntimeEvent: BufferedEmitter;
    namespace globalThis {
        var orbitsRuntimes: ActionRuntime[];
    }
}

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
    ResourceModel: mongoose.Model<ResourceSchemaInterface>;

    bootstrapPath: string;

    name: string;

    constructor(private opts?: RuntimeConfig) {
        this.name = opts?.name ?? 'orbits-runtime';
        const existingRuntime = (global.orbitsRuntimes || []).find(
            (runtime) => runtime.name === this.name
        );
        if (existingRuntime) {
            ActionRuntime.activeRuntime = existingRuntime;
            return existingRuntime;
        }
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
        ActionRuntime.activeRuntime = this;
        ActionRuntime.runtimes.push(this);
        global.orbitsRuntimes = [...(global.orbitsRuntimes || []), this];
        if (!global.orbitsRuntimeEvent) {
            global.orbitsRuntimeEvent = new BufferedEmitter();
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
        for (const key in moduleImport) {
            const value = moduleImport[key];
            if (value && value[ACTION_TAG]) {
                this.logger.info(`registering ${key}`);
                this.registerAction(value);
            }
        }
    }

    importedFiles = new Set<string>();
    static setExecutedVia(): 'ts' | 'js' {
        if (process['_preload_modules'].includes('/tsx/')) {
            return 'ts';
        }
        return 'js';
    }
    static executedVia = ActionRuntime.setExecutedVia();

    async recursiveImport(pathFile: string) {
        this.logger.info(`dealing with ${pathFile}`);

        // import actions from current file
        const moduleImport = await import(pathFile);
        this.scanModuleImport(moduleImport);

        let deps: string[];
        try {
            deps = precinct.paperwork(pathFile);
        } catch (err) {
            if (err.code === 'ENOENT') {
                this.logger.info(
                    `cannot read ${pathFile} ; fallback to ts extension`
                );
                try {
                    deps = precinct.paperwork(pathFile.replace('.js', '.ts'), {
                        ts: {
                            skipTypeImports: true,
                        },
                        tsx: {
                            skipTypeImports: true,
                        },
                    } as any);
                } catch (err2) {
                    this.logger.info(
                        `cannot read ts extension neither ; got ${err2}`
                    );
                    throw err;
                }
            } else {
                throw err;
            }
        }
        const notDealtWithDeps = deps.filter((d) => !this.importedFiles.has(d));
        const baseDir = path.dirname(pathFile);
        this.logger.info(`found deps: ${deps}`);
        for (const file of notDealtWithDeps) {
            this.logger.info(`exploring dep: ${file}`);
            this.importedFiles.add(file);

            // ignore json
            if (file.endsWith('.json')) {
                this.logger.info(`ignoring json file ${file}`);
                continue;
            }

            if (file.startsWith('.')) {
                //import another file in same module
                let filePath = path.join(baseDir, file);
                await this.recursiveImport(filePath);
            } else {
                //import an npm module
                const url = resolve(file, pathToFileURL(pathFile) as any);
                const moduleImport = await import(url);
                this.scanModuleImport(moduleImport);
            }
        }
    }

    rejectBootstrap;
    resolveBootstrap;
    waitForBootstrap = new Promise((resolve, reject) => {
        this.rejectBootstrap = reject;
        this.resolveBootstrap = resolve;
    });
    async bootstrap() {
        if (ActionRuntime.activeRuntime !== this) return;

        setLogger(this);

        try {
            await setDbConnection(this);
        } catch (error) {
            throw new ActionError(
                `Error setting database connection: ${error}`
            );
        }

        await this.recursiveImport(this.bootstrapPath);

        for (let i = 0; i < this.numberOfWorker; i++) {
            new ActionCron(this.actionFilter);
        }

        ActionRuntime.resolveBootstrap();
        this.resolveBootstrap();
        console.log('bootstrap done');
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

if (env.autostart) new ActionRuntime(env);
