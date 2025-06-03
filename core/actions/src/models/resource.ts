import mongoose from 'mongoose';
import { errorCodes } from '../error/errorcodes.js';
import { ActionError } from '../error/error.js';

export enum ResourceState {
    /**
     * @deprecated use UNKNOWN
     */
    UNKNOW = -1,
    UNKNOWN = -1,
    SLEEPING,
    EXECUTING_MAIN,
    IN_PROGRESS,
    PAUSED,
    SUCCESS,
    ERROR,
    CLOSED, // nothing more can happen except a rollback
    REVERTING,
    REVERTED,
}

export interface ResourceSchemaInterface<
> extends mongoose.Document {
    identity : string,
    actionRef: string,
    version : string,
    locks: [{
        name: String
    }]
    output : any,
    cycle: {
        frequency: number
    }
    info: any,
}

export const resourceSchema = new mongoose.Schema(
    {
        identity: {type : String},
        actionRef: String,
        locks: [{
            name: String
        }],
        version : String,
        cycle: {
            frequency: Number
        },
        output : { type: mongoose.Schema.Types.Mixed, default: {} },
        info : { type: mongoose.Schema.Types.Mixed, default: {} },

    },
    {
        timestamps: true,
        minimize: false,
    }
);


resourceSchema.index(
    { identity: 1, actionRef: 1},
    {
      unique: true,
      partialFilterExpression: {
        identity: { $exists: true },
        generatorCount: { $exists: true }
      }
    }
);