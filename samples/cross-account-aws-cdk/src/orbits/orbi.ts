import { ActionRuntime } from "@orbi-ts/core";
import { HelloResource } from "./hello-resource.js";

ActionRuntime.activeRuntime.waitForBootstrap.then(async ()=>{
    const helloResource = new HelloResource().setArgument({
        accountA: {
            id: process.env['AWS_ACCOUNT_A'],
            profile: process.env['AWS_ACCOUNT_A_PROFILE']
        },
        accountB: {
            id: process.env['AWS_ACCOUNT_B'],
            profile: process.env['AWS_ACCOUNT_B_PROFILE']

        },
        region: process.env['AWS_REGION']
    })
    if(process.env['HELLO_COMMAND']==="uninstall"){
        helloResource.setCommand("Uninstall");
    }
    helloResource.save();
})