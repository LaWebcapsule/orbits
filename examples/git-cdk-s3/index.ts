import { Action, ActionRuntime, bootstrapApp } from '@wbce/orbits-core';
import { CdkDeployAction, CdkHelperApp } from '@wbce/orbits-fuel';
import {
    CdkBootstrapFrontStack,
    CdkDeployFrontStack,
} from './src/cdk-stack/cdk-action';
import { CiPipeline } from './src/main-workflow';

@bootstrapApp({
    db: {
        mongo: {
            url: 'mongodb://localhost:27017/cdk-example',
        },
    },
})
export class ExampleApp extends ActionRuntime {
    declare = [CiPipeline, CdkDeployFrontStack, CdkBootstrapFrontStack];
    imports: (typeof ActionRuntime)[] = [CdkHelperApp];
}

ActionRuntime.waitForActiveRuntime.then(() => {
    console.log('waitforactive app');
    ActionRuntime.activeRuntime.ActionModel.findOne({
        filter: {
            principalWorkflow: true,
        },
    }).then((actionDb) => {
        console.log('actionDbFinding');
        if (actionDb) {
            //action already exists
            const action = Action.constructFromDb(actionDb);
            action.resume();
            return;
        }
        //create principal action
        const pipeline = new CiPipeline();
        pipeline.setFilter({
            principalWorkflow: true,
        });
        pipeline.save();
    });
});
