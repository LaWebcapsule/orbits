import colors from 'colors';
import { Argument, Command, Option, program } from 'commander';

import packageJson from '../package.json' with { type: 'json' };

import {
    Cmd,
    endCmd,
    getCmd,
    getRegistryCmd,
    logError,
    pauseCmd,
    replayCmd,
    resourcesGetCmd,
    resourcesGetRegistryCmd,
    resourcesInstallCmd,
    resourcesRunCmd,
    resumeCmd,
    runCmd,
    setBagCmd,
    watchCmd,
} from './commands/index.js';

if (!process.stdout.isTTY) colors.disable();

const VERSION = packageJson.version;

const ACTIONS_COMMANDS: Cmd[] = [
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

const RESOURCES_COMMANDS: Cmd[] = [
    resourcesGetRegistryCmd,
    resourcesGetCmd,
    resourcesInstallCmd,
    resourcesRunCmd,
];

const setUpCommands = (commanderCmd: Command, cmds: Cmd[]) => {
    cmds.forEach((cmdCfg) => {
        const cmd = commanderCmd.command(cmdCfg.name);
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
                isArray,
            }) => {
                const option = new Option(
                    `-${short}, --${full}${typeof dflt.val != 'boolean' ? ` <${full}${isArray ? '...' : ''}>` : ''}`,
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
};

program
    .name('orbits-cli')
    .description('CLI to interact with orbits actions')
    .version(VERSION);

program.configureOutput({
    writeErr: (str) => logError(str),
});

setUpCommands(
    program.command('actions').description('Actions related commands'),
    ACTIONS_COMMANDS
);

setUpCommands(
    program.command('resources').description('Resources related commands'),
    RESOURCES_COMMANDS
);

program.parse();
