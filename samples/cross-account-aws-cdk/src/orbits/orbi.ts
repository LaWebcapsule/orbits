import { ActionRuntime } from "@wbce/orbits-core";
import { HelloResource } from "./hello-resource.js";

ActionRuntime.activeRuntime.waitForBootstrap.then(async ()=>{
    new HelloResource().setArgument({
        accountA: {
            id: process.env['AWS_ACCOUNT_A'],
            profile: process.env['AWS_ACCOUNT_A_PROFILE']
        },
        accountB: {
            id: process.env['AWS_ACCOUNT_B'],
            profile: process.env['AWS_ACCOUNT_B_PROFILE']

        },
        region: process.env['AWS_REGION']
    }).save();
})