import { Cli } from '@orbi-ts/services';
import {
    Action,
    ActionRuntime,
    ActionState,
    Executor,
    Workflow,
    CoalescingWorkflow,
    Sleep,
    Resource
} from '../index.js';

export class TestActionWithWatcherEnding extends Action {

    declare IResult: number;

    main() {
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

    watcher() {
        return Promise.resolve(ActionState.SUCCESS);
    }
}

export class TestActionWithTimeTemporization extends Action{

    static cronDefaultSettings = {
        activityFrequency: 3 * 1000,
    };

    main() {
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

    watcher() {
        if(this.dbDoc.createdAt.getTime() < Date.now()- 10*1000){
            return Promise.resolve(ActionState.SUCCESS)
        }
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

}

export class TestActionWithError extends Action {
     
    declare IBag: {
        x: number;
    };

    declare IArgument: {
        y: number;
    };

    init() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    main() {
        this.result = "xyz";
        return Promise.resolve(ActionState.ERROR);
    }

    watcher() {
        return Promise.resolve(ActionState.UNKNOWN);
    }
}

export class TestActionMainTimeout extends Action {
    static defaultDelays = {
        [ActionState.EXECUTING_MAIN]: 10,
        [ActionState.IN_PROGRESS]: 1000,
    };

    main() {
        return undefined as any;
    }

    onMainTimeout() {
        return ActionState.SUCCESS;
    }
}

export class TestAction extends Action {
    declare IBag: {
        x: number;
    };

    declare IArgument: {
        y: number;
    };

    declare IResult: number;

    init() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    main() {
        return new Promise<ActionState>((resolve) => {
            setTimeout(() => {
                this.bag.x = this.argument.y + 9;
                resolve(ActionState.SUCCESS);
            }, 1000);
        });
    }

    watcher() {
        return Promise.resolve(ActionState.UNKNOWN);
    }
}

export class BasicWorkflow extends Workflow {
    declare IBag: {
        n: number;
    } & Workflow['IBag'];

    async define(){
        try{
            await this.do("t1", new TestAction());
            await this.do("t2", new TestActionWithError());
        }
        catch(err){
            await this.do("t3", new TestActionWithTimeTemporization());
            await this.do("t4", new TestActionWithWatcherEnding());
            await this.do("t5", new TestAction());
        }
        return 10;
    }

}

export class WithActionErrorBasicWorkflow extends Workflow{

    async define(){
            await this.do("t1", new TestAction());
            await this.do("t2", new TestActionWithError());
            await this.do("t3", new TestAction());
            return {};
    }
}

export class ThrowErrorBasicWorkflow extends Workflow{

    async define(){
            const result = await this.do("t1", new TestAction());
            await this.do("t3", new TestAction());
            throw new Error("xyz");
    }
}

export class ThrowErrorComplexWorkflow extends Workflow{

    async define(){
        await this.do("basicError", new ThrowErrorBasicWorkflow());
    }
}

export class WorkflowWithDynamicDefinition extends Workflow{

    declare IBag : Workflow['IBag'] & {
        x : number
    }

    declare IResult: number;

    async init(){
        if(!this.bag.x){
            this.bag.x = 0
        }
        return;
    }

    async define(){
        await this.do("t1", ()=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    this.bag.x = 2;
                    resolve(2)
                }, 1000)
            })
        })


        await this.do("t2", {
            dynamicAction: ()=>{
                const action = new TestAction();
                action['main'] = ()=>{
                    this.bag.x++
                    return this.save().then(()=>ActionState.IN_PROGRESS)
                }
                action['watcher'] = function(this: Action){
                    if(this.dbDoc.createdAt.getTime() < (Date.now()-5*1000)){
                        return Promise.resolve(ActionState.SUCCESS)
                    }
                    return Promise.resolve(ActionState.IN_PROGRESS)
                }
                action.cronActivity.frequency = 2*1000;
                return action;
        }})

        await this.do("t3", {
            main : ()=>{
                this.bag.x++
                return this.save().then(()=>ActionState.SUCCESS)
            }
        })

        return this.bag.x;
    }
}

export class WorkflowWithRepeat extends Workflow{

    async define(){
        let i = 0;
        await this.repeatDo("repeatSucces", ()=>{
            i++
            return Promise.resolve()
        },{
            [ActionState.SUCCESS]: 2,
            elapsedTime: 10 
        })

        try{
            await this.repeatDo("repeatOnFailure", ()=>{
                i++
                return Promise.reject()
            }, {
                [ActionState.ERROR]: 2,
                elapsedTime: 10
            })
        }
        catch(err){

        }
        return i;
    }
}



export class TestExecutor extends Executor {
    resume(action) {
        return action._resume();
    }
}

export class TestExecutorAction extends Action {
    cli = new Cli();

    setExecutor(): Promise<undefined> | undefined {
        return;
    }

    main() {
        return this.cli.command('node', ['-v']).then(
            () => ActionState.SUCCESS,
            () => ActionState.ERROR
        );
    }
}

export class SleepGenerator extends CoalescingWorkflow{

    identity() {
        return "sleep"
    }

    async define(){
        await this.do("sleep", new Sleep().setArgument({time : 10*1000}));
        return {}
    }
}

let x = 0;
export class TestGenerator extends CoalescingWorkflow{

    declare IArgument: { commandName: string; name : string };

    identity() {
        return this.argument.name
    }

    async define(){
        const result = await this.once("once", ()=>{
            return Promise.resolve(3)
        })

        await this.do("sleep", new Sleep().setArgument({time: 2*1000}));
        
        await this.do("sleepWithAGenerator", new SleepGenerator())
        
        if(result as number > 0){
            await this.do("increment", ()=>{
                x++;
                return Promise.resolve()
            })
        }

        
        return x;
    }
}

export class BlankResource extends Resource{

    declare IArgument: { commandName: string; version?: string};

    async init(){
        if(this.argument.version){
            this.version = this.argument.version;
        }
        return super.init();
    }

    identity(){
        return "blank"
    }

    version = "1.0.0"

    incrementCommandCount(commandName:string){
        const n = this.resourceDbDoc.info[`n${commandName}`] || 0
        this.resourceDbDoc.info[`n${commandName}`] = n+1
        this.resourceDbDoc.markModified("info");
    }

    async defineInstall() {
        await this.do("install", ()=>{
            this.incrementCommandCount("install");
            return this.resourceDbDoc.save();
        })
    }

    async defineUpdate(){
        await this.do("update", ()=>{
            this.incrementCommandCount("update")
            return this.resourceDbDoc.save();
        })
    }

    async defineUninstall() {
        await this.do("uninstall", ()=>{
            this.incrementCommandCount("uninstall")
            return this.resourceDbDoc.save();
        })

    }

    async setOutput(): Promise<any> {
        return {
            "xyz":"abc"
        }
    }
}