import colors from 'colors';

import { ResourceSchemaInterface } from '@orbi-ts/core';

import { CRUD } from '../crud.js';
import {
    exitCodes,
    logErrorAndExit,
    setUpRuntime,
    table,
    timeDiff,
} from './utils.js';

import { isValidObjectId } from 'mongoose';
import { parseArgs } from './command-utils.js';

const processResourcesGetCmd = async (
    resourceIdOrIdentity: string,
    opts: any
) => {
    await setUpRuntime();

    if (resourceIdOrIdentity)
        opts.filter = isValidObjectId(resourceIdOrIdentity)
            ? { _id: resourceIdOrIdentity }
            : { identity: resourceIdOrIdentity };

    let resources: ResourceSchemaInterface<any, any>[] = [];
    try {
        resources = await CRUD.listResources(opts.filter, opts.sort);
    } catch (error) {
        logErrorAndExit(
            `Unable to get resource ${colors.bold(resourceIdOrIdentity)}:\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }

    if (opts.json) {
        process.stdout.write(JSON.stringify(resources) + '\n');
        process.exit(exitCodes.SUCCESS);
    }

    if (resources.length == 0) {
        if (resourceIdOrIdentity)
            logErrorAndExit(
                `Resource ${resourceIdOrIdentity} not found`,
                exitCodes.NOT_FOUND
            );
        process.stdout.write('No resources\n');
        process.exit(exitCodes.SUCCESS);
    }

    const columns: any = {
        id: { label: 'ID', format: colors.italic },
        identity: { label: 'IDENTITY', format: colors.italic },
        ref: { label: 'ACTION REF', format: colors.italic },
        version: { label: 'VERSION' },
        info: { label: 'INFO', transform: JSON.stringify },
        output: { label: 'OUTPUT', transform: JSON.stringify },
        createdAt: {
            label: 'CREATED',
            transform: (t: Date) => timeDiff(Date.now(), t.getTime()),
        },
        updatedAt: {
            label: 'UPDATED',
            transform: (t: Date) => timeDiff(Date.now(), t.getTime()),
        },
    };

    const resourcesData = resources.map((res) => ({
        id: res.id,
        identity: res.identity,
        ref: res.actionRef,
        version: res.version,
        info: res.info,
        output: res.output,
        createdAt: (res as any).createdAt,
        updatedAt: (res as any).updatedAt,
    }));

    process.stdout.write(
        table(columns, resourcesData, ['id', 'info', 'output'])
    );
    process.exit(exitCodes.SUCCESS);
};

export const resourcesGetCmd = {
    name: 'get',
    description: 'Get the provided action, or all resources',
    fn: processResourcesGetCmd,
    arguments: [
        {
            name: '[action_id]',
            descr: 'ID of the action to get',
        },
    ],
    options: [
        {
            short: 'f',
            full: 'filter',
            descr: `Filter values, in the format ${colors.italic('key1=val1 key2=val2')}`,
            dflt: { val: {} },
            parser: parseArgs(),
        },
        {
            short: 'o',
            full: 'sort',
            descr: `Sort values, in the format ${colors.italic('key2=-1|1 key2=-1|1')}`,
            dflt: { val: {} },
            parser: parseArgs(),
        },
        {
            short: 'j',
            full: 'json',
            descr: 'Use json format',
            dflt: { val: false },
        },
    ],
};
