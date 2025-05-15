# Workflow documentation

A Workflow is a way to chain Actions. The syntax is similar to how async/await syntax works.
A Workflow is also a specific type of `Action`, so you can chain Workflows in other Workflows.

# Write a Workflow

A Workflow, same as an `Action`, has an `init()` method.
A Workflow also has a `define()` method where you can write your flow of Actions.

```typescript
export class MyWorkflow extends Workflow{

    define(){
        try{
            await this.do("my-action", new MyAction().setArgument({
                x: 1
            }))
        }
        catch(err){
            await this.do("on-error-action", new OnErrorAction().setArgument({
                x: 1
            }))
        }
        finally{
            //....
        }
        return {
            x: 2
        }
    }

}
```

## The do method

### Purpose
The `do()` method is used to declare an action to be executed within the workflow. It mimics the behavior of await in native JavaScript/TypeScript syntax to provide readable, sequential flow control.

However, `do()` is more complex than a normal asynchronous call. Behind the scenes, the orbits framework implements deterministic execution with built-in replayability. This means:
- `define()` can be executed multiple times during the lifecycle of a workflow.
- Each call to `do()` is idempotent: the action is only executed once.
- On re-execution, previously completed `do()` calls return the stored result instead of re-running the action.


### Point of attention : deterministic execution and async/await

```ts
export class BadWorkflow extends Workflow {
  define() {
    const search = await axios.get("https://google.com?search=test"); // ❌ Not deterministic

    if (search.length) {
      await this.do("step-a", new StepA());
    } else {
      await this.do("step-b", new StepB());
    }

    return { status: "done" };
  }
}
```

```ts
export class CorrectWorkflow extends Workflow {
  define() {
    const search = await this.do("search", ()=>{
        axios.get("https://google.com?search=test"
    });

    if (search.length) {
      await this.do("step-a", new StepA());
    } else {
      await this.do("step-b", new StepB());
    }

    return { status: "done" };
  }
}
```

```ts
export class BadWorkflow extends Workflow {
  define() {
    const now = Date.now(); // ❌ Not deterministic

    if (now % 2 === 0) {
      await this.do("step-a", new StepA());
    } else {
      await this.do("step-b", new StepB());
    }

    return { now };
  }
}
```

```ts
export class CorrectWorkflow extends Workflow {

    IBag: {
        now : number
        
    }

  async init(){
    await super.init();
    if(!this.bag.now){
        this.bag.now = Date.now()
    }
  }

  define() {

    if (this.bag.now % 2 === 0) {
      await this.do("step-a", new StepA());
    } else {
      await this.do("step-b", new StepB());
    }

    return { now: this.bag.now };
  }
}
```

The `do` methods is what allows expect a callback returning either: an Action, an array of Actions, a promise returning an Action or a promise returning an array of Actions.

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

### Action Step definition

### On the fly promise Step definition

### Dynamic definition

### Under the hood

Under the hood the do method return a standard javascript promise.
However this promises not always resolve.

## repeat and transform

### Action level

At the action level, you can configure the repetion using the `setRepeat()` method.
Example : 
```typescript
export class MyWorkflow extends Workflow{

    define(){
        try{
            await this.do("my-action", new MyAction().setArgument({
                x: 1
            }).setRepeat({
                [ActionState.ERROR]: 2 //repeat twice, so will be executed max. 3 times
            }))
        }
        catch(err){
            await this.do("on-error-action", new OnErrorAction().setArgument({
                x: 1
            }))
        }
        finally{
            //....
        }
        return {
            x: 2
        }
    }

}
```

### Workflow level


At the wor level, you can configure the repetion using the `setRepeat()` method.
Example : 
```typescript
export class MyWorkflow extends Workflow{

    define(){
        try{
            await this.do("my-action", new MyAction().setArgument({
                x: 1
            }).setRepeat({
                [ActionState.ERROR]: 2 //repeat twice, so will be executed max. 3 times
            }))
        }
        catch(err){
            await this.do("on-error-action", new OnErrorAction().setArgument({
                x: 1
            }))
        }
        finally{
            //....
        }
        return {
            x: 2
        }
    }

}
```

### Transformation




