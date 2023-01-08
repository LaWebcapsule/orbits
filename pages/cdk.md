# How to use the cdk with Orbits

You can see the result of this tutorial here :

# First step : have a stack constructor

# Second step : (optional) create a bootstrapAction

# Third step : create a deployAction

```typescript
export class DeployMyStack extends CdkDeploy{
    StackConstructor = MyStack
}
```

# Four step : (optional) create a transaction

```typescript
export class MyPipeline extends Transaction{

    define(){
        this.next(()=>{


        }).next(()=>{

        })

    }

}

```

# Four step : register the action and bootstap an app




