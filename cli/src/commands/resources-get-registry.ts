import { Resource } from '@orbi-ts/core';

import { CRUD } from '../crud.js';
import { Cmd } from './command-utils.js';
import { exitCodes, setUpRuntime, table } from './utils.js';

const processResourcesGetRegistryCmd = async (
    actionsFiles: string[],
    opts: any
) => {
    await setUpRuntime({ noDatabase: true, actionsFiles });

    const resources = (await CRUD.listResourcesFromRegistry(opts.all)).map(
        (resource) => {
            const instance = new resource.ctr() as Resource;
            return {
                ...resource,
                ref: resource.ref,
                identity: instance.identity(),
                version: instance.version,
            };
        }
    );

    if (opts.json) {
        process.stdout.write(JSON.stringify(resources) + '\n');
        process.exit(exitCodes.SUCCESS);
    }

    if (resources.length == 0) {
        process.stdout.write('No resources\n');
        process.exit(exitCodes.SUCCESS);
    }

    // sort alphabetically on action ref
    resources.sort((resource1, resource2) =>
        resource1.ref.localeCompare(resource2.ref)
    );

    process.stdout.write(
        table(
            {
                ref: { label: 'REFERENCE' },
                identity: { label: 'IDENTITY' },
                version: { label: 'VERSION' },
            },
            resources.map((resource) => {
                const instance = new resource.ctr() as Resource;
                return {
                    ref: resource.ref,
                    identity: instance.identity(),
                    version: instance.version,
                };
            })
        )
    );

    process.exit(exitCodes.SUCCESS);
};

export const resourcesGetRegistryCmd: Cmd = {
    name: 'get-registry',
    description: 'Get available resources from the registry',
    fn: processResourcesGetRegistryCmd,
    arguments: [
        {
            name: '[resources_files...]',
            descr: 'Path to files describing resources',
        },
    ],
    options: [
        {
            short: 'a',
            full: 'all',
            descr: 'Get all resources including base ones',
            dflt: { val: false, descr: 'Do not display base resources' },
        },
        {
            short: 'j',
            full: 'json',
            descr: 'Use json format',
            dflt: { val: false },
        },
    ],
};
