import { ActionApp } from '@wbce/orbits-core';
import { DockerBuildAction } from './docker-executor/docker-build-action';

export * from './docker-executor/docker-executor';
export * from './docker-executor/ecr-registry';
export * from './docker-executor/public-registry';

export class ExecutorHelperApp extends ActionApp {
    declare = [DockerBuildAction];
}
