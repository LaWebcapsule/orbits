import { Action } from './action-manager';
import { ActionState } from './models/action';


export class Executor{

    scope? : ActionState[];//default is undefined => all ActionStates.

    createInstallAction() : Action | Promise<Action>{
        return Action.resolve()
    }

    createUninstallAction() : Action | Promise<Action>{
        return Action.reject()
    }

    resume(action){
        return action._resume();
    }

}

