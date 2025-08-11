import colors from 'colors';

import { Action, ActionState, databaseLogger } from '@orbi-ts/core';
import { exitCodes } from '../constants.js';
import { CRUD } from '../crud.js';
import { setUpRuntime } from './utils.js';

const throwError = (msg: string, code: exitCodes): never => {
    process.stderr.write(msg);
    process.exit(code);
};

const runResourceCmd = async (
    resourcePath: string,
    command: any,
    resourceRefOrId: string,
    cliInstanceUUID: string,
    keepInBackground: boolean
) => {
    await setUpRuntime({
        actionsFiles: [resourcePath],
        workersCount: 1,
        filter: { cli: true, cliInstanceUUID },
        logger: databaseLogger,
    });

    try {
        const action = await CRUD.runResourceCmd(resourceRefOrId, command, {
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
            `Error running commend ${colors.bold.italic(command)} for resource ${colors.bold.italic(resourceRefOrId)}:\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }
};

let { resourcePath, resourceRefOrId, command, cliInstanceUUID, keepInBackground } =
    JSON.parse(process.argv[2]);

runResourceCmd(
    resourcePath,
    command,
    resourceRefOrId,
    cliInstanceUUID,
    keepInBackground
);
