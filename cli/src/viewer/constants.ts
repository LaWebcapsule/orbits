import { ActionState } from '@orbi-ts/core';

export const ACTION_STATE_FORMAT = {
    [ActionState.UNKNOWN]: { short: '?', full: 'UNKNOWN', color: 'grey' },
    [ActionState.SLEEPING]: { short: 'z', full: 'SLEEPING', color: 'grey' },
    [ActionState.EXECUTING_MAIN]: {
        short: '…',
        full: 'EXECUTING_MAIN',
        color: 'cyan',
    },
    [ActionState.IN_PROGRESS]: {
        short: '…',
        full: 'IN_PROGRESS',
        color: 'cyan',
    },
    [ActionState.PAUSED]: { short: '⏸', full: 'PAUSED', color: 'grey' },
    [ActionState.SUCCESS]: { short: '✔', full: 'SUCCESS', color: 'green' },
    [ActionState.ERROR]: { short: '✘', full: 'ERROR', color: 'red' },
    [ActionState.CLOSED]: { short: 'X', full: 'CLOSED', color: 'grey' },
    [ActionState.REVERTING]: {
        short: '↩',
        full: 'REVERTING',
        color: 'yellow',
    },
    [ActionState.REVERTED]: { short: '✔', full: 'REVERTED', color: 'yellow' },
};

export type ActionsViewerAction = {
    ref: string;
    id: string;
    state: ActionState;
    step?: number;
    children?: string[];
    arguments?: any;
    result?: any;
};

export interface ActionsRenderer {
    setActions(actions: Map<string, ActionsViewerAction>): void;
    destroy(): void;
}
