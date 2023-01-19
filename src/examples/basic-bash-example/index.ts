import { Action, ActionApp, bootstrapApp } from "@wbce/orbits-core";
import { CdkDeployAction, CdkHelperApp } from "@wbce/orbits-fuel";
import {CiPipeline} from "./src/main-transaction";
import { PrintAction } from "./src/actions/print-action";

@bootstrapApp({
    db : {
        mongo: {
            url: 'mongodb+srv://testdb:3uzeAVGkBWUCTwAd@cluster0.nobtybg.mongodb.net/?retryWrites=true&w=majority'
        }
    }
})
export class ExampleApp extends ActionApp{
    declare = [CiPipeline, PrintAction]
}

ActionApp.waitForActiveApp.then(()=>{
    console.log("waitforactive app")
    ActionApp.activeApp.ActionModel.findOne({
        filter : {
            main : true
        }
    }).then((actionDb)=>{
        console.log("actionDbFinding")
        if(actionDb){
            //action already exists
            const action = Action.constructFromDb(actionDb);
            action.resume();
            return;
        }
        //create main action
        const pipeline = new CiPipeline();
        pipeline.setFilter({
            main : true
        })
        pipeline.dbDoc.save();
    })
})
