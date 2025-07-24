---
sidebar_position: 0.2
title: Hello world
---

# Hello world example

A practical example to help you write your first application using Orbits.

## Scope

In this example, we’ll create a simple “hello-world” application. The behavior is straightforward:

- After 10 AM, say hello.
- Say hello only once per day.
- Say goodbye when the resource is uninstalled.

## Prerequisites

### Clone this repository

- Clone [this repository](https://github.com/LaWebcapsule/orbits)
- Go to this directory:

```bash
cd samples/hello-world
```

- Install node.js dependencies:
  `npm i`

## Project Structure

```bash
├── src/
│   └── orbits/
│       └── orbi.ts # main orchestration script
│       ├── greetings-resource.ts # the resource that orchestrates the lifecycle of greetings
│       ├── hello-action.ts # an action that waits 10 am and outputs hello
│       └── hello-workflow.ts # a workflow that takes a name as parameter and outputs "hello ${name}"
├── package.json
└── README.md
```

## The Hello Action

```ts title="src/orbits/hello-action.ts"
import { Action, ActionState } from '@orbi-ts/core';

export class HelloAction extends Action {
    main() {
        console.log('Hello 👋');
        this.setResult('Hello');
        return ActionState.SUCCESS;
    }
}
```

This simple action logs a greeting and completes immediately.

The `main()` method is the entry point for the action and is guaranteed to run exactly once — even across retries or resumptions. This ensures predictable and idempotent side effects.

## The Hello Workflow

```ts title="src/orbits/hello-workflow"
import { Workflow } from '@orbi-ts/core';
import { HelloAction } from './hello-action.ts';

export class HelloWorkflow extends Workflow {
    declare IResult: string;

    declare IArgument: {
        name: string;
    };

    async define() {
        const prefix = await this.do('hello', new HelloAction());
        const suffix = await this.do('name', () => {
            return Promise.resolve(this.argument.name);
        });
        return `${prefix} ${suffix}`;
    }
}
```

### Type declarations

```ts
declare;
IResult: string;

declare;
IArgument: {
    name: string;
}
```

- `IResult` defines the return type of the workflow.
- `IArgument` defines the expected input arguments.

```ts
const result = await this.do('hello', new HelloWorkflow()); // `result` is typed as string
```

```ts
new HelloWorkflow().setArgument({ name: 'Alice' }); // type-checked argument
```

### `Define()` method

The `define()` method describes the logic of the workflow and must use `this.do()` for any asynchronous operations. Directly using raw promises is discouraged.

Example illustrating execution behavior:

```ts
async define() {
    console.log("Called multiple times");
    await this.do("log", () => {
        console.log("Called only once");
        return Promise.resolve();
    });
}
```

This approach aligns with the [SAGA principle](https://microservices.io/patterns/data/saga.html).
See the [Orbits Core documentation](./../core-concepts/workflow.md#the-do-method) for more on `this.do()`

### Result

At the end of `define()`, we return a string which becomes the result of the workflow.

## The Greetings Resources

```ts title='src/orbits/greeting-resource.ts'
export class GreetingResource extends Resource {
    declare IResult: string;

    declare IArgument: {
        name: string;
        date: string;
    } & Resource['IArgument'];

    identity() {
        return `${this.argument.name}-${this.argument.date}`;
    }

    async defineInstall() {
        const greeting = await this.do(
            'greeting',
            new HelloWorkflow().setArgument({
                name: this.argument.name,
            })
        );
        await this.do('display-greeting', () => {
            console.log(`${greeting}  👋👋👋`);
            return Promise.resolve();
        });
    }

    async defineUpdate() {
        //do nothing
        console.log(`(I have already seen you.)👻`);
    }

    async defineUninstall() {
        await this.do('display-goodbye', () => {
            console.log(`Goodbye my dear friend ${this.argument.name} 👋👋👋`);
            return Promise.resolve();
        });
    }
}
```

### Type declarations

```ts
declare IResult: string;

declare IArgument: {
    name: string;
    date: string
} & Resource["IArgument"]
```

Same as for workflows, this enables type checking and autocompletion.

### `Identity` method

The `identity()` method uniquely identifies a resource instance.
If two instances share the same identity, they refer to the same real-world object and will share state.

```ts
identity() {
    return `${this.argument.name}-${this.argument.date}`;
}
```

That means that a greeting resource is unique by name and by date.

### Install hook

Runs once when the resource is first created.

```ts
async defineInstall() {
    const greeting = await this.do(
        'greeting',
        new HelloWorkflow().setArgument({
            name: this.argument.name,
        })
    );
    await this.do('display-greeting', () => {
        console.log(`${greeting}  👋👋👋`);
        return Promise.resolve();
    });
}
```

### Update hook

```ts
async defineUpdate() {
    //do nothing
    console.log(`(I have already seen you.)👻`);
}
```

Runs every time the resource is reused with the same identity.

### Uninstall hook

```ts
async defineUninstall() {
    await this.do('display-goodbye', () => {
        console.log(`Goodbye my dear friend ${this.argument.name} 👋👋👋`);
        return Promise.resolve();
    });
}
```

To trigger it:

```ts
    new GreetingResource().setArgument(...).setCommand('Uninstall');
```

### Go further: cycle hook

We don't use it in our sample, but resources offer the possibility to launch a cycle command at fixed intervals.
This can be useful for recurring tasks like polling, cleanup, or reporting.
Please [see the documentation](./../core-concepts/resource.md#cycle) to learn more.

## Orbi.ts

In orbi.ts, we do:

```ts title="src/orbits/orbi.ts"
import { Action, ActionRuntime, ActionState } from '@orbi-ts/core';
import { GreetingResource } from './greetings-resource.ts';

ActionRuntime.activeRuntime.waitForBootstrap.then(async () => {
    const greetingOfTheDay = new GreetingResource().setArgument({
        name: 'John Doe',
        date: String(new Date().toISOString().split('T')[0]),
    });
    greetingOfTheDay.save();
    await Action.trackActionAsPromise(greetingOfTheDay, [
        ActionState.SUCCESS,
        ActionState.ERROR,
    ]);

    const greetingOfTheDay2 = new GreetingResource().setArgument({
        name: 'John Doe',
        date: String(new Date().toISOString().split('T')[0]),
    });
    greetingOfTheDay2.save();
    await Action.trackActionAsPromise(greetingOfTheDay2, [
        ActionState.SUCCESS,
        ActionState.ERROR,
    ]);
});
```

We launch the same Resource twice.
This shows evidence that:

- during the first run, you will see greeting in console.log
- during the second run, you will only see the "I have already seen you" console.log

## Running the sample

### Run the Script

```bash
export ORBITS_MONGO__URL="your-mongo-cluster"
npx tsx src/orbits/orbi.ts
```

Expected Output

- First run: logs the greeting
- Subsequent runs: logs "I have already seen you"

### Run the uninstall command

Edit `orbi.ts`:

```ts title="src/orbits/orbi.ts"
ActionRuntime.activeRuntime.waitForBootstrap.then(async () => {
    const greetingOfTheDay = new GreetingResource().setArgument({
        name: "John Doe",
        date: String(new Date().toISOString().split("T")[0])
    }).setCommand("Uninstall")
    greetingOfTheDay.save();
)
```

Then run:

```bash
export ORBITS_MONGO__URL="your-mongo-cluster"
npx tsx src/orbits/orbi.ts
```

You should see the goodbye message in the console.

## Next Steps

:::tip What's Next?
Here are three recommended next steps to continue your journey:

1. **🧩 [Cross-account cdk examples](./cross-account-cdk.md)** - Show how to use infrastructure templates in conjunction with orbits
2. **⚙️ [Core concepts](../core-concepts/readme.md)** - Master the fundamental architecture principles and design patterns that power Orbits
3. **🛤️ [Guides](./readme.md)** - Explore hands-on tutorials ranging from beginner-friendly to advanced implementation techniques
:::
