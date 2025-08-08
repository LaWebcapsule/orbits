import colors from 'colors';

import { ActionSchemaInterface, ActionState } from '@orbi-ts/core';
import { isValidObjectId } from 'mongoose';

import { CRUD } from '../crud.js';
import { ACTION_STATE_FORMAT } from '../viewer/utils.js';
import {
    colorState,
    exitCodes,
    logErrorAndExit,
    setUpRuntime,
    table,
    timeDiff,
} from './utils.js';

import { parseArgs } from './command-utils.js';

const processGetCmd = async (actionId: string, opts: any) => {
    await setUpRuntime();

    if (actionId) {
        if (!isValidObjectId(actionId))
            logErrorAndExit(
                `Invalid action_id ${colors.italic(actionId)}`,
                exitCodes.INVALID_PARAMETER
            );

        opts.filter = { _id: actionId };
    }

    let actions: ActionSchemaInterface[] = [];
    try {
        actions = await CRUD.list(opts.filter, opts.sort);
    } catch (error) {
        logErrorAndExit(
            `Unable to get action ${colors.bold(actionId)}:\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }

    if (opts.json) {
        process.stdout.write(JSON.stringify(actions) + '\n');
        process.exit(exitCodes.SUCCESS);
    }

    if (actions.length == 0) {
        if (actionId)
            logErrorAndExit(
                `Action ${actionId} not found`,
                exitCodes.NOT_FOUND
            );
        process.stdout.write('No actions\n');
        process.exit(exitCodes.SUCCESS);
    }

    const columns: any = {
        id: { label: 'ID', format: colors.italic },
        ref: { label: 'ACTION REF', format: colors.italic },
        state: {
            label: 'STATE',
            transform: (state: ActionState) =>
                ACTION_STATE_FORMAT.get(state)!.full,
            format: colorState,
        },
        result: { label: 'RESULT', transform: JSON.stringify },
        lastActivity: {
            label: 'LAST ACTIVITY',
            transform: (t: Date) => timeDiff(Date.now(), t.getTime()),
        },
        nextActivity: {
            label: 'NEXT ACTIVITY',
            transform: (t: Date) => timeDiff(Date.now(), t.getTime()),
        },
        workflowRef: { label: 'PARENT > REF' },
    };

    const actionData = actions.map((action) => ({
        id: action.id,
        ref: action.actionRef,
        state: action.state,
        result: action.result,
        lastActivity: action.cronActivity.lastActivity,
        nextActivity: action.cronActivity.nextActivity,
        workflowRef:
            action.workflowId &&
            action.workflowId +
                (action.workflowRef ? ` > ${action.workflowRef}` : ''),
    }));

    process.stdout.write(table(columns, actionData, ['id', 'result']));
    process.exit(exitCodes.SUCCESS);
};

export const getCmd = {
    name: 'get',
    description: 'Get the provided action, or all actions',
    fn: processGetCmd,
    arguments: [
        {
            name: '[action_id]',
            descr: 'ID of the action to get',
        },
    ],
    options: [
        {
            short: 'f',
            full: 'filter',
            descr: `Filter values, in the format ${colors.italic('key1=val1 key2=val2')}`,
            dflt: { val: {} },
            parser: parseArgs(),
        },
        {
            short: 'o',
            full: 'sort',
            descr: `Sort values, in the format ${colors.italic('key2=-1|1 key2=-1|1')}`,
            dflt: { val: {} },
            parser: parseArgs(),
        },
        {
            short: 'j',
            full: 'json',
            descr: 'Use json format',
            dflt: { val: false },
        },
    ],
};
