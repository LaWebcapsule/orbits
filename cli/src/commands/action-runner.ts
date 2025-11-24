import { Action, ActionState, databaseLogger } from '@orbi-ts/core';
import winston from 'winston';
import { exitCodes, runCrudCmd } from './utils.js';
import { CHILD_ERROR_PREFIX } from './run.js';

const runAction = async (
    actionArgs: any,
    actionRef: string,
    cliInstanceUUID: string,
    opts: {
        actionsFile: string;
        keep: boolean;
        logFile: string;
    }
) => {
    databaseLogger.add(
        new winston.transports.File({
            filename: opts.logFile,
            level: process.env['ORBITS_LOGGING__LEVEL'] ?? 'info',
        })
    );
    runCrudCmd(
        actionRef,
        'run',
        {
            runtimeOpts: {
                actionsFiles: [opts.actionsFile],
                workersCount: 1,
                filter: { cli: true, cliInstanceUUID },
                logger: databaseLogger,
            },
            processResult: async (action: Action) => {
                if (process.send) process.send(action._id);
                if (!opts.keep) {
                    await Action.trackActionAsPromise(action, [
                        ActionState.ERROR,
                        ActionState.SUCCESS,
                    ]);
                    process.exit(exitCodes.SUCCESS);
                }
            },
            noExit: true,
            errMessage: CHILD_ERROR_PREFIX
        },
        actionArgs,
        { cli: true, cliInstanceUUID },
    );
};

let { actionRef, actionArgs, cliInstanceUUID, opts } = JSON.parse(
    process.argv[2]
);

runAction(actionArgs, actionRef, cliInstanceUUID, opts);
