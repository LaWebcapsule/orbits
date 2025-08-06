import { CRUD } from '../crud.js';
import { Cmd } from './command-utils.js';
import { exitCodes, logErrorAndExit, setUpRuntime } from './utils.js';

const processPauseCmd = async (
    actionId: string,
    opts?: { duration?: number | null }
) => {
    await setUpRuntime();
    try {
        await CRUD.pause(actionId, opts?.duration ?? undefined);
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

export const pauseCmd: Cmd = {
    name: 'pause',
    description: 'Update the database so that the provided action will pause',
    fn: processPauseCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action to pause',
        },
    ],
    options: [
        {
            short: 'd',
            full: 'duration',
            descr: 'Duration to pause for, in seconds',
            dflt: { val: null, descr: 'Pause the action indefinitely' },
        },
    ],
};
