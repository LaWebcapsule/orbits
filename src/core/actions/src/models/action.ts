import mongoose from "mongoose";
import { errorCodes } from "./../error/errorcodes";
import { ActionError } from "./../error/error";

export enum ActionState{
    UNKNOW = -1,
    SLEEPING,
    EXECUTING_MAIN,
    IN_PROGRESS,
    PAUSED,
    SUCCESS, 
    ERROR,
    CLOSED,//nothing more can happen, except a rollback
    REVERTING,
    REVERTED
}


export interface ActionSchemaInterface<TArgument = any, TBag = any, TResult = any> extends mongoose.Document{
    state : ActionState,
    stateUpdatedAt : Date,
    argument : TArgument,
    bag : TBag,
    result : TResult,
    actionRef : string,
    filter : Object,
    transactionId? : string,
    transactionStep? : number,
    nTimes : number,
    locked : Boolean,
    lockedAt : Date,
    repeat : {
        [ActionState.ERROR]? : number,
        [ActionState.SUCCESS]? : number
    },
    nExecutions : {
        [ActionState.ERROR] : number,
        [ActionState.SUCCESS] : number
    }
    delay : number,
    delays : {
        [ActionState.EXECUTING_MAIN] : number,
        [ActionState.IN_PROGRESS] : number
    }
    cronActivity : {
        pending : Boolean,
        lastActivity : Date,
        nextActivity : Date,
        frequence : number
    },
    updatedAt : Date,
    createdAt : Date,
    updateNextActivity : ()=>void
    optimisticLock : ()=>Promise<void>
    lockAndSave : ()=>Promise<void>
}


export const actionSchema = new mongoose.Schema({
    state : Number,
    stateUpdatedAt : Date,
    argument : {type : mongoose.Schema.Types.Mixed, default : {}},
    bag : {type : mongoose.Schema.Types.Mixed, default : {}},
    result : {type : mongoose.Schema.Types.Mixed, default : {}},
    filter : {type : mongoose.Schema.Types.Mixed, default : {}},
    actionRef : String,
    transactionId : String,
    transactionStep : Number,
    nTimes : {type : Number, default : 0},
    delays : {
        [ActionState.EXECUTING_MAIN] : Number,
        [ActionState.IN_PROGRESS] : Number
    },
    locked : Boolean,
    lockedAt : Date,
    cronActivity : {
        frequence : Number,
        pending : {type : Boolean, default : false},
        lastActivity : Date,
        nextActivity : Date
    },
    repeat : {
        [ActionState.ERROR] : {type : Number, default : 0},
        [ActionState.SUCCESS] : {type : Number, default : 0}
    },
    nExecutions : {
        [ActionState.ERROR] : {type : Number, default : 0},
        [ActionState.SUCCESS] : {type : Number, default : 0}
    }
}, {
    timestamps: true,
    minimize : false
})

actionSchema.pre('save', function(this :any, next){
    if(this.isModified('state') || this.isNew){
        this.stateUpdatedAt = new Date();
    }
    if(this.isModified('locked') || this.isNew){
        this.lockedAt = new Date();
    }
    this.markModified('bag');//on resauvegarde a chaque fois les mixin pour eviter d'avoir a appeler markModified.
    this.markModified('argument');
    this.markModified('result');
    this.markModified('filter');
    
    if(this.isNew){//first launch
        this.cronActivity.nextActivity = new Date();
    }
    next();
})

actionSchema.method('updateNextActivity', function(this : ActionSchemaInterface<any>){
    const delay = this.delays[this.state] || Infinity;
    const interval = Math.min(this.cronActivity.frequence, delay)
    this.cronActivity.nextActivity = new Date(Date.now()+interval);
    this.markModified("cronActivity")
})

actionSchema.method('optimisticLock', function(this : ActionSchemaInterface<any>){
    this.increment();//on increment : equivalent d'un verrou optimiste
})

actionSchema.method('lockAndSave', function(this : ActionSchemaInterface<any>){
    this.optimisticLock();
    return this.save().catch((err)=>{
        if(err instanceof mongoose.Error.VersionError){
            throw new ActionError("Verrou déjà pris", errorCodes.RESSOURCE_LOCKED)
        }
        else{
            throw err;
        }
    })
})

//DEPRECATED:
/* actionSchema.method('takeControl', function(this : ActionSchemaInterface<any>){
    if(this.localLock){
        return Promise.resolve();
    }
    else{
        return this.removeLostControl().then(()=>{
            if(!this.locked){
                this.localLock = true;
                this.locked = true;
                this.increment();//on increment : equivalent d'un verrou optimiste
                return this.save().catch((err)=>{
                    this.localLock = false;
                    if(err instanceof mongoose.Error.VersionError){
                        throw new ApiError("Verrou déjà pris", errorCodes.RESSOURCE_LOCKED)
                    }
                    else{
                        throw err;
                    }
                })
            }
            return Promise.reject(new ApiError("Verrou déjà pris", errorCodes.RESSOURCE_LOCKED))
        })
    }
})

actionSchema.method('releaseControl', function(this : any){
    if(this.locked){
        this.locked = false;
        return this.save().then(()=>{
            this.localLock = false;
        })
    }
})

actionSchema.method('removeLostControl', function(this : ActionSchemaInterface<any>){
    if(this.locked && this.lockedAt <= new Date(Date.now()-10*60*1000)){
        return this.releaseControl();
    } 
    return Promise.resolve();
})
 */