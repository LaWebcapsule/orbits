import { Cli } from '@wbce/services';
import {
    Action,
    ActionApp,
    ActionState,
    Executor,
    Workflow,
} from '../index.js';
import { Generator } from '../src/generator-manager.js';

export class TestActionWithWatcherEnding extends Action {

    IResult: number;

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
    IBag: {
        x: number;
    };

    IArgument: {
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
    IBag: {
        x: number;
    };

    IArgument: {
        y: number;
    };

    IResult: number;

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
    IBag: {
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
            return {};
    }
}

export class WorkflowWithDynamicDefinition extends Workflow{

    IBag : Workflow['IBag'] & {
        x : number
    }

    IResult: number;

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



export class TestExecutor extends Executor {
    resume(action) {
        return action._resume();
    }
}

export class TestExecutorAction extends Action {
    cli = new Cli();

    defineExecutor(): Promise<undefined> | undefined {
        return;
    }

    main() {
        return this.cli.command('node', ['-v']).then(
            () => ActionState.SUCCESS,
            () => ActionState.ERROR
        );
    }
}

let x = 0;
export class TestGenerator extends Generator{

    IArgument: { commandName: string; name : string };

    identity() {
        return this.argument
    }

    async define(){
        const result = await this.once("once", ()=>{
            return Promise.resolve(3)
        })
        
        if(result as number > 0){
            await this.do("increment", ()=>{
                x++;
                return Promise.resolve()
            })
        }

        
        return x;
    }
}



export class WorkflowApp extends ActionApp {
    declare = [
        BasicWorkflow,
        WithActionErrorBasicWorkflow,
        ThrowErrorBasicWorkflow,
        TestExecutorAction,
        TestActionMainTimeout,
        TestActionWithTimeTemporization,
        WorkflowWithDynamicDefinition,
        Workflow,
    ];
}
