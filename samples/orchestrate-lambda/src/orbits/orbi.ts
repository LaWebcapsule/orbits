import { Action, ActionRuntime, ActionState } from '@orbi-ts/core';
import { TradingWorkflow } from './workflows/trading';

ActionRuntime.activeRuntime.waitForBootstrap.then(async () => {
    const workflow = new TradingWorkflow();
    await workflow.save();
    await Action.trackActionAsPromise(workflow, [
        ActionState.SUCCESS,
        ActionState.ERROR,
    ]);
});
