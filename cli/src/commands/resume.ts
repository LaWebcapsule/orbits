import { ActionSchemaInterface, databaseLogger } from '@orbi-ts/core';
import winston from 'winston';
import { Cmd } from './command-utils.js';
import { runCmd } from './run.js';
import { exitCodes, runCrudCmd } from './utils.js';
import { watchAction } from './watch.js';

const processResumeCmd = async (actionId: string, opts: any) => {
    databaseLogger.add(
        new winston.transports.File({
            filename: opts.logFile,
            level: process.env['ORBITS_LOGGING__LEVEL'] ?? 'info',
        })
    );
    runCrudCmd(
        actionId,
        'resume',
        {
            runtimeOpts: {
                actionsFiles: [opts.actionsFile],
                filter: { cli: true },
                ...(opts.localWorker
                    ? {
                          workersCount: 1,
                          logger: databaseLogger,
                      }
                    : {}),
            },
            processResult: (actionDb: ActionSchemaInterface) => {
                if (!opts.watch) process.exit(exitCodes.SUCCESS);
                watchAction(
                    actionId,
                    opts.depth,
                    opts.refresh,
                    parseFloat(opts.interval ?? 1),
                    opts.simpleViewer,
                    true,
                    () => {
                        process.exit(exitCodes.SUCCESS);
                    },
                    (actionDb.filter as any)?.cliInstanceUUID
                );
            },
            noExit: true,
        },
        opts.localWorker
    );
};

export const resumeCmd: Cmd = {
    name: 'resume',
    description:
        'Resume the provided action, either update the database or resume locally.',
    fn: processResumeCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action to resume',
        },
    ],
    options: runCmd.options
        .filter(
            (opt) =>
                ![
                    'c', // no cleaning
                    'b', // do not run in background
                    'k', // do not keep in background
                ].includes(opt.short)
        )
        .map((opt) => ({ ...opt, group: opt.group || 'Run options:' })),
};
