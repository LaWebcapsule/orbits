import { ActionSchemaInterface, ActionState } from "./models/action";
import { Action } from "./action-manager"
import { ActionApp } from "./app/action-app";
import { ActionError } from "./error/error";
import { errorCodes } from "./error/errorcodes";


export class ActionCron{
    maxTimeToConsumeAnAction = 10*60*1000
    actions : ActionSchemaInterface<any>[] = [];
    app = ActionApp.getActiveApp();


    constructor(){
        this.cycle();
    }

    nDatabaseEmpty = 0;
    wait(){
        return new Promise<void>((resolve)=>{
            const timingCreneau = {
                1 : 1*1000,
                2 : 5*1000,
                6 : 10*1000,
                12 : 30*1000,
                24 : 60*1000
            }
            const timingSteps = Object.keys(timingCreneau)
                    .map(k=>Number(k))
                    .sort((a,b)=>a-b);
            const waitingStep = timingSteps.find(step=>{
                return step <= this.nDatabaseEmpty
            }) as number;
            const waitingTime = timingCreneau[waitingStep];
            if(waitingStep === -1){
                resolve()
            }
            else{
                setTimeout(()=>{
                    resolve()
                }, waitingTime)
            }
        })
    }

    cycle(){
        //cycle infini
        return this.oneActionCycle().then(()=>{
            return this.wait();
        }).then(()=>{
            return this.cycle()
        })
    }


    oneActionCycle(){
        return this.getAction().then(action=>{
            if(action){
                this.nDatabaseEmpty = 0;
                return this.consumeAction(action as unknown as ActionSchemaInterface);
            }
            else{
                this.nDatabaseEmpty ++;
                return;
            }
        })
    }
    
    getAction(){
        return this.app.ActionModel.findOne({
            state : {$lte : ActionState.CLOSED},
            $or : [{
                'cronActivity.pending' : false,
                'cronActivity.nextActivity' : {
                    $lt : new Date()
                }    
            }, { //blocked lock
                'cronActivity.pending' : true,
                'cronActivity.lastActivity': {
                    $lt : new Date(Date.now() - 10*60*1000) 
                }
            }]
        }).sort('cronActivity.lastActivity').then((action)=>{
            return action
        })
    }

    consumeAction(actionDb : ActionSchemaInterface<any>){
        //ce n'est pas tres grave si deux consumers tourne en parallele de temps en temps
        //par contre, on veut eviter que cela se produise trop souvent
        //d'ou le pseudo verrou : pendingCronActivity
        const action = Action.constructFromDb(actionDb);
        //Pour eviter d'ecraser des donnees (notamment bag), on passe directement via un update
        const previousNextActivity = action.cronActivity.nextActivity;
        const currentDate = new Date()
        return this.app.ActionModel.updateOne({_id : action.dbDoc._id}, {$set : {
            'cronActivity.pending' : true,
            'cronActivity.lastActivity': currentDate
        }}).then(()=>{
            return action.resyncWithDb();
        }).then(()=>{
            if(action.cronActivity.lastActivity?.getTime() !== currentDate.getTime()){
                //another cron took the action
                //we throw an error that we catch latter
                throw new ActionError('lock already taken', errorCodes.RESSOURCE_LOCKED);
            }
            action.internalLog("cron début d'activité")
            return action.resume();
        })
        .then(()=>{
            action.internalLog("cron fin d'activité")
            if(action.dbDoc.$isDeleted()){
                return Promise.resolve();
            }
            if(action.cronActivity.nextActivity.getTime() === previousNextActivity.getTime()){
                //si nextActivity est modifie a l'interieur du resume
                //on n'ecrase pas la modification
                action.dbDoc.updateNextActivity();
            }
            return this.app.ActionModel.updateOne({_id : action.dbDoc._id}, {$set : {
                'cronActivity.pending' : false,
                'cronActivity.nextActivity': action.cronActivity.nextActivity
            }}) as any;
        })
        .catch((err)=>{
            if(err instanceof ActionError && err.code === errorCodes.RESSOURCE_LOCKED){
                return;
            }
            else{
                throw err;
            }
        })
    }

    resyncWithDb(action){
        return this.app.ActionModel.findById(action.dbDoc._id.toString()).then((actionDb)=>{
            if(actionDb){
                return Action.constructFromDb(actionDb as any);
            }
            return;
        })
    }

}