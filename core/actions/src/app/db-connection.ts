import mongoose from 'mongoose';
import { actionSchema, ActionSchemaInterface } from '../models/action.js';
import type { ActionApp } from './action-app.js';
import { resourceSchema, ResourceSchemaInterface } from '../models/resource.js';

/**
 * Describes the structure of the `app.db` object.
 * For now, only mongo is supported.
 * Either `url` or `conn` should be present.
 */
export interface AppDb {
    mongo?: {
        url?: string;
        opts?: mongoose.ConnectOptions;
        conn?: mongoose.Connection;
    };
    noDatabase?: boolean;
}

export function setDbConnection(app: ActionApp) {
    if (app.db.noDatabase) {
        app.logger.warn(
            'noDatabase option: this can cause problem if you retrieve or save new actions'
        );
        return;
    }
    if (app.db.mongo.conn) {
        app.ActionModel = app.db.mongo.conn.model<ActionSchemaInterface>(
            'Action',
            actionSchema
        );
        app.ResourceModel = app.db.mongo.conn.model<ResourceSchemaInterface>(
            'Resource',
            resourceSchema
        );
        return;
    }
    return mongoose
        .createConnection(app.db.mongo.url!, app.db.mongo.opts)
        .asPromise()
        .then((conn) => {
            app.db.mongo.conn = conn;
            app.ActionModel = conn.model<ActionSchemaInterface>(
                'Action',
                actionSchema
            );
            app.ResourceModel = conn.model<ResourceSchemaInterface>(
                'Resource',
                resourceSchema
            );
        });
}
