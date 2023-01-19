import mongoose from "mongoose";
import { ActionError } from "./error/error";
import { o } from "@wbce/services";
import { ActionState, ActionSchemaInterface } from './models/action';
import {Action} from './../index'



export interface Step{
    [ActionState.SUCCESS]? : boolean;
    [ActionState.ERROR]? : boolean;
    cb? : (...args : any[])=> void | Action | Action[] | Promise<void | Action | Action[]>;
    name? : string;
    opts? : {
        retry : number
    };
    rollback? : Step['cb']
}


export class Workflow extends Action{

    override defaultDelay = Infinity;//une workflow n'est jamais considéré en erreur, meme au bout de x temps:
    //en effet, les actions sous-jacentes sont mieux aptes à témoigner de l'erreur ou non

    dBSession? : mongoose.ClientSession;

    docsToSaveAtStepStart : mongoose.Document[] = [];

    steps : Step[] = [];

    override IBag : {
        actions : {
            [key : string] : {
                state : ActionState,
                result : any
            }
        },
        currentStepIndex? : number,
        nTimesCurrentStep : number,
        stepsHistory : number[],
        oldResult : any,
        isRollBackPossible : boolean 
    }

    constructor(){
        super();
    }


    next(cb : Step['cb'], opts? : Step['opts']){
        this.steps.push({ 
            [ActionState.SUCCESS] : true,
            cb,
            opts
        })
        return this;
    }

    catch(cb : Step['cb'], opts? : Step['opts']){
        this.steps.push({
            [ActionState.ERROR] : true,
            cb,
            opts
        });
        return this;
    }

    finally(cb : Step['cb'], opts? : Step['opts']){
        //finally en promise :
        //ex : then(throw err).finally(...).finally(...).cactch(//on passe ici !)
        //mais aussi then(throw err).finally(throw err2).finally(...).catch(//on reçoit err2)
        //soit donc, finally ne change pas l'etat de la promise
        //si succes, renvoie le premier resultat
        //si erreur, renvoie la dernière erreur
        //pour imiter le comportement et plutot que typer les steps, on ajoute trois étapes
        //--> stocke les arguments --> execute le finally --> depile les anciens arguments
        
        const transfertArgumentActions = (...args : any[])=>{
            const actions : any[] = [];
            for(const result of args){
                actions.push(Action.resolve(result))
            }
            return actions;
        }


        this.steps.push({
            [ActionState.SUCCESS] : true,
            [ActionState.ERROR] : true,
            cb : (...args : any[])=>{
                this.bag.oldResult = args;
                return transfertArgumentActions(...args)
            },
            opts
        })
        
        this.steps.push({
            [ActionState.SUCCESS] : true,
            [ActionState.ERROR] : true,
            cb,
            opts
        });

        this.steps.push({
            [ActionState.SUCCESS] : true,
            cb : (...args : any[])=>{
                return transfertArgumentActions(...this.bag.oldResult)
            },
            opts
        })
        return this;
    }

    rollback(cb : Step['cb'], opts? : Step['opts']){
        const lastStep = this.steps[this.steps.length-1];
        if(!lastStep || !lastStep.cb){
            throw new ActionError('A rollback can only follow a standard step')
        }
        lastStep.rollback = cb;
        return this;
    }

    name(name : string){
        this.steps.push({
            name
        });
        return this;
    }


    goToStep(name : string){
        const newIndex = this.steps.findIndex(s=>s.name === name);
        if(newIndex !== -1){
            this.bag.currentStepIndex = newIndex
        }
        return Action.resolve({});
    }

    goTo(name : string, onState : ActionState){
        this.steps.push({
            [onState] : true,
            cb : this.goToStep.bind(this, name)
        })
        return this;
    }

    onSuccessGoTo(name : string){
        this.goTo(name, ActionState.SUCCESS);
        return this;
    }

    onErrorGoTo(name : string){
        this.goTo(name, ActionState.ERROR)
        return this;
    }

    isActionActive(action : Action){
        return o.testPath(this.dbDoc, 'bag', 'actions', action.dbDoc._id.toString() ) ? true : false;
    }

    declareActionStart(dbDoc : ActionSchemaInterface){
        const workflowBag = this.dbDoc.bag;
        dbDoc.workflowId = this.dbDoc._id.toString();
        dbDoc.workflowStep = (workflowBag.stepsHistory.length-1);
        dbDoc.filter = {...this.dbDoc.filter, ...dbDoc.filter};
        dbDoc.markModified('filter');
        workflowBag.actions[dbDoc._id.toString()] = {
            state : dbDoc.state,
            result : dbDoc.result
        }
        this.dbDoc.markModified('bag.actions');
    }

    declareActionEnd(dbDoc : ActionSchemaInterface<any>){
        const workflowBag = this.dbDoc.bag;
        workflowBag.actions[dbDoc._id.toString()]!.state = dbDoc.state;
        workflowBag.actions[dbDoc._id.toString()]!.result = dbDoc.result;
        const action = Action.constructFromDb(dbDoc);
        if(action.isRollBackPossible){
            this.bag.isRollBackPossible = true;
        }
        this.dbDoc.markModified('bag.actions');
    }

    getNextStep(){
        let isStepSuccess = true;
        let oldStepState = ActionState.ERROR;
        let oldResults : any[] = [];
        for(let k in this.bag.actions){
            oldResults.push(this.bag.actions[k]!.result)
        } 
        if(this.bag.currentStepIndex === undefined){
            //initialisation
            this.bag.currentStepIndex = -1;
            this.bag.actions = {};
            this.bag.stepsHistory = [];
        }
        for(let key in this.bag.actions){
            isStepSuccess = isStepSuccess 
                && this.bag.actions[key]!.state === ActionState.SUCCESS
        }
        oldStepState = isStepSuccess ? ActionState.SUCCESS : ActionState.ERROR;
        
        const newIndex = this.steps.findIndex((step, i)=>{
            return i > this.bag!.currentStepIndex! && step[oldStepState];
        })
        this.bag.currentStepIndex = newIndex;
        this.bag.actions = {};
        this.dbDoc.markModified("bag");
        this.dbDoc.markModified("bag.actions");
        if(this.bag.currentStepIndex >= 0){
            this.bag.stepsHistory.push(
                newIndex//on historise en debut d'action
            )
            if(this.bag.stepsHistory.length > 200){
                this.bag.stepsHistory.shift();
            }
            return Promise.resolve(this.steps[this.bag.currentStepIndex]!['cb']!(...oldResults))
        }
        else{
            //c'est fini:
            this.result = oldResults;
            throw oldStepState;
        }
    }

    startStep(){
        return this.app.db.mongo.conn.startSession().then(mongooseSession=>{
            this.dBSession = mongooseSession;
            return this.getNextStep()
        }).then(actions=>{
            return this.dBSession!.withWorkflow(()=>{
                //attention : cette fonction est souvent retry :
                //en effet TransientErrorFrequente
                //ne rien mettre a l'interieur qui soit cumulatif
                //genre : this.x ++ ; car finirait à : +++++...
                if(!actions){
                    actions = [];
                }
                if(!Array.isArray(actions)){
                    actions = [actions];
                }
                for(let action of actions){
                    this.declareActionStart(action.dbDoc);
                }
                this.dbDoc.$session(this.dBSession);
                this.dbDoc.state = ActionState.IN_PROGRESS;
                this.dbDoc.markModified('bag');
                this.dbDoc.markModified('state');//necessaire en cas de retry
                //pq on procede en deux temps pour les sauvegardes :
                //https://stackoverflow.com/questions/64084992/mongoworkflowexception-query-failed-with-error-code-251
                //la premiere requete d'une workflow doit arriver avant les autres. Sinon pbme.
                return this.dbDoc.save().then(()=>{
                    const svgdsPromise : any[] = [];
                    for(let action of actions as Action[]){
                        action.dbDoc.isNew = true;//necessaire ?
                        //semble resoudre un bug, ou : transientError et donc retry du withWorkflow
                        //mais isNew false et donc DocumentNotFoundError
                        //a confirmer
                        action.dbDoc.$session(this.dBSession);
                        svgdsPromise.push(action.dbDoc.save())
                    }
                    for(let doc of this.docsToSaveAtStepStart){
                        doc.$session(this.dBSession);
                        svgdsPromise.push(doc.save());
                    }
                    return Promise.all(svgdsPromise)
                }).then(()=>Promise.resolve());//le then est une question de typage pour conformite mongoose
            })
        }).finally(()=>{
            this.docsToSaveAtStepStart = [];
            if(this.dBSession){
                return this.dBSession.endSession()
            }
        }).finally(()=>{
            return this.resyncWithDb();
        }).then(()=>{
            this.internalLog(`state changed`);
            this.internalLog(`step started : ${this.dbDoc.bag.currentStepIndex}`);
            //on a change directement l'etat dans la workflow
            //on peut appeler directement resume
            return this.resume();
        }) 
    }


    endStep(){
        return this.app.ActionModel.find({
            _id : {$in : Object.keys(this.bag.actions)},
            workflowId : this.dbDoc._id.toString(),
            state : {$gt : ActionState.PAUSED}
        }).then((actions)=>{
            for(let action of actions){
                this.declareActionEnd(action as any as ActionSchemaInterface);
            }
            this.internalLog('endStep')
            return ActionState.PAUSED;
        })
    }

    registerDocToSaveAtStepStart(doc : mongoose.Document){
        this.docsToSaveAtStepStart.push(doc);
    }

    override initialisation(){
        if(this.isInitialised){
            return Promise.resolve();
        }
        return super.initialisation().then(()=>{
            return this.define()
        })
    }

    define() : Promise<void> | void{
        return Promise.resolve();
    }

    override main(){
        return this.startStep().catch(err=>{
            if(!(err in ActionState)){
                //si une erreur survient lors de l'appel à l'étape
                //on reste bloque sur l'étape mais la workflow ne passe pas en erreur
                //c'est a dire que la workflow reste en meme etat : executing_main
                //on reessaiera plus tard
                this.internalLogError(err);
                throw this.dbDoc.state;//on fait donc croire que rien n'a changé
            }
            throw err;
        });
    }


    override watcher(){
        return this.app.ActionModel.find({
            workflowId : this.dbDoc._id.toString(),
            $or : [{
                state : {$lt : ActionState.SUCCESS}
            }, {
                state : ActionState.SUCCESS,
                [`repeat.${ActionState.SUCCESS}`] :  {$gt : 0 }
            }, {
                state : ActionState.ERROR,
                [`repeat.${ActionState.ERROR}`] :  {$gt : 0 }
            }]
        }).then((actions)=>{
            if(actions.length === 0){
                //deux cas : 
                //si state === executing-main ; c'est qu'il y a eu un pbme dans le main de l'etape et on doit retry l'etape
                //sinon c'est que l'etape est finie
                if(this.dbDoc.state === ActionState.EXECUTING_MAIN){
                    return ActionState.PAUSED;
                }
                return this.endStep();
            }
            else{
                if(!this.dbDoc.cronActivity.pending){
                    //pas de // dans le cron
                    //sinon declenche un watch ou un execute dans toutes les actions non finies
                    //le watch se fait en //
                    actions.map(a=>{
                        return Action.constructFromDb(a as any as ActionSchemaInterface)
                    }).map(
                        a => a.resume()
                    )
                }
                return ActionState.IN_PROGRESS;
            }
        })
    }

    override get isRollBackPossible(){
        if(this.bag.isRollBackPossible){
            return this.bag.isRollBackPossible;
        }
        else{
            for(const s of this.steps){
                if(s.rollback){
                    return true;
                }
            }
        }
        return false;
    }

    override RollBackWorkflow = RevertWorkflow;
}



export class RevertWorkflow<WorkflowToRevert extends Workflow> extends Workflow{
    override IArgument : {
       actionId : string
    }

    oldAction : WorkflowToRevert

    override init(){
     return this.app.ActionModel.findById(this.argument.actionId).then((dbDoc)=>{
        if(!this.dbDoc){
            throw ActionState.ERROR
        }
        this.oldAction = Action.constructFromDb(dbDoc as any as ActionSchemaInterface) as WorkflowToRevert;
        return this.oldAction.initialisation();
     })   
    }
    
    override define(){
        this.next(()=>{
            //mettre un verrou
            const tToRevert = this.oldAction
            tToRevert.bag.currentStepIndex = Infinity;
            tToRevert.dbDoc.bag.currentStepIndex = Infinity; //rien apres
            tToRevert.dbDoc.state = ActionState.REVERTING;
            this.registerDocToSaveAtStepStart(tToRevert.dbDoc);
            return Action.resolve({})
        }).onErrorGoTo("end");
        const stepsHistory = this.oldAction.bag.stepsHistory;
        const nSteps = stepsHistory.length;
        for(let i=0; i<nSteps; i++){
            const stepIndex = stepsHistory[nSteps-1-i]!;//on part de la fin
            const step = this.oldAction.steps[stepIndex]!;
            if(step.rollback){
                this.finally(
                    step.rollback.bind(this)
                )
            }
            this.finally(
                this.revertChildrenAction.bind(this, stepIndex)
            )
        }
        this.finally(()=>{
            const tToRevert = this.oldAction
            tToRevert.dbDoc.state = ActionState.REVERTED;
            this.registerDocToSaveAtStepStart(tToRevert.dbDoc);
        })
        this.name("end");
        return Promise.resolve();
    }

    revertChildrenAction(stepIndex){
        return this.app.ActionModel.find({
            workflowId : this.oldAction.dbDoc._id.toString(),
            workflowStep : stepIndex,
            state : {$lte : ActionState.SUCCESS}
        }).then((actions)=>{
            return actions.map(a=>Action.constructFromDb(a as any as ActionSchemaInterface))
                .filter(a=>a.isRollBackPossible)
                .map((a : Action)=>{
                    const rollBack = new a.RollBackWorkflow();
                    rollBack.setArgument({
                        actionId : a.dbDoc._id.toString()
                    })
                    return rollBack;
                })
        })
    }
}


export class RevertAction<ActionToRevert extends Action> extends Workflow{
    override IArgument : {
        actionId : string
    }

    oldAction : ActionToRevert;

    override init(){
     return this.app.ActionModel.findById(this.argument.actionId).then((dbDoc)=>{
        if(!this.dbDoc){
            throw ActionState.ERROR
        }
        this.oldAction = Action.constructFromDb(dbDoc as any as ActionSchemaInterface) as ActionToRevert;
        return this.oldAction.initialisation();
     })   
    }
    
    override define(){
        this.next(()=>{
            //on commence par attendre la fin de l'action
            //donc on attache l'ancienne action a la workflow
            const aToRevert = this.oldAction;
            if(aToRevert.dbDoc.state < ActionState.SUCCESS){
                this.declareActionStart(aToRevert.dbDoc);
                aToRevert.setRepeat({
                    [ActionState.SUCCESS] : 0,
                    [ActionState.ERROR] : 0
                })
                aToRevert.dbDoc.optimisticLock();
                this.registerDocToSaveAtStepStart(aToRevert.dbDoc);
            }
        }).next(()=>{
            //puis on rollback l'action
            const aToRevert = this.oldAction;
            const revert = new aToRevert.RollBackAction();
            revert.setArgument({
                actionId : aToRevert.dbDoc._id.toString()
            });
            const nSuccess = this.oldAction.dbDoc.nExecutions[ActionState.SUCCESS];
            revert.setRepeat({
                [ActionState.SUCCESS] : nSuccess-1//le premier est gratuit
            })
            return revert;
        })
        .next(()=>{
            //terminer proprement l'action (a reviser/clarifier)
            this.oldAction.dbDoc.cronActivity.nextActivity = new Date(Date.now()+ 10*60*1000);
            this.oldAction.dbDoc.state = ActionState.REVERTED;
            this.registerDocToSaveAtStepStart(this.oldAction.dbDoc);
        })
        return Promise.resolve();
    }

}



