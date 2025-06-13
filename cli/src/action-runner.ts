import colors from 'colors';
import { accessSync } from 'fs';
import path from 'path';
import winston from 'winston';

import type { Action, ActionRuntime } from '@wbce/orbits-core';

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

    let currRuntime: ActionRuntime | undefined;
    let resolveWaitForRuntime: (value?: any) => void;
    const waitForRuntime = new Promise((resolve) => {
        resolveWaitForRuntime = resolve;
    });

    const timeout = 10;
    const interval = 1000;

    // import the given action file
    // it will start an actionRuntime
    console.log('import ', actionPath);
    console.log(await import(actionPath));

    if (!global.orbitsRuntimeEvent) {
        await new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                console.log(
                    'global.orbitsRuntimeEvent:',
                    global.orbitsRuntimeEvent
                );
                if (global.orbitsRuntimeEvent)
                    return resolve(global.orbitsRuntimeEvent);

                if (Date.now() - start > timeout * 1000) {
                    return reject(
                        new Error(
                            `Timeout: global.orbitsRuntimeEvent was not defined after ${timeout} seconds.`
                        )
                    );
                }

                setTimeout(check, interval);
            };

            check();
        });
    }

    global.orbitsRuntimeEvent.on(
        'runtime',
        async function (runtime: ActionRuntime) {
            console.log('NEW RUNTIME:', runtime);
            runtime.name = 'MyNewName';
            runtime.setLogger(
                winston.createLogger({
                    transports: [
                        new winston.transports.File({ filename: logFile }),
                    ],
                })
            );
            await runtime.waitForBootstrap;

            await runtime.recursiveImport(actionPath);

            resolveWaitForRuntime();

            console.log(global.orbitsRuntimes.length);
            console.log('bootstrap done');

            currRuntime = runtime;
        }
    );

    await waitForRuntime;

    console.log(global.orbitsRuntimes);

    if (!currRuntime) {
        return;
    }

    console.log(
        'invertedActionsRegistry:',
        currRuntime['invertedActionsRegistry']
    );
    console.log('ActionModel:', currRuntime.ActionModel);

    const ActionConstructor = currRuntime.getActionFromRegistry(actionRef);

    if (!ActionConstructor) {
        throwError(`Cannot find specified action`, exitCodes.NOT_FOUND);
        return; // for type checking
    }

    currRuntime.ActionModel.findOne({
        actionRef,
        filter: { cli: true, cliInstance: cliInstanceUUID },
    }).then(async (actionDb: any) => {
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
    });
    // .catch((error: any) => {
    //     throwError(
    //         `Error creating action ${colors.bold.italic(actionRef)}:\n${error}`,
    //         exitCodes.INVALID_PARAMETER
    //     );
    // });
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
