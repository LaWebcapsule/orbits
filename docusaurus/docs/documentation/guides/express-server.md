---
sidebar_position: 4
---
# An express server over your agents

# Install

Install `@orbi-ts/core` and `@orbi-ts/fuel`.

```bash
npm install @orbi-ts/core @orbi-ts/fuel --save
```

Install it with yarn:

```bash
yarn add @orbi-ts/core @orbi-ts/fuel
```

# Write you first action

```ts title='src/orbits/my-action.ts'
import { Action } from '@orbi-ts/core';

export class MyAction extends Action {
    IArgument: {};

    IResult: {};

    main() {
        this.setResult('hello!');
        return ActionState.Success;
    }
}
```

# Import your action in your code

## Configure persistent storage

You will need a mongodb connection to store the state of your action.

Once you have a valid mongodb url, please create an `ActionRuntime` with the mongodb connection string.

```ts title='src/orbits/action-app.ts'
const db = {
    protocol: 'mongodb+srv',
    url: process.env['MONGO_URL'],
    name: 'orbits-test',
    connectQsParams: '?retryWrites=true&w=majority',
};

new ActionRuntime({
    db: {
        mongo: {
            url: `${db.protocol || 'mongodb'}://${db.url}/${db.name}${db.connectQsParams}`,
            opts: {},
        },
    },
});
```

## Consume the action in your app

For example, if you want to consume the action in an express server:

```ts
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/hello-world', async (req: Request, res: Response) => {
    const action = new MyAction();
    await action.save();
    return res.send(action);
});
```

## Track the state of your action

```ts title='src/orbits/app.ts'
import express, { Request, Response } from 'express';
import { Action, ActionState } from '@orbi-ts/core';

const app = express();
const port = 3000;

app.get('/hello-world', async (req: Request, res: Response) => {
    const action = new MyAction();
    await action.save();
    await Action.trackActionAsPromise(action, [
        ActionState.SUCCESS,
        ActionState.ERROR,
    ]);
    return res.send(action);
});
```

## Load your app

```ts title='src/server.ts'
import express, { Request, Response } from 'express';
import { Action, ActionRuntime, ActionState } from '@orbi-ts/core';

const app = express();
const port = 3000;

app.get('/hello-world', async (req: Request, res: Response) => {
    const action = new MyAction();
    await action.save();
    await Action.trackActionAsPromise(action, [
        ActionState.SUCCESS,
        ActionState.ERROR,
    ]);
    return res.send(action);
});

app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
    await ActionRuntime.activeRuntime;
    console.log(`orbits app is able to register actions`);
});
```
