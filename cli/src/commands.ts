import colors from 'colors';

import child_process from 'child_process';
import path from 'path';

import { randomUUID } from 'crypto';
import { unlinkSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { Action, ActionRuntime, ActionState } from '@wbce/orbits-core';

import { ActionsViewer } from './viewer/actions-viewer.js';
import { ACTION_STATE_FORMAT } from './viewer/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export enum exitCodes {
    SUCCESS,
    INVALID_PATH,
    INVALID_PARAMETER,
    NOT_FOUND,
    DATABASE_ERROR,
    ORBITS_JOB_ERROR,
}

export const DEFAULT_APP = 'app';
export const DEFAULT_ACTION = 'action';

export const logError = (str: string) => {
    console.error(colors.red(`ERROR: ${str}`));
};

const logErrorAndExit = (msg: string, code: exitCodes) => {
    logError(msg);
    process.exit(exitCodes.NOT_FOUND);
};

const cliInstanceUUID = randomUUID();
let viewer: ActionsViewer;

const runOnActionDb = async (
    actionId: string,
    database: string,
    fn: (action: Action['dbDoc'] & any) => any
) => {
    try {
        new ActionRuntime({
            db: { mongo: { url: database } },
            workers: { quantity: 0 },
        });

        await ActionRuntime.waitForActiveRuntime;
    } catch (error) {
        logErrorAndExit(
            `Cannot bootstrap Orbits app:\n${error}`,
            exitCodes.DATABASE_ERROR
        );
    }

    ActionRuntime.activeRuntime.ActionModel.findOne({
        _id: actionId,
    })
        .then((action) => {
            if (!action) {
                logErrorAndExit(
                    `No action found matching ID ${colors.italic.bold(actionId)}`,
                    exitCodes.NOT_FOUND
                );
            }
            fn(action);
        })
        .catch((error) => {
            logErrorAndExit(
                `Error retrieving action ${colors.bold.italic(actionId)} from database:\n${error}`,
                exitCodes.INVALID_PARAMETER
            );
        });
};

const viewAction = async (actionId: string, viewer: ActionsViewer) => {
    await ActionRuntime.activeRuntime.ActionModel.find({
        $or: [
            { _id: actionId },
            { 'definitionFrom.workflow.id': actionId },
            { 'workflowStack._id': actionId },
        ],
    })
        .then((actions) => {
            if (!actions.length) {
                viewer.destroy();
                logErrorAndExit(
                    `No actions found matching ID ${colors.italic.bold(actionId)}`,
                    exitCodes.NOT_FOUND
                );
            }
            viewer.setActions(actions);
        })
        .catch((error) => {
            viewer.destroy();
            logErrorAndExit(
                `Error retrieving action ${colors.bold.italic(actionId)} from database:\n${error}`,
                exitCodes.DATABASE_ERROR
            );
        });
};

const watchAction = async (
    actionId: string,
    refresh: boolean = true,
    timeInterval: number = 1,
    simpleViewer: boolean = true,
    exit: Function
) => {
    viewer = new ActionsViewer(actionId, refresh, simpleViewer, exit);
    viewAction(actionId, viewer).then(() => {
        if (!refresh && simpleViewer) {
            viewer.destroy();
            exit();
        }
    });

    setInterval(async () => {
        await viewAction(actionId, viewer);
    }, timeInterval * 1000);
};

const processWatchCmd = async (actionId: string, opts: any) => {
    new ActionRuntime({
        db: { mongo: { url: opts.database } },
        workers: { quantity: 0 },
    });

    await ActionRuntime.waitForActiveRuntime;

    watchAction(
        actionId,
        opts.refresh,
        parseFloat(opts.interval),
        opts.simpleViewer,
        () => {
            process.exit(exitCodes.SUCCESS);
        }
    );
};

const processRunCmd = async (
    actionPath: string,
    actionArgs: string[],
    opts: any
) => {
    // if there is no watch, then run in background and exit.
    if (!opts.watch) {
        opts.keepBackground = true;
    }

    try {
        new ActionRuntime({
            db: { mongo: { url: opts.database } },
            workers: {
                quantity: 0,
                filter: { cli: true, instance: cliInstanceUUID },
            },
        });

        await ActionRuntime.waitForActiveRuntime;
    } catch (error) {
        logErrorAndExit(
            `Cannot bootstrap Orbits app:\n${error}`,
            exitCodes.DATABASE_ERROR
        );
    }

    const child = child_process.fork(
        path.join(__dirname, 'action-runner.js'),
        [
            JSON.stringify({
                isRunner: true,
                actionPath,
                actionArgs,
                cliInstanceUUID,
                database: opts.database,
                action: opts.action,
                app: opts.app,
                logFile: opts.logfile,
            }),
        ],
        { stdio: 'pipe', detached: true }
    );

    if (!child.pid) {
        logErrorAndExit(
            'Unable to spawn Orbits job',
            exitCodes.ORBITS_JOB_ERROR
        );
    }

    writeFileSync(`orbits-${cliInstanceUUID}.pid`, `${child.pid}`);

    const exitWithMessageAndDbCleaning =
        (pid: number, id: string, errorCode: number = 0) =>
        async () => {
            if (opts.keepBackground) {
                process.stdout.write(
                    `\nOrbits job is running in background with pid ${colors.bold.italic(pid.toString())}\n` +
                        `Action ID is ${colors.bold.italic(actionId)}, ` +
                        `you can check its state using the ${colors.italic.yellow('watch')} command:\n` +
                        `\n> ${path.basename(process.argv[1])} watch ${actionId} --database ${opts.database}\n\n`
                );
            } else {
                unlinkSync(`orbits-${cliInstanceUUID}.pid`);
            }

            if (opts.clean) {
                process.stdout.write('Cleaning database... ');
                await ActionRuntime.activeRuntime.ActionModel.deleteMany({
                    filter: {
                        cli: true,
                        instance: cliInstanceUUID,
                    },
                });
                process.stdout.write('DONE\n');
            }

            process.exit(errorCode);
        };

    let actionId: string;

    child.stdout?.on('data', (data) => {
        try {
            const childData = JSON.parse(data.toString());
            if (childData.id) {
                actionId = childData.id;
                if (opts.watch) {
                    watchAction(
                        childData.id,
                        true,
                        parseFloat(opts.interval),
                        opts.simpleViewer,
                        exitWithMessageAndDbCleaning(
                            child.pid as number,
                            childData.id
                        )
                    );
                } else {
                    exitWithMessageAndDbCleaning(
                        child.pid as number,
                        actionId
                    )();
                }
            }
        } catch (error) {
            // ignore anything that comes from child stdout
            // that is not JSON formatted
        }
    });

    child.stderr?.on('data', (data) => {
        let code;
        try {
            let { msg, codeFromChild } = JSON.parse(data.toString());
            code = codeFromChild;
            logError(`Error from Orbits job:\n${msg}`);
        } catch (error: any) {
            // if child is still running then it's just some
            // warning printed out on stderr
            // sending 0 will just check for existence
            try {
                return process.kill(child.pid!, 0);
            } catch (error: any) {
                if (error.code == 'EPERM') return true;
                logError(`failed to run Orbits job:\n${data.toString()}`);
                code = exitCodes.ORBITS_JOB_ERROR;
            }
        }

        if (viewer) viewer.destroy();

        exitWithMessageAndDbCleaning(child.pid as number, actionId, code)();
    });
};

const processPauseCmd = async (actionId: string, opts: any) => {
    runOnActionDb(actionId, opts.database, async (action: Action['dbDoc']) => {
        const nextActivity = new Date();
        nextActivity.setFullYear(9999);
        action!.cronActivity.nextActivity = nextActivity;
        await action!.save();
        process.exit(exitCodes.SUCCESS);
    });
};

const processResumeCmd = async (actionId: string, opts: any) => {
    runOnActionDb(actionId, opts.database, async (action: Action['dbDoc']) => {
        action!.cronActivity.nextActivity = new Date();
        await action!.save();
        process.exit(exitCodes.SUCCESS);
    });
};

const processReplayCmd = async (actionId: string, opts: any) => {
    runOnActionDb(actionId, opts.database, async (action: Action['dbDoc']) => {
        if (
            action.state !== ActionState.CLOSED &&
            action.state !== ActionState.ERROR &&
            action.state !== ActionState.SUCCESS
        ) {
            logErrorAndExit(
                'Action cannot be replayed in its current state ' +
                    `(${colors.bold(ACTION_STATE_FORMAT[action.state].full)})`,
                exitCodes.INVALID_PARAMETER
            );
        }

        action.state = ActionState.SLEEPING;
        action.cronActivity.nextActivity = new Date();
        await action.save();

        process.exit(exitCodes.SUCCESS);
    });
};

export {
    processPauseCmd,
    processReplayCmd,
    processResumeCmd,
    processRunCmd,
    processWatchCmd,
};
