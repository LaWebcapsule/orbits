# Executor

Executor allows Action to be run in a specific context. For example, assume you want to build an app and this process requires external dependencies, like grunt, java, composer...
You can specify that an Action will be run in a docker or in a lambda or in any other context managed by an executor.

# Specify an Executor

You only need to add to the Action class

```typescript

export class MyAction extends Action{
    executor = new DockerExecutor({
        
    })

}

```

Sometimes, an Executor needs some installation before being able to be called.
This installation can include building a docker image, deploying a cdk...
As a consequence, an Executor has an install method which return an Action.

```typescript
const dockerExecutor = new DockerExecutor({

})
const installAction = dockerExecutor.install()

```

You should consume the install Action before doing any use of the Executor.
Example : 
```typescript

export class MyBuildPipeline extends Transaction{

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


# Write your own Executor.

Writing your own Executor is a bit more complex than consuming an executing one.
