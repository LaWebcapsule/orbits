import { Cli } from "@wbce/services";
import { Action, ActionApp, ActionState, Executor, Workflow } from "../index";

export class TestActionWithWatcherEnding extends Action{

    main(){
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

    watcher(){
        return Promise.resolve(ActionState.SUCCESS);
    }
}



export class TestActionWithError extends Action{
    //cette fonction ajoute 9 à un nombre en 30 secondes
    IBag : {
        x : number
    }

    IArgument: {
        y : number;
    }

    init(){
        return new Promise<void>((resolve)=>{
            setTimeout(()=>{
                resolve();
            }, 1000)
        })
    }

    main(){
        return Promise.resolve(ActionState.ERROR);
        
    }

    watcher(){
        return Promise.resolve(ActionState.UNKNOW)
    }
} 



export class TestAction extends Action{
    //cette fonction ajoute 9 à un nombre en 30 secondes
    IBag : {
        x : number
    }

    IArgument: {
        y : number;
    }

    init(){
        return new Promise<void>((resolve)=>{
            setTimeout(()=>{
                resolve();
            }, 1000)
        })
    }

    main(){
        return new Promise<ActionState>((resolve)=>{
            setTimeout(()=>{
                this.bag.x = this.argument.y + 9;
                resolve(ActionState.SUCCESS)
            }, 1000)
        })
        
    }

    watcher(){
        return Promise.resolve(ActionState.UNKNOW)
    }

}

export class BasicWorkflow extends Workflow{
    IBag : {
      n : number
    } & Workflow["IBag"]
  
    constructor() {
      super();
      this.next(() => {
        const a = new TestAction();
        return [a];
      })
      .next(()=>{
        const a = new TestActionWithWatcherEnding();
        const b = new TestActionWithError();
        return [a, b];
      })
      .next(()=>{
        return Action.resolve("ok");
      })
      .catch(()=>{
        const a = new TestAction();
        return [a];
      })
      .next(() => {
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
      })
  /*     .checkPoint("end")
      .next(() => {
  
      })
      .onSuccessGoTo("end"); */
    }
}
  
  
export let x=0;
export class TestActionWithRollBack extends Action{


    main(){
        x+=20
        return Promise.resolve(ActionState.SUCCESS);
    }

    rollBack(){
        x-=20;
        return Promise.resolve(ActionState.SUCCESS)
    }


}
  
  
export class TestRollBack extends Workflow{
    constructor(){
        super();
        this.next(()=>{
            x ++;
        })
        .rollback(()=>{
            x --;
        })
        .next(()=>{
            x++
            return Action.reject(3);
        })
        .rollback(()=>{
            x--
        })
        .next(()=>{
            x+=2
        })
        .rollback(()=>{
            x-=2
        })
        .catch(()=>{
            x +=2
        })
        .rollback(()=>{
            x -= 2;
        })
        .next(()=>{
            if(x<10){
                return new TestRollBack();
            } 
        })
        .next(()=>{
            return new TestActionWithRollBack();
        })
    }
}


export class TestExecutor extends Executor{

    resume(action){
        return action._resume();
    }
}


export class TestExecutorAction extends Action{

    cli = new Cli()

    defineExecutor(): Promise<undefined> | undefined {
        //this.executor = new TestExecutor();
        return;
    }

    main(){
        return this.cli.command('node', ['-v']).then(()=>{
            return ActionState.SUCCESS
        }, ()=>{
            return ActionState.ERROR
        })
    }
    
}

export class TestActionInWorkflow extends Workflow{

    static permanentRef: string | string[] = ['xx', 'xxx'];

    define(): Promise<void> | void {
        this.next(()=>{
            return Action.resolve();
        })
        .name("actionInWorkflow")
        .next(()=>{
            const inWorkflowAction = this.inWorkflowStepAction('inWorkflowSuccess', ()=>{
                return Promise.resolve();
            })
            const inWorkflowError = this.inWorkflowStepAction('inWorkflowError', ()=>{
                return Promise.reject()
            })
            return [inWorkflowAction, inWorkflowError]
        })
        .name("catch")
        .catch(()=>{
            const inWorkflowAction = this.inWorkflowStepAction('inWorkflowSuccess2', ()=>{
                return Promise.resolve();
            })
            return [new TestAction(), inWorkflowAction] 
        })

    }
}



export class WorkflowApp extends ActionApp{
    declare = [TestRollBack, TestActionWithRollBack, BasicWorkflow, TestExecutorAction, TestActionInWorkflow, Workflow]
}