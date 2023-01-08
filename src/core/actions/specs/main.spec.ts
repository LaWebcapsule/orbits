import jasmin from "jasmine";
import { ActionApp, bootstrapApp } from "./../index";
import { TestActionWithError, TestAction, TestActionWithWatcherEnding, TransactionApp } from "./test-action";

let j = new jasmin();



j.loadConfig({
    spec_dir: '.',
    spec_files: [
        'action.spec.ts',
        'transaction.spec.ts'
        //'action-job.spec.ts',
        //'other-action.spec.ts'
        //'./action-app.spec.ts'
    ]
})

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

@bootstrapApp({
    db: {
        mongo: {
            url: 'mongodb://localhost:27017/test'
        }
    } 
})
export class TestApp extends ActionApp{
    declare = [TestAction, TestActionWithWatcherEnding, TestActionWithError];
    imports = [TransactionApp];
}


ActionApp.waitForActiveApp.then(()=>{
    const activeApp = ActionApp.getActiveApp();
    activeApp.ActionModel.remove({}).then(()=>{
        j.execute();
    })
})
