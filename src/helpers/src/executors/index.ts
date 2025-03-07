import { ActionApp } from '@wbce/orbits-core';
import { DockerBuildAction } from './docker-executor/docker-build-action.js';

export * from './docker-executor/docker-executor.js';
export * from './docker-executor/ecr-registry.js';
export * from './docker-executor/public-registry.js';

export class ExecutorHelperApp extends ActionApp {
    declare = [DockerBuildAction];
}
