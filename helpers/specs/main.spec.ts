import { ActionRuntime } from '@wbce/orbits-core';
import jasmin from 'jasmine';
import './actions-test.js';
let j = new jasmin();

j.loadConfig({
    spec_dir: '.',
    spec_files: ['docker-executor.spec.ts'],
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

ActionRuntime.activeRuntime.ActionModel.remove({}).then(() => {
        console.log('launching the tests');
        j.execute();
});



