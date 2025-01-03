# Workflow documentation

A Workflow is a way to chain Actions. The syntax is similar to how a promise works.
A Workflow is also a specific type of `Action`, so you can chain Workflows in other Workflows.

# Write a Workflow

A Workflow, same as an `Action`, has an `init()` method.
A Workflow also has a `define()` method where you can write your flow of Actions.

```typescript
export class MyWorkflow extends Workflow{

    define(){
        this.next(()=>{
            const action = new MyAction();
            action.setArgument({x: 1});
            return action;
        }).catch((result)=>{
            const onErrorAction = new OnErrorAction();
            onErrorAction.setArgument({x: 1});
            return onErrorAction
        }).finally(()=>{
            ...
        })
    }

}
```

## Next, catch and finally

The `next`, `catch` and `finally` methods expect a callback returning either: an Action, an array of Actions, a promise returning an Action or a promise returning an array of Actions.

These methods reproduce the Promise behaviors.
As a consequence, the argument of the callback is the result of the previous Action.

```typescript
export class MyWorkflow extends Workflow {
    define() {
        this.next(() => Action.resolve({ x: 1 }))
            .next((result) => {
                //result is {x:1}
                return [Action.resolve({ x: 1 }), Action.resolve({ x: 2 })];
            })
            .next((result1, result2) => {
                //result1 is {x:1}
                //result2 is {x:2}
            });
    }
}
```

## Behavior on error or failure

A callback of the `next`, `catch` and `finally` methods can be called multiple times. You have to use an action if you have to ensure a one and only one job.

As a consequence, a callback of the `next`, `catch` and `finally` should be idempotent.

If a callback throws an error, it will be retried (by default every ten minutes) until the callback properly returns. This is by design. For example, you can make http calls in your callback to configure the parameters of an action. If one of the calls throws an error (due to network, timeout resources), the process will just retry the callback later.

```typescript
export class MyWorkflow extends Workflow {
    define() {
        this.next(() =>
            this.readName(this.argument.id).then((name) => {
                // if the readName function throws an error
                // Orbits will just retry it later.
                const sayHelloAction = new SayHelloAction();
                sayHelloAction.setArgument({ name });
                return sayHelloAction;
            })
        );
    }
}
```

## Database interaction

As documented in the [action](./action.md#database-interaction) section, and same as an Action, a Workflow has the three `argument`, `bag` and `result` properties.

To clarify how the `bag` is available in the `define()` method, let's take a look at the following commented example:

```typescript
export class MyWorkflow extends Workflow {
    define() {
        console.log(this.bag.x);
        // here, x can be 0, 1 or 2, depending the step of the workflow.
        this.next(() => {
            // set x to 0
            this.bag.x = 0;
        })
            .next(() => {
                this.bag.x++;
                // a next() property can be called multiple time in case of failure
                // but the bag is saved only if the callback returns properly.
                // so we are sure after this x=1;
            })
            .next(() => {
                // set x to 2
                this.bag.x++;
            });
    }
}
```

### The special `registerDocToSaveAtStepStart` method

The `next()`, `catch()`, `finally()` methods return an (array of) Action.
To be sure all the actions are saved and the workflow is set in a `ActionState.IN_PROGRESS`, we use a mongodb transaction. If you want to add some documents to that transaction, you can use the `registerDocToSaveAtStepStart`. The document will be saved if and only if the step begins.

```typescript
export class MyWorkflow extends Workflow {
    define() {
        // ...something before...
        this.next((name) => {
            const newUser = new User(name); // assume it's a mongo document.
            this.registerDocToSaveAtStepStart(newUser); // newUser will be saved if and only if this step starts, so there is no risk of duplicate.
            return Action.resolve();
        });
        // ...something after...
    }
}
```

## GoTo syntax

To add flexibility on how to chain Actions, there is also a goTo syntax style.

This syntax style is used in the following example:

```typescript
export class MyWorkflow extends Workflow {
    define() {
        this.name('first step')
            .next(() => Action.resolve({ success: 'first' }))
            .name('second step')
            .next(() => {
                //some random actions
                if (Math.random() > 0.5) {
                    return Action.reject({ error: 'second' });
                } else {
                    return Action.resolve({ success: 'second' });
                }
            })
            .onErrorGoTo('final step')
            .onSuccessGoTo('second step')
            .name('final step')
            .finally(() => this.goToStep('first step'));
    }
}
```

# Rollback

Workflows are always candidates to rollback. You can specify how to rollback an Action with the `rollback()` method.

```typescript
let x = 0;
export class MyWorkflow extends Workflow {
    define() {
        this.next(() => {
            x = 1;
            return Action.resolve();
        }).rollback(() => {
            x = 0;
            return Action.resolve();
        });
    }
}
```
