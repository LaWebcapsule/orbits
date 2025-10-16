import { Action, ActionRuntime, ActionState } from '@orbi-ts/core';
import { TradingWorkflow } from './workflows/trading';

ActionRuntime.activeRuntime.waitForBootstrap.then(async () => {
    if(process.env['main'] === 'main'){
        const workflow = new TradingWorkflow();
        await workflow.save();
        await Action.trackActionAsPromise(workflow, [
            ActionState.SUCCESS,
            ActionState.ERROR,
        ]);
        
    }
});
