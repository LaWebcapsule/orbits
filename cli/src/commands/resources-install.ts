import colors from 'colors';
import { CRUD } from '../crud.js';
import { Cmd } from './command-utils.js';
import { exitCodes, logErrorAndExit, setUpRuntime } from './utils.js';
import { watchAction, watchCmd } from './watch.js';

const processResourcesInstallCmd = async (
    resourceRefOrIdentity: string,
    opts: any
) => {
    await setUpRuntime({
        workersCount: 1,
        noDatabase: true,
        actionsFiles: [opts.resourcesFile],
    });

    try {
        const action = await CRUD.installResource(resourceRefOrIdentity);

        const actionId = action._id.toString();

        if (!opts.watch) {
            process.stdout.write(
                `Resource install started with ID ${colors.bold.italic(actionId)}\n`
            );
            process.exit(exitCodes.SUCCESS);
        }

        watchAction(
            actionId,
            opts.depth,
            true,
            parseFloat(opts.interval ?? 1),
            opts.simpleViewer
        );
    } catch (error) {
        logErrorAndExit(
            `Error installing ${colors.italic.bold(resourceRefOrIdentity)}:\n${error}`,
            exitCodes.INVALID_PARAMETER
        );
    }
};

export const resourcesInstallCmd: Cmd = {
    name: 'install',
    description: 'Install given resource',
    fn: processResourcesInstallCmd,
    arguments: [
        {
            name: 'resource_ref_or_identity',
            descr: 'Ref or identity of the resource to install',
        },
    ],
    options: [
        {
            short: 'f',
            full: 'resources-file',
            descr:
                'File describing the resources. ' +
                `Use ${colors.italic.bold('orbi.ts')} if not provided`,
            dflt: { val: 'orbi.ts' },
        },
        {
            short: 'w',
            full: 'no-watch',
            descr: 'Do not watch progress',
            dflt: { val: true },
        },
        ...watchCmd.options.map((opt) => ({ ...opt, group: 'Watch options:' })),
    ],
};
