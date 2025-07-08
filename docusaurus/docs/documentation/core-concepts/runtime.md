---
title: Environment variables and runtime
sidebar_position: 4
---
# Configure your runtime

> **Advanced Feature**  
> This section describes advanced usage of Orbits runtime. Use it if you're customizing how your runtime initializes or need precise control over bootstrapping.

The runtime is responsible for establishing the database connection, configuring logging, and preparing the environment to run your Actions and Workflows. It's the central bootstrap point for any Orbits-based application.

<img src="/img/singe_runtime.png" alt="Workflow Orbits"/>

## Bootstrapping processus

- Generates the [Action catalog](#actions-registry)
- Connects to the database
- Configures logging
- Launches the `ActionJob` cron

You can control many of these behaviors through environment variables. See [Customizing Environment Values](#customizing-environment-values) for more details.

### Waiting for Bootstrap Completion

After instantiating the runtime, you can expliclty wait for the bootstrapping process to complete before creating Actions or Resources:
To wait for the end of the bootstrapping process, you can consume the `ActionRuntime.waitForActiveRuntime` promise. Then, you are ready to save your first Action !

```typescript title="src/index.ts"
ActionRuntime.activeRuntime.waitForActiveRuntime.then(() => {
    const action = new MyAction();
    action.save();
})
```

:::info
Actions automatically wait for runtime bootstrapping before being saved.
The following pattern is therefore equivalent, though less explicit:

```typescript title="src/index.ts"
ActionRuntime.activeRuntime.waitForActiveRuntime.then(() => {
    const action = new MyAction();
    action.save();
})
```

:::

:::warning

Be cautious when creating Actions directly after bootstrap. If multiple processes run this script simultaneously or if the same script is run multiple times, duplicate Actions will be created. This is typically not the desired behavior.Instead, use Resources, which properly manage their lifecycle hooks:

```typescript
ActionRuntime.waitForActiveRuntime.then(()=>{
    const resource = new MyResource();
    resource.save();
})
```

In general:

- you will set a new Action via an external api call
- you can programmatically set a new Resource after the app has been bootstrapped

:::

### Recommended Project Structure

You can bootstrap the runtime anywhere you want in your codebase.
However, we recomend using this pattern : 
- in the `orbits` folder, only write and export classes
- create an `orbi.ts` file at the root of your orbit runtime folder
- import your `orbi.ts` file from your `index.ts`


```bash
my-project/
├── src/
│   ├── orbits/
│   │   ├── orbi.ts
│   │   ├── my-action.ts
│   │   ├── my-workflow.ts
│   └── index.ts
└── package.json
```

#### Main entrypoint (`index.ts`)

Import the bootstrap file in your main entry point and wait for the runtime to be ready:

```typescript title='src/index.ts'
import './orbits/orbi.js'
import { ActionRuntime } from '@wbce/orbits-core'

// Your runtime context
async function main() {
    await ActionRuntime.waitForActiveRuntime
    
    // Your runtime logic here
}

main().catch(console.error)

```

### Ensuring Action Discoverability

For complex runtimes (e.g. using executors), ensure your Actions are discoverable by the runtime through proper import chains.
The discovery of actions is done through a recursive import algorithm.


#### Recursive import

Structure your imports so the runtime can discover all Actions through the dependency chain:

```typescript title='src/orbits/my-action.ts'
//ensure you export the action
export class MyAction extends Action{
    //....
}
```

```typescript title='src/orbits/my-workflow.ts'
// Import and use the action
import {MyAction} from "./my-action.ts"

export class MyWorkflow extends Workflow{
    //....
}
```

```typescript title='src/orbits/orbi.ts'
// Import workflow, which imports action, ensuring discoverability
import "./my-workflow.ts"
//...
new ActionRuntime({
    db: {
        mongo: {
            url: 'mongodb://localhost:27017/example'
        }
    }
})
```

:::warning

**Bad Pattern - Action Not Discoverable**

```typescript title='src/orbits/my-workflow.ts'
// ❌ MySecondAction is not exported
class MySecondAction extends Action {
   // Action implementation
}

export class MyWorkflow extends Workflow {
   define() {
       // ...something
       await this.do("second-step", new MySecondAction()); // ❌ MySecondAction is not exported, so it won't be registered in the runtime catalog
   }
}
```

Even if MySecondAction is only consumed by MyWorkflow, you should export it.
:::

### Customizing environment values
You can configure the runtime through environment variables. These are especially useful for deployment environments or fine-tuning runtime behavior.

Here are some commonly used variables:

|  Variable 	|  Description 	| Default  	|
|---	|------	|---	|
| ORBITS_DB__MONGO__URL   	| the url to connect to mongodb  	| `mongodb://localhost:27017/orbits`  	|
|   ORBITS_WORKERS__QUANTITY	| the number of `ActionJob` that will be launched  	|  `3` 	|
|   ORBITS_LOGGING__LEVEL	| the level that will be use by the logger to filter the log  	|  `info` 	|



## Under the hood

### ActionRuntime and Actions Catalog

ActionRuntime maintains two special properties: `actionsRegistry` and `invertedActionsRegistry`.

#### Actions Registry

The `actionsRegistry` serves as the catalog of all `Actions` available in your runtime. This registry is crucial for the runtime's ability to execute workflows and actions dynamically.


#### How Action Resolution Works

When a worker encounters a workflow in a pending state or an action waiting for execution, it must map database documents back to their corresponding action constructors. Here's the process:

1. **Database Storage**: The database stores only a reference to the constructor, not the actual code
2. **Reference Types**: This reference can be either:
  - The name of the constructor class
  - The static `permanentRef` property of the ActionConstructor
3. **Constructor Resolution**: The worker uses this reference to look up the actual constructor in the `actionsRegistry`
4. **Execution**: Once resolved, the worker can instantiate the action and call its `main` function

#### Why Action Discovery Matters

If ActionRuntime cannot discover your action constructor during bootstrap, the following problems occur:

- The action won't be added to the `actionsRegistry`
- Workers cannot resolve database references to action constructors
- Runtime errors are thrown when attempting to execute the action
- Workflows that depend on the action will fail

This is why proper action registration through exports and imports is essential for runtime functionality.
