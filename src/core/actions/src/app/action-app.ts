import {o} from '@wbce/services';
import mongoose from 'mongoose';
import * as winston from 'winston';
import { ActionCron } from "../action-job";
import { Action, RejectAction, ResolveAction, RollBackAction } from '../../index';
import { ActionError } from '../error/error';
import { ActionSchemaInterface } from '../../index';
import { RevertAction, RevertWorkflow } from '../../index';
import { AppDb, setDbConnection } from './db-connection';
import { defaultLogger, setLogger } from './logger';

/**  An interface that describes how the app can be configured. 
 *  
 */
export interface ActionAppConfig{
    /** db configuration*/
    db? : AppDb,
    /** log driver configuration */
    logger?: winston.Logger
}


export class ActionApp{
    static activeApp : ActionApp;

    static appImportedRegistry = new Map();

    static resolveBootstrap;
    static rejectBootstrap;
    static waitForActiveApp = new Promise((resolve, reject)=>{
        ActionApp.resolveBootstrap = resolve;
        ActionApp.rejectBootstrap =reject;
    })
    static boostrapPath: string;

    actionsRegistry = new Map< string, typeof Action>();
    inversedActionsRegistry = new Map<typeof Action, string>();

    logger = defaultLogger;


    
    imports : (typeof ActionApp)[] = [];
    declare : (typeof Action)[] = [];

    numberOfWorker = 3;

    db : AppDb = { 
        mongo : {
            url: 'mongodb://localhost:27017/actions'
        }
    };

    ActionModel : mongoose.Model<ActionSchemaInterface>;

    constructor(opts? : {
        db? : AppDb,
        logger?: winston.Logger
    }){
        if(opts?.logger){
            this.logger = opts.logger;
        }
        if(opts?.db){
            this.db = opts.db
        }
    }

    bootstrap(){
        if(ActionApp.activeApp !== this){
            throw new ActionError('Only one app by process can be bootstrapped. Please merge your second app with the first.')
        }
        this.imports.push(CoreActionApp);
        this.import();
        for(const actionCtr of this.declare){
            const actionRef = actionCtr.permanentRef || actionCtr.name
            this.actionsRegistry.set(actionRef, actionCtr);   
            this.inversedActionsRegistry.set(actionCtr, actionRef)
        }
        ActionApp.activeApp = this;
        setLogger(this);
        return setDbConnection(this).then(()=>{
            for(let i = 0; i< this.numberOfWorker; i++){
                new ActionCron();
            }
        });
    }

    private import(){
        for(const appCtr of this.imports){
            if(!ActionApp.appImportedRegistry.get(appCtr)){
                const appToImport = new appCtr();
                appToImport.import();
                this.declare = [...this.declare, ...appToImport.declare]   
            }
            else{
                ActionApp.appImportedRegistry.set(appCtr, true);
            }
        }
    }

    static getActiveApp() : ActionApp{
        if(!this.activeApp){
            throw new ActionError("Please bootstrap an app before doing this.")
        }
        return this.activeApp;
    }


}

/**
 * Decorator :
 * It bootstraps an app
 * @param {ActionAppConfig | (()=>(ActionAppConfig|Promise<ActionAppConfig>))} opts - ActionAppConfig |
 * (()=>(ActionAppConfig|Promise<ActionAppConfig>)). Either an object of class ActionAppConfig or a callback returning a Promise, this promise have to
 * return an ActionAppConfig 
 */
export function bootstrapApp(opts: ActionAppConfig | (()=>(ActionAppConfig|Promise<ActionAppConfig>)) ){
    return function(classTargetConstructor: any){
        if(typeof opts === 'function'){
            //if opts is a callback,
            //we get the result and we deal with it as if it was a promise.
            //then we just call bootstrapApp again with the result.
            const p = Promise.resolve(opts());
            p.then((result)=>{
                return bootstrapApp(result)(classTargetConstructor);
            })
            return;
        }
        if(ActionApp.activeApp){
            throw new ActionError('Only one app by process can be bootstrapped. Please merge your second app with the first.');
        }
        const stackPaths = o.getStackTracePaths()
        let bootstrapPath = stackPaths[2];//c'est ni cette function ni la precedente
        if(bootstrapPath.includes('tslib')){
            bootstrapPath = stackPaths[3];
        }
        ActionApp.boostrapPath = bootstrapPath;
        ActionApp.activeApp = new classTargetConstructor(opts);
        ActionApp.activeApp.bootstrap().then(()=>{
            ActionApp.resolveBootstrap();
        })
    }
}

export class CoreActionApp extends ActionApp{
    declare = [ResolveAction, RejectAction, RollBackAction, RevertAction, RevertWorkflow, Action]
}