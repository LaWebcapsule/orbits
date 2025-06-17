import { Action, ActionRuntime } from '@wbce/orbits-core';

export class ActionApi {
    runtime: ActionRuntime;

    constructor() {
        this.runtime = ActionRuntime.activeRuntime;
    }

    async list(query: any) {
        return (await this.runtime).ActionModel.find(query).then((data) => {
            const result = [];
            for (const actionDb of data) {
                result.push(Action.constructFromDb(actionDb));
            }
            return result;
        });
    }

    async getOne(query: any) {
        return (await this.runtime).ActionModel.findOne(query).then(
            (actionDb) => {
                if (!actionDb) {
                    throw new Error('not found');
                }
                return Action.constructFromDb(actionDb);
            }
        );
    }

    async createOne(constructorName: string, argument: any, filter?: any) {
        let newAction: Action;
        return Promise.resolve()
            .then(() => {
                const ActionCtr =
                    this.runtime.getActionFromRegistry(constructorName);
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

    async resumeOne(query: any) {
        return (await this.runtime).ActionModel.findOne(query)
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
