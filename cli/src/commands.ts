import child_process from 'child_process';
import colors from 'colors';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Action, ActionRuntime, ActionState } from '@orbi-ts/core';

import winston from 'winston';
import { exitCodes } from './constants.js';
import { ActionsViewer } from './viewer/actions-viewer.js';
import { ACTION_STATE_FORMAT } from './viewer/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DEFAULT_ACTIONS_FILE = 'orbi.ts';

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
        await ActionRuntime.waitForActiveRuntime;
    } catch (error) {
        logErrorAndExit(
            `Cannot bootstrap Orbits app:\n${error}`,
            exitCodes.DATABASE_ERROR
        );
    }

    try {
        const action = await ActionRuntime.activeRuntime.ActionModel.findOne({
            _id: actionId,
        });
        if (!action)
            logErrorAndExit(
                `No action found matching ID ${colors.italic.bold(actionId)}`,
                exitCodes.NOT_FOUND
            );
        fn(action);
    } catch (error) {
        logErrorAndExit(
            `Error retrieving action ${colors.bold.italic(actionId)} from database:\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }
};

const viewAction = async (actionId: string, viewer: ActionsViewer) => {
    try {
        const actions = await ActionRuntime.activeRuntime.ActionModel.find({
            $or: [
                { _id: actionId },
                { 'definitionFrom.workflow.id': actionId },
                { 'workflowStack._id': actionId },
            ],
        });

        if (!actions.length) {
            viewer.destroy();
            logErrorAndExit(
                `No actions found matching ID ${colors.italic.bold(actionId)}`,
                exitCodes.NOT_FOUND
            );
        }
        viewer.setActions(actions);
    } catch (error) {
        viewer.destroy();
        logErrorAndExit(
            `Error retrieving action ${colors.bold.italic(actionId)} from database:\n${error}`,
            exitCodes.DATABASE_ERROR
        );
    }
};

const watchLogs = async (logfile: string, viewer: ActionsViewer) => {
    let lastSize = 0;

    fs.watchFile(logfile, { interval: 1000 }, (curr, prev) => {
        if (curr.size > lastSize) {
            try {
                const buffer = Buffer.alloc(curr.size - lastSize);
                const fd = fs.openSync(logfile, 'r');
                fs.readSync(fd, buffer, 0, buffer.length, lastSize);
                fs.closeSync(fd);

                const lines = buffer
                    .toString('utf-8')
                    .split(/\r?\n/)
                    .filter(Boolean);
                viewer.appendLogs(lines);
                lastSize = curr.size;
            } catch (err) {
                console.error(`Failed to read new logs: ${err}`);
            }
        }
    });
};

const watchAction = async (
    actionId: string,
    refresh: boolean = true,
    timeInterval: number = 1,
    simpleViewer: boolean = true,
    exit: Function,
    logfile?: string
) => {
    viewer = new ActionsViewer(actionId, refresh, simpleViewer, exit);
    if (logfile) watchLogs(logfile, viewer);

    await viewAction(actionId, viewer);
    if (!refresh && simpleViewer) {
        viewer.destroy();
        exit();
    }

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
    actionRef: string,
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
            logger: winston.createLogger({
                transports: [
                    new winston.transports.File({ filename: '/dev/null' }),
                ],
            }),

            workers: {
                quantity: 0,
                filter: { cli: true, instance: cliInstanceUUID },
            },
        });
        await ActionRuntime.waitForActiveRuntime;
    } catch (error) {
        logErrorAndExit(
            `Cannot bootstrap Orbits runtime:\n${error}`,
            exitCodes.DATABASE_ERROR
        );
    }

    const child = child_process.fork(
        path.join(__dirname, 'action-runner.js'),
        [
            JSON.stringify({
                isRunner: true,
                actionPath: opts.actionsFile,
                actionArgs,
                cliInstanceUUID,
                database: opts.database,
                actionRef: actionRef,
                app: opts.app,
                logFile: opts.logfile,
            }),
        ],
        {
            stdio: 'pipe',
            detached: true,
            env: {
                ...process.env,
                ORBITS_AUTOSTART: 'false',
            },
        }
    );

    if (!child.pid) {
        logErrorAndExit(
            'Unable to spawn Orbits job',
            exitCodes.ORBITS_JOB_ERROR
        );
    }

    const pidFile = `orbits-${cliInstanceUUID}.pid`;

    fs.writeFileSync(pidFile, `${child.pid}`);

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
                fs.unlinkSync(pidFile);
                process.kill(pid);
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

            process.stdout.write(colors.reset(''));
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
                        ),
                        opts.logfile
                    );
                } else {
                    exitWithMessageAndDbCleaning(
                        child.pid as number,
                        actionId
                    )();
                }
            }
        } catch (error) {
            // print anything that comes from child stdout
            // that is not JSON formatted to logfile
            if (viewer)
                viewer.appendLogs([
                    JSON.stringify({
                        level: 'info',
                        message: data.toString(),
                    }),
                ]);
        }
    });

    child.stderr?.on('data', (data) => {
        let code;
        try {
            let { msg, codeFromChild } = JSON.parse(data.toString());
            code = codeFromChild;
            logError(`Error from Orbits job:\n${msg}`);
        } catch (error: any) {
            if (viewer)
                viewer.appendLogs([
                    JSON.stringify({
                        level: 'error',
                        message: data.toString(),
                    }),
                ]);
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
