import { Action, actionKind } from '@orbi-ts/core';

import { Cmd } from './command-utils.js';
import { exitCodes, runCrudCmd, table } from './utils.js';

const formatActionKind = (kind: actionKind): string => {
    const str = kind.split('orbits/')[1];
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const processGetRegistryCmd = async (actionsFiles: string[], opts: any) => {
    runCrudCmd(
        null,
        'listFromRegistry',
        {
            runtimeOpts: { noDatabase: true, actionsFiles },
            processResult: (
                actions: {
                    ref: string;
                    kind: actionKind;
                    ctr: typeof Action;
                }[]
            ) => {
                if (opts.json) {
                    process.stdout.write(JSON.stringify(actions) + '\n');
                    process.exit(exitCodes.SUCCESS);
                }

                if (actions.length == 0) {
                    process.stdout.write('No actions\n');
                    process.exit(exitCodes.SUCCESS);
                }

                // sort alphabetically on action ref
                actions.sort((action1, action2) =>
                    action1.ref.localeCompare(action2.ref)
                );

                process.stdout.write(
                    table(
                        {
                            ref: { label: 'ACTION REF' },
                            kind: {
                                label: 'ACTION KIND',
                                transform: formatActionKind,
                            },
                        },
                        actions
                    )
                );
            },
        },
        undefined,
        opts.all
    );
};

export const getRegistryCmd: Cmd = {
    name: 'get-registry',
    description: 'Get available actions from the registry',
    fn: processGetRegistryCmd,
    arguments: [
        {
            name: '[actions_files...]',
            descr: 'Path to files describing actions',
        },
    ],
    options: [
        {
            short: 'a',
            full: 'all',
            descr: 'Get all actions including base ones',
            dflt: { val: false, descr: 'Do not display base actions' },
        },
        {
            short: 'j',
            full: 'json',
            descr: 'Use json format',
            dflt: { val: false },
        },
    ],
};
