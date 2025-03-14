console.log('inside main spec 1 !!!');
import { ActionApp } from '@wbce/orbits-core';
import jasmin from 'jasmine';
let j = new jasmin();

j.loadConfig({
    spec_dir: '.',
    spec_files: ['cdk-action.spec.ts', 'docker-executor.spec.ts'],
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

console.log('inside main spec 2 !!!');

ActionApp.waitForActiveApp.then(() => {
    const defaultApp = ActionApp.getActiveApp();
    defaultApp.ActionModel.remove({}).then(() => {
        j.execute();
    });
});
