# Docker executor

The Docker executor is useful for running an action on the same machine while providing full isolation within a Docker container.
It’s also handy when you want to use the same TypeScript code with additional utilities available inside the container.


## Installation

The `DockerExecutor` construct is part of the `@wbce/orbits-fuel` package.
You need to install it first:
```bash
npm install  @wbce/orbits-fuel
```
Then import it : 
```typescript
import {DockerExecutor} from "@wbce/orbits-fuel
```

## Usage

Attach the DockerExecutor to an action

```typescript
export class MyAction extends Action{
    
    setExecutor(){
        return new DockerExecutor({
            registry: 'node:22'
        })
    }
}
```

## Configuration

### Docker Registry

The Docker executor can use any registry.

```typescript
new DockerExecutor({
      registry: {
        url: 'node:22',
        tag: 'latest',
        getCredentials : async ()=>{
            //find the registry if needed
        }
      }
})
```

:::warn
When using your own images, make sure Node.js and TypeScript are installed.
:::

### Docker config

You can override the Docker configuration via the dockerConfig property. This is useful to add environment variables or mount local volumes.

**Example**
```typescript
new DockerExecutor({
      //...
      dockerConfig: {
        env: {
          "TEST": "true"
        },
      }
})
```



