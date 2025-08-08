import colors from 'colors';

import { Action, ActionState, databaseLogger } from '@orbi-ts/core';
import { exitCodes } from '../constants.js';
import { CRUD } from '../crud.js';
import { setUpRuntime } from './utils.js';

const throwError = (msg: string, code: exitCodes): never => {
    process.stderr.write(msg);
    process.exit(code);
};

const runAction = async (
    actionPath: string,
    actionArgs: any,
    actionRef: string,
    cliInstanceUUID: string,
    keepInBackground: boolean
) => {
    await setUpRuntime({
        actionsFiles: [actionPath],
        workersCount: 1,
        filter: { cli: true, cliInstanceUUID },
        logger: databaseLogger,
    });

    try {
        const action = await CRUD.run(actionRef, actionArgs, {
            cli: true,
            cliInstanceUUID,
        });
        if (process.send) process.send(action._id);

        if (!keepInBackground) {
            await Action.trackActionAsPromise(action, [
                ActionState.ERROR,
                ActionState.SUCCESS,
            ]);
            process.exit(exitCodes.SUCCESS);
        }
    } catch (error: any) {
        throwError(
            `Error running action ${colors.bold.italic(actionRef)}:\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }
};

let { actionPath, actionRef, actionArgs, cliInstanceUUID, keepInBackground } =
    JSON.parse(process.argv[2]);

runAction(actionPath, actionArgs, actionRef, cliInstanceUUID, keepInBackground);
