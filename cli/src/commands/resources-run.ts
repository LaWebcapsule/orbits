import colors from 'colors';

import { ChildProcess, fork } from 'child_process';
import path from 'path';
import { CRUD } from '../crud.js';
import { Cmd } from './command-utils.js';
import { exitCodes, logError, logErrorAndExit, setUpRuntime } from './utils.js';
import { watchAction, watchCmd } from './watch.js';

import { ActionRuntime } from '@orbi-ts/core';
import { randomUUID } from 'crypto';
import { unlinkSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ExitOptions = {
    child: ChildProcess;
    actionId?: string;
    keepInBackground?: boolean;
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
    ]);

    process.stdout.write('DONE\n');
};

const exit = async ({
    child,
    actionId,
    cliInstanceUUID,
    keepInBackground,
    pidFile,
    clean,
    waitForChildClosed,
}: ExitOptions) => {
    if (actionId && keepInBackground) {
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

const runLocal = async (
    resourceRefOrId: string,
    command: string,
    opts: any,
    cliInstanceUUID: string
) => {
    // if there is no watch, then run in background and exit.
    if (!opts.watch) opts.keepInBackground = true;

    const child = fork(
        path.join(__dirname, 'resource-runner.js'),
        [
            JSON.stringify({
                isRunner: true,
                resourcePath: opts.resourcesFile,
                resourceRefOrId,
                command,
                cliInstanceUUID,
                keepInBackground: opts.keepInBackground,
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

    // child will send action id
    child.stderr?.on('data', (data) => {
        process.stderr.write(data.toString() + '\n');
    });

    // child will send action id
    child.on('message', async (data) => {
        actionId = data.toString();
        const handleExit = async () => {
            await exit({
                child,
                actionId,
                clean: opts.clean,
                keepInBackground: opts.keepInBackground,
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
    resourceRefOrId: string,
    command: any,
    opts: any,
    cliInstanceUUID: string
) => {
    try {
        const action = await CRUD.runResourceCmd(resourceRefOrId, command, {
            cli: true,
            cliInstanceUUID,
        });
        const actionId = action._id.toString();

        if (!opts.watch) {
            process.stdout.write(
                `Action started with ID ${colors.bold.italic(actionId)}\n`
            );
            process.exit(exitCodes.SUCCESS);
        }

        watchAction(
            actionId.toString(),
            opts.depth,
            true,
            parseFloat(opts.interval ?? 1),
            opts.simpleViewer
        );
    } catch (error) {
        logErrorAndExit(
            `Error running ${colors.italic.bold(resourceRefOrId)}:\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }
};

const processResourcesRunCmd = async (resourceRefOrId: string, command: any, opts: any) => {
    // validate opts
    if (!opts.local && opts.clean)
        console.warn(
            colors.yellow(
                `'-c, --clean' only applies when used with '--local' option`
            )
        );
    if (!opts.local && opts.keepInBackground)
        console.warn(
            colors.yellow(
                `'-k, --keep-in-background' only applies when used with '--local' option`
            )
        );

    const cliInstanceUUID = randomUUID();
    await setUpRuntime({
        actionsFiles: opts.resourcesFile ? [opts.resourcesFile] : [],
        filter: { cli: true, cliInstanceUUID },
    });
    return opts.local
        ? runLocal(resourceRefOrId, command, opts, cliInstanceUUID)
        : run(resourceRefOrId, command, opts, cliInstanceUUID);
};

export const resourcesRunCmd: Cmd = {
    name: 'run',
    description: 'Run the provided command on resource',
    fn: processResourcesRunCmd,
    arguments: [
        {
            name: 'resource_ref_or_identity',
            descr: 'Ref or identity of the resource to install',
        },
        {
            name: 'command',
            descr: 'Name of the command to run',
        },
    ],
    options: [
        {
            short: 'l',
            full: 'local',
            descr: 'Run locally with a dedicated Orbits job',
            dflt: { val: false },
        },
        {
            short: 'f',
            full: 'resources-file',
            descr:
                'File describing the resources. ' +
                `Use ${colors.italic.bold('orbi.ts')} if not provided`,
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
            short: 'k',
            full: 'keep-in-background',
            descr: `Keep Orbits job running in background. Default when watch is disabled.`,
            dflt: {
                val: false,
                descr: 'Kill Orbits job when cli process stops',
            },
            group: `Local run options:`,
            conflict: 'clean',
        },
        ...watchCmd.options.map((opt) => ({ ...opt, group: 'Watch options:' })),
    ],
};
