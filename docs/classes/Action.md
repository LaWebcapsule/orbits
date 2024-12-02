[@wbce/orbits](../README.md) / [Exports](../modules.md) / Action

# Class: Action

Structure actions.

Extends this class to build new actions behaviors.

## Hierarchy

- **`Action`**

  ↳ [`ResolveAction`](ResolveAction.md)

  ↳ [`RejectAction`](RejectAction.md)

  ↳ [`RollBackAction`](RollBackAction.md)

  ↳ [`Workflow`](Workflow.md)

## Table of contents

### Constructors

- [constructor](Action.md#constructor)

### Properties

- [IArgument](Action.md#iargument)
- [IBag](Action.md#ibag)
- [IResult](Action.md#iresult)
- [RollBackAction](Action.md#rollbackaction)
- [RollBackWorkflow](Action.md#rollbackworkflow)
- [app](Action.md#app)
- [dbDoc](Action.md#dbdoc)
- [executor](Action.md#executor)
- [isExecutorSet](Action.md#isexecutorset)
- [isInitialised](Action.md#isinitialised)
- [isInitialized](Action.md#isinitialized)
- [cronDefaultSettings](Action.md#crondefaultsettings)
- [defaultDelay](Action.md#defaultdelay)
- [defaultDelays](Action.md#defaultdelays)
- [permanentRef](Action.md#permanentref)

### Accessors

- [\_id](Action.md#_id)
- [argument](Action.md#argument)
- [bag](Action.md#bag)
- [cronActivity](Action.md#cronactivity)
- [isRollBackPossible](Action.md#isrollbackpossible)
- [repeat](Action.md#repeat)
- [result](Action.md#result)

### Methods

- [\_resume](Action.md#_resume)
- [activityLogs](Action.md#activitylogs)
- [changeState](Action.md#changestate)
- [checkMainExecutionDelay](Action.md#checkmainexecutiondelay)
- [createRollBackWorkflow](Action.md#createrollbackworkflow)
- [defineExecutor](Action.md#defineexecutor)
- [destroy](Action.md#destroy)
- [dynamicallyDefineFromWorkflowStep](Action.md#dynamicallydefinefromworkflowstep)
- [dynamiclyDefineFromWorfklowStep](Action.md#dynamiclydefinefromworfklowstep)
- [end](Action.md#end)
- [execute](Action.md#execute)
- [getLogs](Action.md#getlogs)
- [init](Action.md#init)
- [initialisation](Action.md#initialisation)
- [initialization](Action.md#initialization)
- [internalLog](Action.md#internallog)
- [internalLogError](Action.md#internallogerror)
- [main](Action.md#main)
- [onMainTimeout](Action.md#onmaintimeout)
- [onStateNotification](Action.md#onstatenotification)
- [quit](Action.md#quit)
- [resume](Action.md#resume)
- [resyncWithDb](Action.md#resyncwithdb)
- [rollBack](Action.md#rollback)
- [rollBackWatcher](Action.md#rollbackwatcher)
- [save](Action.md#save)
- [setArgument](Action.md#setargument)
- [setExecutor](Action.md#setexecutor)
- [setFilter](Action.md#setfilter)
- [setRepeat](Action.md#setrepeat)
- [setResult](Action.md#setresult)
- [watch](Action.md#watch)
- [watcher](Action.md#watcher)
- [\_constructFromDb](Action.md#_constructfromdb)
- [constructFromDb](Action.md#constructfromdb)
- [dynamicDefinitionFromWorkflowStep](Action.md#dynamicdefinitionfromworkflowstep)
- [reject](Action.md#reject)
- [resolve](Action.md#resolve)

## Constructors

### constructor

• **new Action**()

#### Defined in

[src/core/actions/src/action-manager.ts:158](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L158)

## Properties

### IArgument

• **IArgument**: `Object`

Action argument

#### Defined in

[src/core/actions/src/action-manager.ts:84](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L84)

___

### IBag

• **IBag**: `Object`

Action bag

#### Defined in

[src/core/actions/src/action-manager.ts:89](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L89)

___

### IResult

• **IResult**: `Object`

Action result

#### Defined in

[src/core/actions/src/action-manager.ts:94](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L94)

___

### RollBackAction

• **RollBackAction**: typeof [`Action`](Action.md) = `RollBackAction`

The action that rollback this action.

#### Defined in

[src/core/actions/src/action-manager.ts:868](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L868)

___

### RollBackWorkflow

• **RollBackWorkflow**: typeof [`Workflow`](Workflow.md) = `RevertAction`

Workflow that rollbacks the action.

Wait for action end then rollback.
Will use [RollBackAction](RollBackAction.md).

#### Defined in

[src/core/actions/src/action-manager.ts:876](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L876)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Defined in

[src/core/actions/src/action-manager.ts:27](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L27)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>

Action Database Document

#### Defined in

[src/core/actions/src/action-manager.ts:99](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L99)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Defined in

[src/core/actions/src/action-manager.ts:25](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L25)

___

### isExecutorSet

• **isExecutorSet**: `boolean` = `false`

#### Defined in

[src/core/actions/src/action-manager.ts:478](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L478)

___

### isInitialised

• **isInitialised**: `boolean` = `false`

**`Deprecated`**

use isInitialized

#### Defined in

[src/core/actions/src/action-manager.ts:450](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L450)

___

### isInitialized

• **isInitialized**: `boolean` = `false`

#### Defined in

[src/core/actions/src/action-manager.ts:451](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L451)

___

### cronDefaultSettings

▪ `Static` **cronDefaultSettings**: `Object`

Configure the frequency at which a cron will launch [resume](Action.md#resume).
It is also possible to dynamically modify the dbDoc.cronActivity property to modify the call to a cron.
If not set, this property will be 'inherited' from the first parent class where it is.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `activityFrequence?` | `number` | **`Deprecated`** use activityFrequency |
| `activityFrequency?` | `number` | TODO: set this as required after activityFrequence removal |

#### Defined in

[src/core/actions/src/action-manager.ts:67](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L67)

___

### defaultDelay

▪ `Static` **defaultDelay**: `number`

Shortcut to [[ActionState.IN_PROGRESS]](Action.md#defaultdelays).

If not set, this property will be 'inherited' from the first parent class where it is.

#### Defined in

[src/core/actions/src/action-manager.ts:34](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L34)

___

### defaultDelays

▪ `Static` **defaultDelays**: `Object`

For the states `ActionState.EXECUTING_MAIN` and `ActionState.IN_PROGRESS`,
this object configures the time after which, if no change happened, an action is considered in error.

For example, an action can only be in the `ActionState.IN_PROGRESS` state for as long as
`defaultDelays[ActionState.IN_PROGRESS]` time.

**`Default Value`**

```
{
   [ActionState.IN_PROGRESS] : this.defaultDelay,
   [ActionState.EXECUTING_MAIN] : 2*60*1000,
}
```

You should configure this if your actions have longer timeouts.

If not set, this property will be 'inherited' from the first parent class where it is.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `1` | `number` |
| `2` | `number` |

#### Defined in

[src/core/actions/src/action-manager.ts:55](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L55)

___

### permanentRef

▪ `Static` **permanentRef**: `string` \| `string`[]

Id of the action stored in database.
It should be a permanent id that designates the action instance.

#### Defined in

[src/core/actions/src/action-manager.ts:20](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L20)

## Accessors

### \_id

• `get` **_id**(): `this`[``"dbDoc"``][``"_id"``]

#### Returns

`this`[``"dbDoc"``][``"_id"``]

#### Defined in

[src/core/actions/src/action-manager.ts:150](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L150)

___

### argument

• `get` **argument**(): `this`[``"dbDoc"``][``"argument"``]

#### Returns

`this`[``"dbDoc"``][``"argument"``]

#### Defined in

[src/core/actions/src/action-manager.ts:114](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L114)

• `set` **argument**(`argument`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `argument` | `this`[``"dbDoc"``][``"argument"``] |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:118](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L118)

___

### bag

• `get` **bag**(): `this`[``"dbDoc"``][``"bag"``]

#### Returns

`this`[``"dbDoc"``][``"bag"``]

#### Defined in

[src/core/actions/src/action-manager.ts:105](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L105)

• `set` **bag**(`bag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bag` | `this`[``"dbDoc"``][``"bag"``] |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:109](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L109)

___

### cronActivity

• `get` **cronActivity**(): `this`[``"dbDoc"``][``"cronActivity"``]

#### Returns

`this`[``"dbDoc"``][``"cronActivity"``]

#### Defined in

[src/core/actions/src/action-manager.ts:141](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L141)

• `set` **cronActivity**(`cronActivity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cronActivity` | `this`[``"dbDoc"``][``"cronActivity"``] |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:145](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L145)

___

### isRollBackPossible

• `get` **isRollBackPossible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/core/actions/src/action-manager.ts:829](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L829)

___

### repeat

• `get` **repeat**(): `this`[``"dbDoc"``][``"repeat"``]

#### Returns

`this`[``"dbDoc"``][``"repeat"``]

#### Defined in

[src/core/actions/src/action-manager.ts:132](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L132)

• `set` **repeat**(`repeat`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `repeat` | `this`[``"dbDoc"``][``"repeat"``] |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:136](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L136)

___

### result

• `get` **result**(): `this`[``"dbDoc"``][``"result"``]

#### Returns

`this`[``"dbDoc"``][``"result"``]

#### Defined in

[src/core/actions/src/action-manager.ts:123](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L123)

• `set` **result**(`result`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `this`[``"dbDoc"``][``"result"``] |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:127](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L127)

## Methods

### \_resume

▸ **_resume**(): `any`

The function resumes the action by calling the appropriate function depending on the current
state of the action. It doesn't take into account the executor.

#### Returns

`any`

A promise. You can not rely on this to know when an action is finished.

#### Defined in

[src/core/actions/src/action-manager.ts:601](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L601)

___

### activityLogs

▸ **activityLogs**(`options`): `any`[] \| `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`any`[] \| `Promise`<`any`[]\>

#### Defined in

[src/core/actions/src/action-manager.ts:752](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L752)

___

### changeState

▸ **changeState**(`actionState`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionState` | [`ActionState`](../enums/ActionState.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/actions/src/action-manager.ts:640](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L640)

___

### checkMainExecutionDelay

▸ `Private` **checkMainExecutionDelay**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Defined in

[src/core/actions/src/action-manager.ts:511](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L511)

___

### createRollBackWorkflow

▸ **createRollBackWorkflow**(): [`Workflow`](Workflow.md)

Instantiate workflow that will rollback this action.

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/core/actions/src/action-manager.ts:881](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L881)

___

### defineExecutor

▸ **defineExecutor**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/core/actions/src/action-manager.ts:387](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L387)

___

### destroy

▸ `Private` **destroy**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Defined in

[src/core/actions/src/action-manager.ts:748](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L748)

___

### dynamicallyDefineFromWorkflowStep

▸ **dynamicallyDefineFromWorkflowStep**(`workflow`, `marker`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflow` | [`Workflow`](Workflow.md) |
| `marker` | `string` |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:297](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L297)

___

### dynamiclyDefineFromWorfklowStep

▸ **dynamiclyDefineFromWorfklowStep**(`workflow`, `marker`): `void`

**`Deprecated`**

use dynamicallyDefineFromWorkflowStep

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflow` | [`Workflow`](Workflow.md) |
| `marker` | `string` |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:293](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L293)

___

### end

▸ `Private` **end**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/core/actions/src/action-manager.ts:672](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L672)

___

### execute

▸ `Private` **execute**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/core/actions/src/action-manager.ts:346](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L346)

___

### getLogs

▸ **getLogs**(`options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.endTime?` | `number` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/core/actions/src/action-manager.ts:756](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L756)

___

### init

▸ **init**(): `Promise`<`any`\>

Initialize the action from the action stored in the database.

Example: In order to not store secrets in the database,
you can set a vault id in the argument
and retrieve the secret at the initialization of the action.

Example: You cannot store class object on the database.
If your action use complex object, they can be initialized here.

#### Returns

`Promise`<`any`\>

#### Defined in

[src/core/actions/src/action-manager.ts:383](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L383)

___

### initialisation

▸ **initialisation**(): `Promise`<`void`\>

**`Deprecated`**

use initialization

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/actions/src/action-manager.ts:456](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L456)

___

### initialization

▸ **initialization**(): `Promise`<`void`\>

Mainly used for workflows.
Can also complement init().
If it gets too complex, use hooks.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/actions/src/action-manager.ts:465](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L465)

___

### internalLog

▸ **internalLog**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:800](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L800)

___

### internalLogError

▸ **internalLogError**(`err`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:820](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L820)

___

### main

▸ **main**(): [`ActionState`](../enums/ActionState.md) \| `Promise`<[`ActionState`](../enums/ActionState.md)\>

This method should launched the main action process
It is called only one time.
It returns a state value.

#### Returns

[`ActionState`](../enums/ActionState.md) \| `Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Defined in

[src/core/actions/src/action-manager.ts:561](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L561)

___

### onMainTimeout

▸ **onMainTimeout**(): [`ActionState`](../enums/ActionState.md) \| `Promise`<[`ActionState`](../enums/ActionState.md)\>

Called in case of timeout in `ActionState.EXECUTING_MAIN` state.

It can return `ActionState.SLEEPING` if the process infers
that `main()` has not run and the action must be retried.

#### Returns

[`ActionState`](../enums/ActionState.md) \| `Promise`<[`ActionState`](../enums/ActionState.md)\>

a `ActionState` value.

#### Defined in

[src/core/actions/src/action-manager.ts:668](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L668)

___

### onStateNotification

▸ **onStateNotification**(`actionState?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `actionState` | [`ActionState`](../enums/ActionState.md) | `ActionState.UNKNOWN` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/actions/src/action-manager.ts:650](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L650)

___

### quit

▸ `Private` **quit**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/core/actions/src/action-manager.ts:722](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L722)

___

### resume

▸ **resume**(): `Promise`<`any`\>

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`<`any`\>

A promise. You can not rely on this to know when an action is finished.

#### Defined in

[src/core/actions/src/action-manager.ts:570](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L570)

___

### resyncWithDb

▸ **resyncWithDb**(): `Promise`<`void`\>

Update the current model instance with latest data from database

#### Returns

`Promise`<`void`\>

a promise that resolves when the document has been loaded

#### Defined in

[src/core/actions/src/action-manager.ts:312](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L312)

___

### rollBack

▸ **rollBack**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Shortcut to configure a rollback.
Will be encapsulated in a larger action

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Defined in

[src/core/actions/src/action-manager.ts:847](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L847)

___

### rollBackWatcher

▸ **rollBackWatcher**(): `Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

Shortcut to configure the watcher for the rollback.

#### Returns

`Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

#### Defined in

[src/core/actions/src/action-manager.ts:855](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L855)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Defined in

[src/core/actions/src/action-manager.ts:154](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L154)

___

### setArgument

▸ **setArgument**(`args`): `void`

Set the `argument` that will be stored in the database.
Once set, the argument of an action should not be modified.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Object` | The argument to set. |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:396](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L396)

___

### setExecutor

▸ `Private` **setExecutor**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/actions/src/action-manager.ts:479](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L479)

___

### setFilter

▸ **setFilter**(`filter`): `void`

Make filtering actions easier with the `filter` property.
These filters are stored in database with
the `filter` property and allow to search for
an action or a group of actions

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Object` |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:421](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L421)

___

### setRepeat

▸ **setRepeat**(`opts`): `void`

Configure the number of times an action is repeated.

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.4?` | `number` |
| `opts.5?` | `number` |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:406](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L406)

___

### setResult

▸ **setResult**(`result`): `void`

Set the action result.

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `Object` |

#### Returns

`void`

#### Defined in

[src/core/actions/src/action-manager.ts:430](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L430)

___

### watch

▸ `Private` **watch**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/core/actions/src/action-manager.ts:488](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L488)

___

### watcher

▸ **watcher**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Watch the action state.

It is called :
- potentially many times when the action is in `IN_PROGRESS` state
- one time if the action is in `EXECUTING_MAIN` state and the executing_main delay has expired.

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

promise

#### Defined in

[src/core/actions/src/action-manager.ts:443](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L443)

___

### \_constructFromDb

▸ `Static` **_constructFromDb**(`actionDb`): [`Action`](Action.md)

Construct an action from a document stored in the database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionDb` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> | a document coming from the database |

#### Returns

[`Action`](Action.md)

an action for which dbDoc property is equal to actionDb

#### Defined in

[src/core/actions/src/action-manager.ts:225](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L225)

___

### constructFromDb

▸ `Static` **constructFromDb**(`actionDb`): `Promise`<[`Action`](Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionDb` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`Promise`<[`Action`](Action.md)\>

#### Defined in

[src/core/actions/src/action-manager.ts:245](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L245)

___

### dynamicDefinitionFromWorkflowStep

▸ `Static` **dynamicDefinitionFromWorkflowStep**(`dbDoc`): `Promise`<[`Action`](Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbDoc` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`Promise`<[`Action`](Action.md)\>

#### Defined in

[src/core/actions/src/action-manager.ts:253](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L253)

___

### reject

▸ `Static` **reject**(`result?`): [`RejectAction`](RejectAction.md)

Return a new [RejectAction](RejectAction.md) object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result?` | `any` | action result |

#### Returns

[`RejectAction`](RejectAction.md)

new `RejectAction`instance

#### Defined in

[src/core/actions/src/action-manager.ts:340](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L340)

___

### resolve

▸ `Static` **resolve**(`result?`): [`ResolveAction`](ResolveAction.md)

Return a new [ResolveAction](ResolveAction.md) object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result?` | `any` | action result |

#### Returns

[`ResolveAction`](ResolveAction.md)

new `ResolveAction`instance

#### Defined in

[src/core/actions/src/action-manager.ts:329](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-manager.ts#L329)
