import mongoose from 'mongoose';

const TIME_1_DAY = 1 * 24 * 60 * 60 * 1000,
    TIME_7_DAY = 1 * 24 * 60 * 60 * 1000;

// compensate for the absence of typing from mongoose
export interface LogSchemaInterface extends mongoose.Document {
    actionId: string;
    actionRef: string;
    err: any;
    filter: any;
    level: string;
    message: any;
    scriptId: number;
    timestamp: Date;
    expiresAt: Date;
    anchor: string;
    toClientString(): string;
}

export const logSchema = new mongoose.Schema({
    actionId: { type: String, index: true },
    actionRef: String,
    err: mongoose.Schema.Types.Mixed,
    filter: mongoose.Schema.Types.Mixed,
    level: String,
    message: mongoose.Schema.Types.Mixed,
    scriptId: Number,
    anchor: String, // serve for search purpose, in order to target very specific logs
    expiresAt: {
        type: Date,
        default() {
            const duration = this.level === 'info' ? TIME_1_DAY : TIME_7_DAY;
            return new Date(Date.now() + duration);
        },
        expires: 1,
    },
    timestamp: {
        type: Date,
        index: true,
    },
});

logSchema.index({
    actionId: 1,
    anchor: 1,
});

logSchema.index({
    actionId: 1,
    scriptId: 1,
});

logSchema.method('toClientString', function (this: LogSchemaInterface) {
    const obj = this.toObject();
    obj.expiresAt = undefined;
    obj._id = undefined;
    return JSON.stringify(obj);
});
