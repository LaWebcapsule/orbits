import { Cmd } from './command-utils.js';
import { runCrudCmd } from './utils.js';

const processPauseCmd = async (
    actionId: string,
    opts?: { duration?: number | null }
) => {
    runCrudCmd(actionId, 'pause', {}, opts?.duration ?? undefined);
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
