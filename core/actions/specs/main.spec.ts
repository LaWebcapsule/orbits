import jasmin from 'jasmine';
import { ActionRuntime } from '../index.js';

let j = new jasmin();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

// cannot be run with an already bootstrapped app
// j.execute(['./action-app.spec.ts']);

j.loadConfig({
    spec_dir: '.',
    spec_files: [
        //'action-executor.spec.ts',
        //'action-in-workflow.spec.ts',
        //'action-job.spec.ts',
        //'action.spec.ts',
        'workflow.spec.ts',
        //'generator.spec.ts',
        //'other-action.spec.ts',
        //'resource.spec.ts',
    ],
});

ActionRuntime.activeRuntime.ActionModel.remove({}).then(() => {
    console.log('launching the tests');
    j.execute();
});
