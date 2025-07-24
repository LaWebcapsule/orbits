---
title: Executor
sidebar_position: 5
---

# Executor

Executors allow Actions to be run in specific contexts. For example, assume you want to build an app that requires external dependencies, like grunt, java, composer... You can specify that the deploy Action runs in a normal context and that the builder Action runs in a docker or in a lambda or in any other context managed by an executor.

# Specify an Executor

You only need to add to the Action class:

```ts
export class MyAction extends Action {
    executor = new DockerExecutor({
        // ...
    });
}
```

Sometimes, an Executor needs some installation before being able to be called.
This installation can include building a docker image, deploying a cdk...
As a consequence, an Executor has a `generateSupportResource` method which returns a `Resource`.

```ts
const dockerExecutor = new DockerExecutor({
    // ...
});
const supportResource = dockerExecutor.generateSupportResource();
```

You should consume the resource before using the Executor.
Example:

```ts
export class MyBuildPipeline extends Workflow {
    async define() {
        const dockerExecutor = new DockerExecutor({});
        await this.do(
            'ensureExecutorHasSupport',
            dockerExecutor.generateSupportResource()
        );
        await this.do('launchActionWithExecutor', new ActionThatUseExecutor());
    }
}
```

# Write your own Executor

Writing your own Executor is a bit more complex than consuming an executing one.
The documentation on this point is pending. You can refer to the docker executor implementation in order to have an example.

# Under the hood

An executor changes the way the `resume()` method executes. It mainly has two modes:
When the `resume()` of an Action with an Executor is called:

- The executor checks if the execution context is the expected one
- If the execution context is not the expected one, the executor takes care of calling the good execution context with the correct information. This can imply to run a docker executor, call a lambda function, launch an ECS task...
- If the execution context is the correct one, the executor runs the standard behavior of the `resume()`.
  As a consequence, an Action with an Executor executes normally, but in a context where you can choose the appropriate dependencies, right accesses...

---> :construction_worker: Today, we only have openSourced the DockerExecutor. We are expecting to deliver an Aws ecs, an Aws lambda executor and a Kube executor. We would be pleased to receive contributions to go quicker!
