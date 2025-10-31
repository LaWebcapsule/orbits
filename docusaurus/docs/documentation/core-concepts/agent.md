---
title: Agent
sidebar_position: 3
---

# Agent documentation

A Agent is a specialized type of Workflow designed to orchestrate the lifecycle of real-world entities, such as cloud accounts, services, or data systems. Agents provide a declarative and persistent way to manage these entities through versioning, reconciliation, shared state, and scheduled verification.

Agents offer:

- Retroactive control loops;
- Shared workflow state via identity;
- Output reuse across executions;
- Hookable lifecycle stages: install, update, uninstall, and cycle.

## Write a Agent

A Agent is a `Workflow` with some specials behaviors.

### The `identity` of a agent

```ts
export class MyAgent extends Agent {
    IArgument: {
        accountId: string;
    };

    identity() {
        return this.argument.accountId;
    }
}
```

The identity() method defines a unique key for the agent. All agent instances with the same constructor and identity value will share the same database document, lifecycle state, and output.

This enables deduplication and stateful coordination between concurrent invocations.

#### Persistent storage for agents

Each agent is backed by a shared database document, accessible via the `agentDbDoc` property.
Some properties of the document are internal to the framework and should not be modified unless you know what you are doing.

#### Agent output

Each agent can define an output with the `setOutput` method.
Outputs are stored persistently and are available to other workflows or agent cycles.

```ts
export class MyAgent extends Agent {
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

Outputs can then be consumed by other workflows or agents:

```ts
export class MySecondAgent extends Agent {
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
            new MyAgent().setArgument({
                accountId: this.argument.accountId,
            }).getAgentOutput
        );
        await this.do('deploy', () => {
            return new Service(output).create();
        });
    }
}
```

### Agent lifecycle commands

Agents define lifecycle hooks. These correspond to specific `setCommand()` values and are executed based on state or schedule.

#### Install hook

```ts
export class MyAgent extends Agent {
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

- when the agent has never been installed before;
- when the version field changes;
- when explicitly triggered with `.setCommand("install")`.

#### Update

```ts
export class MyAgent extends Agent {
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
export class MyAgent extends Agent {
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

Agents support a `defineCycle()` method, triggered periodically to verify or reconcile the external-world state.

```ts
export class MyAgent extends Agent {
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

    defaultAgentSettings = {
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

- at the frequency stored in the `agentDbDoc`, under the path `cycle.frequency`. You can set a first value for this frequency using `defaultAgentSettings.cycle.frequency`.
- if you force the execution of the `cycle` step using `setCommand('cycle')`

By default, the `cycle` hook does nothing. A simple strategy can be, to ensure your agents are up-to-date, to launch a complete digestion hook.

```ts
export class MyAgent extends Agent {
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

    defaultAgentSettings = {
        cycle: {
            frequency: 10 * 60 * 1000, // the cycle hook will run every ten minutes
        },
    };

    async defineCycle() {
        await this.do('digest', this.agent); // launch a digest cycle
    }
}
```

#### Using agents in a workflow

You can execute a Agent like any other Workflow. Its default command is derived from current state (e.g. install or update):

```ts
export class MyWorkflow extends Workflow {
    define() {
        await this.do(
            'myAgent',
            new MyAgent().setArgument({ accountId })
        );
    }
}
```

Or force a specific command:

```ts
export class MyWorkflow extends Workflow {
    define() {
        this.do(
            'agentUpToDate',
            new MyAgent().setArgument({
                accountId: this.argument.accountId,
            })
        ).setCommand('update');
    }
}
```

#### Custom Hooks

In addition to the standard lifecycle hooks (install, update, uninstall, cycle), a `Agent` can expose custom hooks. These are useful when you want to support additional behaviors that do not fit into the predefined lifecycle.

To define a custom hook, you simply create a `defineX()` method, where `X` is the name of your custom command (starting with an uppercase letter):

```ts
export class MyAgent extends Agent {
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
    new MyAgent().setArgument({ accountId }).setCommand('syncPermissions')
);
```

Custom hooks allow agents to be extended with additional behaviors while still benefiting from identity-based deduplication and persistent state management.

:::info
Custom hook names must match the format `defineMyCommand`, and are called by passing "myCommand" to `setCommand()` (case-sensitive).
:::

### Convergent Execution (Coalescing)

When multiple identical agent instances (same constructor and identity) are triggered concurrently **with the same command**, the system ensures that only one execution runs. The other invocations will wait and reuse the result of the running instance.

This is known as coalescing, and it ensures consistency, reduces overhead, and prevents race conditions.

Example:

```ts
// ...some context
await this.do('my-agent', new Agent().setCommand('update'));
// ...some other context elsewhere, called in the same time
await this.do('my-agent', new Agent().setCommand('update'));
```

The two workflows want to run the `update` agent command.
Only one `update` agent command will be launched and the two workflows steps will have the same result.

### Divergent Execution (lock)

When multiple identical agent instances are triggered concurrently with _different commands_, only one will execute. The others will fail with a lock error to prevent command conflicts.

Example :

```ts
// ...some context
await this.do('my-agent', new Agent().setCommand('update'));
// ...some other context elsewhere, called in the same time
await this.do('my-agent', new Agent().setCommand('install')); // will be in error, as command 'update' is being executed.
```

The first workflow wants to run the `update` agent command.
The second workflow wants to run the `install` agent command.
In this case, the update command will proceed, and the install command will be rejected due to command incompatibility.

The set of mutually exclusive commands is defined in the `noConcurrencyCommandNames` property of the Agent class. When adding custom hooks, you should include them in this list if they require exclusivity.

:::info

_Best practices:_ Avoid manually specifying commands unless necessary. Let the agent determine the correct hook automatically.

```ts
// ...some context
await this.do('my-agent', new Agent());
// ...safely coalesce
await this.do('my-agent', new Agent());
```

:::

### Digest method

The `digest()` method determines which commands (hooks) should be executed based on the current state of the agent. It is called during each lifecycle cycle and can be customized when implementing advanced behavior.

Default implementation:

```ts
async digest(): Promise<ScopeOfChanges<string>[]> {
    const changes = [];
    if (this.agentDbDoc.version !== this.version) {
        changes.push(new ScopeOfChanges("install"));
    }
    if (this.agentDbDoc.version) {
        // meaning an install already occurred
        changes.push(new ScopeOfChanges("update"));
    }
    return changes;
  }
```
