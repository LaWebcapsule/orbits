import { utils } from '@orbi-ts/services';
import { exitCodes, logErrorAndExit } from './utils.js';

export type CmdOpt = {
    short: string;
    full: string;
    descr: string;
    dflt: { val: any; descr?: string };
    group?: string;
    implies?: Record<string, any>;
    choices?: string[];
    conflict?: string;
    parser?: (value: string, previous: any) => any;
    isArray?: boolean;
};

export type CmdArg = {
    name: string;
    descr: string;
    parser?: (value: string, previous: any) => any;
};

export type Cmd = {
    name: string;
    description: string;
    fn: (...args: any) => any;
    arguments: CmdArg[];
    options: CmdOpt[];
};

export const parseArgs = (
    value: string,
    previous: Record<string, string | boolean>
) => {
    if (!previous) previous = {};
    // try to parse a JSON
    try {
        const obj = JSON.parse(value);
        utils.deepMerge(obj, previous);
        return previous;
    } catch (error) {
    }
    if (value.includes('=')) {
        const [key, val] = value.split('=');
        previous[key] = val;
    } else {
        logErrorAndExit(
            `Cannot parse: "${value}"`,
            exitCodes.INVALID_PARAMETER
        );
    }
    return previous;
};
