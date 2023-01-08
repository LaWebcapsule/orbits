# Executor

Executor allows action to be run in specific context. For example, assume you want to build an app and this process requires external dependencies, like grunt, java, composer...
You can specify that an action will be run in a docker or in a lambda or in any other managed by an executor.

# Specify an executor

You only need to add to the action class

```typescript

export class MyAction extends Action{
    executor = new DockerExecutor({
        
    })

}

```

Sometimes, an executor needs some installation before being able to be called.
This installation can include building a docker image, deploying a cdk...
As a consequence an executor has an install method which return an action.

```typescript
const dockerExecutor = new DockerExecutor({

})
const installAction = dockerExecutor.install()

```

You should consume the install action before doing any use of the executor.
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


# Write your own executor.

Writing your own executor is a bit more complex than consuming an executing one.