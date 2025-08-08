import colors from 'colors';
import { CRUD } from '../crud.js';
import { exitCodes, logErrorAndExit, setUpRuntime } from './utils.js';

const processSetBagCmd = async (actionId: string, bagAsStr: string) => {
    let bag = {};
    try {
        bag = JSON.parse(bagAsStr);
    } catch {
        logErrorAndExit(`Unable to parse bag`, exitCodes.INVALID_PARAMETER);
    }
    await setUpRuntime();
    try {
        const updatedAction = await CRUD.setBag(actionId, bag);
        process.stdout.write(
            `Bag updated for Action ${colors.bold.italic(updatedAction.id)}:\n${JSON.stringify(updatedAction.bag)}\n`
        );
    } catch (error) {
        logErrorAndExit(
            `Unable to set bag for action ${actionId}: ${(error as Error).message}`,
            exitCodes.GENERIC_ERROR
        );
    }
    process.exit(exitCodes.SUCCESS);
};

export const setBagCmd = {
    name: 'set-bag',
    description:
        'Update the action bag in the database. Merge existing bag with the given one',
    fn: processSetBagCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action',
        },
        {
            name: 'bag',
            descr: 'bag in json format',
        },
    ],
    options: [],
};
