import { Action, ActionApp, ActionSchemaInterface, ActionState, Workflow } from "./../index.js";
import { ResourceSchemaInterface } from "./models/resource.js";

export abstract class Generator extends Workflow{

    IArgument: {
        commandName : string
    }

    IResult: {};

    identity():any{
        return;
    }

    private identityString: string
    stringifyIdentity(){
        if(!this.identityString){
            const identity = this.identity();
            if(typeof identity === "string"){
                this.identityString = identity;
            }
            else{
                this.identityString = JSON.stringify(this.identity());
            }
        }
        return this.identityString;
    }

    substitute(otherPendingActionsWithSameIdentity : this["dbDoc"][]): this["dbDoc"]|undefined{
        return otherPendingActionsWithSameIdentity?.[0];
    }

    async save(params = {nCall : 0, isNew: this.dbDoc.isNew}){
        if(params.isNew || !this.dbDoc.identity){
            const pendingActionsWithSameIdentity = await ActionApp.activeApp.ActionModel.find({
                actionRef: this.dbDoc.actionRef,
                identity: this.stringifyIdentity(),
                "state": {
                        $lt : ActionState.SUCCESS
                }
            }).sort("createdAt")
            if(pendingActionsWithSameIdentity.length){
                this.dbDoc = this.substitute(pendingActionsWithSameIdentity)
            }
            if(!this.dbDoc){
                this.dbDoc.identity = this.stringifyIdentity();
                const actionsWithSameIdentity = await ActionApp.activeApp.ActionModel.find({
                    actionRef: this.dbDoc.actionRef,
                    identity: this.dbDoc.identity
                }).sort({"generatorCount": -1})
                this.dbDoc.generatorCount = (actionsWithSameIdentity?.[0]?.generatorCount || 0) + 1;
            }
        }
        return super.save().catch((err)=>{
            if (err.code === 11000 && err.message.includes('duplicate key error') && params.nCall < 1) {
                //we retry only once;
                params.nCall ++;
                return this.save(params);
            }
            throw err;
        });
    }


    mapRefWithStrategy = new Map<string, 'default'|'cross-workflow'>()
    async findIfEquivalentActionAlreadyExists(ref : string, action: Action){
        const strategy = this.mapRefWithStrategy.get(ref);
        let actionDb : ActionSchemaInterface;
        if(strategy === 'cross-workflow'){
            const actions = await ActionApp.activeApp.ActionModel.find({
                "workflowRef": ref,
                "workflowIdentity": this.stringifyIdentity() 
            }).sort("createdAt");
            for(const action of actions){
                if(!this.registeredActionIds.includes(action.id)){
                    actionDb = action;
                    break;
                }
            }
        }
        return actionDb || await super.findIfEquivalentActionAlreadyExists(ref, action)
    }

    async once(ref: string, opts : | Promise<any> |{
        init? : Action['init'],
        main: Action['main'],
        watcher? : Action['watcher']
    } | Action | {
        dynamicAction : (Action | (()=>Action))
    } | (() => Promise<any>) ){
        this.mapRefWithStrategy.set(ref, 'cross-workflow');
        return super.do(ref, opts);
    }


    async lastOutput(){
        const oldActions = await ActionApp.activeApp.ActionModel.find({
            identity: this.stringifyIdentity(),
            actionRef: this.dbDoc.actionRef,
        }).sort({"createdAt": -1})
        return oldActions[0]?.result        
    }

}


export abstract class Digestor extends Generator{


    async define(){
        await this.once("installController", async ()=>{
            return new Action()
        })
        const changes = await this.do("digest", ()=>{
            return this.digest();
        })
        for(const c of changes){
            await this[`define${c}`];
        }

        return {};
    }

    digest(): Promise<string[]>{
        return Promise.resolve([])
    }


}

export class Sleep extends Action{

    IArgument: {
        time : number
    }

    static cronDefaultSettings =  { activityFrequency: 60*1000 };

    main(){
        this.dbDoc.delays = {
            [ActionState.EXECUTING_MAIN] : this.argument.time,
            [ActionState.IN_PROGRESS]: 2*this.argument.time
        }
        this.dbDoc.cronActivity.nextActivity = new Date(Date.now()+this.argument.time);
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

    onMainTimeout(): ActionState | Promise<ActionState> {
        return this.watcher();
    }

    async watcher(){
        const elapsedTime = Date.now() - this.dbDoc.createdAt.getTime()
        if(elapsedTime > this.argument.time ){
            return ActionState.SUCCESS
        }
        return ActionState.IN_PROGRESS
    }
}

export class ResourceController<T extends Resource> extends Workflow{

    IArgument: T['IArgument'] & {
        actionRef: string
    }


    constructor(resource? : T){
        super()
        if(resource){
            this.setArgument({
                ...resource.argument,
                actionRef: resource.dbDoc.actionRef
            })
        }
    }

    async define(){
        while(true){
            try{
                await this.do('sleep', new Sleep().setArgument({
                    time : 10*60*1000
                }))
                await this.do("digest", async ()=>{
                    const ActionCtr = ActionApp.activeApp.getActionFromRegistry(this.argument.actionRef);
                    const resource = new ActionCtr() as T;
                    resource.setArgument({
                        ...this.argument,
                        actionRef: undefined
                    });
                    resource.setCommand('cycle');
                    return resource;
                })
            }
            catch(err){
                //do nothing
            }
        }  
        return {};  
    }
}

export class ScopeOfChanges<T>{

    constructor(public commandName: T, public opts?: any){

    }
}

export class Resource extends Generator{

    IArgument: { commandName: string; };


    async init(){
        await this.getResourceDoc();
        await super.init();
    }

    resourceDbDoc: ResourceSchemaInterface;
    async getResourceDoc(){
        if (this.resourceDbDoc) {
			return Promise.resolve(this.resourceDbDoc);
		}

		let identity = this.stringifyIdentity();
        
        this.resourceDbDoc = await this.app.ResourceModel.findOne({
            identity,
            actionRef: this.app.getActionRefFromRegistry(
                this.constructor as any
            )
        })
        return this.resourceDbDoc;
    }

    createResourceDoc(){
        this.resourceDbDoc = new this.app.ResourceModel({
            identity : this.stringifyIdentity(),
            actionRef: [this.app.getActionRefFromRegistry(
                this.constructor as any
            )]
        })
        return this.resourceDbDoc.save()
    }

    async saveResourceOutput(output: any){
        this.resourceDbDoc.output = output;
        await this.resourceDbDoc.save();
    }

    async getResourceOutput(){
       const resourceDbDoc = await this.getResourceDoc();
       return resourceDbDoc.output;
    }

    setCommand(commandName : 'cycle'|'install'|'update'|'uninstall'){
        return this.setArgument({
            ...this.argument,
            commandName
        })
    }

    defineInstall(){

    }

    version : string;

    async define(){
        switch (this.argument.commandName) {
            case 'cycle':                
                break;

            case 'install':
                return this.defineInstall();

            case 'update':
                return this.defineUpdate();
            
            case 'uninstall':
                return this.defineUninstall();
        
            default:
                await this.once("createResourceDoc", ()=>{
                    return this.createResourceDoc();
                })
                await this.once("installController", ()=>{
                    const controller = new ResourceController(this)
                    return controller.save();
                });
                const changes = await this.do("digest", ()=>{
                    return this.digest();
                });
                for(const c of changes){
                    const clone = this.clone();
                    clone.setCommand(c.commandName)
                    await this.do(c.commandName, clone);
                }
                await this.do("saveVersion", ()=>{
                    this.resourceDbDoc.version = this.version;
                    return this.resourceDbDoc.save();
                })
                await this.do("endDigestor", ()=>{
                    return this.endDigestor();
                });
                return this.resourceDbDoc.output;
                break;
        }        
    }

    async digest(): Promise<ScopeOfChanges<string>[]>{
        const changes = [];
        if(this.resourceDbDoc.version !== this.version){
            changes.push(new ScopeOfChanges('install'));
        }
        if(this.resourceDbDoc.version){
            //meaning a deploy already occurs
            changes.push(new ScopeOfChanges('update'));
        }
        return changes;
    }

    defineUpdate(){
        
    }

    defineUninstall(){

    }

    async setOutput(): Promise<any>{
        return;
    }

    async endDigestor(){
       const output = await this.setOutput();
       await this.saveResourceOutput(output)
    }

    substitute(otherPendingActionsWithSameIdentity: ActionSchemaInterface[]): ActionSchemaInterface | undefined {
        return otherPendingActionsWithSameIdentity.filter((a)=>a.argument.commandName === this.argument.commandName)?.[0]
    }

    resyncWithDb(){
        this.resourceDbDoc = undefined;
        return this.getResourceDoc().then(()=>{
            return super.resyncWithDb()
        })
    }

}

/**
 * 
 * 
 * 
 * first case : do is not re-executed
 * 
 * define(){
 *  await this.do("a", new Action())
 * 
 * }
 * 
 * How do I do to update ?
 * 
 * So, do is always reexecuted but : 
 * 
 * await this.do("a", new Action())--> is recreated
 * 
 * await this.do("b", new Resource()) --> is not recreated, I get last install workflow
 * 
 * exact syntax for this should be : 
 * 
 * await this.do("b", resource.send('install', new ExecutionToken())); --> then you configure the execution token
 * 
 * consequence in the resource : 
 * 
 * export class Resource{
 *  identity(){}
 * 
 *  send('install', )
 *  send(){
 * 
 *  }
 * 
 *  proxyInstall(){
 *      const actionList = 
 * 
 *  }
 * 
 *  install(){
 *  }
 * 
 * }
 * 
 * export class Resource{
 * 
 * 
 *  define(){
 *      await this.do("...", install());
 *      await this.do("...", install());
 *      await this.do("...", new MergeStagingToProd());
 *      await this.deploy();
 *      await this.do("...", installRefresh())
 * 
 *  }
 * 
 *  deploy(){
 *      await this.build()
 *  }
 * 
 * }
 * 
 * 
 * export class Resource{
 * 
 *  install(){
 *      await this.do("...", install()); 
 *      await this.do("...", new MergeStagingToProd);
 *      await this.cron("...");
 *  }
 * 
 * 
 * }
 * 
 * How do I do install vs update ?
 * 
 * Si je lance install : 
 * --> installe tout si pas déjà installé
 * Si je relance installe : 
 * --> installe tout si pas déjà installé mais ne check pas les dernières versions
 * Si je lance deploy : 
 * --> n'installe pas et prend pour acquis l'installation
 * Si je lance update : 
 * --> installe et déploye
 * Si je lance update In depth : 
 * 
 * 
 * export class Resource{
 * 
 *      install(){
 *          await SocleGenerator.beInstalled(this);
 *          const kc = new Keycloak();
 *          if(await this.do("kc", kc.isInstalled(this))){
 *              await this.do("")
 *          }  
 *      }
 * 
 *      update(){
 *      }
 * 
 *         
 * }
 * 
 * How do I launch a service and make to have available commands depending on the state ?
 * 
 * export class DirectusApp{
 * 
 * 
 *  install(){
 * 
 *  }
 * 
 *  save(){
 * 
 *  }
 * 
 *  onCommit(){
 * 
 *  }
 * 
 *  update(){
 *      
 *  }
 * 
 * 
 * }
 * 
 * How do I write a deployment ?
 * 
 * export class DeployWorkflow{
 * 
 * 
 *  map(){
 *      this.dict.map()
 *  }
 * 
 *  define(){
 *      try{
 *          await this.send(new Token({}));
 *      }
 *      catch(err){
 * 
 *      }
 *  }
 * 
 * }
 * 
 * 
 * 
 * export class Deploy extends DeployWorkflow{
 * 
 *      map(){
 *          this.map(new ExecutionToken(), "define")
 *      }
 *      
 *      defineDeploy(){
 * 
 *      }
 * 
 * }
 * 
 * 
 * 
 * export class XanoDeployWorkflow extends DeployWorkflow{
 * 
 *      defineDeploy(){
 *  
 *          
 *      }
 * 
 * }
 * 
 * export class XanoGenerator extends Cdk8sGenerator{
 * 
 *       identity(){
 *       }
 * 
 *       hasChanged(){
 * 
 *      }
 * 
 *      define(){
 *      }
 * 
 * }
 * 
 * export class XanoFirstDeploy extends InitTechnoWorkflow{
 * 
 *      define(){
 *          
 * 
 *      }
 * 
 * 
 * }
 * 
 * 
 * 
 */