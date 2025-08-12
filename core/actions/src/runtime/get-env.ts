import { utils } from '@orbi-ts/services';
import { readEnv } from 'read-env';
import { RuntimeDb } from './db-connection.js';

export const DEFAULT_MONGO_URL = 'mongodb://localhost:27017/orbits';
export const DEFAULT_LOGGING_LEVEL = 'info';
export const DEFAULT_WORKERS_QUANTITY = 3;

/**
 * Describes how the runtime can be configured.
 */
export interface RuntimeConfig {
    /** db configuration */
    name?: string;
    autostart?: boolean;
    db?: RuntimeDb;
    /** log driver configuration */
    workers?: {
        quantity: number;
        filter?: Object;
    };
    logging?: {
        level?: string;
    };
    entrypoint?: string;
}

const defaultConfig: RuntimeConfig = {
    name: 'orbits-runtime',
    autostart: true,
    db: {
        mongo: {
            url: DEFAULT_MONGO_URL,
        },
    },
    workers: {
        quantity: DEFAULT_WORKERS_QUANTITY,
    },
    logging: {
        level: DEFAULT_LOGGING_LEVEL,
    },
};

export function getEnv(): RuntimeConfig {
    const result = {};
    utils.deepMerge(readEnv('ORBITS'), result);
    utils.deepMerge(defaultConfig, result);
    return result;
}
