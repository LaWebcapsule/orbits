import { exitCodes, logErrorAndExit } from './utils.js';

export type CmdOpt = {
    short: string;
    full: string;
    descr: string;
    dflt: { val: any; descr?: string };
    group?: string;
    implies?: Record<string, any>;
    choices?: string[]
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

export const parseArgs =
    (withBoolean: boolean = false) =>
    (value: string, previous: Record<string, string | boolean>) => {
        if (!previous) previous = {};
        if (value.includes('=')) {
            const [key, val] = value.split('=');
            previous[key] = val;
        } else if (withBoolean) {
            previous[value] = true; // boolean flag
        } else {
            logErrorAndExit(
                `Cannot parse: "${value}"`,
                exitCodes.INVALID_PARAMETER
            );
        }
        return previous;
    };
