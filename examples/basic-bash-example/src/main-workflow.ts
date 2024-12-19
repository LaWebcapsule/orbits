import { Workflow } from '@wbce/orbits-core';
import { PrintAction } from './actions/print-action';
import { WaitAction } from './actions/wait-action';
import { ActionState } from '@wbce/orbits-core/dist';
import {
    Action,
    ResolveAction,
} from '@wbce/orbits-core/dist/src/action-manager';

export class CiPipeline extends Workflow {
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
        console.log('ciPipeline define');
        this.name('init')
            .next(() => {
                this.bag.counter = 0;
                console.log('init step');
                return;
            })
            .name('print')
            .next(() => {
                const printAction = new PrintAction();
                printAction.setArgument({
                    toPrint: 'Print me boy. ' + this.bag.counter,
                });
                this.bag.counter += 1;
                return printAction;
            })
            .next(() => new WaitAction())
            .next(() => {
                console.log(this.bag.counter);
                if (this.bag.counter < 30) {
                    console.log('Going to step print');
                    return this.goToStep('print');
                }
                console.log('its over');
            })
            .catch((err) => {
                // Global Pipeline Catch
                console.log('outch!');
                console.log(err);
                return Action.reject(err);
            });
    }
}
