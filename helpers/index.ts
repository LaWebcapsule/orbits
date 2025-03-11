import { ActionApp } from '@wbce/orbits-core';

export * from './src/executors/index.js';
export * from './src/git-actions/index.js';
export * from './src/standards-actions/cdk/cdk-action.js';
export * from './src/standards-actions/cdk/cdk-helper.js';

import { ExecutorHelperApp } from './src/executors/index.js';
import { GitHelperApp } from './src/git-actions/gitcenter.js';
import { CdkHelperApp } from './src/standards-actions/cdk/cdk-action.js';

export class HelperApp extends ActionApp {
    imports: (typeof ActionApp)[] = [
        CdkHelperApp,
        GitHelperApp,
        ExecutorHelperApp,
    ];
}
