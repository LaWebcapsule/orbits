import colors from 'colors';
import { Argument, Option, program } from 'commander';

import packageJson from '../package.json' with { type: 'json' };

import {
    Cmd,
    endCmd,
    getCmd,
    getRegistryCmd,
    logError,
    pauseCmd,
    replayCmd,
    resumeCmd,
    runCmd,
    setBagCmd,
    watchCmd,
} from './commands/index.js';

if (!process.stdout.isTTY) colors.disable();

const VERSION = packageJson.version;

const COMMANDS: Cmd[] = [
    getCmd,
    getRegistryCmd,
    watchCmd,
    runCmd,
    pauseCmd,
    resumeCmd,
    replayCmd,
    setBagCmd,
    endCmd,
];

program
    .name('orbits-cli')
    .description('CLI to interact with orbits actions')
    .version(VERSION);

program.configureOutput({
    writeErr: (str) => logError(str),
});

const actionsCmd = program
    .command('actions')
    .description('Actions related commands');

COMMANDS.forEach((cmdCfg) => {
    const cmd = actionsCmd.command(cmdCfg.name);
    cmd.description(cmdCfg.description);
    cmdCfg.arguments.forEach(({ name, descr, parser }) => {
        const argument = new Argument(`${name}`, descr);
        if (parser) argument.argParser(parser);
        cmd.addArgument(argument);
    });
    cmdCfg.options.forEach(
        ({
            short,
            full,
            descr,
            dflt,
            group,
            conflict,
            parser,
            implies,
            choices,
        }) => {
            const option = new Option(
                `-${short}, --${full}${typeof dflt.val != 'boolean' ? ` <${full}>` : ''}`,
                descr
            );
            option.default(dflt.val, dflt.descr);
            if (parser) option.argParser(parser);
            if (conflict) option.conflicts(conflict);
            if (group) cmd.optionsGroup(group);
            if (implies) option.implies(implies);
            if (choices) option.choices(choices);
            cmd.addOption(option);
        }
    );
    cmd.action(cmdCfg.fn);
});

program.parse();
