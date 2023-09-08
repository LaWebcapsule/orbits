export * from './src/executors/index'
export * from './src/git-actions/index'
export * from './src/standards-actions/cdk/cdk-action'
export * from './src/standards-actions/cdk/cdk-helper'


import {ActionApp} from '@wbce/orbits-core'
import { ExecutorHelperApp } from './src/executors/index'
import { GitHelperApp } from './src/git-actions/gitcenter'
import { CdkHelperApp } from './src/standards-actions/cdk/cdk-action'

export class HelperApp extends ActionApp{
    imports: (typeof ActionApp)[] = [CdkHelperApp, GitHelperApp, ExecutorHelperApp]
}