import { ActionState } from '../models/action';
import { errorCodes } from './errorcodes';

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
