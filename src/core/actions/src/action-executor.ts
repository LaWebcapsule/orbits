import { Action } from './action-manager';
import { ActionState } from './models/action';

export class Executor {
    /**
     * @default undefined all ActionStates
     */
    scope?: ActionState[];

    createInstallAction(): Action | Promise<Action> {
        return Action.resolve();
    }

    createUninstallAction(): Action | Promise<Action> {
        return Action.reject();
    }

    resume(action) {
        return action._resume();
    }
}
