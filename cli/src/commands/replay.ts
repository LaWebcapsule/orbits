import colors from 'colors';
import { exitCodes, runCrudCmd } from './utils.js';
import { watchAction, watchCmd } from './watch.js';

const processReplayCmd = async (actionId: string, opts: any) => {
    runCrudCmd(
        actionId,
        'replay',
        {
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
        },
        opts.pathToStep.map((step: string) =>
            isNaN(Number(step)) ? step : Number(step)
        )
    );
};

export const replayCmd = {
    name: 'replay',
    description:
        'Update the database so that the provided action will be replayed',
    fn: processReplayCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action to replay',
        },
    ],
    options: [
        {
            short: 'p',
            full: 'path-to-step',
            descr:
                'For workflows, path to the step to replay from as a list of either steps indices or names:\n' +
                `${colors.italic('workflow1 subworkflow2 action3')}\n` +
                `${colors.italic('0 1 2')}`,
            dflt: { val: [0], descr: 'Replay from the start' },
            isArray: true,
        },
        {
            short: 'w',
            full: 'watch',
            descr: 'Watch progress',
            dflt: { val: false, descr: 'Do not watch progress' },
        },
        ...watchCmd.options.map((opt) => ({ ...opt, group: 'Watch options:' })),
    ],
};
