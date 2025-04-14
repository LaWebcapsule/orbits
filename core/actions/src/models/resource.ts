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
    version : string,
    output : any,
}

export const resourceSchema = new mongoose.Schema(
    {
        identity: {type : String, unique : true},
        version : String,
        output : { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

export const ResourceModel = mongoose.model<ResourceSchemaInterface>(
	'Resource',
	resourceSchema
);