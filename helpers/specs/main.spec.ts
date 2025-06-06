import { ActionApp } from '@wbce/orbits-core';
import jasmin from 'jasmine';
import './actions-test.js';
let j = new jasmin();

j.loadConfig({
    spec_dir: '.',
    spec_files: ['docker-executor.spec.ts'],
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

const db = {
    protocol: 'mongodb+srv',
    url: process.env['MONGO_URL'],
    name: 'orbits-helper-test',
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


