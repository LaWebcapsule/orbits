# Docker executor

The Docker executor is useful for running an action on the same machine while providing full isolation within a Docker container.
It’s also handy when you want to use the same TypeScript code with additional utilities available inside the container.

## Installation

The `DockerExecutor` construct is part of the `@orbi-ts/fuel` package.
You'll need to install it first:

```bash
npm install @orbi-ts/fuel
```

Then import it :

```ts
import { DockerExecutor } from '@orbi-ts/fuel';
```

## Usage

Attach the DockerExecutor to an action

```ts
export class MyAction extends Action {
    setExecutor() {
        return new DockerExecutor({
            registry: 'node:22',
        });
    }
}
```

## Configuration

### Docker Registry

The Docker executor can use any registry.

```ts
new DockerExecutor({
    registry: {
        url: 'node:22',
        tag: 'latest',
        getCredentials: async () => {
            //find the registry if needed
        },
    },
});
```

:::warning
When using your own images, make sure Node.js and TypeScript are installed.
:::

### Docker config

You can override the Docker configuration via the `dockerConfig` property. This is useful to add environment variables or mount local volumes.

**Example**

```ts
new DockerExecutor({
    //...
    dockerConfig: {
        env: {
            TEST: 'true',
        },
    },
});
```
