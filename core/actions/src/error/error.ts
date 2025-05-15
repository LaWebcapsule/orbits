import { Workflow } from '../../index.js';
import { ActionSchemaInterface, ActionState } from '../models/action.js';
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

export class InWorkflowActionError extends Error {
    workflowTrace: {
        ref: string;
        workflowCtr: string;
        workflowId: string;
    }[] = [];

    rootAction: {
        _id: string;
        actionRef: string;
    };

    constructor(
        workflow: Workflow,
        ref: string,
        action: ActionSchemaInterface
    ) {
        super();
        this.message = (action.result as Error).message || action.result;
        this.rootAction =
            action.result instanceof InWorkflowActionError
                ? action.result.rootAction
                : {
                      _id: action.id,
                      actionRef: action.actionRef,
                  };
        this.workflowTrace = [
            ...((action.result as InWorkflowActionError).workflowTrace || []),
            {
                ref,
                workflowCtr: workflow.dbDoc.actionRef,
                workflowId: workflow._id.toString(),
            },
        ];
    }
}

export class BreakingActionState {
    constructor(
        public actionState: ActionState,
        public result?: any
    ) {}
}
