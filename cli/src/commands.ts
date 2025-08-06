import colors from 'colors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DEFAULT_ACTIONS_FILE = 'orbi.ts';

export const DEFAULT_DATABASE = 'mongodb://localhost:27017/orbits';

export const logError = (str: string) => {
    console.error(colors.red(`ERROR: ${str}`));
};

const processResumeCmd = async (actionId: string, opts: any) => {
    // runOnActionDb(actionId, opts.database, async (action: Action['dbDoc']) => {
    //     action!.cronActivity.nextActivity = new Date();
    //     await action!.save();
    //     process.exit(exitCodes.SUCCESS);
    // });
};

const processReplayCmd = async (actionId: string, opts: any) => {};

export { processReplayCmd, processResumeCmd };
