import colors from 'colors';
import { accessSync } from 'fs';
import path from 'path';
import winston from 'winston';

import { Action, ActionApp, bootstrapApp } from '@wbce/orbits-core';

import { DEFAULT_ACTION, DEFAULT_APP, exitCodes } from './commands.js';

const throwError = (msg: string, code: exitCodes) => {
    process.stderr.write(JSON.stringify({ msg, code }));
    process.exit(1);
};

const getConstructorFromImport = (
    exportName: string,
    module: any,
    isDefault: boolean
) => {
    const constructor = isDefault
        ? module.default[exportName]
        : module[exportName];

    if (!constructor) {
        throwError(
            isDefault
                ? `Could not find default export ${colors.italic.bold(exportName)}`
                : `Could not find requested ${colors.italic.bold(exportName)}, did you export it?`,
            exitCodes.INVALID_PARAMETER
        );
    }

    return constructor;
};

export const runAction = async (
    actionPath: string,
    actionArgs: string[],
    action: string,
    app: string,
    database: string,
    cliInstanceUUID: string,
    logFile: string
) => {
    let AppConstructor: typeof ActionApp;
    let ActionConstructor: typeof Action;
    let module: any;

    actionPath = path.join(process.cwd(), actionPath);
    try {
        accessSync(actionPath);
    } catch (error) {
        throwError(
            `Provided path (${actionPath}) does not exist`,
            exitCodes.INVALID_PATH
        );
    }

    try {
        module = await import(actionPath);
    } catch (error) {
        throwError(
            `Cannot import provided file:\n\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }

    ActionConstructor = getConstructorFromImport(
        action,
        module,
        action === DEFAULT_ACTION
    );

    AppConstructor = getConstructorFromImport(app, module, app === DEFAULT_APP);

    const args: any = {};
    for (const arg of actionArgs) {
        if (arg.includes('=')) {
            let [key, ...splitVal] = arg.split('=');
            args[key] = splitVal.join('=');
        } else {
            args[arg] = true;
        }
    }

    try {
        bootstrapApp({
            db: { mongo: { url: database } },
            logger: winston.createLogger({
                transports: [
                    new winston.transports.File({ filename: logFile }),
                ],
            }),
            workers: {
                quantity: 1,
                filter: { cli: true, instance: cliInstanceUUID },
            },
        })(AppConstructor);

        await ActionApp.waitForActiveApp;
    } catch (error) {
        throwError(
            `Cannot bootstrap Orbits app:\n${error}`,
            exitCodes.DATABASE_ERROR
        );
    }

    ActionApp.activeApp.ActionModel.findOne({
        actionRef: ActionConstructor.permanentRef,
        filter: { cli: true, cliInstance: cliInstanceUUID },
    })
        .then(async (actionDb) => {
            let action: Action;
            if (actionDb) {
                process.stdout.write('msg=Action already exists, resuming');
                action = await Action.constructFromDb(actionDb);
            } else {
                action = new ActionConstructor();
                action.setFilter({ cli: true, instance: cliInstanceUUID });
                action.setArgument(args);
                await action.save();
            }

            action.resume();

            process.stdout.write(JSON.stringify({ id: action._id }));
        })
        .catch((error) => {
            throwError(
                `Error creating action ${colors.bold.italic(ActionConstructor.permanentRef as string)}:\n${error}`,
                exitCodes.INVALID_PARAMETER
            );
        });
};

let {
    isRunner,
    actionPath,
    actionArgs,
    database,
    action,
    app,
    cliInstanceUUID,
    logFile,
} = JSON.parse(process.argv[2]);

if (isRunner) {
    runAction(
        actionPath,
        actionArgs,
        action,
        app,
        database,
        cliInstanceUUID,
        logFile
    );
}
