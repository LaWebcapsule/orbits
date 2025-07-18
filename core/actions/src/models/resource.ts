import mongoose from 'mongoose';

export enum ResourceState {
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

export interface ResourceSchemaInterface<IOutput, Iinfo>
    extends mongoose.Document {
    identity: string;
    actionRef: string;
    version: string;
    locks: [
        {
            name: String;
        },
    ];
    output: IOutput;
    cycle: {
        frequency: number;
    };
    info: Iinfo;
}

export const resourceSchema = new mongoose.Schema(
    {
        identity: { type: String },
        actionRef: String,
        locks: [
            {
                name: String,
            },
        ],
        version: String,
        cycle: {
            frequency: {
                type: Number,
                default: 60 * 60 * 1000,
            },
        },
        output: { type: mongoose.Schema.Types.Mixed, default: {} },
        info: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

resourceSchema.index(
    { identity: 1, actionRef: 1 },
    {
        unique: true,
        partialFilterExpression: {
            identity: { $exists: true },
            actionRef: { $exists: true },
        },
    }
);
