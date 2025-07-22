---
sidebar_position: 0.2
title: Quickstart
---

# Hello world

<img src="/img/hello-world.png" alt="Hello Monkey"/>
This is a basic guide to get your first resource working.

## Install

Install `@orbi-ts/core` and `@orbi-ts/fuel`.

```bash
npm install @orbi-ts/core @orbi-ts/fuel --save
```

Install it with yarn:

```bash
yarn add @orbi-ts/core @orbi-ts/fuel
```

:::info ES modules
`@orbi-ts/core` and `@orbi-ts/fuel` are published as ES modules.
If you're starting a new project from scratch, modify your `package.json` to ensure proper module resolution:

```bash
npm pkg set type="module"
```

If you're integrating these packages into an existing ESM project, simply import them as usual.  
If you're integrating these packages into an existing CommonJS project, refer to this guide on how to use [ES modules from a CommonJS environment](https://www.typescriptlang.org/docs/handbook/modules/appendices/esm-cjs-interop.html).
:::

## Write your first action

An [`Action`](./core-concepts/action.md) is an object that encapsulates a mutating process.

```ts title='src/orbits/my-action.ts'
import { Action, ActionState } from '@orbi-ts/core';

export class MyAction extends Action {
    main() {
        console.log('hello!');
        this.setResult('hello!');
        return ActionState.SUCCESS;
    }
}
```

### Use a watcher

Sometimes, a mutating process doesn't complete immediately. It may involve delays, external systems, or asynchronous validation. In such cases, Orbits allows you to track progress over time using the `watcher()` method.

When your `main()` function returns `ActionState.IN_PROGRESS`, Orbits will continue to invoke `watcher()` periodically to determine whether the action has ultimately succeeded, failed, or is still in progress.

```ts title='src/orbits/my-action.ts'
import { Action, ActionState } from '@orbi-ts/core';

export class MyAction extends Action {
    main() {
        console.log('hello!');
        this.setResult('hello!');
        return ActionState.IN_PROGRESS;
    }

    async watcher() {
        // In a real scenario, you'd check whether the "hello" mutation
        // has completed (e.g., a message was received, a job succeeded, etc.)
        // For this example, we just simulate success after 10am.
        if (new Date().getHours() > 10) {
            return ActionState.SUCCESS;
        } else {
            console.log(
                'Waiting until after 10am before confirming success...'
            );
            return ActionState.IN_PROGRESS;
        }
    }
}
```

Using a watcher helps your actions stay reactive and robust, even when their effects unfold over time. This pattern is especially useful when interacting with eventually consistent systems, long-running jobs, or third-party APIs.

### Consume your action

#### Use the action anywhere you want in your app

```ts title='src/anywhere-in-your-app.ts'
import { Action, ActionState } from '@orbi-ts/core';
import { MyAction } from 'src/orbits/my-action.js';
// ...
await ActionRuntime.waitForActiveRuntime;
const action = new MyAction();
await action.save(); // the action will be executed in the background.
await Action.trackActionAsPromise(action, [
    ActionState.SUCCESS,
    ActionState.ERROR,
]); // this line is optional.
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

You will quickly want to exploit the result of your actions and not just launch a process in the background.
To do this, you'll need to write a [`Workflow`](./core-concepts/workflow.md).

```ts title='src/orbits/my-workflow.ts'
import { Workflow } from '@orbi-ts/core';
import { MyAction } from './my-action.js';

export class MyWorkflow extends Workflow {
    declare IArgument: {
        name: string;
    };

    async define() {
        const resultOfMyAction = await this.do('hello', new MyAction());
        const name = await this.do('name', () => {
            console.log(`${resultOfMyAction}, ${this.argument.name}!`);
            return Promise.resolve(this.argument.name);
        });
        return `${resultOfMyAction}, ${name}!`;
    }
}
```

Of course, you don’t need this level of complexity just to display “hello, name” — this is simply for demonstration purposes.
Here, using `this.do` we ensure that, for each execution of `MyWorkflow`, the "hello" step is run once and only once. Same, the "name" step is run once and only once.
This approach aligns with the [SAGA principle](https://microservices.io/patterns/data/saga.html).

### Consume your workflow

A workflow is an action, so you consume it like an action:

```ts title='src/anywhere-in-your-app.ts'
import { Action, ActionState } from '@orbi-ts/core';
import { MyWorkflow } from 'src/orbits/my-workflow.js';
// ...
await ActionRuntime.waitForActiveRuntime;
const workflow = new MyWorkflow().setArgument({ name: 'John Doe' });
await workflow.save(); // the action will be executed in the background.
await Action.trackActionAsPromise(workflow, [
    ActionState.SUCCESS,
    ActionState.ERROR,
]); // this line is optional.
```

## Resources: a complete lifecycle

Greetings occurs only once in a day but if you do:

```ts title='src/consume-workflow.ts'
import { MyWorkflow } from 'src/orbits/my-workflow.js';
// ...
const workflow1 = new MyWorkflow().setArgument({ name: 'John Doe' });
await workflow1.save(); // the action will be executed in the background.
// others processes
const workflow2 = new MyWorkflow().setArgument({ name: 'John Doe' });
await workflow2.save();
```

the workflow will run twice. How to run it only once ?
This is managed by the concept of [`Resource`](./core-concepts/resource.md).

```ts title='src/orbits/my-resource.ts'
import { Resource } from '@orbi-ts/core';
import { MyWorkflow } from 'src/orbits/my-workflow.js';

export class MyGreetings extends Resource {
    declare IArgument: Resource['IArgument'] & {
        name: string;
        date: string;
    };

    identity() {
        return `${this.argument.name}-${this.argument.date}`;
    }

    async defineInstall() {
        // say hello
        await this.do(
            'hello',
            new MyWorkflow().setArgument({
                name: this.argument.name,
            })
        );
    }

    async defineUpdate() {
        // do nothing, I have seen you already
    }

    async defineUninstall() {
        // say goodbye
        const goodbye = await this.do('goodbye', () => {
            console.log('goodbye');
            return Promise.resolve('goodbye ; it was a great day');
        });
        return `${goodbye} ${this.argument.name}`;
    }
}
```

### Consume your resources

A resource is an action, so you consume it like an action:

```ts title='src/anywhere-in-your-app.ts'
import { MyGreetings } from 'src/orbits/my-resource.js';
// ...
const resource = new MyGreetings()
    .setArgument({
        name: 'John Doe',
        date: '01-01-01',
    })
    .setCommand('Install');
await resource.save(); // the action will be executed in the background. the greetings will appear in the console
await Action.trackActionAsPromise(resource, [
    ActionState.SUCCESS,
    ActionState.ERROR,
]);

const resource2 = new MyGreetings()
    .setArgument({
        name: 'John Doe',
        date: '01-01-01',
    })
    .setCommand('Install');
await resource2.save(); // the action will be executed but nothing will appear in the console.log, as we already installed the resource
await Action.trackActionAsPromise(resource2, [
    ActionState.SUCCESS,
    ActionState.ERROR,
]);

const resource3 = new MyGreetings()
    .setArgument({
        name: 'John Doe',
        date: '01-01-01',
    })
    .setCommand('Uninstall');
await resource3.save(); // the action will be executed ; "goodbye" will appear in the console
await Action.trackActionAsPromise(resource3, [
    ActionState.SUCCESS,
    ActionState.ERROR,
]);
```

## Next Steps

:::tip What's Next?
Here are three recommended next steps to continue your journey:

1. **👋 [Hello world example](./guides/hello-world.md)** - Build your first Orbits application with our step-by-step tutorial and see immediate results
2. **⚙️ [Core concepts](./core-concepts/readme.md)** - Master the fundamental architecture principles and design patterns that power Orbits
3. **🛤️ [Guides](./guides/readme.md)** - Explore hands-on tutorials ranging from beginner-friendly to advanced implementation techniques
:::
