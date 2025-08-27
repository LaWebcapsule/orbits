import { ActionSchemaInterface } from '@orbi-ts/core';
import colors from 'colors';
import { exitCodes, logErrorAndExit, runCrudCmd } from './utils.js';

const processSetBagCmd = async (actionId: string, bagAsStr: string) => {
    let bag = {};
    try {
        bag = JSON.parse(bagAsStr);
    } catch {
        logErrorAndExit(`Unable to parse bag`, exitCodes.INVALID_PARAMETER);
    }
    runCrudCmd(
        actionId,
        'setBag',
        {
            processResult: (updatedAction: ActionSchemaInterface) => {
                process.stdout.write(
                    `Bag updated for Action ${colors.bold(updatedAction.id)}:\n` +
                        `${JSON.stringify(updatedAction.bag)}\n`
                );
            },
        },
        bag
    );
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
