import { Action, ActionApp, bootstrapApp } from "@wbce/orbits-core";
import {CiPipeline} from "./src/main-transaction";
import { PrintAction } from "./src/actions/print-action";
import { WaitAction } from "./src/actions/wait-action";

@bootstrapApp({
    db : {
        mongo: {
            url: 'mongodb+srv://testdb:3uzeAVGkBWUCTwAd@cluster0.nobtybg.mongodb.net/?retryWrites=true&w=majority'
        }
    }
})
export class ExampleApp extends ActionApp{
    declare = [CiPipeline, PrintAction, WaitAction]
}

ActionApp.waitForActiveApp.then(()=>{
    console.log("waitforactive app")
    ActionApp.activeApp.ActionModel.findOne({
        filter : {
            main : true
        }
    }).then((actionDb)=>{
        console.log("actionDbFinding")
        
        //create main action
        const pipeline = new CiPipeline();
        pipeline.setFilter({
            main : true
        })
        pipeline.dbDoc.save();
    })
})
