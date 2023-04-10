import { errorCodes } from "./error/errorcodes";
import { ActionSchemaInterface, ActionState } from "./models/action";
import { Workflow, ActionApp, RevertAction } from "./../index";
import { wbceAsyncStorage } from "@wbce/services";
import { ActionError } from "./error/error";
import { Executor } from "./action-executor";



/** 
 * Action is the class to structure actions
 * Extends this class to build new actions behaviours.
 * You can read more here :
 *
 * 
*/
export class Action{
    
    /**
     * The id of the action we store in database.
     * This should be a permanent id that designates your instance.
     * 
     */
    static permanentRef : string;

    /**
     * Specify an executor in which all actions of this class will run.
     */
    executor? : Executor;

    app : ActionApp = ActionApp.getActiveApp();
    


    /**
     * Shorcut to @link Action.defaultDelays[ActionState.IN_PROGRESS]
     * Note that if defaultDelay is not set, this property will be 'inherited' from parent classes
     * Indeed, Orbits have a mechanism to go through the parent classes to find the first parent constructor where this property is set.
     */
    static defaultDelay : number = 10*60*1000;

    /**
     * 
     * For the state ActionState.EXECUTING_MAIN and ActionState.IN_PROGRESS,
     * this object configure the time after which, if no change happened, an action is considered in error. 
     * For example, an action can only be in the ActionState.IN_PROGRESS state for as long as 
     * defaultDelays[ActionState.IN_PROGRESS] time.
     * @defaultValue {
     *    [ActionState.IN_PROGRESS] : this.defaultDelay,
     *    [ActionState.EXECUTING_MAIN] : 2*60*1000
     * }
     * 
     * You should configure this if your actions have longer timeouts. 
     * Note that if defaultDelays is not set, this property will be 'inherited' from parent classes
     * Indeed, Orbits have a mechanism to go through the parent classes to find the first parent constructor where this property is set.
     */
    static defaultDelays : {
        [k in ActionState.IN_PROGRESS | ActionState.EXECUTING_MAIN]? : number
    } = {
        [ActionState.IN_PROGRESS] : this.defaultDelay,
        [ActionState.EXECUTING_MAIN] : 2*60*1000
    }

    /**
     * Configure the frequence in which a cron will cause the @link Action.resume method.
     * You can also dinamically modify the dbDoc.cronActivity property to modify the call to a cron.
     * Note that if cronDefaultSettings are not set, this property will be 'inherited' from parent classes
     * Indeed, Orbits have a mechanism to go through the parent classes to find the first parent constructor where this property is set.
     */
    static cronDefaultSettings : {
        activityFrequence : number
    } = {
        activityFrequence : 10*60*1000
    }

    /**
     * Interface of the argument of the action
     */

    IArgument : {};


    /**
     * Interface of the bag of the action
     */

    IBag : {};


    /**
     * Interface of the result of the action
     */
    IResult : {};
    

    /**
     * The database document of this action.
     * 
     */
    dbDoc : ActionSchemaInterface<this['IArgument'], this['IBag'], this['IResult']>;

    get bag() : this['dbDoc']['bag']{
        return this.dbDoc.bag;
    }

    set bag(bag : this['dbDoc']['bag']){
        this.dbDoc.bag = bag;
        this.dbDoc.markModified('bag')
    }

    get argument() : this['dbDoc']['argument']{
        return this.dbDoc.argument;
    }

    set argument(argument : this['dbDoc']['argument']){
        this.dbDoc.argument = argument;
        this.dbDoc.markModified('argument')
    }

    get result() : this['dbDoc']['result']{
        return this.dbDoc.result;
    }

    set result(result : this['dbDoc']['result']){
        this.dbDoc.result = result;
        this.dbDoc.markModified('result')
    }

    get repeat() : this['dbDoc']['repeat']{
        return this.dbDoc.repeat
    }

    set repeat(repeat : this['dbDoc']['repeat']){
        this.dbDoc.repeat = repeat;
        this.dbDoc.markModified('repeat')
    }
    
    get cronActivity() : this['dbDoc']['cronActivity']{
        return this.dbDoc.cronActivity
    }

    set cronActivity(cronActivity : this['dbDoc']['cronActivity']){
        this.dbDoc.cronActivity = cronActivity;
        this.dbDoc.markModified('cronActivity');
    }

    get _id() : this['dbDoc']['_id']{
        return this.dbDoc._id;
    }

    save(){
        return this.dbDoc.save();
    }


    constructor(){
        const actionRef = this.app.inversedActionsRegistry.get(this.constructor as any)
        if(!actionRef){
            throw new ActionError('Please declare this action in a bootstrapped app before using it',
                errorCodes.Not_ACCEPTABLE,
                {
                    ctrName : this.constructor.name
                }
            )
        }

        let cronDefaultSettings = Action.cronDefaultSettings;
        let defaultDelays = Action.defaultDelays;
        let defaultDelay;
        //static property are not inherited in ts
        //but we want the default to be inherited so we go through the constructor chain and we take the first value implemented in the chain
        //for each of the default (cronDefaultSettings, defaultDelay, defaultDelays)
        let ctr = this.constructor as typeof Action;
        while(ctr !== Action){
            cronDefaultSettings = cronDefaultSettings || ctr.cronDefaultSettings;
            defaultDelays = defaultDelays || ctr.defaultDelays;
            //if defaultDelays.1 is not set, this means defaultDelays.1 can still be set via defaultDelay static property
            //if defaultDelays.1 is set, this means defaultDelay is useless
            if(!defaultDelays?.[ActionState.SUCCESS]){
                defaultDelay = defaultDelay || ctr.defaultDelay;
            }
            if(defaultDelay && defaultDelay && !defaultDelays?.[ActionState.SUCCESS]){
                defaultDelays[ActionState.SUCCESS] = defaultDelay;
            }
            ctr = Object.getPrototypeOf(ctr);
        }
        cronDefaultSettings = cronDefaultSettings || Action.cronDefaultSettings;
        defaultDelays = defaultDelays || Action.defaultDelays;
        if(!defaultDelay?.[ActionState.SUCCESS]){
            defaultDelays[ActionState.SUCCESS] = Action.defaultDelay;
        }

        this.dbDoc  = new this.app.ActionModel({
            actionRef,
            state : ActionState.SLEEPING,
            bag : {}
        }) as any   
        this.dbDoc.cronActivity.frequence = cronDefaultSettings.activityFrequence 
        this.dbDoc.delays = defaultDelays as any;
        if(defaultDelay){
            this.dbDoc.delays[ActionState.SUCCESS] = defaultDelay;
            
        }
        this.app = ActionApp.getActiveApp();
    }

    /**
     * Permit to construct an action from a document stored in the database.
     * @param actionDb a document coming from the database 
     * @returns an action for which dbDoc property is equal to actionDb
     */
    static constructFromDb(actionDb : ActionSchemaInterface<any>) : Action{
        const app = ActionApp.getActiveApp();
        
        const ActionCtr = app.actionsRegistry.get(actionDb.actionRef);
        let action: Action;
        try{
            action = new ActionCtr();    
        }
        catch(err){
            throw new ActionError(
                `The action with ref ${actionDb.actionRef} has not been registered`,
                errorCodes.RESSOURCE_NOT_FOUND,
                {
                    err,
                    actionDb
                }
            )
        }
        action.dbDoc = actionDb;
        return action;
    }

    /**
     * This function will update the current instance of the model with the latest data from the
     * database
     * @returns A promise that resolves when the last document version has be loaded
     */
    resyncWithDb(){
        return this.app.ActionModel.findById(this.dbDoc._id.toString()).then((newDb)=>{
            if(newDb){
                this.dbDoc = newDb as any;
            }
            else{
                this.dbDoc.$isDeleted(true);
            }
            
        })
    }

    /**
     * It returns a new ResolveAction object.
     * @param [result] - The result of the action.
     * @returns A new instance of the ResolveAction class.
     */
    static resolve(result?){
        const success = new ResolveAction();
        result ? success.result = result : undefined;
        return success;
    }

    /**
     * `static reject(result?){`
     * 
     * The above function is a static function that returns a new RejectAction object. The function
     * takes an optional parameter called result
     * @param [result] - The result of the action.
     * @returns A new instance of the RejectAction class.
     */
    static reject(result?){
        const error = new RejectAction();
        result ? error.result = result : undefined;
        return error;
    }

    private execute(){
        return this.changeState(ActionState.EXECUTING_MAIN)
        .catch(err=>{
            if(err && err.code === errorCodes.RESSOURCE_LOCKED){
                throw ActionState.UNKNOW;//le thread current n'est pas maitre de la workflow
                //et decline donc ses responsabilites
            }
            throw err;
        })
        .then(()=>{
            return this.initialisation();
        })
        .then(()=>{
            this.internalLog('main');
            return this.main();
        })
        .catch((err)=>{
            //pour courcircuiter les étapes, on peut retourner un etat par le throw/catch.
            //notamment en cas d'erreur
            if(err in ActionState){
                return err;
            }
            //c'est une autre erreur qu'on a attrapé
            this.internalLogError(err);
            this.result = err;
            return ActionState.ERROR;
        })
    }


    /**
     * Initialize the action from the action stored in the database.
     * @example In order to not store secrets in the database, you can set a vault id in the argument and retrieve the secret at the initialization of the action
     * @example You cannot store class object on the database. If your action use complex object, they can be initialized here
     * @returns 
     */
    init(): Promise<any>{
        return Promise.resolve()
    };

    /**
     * It takes an object of type `IArgument` and sets the `argument` 
     * that will be stored in the database.
     * Once set, the argument of an action should not be modified.
     * @param args - The arguments that you want to set.
     */
    setArgument(args : this['IArgument']){
        this.argument = {...this.argument, ...args}
        this.dbDoc.markModified('argument');
    }

    /**
     * Configure the number of times an action is repeated.
     * @param opts 
     */

    setRepeat(opts : this['repeat'] ){
        this.repeat = {
            ...this.repeat,
            ...opts
        }
    }

    /**
     * To make filtering easier, you can pass filter to an action.
     * This filters are stored on the database with the `filter` property and allow you to search for 
     * an action or a group of actions
     * @param filter 
     */

    setFilter(filter : Object){
        this.dbDoc.filter = {...this.dbDoc.filter, ...filter};
        this.dbDoc.markModified('filter');
    }

    /**
     * Set the result of the action.
     * @param result 
     */

    setResult(result : Object){
        this.dbDoc.result = {...this.dbDoc.result, ...result}
        this.dbDoc.markModified('result');
    }

    /**
     * This method should calculate the current state of the action.
     * It is called :
     * - potentially many times, when the action is in IN_PROGRESS state
     * - once time, if the action is in EXECUTING_MAIN state and the executing_main delay has expired
     * @returns 
     */

    watcher(){
        return Promise.resolve(ActionState.UNKNOW)
    }

    isInitialised  = false;
    initialisation(){
        //principalement la pour les workflows
        //on peut ainsi ajouter un complement a init.
        //si se complexifie, fonctionner par hook (tableau)
        if(this.isInitialised){
            return Promise.resolve();
        }
        this.isInitialised = true;
        this.internalLog('init');
        return this.init();
    }

    private watch(){
        return this.initialisation().then(
            ()=>{
                this.internalLog('watcher');
                return this.watcher();
            }
        )
        .then((actionState)=>{
            if(actionState === ActionState.UNKNOW || actionState === ActionState.IN_PROGRESS){
                if(this.dbDoc.delays[ActionState.IN_PROGRESS] < Date.now()-this.dbDoc.stateUpdatedAt.getTime() && this.dbDoc.state === ActionState.IN_PROGRESS){
                    return ActionState.ERROR;
                }
            }
            return actionState;
        });
    }

    private checkExecutionDelay(){
        if((Date.now() - this.dbDoc.stateUpdatedAt.getTime()) >= this.dbDoc.delays[ActionState.EXECUTING_MAIN]){
            return this.watch().then((actionState)=>{
                if(actionState === ActionState.UNKNOW){
                    return ActionState.SLEEPING;//n'a jamais ete lance
                }
                return actionState;
            }).catch((err)=>{
                if(err === ActionState.UNKNOW){
                    throw ActionState.SLEEPING;//n'a jamais ete lance
                }
                if(err in ActionState){
                    throw err;   
                }
                else{
                    return ActionState.ERROR
                }
            })
        }
        return Promise.resolve(ActionState.UNKNOW);
    }

    /**
     * This method should launched the main action processus 
     * It is called only one time.
     * It returns a state value. 
     * @returns 
     */

    main(): ActionState | void | unknown{
        return Promise.resolve(ActionState.ERROR);
    }

    /**
     * The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
     * state of the action
     * @returns A promise. You can not rely on this to know when an action is finished.
     */
    public resume(){
        this.dbDoc.updateNextActivity();//set next cron Activity
        return wbceAsyncStorage.addNestedStorage({
            logInfo : {
                actionRef : this.dbDoc.actionRef,
                actionId : this._id.toString(),
                filter : this.dbDoc.filter
            }
        }, ()=>{
            if(this.executor){
                return this.executor.resume(this);
            }
            else{
                return this._resume();
            }
        })
    }

    /**
     * The function resumes the action by calling the appropriate function depending on the current
     * state of the action. It doesn't take into account the executor.
     * @returns A promise. You can not rely on this to know when an action is finished.
     */
    public _resume(){
        let resume;
        switch (this.dbDoc.state) {
            case ActionState.PAUSED :
            case ActionState.SLEEPING :
                resume = this.execute();
                break;

            case ActionState.EXECUTING_MAIN:
                resume = this.checkExecutionDelay();
                break;

            case ActionState.IN_PROGRESS:
                resume = this.watch();
                break;

            case ActionState.SUCCESS:
            case ActionState.ERROR:
                resume = this.end();
                break;

            case ActionState.REVERTED:
            case ActionState.CLOSED:
                resume = this.quit();
                break;
        
            default:
                resume = Promise.resolve(ActionState.UNKNOW);
                break;
        }
        return resume.then(this.onStateNotification.bind(this))
                    .catch((err)=>{
                        if(err && err.code === errorCodes.RESSOURCE_LOCKED){
                            this.internalLog('Verrou déjà pris')
                        }
                        else{
                            this.internalLogError(err);
                        }
                    })
    }

    changeState(actionState : ActionState){
        const oldState = this.dbDoc.state;
        this.dbDoc.state = actionState;
        return this.dbDoc.lockAndSave().then(()=>{
            this.internalLog(`state changed : ${oldState}--> ${actionState}`);
        })
    }


    onStateNotification(actionState : ActionState = ActionState.UNKNOW ){
        if(actionState !== ActionState.UNKNOW && this.dbDoc.state !== actionState){
            return this.changeState(actionState).then(this.resume.bind(this))
        }
        return Promise.resolve()
    }

    private end(){
        const markAsClosed = ()=>{
            //on attend dix minutes avant de mettre l'action en closed;
            if((Date.now() - this.dbDoc.stateUpdatedAt.getTime()) < 10*60*1000){
                this.cronActivity.nextActivity = new Date(this.dbDoc.stateUpdatedAt.getTime() + 10*60*1000);
                return this.dbDoc.save().then(()=>{
                    return ActionState.UNKNOW;//court circuit
                });
            }
            else{
                this.dbDoc.nExecutions[this.dbDoc.state] ++
                return ActionState.CLOSED;
            }
        }

        
        if(this.repeat[this.dbDoc.state]>0){
            this.repeat[this.dbDoc.state] --;
            this.bag = {};
            this.result = {};
            //!note : pas de "return" d'état ici
            //on se contente de changer d'état et
            //on ne continue pas derrière, la prochaine iteration a lieu à la frequence du cron
            //comportement a confirmer
            this.dbDoc.nExecutions[this.dbDoc.state] ++
            return this.changeState(ActionState.SLEEPING);
        }
        else if(this.dbDoc.workflowId){
            return this.app.ActionModel.findById(this.dbDoc.workflowId).then((workflowDb)=>{
                if(workflowDb){
                    const workflow = Action.constructFromDb(workflowDb as any) as unknown as Workflow;
                    if(workflow.isActionActive(this)){
                        return workflow.resume();
                    }
                }
                return markAsClosed();
            })
        }
        return Promise.resolve(markAsClosed());
    }

    private quit(){
        if(this.isRollBackPossible && !(this.dbDoc.state === ActionState.REVERTED)){
            //on gele l'action dans l'attente d'un futur rollback
            this.dbDoc.cronActivity.nextActivity = new Date(4022,1,1);
            return this.dbDoc.save().then(()=>{
                return ActionState.UNKNOW;//court circuit
            });
        }
        const timeFromEnd = Date.now()- this.dbDoc.stateUpdatedAt.getTime();
        if(timeFromEnd >= 24*60*60*1000){
            return this.destroy().then(()=>{
                return ActionState.UNKNOW;//court circuit
            });;
        }
        else{
            this.cronActivity.nextActivity = new Date(this.dbDoc.stateUpdatedAt.getTime() + 24*60*60*1000);
            return this.dbDoc.save().then(()=>{
                return ActionState.UNKNOW;//court circuit
            });
        }
    }

    private destroy(){
        return this.dbDoc.remove();
    }

    activityLogs(options : any):(any[] | Promise<any[]>){
        return [] as string[];
    }

    getLogs(options : {endTime? : number }=  {}){
        let message;
        if(!options.endTime){
            message = `${this.dbDoc._id.toString()}- ${this.dbDoc.actionRef} `
            switch (this.dbDoc.state) {
                case ActionState.SLEEPING:
                    message += '- est endormie'
                    break;
    
                case ActionState.PAUSED:
                    message += '- est en pause'
                    break;
    
                case ActionState.IN_PROGRESS:
                    message += '- est en cours';
                    break;
    
                case ActionState.SUCCESS:
                    message += '- est un succès'
                    break;
                
                case ActionState.ERROR:
                    message += '- est un échec'
                    break;
    
                case ActionState.CLOSED:
                    message += '- est cloturee'
                    break;
            
                default:
                    break;
            }
        }
        return Promise.resolve(this.activityLogs(options)).then(logs=>{
            if(message){
                logs.push(message)
            }
            return logs;
        })
    }

    internalLog(message : string){
        this.app.logger.info(message, {
            actionRef : this.dbDoc.actionRef,
            actionId : this.dbDoc._id.toString(),
            filter : this.dbDoc.filter,
            timestamp : new Date().toISOString()
        })
    }

    internalLogError(err : Error){
        this.app.logger.error('!!-.-!!', {
            actionRef : this.dbDoc.actionRef,
            actionId : this.dbDoc._id.toString(),
            filter : this.dbDoc.filter,
            err : err
        })
    }

    get isRollBackPossible(){
        //on check si une des quatres proprietes a ete modifie par rapport au comportement par defaut
        const mockAction = new Action();
        if(    
            this.RollBackAction !== mockAction.RollBackAction 
            || this.RollBackWorkflow !== mockAction.RollBackWorkflow
            || this.rollBack !== mockAction.rollBack 
            || this.rollBackWatcher !== mockAction.rollBackWatcher
            ){
            return true;
        }
        return false;
    }

    /**
     * Shortcut to configure a rollback. Will be encapsulated in a larger action
     * @returns 
     */

    rollBack(){
        return Promise.resolve(ActionState.SUCCESS)
    };//confusion sur les etats : si renvoie success, = succes du rollback. a changer ?
    
    /**
     * Shortcut to configure the watcher of the rollback Action
     * @returns 
     */
    rollBackWatcher(){
        return this.watcher().then(actionState=>{
            if(actionState !== this.dbDoc.state){
                return ActionState.SUCCESS
            }
            else{
                return ActionState.UNKNOW
            }
        })
    };

    /**
     * The action that rollback this action.
     */
    RollBackAction : typeof Action = RollBackAction //se contente d'un rollback
    RollBackWorkflow : typeof Workflow = RevertAction //attend la fin de l'action, puis declenche le rollback --> cycle complet


    /**
     * 
     * @returns The workflow that wait for the end of this action if needed and then rollback this action.
     */
    createRollBackWorkflow(){
        const t = new this.RollBackWorkflow();
        t.setArgument({
            actionId : this.dbDoc._id.toString()
        })
        return t;
    }
}

/* > The ResolveAction class is a subclass of the Action class. It is used to create an Action that resolve in SUCCESS state */
export class ResolveAction extends Action{   

    main(){
        return Promise.resolve(ActionState.SUCCESS)
    }

    watcher(){
        return Promise.resolve(ActionState.SUCCESS)
    }
}


/* > The RejectAction class is a subclass of the Action class. It is used to create an Action that resolve in ERROR state */
export class RejectAction extends Action{
    IBag : Object;
    IArgument : Object

    main(){
        return Promise.resolve(ActionState.ERROR)
    };

    watcher(){
        return Promise.resolve(ActionState.ERROR)
    }
}


/* > RollBackAction is an Action that rolls back another Action */
export class RollBackAction<A extends Action> extends Action{
    IArgument : {
        actionId : string
    }

    oldAction : A;

    init(){
        return this.app.ActionModel.findById(this.argument.actionId).then((dbDoc)=>{
           if(!dbDoc){
               throw ActionState.ERROR
           }
           this.oldAction = Action.constructFromDb(dbDoc as any) as A;
           return this.oldAction.initialisation();
        })
    }

    main(){
        return this.oldAction.rollBack();
    }

    watcher(){
        return this.oldAction.rollBackWatcher();
    }
}
