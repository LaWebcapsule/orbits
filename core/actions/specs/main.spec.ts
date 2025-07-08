import jasmin from 'jasmine';
import { ActionRuntime } from '../index.js';
import './test-action.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



let j = new jasmin();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

// cannot be run with an already bootstrapped app
// j.execute(['./action-app.spec.ts']);

const relativePath = path.relative(process.cwd(), __dirname);
const isTs = __filename.slice(-3) === '.ts';
const extension = isTs ? '.ts' : '.js';

const specFiles = [
    'workflow.spec' + extension,
    //'action-executor.spec' + extension,
    //'action-in-workflow.spec' + extension,
    //'action-job.spec' + extension,
    'action.spec' + extension,
    //'generator.spec' + extension,
    //'other-action.spec' + extension,
    //'resource.spec' + extension,
]

j.loadConfig({
    spec_dir: '.',
    spec_files: specFiles.map(file=>path.join(relativePath, file)),
});


ActionRuntime.activeRuntime.ActionModel.remove({}).then(() => {
    console.log('launching the tests');
    j.execute();
});
