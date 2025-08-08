import { ActionState } from '@orbi-ts/core';
import { Cmd } from './command-utils.js';
import { runCrudCmd } from './utils.js';

const processEndCmd = async (
    actionId: string,
    opts: {
        state?: 'SUCCESS' | 'ERROR';
    }
) => {
    runCrudCmd(
        actionId,
        'end',
        {},
        opts?.state ? ActionState[opts?.state] : ActionState.SUCCESS
    );
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
