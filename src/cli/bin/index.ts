#!/usr/bin/env npx tsx
import colors from 'colors';
import { Option, program } from 'commander';

import {
    DEFAULT_ACTION,
    DEFAULT_APP,
    logError,
    processPauseCmd,
    processReplayCmd,
    processResumeCmd,
    processRunCmd,
    processWatchCmd,
} from '../src/commands.js';

const VERSION = '0.0.1';
const DEFAULT_DATABASE = 'mongodb://localhost:27017/orbits';

const COMMON_OPTIONS = [
    {
        short: 'd',
        full: 'database',
        descr: 'URL to the mongodb database',
        dflt: { val: DEFAULT_DATABASE },
    },
];

const INTERVAL_OPTION = {
    short: 'i',
    full: 'interval',
    descr: 'Time interval between status updates in seconds',
    dflt: { val: '1.0' },
};

const CLEAN_OPTION = {
    short: 'c',
    full: 'clean',
    descr: 'Clean database on exit',
    dflt: { val: false },
    conflict: 'keep-background',
};

const WATCH_OPTION = {
    short: 'w',
    full: 'no-watch',
    descr: 'Do not watch progress. This will set keep-background to true',
    dflt: { val: true },
    conflict: 'clean',
};

const KEEP_IN_BACKGROUND_OPTION = {
    short: 'k',
    full: 'keep-background',
    descr: 'Keep Orbits job running in background',
    dflt: { val: false, descr: 'Kill Orbits job when cli process stops' },
    conflict: 'clean',
};

const SIMPLE_VIEWER_OPTION = {
    short: 's',
    full: 'simple-viewer',
    descr: 'Print out simple actions graph instead of full viewer',
    dflt: { val: false },
};

const LOG_FILE_OPTION = {
    short: 'l',
    full: 'logfile',
    descr: 'Path to file where to write Orbits logs',
    dflt: { val: './orbits.log' },
};

const RUN_OPTIONS = [
    INTERVAL_OPTION,
    CLEAN_OPTION,
    WATCH_OPTION,
    SIMPLE_VIEWER_OPTION,
    LOG_FILE_OPTION,
];

type CmdOpt = {
    short: string;
    full: string;
    descr: string;
    dflt: { val: any; descr?: string };
    conflict?: string;
};

type CmdArg = {
    name: string;
    descr: string;
};

type Cmd = {
    name: string;
    description: string;
    fn: (...args: any) => any;
    arguments: CmdArg[];
    options: CmdOpt[];
};

const COMMANDS: Cmd[] = [
    {
        name: 'run',
        description: 'Run the provided action/workflow',
        fn: processRunCmd,
        arguments: [
            {
                name: 'path_to_action',
                descr:
                    'Path to the TypeScript file describing the action.\n' +
                    `If no names are given using ${colors.italic.bold('--action')} and ${colors.italic.bold('--app')},\n` +
                    `it should export default ${colors.italic.bold('action')} and ${colors.italic.bold('app')}`,
            },
            {
                name: '[arguments...]',
                descr: `Arguments for the action, in the format ${colors.italic('arg1=val1 arg2=val2 boolArg')}`,
            },
        ],
        options: [
            ...COMMON_OPTIONS,
            ...RUN_OPTIONS,
            {
                short: 'a',
                full: 'action',
                descr:
                    'Orbits Action Constructor to run.\n' +
                    `Use default export ${colors.italic.bold('action')} if not provided`,
                dflt: { val: DEFAULT_ACTION },
            },
            {
                short: 'p',
                full: 'app',
                descr:
                    'Orbits App Constructor to use.\n' +
                    `Use default export ${colors.italic.bold('app')} if not provided`,
                dflt: { val: DEFAULT_APP },
            },
            KEEP_IN_BACKGROUND_OPTION,
        ],
    },
    {
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
            ...COMMON_OPTIONS,
            INTERVAL_OPTION,
            {
                short: 'r',
                full: 'no-refresh',
                descr: 'Do not refresh',
                dflt: { val: true },
            },
            SIMPLE_VIEWER_OPTION,
        ],
    },
    {
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
        options: [...COMMON_OPTIONS],
    },
    {
        name: 'pause',
        description:
            'Update the database so that the provided action will pause',
        fn: processPauseCmd,
        arguments: [
            {
                name: 'action_id',
                descr: 'ID of the action to pause',
            },
        ],
        options: [...COMMON_OPTIONS],
    },
    {
        name: 'resume',
        description:
            'Update the database so that the provided action will resume',
        fn: processResumeCmd,
        arguments: [
            {
                name: 'action_id',
                descr: 'ID of the action to resume',
            },
        ],
        options: [...COMMON_OPTIONS],
    },
];

program
    .name('orbits-cli')
    .description('CLI to interact with orbits actions')
    .version(VERSION);

program.configureOutput({
    writeErr: (str) => logError(str),
});

COMMANDS.forEach((cmdCfg) => {
    const cmd = program.command(cmdCfg.name);
    cmd.description(cmdCfg.description);
    cmdCfg.arguments.forEach(({ name, descr }) => {
        cmd.argument(`${name}`, descr);
    });
    cmdCfg.options.forEach(({ short, full, descr, dflt, conflict }) => {
        const option = new Option(
            `-${short}, --${full}${typeof dflt.val != 'boolean' ? ` <${full}>` : ''}`,
            descr
        );

        option.default(dflt.val, dflt.descr);

        if (conflict) option.conflicts(conflict);

        cmd.addOption(option);
    });
    cmd.action(cmdCfg.fn);
});

program.parse();
