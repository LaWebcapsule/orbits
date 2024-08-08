# Executor

Executors allow Actions to be run in specific contexts. For example, assume you want to build an app that requires external dependencies, like grunt, java, composer... You can specify that the deploy Action runs in a normal context and that the builder Action runs in a docker or in a lambda or in any other context managed by an executor.

# Concept

An executor changes the way the `resume()` method executes. It mainly has two modes:
When the `resume()` of an Action with an Executor is called:
- The executor checks if the execution is the expected one
- If the execution is not the expected one, the executor takes care of calling the good execution context with the correct information. This can imply to run a docker executor, call a lambda function, launch an ECS task...
- If the execution context is the correct one, the executor runs the standard behavior of the `resume()`.
As a consequence, an Action with an Executor executes normally, but in a context where you can choose the appropriate dependencies, right accesses...

---> :construction_worker: Today, we only have the DockerExecutor. We are expecting to write an Aws ecs and an Aws lambda executor. We would be pleased to receive contributions to go quicker!

# Specify an Executor

You only need to add to the Action class:

```typescript

export class MyAction extends Action{
    executor = new DockerExecutor({
        // ...
    })
}
```

Sometimes, an Executor needs some installation before being able to be called.
This installation can include building a docker image, deploying a cdk...
As a consequence, an Executor has an install method which returns an Action.

```typescript
const dockerExecutor = new DockerExecutor({
    // ...
})
const installAction = dockerExecutor.install()
```

You should consume the install Action before using the Executor.
Example:
```typescript

export class MyBuildPipeline extends Workflow{

    define(){
        this.next(()=>{
            const dockerExecutor = new DockerExecutor({})
            return dockerExecutor.install()
        }).next(()=>{
            const myBuild = new ActionThatUseExecutor();
            return myBuild;
        })
    }
}
```

# Write your own Executor

Writing your own Executor is a bit more complex than consuming an executing one.
You can refer to the source of the DockerExecutor [here](./../src/helpers/src/executors/docker-executor/).
The documentation on this point is pending.
