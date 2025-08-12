import colors from 'colors';
import { findUpSync } from 'find-up-simple';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';

import { ActionRuntime, DEFAULT_MONGO_URL } from '@orbi-ts/core';
import { utils } from '@orbi-ts/services';

import { CRUD, InvalidParameterError, NotFoundError } from '../crud.js';
import { ACTION_STATE_FORMAT } from '../viewer/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export enum exitCodes {
    SUCCESS,
    GENERIC_ERROR,
    INVALID_PATH,
    INVALID_PARAMETER,
    NOT_FOUND,
    DATABASE_ERROR,
    ORBITS_JOB_ERROR,
}

export const ACTION_STATE_NAMES = new Map(
    Array.from(
        ACTION_STATE_FORMAT,
        ([state, { full }]) => [state, full] as const
    )
);

export const ACTION_STATE_COLORS = new Map(
    Array.from(
        ACTION_STATE_FORMAT,
        ([, { full, color }]) => [full, color] as const
    )
);

export const DEFAULT_LOG_FILE = 'orbits.log';
export const DEFAULT_ACTIONS_FILE = 'orbi.ts';
export const DEFAULT_DATABASE = DEFAULT_MONGO_URL;

export const logError = (str: string) => {
    console.error(colors.red(`ERROR: ${str}`));
};

export const logErrorAndExit = (msg: string, code: exitCodes): never => {
    logError(msg);
    process.exit(code ?? exitCodes.GENERIC_ERROR);
};

export const setUpRuntime = async (opts?: {
    noDatabase?: boolean;
    actionsFiles?: string[];
    workersCount?: number;
    filter?: any;
    logger?: winston.Logger;
}) => {
    if (!opts?.noDatabase) {
        if (!process.env['ORBITS_DB__MONGO__URL'])
            console.warn(
                `WARN - Env variable ${colors.bold.italic('ORBITS_DB__MONGO__URL')} not set, using default value ${colors.italic(DEFAULT_DATABASE)}`
            );
    }

    // redeclare the active runtime
    ActionRuntime.activeRuntime = undefined as unknown as ActionRuntime;
    new ActionRuntime({
        db: {
            mongo: {
                url: process.env['ORBITS_DB__MONGO__URL'] ?? DEFAULT_DATABASE,
            },
        },
        workers: {
            quantity: opts?.workersCount ?? 0,
            filter: opts?.filter,
        },
        logger: opts?.logger,
    });

    await ActionRuntime.waitForActiveRuntime;

    const defaultActionsFile =
        findUpSync(DEFAULT_ACTIONS_FILE) ??
        path.join(
            __dirname,
            '../../',
            DEFAULT_ACTIONS_FILE.replace('.ts', '.js')
        );
    const actionsFiles = opts?.actionsFiles?.length
        ? opts?.actionsFiles
        : [defaultActionsFile];

    const importActionsFilesPromises = actionsFiles.map(async (file) => {
        const actionPath = !path.isAbsolute(file)
            ? path.join(process.cwd(), file)
            : file;
        try {
            fs.accessSync(actionPath);
        } catch {
            logErrorAndExit(
                `Cannot access ${colors.bold.italic(actionPath)}`,
                exitCodes.INVALID_PATH
            );
        }
        try {
            await ActionRuntime.activeRuntime.recursiveImport(actionPath);
        } catch (error) {
            logErrorAndExit(
                `Error importing ${colors.bold.italic(actionPath)}: ${error}`,
                exitCodes.GENERIC_ERROR
            );
        }
    });

    await Promise.all(importActionsFilesPromises);

    // use our active runtime for all active runtimes
    for (const r of (global as any).orbitsRuntimes as ActionRuntime[])
        (r.constructor as any).activeRuntime = ActionRuntime.activeRuntime;
};

/**
 * Return diff as a string between two times in milliseconds
 *
 * @param t1
 * @param t2
 */
export const timeDiff = (t1: number, t2: number): string => {
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;

    const diff = t2 - t1;
    let absDiff = Math.abs(diff);
    const diffDays = Math.floor(absDiff / day);
    absDiff -= diffDays * day;

    const diffHours = Math.floor(absDiff / hour);
    absDiff -= diffHours * hour;

    const diffMinutes = Math.floor(absDiff / minute);
    absDiff -= diffMinutes * minute;

    const diffSeconds = Math.floor(absDiff / second);

    const timeStr =
        [
            diffDays ? `${diffDays}d` : '',
            diffHours ? `${diffHours}h` : '',
            diffMinutes ? `${diffMinutes}min` : '',
            diffSeconds ? `${diffSeconds}s` : '',
        ]
            .filter(Boolean)
            .join(' ') || '0s';

    return diff > 0 ? `in ${timeStr}` : `${timeStr} ago`;
};

export const colorState = (state: string): string | void => {
    return (
        colors[
            ACTION_STATE_COLORS.get(state.trim()) as keyof typeof colors
        ] as Function
    )(state);
};

const TABLE_COLUMN_SPACE = ' ┆ ';

export const table = (
    columnsDefs: {
        [key: string]: {
            label: string;
            transform?: (s: any) => string;
            format?: (s: string) => string;
        };
    },
    data: { [key: string]: any }[],
    columnsToTruncate?: string[]
): string => {
    const columns: {
        [key: string]: {
            label: string;
            width: number;
            transform?: (s: any) => string;
            format?: (s: string) => string;
        };
    } = {};

    utils.deepCopy(columnsDefs, columns);

    // initialize width to be length of labels
    for (const [key, { label }] of Object.entries(columns)) {
        columns[key].width = label.length;
    }

    const transformedData: { [key: string]: string }[] = [];
    for (const line of data) {
        const transformedLine: any = {};
        Object.entries(line).forEach(([key, value]) => {
            if (!columns[key]) return;
            let transformedValue = '—';
            if (value !== undefined && value !== null)
                transformedValue = columns[key].transform
                    ? columns[key].transform(value)
                    : (value.toString() ?? ('—' as string));

            if (transformedValue.length > columns[key].width)
                columns[key].width = transformedValue.length;

            transformedLine[key] = transformedValue;
        });
        transformedData.push(transformedLine);
    }

    // Truncate columns so it can accommodate the width of the terminal
    // account for spacing between each columns
    if (columnsToTruncate?.length && process.stdout.isTTY) {
        const totalWidthBeforeTruncating =
            Object.values(columns).reduce(
                (total, { width }) => total + width!,
                0
            ) +
            TABLE_COLUMN_SPACE.length * (Object.keys(columns).length - 1);
        if (totalWidthBeforeTruncating > process.stdout.columns) {
            let totalWidthAfterTruncating = totalWidthBeforeTruncating;
            // sort columns form widest to thinnest and truncate max of each
            columnsToTruncate.sort(
                (col1, col2) => columns[col2].width - columns[col1].width
            );
            for (const columnName of columnsToTruncate) {
                if (totalWidthAfterTruncating <= process.stdout.columns) break;
                const prevWidth = columns[columnName].width;
                const minWidth = columns[columnName].label.length;
                let truncateAmount =
                    totalWidthAfterTruncating - process.stdout.columns;
                let truncatedWidth = Math.max(
                    minWidth,
                    prevWidth - truncateAmount
                );
                totalWidthAfterTruncating += -prevWidth + truncatedWidth;
                columns[columnName].width = truncatedWidth;
            }
        }
    }

    let header = Object.values(columns)
        .map(({ label, width }) => label.padEnd(width))
        .join(TABLE_COLUMN_SPACE);

    header += '\n' + '┈'.repeat(header.length) + '\n';

    let output = '\n' + colors.gray(header);

    for (const line of transformedData) {
        output +=
            Object.entries(line)
                .map(([key, value]) => {
                    // truncate if too long for the column width
                    // or pad if too short
                    value =
                        value.length > columns[key].width!
                            ? value.slice(0, columns[key].width! - 1) + '…'
                            : value.padEnd(columns[key].width!);
                    return columns[key].format
                        ? columns[key].format(value)
                        : value;
                })
                .join(TABLE_COLUMN_SPACE) + '\n';
    }

    return output;
};

const exitCodeFromError = (err: Error): exitCodes => {
    if (err instanceof NotFoundError) return exitCodes.NOT_FOUND;

    if (err instanceof InvalidParameterError)
        return exitCodes.INVALID_PARAMETER;

    return exitCodes.GENERIC_ERROR;
};

export const runCrudCmd = async (
    actionId: string | null,
    cmd: keyof typeof CRUD,
    opts: {
        runtimeOpts?: {
            noDatabase?: boolean;
            actionsFiles?: string[];
            workersCount?: number;
            filter?: any;
            logger?: winston.Logger;
        };
        processResult?: (...args: any) => Promise<void> | void;
        noExit?: boolean;
        errMessage?: string;
    },
    ...args: any
) => {
    await setUpRuntime(opts.runtimeOpts ?? {});
    try {
        const fn = (CRUD[cmd] as (...args: any[]) => Promise<any>).bind(CRUD);
        const result = await (actionId ? fn(actionId, ...args) : fn(...args));
        if (opts.processResult) await opts.processResult(result);
        if (!opts.noExit) process.exit(exitCodes.SUCCESS);
    } catch (error) {
        const err = error as Error;
        logErrorAndExit(
            `${opts.errMessage ?? `Unable to ${cmd} action ${colors.bold(actionId!)}`}: ${colors.italic(err.message)}`,
            exitCodeFromError(err)
        );
    }
};
