import { ActionSchemaInterface, databaseLogger } from '@orbi-ts/core';
import { Cmd } from './command-utils.js';
import { runCmd } from './run.js';
import { exitCodes, runCrudCmd } from './utils.js';
import { watchAction, watchCmd } from './watch.js';

const processResumeCmd = async (actionId: string, opts: any) => {
    runCrudCmd(actionId, 'resume', {
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
            console.log("here!!!")
            console.log((actionDb.filter as any)?.cliInstanceUUID)
            if (!opts.watch) process.exit(exitCodes.SUCCESS);
            watchAction(
                actionId,
                opts.depth,
                opts.refresh,
                parseFloat(opts.interval ?? 1),
                opts.simpleViewer,
                true,
                ()=>{},
                (actionDb.filter as any)?.cliInstanceUUID
            );
        },
        noExit: true,
    });
};

export const resumeCmd: Cmd = {
    name: 'resume',
    description:
        'Only effective on workflows.\nUpdate the database so that the provided action will resume',
    fn: processResumeCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action to resume',
        },
    ],
    options: [
        ...runCmd.options.map((opt) => ({ ...opt, group: 'Run options:' })),
    ],
};
