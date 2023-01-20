import { Action, ActionState } from '@wbce/orbits-core'

export class WaitAction extends Action {
    static permanentName: 'wait-action';


    IArgument: {
        waitTime: number
    }

    IBag: {
        initTime: number
    }

    init(){
        this.bag.initTime = new Date().getTime();
        console.log("Wait action initialized with: "+ this.bag.initTime);
        this.defaultDelay = this.argument.waitTime ? this.argument.waitTime / 1000 : 1;
        return Promise.resolve();
    }

    main() {
        var currentTime = new Date().getTime();
        if (this.argument.waitTime > 0) {
            if(currentTime - this.argument.waitTime > this.bag.initTime){
                console.log("Wait action over");
                return ActionState.SUCCESS;
            }
        }else{
            console.log("Using default wait time: 1000ms");
            if(currentTime - 1000 > this.bag.initTime){
                console.log("Wait action over");
                return ActionState.SUCCESS;
            }
        }
        return ActionState.IN_PROGRESS;
    }

}

