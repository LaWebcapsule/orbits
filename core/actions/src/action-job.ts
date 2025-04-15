import { FilterQuery } from 'mongoose';
import { Action } from './action-manager.js';
import { ActionApp } from './app/action-app.js';
import { ActionError } from './error/error.js';
import { errorCodes } from './error/errorcodes.js';
import { ActionSchemaInterface, ActionState } from './models/action.js';

export class ActionCron {
    maxTimeToConsumeAnAction = 10 * 60 * 1000;
    actions: ActionSchemaInterface<any>[] = [];
    app = ActionApp.getActiveApp();
    filter?: Object;

    constructor(filter?: Object) {
        this.filter = filter;
        this.cycle();
    }

    nDatabaseEmpty = 0;
    wait() {
        return new Promise<void>((resolve) => {
            const timingSlots = {
                1: 1 * 1000,
                2: 5 * 1000,
                6: 10 * 1000,
                12: 30 * 1000,
                24: 60 * 1000,
            };
            const timingSteps = Object.keys(timingSlots)
                .map((k) => Number(k))
                .sort((a, b) => a - b);
            const waitingStep = timingSteps.find(
                (step) => step <= this.nDatabaseEmpty
            ) as number;
            const waitingTime = timingSlots[waitingStep];
            if (waitingStep === -1) {
                resolve();
            } else {
                setTimeout(() => {
                    resolve();
                }, waitingTime);
            }
        });
    }

    cycle() {
        // infinite cycle
        return this.oneActionCycle()
            .then(() => this.wait())
            .then(() => this.cycle());
    }

    oneActionCycle() {
        return this.getAction().then((action) => {
            if (action) {
                this.nDatabaseEmpty = 0;
                return this.consumeAction(
                    action as unknown as ActionSchemaInterface
                );
            } else {
                this.nDatabaseEmpty++;
                return;
            }
        });
    }

    getAction() {
        let query = {
            state: { $lte: ActionState.CLOSED },
            $or: [
                {
                    'cronActivity.pending': false,
                    'cronActivity.nextActivity': {
                        $lt: new Date(),
                    },
                },
                {
                    // blocked lock
                    'cronActivity.pending': true,
                    'cronActivity.lastActivity': {
                        $lt: new Date(
                            Date.now() - this.maxTimeToConsumeAnAction
                        ),
                    },
                },
            ],
        } as FilterQuery<ActionSchemaInterface>;

        if (this.filter) query.filter = this.filter;

        return this.app.ActionModel.findOne(query)
            .sort('cronActivity.lastActivity')
            .then((action) => action);
    }

    async consumeAction(actionDb: ActionSchemaInterface<any>) {
        // It is okay if two consumers run in parallel from time to time
        // but we want to avoid it happening too often
        let action: Action;
        try {
            ActionApp.activeApp.logger.info(
                `consuming action with id : ${actionDb._id}, ref : ${actionDb.actionRef}`
            );
            action = await Action.constructFromDb(actionDb);
        } catch (err) {
            ActionApp.activeApp.logger.error(
                `could not construct action with id : ${actionDb._id}, ref : ${actionDb.actionRef}; got ${err} `
            );
            actionDb.updateNextActivity();
            return this.app.ActionModel.updateOne(
                { _id: actionDb._id },
                {
                    $set: {
                        'cronActivity.nextActivity':
                            actionDb.cronActivity.nextActivity,
                    },
                }
            );
        }
        // Use a direct update to avoid overwriting data (especially bag)
        const previousNextActivity = action.cronActivity.nextActivity;
        const currentDate = new Date();
        return this.app.ActionModel.updateOne(
            { _id: action.dbDoc._id },
            {
                $set: {
                    'cronActivity.pending': true,
                    'cronActivity.lastActivity': currentDate,
                },
            }
        ).then(()=>{console.log("after update one")})
            .then(() => action.resyncWithDb())
            .then(() => {
                if (
                    action.cronActivity.lastActivity?.getTime() !==
                    currentDate.getTime()
                ) {
                    // another cron took the action,
                    // throw an error that we will catch later
                    throw new ActionError(
                        'lock already taken',
                        errorCodes.RESOURCE_LOCKED
                    );
                }
                action.internalLog('CRON action processing started');
                return action.resume();
            })
            .then(() => {
                action.internalLog('CRON action processing ended');
                if (action.dbDoc.$isDeleted()) {
                    return Promise.resolve();
                }
                if (
                    action.cronActivity.nextActivity.getTime() ===
                    previousNextActivity.getTime()
                ) {
                    // if nextActivity was changed inside resume
                    // do not overwrite the change
                    action.dbDoc.updateNextActivity();
                }
                return this.app.ActionModel.updateOne(
                    { _id: action.dbDoc._id },
                    {
                        $set: {
                            'cronActivity.pending': false,
                            'cronActivity.nextActivity':
                                action.cronActivity.nextActivity,
                        },
                    }
                ) as any;
            })
            .catch((err) => {
                if (
                    err instanceof ActionError &&
                    err.code === errorCodes.RESOURCE_LOCKED
                ) {
                    console.log(err);
                    return;
                } else {
                    throw err;
                }
            });
    }

    resyncWithDb(action) {
        return this.app.ActionModel.findById(action.dbDoc._id.toString()).then(
            (actionDb) => {
                if (actionDb) {
                    return Action.constructFromDb(actionDb as any);
                }
                return;
            }
        );
    }
}
