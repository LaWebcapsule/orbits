import { ActionSchemaInterface } from '@orbi-ts/core';
import colors from 'colors';
import { exitCodes, logErrorAndExit, runCrudCmd } from './utils.js';

const processInputCmd = async (actionId: string, inputsAsStr: string) => {
    let inputs = {};
    try {
        inputs = JSON.parse(inputsAsStr);
    } catch {
        logErrorAndExit(`Unable to parse inputs`, exitCodes.INVALID_PARAMETER);
    }
    runCrudCmd(
        actionId,
        'addInputs',
        {
            processResult: (updatedAction: ActionSchemaInterface) => {
                process.stdout.write(
                    `Inputs updated for Action ${colors.bold(updatedAction.id)}:\n` +
                        `${JSON.stringify(updatedAction.bag.inputs)}\n`
                );
            },
        },
        inputs
    );
};

export const addInputsCmd = {
    name: 'add-inputs',
    description:
        'Add inputs of type bag to the given WaitForInput action in the database. Overwrites current inputs values.',
    fn: processInputCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action.',
        },
        {
            name: 'inputs',
            descr: 'inputs in json format',
        },
    ],
    options: [],
};
