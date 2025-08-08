import colors from 'colors';

import { ChildProcess, fork } from 'child_process';
import path from 'path';
import { Cmd, parseArgs } from './command-utils.js';
import {
    DEFAULT_LOG_FILE,
    exitCodes,
    logError,
    logErrorAndExit,
    runCrudCmd,
    setUpRuntime,
} from './utils.js';
import { watchAction, watchCmd } from './watch.js';

import {
    Action,
    ActionRuntime,
    ActionState,
    databaseLogger,
} from '@orbi-ts/core';
import { randomUUID } from 'crypto';
import { unlinkSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ExitOptions = {
    child: ChildProcess;
    actionId?: string;
    keep?: boolean;
    exitCode?: exitCodes;
    clean: boolean;
    cliInstanceUUID: string;
    pidFile?: string;
    waitForChildClosed: Promise<any>;
};

const cleanDb = async (cliInstanceUUID: string) => {
    process.stdout.write('Cleaning database... ');
    await Promise.all([
        ActionRuntime.activeRuntime.ActionModel.deleteMany({
            filter: { cli: true, cliInstanceUUID },
        }),
        ActionRuntime.activeRuntime.LogModel.deleteMany({
            filter: { cli: true, cliInstanceUUID },
        }),
        ActionRuntime.activeRuntime.ResourceModel.deleteMany({
            filter: { cli: true, cliInstanceUUID },
        }),
    ]);

    process.stdout.write('DONE\n');
};

const exit = async ({
    child,
    actionId,
    cliInstanceUUID,
    keep,
    pidFile,
    clean,
    waitForChildClosed,
}: ExitOptions) => {
    if (actionId && keep) {
        child.unref();
        process.stdout.write(
            `\nOrbits job is running in background with pid ${colors.bold.italic(child.pid!.toString())}\n` +
                `Action ID is ${colors.bold.italic(actionId)}, ` +
                `you can check its state using the ${colors.italic.yellow('get')} or ${colors.italic.yellow('watch')} commands:\n` +
                `\t${colors.italic(`$ ${path.basename(process.argv[1])} actions get ${actionId}`)}\n` +
                `\t${colors.italic(`$ ${path.basename(process.argv[1])} actions watch ${actionId}`)}\n\n`
        );
        process.exit(exitCodes.SUCCESS);
    }

    if (pidFile) unlinkSync(pidFile);
    try {
        process.kill(child.pid!);
        process.stdout.write('Waiting for Orbits job to stop... ');
        await waitForChildClosed;
        process.stdout.write('DONE\n');
    } catch (error) {
        // code ESRCH if process is not found
        if ((error as { code: string }).code !== 'ESRCH') throw error;
    }

    if (clean) await cleanDb(cliInstanceUUID);

    process.exit(exitCodes.SUCCESS);
};

export const CHILD_ERROR_PREFIX = 'child error';

const runInBackground = async (
    actionRef: string,
    actionArgs: string[],
    opts: any,
    cliInstanceUUID: string
) => {
    await setUpRuntime({
        actionsFiles: opts.actionsFile ? [opts.actionsFile] : [],
        filter: { cli: true, cliInstanceUUID },
    });

    // if there is no watch, then run in background and exit.
    if (!opts.watch) opts.keep = true;

    const child = fork(
        path.join(__dirname, 'action-runner.js'),
        [
            JSON.stringify({
                actionRef,
                actionArgs,
                cliInstanceUUID,
                opts,
            }),
        ],
        { stdio: ['ignore', 'ignore', 'pipe', 'ipc'], detached: true }
    );

    if (!child.pid)
        logErrorAndExit(
            'Unable to spawn Orbits job',
            exitCodes.ORBITS_JOB_ERROR
        );

    const pidFile = `orbits-${cliInstanceUUID}.pid`;

    writeFileSync(pidFile, `${child.pid}`);

    let actionId: string;

    let resolveCloseChild: () => void;
    const waitForChildClosed = new Promise<void>((resolve) => {
        resolveCloseChild = resolve;
    });

    // on child exit, exit with same code as child
    child.on('close', async (code) => {
        // null if we kill orbits from outside
        if (code !== null && code !== exitCodes.SUCCESS)
            logError(`Unexpected exit from Orbits job (${code})`);
        resolveCloseChild();
    });

    child.stderr?.on('data', (data) => {
        // only display explicitly returned errors
        const err: string = data.toString();
        if (err.match(`${CHILD_ERROR_PREFIX}:`))
            process.stderr.write(err + '\n');
    });

    // child will send action id
    child.on('message', async (data) => {
        actionId = data.toString();
        const handleExit = async () => {
            await exit({
                child,
                actionId,
                clean: opts.clean,
                keep: opts.keep,
                pidFile,
                cliInstanceUUID,
                waitForChildClosed,
            });
        };

        if (!opts.watch) handleExit();

        watchAction(
            actionId,
            0,
            true,
            parseFloat(opts.interval),
            opts.simpleViewer,
            true,
            handleExit,
            cliInstanceUUID
        );
    });
};

const run = async (
    actionRef: string,
    actionArgs: any,
    opts: any,
    cliInstanceUUID: string
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
                filter: { cli: true, cliInstanceUUID },
                ...(opts.localWorker
                    ? {
                          workersCount: 1,
                          logger: databaseLogger,
                      }
                    : {}),
            },
            processResult: async (action: Action) => {
                const actionId = action._id.toString();
                const handleExit = async () => {
                    if (opts.clean) await cleanDb(cliInstanceUUID);
                    process.exit(exitCodes.SUCCESS);
                };

                if (!opts.watch) {
                    process.stdout.write(
                        `${action.dbDoc.actionRef} started with ID ${colors.bold(actionId)}\n`
                    );
                    if (!opts.localWorker) process.exit(exitCodes.SUCCESS);

                    if (opts.clean)
                        ['SIGINT', 'SIGTERM'].forEach((sig) => {
                            process.on(sig, async () => {
                                // overwrite printed control characters
                                process.stdout.write('\r');
                                process.stdout.clearLine(0);
                                await handleExit();
                            });
                        });
                    process.stdout.write(
                        colors.yellow('⚠ Do not close this process\n')
                    );
                    const state = await Action.trackActionAsPromise(action, [
                        ActionState.SUCCESS,
                        ActionState.ERROR,
                    ]);
                    process.stdout.write(
                        `${action.dbDoc.actionRef} completed with state ${colors.bold(ActionState[state as ActionState])}\n`
                    );
                    process.stdout.write(
                        colors.yellow(`You can now close this process\n`)
                    );
                } else {
                    watchAction(
                        actionId.toString(),
                        opts.depth,
                        true,
                        parseFloat(opts.interval ?? 1),
                        opts.simpleViewer,
                        true,
                        handleExit,
                        cliInstanceUUID
                    );
                }
            },
            noExit: true,
        },
        actionArgs,
        { cli: true, cliInstanceUUID }
    );
};

const processRunCmd = async (actionRef: string, actionArgs: any, opts: any) => {
    // validate opts
    if (!opts.localWorker && opts.clean)
        console.warn(
            colors.yellow(
                `'-c, --clean' only applies when used with '--local-worker' option`
            )
        );
    const cliInstanceUUID = randomUUID();
    const fn = opts.background ? runInBackground : run;
    await fn(actionRef, actionArgs, opts, cliInstanceUUID);
};

export const runCmd: Cmd = {
    name: 'run',
    description: 'Run the provided action',
    fn: processRunCmd,
    arguments: [
        {
            name: 'action_ref',
            descr: 'Ref of the action to run',
        },
        {
            name: '[arguments...]',
            descr: `Arguments for the action, in the format ${colors.italic('arg1=val1 arg2=val2 json')}`,
            parser: parseArgs,
        },
    ],
    options: [
        {
            short: 'l',
            full: 'local-worker',
            descr: 'Run with a local worker',
            dflt: { val: false },
        },
        {
            short: 'f',
            full: 'actions-file',
            descr:
                'File describing the actions. ' +
                `Use ${colors.bold.italic('orbi.ts')} if not provided`,
            dflt: { val: 'orbi.ts' },
        },
        {
            short: 'w',
            full: 'no-watch',
            descr: 'Do not watch progress',
            dflt: { val: true },
        },
        {
            short: 'c',
            full: 'clean',
            descr: `Remove created actions from database on exit`,
            group: `Local run options:`,
            dflt: { val: false },
        },
        {
            short: 'g',
            full: 'log-file',
            descr: `File for orbits logs`,
            group: `Local run options:`,
            dflt: { val: DEFAULT_LOG_FILE },
        },
        {
            short: 'b',
            full: 'background',
            descr: `Run Orbits job in background.`,
            dflt: {
                val: false,
            },
            group: `Local run options:`,
            implies: ['local-worker'],
        },
        {
            short: 'k',
            full: 'keep',
            descr: `Keep Orbits job running after action is complete.`,
            dflt: {
                val: false,
            },
            group: `Local run options:`,
            conflict: 'clean',
            implies: ['local-worker', 'background'],
        },
        ...watchCmd.options.map((opt) => ({ ...opt, group: 'Watch options:' })),
    ],
};
