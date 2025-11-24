
# Orbits CLI

CLI to interact with orbits actions.

## Commands

## `get`

Get the provided action, or all actions

**Usage**

```bash
orbits-cli actions get [options] [action_id]
```

#### Arguments

- `action_id`: ID of the action to get


#### Options

- `-f, --filter <filter>`: Filter values, in the format `key1=val1 key2=val2`
- `-o, --sort <sort>`: Sort values, in the format `key2=-1|1 key2=-1|1`
- `-j, --json`: Use json format

---
## `get-registry`

Get available actions from the registry

**Usage**

```bash
orbits-cli actions get-registry [options] [actions_files...]
```

#### Arguments

- `actions_files`: Path to files describing actions


#### Options

- `-a, --all`: Get all actions including base ones
- `-j, --json`: Use json format

---
## `watch`

Watch the provided action

**Usage**

```bash
orbits-cli actions watch [options] <action_id>
```

#### Arguments

- `action_id`: ID of the action to watch


#### Options

- `-i, --interval <interval>`: Time interval between status updates in seconds
- `-r, --no-refresh`: Do not refresh
- `-d, --depth <depth>`: Traverse up the tree by the specified depth
- `-s, --simple-viewer`: Print out simple actions graph instead of full viewer

---
## `run`

Run the provided action

**Usage**

```bash
orbits-cli actions run [options] <action_ref> [arguments...]
```

#### Arguments

- `action_ref`: Ref of the action to run
- `arguments`: Arguments for the action, in the format `arg1=val1 arg2=val2 json`


#### Options

- `-l, --local-worker`: Run with a local worker
- `-f, --actions-file <actions-file>`: File describing the actions. Will look for "`orbi.ts`" if not provided.
- `-w, --no-watch`: Do not watch progress
- `-c, --clean`: Remove created actions from database on exit
- `-g, --log-file <log-file>`: File for orbits logs
- `-b, --background`: Run Orbits job in background.
- `-k, --keep`: Keep Orbits job running after action is complete.
- `-i, --interval <interval>`: Time interval between status updates in seconds
- `-r, --no-refresh`: Do not refresh
- `-d, --depth <depth>`: Traverse up the tree by the specified depth
- `-s, --simple-viewer`: Print out simple actions graph instead of full viewer

---
## `pause`

Update the database so that the provided action will pause

**Usage**

```bash
orbits-cli actions pause [options] <action_id>
```

#### Arguments

- `action_id`: ID of the action to pause


#### Options

- `-d, --duration <duration>`: Duration to pause for, in seconds

---
## `resume`

Resume the provided action, either update the database or resume locally.

**Usage**

```bash
orbits-cli actions resume [options] <action_id>
```

#### Arguments

- `action_id`: ID of the action to resume


#### Options

- `-l, --local-worker`: Run with a local worker
- `-f, --actions-file <actions-file>`: File describing the actions. Will look for "`orbi.ts`" if not provided.
- `-w, --no-watch`: Do not watch progress
- `-g, --log-file <log-file>`: File for orbits logs
- `-i, --interval <interval>`: Time interval between status updates in seconds
- `-r, --no-refresh`: Do not refresh
- `-d, --depth <depth>`: Traverse up the tree by the specified depth
- `-s, --simple-viewer`: Print out simple actions graph instead of full viewer

---
## `replay`

Update the database so that the provided action will be replayed

**Usage**

```bash
orbits-cli actions replay [options] <action_id>
```

#### Arguments

- `action_id`: ID of the action to replay


#### Options

- `-p, --path-to-step <path-to-step...>`: For workflows, path to the step to replay from as a list of either steps indices or names:
`workflow1 subworkflow2 action3`
`0 1 2`
- `-w, --watch`: Watch progress
- `-i, --interval <interval>`: Time interval between status updates in seconds
- `-r, --no-refresh`: Do not refresh
- `-d, --depth <depth>`: Traverse up the tree by the specified depth
- `-s, --simple-viewer`: Print out simple actions graph instead of full viewer

---
## `set-bag`

Update the action bag in the database. Merge existing bag with the given one

**Usage**

```bash
orbits-cli actions set-bag [options] <action_id> <bag>
```

#### Arguments

- `action_id`: ID of the action
- `bag`: bag in json format



---
## `add-inputs`

Add inputs of type bag to the given WaitForInput action in the database. Overwrites current inputs values.

**Usage**

```bash
orbits-cli actions add-inputs [options] <action_id> <inputs>
```

#### Arguments

- `action_id`: ID of the action.
- `inputs`: inputs in json format



---
## `end`

Update the database so that the provided action will end

**Usage**

```bash
orbits-cli actions end [options] <action_id>
```

#### Arguments

- `action_id`: ID of the action to pause


#### Options

- `-s, --state <state>`: state to set the action in

