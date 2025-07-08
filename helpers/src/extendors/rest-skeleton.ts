import { Action, ActionRuntime } from '@orbi-ts/core';

export class ActionApi {
    app: ActionRuntime;

    constructor() {
        this.app = ActionRuntime.activeRuntime;
    }

    list(query: any) {
        return this.app.ActionModel.find(query).then((data) => {
            const result = [];
            for (const actionDb of data) {
                result.push(Action.constructFromDb(actionDb));
            }
            return result;
        });
    }

    getOne(query: any) {
        return this.app.ActionModel.findOne(query).then((actionDb) => {
            if (!actionDb) {
                throw new Error('not found');
            }
            return Action.constructFromDb(actionDb);
        });
    }

    createOne(constructorName: string, argument: any, filter?: any) {
        let newAction: Action;
        return Promise.resolve()
            .then(() => {
                const ActionCtr = this.app.getActionFromRegistry(constructorName);
                if (!ActionCtr) {
                    throw new Error('constructor not found');
                }
                newAction = new ActionCtr();
                newAction.setArgument(argument);
                newAction.setFilter(filter);
                return newAction.dbDoc.save();
            })
            .then(() => newAction);
    }

    resumeOne(query: any) {
        return this.app.ActionModel.findOne(query)
            .then((actionDb) => {
                if (!actionDb) {
                    throw new Error('not found');
                }
                return Action.constructFromDb(actionDb);
            })
            .then((action) => {
                action.resume(); //note : this is in background.
            });
    }
}
