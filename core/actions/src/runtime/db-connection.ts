import mongoose from 'mongoose';
import { actionSchema, ActionSchemaInterface } from '../models/action.js';
import { logSchema, LogSchemaInterface } from '../models/log.js';
import { agentSchema, AgentSchemaInterface } from '../models/agent.js';
import type { ActionRuntime } from './action-runtime.js';

/**
 * Describes the structure of the `app.db` object.
 * For now, only mongo is supported.
 * Either `url` or `conn` should be present.
 */
export interface RuntimeDb {
    mongo?: {
        url?: string;
        opts?: mongoose.ConnectOptions;
        conn?: mongoose.Connection;
    };
    noDatabase?: boolean;
}

export function setDbConnection(runtime: ActionRuntime) {
    if (runtime.db.noDatabase) {
        runtime.logger.warn(
            'noDatabase option: this can cause problem if you retrieve or save new actions'
        );
        return;
    }
    if (runtime.db.mongo.conn) {
        runtime.ActionModel =
            runtime.db.mongo.conn.model<ActionSchemaInterface>(
                'Action',
                actionSchema
            );
        runtime.AgentModel = runtime.db.mongo.conn.model<
            AgentSchemaInterface<any, any>
        >('Agent', agentSchema);
        runtime.LogModel = runtime.db.mongo.conn.model<LogSchemaInterface>(
            'Log',
            logSchema
        );
        return;
    }
    const conn = mongoose.createConnection(
        runtime.db.mongo.url!,
        runtime.db.mongo.opts
    );
    runtime.db.mongo.conn = conn;
    runtime.ActionModel = conn.model<ActionSchemaInterface>(
        'Action',
        actionSchema
    );
    runtime.AgentModel = conn.model<AgentSchemaInterface<any, any>>(
        'Agent',
        agentSchema
    );
    runtime.LogModel = conn.model<LogSchemaInterface>('Log', logSchema);
    return conn;
}
