
import { TradingWorkflow } from "./workflows/trading";
import { Action, ActionRuntime } from "@orbi-ts/core";

ActionRuntime.activeRuntime.waitForBootstrap.then(async ()=>{

    const workflow = new TradingWorkflow();
    await workflow.save();
    await Action.trackActionAsPromise(workflow);
    console.log(await workflow.getLogs());
})