import { Action, ActionState } from '@wbce/orbits-core'

export class WaitAction extends Action {
    static permanentName: 'wait-action'

    IArgument: {
        waitTime: number
    }

    IBag: {
        initTime: number
    }

    init(){
        this.bag.initTime = new Date().getUTCDate();
        console.log("Wait action initialized with: "+ this.bag.initTime);
        return Promise.resolve();
    }

    main() {
        var currentTime = new Date().getUTCDate();
        if (this.argument.waitTime > 0) {
            if(currentTime - this.argument.waitTime > this.bag.initTime){
                return ActionState.SUCCESS;
            }
        }else{
            console.log("Using default wait time: 1000ms");
            if(currentTime - 1000 > this.bag.initTime){
                return ActionState.SUCCESS;
            }
        }
        return ActionState.IN_PROGRESS;
    }

}

