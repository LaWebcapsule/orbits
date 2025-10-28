import { Agent } from './../index.js';
import { ActionState } from './models/action.js';

export class Executor {
    /**
     * @default undefined all ActionStates
     */
    scope?: ActionState[];

    generateSupportAgent(): Agent | void {}

    resume(action) {
        return action._resume();
    }
}
