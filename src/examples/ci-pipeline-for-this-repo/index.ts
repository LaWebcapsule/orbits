import { Action, ActionApp, bootstrapApp } from "@wbce/orbits-core";
import { HelperApp } from "@wbce/orbits-fuel";
import { PublishNpmPackage } from "./src/actions/publish-npm-package";
import { RunTest } from "./src/actions/run-tests";
import { UpdateNpmVersions } from "./src/actions/update-npm-versions";
import { MasterWorkflow } from "./src/workflows/master";

const url = `mongodb://localhost:27017/${process.env['mongo_database'] || 'example'}`

@bootstrapApp({
    db : {
        mongo: {
            url: 'mongodb://localhost:27017/example'
        }
    }
})
export class ExampleApp extends ActionApp{
    declare = [PublishNpmPackage, RunTest, UpdateNpmVersions, MasterWorkflow]
    imports = [HelperApp];
}

ActionApp.waitForActiveApp.then(()=>{
    console.log("waitforactive app")
    ActionApp.activeApp.ActionModel.findOne({
        filter : {
            main : true
        }
    }).then((actionDb)=>{
        if(actionDb){
            const action = Action.constructFromDb(actionDb);
            action.resume();
            return;
        }
        //create main action
        const pipeline = new MasterWorkflow();
        pipeline.setFilter({
            main : true
        })
        pipeline.dbDoc.save();
    })
})
