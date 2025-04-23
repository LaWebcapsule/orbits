import jasmin from 'jasmine';
import { ActionApp } from '../index.js';
import {
    TestAction,
    TestActionWithError,
    TestActionWithWatcherEnding,
} from './test-action.js';

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
        //'workflow.spec.ts',
        //'generator.spec.ts',
        //'other-action.spec.ts',
        'resource.spec.ts',
    ],
});

const db = {
    protocol: 'mongodb+srv',
    url: process.env['MONGO_URL'],
    name: 'orbits-test',
    connectQsParams: '?retryWrites=true&w=majority',
};
let dbOpts = {};

const app = new ActionApp({
    db: {
        mongo: {
            url: `${db.protocol || 'mongodb'}://${db.url}/${db.name}${db.connectQsParams}`,
            opts: dbOpts,
        },
    },
    workers: {
        quantity: 1,
    },
})

app.waitForBootstrap.then(async () => {
    return app.ActionModel.remove({}).then(() => {
        console.log('launching the tests');
        j.execute();
    });
});
