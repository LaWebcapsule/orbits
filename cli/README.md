# Orbits-cli

The CLI to run Orbits workflows.

## Install

### Requirements

- Node.js ≥ 20
- MongoDB configured with Replica Sets (can use [run-rs](https://github.com/vkarpov15/run-rs))
- [tsx](https://github.com/privatenumber/tsx) installed globally

#### Global install

```sh
$ npm install -g @orbi-ts/orbits-cli
```

#### Project install

```sh
$ npm install @orbi-ts/orbits-cli --save-dev
```

## Running it

```sh
$ orbits-cli <command> <parameters>
```

if you installed in your project, run:

```sh
$ npx orbits-cli <command> <parameters>
```

Available commands:

- `run <path_to_action> [...argumensts]`: Run the provided action/workflow with arguments given as parameters;
- `watch <action_id>`: Watch the provided action;
- `replay <action_id>`: Update database so that action will be replayed;
- `pause <action_id>`: Update database so that the given action will be paused;
- `resume <action_id>`: Update database so that the given action will resume.

Run `orbits-cli help <command>` for more info about the command options and parameters.

> **Note:** Only the `run` command will actually run the orbits job locally, other commands only update the action in the database.

#### Running an action locally

The `run` commands allows you to run an action locally. In order to do so, you need to export your action and an Orbits app that declares it. If no named export is provided, the `run` commands will look for default exports `action` and `app`.

#### Viewer

You can watch an action either using [blessed](https://github.com/chjj/blessed) based viewer or with a simpler text based alternative. In the former case, clicking on actions and workflows boxes will open an info panel with _Ref_, _State_, _ID_, _Arguments_ and _Result_ info that you can easily copy to clipboard by clicking on it.
