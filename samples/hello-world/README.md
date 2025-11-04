# Hello world example

A sample agent that say you hello!
Can be useful to help you write your first actions.

## Install dependencies

### Install npm dependencies

- `npm i`

## Launch the app

Export your DB URL:

```bash
export ORBITS_DB__MONGO__URL=your-mongo-url
```

Then:

```bash
orbits-cli actions run GreetingAgent name='John Doe' date=$(date '+%Y-%m-%d') -f src/orbits/orbi.ts --local-worker
```

or run:

```bash
npx tsx src/orbits/orbi.ts
```

## Relaunch the app

If your relaunch the app a second time the same day, you should see that your agent still knows if it's already greeted you or not.
