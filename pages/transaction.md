# Transaction documentation

Transaction is a way to chain Actions. The syntax is similar to how a promise work.
A Transaction is also a specific type of `Action`, so you can chain Transactions in other Transactions.



# Write a Transaction

A Transaction, same as an `Action`, have an `init()` method.
A Transaction also have a `define()` method where you can write your flow of Actions.

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

The `next`, `catch` and `finally` methods expects a callback which return an Action or an array of Actions or a promise returning an Action or a promise returning an array of Actions.  
These methods reproduce the Promise behaviors.  
As a consequence, the argument of the callback is the result of the other Actions.

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

To add flexibility on how to chain Actions, there is also a goTo syntax style.
This syntaxe style is used in the following example.

```typescript
export class MyTransaction extends Transaction{

    define(){
        this.name("first step")
            .next(()=>{
                return Action.resolve({success : "first"})
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

Transactions are always candidates to rollback. You can specify how to rollback an Action with the `rollback()` method.

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
