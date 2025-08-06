import { ActionState } from '@orbi-ts/core';
import colors from 'colors';

export const ACTION_STATE_FORMAT = new Map<
    ActionState,
    { short: string; full: string; color: string }
>([
    [ActionState.UNKNOWN, { short: '?', full: 'UNKNOWN', color: 'grey' }],
    [ActionState.SLEEPING, { short: 'z', full: 'SLEEPING', color: 'grey' }],
    [ActionState.EXECUTING_MAIN, { short: '…', full: 'EXECUTING MAIN', color: 'cyan' }],
    [ActionState.IN_PROGRESS,  { short: '…', full: 'IN PROGRESS', color: 'cyan' }],
    [ActionState.PAUSED, { short: '⏸', full: 'PAUSED', color: 'grey' }],
    [ActionState.SUCCESS, { short: '✔', full: 'SUCCESS', color: 'green' }],
    [ActionState.ERROR, { short: '✘', full: 'ERROR', color: 'red' }],
    [ActionState.CLOSED, {short: 'X', full: 'CLOSED', color: 'grey' }],
    [ActionState.REVERTING, { short: '↩', full: 'REVERTING', color: 'yellow' }],
    [ActionState.REVERTED, { short: '✔', full: 'REVERTED', color: 'yellow' }],
]);

export type ActionsViewerAction = {
    ref: string;
    id: string;
    state: ActionState;
    bag: any;
    createdAt: Date;
    children?: string[];
    arguments?: any;
    result?: any;
};

export interface ActionsRenderer {
    setActions(actions: Map<string, ActionsViewerAction>): void;
    setTopAction(actionId: string): void;
    highlightAction(actionId: string): void;
    refresh(): void;
    destroy(): void;
}

interface EltWithLoader {
    get placeholder(): string;
}
export function generatePrettyActionState(
    state: ActionState,
    refresh: boolean,
    loader: EltWithLoader
): string {
    const { short, color, full } = ACTION_STATE_FORMAT.get(state)!;
    if (!process.stdout.isTTY) return full;
    const colorFunc = colors[color as keyof typeof colors] as Function;
    if (!refresh) return colorFunc(short);
    switch (state) {
        case ActionState.EXECUTING_MAIN:
        case ActionState.IN_PROGRESS:
        case ActionState.REVERTING:
            return colorFunc(loader.placeholder);
        default:
            return colorFunc(short);
    }
}
