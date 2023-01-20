import { Action, ActionState } from '@wbce/orbits-core'

export class WaitAction extends Action {
    static permanentName: 'wait-action';


    IArgument: {
        waitTime: number
    }

    IBag: {
        initTime: number
    }

    main() {
        this.bag.initTime = new Date().getTime();
        console.log("Wait action initialized with: " + this.bag.initTime);
        // modify the default delay to have the watcher called again in due time
        this.defaultDelay = this.argument.waitTime ? this.argument.waitTime / 1000 : 1;
        return ActionState.IN_PROGRESS;
    }

    watcher() {
        var waitTime = this.argument.waitTime ? this.argument.waitTime : 1000;
        var currentTime = new Date().getTime();
        var diff = currentTime - this.bag.initTime - waitTime;
        if (diff > 0) {
            console.log("Wait action over");
            return Promise.resolve(ActionState.SUCCESS);
        }
        console.log("Wait action still waiting: "+diff);
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

}

