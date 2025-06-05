---
sidebar_position: 2
title: Quickstart
---

# Hello world
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
        return ActionState.Success;
    }
}
```

### Consume your action

#### Use the action anywhere you want in your app

```typescript title='src/anywhere-in-your-app.ts'
  const action = new MyAction();
  await action.save();//the action will be executed in the background.
  await Action.trackActionAsPromise(action, [ActionState.SUCCESS, ActionState.ERROR]);//this line is optional.
```

#### Configure persistent storage

You will need a mongodb connection to store the state of your action.
Once you have a valid mongodb url, please create an `ActionApp` with the mongodb connection string.

```typescript title='src/orbits/orbi.ts'
const db = {
    protocol: 'mongodb+srv',
    url: process.env['MONGO_URL'],
    name: 'orbits-test',
    connectQsParams: '?retryWrites=true&w=majority',
};

new ActionApp({
    db: {
        mongo: {
            url: `${db.protocol || 'mongodb'}://${db.url}/${db.name}${db.connectQsParams}`,
            opts: {},
        },
    }
})
```
#### Hook : ensure your app is set

```typescript  title='src/index.ts'
import {ActionApp} from "@wbce/orbits-core"
import "./orbits/action-app.ts"


    await ActionApp.waitForActiveApp;
```

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
            return Promise.resolve(this.argument.name)
        })
        console.log(`${resultOfMyAction}, ${name}!`)
        return `${resultOfMyAction}, ${name}!`
    }
}
```

Of course, you don't need this to display hello name, but this is for the example.
Here, using `this.do` we ensure that, for each execution of `MyWorkflow`, the "hello" step is run once and only once.
This allows to apply the SEGA principle.

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