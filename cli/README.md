# Orbits-cli

The CLI to run Orbits workflows.

## Install

### Requirements

- Node.js ≥ 20
- MongoDB configured with Replica Sets (can use [run-rs](https://github.com/vkarpov15/run-rs))
- [tsx](https://github.com/privatenumber/tsx) installed globally

#### Global install

```sh
$ npm install -g @orbi-ts/cli
```

#### Project install

```sh
$ npm install @orbi-ts/cli --save-dev
```

## Running it

```sh
$ orbits-cli actions <command> <parameters>
```

if you installed in your project, run:

```sh
$ npx orbits-cli actions <command> <parameters>
```

Available commands:

- `get [options] [action_id]`: Get the provided action, or all actions
- `get-registry [options] [actions_files...]`: Get available actions from the registry
- `watch [options] <action_id>`: Watch the provided action
- `run [options] <action_ref> [arguments...]`: Run the provided action
- `pause [options] <action_id>`: Update the database so that the provided action will pause
- `resume [options] <action_id>`: Only effective on workflows. Update the database so that the provided action will resume
- `replay [options] <action_id>`: Update the database so that the provided action will be replayed
- `set-bag <action_id> <bag>`: Update the action bag in the database. Merge existing bag with the given one
- `end [options] <action_id>`: Update the database so that the provided action will end

Run `orbits-cli help <command>` for more info about the command options and parameters.

> **Note:** Only the `run --local-worker` command will actually run the orbits job locally, other commands only update the action in the database.

#### Running an action locally

The `run --local-worker` commands allows you to run an action locally. Please make sure there is no other Orbits job using the same database as there may be conflicts.

#### Viewer

You can watch an action either using [blessed](https://github.com/chjj/blessed) based viewer or with a simpler text based alternative. In the former case, clicking on actions and workflows boxes will open an info panel with _Ref_, _State_, _ID_, _Arguments_, _Bag_ and _Result_ info that you can easily copy to clipboard by clicking on it.
