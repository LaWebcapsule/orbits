#!/usr/bin/env -S npx tsx

import { Argument, Option, program } from 'commander';
import fs from 'fs';
import stripAnsi from 'strip-ansi';

// dynamic import not to run orbits
process.env['ORBITS_AUTOSTART'] = 'false';
await import('../src/index.js');

let argAndOptTemplate = (opt: string, description: string) =>
    `- \`${opt}\`${description ? `: ${stripAnsi(description.replace(/\x1b\[3m|\x1b\[23m/g, '`'))}` : ''}\n`;

let argsAndOptsTemplate = (
    title: 'Arguments' | 'Options',
    opts: {
        opt: string;
        description: string;
    }[]
) =>
    `#### ${title}\n\n${opts.map(({ opt, description }) => argAndOptTemplate(opt, description ?? '')).join('')}`;

let usageTemplate = (cmdName: string, usage: string) =>
    usage
        ? `**Usage**\n\n\`\`\`bash\n${program.name()} actions ${cmdName} ${usage}\n\`\`\``
        : '';

let cmdTemplate = (
    cmdName: string,
    description: string,
    usage: string,
    options: readonly Option[],
    args: readonly Argument[]
) => `## \`${cmdName}\`

${description}

${usageTemplate(cmdName, usage)}

${
    args.length
        ? argsAndOptsTemplate(
              'Arguments',
              args.map((arg) => ({
                  ...arg,
                  opt: arg.name(),
              }))
          )
        : ''
}

${
    options.length
        ? argsAndOptsTemplate(
              'Options',
              options.map((opt) => ({
                  ...opt,
                  opt: opt.flags,
              }))
          )
        : ''
}`;

const actionsCommands = program.commands.find(
    (cmd) => cmd.name() === 'actions'
)?.commands;

const md = `
# Orbits CLI

${program.description()}.

## Commands

${actionsCommands!
    .map((cmd) =>
        cmdTemplate(
            cmd.name(),
            cmd.description(),
            cmd.usage(),
            cmd.options,
            cmd.registeredArguments
        )
    )
    .join('\n---\n')}
`;

let outputPath = './orbits-cli-commands.md';
if (process.argv.length > 2) outputPath = process.argv[2];

try {
    fs.writeFileSync(outputPath, md);
} catch (err) {
    console.error(`Couldn't generate documentation: ${(err as Error).message}`);
    process.exit(1);
}
