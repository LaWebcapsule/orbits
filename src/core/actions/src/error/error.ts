import { errorCodes } from "./errorcodes";

export class ActionError extends Error{
    constructor(
        public message = '', 
        public code = errorCodes.OTHER, 
        public otherInfo = null){
            super();
    }
}