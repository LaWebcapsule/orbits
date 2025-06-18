import colors from 'colors';
import { accessSync } from 'fs';
import path from 'path';
import winston from 'winston';

import { Action, ActionRuntime } from '@wbce/orbits-core';

import { exitCodes } from './constants.js';

const throwError = (msg: string, code: exitCodes) => {
    process.stderr.write(JSON.stringify({ msg, code }));
    return process.exit(1);
};

export const runAction = async (
    actionPath: string,
    actionArgs: string[],
    actionRef: string,
    database: string,
    cliInstanceUUID: string,
    logFile: string
) => {
    actionPath = path.join(process.cwd(), actionPath);
    try {
        accessSync(actionPath);
    } catch {
        throwError(
            `Cannot find ${colors.italic(colors.bold(actionPath))}.\n` +
                `Please provide an orbit.ts file at the root of your project`,
            exitCodes.NOT_FOUND
        );
    }

    const args: any = {};
    for (const arg of actionArgs) {
        if (arg.includes('=')) {
            let [key, ...splitVal] = arg.split('=');
            args[key] = splitVal.join('=');
        } else {
            args[arg] = true;
        }
    }

    new ActionRuntime({
        db: { mongo: { url: database } },
        logger: winston.createLogger({
            transports: [new winston.transports.File({ filename: logFile })],
        }),
        workers: {
            quantity: 1,
            filter: { cli: true, instance: cliInstanceUUID },
        },
    });

    await ActionRuntime.waitForActiveRuntime;
    await ActionRuntime.activeRuntime.recursiveImport(actionPath);

    const ActionConstructor =
        ActionRuntime.activeRuntime.getActionFromRegistry(actionRef);

    if (!ActionConstructor) {
        throwError(`Cannot find specified action`, exitCodes.NOT_FOUND);
        return; // for type checking
    }

    try {
        const actionDb = await ActionRuntime.activeRuntime.ActionModel.findOne({
            actionRef,
            filter: { cli: true, cliInstance: cliInstanceUUID },
        });
        let action: Action;
        if (actionDb) {
            process.stdout.write('msg=Action already exists, resuming');
            action = await ActionConstructor.constructFromDb(actionDb);
        } else {
            action = new ActionConstructor();
            action.setFilter({ cli: true, instance: cliInstanceUUID });
            action.setArgument(args);
            await action.save();
        }
        action.resume();
        process.stdout.write(JSON.stringify({ id: action._id }));
    } catch (error: any) {
        throwError(
            `Error creating action ${colors.bold.italic(actionRef)}:\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }
};

let {
    isRunner,
    actionPath,
    actionArgs,
    database,
    actionRef,
    cliInstanceUUID,
    logFile,
} = JSON.parse(process.argv[2]);

if (isRunner) {
    runAction(
        actionPath,
        actionArgs,
        actionRef,
        database,
        cliInstanceUUID,
        logFile
    );
}
