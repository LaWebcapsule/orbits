import { utils } from '@wbce/services';
import mongoose from 'mongoose';
import { Action, ActionRuntime, CoalescingWorkflow, Sleep } from '../index.js';
import { ActionError, InWorkflowActionError } from './error/error.js';
import { ActionSchemaInterface, ActionState } from './models/action.js';
import { JSONObject } from '@wbce/services/src/utils.js';
import { actionKind, actionKindSymbols } from './runtime/action-kind.js';

export type StepResult = {
    state: ActionState.SUCCESS | ActionState.ERROR;
    result: JSONObject;
    isError: boolean;
    actionRef: string;
    actionId: string;
    parentStepId: number;
    parentStepName: string;
}

export interface Step{
    [ActionState.SUCCESS]?: boolean;
    [ActionState.ERROR]?: boolean;
    cb?: (
        ...args: StepResult[]
    ) => void | Action | Action[] | Promise<void | Action | Action[]>;
    name?: string;
    opts?: {
        retry: number;
    };
    rollback?: Step['cb'];
}

class DoPromise<T> extends Promise<T>{}

const ACTION_TAG = actionKindSymbols.get(actionKind.ACTION);
const WORKFLOW_TAG = actionKindSymbols.get(actionKind.WORKFLOW);
const COALESCING_WORKFLOW_TAG = actionKindSymbols.get(actionKind.COALESCING_WORKFLOW);

export class Workflow extends Action {
    // a workflow will never be in ERROR state due to a timeout
    // ERROR state will be reported by its actions
    static defaultDelay = Infinity;

    static [WORKFLOW_TAG] = true;

    dBSession?: mongoose.ClientSession;

    docsToSaveAtStepStart: mongoose.Document[] = [];

    steps: Step[] = [];

    declare IBag: {
        actions: {
            [key: string]: {
                state: ActionState;
                result: JSONObject;
                ref: string;
                index: number;
            };
        };
        currentStepIndex?: number;
        currentStepName?: string;
        nTimesCurrentStep: number;
        stepsHistory: number[];
        registeredActions : {
          ref: string,
          _id : string  
        }[],
        currentTrackIds : string[];
        oldResult: StepResult[];
        preserveOldResult: StepResult[];
        /**
         * @deprecated
         */
        getNextStepAttemp: number;
        isRollBackPossible: boolean;
    };

    constructor() {
        super();
    }

    /**
     * Proxy that will be called before the start of any action.
     * Use this method to transform any action before it is started.
     * @param ref the step reference of the action to transform
     * @param action the action to transform
     * @returns the transformed action
     */

    transform(ref: string, action: Action): Action{
        return;
    }

    next(cb: Step['cb'], opts?: Step['opts']) {
        this.steps.push({
            [ActionState.SUCCESS]: true,
            cb,
            opts,
        });
        return this;
    }
    onError(cb: Step['cb'], opts?: Step['opts']) {
        this.steps.push({
            [ActionState.ERROR]: true,
            cb,
            opts,
        });
        return this;
    }

    onComplete(cb: Step['cb'], opts?: Step['opts']) {
        /*
        about finally behavior:
            - then(throw err).finally(...).finally(...).catch(>> goes through here << )
            - then(throw err).finally(throw err2).finally(...).catch(>> goes through here and receive err2 << )
        so finally doesn't change promise state
        - on success, return first result
        - on error, return last error
        
        to mimic this behavior and not type steps, add three steps:
        save args -> execute finally -> unstack previous args 
        */

        const transferActionsResults = (...args: StepResult[]) => {
            const actions: any[] = [];
            for (const result of args) {
                if (result.isError) {
                    actions.push(Action.reject(result));
                } else {
                    actions.push(Action.resolve(result));
                }
            }
            return actions;
        };

        this.steps.push({
            [ActionState.SUCCESS]: true,
            [ActionState.ERROR]: true,
            cb: (...args: any[]) => {
                this.bag.preserveOldResult = args;
                return transferActionsResults(...args);
            },
            opts,
        });

        this.steps.push({
            [ActionState.SUCCESS]: true,
            [ActionState.ERROR]: true,
            cb,
            opts,
        });

        this.steps.push({
            [ActionState.SUCCESS]: true,
            cb: (...args: any[]) =>
                transferActionsResults(...this.bag.preserveOldResult),
            opts,
        });
        return this;
    }

    rollback(cb: Step['cb'], opts?: Step['opts']) {
        const lastStep = this.steps[this.steps.length - 1];
        if (!lastStep || !lastStep.cb) {
            throw new ActionError('A rollback can only follow a standard step');
        }
        lastStep.rollback = cb;
        return this;
    }

    name(name: string) {
        this.steps.push({
            name,
        });
        return this;
    }

    goToStep(name: string) {
        const newIndex = this.steps.findIndex((s) => s.name === name);
        if (newIndex !== -1) {
            this.bag.currentStepName = name;
            this.bag.currentStepIndex = newIndex;
        }
        return Action.resolve({});
    }

    goTo(name: string, onState: ActionState) {
        this.steps.push({
            [onState]: true,
            cb: this.goToStep.bind(this, name),
        });
        return this;
    }

    breakAndReturn(result) {
        const newIndex = this.steps.length + 1;
        this.bag.currentStepName = 'exit';
        this.bag.currentStepIndex = newIndex;
        return Action.resolve(result);
    }

    breakAndReject(result) {
        const newIndex = this.steps.length + 1;
        this.bag.currentStepName = 'exit';
        this.bag.currentStepIndex = newIndex;
        return Action.reject(result);
    }

    onSuccessGoTo(name: string) {
        this.goTo(name, ActionState.SUCCESS);
        return this;
    }

    onErrorGoTo(name: string) {
        this.goTo(name, ActionState.ERROR);
        return this;
    }

    isActionActive(action: Action) {
        return utils.testPath(
            this.dbDoc,
            'bag',
            'actions',
            action.dbDoc._id.toString()
        )
            ? true
            : false;
    }

    executingDefine = false;
    defineCallMode : 'main' | 'actionFinding';
    /**
     * Defines the workflow logic.
     * Called multiple times for a single workflow process.
     * Use the `do` method to apply mutating operations.
     * @returns Promise that resolves with an argument of type `this['IResult']`.
     */
    async define(): Promise<this['IResult']>{
        return Promise.resolve() as any;
    }

    dynamicActionToFound : ActionSchemaInterface;
    dynamicActionFound : Action;
    resolveDynamicActionFinding = ()=>{};
    defineDynamicAction(actionDb : ActionSchemaInterface){
        if(this.executingDefine){
            throw new ActionError("can only execute define once at a time")
        }
        this.executingDefine = true;
        this.defineCallMode = 'actionFinding';
        this.dynamicActionToFound = actionDb;
        this.dynamicActionFound = undefined;
        return new Promise((resolve, reject)=>{
            let resolveNotCalled = true;
            const resolveIfActionFound = ()=>{
                if(!resolveNotCalled){
                    return;
                }
                resolveNotCalled = false;
                if(this.dynamicActionFound){
                    resolve(this.dynamicActionFound)
                }
                else{
                    reject(new ActionError(`action not found in definition - ${actionDb._id}, ${actionDb.actionRef}, ${actionDb.workflowStack[0]?.ref} `) )
                }
            }
            this.resolveDynamicActionFinding = resolveIfActionFound;
            this.define().then(resolveIfActionFound, resolveIfActionFound)
        }).finally(()=>{
            this.executingDefine = false;
        }) as Promise<Action>
    }

    resolveDefineIteration : (actionState? :ActionState)=>void = ()=>{};
    private trackDefine() : Promise<ActionState>{
        if(this.executingDefine){
            throw new Error("can only execute define once at a time")
        }
        this.executingDefine = true;
        this.defineCallMode = 'main';
        this.registeredActionIds = [];
        if(!this.bag.registeredActions){
            this.bag.registeredActions = [];
        }
        return new Promise((resolve, reject)=>{
            //if define() doesn't resolve, another resolution will occur through
            //resolveDefineIteration called in the `do` function
            let resolveNotCalled = true;
            this.resolveDefineIteration = (actionState : ActionState = ActionState.IN_PROGRESS)=>{
                if(resolveNotCalled){
                    //be sure to resolve the iteration only once
                    resolveNotCalled = false;
                    resolve(actionState)
                }
            };
            this.define().then((...results : any[])=>{
                if(results.length === 1){
                    this.result = results[0]
                }
                else{
                    this.setResult(results);
                }
                this.dbDoc.markModified("result")
                this.resolveDefineIteration(ActionState.SUCCESS) 
            }, (err)=>{
                resolveNotCalled = false;
                reject(err)
            })
        }).finally(()=>{
            this.executingDefine = false;
        }) as Promise<ActionState>
    }

    override main() {
        return this.trackDefine()
    }

    private trackAction(ref: string, action: ActionSchemaInterface){
        this.registeredActionIds.push(action.id);
        if(!this.bag.registeredActions.find((descriptor)=>{
            return descriptor._id === action.id
        })){
            this.bag.registeredActions.push({
                ref,
                _id: action.id
            })
        }
        if(this.bag.registeredActions.find((descriptor)=>{
            return descriptor.ref === ref
        })){
            //ActionRuntime.activeRuntime.logger.warning("your workflow has the same ref multiple times, which can be tricky. See docs for more information.")
        }
    }

    protected async findIfEquivalentActionAlreadyExists(ref: string, action : Action){
        let actionDbDoc : ActionSchemaInterface;

        //this is for common "do"
        const actions = await ActionRuntime.activeRuntime.ActionModel.find({
            workflowId : this._id.toString(),
            "workflowRef": ref
        }).sort("createdAt");
        if(actions.length){
            for(const action of actions){
                if(!this.registeredActionIds.includes(action.id)){
                    actionDbDoc = action;
                    break;
                }
            }
        }
        if(!actionDbDoc){
            if(action.constructor[COALESCING_WORKFLOW_TAG]){
                //this is for classic call of generator
                //check if we have registered an action for this ref in previous execution
                const actionDescriptor = this.bag.registeredActions.find((descriptor)=>{
                    if(descriptor.ref === ref && !this.registeredActionIds.includes(descriptor._id)){
                        return true
                    }
                    return false;
                })
                if(actionDescriptor){
                    actionDbDoc = await ActionRuntime.activeRuntime.ActionModel.findOne({
                        "_id": actionDescriptor._id
                    })
                }
                else{
                    const actionsWithSameIdentity = await ActionRuntime.activeRuntime.ActionModel.find({
                        "identity": (action as CoalescingWorkflow).stringifyIdentity(),
                        "actionRef": action.dbDoc.actionRef,
                        "state": {
                            $lt : ActionState.SUCCESS
                        }
                    }).sort("createdAt");
                    actionDbDoc = (action as CoalescingWorkflow).substitute(actionsWithSameIdentity);
                }  
            }
        }
        return actionDbDoc;
    }

    protected async startActionTransaction(ref: string, action: Action){
        this.trackAction(ref, action.dbDoc);
        return this.dbDoc
                    .save()
                    .then(() => {
                        const promises: any[] = [];
                        action.dbDoc.isNew = true; // necessary ?
                        // looks like it solves a bug that causes transientError
                        // et then withTransaction retry
                        // but isNew is false and then it errors out with DocumentNotFoundError
                        // to be confirmed
                        action.dbDoc.workflowStack.push({
                            ref,
                            stepIndex : this.bag.currentStepIndex,
                            _id : this._id.toString(),
                            stepName : ref
                        })
                        action.dbDoc.workflowId = this._id.toString();
                        action.dbDoc.workflowRef = ref;
                        if(this.constructor[COALESCING_WORKFLOW_TAG]){
                            action.dbDoc.workflowIdentity = (this as Workflow as CoalescingWorkflow).stringifyIdentity();   
                        }
                        action.dbDoc.$session(this.dBSession);
                        promises.push(action.save());
                        return Promise.all(promises);
                    })
    }

    protected async startAction(ref: string, action : Action) {
        action = this.transform(ref, action) || action;
        return this.runtime.db.mongo.conn
            .startSession()
            .then((mongooseSession) => {
                this.dBSession = mongooseSession;
                return this.dBSession!.withTransaction(async () => {
                    // beware: this function is often retried because of frequent TransientError
                    // do not put anything in this block that would accumulate
                    // (like this.x++)
                    this.dbDoc.$session(this.dBSession);
                    this.dbDoc.markModified('bag');
                    this.dbDoc.markModified('state');
                    this.dbDoc.increment()
                    // necessary in case of retry
                    // because we proceed in two passes
                    // https://stackoverflow.com/questions/64084992/mongoworkflowexception-query-failed-with-error-code-251
                    // first request from workflow must arrive before the others else there would be troubles
                    return this.startActionTransaction(ref, action)
                        .then(() => Promise.resolve()); // for typing
                }).then(()=>{
                    return Promise.all([
                        this.resyncWithDb(),
                        action.resyncWithDb()
                    ])
                })
            })
            .finally(() => {
                this.docsToSaveAtStepStart = [];
                if (this.dBSession) {
                    return this.dBSession.endSession();
                }
            })
            .then(() => {
                this.internalLog(
                    `action started : ${action._id.toString()}, ${action.dbDoc.actionRef}`
                );
            });
    }


    protected toPromise(ref: string, dbDoc : ActionSchemaInterface){
        return new DoPromise((resolve, reject)=>{
            switch (dbDoc.state) {
                case ActionState.ERROR:
                    reject(new InWorkflowActionError(this, ref, dbDoc));
                    break;

                case ActionState.SUCCESS:
                    resolve(dbDoc.result);
                    break;
            
                default:
                    this.resolveDynamicActionFinding();
                    this.resolveDefineIteration();    
                    break;
            }
        })
    }

    registeredActionIds = [];



    /**
     * Executes an action in the workflow.
     * If the action already exists, it will be tracked and resumed.
     * If not, it will be started.
     * @param ref the step reference of the action to execute
     * @param cb a callback that returns a promise
     * @returns a promise that resolves with the result of the action
     */
        do<T extends Action>(ref: string, action : T ) : DoPromise<T['IResult']> 

    /**
     * Executes an action in the workflow.
     * If the action already exists, it will be tracked and resumed.
     * If not, it will be started.
     * @param ref the step reference of the action to execute
     * @param cb a callback that returns a promise
     * @returns a promise that resolves with the result of the promise
     */
    do<T>(ref: string, cb : () => Promise<T>): DoPromise<T>
        
    /**
     * Executes an action in the workflow.
     * If the action already exists, it will be tracked and resumed.
     * If not, it will be started.
     * @param ref the step reference of the action to execute
     * @param opts an object containing a pattern of the action to execute
     * @param opts.init the init method of the action
     * @param opts.main the main method of the action
     * @param opts.watcher the watcher method of the action
     * @returns a promise that resolves with the result of the action
     */
    do(ref: string, opts : {
        init? : Action['init'],
        main: Action['main'],
        watcher? : Action['watcher']
    }) : DoPromise<any>

    /**
     * Executes an action in the workflow.
     * If the action already exists, it will be tracked and resumed.
     * If not, it will be started.
     * @param ref the step reference of the action to execute
     * @param opts an object containing an instanciation of a dynamic action
     * @param opts.dynamicAction an action or a function that returns an action
     * @returns a promise that resolves with the result of the action
     */
    do<T extends Action>(ref: string, opts:{
        dynamicAction : T | (()=>T)
    })
    do<T>(ref: string, opts : {
        init? : Action['init'],
        main: Action['main'],
        watcher? : Action['watcher']
    } | Action | {
        dynamicAction : (Action | (()=>Action))
    } | (() => Promise<any>), params? : {nCall : number}) : DoPromise<T>
    async do(ref: string, opts : {
        init? : Action['init'],
        main: Action['main'],
        watcher? : Action['watcher']
    } | Action | {
        dynamicAction : (Action | (()=>Action))
    } | (() => Promise<any>), params = {nCall : 0} ){
        let action : Action; 
        try{
            if(opts?.constructor?.[ACTION_TAG]){
                action = opts as Action;
            }
            else if(typeof opts['main'] === 'function'){
                action = new Action();
                action['main'] = opts['main'];
                action['init'] = opts['init'] || action['init'];
                action['watcher'] = opts['watcher'] || action['watcher'];
                action.dbDoc.definitionFrom.workflow = {
                    _id : this.dbDoc._id.toString(),
                    ref,
                    stepName: ref,
                    stepIndex : this.bag.currentStepIndex,
                    marker : ref
                }
            }
            else if(typeof opts === 'function'){
                const trackPromise = new TrackPromise();
                trackPromise.getPromiseLauncher = ()=>{
                    return opts;
                }
                action = trackPromise;
                action.dbDoc.definitionFrom.workflow = {
                    _id : this.dbDoc._id.toString(),
                    ref,
                    stepName: ref,
                    stepIndex : this.bag.currentStepIndex,
                    marker : ref
                }
            }
            else if(opts['dynamicAction'].constructor?.[ACTION_TAG]){
                action = opts['dynamicAction'];
                action.dbDoc.definitionFrom.workflow = {
                    _id : this.dbDoc._id.toString(),
                    ref,
                    stepName: ref,
                    stepIndex : this.bag.currentStepIndex,
                    marker : ref
                }
            }
            else if(typeof opts['dynamicAction'] === "function" ){
                action = opts['dynamicAction']();
                action.dbDoc.definitionFrom.workflow = {
                    _id : this.dbDoc._id.toString(),
                    ref,
                    stepName: ref,
                    stepIndex : this.bag.currentStepIndex,
                    marker : ref
                }
            }
            const actionDb = await this.findIfEquivalentActionAlreadyExists(ref, action);
            if(actionDb){
                this.internalLog("tracking existing action")
                this.trackAction(ref, actionDb)
                action.dbDoc = actionDb;
                if(this.defineCallMode === 'actionFinding' && actionDb._id.toString() === this.dynamicActionToFound._id.toString()){
                    this.dynamicActionFound = action;
                    this.resolveDynamicActionFinding();
                    return new Promise((resolve, reject)=>{})
                }
            }
            else{           
                this.internalLog(`using a new action for step ${ref}`)   
                if (this.defineCallMode === 'main'){
                    await this.startAction(ref, action);
                }
            }
            if(this.defineCallMode === 'main'){
                action.dbDoc.cronActivity.pending = this.dbDoc.cronActivity.pending;
                await action.resume();
                await action.resyncWithDb();
            }
        }
        catch(err){
            if (err.code === 11000 && err.message.includes('duplicate key error') && params.nCall < 1) {
                //we retry only once;
                params.nCall ++;
                return this.do(ref, opts, params);
            }
            //in case we didn't success in manipulating the action
            //we just exit and will be retried later
            //maybe we should have a max. number of exit before erroring
            this.internalLog(`body of do method didn't succeed ; ref: ${ref}, got error : ${err}`);
            this.internalLogError(err);
            this.resolveDefineIteration(ActionState.UNKNOWN);//Unknow ensure here we don't change the state and so we don't have an infinite loop
            this.resolveDynamicActionFinding();
            return new DoPromise((resolve, reject)=>{});
        }
        return this.toPromise(ref, action.dbDoc);//no await here : has to been done in the parent call
    }

    /**
     * Repeats a do a number of times.
     * @param ref the step reference of the action to repeat
     * @param cb a callback that returns a promise
     * @param repeat an object containing the number of times to repeat the action
     * @returns a promise that resolves with the result of the last action
     */
    repeatDo<T>(ref: string, cb : () => Promise<T>, repeat: Action['repeat'] & {elapsedTime?: number}): DoPromise<T>
    repeatDo<T>(ref: string, opts : () => Promise<T>, repeat: Action['repeat'] & {elapsedTime?: number}) : DoPromise<T>
    async repeatDo<T>(ref: string, cb : () => Promise<T>, repeat: Action['repeat'] & {elapsedTime?: number}){
        let result;
        let nError = 0;
        let nExecution = 0;
        const nSuccessIteration = repeat[ActionState.SUCCESS] ?? 0;
        for(let i=0; i <= nSuccessIteration; i++ ){
            if(nExecution > 0){
                await this.do("sleep", new Sleep().setArgument({
                    time: repeat.elapsedTime || 10*60*1000
                }))
            }
            try{
                result = await this.do(ref, cb);
            }
            catch(err){
                if(nError < repeat[ActionState.ERROR]){
                    i--;
                }
                else{
                    throw err;
                }
                nError++;
            }
            nExecution ++;
        }
        return result;
    }
            

    override onMainTimeout(): ActionState | Promise<ActionState> {
        // workflow hasn't been launched yet, launch again.
        return ActionState.SLEEPING;
    }

    override watcher() {
        return this.runtime.ActionModel.find({
            $and: [{
                $or : [{
                    workflowId: this.dbDoc.id,
                },
                {
                    _id : {
                        $in : this.bag.registeredActions.map(d=>d._id)
                    }
                }]
            },
            {
                $or: [
                    {
                        state: { $lt: ActionState.SUCCESS },
                    },
                    {
                        state: ActionState.SUCCESS,
                        [`repeat.${ActionState.SUCCESS}`]: { $gt: 0 },
                    },
                    {
                        state: ActionState.ERROR,
                        [`repeat.${ActionState.ERROR}`]: { $gt: 0 },
                    },
                ]
            }]
        }).then((actions) => {
            if (actions.length === 0) {
                return ActionState.PAUSED;
            } else {
                this.internalLog(`pending actions are present : ${JSON.stringify(actions.map(a=>{return {_id: a.id, ref: a.actionRef}}))}`)
                if (!this.dbDoc.cronActivity.pending) {
                    // no parallelism in cron
                    // else it would trigger a watch or an execute for all non terminated actions
                    // watch is done in parallel
                    actions.map(async (a) => {
                        const action = await Action.constructFromDb(
                            a as any as ActionSchemaInterface
                        );
                        action.resume();
                    });
                }
                return ActionState.IN_PROGRESS;
            }
        });
    }

    static findPendingWorkflowUsingAction(actionDbDoc: ActionSchemaInterface){
        return ActionRuntime.activeRuntime.ActionModel.find({
            $and: [{
                $or : [{
                    _id: actionDbDoc.workflowId,
                },
                {
                    "bag.registeredActions._id" : actionDbDoc._id.toString()
                }]
            },
            {
                $or: [
                    {
                        state: { $lt: ActionState.SUCCESS },
                    },
                    {
                        state: ActionState.SUCCESS,
                        [`repeat.${ActionState.SUCCESS}`]: { $gt: 0 },
                    },
                    {
                        state: ActionState.ERROR,
                        [`repeat.${ActionState.ERROR}`]: { $gt: 0 },
                    },
                ]
            }]
        })
    }

    override internalLogError(err: Error) {
        this.runtime.logger.error('!!-.-!!', {
            actionRef: this.dbDoc.actionRef,
            actionId: this.dbDoc._id.toString(),
            filter: this.dbDoc.filter,
            err: err,
            workflowStepId: this.dbDoc.bag.currentStepIndex,
            workflowStepName: this.dbDoc.bag.currentStepName,
        });
    }

}


export class TrackPromise extends Action{

    declare IBag: {
        cbReturnAnAction : boolean;
        trackActionId : string;
    };

    getPromiseLauncher : ()=>()=>Promise<any>;

    subAction : Action;


    main(){
        const cb = this.getPromiseLauncher();
        const p = cb()
        return p.then((...results)=>{
            this.setResult(...results);
            return ActionState.SUCCESS
        })
    }

    onMainTimeout(): ActionState | Promise<ActionState> {
        return ActionState.ERROR;
    }

    watcher(): Promise<ActionState> {
        return Promise.resolve(ActionState.ERROR)
    }

    internalLog(message: string, opts = {level : 'debug'}){

    }

}