import colors from 'colors';

import { ActionSchemaInterface } from '@orbi-ts/core';
import { CRUD } from '../crud.js';
import { ActionsViewer } from '../viewer/actions-viewer.js';
import { Cmd } from './command-utils.js';
import { exitCodes, logError, setUpRuntime } from './utils.js';

const viewAction = async (
    actionId: string,
    viewer: ActionsViewer,
    depth: number
) => {
    let actions: ActionSchemaInterface[] = [],
        topId = actionId;
    try {
        ({ actions, topId } = await CRUD.get(actionId, {}, depth));
    } catch (error) {
        viewer.destroy();
        throw Error(
            `Error getting action ${colors.bold.italic(actionId)}: ${(error as Error).message}`
        );
    }
    if (!actions.length) {
        viewer.destroy();
        throw Error(
            `No actions found matching ID ${colors.bold.italic(actionId)}`
        );
    }
    viewer.setActions(actions);
    viewer.setTopAction(topId);
    viewer.highlightAction(actionId);
    viewer.refresh();
};

const viewLogs = async (cliInstanceUUID: string, viewer: ActionsViewer) => {
    const logs = await CRUD.listLogs({ cli: true, cliInstanceUUID });
    viewer.setLogs(logs);
    viewer.refresh();
};

export const watchAction = (
    actionId: string,
    depth: number = 0,
    refresh: boolean = true,
    timeInterval: number = 1,
    simpleViewer: boolean = true,
    withLogs: boolean = false,
    exit?: Function,
    cliInstanceUUID?: string
): ActionsViewer => {
    const viewer = new ActionsViewer(actionId, refresh, simpleViewer, exit);

    const tryView = async () => {
        try {
            await Promise.all([
                viewAction(actionId, viewer, depth),
                withLogs && viewLogs(cliInstanceUUID!, viewer),
            ]);
        } catch (error) {
            logError((error as Error).message);
            if (exit) exit();
            else process.exit(exitCodes.GENERIC_ERROR);
        }
    };

    (async () => {
        await tryView();
        if (!refresh && simpleViewer) {
            viewer.destroy();
            process.exit(exitCodes.SUCCESS);
        }
        refresh && setInterval(tryView, timeInterval * 1000);
    })();

    return viewer;
};

const processWatchCmd = async (actionId: string, opts: any) => {
    await setUpRuntime();
    watchAction(
        actionId,
        opts.depth,
        opts.refresh,
        parseFloat(opts.interval ?? 1),
        opts.simpleViewer,
        true
    );
};

export const watchCmd: Cmd = {
    name: 'watch',
    description: 'Watch the provided action',
    fn: processWatchCmd,
    arguments: [
        {
            name: 'action_id',
            descr: 'ID of the action to watch',
        },
    ],
    options: [
        {
            short: 'i',
            full: 'interval',
            descr: 'Time interval between status updates in seconds',
            dflt: { val: 1.0 },
        },
        {
            short: 'r',
            full: 'no-refresh',
            descr: 'Do not refresh',
            dflt: { val: true },
        },
        {
            short: 'd',
            full: 'depth',
            descr: 'Traverse up the tree by the specified depth',
            dflt: { val: 0, descr: 'shows only the action and its children' },
        },
        {
            short: 's',
            full: 'simple-viewer',
            descr: 'Print out simple actions graph instead of full viewer',
            dflt: { val: false },
        },
    ],
};
