import { Action, ActionRuntime, bootstrapApp } from '@wbce/orbits-core';
import { CiPipeline } from './src/main-workflow';
import { PrintAction } from './src/actions/print-action';
import { WaitAction } from './src/actions/wait-action';

let dbUrl = 'mongodb://localhost:27017/example-bash';
if (process.env['mongo_url']) {
    dbUrl = process.env['mongo_url'];
}

@bootstrapApp({
    db: {
        mongo: {
            url: dbUrl,
        },
    },
})
export class ExampleApp extends ActionRuntime {
    declare = [CiPipeline, PrintAction, WaitAction];
}

ActionRuntime.waitForActiveRuntime.then(() => {
    console.log('waitforactive app');
    ActionRuntime.activeRuntime.ActionModel.findOne({
        filter: {
            main: true,
        },
    }).then((actionDb) => {
        console.log('actionDbFinding');
        if (actionDb) {
            const pipeline = Action.constructFromDb(actionDb);
            return pipeline.resume();
        }

        //create main action
        const pipeline = new CiPipeline();
        pipeline.setFilter({
            main: true,
        });
        pipeline.dbDoc.save();
    });
});
