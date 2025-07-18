import { ActionRuntime } from '@orbi-ts/core';
import jasmin from 'jasmine';
import path from 'path';
import { fileURLToPath } from 'url';
import './actions-test.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let j = new jasmin();

j.loadConfig({
    spec_dir: path.relative(process.cwd(), __dirname),
    spec_files: ['docker-executor.spec.ts'],
});

ActionRuntime.activeRuntime.bootstrapPath = path.join(
    process.cwd(),
    'main.spec.ts'
);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

ActionRuntime.activeRuntime.ActionModel.remove({}).then(() => {
    console.log('launching the tests');
    j.execute();
});
