import { utils, wbceAsyncStorage } from '@wbce/services';
import { ActionApp, RevertAction, Workflow } from '../index.js';
import { Executor } from './action-executor.js';
import { ActionError, BreakingActionState } from './error/error.js';
import { errorCodes } from './error/errorcodes.js';
import { ActionSchemaInterface, ActionState } from './models/action.js';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Structure actions.
 *
 * Extends this class to build new actions behaviors.
 */
export class Action {
    /**
     * Id of the action stored in database.
     * It should be a permanent id that designates the action instance.
     */
    static permanentRef: string | string[];

    /**
     * Specify an executor in which all actions of this class will run.
     */
    executor?: Executor;

    app: ActionApp = ActionApp.getActiveApp();

    /**
     * Shortcut to {@link Action.defaultDelays[ActionState.IN_PROGRESS]}.
     *
     * If not set, this property will be 'inherited' from the first parent class where it is.
     */
    static defaultDelay: number = 10 * 60 * 1000;

    /**
     * For the states `ActionState.EXECUTING_MAIN` and `ActionState.IN_PROGRESS`,
     * this object configures the time after which, if no change happened, an action is considered in error.
     *
     * For example, an action can only be in the `ActionState.IN_PROGRESS` state for as long as
     * `defaultDelays[ActionState.IN_PROGRESS]` time.
     *
     * @defaultValue
     * ```
     * {
     *    [ActionState.IN_PROGRESS] : this.defaultDelay,
     *    [ActionState.EXECUTING_MAIN] : 2*60*1000,
     * }
     * ```
     *
     * You should configure this if your actions have longer timeouts.
     *
     * If not set, this property will be 'inherited' from the first parent class where it is.
     */
    static defaultDelays: {
        [k in ActionState.IN_PROGRESS | ActionState.EXECUTING_MAIN]?: number;
    } = {
        [ActionState.IN_PROGRESS]: this.defaultDelay,
        [ActionState.EXECUTING_MAIN]: 2 * 60 * 1000,
    };

    /**
     * Configure the frequency at which a cron will launch {@link Action.resume}.
     * It is also possible to dynamically modify the dbDoc.cronActivity property to modify the call to a cron.
     * If not set, this property will be 'inherited' from the first parent class where it is.
     */
    static cronDefaultSettings: {
        /**
         * @deprecated use activityFrequency
         */
        activityFrequence?: number;
        /**
         * TODO: set this as required after activityFrequence removal
         */
        activityFrequency?: number;
    } = {
        activityFrequence: 10 * 60 * 1000,
        activityFrequency: 10 * 60 * 1000,
    };

    /**
     * Action argument
     */
    IArgument: {};

    /**
     * Action bag
     */
    IBag: {};

    /**
     * Action result
     */
    IResult: {};

    /**
     * Action Database Document
     */
    dbDoc: ActionSchemaInterface<
        this['IArgument'],
        this['IBag'],
        this['IResult']
    >;

    get bag(): this['dbDoc']['bag'] {
        return this.dbDoc.bag;
    }

    set bag(bag: this['dbDoc']['bag']) {
        this.dbDoc.bag = bag;
        this.dbDoc.markModified('bag');
    }

    get argument(): this['dbDoc']['argument'] {
        return this.dbDoc.argument;
    }

    set argument(argument: this['dbDoc']['argument']) {
        this.dbDoc.argument = argument;
        this.dbDoc.markModified('argument');
    }

    get result(): this['dbDoc']['result'] {
        return this.dbDoc.result;
    }

    set result(result: this['dbDoc']['result']) {
        this.dbDoc.result = result;
        this.dbDoc.markModified('result');
    }

    get repeat(): this['dbDoc']['repeat'] {
        return this.dbDoc.repeat;
    }

    set repeat(repeat: this['dbDoc']['repeat']) {
        this.dbDoc.repeat = repeat;
        this.dbDoc.markModified('repeat');
    }

    get cronActivity(): this['dbDoc']['cronActivity'] {
        return this.dbDoc.cronActivity;
    }

    set cronActivity(cronActivity: this['dbDoc']['cronActivity']) {
        this.dbDoc.cronActivity = cronActivity;
        this.dbDoc.markModified('cronActivity');
    }

    get _id(): this['dbDoc']['_id'] {
        return this.dbDoc._id;
    }

    save() {
        return this.dbDoc.save();
    }

    constructor() {
        const actionRef = this.app.getActionRefFromRegistry(
            this.constructor as any
        );
        if (!actionRef) {
            throw new ActionError(
                'Please declare this action in a bootstrapped app before using it',
                errorCodes.NOT_ACCEPTABLE,
                {
                    ctrName: this.constructor.name,
                }
            );
        }
        // Copy the static properties to create the dynamic ones
        // Check whether defaultDelay has priority over defaultDelays[ActionState.SUCCESS]
        // (if and only if it was set before in the inheritance chain)
        let cronDefaultSettings, defaultDelays, defaultDelay;
        let ctr = this.constructor as typeof Action;
        cronDefaultSettings = {};
        utils.deepCopy(ctr.cronDefaultSettings, cronDefaultSettings);
        defaultDelays = {};
        utils.deepCopy(ctr.defaultDelays, defaultDelays);
        defaultDelay = ctr.defaultDelay;
        let nInheritanceForDefaultDelay = Infinity;
        let nInheritanceForDefaultDelays = Infinity;
        let n = 1;

        while (ctr !== Action) {
            if (
                ctr.hasOwnProperty('defaultDelay') &&
                n < nInheritanceForDefaultDelay
            ) {
                nInheritanceForDefaultDelay = n;
            }
            if (
                ctr.hasOwnProperty('defaultDelays') &&
                n < nInheritanceForDefaultDelays
            ) {
                nInheritanceForDefaultDelays = n;
            }
            n++;
            ctr = Object.getPrototypeOf(ctr);
        }

        if (nInheritanceForDefaultDelay < nInheritanceForDefaultDelays) {
            defaultDelays[ActionState.IN_PROGRESS] = defaultDelay;
        }

        this.dbDoc = new this.app.ActionModel({
            actionRef,
            state: ActionState.SLEEPING,
            bag: {},
        }) as any;
        this.dbDoc.cronActivity.frequency =
            // TODO: only use activityFrequency once activityFrequence is removed
            cronDefaultSettings.activityFrequence ||
            cronDefaultSettings.activityFrequency;
        this.dbDoc.delays = defaultDelays as any;

        this.app = ActionApp.getActiveApp();
    }

    /**
     * Construct an action from a document stored in the database.
     * @param actionDb a document coming from the database
     * @returns an action for which dbDoc property is equal to actionDb
     */
    static _constructFromDb(actionDb: ActionSchemaInterface<any>): Action {
        const app = ActionApp.getActiveApp();
        const ActionCtr = app.getActionFromRegistry(actionDb.actionRef);
        let action: Action;
        try {
            action = new ActionCtr();
        } catch (err) {
            throw new ActionError(
                `The action with ref ${actionDb.actionRef} has not been registered`,
                errorCodes.RESOURCE_NOT_FOUND,
                {
                    err,
                    actionDb,
                }
            );
        }
        action.dbDoc = actionDb;
        return action;
    }

    static async constructFromDb(actionDb: ActionSchemaInterface<any>) {
        if (actionDb.definitionFrom?.workflow?._id) {
            return this.dynamicDefinitionFromWorkflowStep(actionDb);
        } else {
            return Action._constructFromDb(actionDb);
        }
    }

    static async dynamicDefinitionFromWorkflowStep(
        dbDoc: ActionSchemaInterface<any>
    ) {
        try {
            const workflowDoc = await ActionApp.activeApp.ActionModel.findById(
                dbDoc.definitionFrom.workflow._id
            );
            const workflow = (await Action.constructFromDb(
                workflowDoc
            )) as Workflow;
            await workflow.initialization();
            const stepsActions = await workflow.getActionsOfStep(
                dbDoc.definitionFrom.workflow
            );
            let action: Action;
            if (Array.isArray(stepsActions)) {
                action = stepsActions.find(
                    (a) =>
                        a.dbDoc.definitionFrom.workflow.marker ===
                        dbDoc.definitionFrom.workflow.marker
                );
            } else if (stepsActions instanceof Action) {
                action = stepsActions;
            }
            action.dbDoc = dbDoc;
            return action;
        } catch (err) {
            if (
                dbDoc.state >= ActionState.SUCCESS &&
                dbDoc.state < ActionState.REVERTING
            ) {
                return Action._constructFromDb(dbDoc);
            }
            throw err;
        }
    }

    /**
     * @deprecated use dynamicallyDefineFromWorkflowStep
     */
    dynamiclyDefineFromWorfklowStep(workflow: Workflow, marker: string) {
        this.dynamicallyDefineFromWorkflowStep(workflow, marker);
    }

    dynamicallyDefineFromWorkflowStep(workflow: Workflow, marker: string) {
        this.dbDoc.definitionFrom.workflow = {
            _id: workflow._id.toString(),
            ref: workflow.dbDoc.actionRef,
            stepIndex: workflow.bag.currentStepIndex,
            stepName: workflow.bag.currentStepName,
            marker,
        };
        this.dbDoc.markModified('definitionFrom');
    }

    /**
     * Update the current model instance with latest data from database
     * @returns a promise that resolves when the document has been loaded
     */
    resyncWithDb() {
        return this.app.ActionModel.findById(this.dbDoc._id.toString()).then(
            (newDb) => {
                if (newDb) {
                    this.dbDoc = newDb as any;
                } else {
                    this.dbDoc.$isDeleted(true);
                }
            }
        );
    }

    /**
     * Return a new {@link ResolveAction} object.
     * @param result action result
     * @returns new `ResolveAction`instance
     */
    static resolve(result?) {
        const success = new ResolveAction();
        result ? (success.result = result) : undefined;
        return success;
    }

    /**
     * Return a new {@link RejectAction} object.
     * @param result action result
     * @returns new `RejectAction`instance
     */
    static reject(result?) {
        const error = new RejectAction();
        result ? (error.result = result) : undefined;
        return error;
    }

    private execute() {
        return this.changeState(ActionState.EXECUTING_MAIN)
            .catch((err) => {
                if (err && err.code === errorCodes.RESOURCE_LOCKED) {
                    // current thread is not handling the workflow
                    throw new BreakingActionState(ActionState.UNKNOWN);
                }
                throw err;
            })
            .then(() => this.initialization())
            .then(() => {
                this.internalLog('main');
                return this.main();
            })
            .catch((err) => {
                if (err instanceof BreakingActionState) {
                    if (err.result) {
                        this.setResult(err.result);
                    }
                    return err.actionState;
                }
                this.internalLogError(err);
                this.result = err;
                return ActionState.ERROR;
            });
    }

    /**
     * Initialize the action from the action stored in the database.
     *
     * Example: In order to not store secrets in the database,
     * you can set a vault id in the argument
     * and retrieve the secret at the initialization of the action.
     *
     * Example: You cannot store class object on the database.
     * If your action use complex object, they can be initialized here.
     */
    init(): Promise<any> {
        return Promise.resolve();
    }

    defineExecutor(): void | Promise<void> {
        return;
    }

    /**
     * Set the `argument` that will be stored in the database.
     * Once set, the argument of an action should not be modified.
     * @param args - The argument to set.
     */
    setArgument(args: this['IArgument']) {
        this.argument = { ...this.argument, ...args };
        this.dbDoc.markModified('argument');
    }

    /**
     * Configure the number of times an action is repeated.
     * @param opts
     */

    setRepeat(opts: this['repeat']) {
        this.repeat = {
            ...this.repeat,
            ...opts,
        };
    }

    /**
     * Make filtering actions easier with the `filter` property.
     * These filters are stored in database with
     * the `filter` property and allow to search for
     * an action or a group of actions
     * @param filter
     */

    setFilter(filter: Object) {
        this.dbDoc.filter = { ...this.dbDoc.filter, ...filter };
        this.dbDoc.markModified('filter');
    }

    /**
     * Set the action result.
     * @param result
     */
    setResult(result: Object) {
        this.dbDoc.result = { ...this.dbDoc.result, ...result };
        this.dbDoc.markModified('result');
    }

    /**
     * Watch the action state.
     *
     * It is called :
     * - potentially many times when the action is in `IN_PROGRESS` state
     * - one time if the action is in `EXECUTING_MAIN` state and the executing_main delay has expired.
     * @returns promise
     */
    watcher() {
        return Promise.resolve(ActionState.UNKNOWN);
    }

    /**
     * @deprecated use isInitialized
     */
    isInitialised = false;
    isInitialized = false;

    /**
     * @deprecated use initialization
     */
    initialisation() {
        return this.initialization();
    }

    /**
     * Mainly used for workflows.
     * Can also complement init().
     * If it gets too complex, use hooks.
     */
    initialization() {
        // TODO: remove isInitialised
        if (this.isInitialised || this.isInitialized) {
            return Promise.resolve();
        }
        this.internalLog('init');
        return this.init().then(() => {
            // TODO: remove isInitialised
            this.isInitialised = true;
            this.isInitialized = true;
        });
    }

    isExecutorSet = false;
    private setExecutor() {
        if (this.isExecutorSet) {
            return Promise.resolve();
        }
        this.isExecutorSet = true;
        this.internalLog('setExecutor');
        return Promise.resolve(this.defineExecutor());
    }

    private watch() {
        return this.initialization()
            .then(() => {
                this.internalLog('watcher');
                return this.watcher();
            })
            .then((actionState) => {
                if (
                    actionState === ActionState.UNKNOWN ||
                    actionState === ActionState.IN_PROGRESS
                ) {
                    if (
                        this.dbDoc.delays[ActionState.IN_PROGRESS] <
                            Date.now() - this.dbDoc.stateUpdatedAt.getTime() &&
                        this.dbDoc.state === ActionState.IN_PROGRESS
                    ) {
                        return ActionState.ERROR;
                    }
                }
                return actionState;
            });
    }

    private checkMainExecutionDelay() {
        if (
            Date.now() - this.dbDoc.stateUpdatedAt.getTime() >=
            this.dbDoc.delays[ActionState.EXECUTING_MAIN]
        ) {
            this.internalLog('main function has timed out');
            const timeoutError = new ActionError(
                'main function has timed out',
                errorCodes.TIMEOUT
            );
            return this.initialization()
                .then(() => {
                    this.internalLog('onMainTimeout');
                    return this.onMainTimeout();
                })
                .then((actionState) => {
                    if (actionState === ActionState.UNKNOWN) {
                        this.setResult(timeoutError);
                        return ActionState.ERROR;
                    }
                    return actionState;
                })
                .catch((err) => {
                    if (err instanceof BreakingActionState) {
                        // short circuit
                        if (err.result) {
                            this.setResult(err.result);
                        }
                        if (err.actionState === ActionState.UNKNOWN) {
                            this.setResult(timeoutError);
                            return ActionState.ERROR;
                        }
                        return err.actionState;
                    } else {
                        this.internalLogError(err);
                        this.result = err;
                        return ActionState.ERROR;
                    }
                });
        }
        return Promise.resolve(ActionState.UNKNOWN);
    }

    /**
     * This method should launched the main action process
     * It is called only one time.
     * It returns a state value.
     * @returns
     */

    main(): ActionState | Promise<ActionState> {
        return Promise.resolve(ActionState.ERROR);
    }

    /**
     * The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
     * state of the action
     * @returns A promise. You can not rely on this to know when an action is finished.
     */
    public resume() {
        this.dbDoc.updateNextActivity(); //set next cron Activity
        return wbceAsyncStorage.addNestedStorage(
            {
                logInfo: {
                    actionRef: this.dbDoc.actionRef,
                    actionId: this._id.toString(),
                    filter: this.dbDoc.filter,
                },
            },
            () => {
                let setExecutor = Promise.resolve();
                if (!this.isExecutorSet) {
                    setExecutor = this.setExecutor();
                }
                return setExecutor.then(() => {
                    if (this.executor) {
                        return this.executor.resume(this);
                    } else {
                        return this._resume();
                    }
                });
            }
        );
    }

    /**
     * The function resumes the action by calling the appropriate function depending on the current
     * state of the action. It doesn't take into account the executor.
     * @returns A promise. You can not rely on this to know when an action is finished.
     */
    public _resume() {
        let resume;
        switch (this.dbDoc.state) {
            case ActionState.PAUSED:
            case ActionState.SLEEPING:
                resume = this.execute();
                break;

            case ActionState.EXECUTING_MAIN:
                resume = this.checkMainExecutionDelay();
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
                resume = Promise.resolve(ActionState.UNKNOWN);
                break;
        }
        return resume.then(this.onStateNotification.bind(this)).catch((err) => {
            if (err && err.code === errorCodes.RESOURCE_LOCKED) {
                this.internalLog('Lock already acquired');
            } else {
                this.internalLogError(err);
            }
        });
    }

    changeState(actionState: ActionState) {
        const oldState = this.dbDoc.state;
        this.dbDoc.state = actionState;
        return this.dbDoc.lockAndSave().then(() => {
            this.internalLog(
                `state changed : ${ActionState[oldState]} --> ${ActionState[actionState]}`
            );
        });
    }

    onStateNotification(actionState: ActionState = ActionState.UNKNOWN) {
        if (
            actionState !== ActionState.UNKNOWN &&
            this.dbDoc.state !== actionState
        ) {
            return this.changeState(actionState).then(this.resume.bind(this));
        }
        return Promise.resolve();
    }

    /**
     * Called in case of timeout in `ActionState.EXECUTING_MAIN` state.
     *
     * It can return `ActionState.SLEEPING` if the process infers
     * that `main()` has not run and the action must be retried.
     *
     * @returns a `ActionState` value.
     */
    onMainTimeout(): ActionState | Promise<ActionState> {
        return ActionState.UNKNOWN;
    }

    private end() {
        const markAsClosed = () => {
            // wait for a day before marking the action as closed
            if (Date.now() - this.dbDoc.stateUpdatedAt.getTime() < ONE_DAY_MS) {
                this.cronActivity.nextActivity = new Date(
                    this.dbDoc.stateUpdatedAt.getTime() + ONE_DAY_MS
                );
                return this.dbDoc.save().then(
                    () => ActionState.UNKNOWN // short circuit
                );
            } else {
                this.dbDoc.nExecutions[this.dbDoc.state]++;
                return ActionState.CLOSED;
            }
        };

        if (this.repeat[this.dbDoc.state] > 0) {
            this.repeat[this.dbDoc.state]--;
            this.bag = {};
            this.result = {};
            // no state return here
            // change state and wait for next iteration when cron runs again (min 10min)
            this.dbDoc.nExecutions[this.dbDoc.state]++;
            if (
                this.dbDoc.cronActivity.nextActivity.getTime() - Date.now() <
                10 * 60 * 1000
            ) {
                this.dbDoc.cronActivity.nextActivity = new Date(
                    Date.now() + 10 * 60 * 1000
                );
            }
            return this.changeState(ActionState.SLEEPING);
        } else if (this.dbDoc.workflowId) {
            return this.app.ActionModel.findById(this.dbDoc.workflowId).then(
                async (workflowDb) => {
                    if (workflowDb) {
                        const workflow = (await Action.constructFromDb(
                            workflowDb as any
                        )) as unknown as Workflow;
                        if (workflow.isActionActive(this)) {
                            return workflow.resume();
                        }
                    }
                    return markAsClosed();
                }
            );
        }
        return Promise.resolve(markAsClosed());
    }

    private quit() {
        if (
            this.isRollBackPossible &&
            !(this.dbDoc.state === ActionState.REVERTED)
        ) {
            // freeze action waiting for a future rollback
            this.dbDoc.cronActivity.nextActivity = new Date(4022, 1, 1);
            return this.dbDoc.save().then(
                () => ActionState.UNKNOWN // short circuit
            );
        }
        const timeFromEnd = Date.now() - this.dbDoc.stateUpdatedAt.getTime();
        if (timeFromEnd >= ONE_DAY_MS) {
            return this.destroy().then(
                () => ActionState.UNKNOWN // short circuit
            );
        } else {
            this.cronActivity.nextActivity = new Date(
                this.dbDoc.stateUpdatedAt.getTime() + ONE_DAY_MS
            );
            return this.dbDoc.save().then(
                () => ActionState.UNKNOWN // short circuit
            );
        }
    }

    private destroy() {
        return this.dbDoc.remove();
    }

    activityLogs(options: any): any[] | Promise<any[]> {
        return [] as string[];
    }

    getLogs(options: { endTime?: number } = {}) {
        let state;
        if (!options.endTime) {
            switch (this.dbDoc.state) {
                case ActionState.SLEEPING:
                    state = 'SLEEPING';
                    break;

                case ActionState.PAUSED:
                    state = 'PAUSED';
                    break;

                case ActionState.IN_PROGRESS:
                    state = 'IN_PROGRESS';
                    break;

                case ActionState.SUCCESS:
                    state = 'SUCCESS';
                    break;

                case ActionState.ERROR:
                    state = 'ERROR';
                    break;

                case ActionState.CLOSED:
                    state = 'CLOSED';
                    break;

                default:
                    break;
            }
        }
        return Promise.resolve(this.activityLogs(options)).then((logs) => {
            if (state) {
                logs.push(
                    `${this.dbDoc._id.toString()}-${
                        this.dbDoc.actionRef
                    } is in ${state} state`
                );
            }
            return logs;
        });
    }

    internalLog(message: string) {
        let defFromWorkflow: any;
        if (this.dbDoc.definitionFrom.workflow.marker) {
            defFromWorkflow = (
                this.dbDoc.definitionFrom.workflow as any
            ).toObject();
        }
        let filter = this.dbDoc.filter;
        if (!Object.keys(filter).length) {
            filter = undefined;
        }
        this.app.logger.info(message, {
            actionRef: this.dbDoc.actionRef,
            actionId: this.dbDoc._id.toString(),
            filter,
            definedIn: defFromWorkflow,
            timestamp: new Date().toISOString(),
        });
    }

    internalLogError(err: Error) {
        this.app.logger.error('!!-.-!!', {
            actionRef: this.dbDoc.actionRef,
            actionId: this.dbDoc._id.toString(),
            filter: this.dbDoc.filter,
            err: err,
        });
    }

    get isRollBackPossible() {
        // check that at least one of the properties has changed from default ones
        const mockAction = new Action();
        if (
            this.RollBackAction !== mockAction.RollBackAction ||
            this.RollBackWorkflow !== mockAction.RollBackWorkflow ||
            this.rollBack !== mockAction.rollBack ||
            this.rollBackWatcher !== mockAction.rollBackWatcher
        ) {
            return true;
        }
        return false;
    }

    /**
     * Shortcut to configure a rollback.
     * Will be encapsulated in a larger action
     */
    rollBack() {
        return Promise.resolve(ActionState.SUCCESS);
    }

    /**
     * Shortcut to configure the watcher for the rollback.
     * @returns
     */
    rollBackWatcher() {
        return this.watcher().then((actionState) => {
            if (actionState !== this.dbDoc.state) {
                return ActionState.SUCCESS;
            } else {
                return ActionState.UNKNOWN;
            }
        });
    }

    /**
     * The action that rollback this action.
     */
    RollBackAction: typeof Action = RollBackAction;

    /**
     * Workflow that rollbacks the action.
     *
     * Wait for action end then rollback.
     * Will use {@link RollBackAction}.
     */
    RollBackWorkflow: typeof Workflow = RevertAction;

    /**
     * Instantiate workflow that will rollback this action.
     */
    createRollBackWorkflow() {
        const workflow = new this.RollBackWorkflow();
        workflow.setArgument({
            actionId: this.dbDoc._id.toString(),
        });
        return workflow;
    }
}

/**
 * Action that resolves in SUCCESS state.
 */
export class ResolveAction extends Action {
    main() {
        return Promise.resolve(ActionState.SUCCESS);
    }

    watcher() {
        return Promise.resolve(ActionState.SUCCESS);
    }
}

/**
 * Action that resolve in ERROR state
 */
export class RejectAction extends Action {
    IBag: Object;
    IArgument: Object;

    main() {
        return Promise.resolve(ActionState.ERROR);
    }

    watcher() {
        return Promise.resolve(ActionState.ERROR);
    }
}

/**
 * Action that rolls back another Action
 */
export class RollBackAction<A extends Action> extends Action {
    IArgument: {
        actionId: string;
    };

    oldAction: A;

    init() {
        return this.app.ActionModel.findById(this.argument.actionId).then(
            async (dbDoc) => {
                if (!dbDoc) {
                    throw new BreakingActionState(ActionState.ERROR);
                }
                this.oldAction = (await Action.constructFromDb(
                    dbDoc as any
                )) as A;
                return this.oldAction.initialization();
            }
        );
    }

    main() {
        return this.oldAction.rollBack();
    }

    watcher() {
        return this.oldAction.rollBackWatcher();
    }
}
