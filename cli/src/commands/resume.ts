import { CRUD } from '../crud.js';
import { Cmd } from './command-utils.js';
import { exitCodes, logErrorAndExit, setUpRuntime } from './utils.js';

const processResumeCmd = async (actionId: string) => {
    await setUpRuntime();
    try {
        await CRUD.resume(actionId);
    } catch (error) {
        logErrorAndExit(
            `Unable to resume action ${actionId}: ${(error as Error).message}`,
            (error as Error).message.startsWith('invalid')
                ? exitCodes.INVALID_PARAMETER
                : exitCodes.NOT_FOUND
        );
    }
    process.exit(exitCodes.SUCCESS);
};

export const resumeCmd: Cmd = {
    name: 'resume',
    description:
        'Only effective on workflows.\nUpdate the database so that the provided action will resume.',
    fn: processResumeCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action to resume',
        },
    ],
    options: [],
};
