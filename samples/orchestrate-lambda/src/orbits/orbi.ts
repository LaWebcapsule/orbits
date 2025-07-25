
import { TradingWorkflow } from "./workflows/trading";
import { Action, ActionRuntime, ActionState } from "@orbi-ts/core";


ActionRuntime.activeRuntime.waitForBootstrap.then(async ()=>{
    const workflow = new TradingWorkflow();
    await workflow.save();
    await Action.trackActionAsPromise(workflow, [ActionState.SUCCESS, ActionState.ERROR]);
    console.log(workflow.result);
})