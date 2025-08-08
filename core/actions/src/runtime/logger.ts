import { orbitsAsyncStorage } from '@orbi-ts/services';
import * as winston from 'winston';
import Transport from 'winston-transport';

import { ActionRuntime } from './action-runtime.js';
import { getEnv } from './get-env.js';

export enum loggerAnchors {
    MAIN_LINE_SIGNAL = 'main',
    WATCHER_LINE_SIGNAL = 'watcher',
}

const expendError = (obj: any, opts = { depth: 0 }) => {
    if (obj instanceof Error) {
        return {
            ...obj,
            code: (obj as any).code,
            message: obj.message,
            stack: obj.stack,
        };
    } else if (obj instanceof Object && opts.depth < 5) {
        const result: any = {};
        for (const x in obj) {
            result[x] = expendError(obj[x], {
                ...opts,
                depth: opts.depth + 1,
            });
        }
        return result;
    }
    return obj;
};

const filterError = winston.format((info: any) => {
    const result = expendError(info);
    return result;
});

const addLogZoneInfo = winston.format((info: any) => {
    const otherInfo = orbitsAsyncStorage.getStore()?.logInfo;
    return {
        ...otherInfo,
        ...info,
    };
});

const filterPertinentInfo = winston.format((info: any) => {
    if (info?.level === 'debug') {
        if (info?.message === 'state changed : SLEEPING --> EXECUTING_MAIN') {
            return {
                ...info,
                anchor: loggerAnchors.MAIN_LINE_SIGNAL,
            };
        }
        if (info?.message === 'watcher') {
            return {
                ...info,
                anchor: loggerAnchors.WATCHER_LINE_SIGNAL,
            };
        }
        if (info?.message?.includes?.('CRON ')) {
            return false;
        }
        if (info?.message?.includes?.('setExecutor')) {
            return false;
        }
    }
    return info;
});

class MongoTransporter extends Transport {
    public log(info: any, next: () => void) {
        const log = new ActionRuntime.activeRuntime.LogModel({
            ...info,
            filter: ActionRuntime.activeRuntime.actionFilter,
        });
        return log.save().finally(next);
    }
}

const env = getEnv();

export const defaultLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                addLogZoneInfo(),
                filterError(),
                winston.format.json()
            ),
            level: env.logging?.level,
        }),
    ],
});

export const databaseLogger = winston.createLogger({
    transports: [
        new MongoTransporter({
            format: winston.format.combine(
                addLogZoneInfo(),
                filterError(),
                filterPertinentInfo(),
                winston.format.json()
            ),
            level: env.logging?.level,
        }),
    ],
});

export function setLogger(app: ActionRuntime) {
    app.logger.format = winston.format.combine(
        addLogZoneInfo(),
        app.logger.format
    );
}
