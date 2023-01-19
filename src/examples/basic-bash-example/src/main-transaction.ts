import { Transaction } from "@wbce/orbits-core";
import { PrintAction } from "./actions/print-action";
import { WaitAction } from "./actions/wait-action";
import { ActionState } from "@wbce/orbits-core/dist";
import { ResolveAction } from "@wbce/orbits-core/dist/src/action-manager";

export class CiPipeline extends Transaction {
    IBag: {
        actions: {
            [key: string]: {
                state: ActionState;
                result: any;
            };
        };
        currentStepIndex?: number;
        nTimesCurrentStep: number;
        stepsHistory: number[];
        oldResult: any;
        isRollBackPossible: boolean;
        counter: number;
    };

    define() {
        const stackName = 'main-pipeline';
        console.log("ciPipeline define")
        this.bag.counter = 0;
        this.name('print').next(() => {
            const printAction = new PrintAction();
            printAction.setArgument({toPrint :'Print me boy. ' + this.bag.counter});
            this.bag.counter++;
            return printAction;
        }).next(()=> {
            return new WaitAction();
        }).next(()=>{
            console.log(this.bag.counter);
            if(this.bag.counter<30){
                console.log('Going to step print');
                return this.goToStep('print');
            }
            console.log('its over');
        })
        .catch(err => {
            // Global Pipeline Catch
            console.log(err);
            throw err;
        })
    }
}    
