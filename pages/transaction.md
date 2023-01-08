# Transaction documentation

Transaction is a way to chain actions. The syntax is similar to how a promise work.
A transaction is also a specific type of `Action`, so you can chain transactions in other transactions.



# Write a transaction

A transaction keep an init function like an action.
A transaction has a define method where you can write your flow of actions.

```typescript
export class MyTransaction extends Transaction{

    define(){
        this.next(()=>{
            const action = new MyAction();
            action.setArgument({
                x: 1
            })
            return action;
        }).catch((result)=>{
            const onErrorAction = new OnErrorAction();
            onErrorAction.setArgument({
                x : 1
            })
            return onErrorAction
        }).finally(()=>{

        })

    }

}
```

## Next, catch and finally

The `next`, `catch` and `finally` methods excepts a callback which return an action or an array of actions or a promise returning an action or an array of actions.  
They imitates the Promise behaviors.  
As a consequence, the argument of the callback is the result of the other actions.

```typescript
export class MyTransaction extends Transaction{

    define(){
        this.next(()=>{
            return Action.resolve({x : 1});
        }).next((result)=>{
            //result is {x:1}
            return [Action.resolve({x: 1}), Action.resolve({x: 2})]
        }).next((result1, result2)=>{
            //result1 is {x:1}
            //result2 is {x:2}
        })
    }

}
```

## GoTo syntax

To add flexibility in how to chain actions, there is also a goTo syntax style.
You can see it in use in this example.

```typescript
export class MyTransaction extends Transaction{

    define(){
        this.name("first step")
            .next(()=>{
                return Action.reject({error : "first"})
            })
            .name("second step")
            .next(()=>{
                //some random actions
                if(Math.random() > 0.5){
                    return Action.reject({error : "second"})
                }
                else{
                    return Action.resolve({success : "second"})
                }
            })
            .onErrorGoTo("final step")
            .onSuccessGoTo("second step")
            .name("final step")
            .finally(()=>{
                return this.goToStep("first step")
            })
    }

}
```


# Rollback

Transaction are always candidate to rollback. You can specify how to rollback an action with the `rollback` method.

```typescript

let x = 0;
export class MyTransaction extends Transaction{
    
    define(){
        this.next(()=>{
            x = 1;
            return Action.resolve();
        }).rollback(()=>{
            x = 0;
            return Action.resolve();
        })
    }
}


```