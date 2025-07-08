---
sidebar_position: 0.2
title: Quickstart
---

# Hello world
<img src="/img/hello-world.png" alt="Hello Monkey"/>
This is a basic guide to get your first resource working.

## Install

Install `@wbce/orbits-core` and `@wbce/orbits-fuel`.
```bash
npm install @wbce/orbits-core @wbce/orbits-fuel --save
```

Install it with yarn:
```bash
yarn add @wbce/orbits-core @wbce/orbits-fuel
```

## Write your first action

An [`Action`](./core-concepts/action.md) is an object that encapsulate a mutating process.


```typescript title='src/orbits/my-action.ts'
import {Action} from "@wbce/orbits-core"

export class MyAction extends Action{

    main(){
        console.log("hello");
        this.setResult("hello!")
        return ActionState.SUCCESS;
    }
}
```

### Use a watcher

Sometimes, a mutating process doesn't complete immediately. It may involve delays, external systems, or asynchronous validation. In such cases, Orbits allows you to track progress over time using the `watcher()` method.

When your main() function returns `ActionState.IN_PROGRESS`, Orbits will continue to invoke `watcher()` periodically to determine whether the action has ultimately succeeded, failed, or is still in progress.


```typescript title='src/orbits/my-action.ts'
import {Action} from "@wbce/orbits-core"

export class MyAction extends Action{

    main(){
        this.setResult("hello!")
        return ActionState.IN_PROGRESS;
    }

    watcher() {
        // In a real scenario, you'd check whether the "hello" mutation
        // has completed (e.g., a message was received, a job succeeded, etc.)
        // For this example, we just simulate success after 10am.
        if (new Date().getHours() > 10) {
            return ActionState.SUCCESS;
        } else {
            console.log("Waiting until after 10am before confirming success...");
            return ActionState.IN_PROGRESS;
        }
    }
}
```

Using a watcher helps your actions stay reactive and robust, even when their effects unfold over time. This pattern is especially useful when interacting with eventually consistent systems, long-running jobs, or third-party APIs.

### Consume your action

#### Use the action anywhere you want in your app

```typescript title='src/anywhere-in-your-app.ts'
  const action = new MyAction();
  await action.save();//the action will be executed in the background.
  await Action.trackActionAsPromise(action, [ActionState.SUCCESS, ActionState.ERROR]);//this line is optional.
```


:::info
**Configure persistent storage**

To store the state of your actions, a connection to a database is required.
Currently, only MongoDB is supported.
By default, Orbits attempts to connect to a local MongoDB instance (`localhost`).
To use a remote MongoDB instance, provide a full MongoDB connection URI via the `ORBITS_DB__MONGO__URL` environment variable.
**Example** : 
```bash
export ORBITS_DB__MONGO__URL='mongodb+srv://orbits:XXXX@myatlas-cluster.mongodb.net/orbits-test?retryWrites=true&w=majority'
```
:::

:::tip
To enable verbose logs while debugging, set the logging level to `debug`:
```bash
export ORBITS_LOGGING_LEVEL='debug'
```
:::

## Workflow: a chain of actions

You will quickly want to exploit the result of your action and not just launch a process in background.
To do this, you need to write a [`Workflow`](./core-concepts/workflow.md).

```typescript title='src/orbits/my-workflow.ts'
import {Workflow} from "@wbce/orbits-core"
import {MyAction} from "./my-action.js"

export class MyWorkflow extends Workflow{

    IArgument: {
        name : string
    }

    define(){
        const resultOfMyAction = await this.do("hello", new MyAction());
        const name = await this.do("name", ()=>{
            console.log(`${resultOfMyAction}, ${this.argument.name}!`)
            return Promise.resolve(this.argument.name)
        })
        return `${resultOfMyAction}, ${name}!`
    }
}
```

Of course, you don’t need this level of complexity just to display “hello, name” — this is simply for demonstration purposes.
Here, using `this.do` we ensure that, for each execution of `MyWorkflow`, the "hello" step is run once and only once. Same, the "name" step is run once and only once.
This approach aligns with the [SAGA principle](https://microservices.io/patterns/data/saga.html).

### Consume your workflow

A workflow is an action, so you consume it like an action
```typescript title='src/anywhere-in-your-app.ts'
  const workflow = new MyWorkflow().setArgument({name : "John Doe"});
  await workflow.save();//the action will be executed in the background.
  await Action.trackActionAsPromise(workflow, [ActionState.SUCCESS, ActionState.ERROR]);//this line is optional.
```

## Resources : a complete lifecycle

Greetings occurs only once in a day but if you do : 

```typescript title='src/consume-workflow.ts'
    const workflow1 = new MyWorkflow().setArgument({name : "John Doe"});
    await workflow1.save();//the action will be executed in the background.
    //others processes
    const workflow2 = new MyWorkflow().setArgument({name : "John Doe"});
    await workflow1.save();
```

the workflow will run twice. How do you do to have it run once ?
This is managed by the concept of [`Resource`](./core-concepts/resource.md).

```typescript title='src/orbits/my-resource.ts'
    export class MyGreetings extends Resource{
        IArgument: {
            name : string
            date: string
        }

        identity(){
            return `${this.argument.name}-${this.argument.date}`
        }

        defineInstall(){
            //say hello
            await this.do("hello", new MyWorkflow().setArgument({
                name: this.argument.name
            }))
        }

        defineUpdate(){
            //do nothing, I already have seen you
        }

        defineUninstall(){
            //say goodbye
            const goodbye = await this.do("goodbye", ()=>{
                console.log("goodbye")
                return "goodbye ; it was a great day";
            })
            return `${goodbye} ${this.argument.name}`
        }

    }
```

### Consume your resources

A resource is an action, so you consume it like an action
```typescript title='src/anywhere-in-your-app.ts'
  const resource = new MyGreetings().setArgument({
    name: "John Doe",
    date: "01-01-01"
  });
  await resource.save();//the action will be executed in the background. the greetings will appear in the console
  await Action.trackActionAsPromise(resource, [ActionState.SUCCESS, ActionState.ERROR]); 
  
  const resource2 = new MyGreetings().setArgument({
    name: "John Doe",
    date: "01-01-01"
  });
  await resource2.save();//the action will be executed but nothing will appear in the console.log, as we already installed the resource
  await Action.trackActionAsPromise(resource2, [ActionState.SUCCESS, ActionState.ERROR]); 

  const resource3 = new MyGreetings().setArgument({
    name: "John Doe",
    date: "01-01-01"
  }).setCommand("goodbye");
  await resource2.save();//the action will be executed ; "goodbye" will appear in the console
  await Action.trackActionAsPromise(resource2, [ActionState.SUCCESS, ActionState.ERROR]);
```

## Next Steps

:::tip What's Next?
Here are three recommended next steps to continue your journey:

1. **👋 [Hello world example](./guides/hello-world.md)** - Build your first Orbits application with our step-by-step tutorial and see immediate results
2. **⚙️ [Core-concepts](/docs/category/core-concepts)** - Master the fundamental architecture principles and design patterns that power Orbits  
3. **🛤️ [Guides](/docs/category/guides)** - Explore hands-on tutorials ranging from beginner-friendly to advanced implementation techniques
:::