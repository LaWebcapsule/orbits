import { utils } from '@wbce/services';
import mongoose from 'mongoose';
import * as winston from 'winston';
import precinct from "precinct";
import path from "path"
import {
    Action,
    ActionSchemaInterface,
    RejectAction,
    ResolveAction,
    ResourceController,
    Sleep,
    TrackPromise,
    Workflow,
} from '../../index.js';
import { ActionCron } from '../action-job.js';
import { ActionError } from '../error/error.js';
import { AppDb, setDbConnection } from './db-connection.js';
import { defaultLogger, setLogger } from './logger.js';
import { ResourceSchemaInterface } from '../models/resource.js';
import { access } from 'fs/promises';

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
    notActive?: boolean
}

export class ActionApp {
    static activeApp: ActionApp;

    static apps : ActionApp[] = [];

    static appImportedRegistry = new Map();

    static resolveBootstrap;
    static rejectBootstrap;
    static waitForActiveApp = new Promise((resolve, reject) => {
        ActionApp.resolveBootstrap = resolve;
        ActionApp.rejectBootstrap = reject;
    });
    static bootstrapPath: string;
    /**
     * @deprecated use bootstrapPath
     */
    static get boostrapPath() {
        return ActionApp.bootstrapPath;
    }

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
    ResourceModel: mongoose.Model<ResourceSchemaInterface>

    

    bootstrapPath: string;

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
        if(!ActionApp.activeApp && !opts.notActive){
            ActionApp.activeApp = this;
        }
        ActionApp.apps.push(this);
        const stackPaths = utils.getStackTracePaths();
        let bootstrapPath = stackPaths[2];
        if (bootstrapPath.includes('tslib')) {
            bootstrapPath = stackPaths[3];
        }
        this.bootstrapPath = bootstrapPath;
        this.bootstrap();
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

    async scanModuleImport(moduleImport){
        for(const key in moduleImport){
            const value = moduleImport[key];
            if(value?.prototype instanceof Action){
                this.logger.info(`registering ${key}`)
                this.registerAction(value);
            }
        }
    }

    importedFiles = new Set<string>();
    static setExecutedVia(): 'ts'|'js'{
        if(process['_preload_modules'].includes("/tsx/")){
            return 'ts'
        }
        return 'js'
    }
    static executedVia = ActionApp.setExecutedVia();


    async recursiveImport(pathFile: string){
        this.logger.info(`dealing with ${pathFile}`);
        let deps : string[];
        try{
            deps = await precinct.paperwork(pathFile);
        }
        catch(err){
            if(err.code === "ENOENT"){
                this.logger.info(`cannot read ${pathFile} ; got ${err} ; fallback to ts extension`)
                try{
                    console.log(pathFile.replace(".js", ".ts"))
                    deps = await precinct.paperwork(pathFile.replace(".js", ".ts"));
                }
                catch(err2){   
                    this.logger.info(`cannot read ts extension neither ; got ${err2}`)
                    throw err;
                }
            }
            else{
                throw err;
            }
        }
        const notDealthDeps = deps.filter((d)=>!this.importedFiles.has(d));
        const baseDir = path.dirname(pathFile)
        this.logger.info(`found deps: ${deps}`);
        for(const file of notDealthDeps){
            this.logger.info(`exploring dep: ${file}`);
            this.importedFiles.add(file)
            if(file.startsWith(".")){
                //import another file in same module
                const filePath = path.join(baseDir, file)
                console.log(filePath)
                const moduleImport = await import(filePath);
                this.scanModuleImport(moduleImport);
                await this.recursiveImport(filePath);
            }
            else{
                //import an npm module
                const moduleImport = await import(file);
                this.scanModuleImport(moduleImport);
            }
        }

    }

    async lazyLoadApp(folderPath){
        await import(folderPath);
    }

    rejectBootstrap;
    resolveBootstrap;
    waitForBootstrap = new Promise((resolve, reject)=>{
        this.rejectBootstrap = reject;
        this.resolveBootstrap = resolve;
    })
    async bootstrap() {
        const isActiveApp = (ActionApp.activeApp === this)
        if (isActiveApp) {
            setLogger(this);
        }
        this.imports.push(CoreActionApp);
        this.import();
        for (const action of this.declare) {
            this.registerAction(action);
        }
        ActionApp.activeApp = this;
        await this.recursiveImport(this.bootstrapPath);
        if(isActiveApp){
            return setDbConnection(this).then(() => {
                for (let i = 0; i < this.numberOfWorker; i++) {
                    new ActionCron(this.actionFilter);
                }
            }).then(()=>{
                this.resolveBootstrap();
                ActionApp.resolveBootstrap();
            })
        }
        else{
            return ActionApp.waitForActiveApp.then(()=>{
                this.resolveBootstrap();
            });
        }
        
    }

    static bootstrap(config : ActionAppConfig){
        new ActionApp(config);
    }

    private import() {
        for (const appCtr of this.imports) {
            if (!ActionApp.appImportedRegistry.get(appCtr)) {
                ActionApp.appImportedRegistry.set(appCtr, true)
                const appToImport = new appCtr();
                appToImport.import();
                this.declare = [...this.declare, ...appToImport.declare];
            }
        }
    }

    static async getActiveApp(opts = {timeout: 60*1000}): Promise<ActionApp>{
        return new Promise((resolve,reject)=>{
            let activeApp, isResolved;
            setTimeout(()=>{
                if(!activeApp && !isResolved){
                    isResolved = true;
                    reject(new ActionError("no active app found ; reached timeout"));
                }
            }, opts.timeout)
            this.waitForActiveApp.then(()=>{
                if(!isResolved){
                    resolve(this.activeApp)
                }
            })
        })
    }
}

export class CoreActionApp extends ActionApp {
    declare = [
        ResolveAction,
        RejectAction,
        Action,
        Workflow,
        TrackPromise,
        Sleep,
        ResourceController
    ];
}
