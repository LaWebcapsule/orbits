import { Action, ActionApp, bootstrapApp } from "@wbce/orbits-core";
import {CiPipeline} from "./src/main-transaction";
import { PrintAction } from "./src/actions/print-action";
import { WaitAction } from "./src/actions/wait-action";

let dbUrl = 'mongodb://localhost:27017/example-bash';
if(process.env['mongo_url']){
    dbUrl = process.env['mongo_url']
}

@bootstrapApp({
    db : {
        mongo: {
            url: dbUrl
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
        if(actionDb){
            const pipeline = Action.constructFromDb(actionDb);
            return pipeline.resume();
        }
        
        //create main action
        const pipeline = new CiPipeline();
        pipeline.setFilter({
            main : true
        })
        pipeline.dbDoc.save();
    })
})
