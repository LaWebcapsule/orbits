import jasmin from "jasmine";
import { ActionApp, bootstrapApp } from "./../index";
import { TestActionWithError, TestAction, TestActionWithWatcherEnding, WorkflowApp, TestActionInWorkflow } from "./test-action";

let j = new jasmin();



j.loadConfig({
    spec_dir: '.',
    spec_files: [
        //'action-in-workflow.spec.ts',
        //'action-executor.spec.ts',
        //'action.spec.ts',
        //'workflow.spec.ts'
        'action-job.spec.ts',
        //'other-action.spec.ts'
        //'./action-app.spec.ts'
    ]
})

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

const db = {
    protocol : "mongodb+srv",
    url : process.env["MONGO_URL"],
    name : "orbits-test",
    connectQsParams : "?retryWrites=true&w=majority"
}
let dbOpts = {
}

@bootstrapApp({
    db : {
        mongo: {
            url : `${db.protocol || 'mongodb'}://${db.url}/${db.name}${db.connectQsParams}`,
            opts: dbOpts
        }
    },
    workers : {
        quantity : 1
    }
})
export class TestApp extends ActionApp{
    declare = [TestAction, TestActionWithWatcherEnding, TestActionWithError];
    imports = [WorkflowApp];
}


ActionApp.waitForActiveApp.then(()=>{
    const activeApp = ActionApp.getActiveApp();
    return activeApp.ActionModel.remove({}).then(()=>{
        console.log("launching the tests")
        j.execute();
    })
})
