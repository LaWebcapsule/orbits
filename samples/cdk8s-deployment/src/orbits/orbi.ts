import { Action, ActionRuntime } from "@wbce/orbits-core";
import { BasicResource } from "./basic-resource.js";

ActionRuntime.activeRuntime.waitForBootstrap.then(async ()=>{
    const helloResource = new BasicResource().setArgument({
        stackName: "cdk8s-basic"
    });
    if(process.env['CDK8S_COMMAND']==="uninstall"){
        helloResource.setCommand("Uninstall");
    }
    helloResource.save();
    await Action.trackActionAsPromise(helloResource);
    console.log(await helloResource.getResourceOutput());
})