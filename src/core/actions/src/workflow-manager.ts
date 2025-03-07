import { utils } from '@wbce/services';
import mongoose from 'mongoose';
import { Action } from '../index.js';
import { ActionError, BreakingActionState } from './error/error.js';
import { errorCodes } from './error/errorcodes.js';
import { ActionSchemaInterface, ActionState } from './models/action.js';

export interface StepResult<T = any> {
    state: ActionState.SUCCESS | ActionState.ERROR;
    result: T;
    isError: boolean;
    actionRef: string;
    actionId: string;
    parentStepId: number;
    parentStepName: string;
}

export interface Step {
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

export class Workflow extends Action {
    // a workflow will never be in ERROR state
    // ERROR state will be reported by its actions
    static defaultDelay = Infinity;

    dBSession?: mongoose.ClientSession;

    docsToSaveAtStepStart: mongoose.Document[] = [];

    steps: Step[] = [];

    override IBag: {
        actions: {
            [key: string]: {
                state: ActionState;
                result: any;
                ref: string;
                index: number;
            };
        };
        currentStepIndex?: number;
        currentStepName?: string;
        nTimesCurrentStep: number;
        stepsHistory: number[];
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

    next(cb: Step['cb'], opts?: Step['opts']) {
        this.steps.push({
            [ActionState.SUCCESS]: true,
            cb,
            opts,
        });
        return this;
    }

    catch(cb: Step['cb'], opts?: Step['opts']) {
        return this.onError(cb, opts);
    }

    onError(cb: Step['cb'], opts?: Step['opts']) {
        this.steps.push({
            [ActionState.ERROR]: true,
            cb,
            opts,
        });
        return this;
    }

    finally(cb: Step['cb'], opts?: Step['opts']) {
        return this.onComplete(cb, opts);
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

    declareActionStart(dbDoc: ActionSchemaInterface, index: number) {
        //we register the index in order to give the result in the correct order
        const workflowBag = this.dbDoc.bag;
        dbDoc.workflowId = this.dbDoc._id.toString();
        dbDoc.workflowStep = workflowBag.stepsHistory.length - 1;
        dbDoc.workflowStack = [
            ...this.dbDoc.workflowStack,
            {
                ref: this.dbDoc.actionRef,
                _id: this._id.toString(),
                stepIndex: this.bag.currentStepIndex,
                stepName: this.bag.currentStepName,
            },
        ];
        dbDoc.filter = { ...this.dbDoc.filter, ...dbDoc.filter };
        dbDoc.markModified('filter');
        workflowBag.actions[dbDoc._id.toString()] = {
            state: dbDoc.state,
            result: dbDoc.result,
            ref: dbDoc.actionRef,
            index,
        };
        this.dbDoc.markModified('bag.actions');
    }

    async declareActionEnd(dbDoc: ActionSchemaInterface<any>) {
        const workflowBag = this.dbDoc.bag;
        workflowBag.actions[dbDoc._id.toString()]!.state = dbDoc.state;
        workflowBag.actions[dbDoc._id.toString()]!.result = dbDoc.result;
        const action = await Action.constructFromDb(dbDoc);
        if (action.isRollBackPossible) {
            this.bag.isRollBackPossible = true;
        }
        this.dbDoc.markModified('bag.actions');
    }

    getNextStep() {
        if (this.bag.currentStepIndex === undefined) {
            this.bag.currentStepIndex = -1;
            this.bag.actions = {};
            this.bag.stepsHistory = [];
        }
        let isStepSuccess = true;
        let oldStepState = ActionState.ERROR;

        const numberOfActions = Object.keys(this.bag.actions).length;
        let oldResults: StepResult[] = new Array(numberOfActions);
        for (let k in this.bag.actions) {
            const actionSynth = this.bag.actions[k];
            oldResults[actionSynth.index] = {
                result: actionSynth.result,
                actionRef: actionSynth.ref,
                actionId: k,
                parentStepId: this.bag.currentStepIndex,
                parentStepName: this.bag.currentStepName,
                isError: actionSynth.state === ActionState.ERROR,
                state: actionSynth.state as
                    | ActionState.SUCCESS
                    | ActionState.ERROR,
            };
        }

        for (let key in this.bag.actions) {
            isStepSuccess =
                isStepSuccess &&
                this.bag.actions[key]!.state === ActionState.SUCCESS;
        }
        oldStepState = isStepSuccess ? ActionState.SUCCESS : ActionState.ERROR;

        const newIndex = this.steps.findIndex(
            (step, i) => i > this.bag!.currentStepIndex! && step[oldStepState]
        );
        this.bag.currentStepIndex = newIndex;
        this.bag.currentStepName = this.steps[newIndex - 1]?.name;
        this.bag.actions = {};
        this.dbDoc.markModified('bag');
        this.dbDoc.markModified('bag.actions');
        if (this.bag.currentStepIndex >= 0) {
            this.bag.stepsHistory.push(newIndex);
            if (this.bag.stepsHistory.length > 200) {
                this.bag.stepsHistory.shift();
            }
            this.bag.oldResult = oldResults;
            return Promise.resolve(
                this.steps[this.bag.currentStepIndex]!['cb']!(...oldResults)
            );
        } else {
            this.result = oldResults;
            throw new BreakingActionState(oldStepState);
        }
    }

    getActionsOfStep(opts: {
        stepIndex?: number;
        stepName?: string;
        oldResults?: any[];
    }) {
        let stepIndex;
        if (opts.stepName) {
            stepIndex = this.steps.findIndex((s) => s.name === opts.stepName);
            if (stepIndex !== -1) {
                stepIndex = stepIndex + 1;
            }
        }
        if (stepIndex === undefined || stepIndex < 0) {
            stepIndex = opts.stepIndex;
        }
        if (stepIndex === undefined || stepIndex < 0) {
            throw new ActionError(
                `cannot find workflow step with ${opts} ; workflowId : ${this._id.toString()} ; workflowCtr : ${this.constructor.name}`,
                errorCodes.NOT_ACCEPTABLE
            );
        }
        const oldResults = opts.oldResults || this.bag.oldResult;
        return Promise.resolve(this.steps[stepIndex]!['cb'](...oldResults));
    }

    startStep() {
        return this.app.db.mongo.conn
            .startSession()
            .then((mongooseSession) => {
                this.dBSession = mongooseSession;
                return this.getNextStep().catch((err) => {
                    this.bag.nTimesCurrentStep =
                        this.bag.nTimesCurrentStep + 1 || 0;
                    if (this.bag.nTimesCurrentStep > Infinity) {
                        // change this once the deprecation has been done
                        return this.breakAndReject({
                            err,
                            message: `blocked on step : ${this.bag.currentStepIndex}, ${this.bag.currentStepName} ; could not launch step.`,
                        });
                    }
                    throw err;
                });
            })
            .then((actions) =>
                this.dBSession!.withTransaction(() => {
                    // beware: this function is often retried because of frequent TransientError
                    // do not put anything in this block that would accumulate
                    // (like this.x++)
                    if (!actions) {
                        actions = [];
                    }
                    if (!Array.isArray(actions)) {
                        actions = [actions];
                    }
                    actions.map((action, index) => {
                        this.declareActionStart(action.dbDoc, index);
                    });
                    this.dbDoc.$session(this.dBSession);
                    this.dbDoc.state = ActionState.IN_PROGRESS;
                    this.dbDoc.markModified('bag');
                    this.dbDoc.markModified('state');
                    // necessary in case of retry
                    // because we proceed in two passes
                    // https://stackoverflow.com/questions/64084992/mongoworkflowexception-query-failed-with-error-code-251
                    // first request from workflow must arrive before the others else there would be troubles
                    return this.dbDoc
                        .save()
                        .then(() => {
                            const promises: any[] = [];
                            for (let action of actions as Action[]) {
                                action.dbDoc.isNew = true; // necessary ?
                                // looks like it solves a bug that causes transientError
                                // et then withTransaction retry
                                // but isNew is false and then it errors out with DocumentNotFoundError
                                // to be confirmed
                                action.dbDoc.$session(this.dBSession);
                                promises.push(action.dbDoc.save());
                            }
                            for (let doc of this.docsToSaveAtStepStart) {
                                doc.$session(this.dBSession);
                                promises.push(doc.save());
                            }
                            return Promise.all(promises);
                        })
                        .then(() => Promise.resolve()); // for typing
                }).finally(() => this.resyncWithDb())
            )
            .finally(() => {
                this.docsToSaveAtStepStart = [];
                if (this.dBSession) {
                    return this.dBSession.endSession();
                }
            })
            .then(() => {
                this.internalLog(`state changed`);
                this.internalLog(
                    `step started : ${this.dbDoc.bag.currentStepIndex}`
                );
                // state is changed directly in the workflow
                // so call resume directly
                return this.resume();
            });
    }

    endStep() {
        return this.app.ActionModel.find({
            _id: { $in: Object.keys(this.bag.actions) },
            workflowId: this.dbDoc._id.toString(),
            state: { $gt: ActionState.PAUSED },
        }).then(async (actions) => {
            for (let action of actions) {
                await this.declareActionEnd(
                    action as any as ActionSchemaInterface
                );
            }
            this.bag.nTimesCurrentStep = 0;
            this.internalLog('endStep');
            return ActionState.PAUSED;
        });
    }

    registerDocToSaveAtStepStart(doc: mongoose.Document) {
        this.docsToSaveAtStepStart.push(doc);
    }

    registerDetachedAction(action: Action) {
        this.docsToSaveAtStepStart.push(action.dbDoc);
    }

    /**
     * @deprecated use initialization
     */
    override initialisation() {
        return this.initialization();
    }

    override initialization() {
        // TODO: remove isInitialised
        if (this.isInitialised || this.isInitialized) {
            return Promise.resolve();
        }
        return super.initialization().then(() => this.define());
    }

    define(): Promise<void> | void {
        return Promise.resolve();
    }

    override main() {
        return this.startStep().catch((err) => {
            if (!(err instanceof BreakingActionState)) {
                // if an error occurs during this step, block on this step
                // but workflow stays in EXECUTING_MAIN state and does not error out
                this.internalLogError(err);
                throw new BreakingActionState(this.dbDoc.state);
            }
            throw err;
        });
    }

    override onMainTimeout(): ActionState | Promise<ActionState> {
        // workflow hasn't been launched yet, launch again.
        return ActionState.SLEEPING;
    }

    override watcher() {
        return this.app.ActionModel.find({
            workflowId: this.dbDoc._id.toString(),
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
            ],
        }).then((actions) => {
            if (actions.length === 0) {
                // two cases:
                // if state === EXECUTING_MAIN: there was a problem in the step main and it must be tried again
                // else step is done
                if (this.dbDoc.state === ActionState.EXECUTING_MAIN) {
                    return ActionState.PAUSED;
                }
                return this.endStep();
            } else {
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

    inWorkflowStepAction(
        marker: string,
        opts: {
            init?: Action['init'];
            main: Action['main'];
            watcher?: Action['watcher'];
        }
    ): Action;
    inWorkflowStepAction(marker: string, cb: () => Promise<any>): Action;
    inWorkflowStepAction(
        marker: string,
        cb:
            | (() => Promise<any>)
            | {
                  init?: Action['init'];
                  main: Action['main'];
                  watcher?: Action['watcher'];
              }
    ): Action {
        let opts = cb;
        if (typeof cb === 'function') {
            opts = {
                main: function (this: Action) {
                    return cb().then((res) => {
                        this.setResult(res);
                        return ActionState.SUCCESS;
                    });
                },
            };
        }
        const action = new Action();
        action.dynamicallyDefineFromWorkflowStep(this, marker);
        action.main = opts['main'];
        if (cb['init']) {
            action.init = opts['init'];
        }
        if (cb['watcher']) {
            action.watcher = opts['watcher'];
        }
        return action;
    }

    inWorkflowRedefineAction(marker: string, actions: Action): Promise<Action>;
    inWorkflowRedefineAction(
        marker: string,
        actions: () => Action
    ): Promise<Action>;
    inWorkflowRedefineAction(
        marker: string,
        actions: () => Promise<Action>
    ): Promise<Action>;
    async inWorkflowRedefineAction(
        marker: string,
        action: Action | (() => Action | Promise<Action>)
    ) {
        if (typeof action === 'function') {
            action = await Promise.resolve(action());
        }
        action.dynamicallyDefineFromWorkflowStep(this, marker);
        return action;
    }

    override internalLogError(err: Error) {
        this.app.logger.error('!!-.-!!', {
            actionRef: this.dbDoc.actionRef,
            actionId: this.dbDoc._id.toString(),
            filter: this.dbDoc.filter,
            err: err,
            workflowStepId: this.dbDoc.bag.currentStepIndex,
            workflowStepName: this.dbDoc.bag.currentStepName,
        });
    }

    override get isRollBackPossible() {
        if (this.bag.isRollBackPossible) {
            return this.bag.isRollBackPossible;
        } else {
            for (const s of this.steps) {
                if (s.rollback) {
                    return true;
                }
            }
        }
        return false;
    }

    override RollBackWorkflow = RevertWorkflow;
}

export class RevertWorkflow<
    WorkflowToRevert extends Workflow,
> extends Workflow {
    override IArgument: {
        actionId: string;
    };

    oldAction: WorkflowToRevert;

    override init() {
        return this.app.ActionModel.findById(this.argument.actionId).then(
            async (dbDoc) => {
                if (!this.dbDoc) {
                    throw new BreakingActionState(ActionState.ERROR);
                }
                this.oldAction = (await Action.constructFromDb(
                    dbDoc as any as ActionSchemaInterface
                )) as WorkflowToRevert;
                return this.oldAction.initialization();
            }
        );
    }

    override define() {
        this.next(() => {
            const tToRevert = this.oldAction;
            tToRevert.bag.currentStepIndex = Infinity;
            tToRevert.dbDoc.bag.currentStepIndex = Infinity;
            tToRevert.dbDoc.state = ActionState.REVERTING;
            this.registerDocToSaveAtStepStart(tToRevert.dbDoc);
            return Action.resolve({});
        }).onErrorGoTo('end');
        const stepsHistory = this.oldAction.bag.stepsHistory;
        const nSteps = stepsHistory.length;
        for (let i = 0; i < nSteps; i++) {
            const stepIndex = stepsHistory[nSteps - 1 - i]!;
            const step = this.oldAction.steps[stepIndex]!;
            if (step.rollback) {
                this.finally(step.rollback.bind(this));
            }
            this.finally(this.revertChildrenAction.bind(this, stepIndex));
        }
        this.finally(() => {
            const tToRevert = this.oldAction;
            tToRevert.dbDoc.state = ActionState.REVERTED;
            this.registerDocToSaveAtStepStart(tToRevert.dbDoc);
        });
        this.name('end');
        return Promise.resolve();
    }

    revertChildrenAction(stepIndex) {
        return this.app.ActionModel.find({
            workflowId: this.oldAction.dbDoc._id.toString(),
            workflowStep: stepIndex,
            state: { $lte: ActionState.SUCCESS },
        }).then(async (actions) => {
            const result = [];
            for (const a of actions) {
                const action = await Action.constructFromDb(
                    a as any as ActionSchemaInterface
                );
                if (action.isRollBackPossible) {
                    const rollBack = new action.RollBackWorkflow();
                    rollBack.setArgument({
                        actionId: action.dbDoc._id.toString(),
                    });
                    result.push(rollBack);
                }
            }
            return result;
        });
    }
}

export class RevertAction<ActionToRevert extends Action> extends Workflow {
    override IArgument: {
        actionId: string;
    };

    oldAction: ActionToRevert;

    override init() {
        return this.app.ActionModel.findById(this.argument.actionId).then(
            async (dbDoc) => {
                if (!this.dbDoc) {
                    throw new BreakingActionState(ActionState.ERROR);
                }
                this.oldAction = (await Action.constructFromDb(
                    dbDoc as any as ActionSchemaInterface
                )) as ActionToRevert;
                return this.oldAction.initialization();
            }
        );
    }

    override define() {
        this.next(() => {
            // first wait for action end
            // so action is 'attached' to workflow
            const actionToRevert = this.oldAction;
            if (actionToRevert.dbDoc.state < ActionState.SUCCESS) {
                this.declareActionStart(actionToRevert.dbDoc, 0);
                actionToRevert.setRepeat({
                    [ActionState.SUCCESS]: 0,
                    [ActionState.ERROR]: 0,
                });
                actionToRevert.dbDoc.optimisticLock();
                this.registerDocToSaveAtStepStart(actionToRevert.dbDoc);
            }
        })
            .next(() => {
                // then we rollback the action
                const actionToRevert = this.oldAction;
                const revert = new actionToRevert.RollBackAction();
                revert.setArgument({
                    actionId: actionToRevert.dbDoc._id.toString(),
                });
                const nSuccess =
                    this.oldAction.dbDoc.nExecutions[ActionState.SUCCESS];
                revert.setRepeat({
                    [ActionState.SUCCESS]: nSuccess - 1,
                });
                return revert;
            })
            .next(() => {
                // properly terminate the action
                this.oldAction.dbDoc.cronActivity.nextActivity = new Date(
                    Date.now() + 10 * 60 * 1000
                );
                this.oldAction.dbDoc.state = ActionState.REVERTED;
                this.registerDocToSaveAtStepStart(this.oldAction.dbDoc);
            });
        return Promise.resolve();
    }
}
