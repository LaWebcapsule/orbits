import { Cmd } from './command-utils.js';
import { exitCodes, runCrudCmd } from './utils.js';
import { watchAction, watchCmd } from './watch.js';

const processResumeCmd = async (actionId: string, opts: any) => {
    runCrudCmd(actionId, 'resume', {
        processResult: () => {
            if (!opts.watch) process.exit(exitCodes.SUCCESS);
            watchAction(
                actionId,
                opts.depth,
                opts.refresh,
                parseFloat(opts.interval ?? 1),
                opts.simpleViewer,
                true
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
        {
            short: 'w',
            full: 'watch',
            descr: 'Watch progress',
            dflt: { val: false, descr: 'Do not watch progress' },
        },
        ...watchCmd.options.map((opt) => ({ ...opt, group: 'Watch options:' })),
    ],
};
