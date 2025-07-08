import { readEnv } from "read-env";
import { RuntimeDb } from "./db-connection.js";
import { utils } from "@orbi-ts/services";
import * as winston from 'winston';


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
    logging?:{
        level?: string;
    };
    entrypoint?: string;
}

const defaultConfig: RuntimeConfig = {
    name: "orbits-runtime",
    autostart: true,
    db: {
        mongo: {
            url: "mongodb://localhost:27017/orbits",
            opts: {
                tls: true
            },
        },
    },
    workers: {
        quantity: 3,
    },
    logging: {
        level: "info",
    },
}

export function getEnv(): RuntimeConfig{
    const result = {};
    utils.deepMerge(readEnv("ORBITS"), result);
    utils.deepMerge(defaultConfig, result);
    return result;
}