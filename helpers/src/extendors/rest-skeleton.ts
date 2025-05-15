import { Action, ActionApp } from '@wbce/orbits-core';

export class ActionApi {
    app: Promise<ActionApp>;

    constructor() {
        this.app = ActionApp.getActiveApp();
    }

    async list(query: any) {
        return (await this.app).ActionModel.find(query).then((data) => {
            const result = [];
            for (const actionDb of data) {
                result.push(Action.constructFromDb(actionDb));
            }
            return result;
        });
    }

    async getOne(query: any) {
        return (await this.app).ActionModel.findOne(query).then((actionDb) => {
            if (!actionDb) {
                throw new Error('not found');
            }
            return Action.constructFromDb(actionDb);
        });
    }

    async createOne(constructorName: string, argument: any, filter?: any) {
        let newAction: Action;
        const ActionCtr = (await this.app).getActionFromRegistry(
            constructorName
        );
        if (!ActionCtr) {
            throw new Error('constructor not found');
        }
        newAction = new ActionCtr();
        newAction.setArgument(argument);
        newAction.setFilter(filter);

        await newAction.dbDoc.save();
        return newAction;
    }

    async resumeOne(query: any) {
        return (await this.app).ActionModel.findOne(query)
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
