import { ActionApp } from '@wbce/orbits-core';
import jasmin from 'jasmine';
let j = new jasmin();

j.loadConfig({
    spec_dir: '.',
    spec_files: [
        'npm-update.spec.ts',
        //'action-job.spec.ts',
        //'other-action.spec.ts'
        //'./action-app.spec.ts'
    ],
});

process.env['mongo_db'] = 'example-test';
import('./..')
    .then((main) => {
        return ActionApp.waitForActiveApp;
    })
    .then(() => {
        const activeApp = ActionApp.getActiveApp();
        activeApp.ActionModel.remove({});
    })
    .then(() => {
        j.execute();
    });
