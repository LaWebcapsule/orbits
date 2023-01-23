import { Action, ActionState } from '@wbce/orbits-core'

export class WaitAction extends Action {
    static permanentName: 'wait-action';


    IArgument: {
        waitTime: number
    }

    defaultWaitingTime = 1000;//one second.

    IBag: {
        initTime: number
    }

    main() {
        this.bag.initTime = Date.now();
        // planify the cronActivity to be sure the waiter will be resume in due time
        const waitTime = this.argument.waitTime || this.defaultWaitingTime;
        this.cronActivity.nextActivity = new Date(Date.now()+waitTime);
        return ActionState.IN_PROGRESS;
    }

    watcher() {
        const waitTime = this.argument.waitTime || this.defaultWaitingTime;
        const timeElasped = Date.now() - this.bag.initTime;
        if (timeElasped > waitTime) {
            console.log("Wait action over");
            return Promise.resolve(ActionState.SUCCESS);
        }
        console.log(`Wait action still waiting for ${waitTime - timeElasped} ms `);
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

}

