import mongoose from 'mongoose';
import { errorCodes } from '../error/errorcodes.js';
import { ActionError } from '../error/error.js';

export enum ActionState {
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

export interface ActionSchemaInterface<
    TArgument = any,
    TBag = any,
    TResult = any,
> extends mongoose.Document {
    state: ActionState;
    stateUpdatedAt: Date;
    argument: TArgument;
    bag: TBag;
    result: TResult;
    actionRef: string;
    identity : string;
    filter: Object;
    workflowId?: string;
    workflowStep?: number;
    workflowStack: {
        ref: string;
        stepIndex: number;
        stepName: string;
        _id: string;
    }[];
    generatorCount : number,
    nTimes: number;
    locked: Boolean;
    lockedAt: Date;
    repeat: {
        [ActionState.ERROR]?: number;
        [ActionState.SUCCESS]?: number;
    };
    nExecutions: {
        [ActionState.ERROR]: number;
        [ActionState.SUCCESS]: number;
    };
    delay: number;
    delays: {
        [ActionState.EXECUTING_MAIN]: number;
        [ActionState.IN_PROGRESS]: number;
    };
    cronActivity: {
        pending: Boolean;
        lastActivity: Date;
        nextActivity: Date;
        /**
         * @deprecated use frequency
         */
        frequence?: number;
        frequency: number;
    };
    updatedAt: Date;
    createdAt: Date;
    definitionFrom?: {
        workflow: {
            _id: string;
            ref: string;
            stepName: string;
            stepIndex: number;
            marker: string;
        };
    };
    updateNextActivity: () => void;
    optimisticLock: () => Promise<void>;
    lockAndSave: () => Promise<void>;
}

export const actionSchema = new mongoose.Schema(
    {
        state: Number,
        stateUpdatedAt: Date,
        identity : String,//used by generator
        argument: { type: mongoose.Schema.Types.Mixed, default: {} },
        bag: { type: mongoose.Schema.Types.Mixed, default: {} },
        result: { type: mongoose.Schema.Types.Mixed, default: {} },
        filter: { type: mongoose.Schema.Types.Mixed, default: {} },
        actionRef: String,
        workflowId: String,
        workflowStep: Number,
        generatorCount : Number,
        workflowStack: [
            {
                ref: String,
                stepIndex: Number,
                stepName: String,
                _id: String,
            },
        ],
        nTimes: { type: Number, default: 0 },
        delays: {
            [ActionState.EXECUTING_MAIN]: Number,
            [ActionState.IN_PROGRESS]: Number,
        },
        locked: Boolean,
        lockedAt: Date,
        cronActivity: {
            frequence: Number,
            frequency: Number,
            pending: { type: Boolean, default: false },
            lastActivity: Date,
            nextActivity: Date,
        },
        repeat: {
            [ActionState.ERROR]: { type: Number, default: 0 },
            [ActionState.SUCCESS]: { type: Number, default: 0 },
        },
        nExecutions: {
            [ActionState.ERROR]: { type: Number, default: 0 },
            [ActionState.SUCCESS]: { type: Number, default: 0 },
        },
        definitionFrom: {
            workflow: {
                _id: String,
                ref: String,
                stepName: String,
                stepIndex: Number,
                marker: String,
            },
        },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

actionSchema.index(
    { identity: 1, generatorCount : 1 },
    {
      unique: true,
      partialFilterExpression: {
        identity: { $exists: true, $ne: null },
        generatorCount: { $exists: true, $ne: null }
      }
    }
);

actionSchema.pre('save', function (this: any, next) {
    if (this.isModified('state') || this.isNew) {
        this.stateUpdatedAt = new Date();
    }
    if (this.isModified('locked') || this.isNew) {
        this.lockedAt = new Date();
    }
    // we save mixins every time to avoid having to call markModified
    this.markModified('bag');
    this.markModified('argument');
    this.markModified('result');
    this.markModified('filter');

    if (this.isNew) {
        // first launch
        this.cronActivity.nextActivity = new Date();
    }
    next();
});

actionSchema.method(
    'updateNextActivity',
    function (this: ActionSchemaInterface<any>) {
        const delay = this.delays[this.state] || Infinity;
        const interval = Math.min(
            this.cronActivity.frequence || this.cronActivity.frequency,
            delay
        );
        this.cronActivity.nextActivity = new Date(Date.now() + interval);
        this.markModified('cronActivity');
    }
);

actionSchema.method(
    'optimisticLock',
    function (this: ActionSchemaInterface<any>) {
        // equivalent of an optimistic lock
        this.increment();
    }
);

actionSchema.method('lockAndSave', function (this: ActionSchemaInterface<any>) {
    this.optimisticLock();
    return this.save().catch((err) => {
        if (err instanceof mongoose.Error.VersionError) {
            throw new ActionError(
                'Lock already acquired',
                errorCodes.RESOURCE_LOCKED
            );
        } else {
            throw err;
        }
    });
});
