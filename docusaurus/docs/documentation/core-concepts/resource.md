---
title: Resource
sidebar_position: 3
---

# Resource documentation

A Resource is a specialized type of Workflow designed to orchestrate the lifecycle of real-world entities, such as cloud accounts, services, or data systems. Resources provide a declarative and persistent way to manage these entities through versioning, reconciliation, shared state, and scheduled verification.

Resources offer:

- Retroactive control loops;
- Shared workflow state via identity;
- Output reuse across executions;
- Hookable lifecycle stages: install, update, uninstall, and cycle.

## Write a Resource

A Resource is a `Workflow` with some specials behaviors.

### The `identity` of a resource

```ts
export class MyResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }
}
```

The identity() method defines a unique key for the resource. All resource instances with the same constructor and identity value will share the same database document, lifecycle state, and output.

This enables deduplication and stateful coordination between concurrent invocations.

#### Persistent storage for resources

Each resource is backed by a shared database document, accessible via the `resourceDbDoc` property.
Some properties of the document are internal to the framework and should not be modified unless you know what you are doing.

#### Resource output

Each resource can define an output with the `setOutput` method.
Outputs are stored persistently and are available to other workflows or resource cycles.

```ts
export class MyResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }

    setOutput() {
        return {
            x: 1,
        };
    }
}
```

Outputs can then be consumed by other workflows or resources:

```ts
export class MySecondResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }

    setOutput() {
        return {
            x: 1,
        };
    }

    async defineUpdate() {
        const output = await this.do(
            'get-output',
            new MyResource().setArgument({
                accountId: this.argument.accountId,
            }).getResourceOutput
        );
        await this.do('deploy', () => {
            return new Service(output).create();
        });
    }
}
```

### Resource lifecycle commands

Resources define lifecycle hooks. These correspond to specific `setCommand()` values and are executed based on state or schedule.

#### Install hook

```ts
export class MyResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }

    version = '1.0.0';

    async defineInstall() {
        const myAccount = new Account();
        await this.do('bootstrap', myAccount);
    }
}
```

`defineInstall` runs:

- when the resource has never been installed before;
- when the version field changes;
- when explicitly triggered with `.setCommand("install")`.

#### Update

```ts
export class MyResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }

    version = '1.0.0';

    async defineInstall() {
        const myAccount = new Account();
        await this.do('bootstrap', myAccount);
    }

    async defineUpdate() {
        const service = new Service().setArgument({
            accountId: this.argument.accountId,
        });
        await this.do('launchService', service);
    }
}
```

`defineUpdate` runs:

- every time a default execution runs;
- if you force the execution of the `update` step using `.setCommand('update')`

#### Uninstall

```ts
export class MyResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }

    version = '1.0.0';

    async defineInstall() {
        const myAccount = new Account();
        await this.do('bootstrap', myAccount);
    }

    async defineUpdate() {
        const service = new Service().setArgument({
            accountId: this.argument.accountId,
        });
        await this.do('launchService', () => {
            return service.create();
        });
    }

    async defineUninstall() {
        const service = new Service().setArgument({
            accountId: this.argument.accountId,
        });
        await this.do('launchService', () => {
            return service.delete();
        });
    }
}
```

`defineUninstall()` runs only if explicitly triggered with `.setCommand("uninstall")`

#### Cycle

Resources support a `defineCycle()` method, triggered periodically to verify or reconcile the external-world state.

```ts
export class MyResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }

    version = '1.0.0';

    async defineInstall() {
        const myAccount = new Account();
        await this.do('bootstrap', myAccount);
    }

    async defineUpdate() {
        const service = new Service().setArgument({
            accountId: this.argument.accountId,
        });
        await this.do('launchService', () => {
            return service.create();
        });
    }

    async defineUninstall() {
        const service = new Service().setArgument({
            accountId: this.argument.accountId,
        });
        await this.do('launchService', () => {
            return service.delete();
        });
    }

    defaultResourceSettings = {
        cycle: {
            frequency: 10 * 60 * 1000, // the cycle hook will run every ten minutes
        },
    };

    async defineCycle() {
        // by default do nothing
    }
}
```

The `cycle` hook is called:

- at the frequency stored in the `resourceDbDoc`, under the path `cycle.frequency`. You can set a first value for this frequency using `defaultResourceSettings.cycle.frequency`.
- if you force the execution of the `cycle` step using `setCommand('cycle')`

By default, the `cycle` hook does nothing. A simple strategy can be, to ensure your resources are up-to-date, to launch a complete digestion hook.

```ts
export class MyResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }

    version = '1.0.0';

    async defineInstall() {
        const myAccount = new Account();
        await this.do('bootstrap', myAccount);
    }

    async defineUpdate() {
        const service = new Service().setArgument({
            accountId: this.argument.accountId,
        });
        await this.do('launchService', () => {
            return service.create();
        });
    }

    async defineUninstall() {
        const service = new Service().setArgument({
            accountId: this.argument.accountId,
        });
        await this.do('launchService', () => {
            return service.delete();
        });
    }

    defaultResourceSettings = {
        cycle: {
            frequency: 10 * 60 * 1000, // the cycle hook will run every ten minutes
        },
    };

    async defineCycle() {
        await this.do('digest', this.resource); // launch a digest cycle
    }
}
```

#### Using resources in a workflow

You can execute a Resource like any other Workflow. Its default command is derived from current state (e.g. install or update):

```ts
export class MyWorkflow extends Workflow {
    define() {
        await this.do(
            'myResource',
            new MyResource().setArgument({ accountId })
        );
    }
}
```

Or force a specific command:

```ts
export class MyWorkflow extends Workflow {
    define() {
        this.do(
            'resourceUpToDate',
            new MyResource().setArgument({
                accountId: this.argument.accountId,
            })
        ).setCommand('update');
    }
}
```

#### Custom Hooks

In addition to the standard lifecycle hooks (install, update, uninstall, cycle), a `Resource` can expose custom hooks. These are useful when you want to support additional behaviors that do not fit into the predefined lifecycle.

To define a custom hook, you simply create a `defineX()` method, where `X` is the name of your custom command (starting with an uppercase letter):

```ts
export class MyResource extends Resource {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }

    async defineSyncPermissions() {
        await this.do(
            'syncIAM',
            new SyncIAMWorkflow().setArgument({
                accountId: this.argument.accountId,
            })
        );
    }
}
```

To invoke this hook, use `.setCommand("syncPermissions")` from any workflow:

```ts
await this.do(
    'res',
    new MyResource().setArgument({ accountId }).setCommand('syncPermissions')
);
```

Custom hooks allow resources to be extended with additional behaviors while still benefiting from identity-based deduplication and persistent state management.

:::info
Custom hook names must match the format `defineMyCommand`, and are called by passing "myCommand" to `setCommand()` (case-sensitive).
:::

### Convergent Execution (Coalescing)

When multiple identical resource instances (same constructor and identity) are triggered concurrently **with the same command**, the system ensures that only one execution runs. The other invocations will wait and reuse the result of the running instance.

This is known as coalescing, and it ensures consistency, reduces overhead, and prevents race conditions.

Example:

```ts
// ...some context
await this.do('my-resource', new Resource().setCommand('update'));
// ...some other context elsewhere, called in the same time
await this.do('my-resource', new Resource().setCommand('update'));
```

The two workflows want to run the `update` resource command.
Only one `update` resource command will be launched and the two workflows steps will have the same result.

### Divergent Execution (lock)

When multiple identical resource instances are triggered concurrently with _different commands_, only one will execute. The others will fail with a lock error to prevent command conflicts.

Example :

```ts
// ...some context
await this.do('my-resource', new Resource().setCommand('update'));
// ...some other context elsewhere, called in the same time
await this.do('my-resource', new Resource().setCommand('install')); // will be in error, as command 'update' is being executed.
```

The first workflow wants to run the `update` resource command.
The second workflow wants to run the `install` resource command.
In this case, the update command will proceed, and the install command will be rejected due to command incompatibility.

The set of mutually exclusive commands is defined in the `noConcurrencyCommandNames` property of the Resource class. When adding custom hooks, you should include them in this list if they require exclusivity.

:::info

_Best practices:_ Avoid manually specifying commands unless necessary. Let the resource determine the correct hook automatically.

```ts
// ...some context
await this.do('my-resource', new Resource());
// ...safely coalesce
await this.do('my-resource', new Resource());
```

:::

### Digest method

The `digest()` method determines which commands (hooks) should be executed based on the current state of the resource. It is called during each lifecycle cycle and can be customized when implementing advanced behavior.

Default implementation:

```ts
async digest(): Promise<ScopeOfChanges<string>[]> {
    const changes = [];
    if (this.resourceDbDoc.version !== this.version) {
        changes.push(new ScopeOfChanges("install"));
    }
    if (this.resourceDbDoc.version) {
        // meaning an install already occurred
        changes.push(new ScopeOfChanges("update"));
    }
    return changes;
  }
```
