import { ActionState } from '@orbi-ts/core';
import { CRUD } from '../crud.js';
import { Cmd } from './command-utils.js';
import { exitCodes, logErrorAndExit, setUpRuntime } from './utils.js';

const processEndCmd = async (
    actionId: string,
    opts: {
        state?: 'SUCCESS' | 'ERROR';
    }
) => {
    await setUpRuntime();
    try {
        await CRUD.end(
            actionId,
            opts?.state ? ActionState[opts?.state] : ActionState.SUCCESS
        );
    } catch (error) {
        logErrorAndExit(
            `Unable to pause action ${actionId}: ${(error as Error).message}`,
            (error as Error).message.startsWith('invalid')
                ? exitCodes.INVALID_PARAMETER
                : exitCodes.NOT_FOUND
        );
    }
    process.exit(exitCodes.SUCCESS);
};

export const endCmd: Cmd = {
    name: 'end',
    description: 'Update the database so that the provided action will end',
    fn: processEndCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action to pause',
        },
    ],
    options: [
        {
            short: 's',
            full: 'state',
            descr: 'state to set the action in',
            choices: ['SUCCESS', 'ERROR'],
            dflt: { val: null, descr: 'Pause the action indefinitely' },
        },
    ],
};
