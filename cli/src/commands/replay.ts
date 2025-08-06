import colors from 'colors';
import { CRUD } from '../crud.js';
import { exitCodes, logErrorAndExit, setUpRuntime } from './utils.js';

const processReplayCmd = async (actionId: string) => {
    await setUpRuntime();
    try {
        const newActionId = await CRUD.replay(actionId);
        process.stdout.write(
            `Action is being replayed with ID ${colors.bold.italic(newActionId)}\n`
        );
    } catch (error) {
        logErrorAndExit(
            `Unable to replay action ${actionId}: ${(error as Error).message}`,
            exitCodes.GENERIC_ERROR
        );
    }
    process.exit(exitCodes.SUCCESS);
};

export const replayCmd = {
    name: 'replay',
    description:
        'Update the database so that the provided action will be replayed',
    fn: processReplayCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action to replay',
        },
    ],
    options: [],
};
