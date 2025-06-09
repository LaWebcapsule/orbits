import { readEnv } from "read-env";
import { RuntimeDb } from "./db-connection.js";


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
    }
}

export function getEnv(): RuntimeConfig{
    return {...defaultConfig, ...readEnv("ORBITS")};
}