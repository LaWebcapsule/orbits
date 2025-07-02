---
sidebar_position: 0.2
title: Quickstart
---

# Hello world example
A pratical example that guides you to write your first applications using orbits.

## Scope

For the sake of demonstration, we will an "hello-world" application.
The aim is quite simple : 
- after 10 am, say hello
- say hello only once in a day
- say goodbye if we quit.

## Prerequisites

### Clone this repository

- Clone this repository
- Install npm dependencies : 
`npm i`

## Project Structure

```bash
├── src/
│   ├── orbits/
│   │   └── orbi.ts # Main orchestration script
│   │   ├── greetings-resource.ts # the resource that orchestrate the lifecycle of greetings
│   │   ├── hello-action.ts # An action that wait 10 am and says hello
│   │   ├── hello-workflow.ts # A workflow that take in parameter a name and say "hello ${name}"
├── package.json
└── README.md
```

## The Hello Action

```typescript title="src/orbits/hello-action.ts"
import { Action, ActionState } from '@wbce/orbits-core';



export class HelloAction extends Action{

    main(){
        console.log('Hello 👋');
        this.setResult('Hello');
        return ActionState.SUCCESS
    }

}
```

This simple action logs a greeting and completes immediately.

The main() method is the entry point of an action. It is guaranteed to run once and only once, so you can be confident that console.log('Hello 👋') will not be called multiple times — even if the action is retried, resumed, or observed over time.

This design is critical for ensuring that side effects remain idempotent and predictable.



## The Hello Workflow

```typescript title="src/orbits/hello-workflow"
import { Workflow } from "@wbce/orbits-core";
import { HelloAction } from "./hello-action.ts";



export class HelloWorkflow extends Workflow{

    declare IResult: string;

    declare IArgument: {
        name: string;
    }

    async define(){
        const prefix = await this.do("hello", new HelloAction());
        const suffix = await this.do("name", ()=>{
            return Promise.resolve(this.argument.name);
        })
        return `${prefix} ${suffix}`;
    }
}
```

The `HelloWorkflow` take a name as a parameter and return "hello-name".
Let's explore the syntax step-by-step.

### Type declarations

```typescript
declare IResult: string;

declare IArgument: {
    name: string;
}
```
These lines are useful for typing.
With `IResult` we precise the type of the return of the Workflow.
As a consequence, if you call the `HelloWorkflow` in another `Workflow`, you can enjoy type completion and type checking.
```typescript 
    const result = await this.do("hello", new HelloWorkflow());//result has type "string"
```

With `IArgument`, we precise the type of the argument of the workflow.
As a consequence, in the same workflow, you can enjoy type completion and type checking for the `argument` property.
```typescript
    console.log(this.argument);//type of this.argument is IArgument
    console.log(this.argument.name); //OK : the property name exists in the argument object
    console.log(this.argument.surname);//KO: the property does not exist.
```
Also, if you call the `HelloWorkflow` in another `Workflow`, you can enjoy type completion and type checking for the argument parameter.
```
```typescript 
    const result = await this.do("hello", new HelloWorkflow().setArgument({name: "John Doe"}));//setArgument expects an argument of type IArgument
```

### Define() method

In the define(), you can chain actions.
The define() method is a special async function.
You must consume all promise through the `this.do()` methods. You shouldn't use any promise outside `do()`

Here, we chain two actions, one for the prefix, one for the suffix.
Each action will be called once and only once.
The define() method will be called an undertimanate but multiple times. If you want to illustrate this behaviour, just add a console.log() in the `define()` method.
```typescript
async define(){
    ...
    console.log("I will be called multiple times");
    await this.do("log", ()=>{
        console.log("I will be called only once");
        return Promise.resolve();
    })
}
``` 
This approach aligns with the [SAGA principle](https://microservices.io/patterns/data/saga.html).
The `do()` has other nice possibilities, please see the [core documentation]() to get more infos.

### Result

At the end of define, we return a string.
This will ensure this workflow has a result.

## The Greetings Resources

```typescript title='src/orbits/greeting-resource.ts'
export class GreetingResource extends Resource {

    declare IResult: string;

    declare IArgument: {
        name: string;
        date: string
    } & Resource["IArgument"]

    identity() {
        return `${this.argument.name}-${this.argument.date}`;
    }

    async defineInstall() {
        const greeting = await this.do("greeting", new HelloWorkflow().setArgument({
            name: this.argument.name
        }));
        await this.do("display-greeting", ()=>{
            console.log(`${greeting}  👋👋👋`);
            return Promise.resolve();
        })
    }

    async defineUpdate() {
        //do nothing
        console.log(`(I have already seen you.)👻`);
    }

    async defineUninstall() {
        await this.do("display-goodbye", ()=>{
            console.log(`Goodbye my dear friend ${this.argument.name} 👋👋👋`);
            return Promise.resolve();
        });
    }
}
```
The `GreetingResource` take a name and a date as parameter and is responsible for doing the greetings.
Let's explore the syntax step-by-step.

### Type declarations

```typescript
declare IResult: string;

declare IArgument: {
    name: string;
    date: string
} & Resource["IArgument"]
```
These lines are useful as typing. They have the same function as for the [workflow](#type-declarations).
Note 


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