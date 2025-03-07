import { ActionState } from '../models/action.js';
import { errorCodes } from './errorcodes.js';

export class ActionError extends Error {
    constructor(
        public message = '',
        public code = errorCodes.OTHER,
        public otherInfo = null
    ) {
        super();
    }
}

export class BreakingActionState {
    constructor(
        public actionState: ActionState,
        public result?: any
    ) {}
}
