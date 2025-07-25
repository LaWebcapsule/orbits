import { orbitsAsyncStorage } from '@orbi-ts/services';
import * as winston from 'winston';
import type { ActionRuntime } from './action-runtime.js';
import { getEnv } from './get-env.js';

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

export function setLogger(app: ActionRuntime) {
    app.logger.format = winston.format.combine(
        addLogZoneInfo(),
        app.logger.format
    );
}
