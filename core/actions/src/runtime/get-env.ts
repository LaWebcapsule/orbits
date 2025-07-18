import { utils } from '@orbi-ts/services';
import { readEnv } from 'read-env';
import { RuntimeDb } from './db-connection.js';

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
            url: "mongodb://localhost:27017/orbits",
        },
    },
    workers: {
        quantity: 3,
    },
    logging: {
        level: 'debug',
    },
};

export function getEnv(): RuntimeConfig {
    const result = {};
    utils.deepMerge(readEnv('ORBITS'), result);
    utils.deepMerge(defaultConfig, result);
    return result;
}
