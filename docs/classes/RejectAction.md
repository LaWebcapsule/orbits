[@wbce/orbits](../README.md) / [Exports](../modules.md) / RejectAction

# Class: RejectAction

Action that resolve in ERROR state

## Hierarchy

- [`Action`](Action.md)

  ↳ **`RejectAction`**

## Table of contents

### Constructors

- [constructor](RejectAction.md#constructor)

### Properties

- [IArgument](RejectAction.md#iargument)
- [IBag](RejectAction.md#ibag)
- [IResult](RejectAction.md#iresult)
- [RollBackAction](RejectAction.md#rollbackaction)
- [RollBackWorkflow](RejectAction.md#rollbackworkflow)
- [app](RejectAction.md#app)
- [dbDoc](RejectAction.md#dbdoc)
- [executor](RejectAction.md#executor)
- [isExecutorSet](RejectAction.md#isexecutorset)
- [isInitialised](RejectAction.md#isinitialised)
- [isInitialized](RejectAction.md#isinitialized)
- [cronDefaultSettings](RejectAction.md#crondefaultsettings)
- [defaultDelay](RejectAction.md#defaultdelay)
- [defaultDelays](RejectAction.md#defaultdelays)
- [permanentRef](RejectAction.md#permanentref)

### Accessors

- [\_id](RejectAction.md#_id)
- [argument](RejectAction.md#argument)
- [bag](RejectAction.md#bag)
- [cronActivity](RejectAction.md#cronactivity)
- [isRollBackPossible](RejectAction.md#isrollbackpossible)
- [repeat](RejectAction.md#repeat)
- [result](RejectAction.md#result)

### Methods

- [\_resume](RejectAction.md#_resume)
- [activityLogs](RejectAction.md#activitylogs)
- [changeState](RejectAction.md#changestate)
- [createRollBackWorkflow](RejectAction.md#createrollbackworkflow)
- [defineExecutor](RejectAction.md#defineexecutor)
- [dynamicallyDefineFromWorkflowStep](RejectAction.md#dynamicallydefinefromworkflowstep)
- [dynamiclyDefineFromWorfklowStep](RejectAction.md#dynamiclydefinefromworfklowstep)
- [getLogs](RejectAction.md#getlogs)
- [init](RejectAction.md#init)
- [initialisation](RejectAction.md#initialisation)
- [initialization](RejectAction.md#initialization)
- [internalLog](RejectAction.md#internallog)
- [internalLogError](RejectAction.md#internallogerror)
- [main](RejectAction.md#main)
- [onMainTimeout](RejectAction.md#onmaintimeout)
- [onStateNotification](RejectAction.md#onstatenotification)
- [resume](RejectAction.md#resume)
- [resyncWithDb](RejectAction.md#resyncwithdb)
- [rollBack](RejectAction.md#rollback)
- [rollBackWatcher](RejectAction.md#rollbackwatcher)
- [save](RejectAction.md#save)
- [setArgument](RejectAction.md#setargument)
- [setFilter](RejectAction.md#setfilter)
- [setRepeat](RejectAction.md#setrepeat)
- [setResult](RejectAction.md#setresult)
- [watcher](RejectAction.md#watcher)
- [\_constructFromDb](RejectAction.md#_constructfromdb)
- [constructFromDb](RejectAction.md#constructfromdb)
- [dynamicDefinitionFromWorkflowStep](RejectAction.md#dynamicdefinitionfromworkflowstep)
- [reject](RejectAction.md#reject)
- [resolve](RejectAction.md#resolve)

## Constructors

### constructor

• **new RejectAction**()

#### Inherited from

[Action](Action.md).[constructor](Action.md#constructor)

#### Defined in

[src/core/actions/src/action-manager.ts:158](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L158)

## Properties

### IArgument

• **IArgument**: `Object`

Action argument

#### Overrides

[Action](Action.md).[IArgument](Action.md#iargument)

#### Defined in

[src/core/actions/src/action-manager.ts:908](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L908)

___

### IBag

• **IBag**: `Object`

Action bag

#### Overrides

[Action](Action.md).[IBag](Action.md#ibag)

#### Defined in

[src/core/actions/src/action-manager.ts:907](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L907)

___

### IResult

• **IResult**: `Object`

Action result

#### Inherited from

[Action](Action.md).[IResult](Action.md#iresult)

#### Defined in

[src/core/actions/src/action-manager.ts:94](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L94)

___

### RollBackAction

• **RollBackAction**: typeof [`Action`](Action.md) = `RollBackAction`

The action that rollback this action.

#### Inherited from

[Action](Action.md).[RollBackAction](Action.md#rollbackaction)

#### Defined in

[src/core/actions/src/action-manager.ts:868](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L868)

___

### RollBackWorkflow

• **RollBackWorkflow**: typeof [`Workflow`](Workflow.md) = `RevertAction`

Workflow that rollbacks the action.

Wait for action end then rollback.
Will use [RollBackAction](RollBackAction.md).

#### Inherited from

[Action](Action.md).[RollBackWorkflow](Action.md#rollbackworkflow)

#### Defined in

[src/core/actions/src/action-manager.ts:876](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L876)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Inherited from

[Action](Action.md).[app](Action.md#app)

#### Defined in

[src/core/actions/src/action-manager.ts:27](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L27)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`Object`, `Object`, {}\>

Action Database Document

#### Inherited from

[Action](Action.md).[dbDoc](Action.md#dbdoc)

#### Defined in

[src/core/actions/src/action-manager.ts:99](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L99)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Inherited from

[Action](Action.md).[executor](Action.md#executor)

#### Defined in

[src/core/actions/src/action-manager.ts:25](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L25)

___

### isExecutorSet

• **isExecutorSet**: `boolean` = `false`

#### Inherited from

[Action](Action.md).[isExecutorSet](Action.md#isexecutorset)

#### Defined in

[src/core/actions/src/action-manager.ts:478](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L478)

___

### isInitialised

• **isInitialised**: `boolean` = `false`

**`Deprecated`**

use isInitialized

#### Inherited from

[Action](Action.md).[isInitialised](Action.md#isinitialised)

#### Defined in

[src/core/actions/src/action-manager.ts:450](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L450)

___

### isInitialized

• **isInitialized**: `boolean` = `false`

#### Inherited from

[Action](Action.md).[isInitialized](Action.md#isinitialized)

#### Defined in

[src/core/actions/src/action-manager.ts:451](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L451)

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

#### Inherited from

[Action](Action.md).[cronDefaultSettings](Action.md#crondefaultsettings)

#### Defined in

[src/core/actions/src/action-manager.ts:67](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L67)

___

### defaultDelay

▪ `Static` **defaultDelay**: `number`

Shortcut to [[ActionState.IN_PROGRESS]](Action.md#defaultdelays).

If not set, this property will be 'inherited' from the first parent class where it is.

#### Inherited from

[Action](Action.md).[defaultDelay](Action.md#defaultdelay)

#### Defined in

[src/core/actions/src/action-manager.ts:34](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L34)

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

#### Inherited from

[Action](Action.md).[defaultDelays](Action.md#defaultdelays)

#### Defined in

[src/core/actions/src/action-manager.ts:55](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L55)

___

### permanentRef

▪ `Static` **permanentRef**: `string` \| `string`[]

Id of the action stored in database.
It should be a permanent id that designates the action instance.

#### Inherited from

[Action](Action.md).[permanentRef](Action.md#permanentref)

#### Defined in

[src/core/actions/src/action-manager.ts:20](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L20)

## Accessors

### \_id

• `get` **_id**(): `this`[``"dbDoc"``][``"_id"``]

#### Returns

`this`[``"dbDoc"``][``"_id"``]

#### Inherited from

Action.\_id

#### Defined in

[src/core/actions/src/action-manager.ts:150](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L150)

___

### argument

• `get` **argument**(): `this`[``"dbDoc"``][``"argument"``]

#### Returns

`this`[``"dbDoc"``][``"argument"``]

#### Inherited from

Action.argument

#### Defined in

[src/core/actions/src/action-manager.ts:114](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L114)

• `set` **argument**(`argument`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `argument` | `this`[``"dbDoc"``][``"argument"``] |

#### Returns

`void`

#### Inherited from

Action.argument

#### Defined in

[src/core/actions/src/action-manager.ts:118](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L118)

___

### bag

• `get` **bag**(): `this`[``"dbDoc"``][``"bag"``]

#### Returns

`this`[``"dbDoc"``][``"bag"``]

#### Inherited from

Action.bag

#### Defined in

[src/core/actions/src/action-manager.ts:105](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L105)

• `set` **bag**(`bag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bag` | `this`[``"dbDoc"``][``"bag"``] |

#### Returns

`void`

#### Inherited from

Action.bag

#### Defined in

[src/core/actions/src/action-manager.ts:109](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L109)

___

### cronActivity

• `get` **cronActivity**(): `this`[``"dbDoc"``][``"cronActivity"``]

#### Returns

`this`[``"dbDoc"``][``"cronActivity"``]

#### Inherited from

Action.cronActivity

#### Defined in

[src/core/actions/src/action-manager.ts:141](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L141)

• `set` **cronActivity**(`cronActivity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cronActivity` | `this`[``"dbDoc"``][``"cronActivity"``] |

#### Returns

`void`

#### Inherited from

Action.cronActivity

#### Defined in

[src/core/actions/src/action-manager.ts:145](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L145)

___

### isRollBackPossible

• `get` **isRollBackPossible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Action.isRollBackPossible

#### Defined in

[src/core/actions/src/action-manager.ts:829](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L829)

___

### repeat

• `get` **repeat**(): `this`[``"dbDoc"``][``"repeat"``]

#### Returns

`this`[``"dbDoc"``][``"repeat"``]

#### Inherited from

Action.repeat

#### Defined in

[src/core/actions/src/action-manager.ts:132](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L132)

• `set` **repeat**(`repeat`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `repeat` | `this`[``"dbDoc"``][``"repeat"``] |

#### Returns

`void`

#### Inherited from

Action.repeat

#### Defined in

[src/core/actions/src/action-manager.ts:136](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L136)

___

### result

• `get` **result**(): `this`[``"dbDoc"``][``"result"``]

#### Returns

`this`[``"dbDoc"``][``"result"``]

#### Inherited from

Action.result

#### Defined in

[src/core/actions/src/action-manager.ts:123](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L123)

• `set` **result**(`result`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `this`[``"dbDoc"``][``"result"``] |

#### Returns

`void`

#### Inherited from

Action.result

#### Defined in

[src/core/actions/src/action-manager.ts:127](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L127)

## Methods

### \_resume

▸ **_resume**(): `any`

The function resumes the action by calling the appropriate function depending on the current
state of the action. It doesn't take into account the executor.

#### Returns

`any`

A promise. You can not rely on this to know when an action is finished.

#### Inherited from

[Action](Action.md).[_resume](Action.md#_resume)

#### Defined in

[src/core/actions/src/action-manager.ts:601](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L601)

___

### activityLogs

▸ **activityLogs**(`options`): `any`[] \| `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`any`[] \| `Promise`<`any`[]\>

#### Inherited from

[Action](Action.md).[activityLogs](Action.md#activitylogs)

#### Defined in

[src/core/actions/src/action-manager.ts:752](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L752)

___

### changeState

▸ **changeState**(`actionState`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionState` | [`ActionState`](../enums/ActionState.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Action](Action.md).[changeState](Action.md#changestate)

#### Defined in

[src/core/actions/src/action-manager.ts:640](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L640)

___

### createRollBackWorkflow

▸ **createRollBackWorkflow**(): [`Workflow`](Workflow.md)

Instantiate workflow that will rollback this action.

#### Returns

[`Workflow`](Workflow.md)

#### Inherited from

[Action](Action.md).[createRollBackWorkflow](Action.md#createrollbackworkflow)

#### Defined in

[src/core/actions/src/action-manager.ts:881](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L881)

___

### defineExecutor

▸ **defineExecutor**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[Action](Action.md).[defineExecutor](Action.md#defineexecutor)

#### Defined in

[src/core/actions/src/action-manager.ts:387](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L387)

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

#### Inherited from

[Action](Action.md).[dynamicallyDefineFromWorkflowStep](Action.md#dynamicallydefinefromworkflowstep)

#### Defined in

[src/core/actions/src/action-manager.ts:297](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L297)

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

#### Inherited from

[Action](Action.md).[dynamiclyDefineFromWorfklowStep](Action.md#dynamiclydefinefromworfklowstep)

#### Defined in

[src/core/actions/src/action-manager.ts:293](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L293)

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

#### Inherited from

[Action](Action.md).[getLogs](Action.md#getlogs)

#### Defined in

[src/core/actions/src/action-manager.ts:756](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L756)

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

#### Inherited from

[Action](Action.md).[init](Action.md#init)

#### Defined in

[src/core/actions/src/action-manager.ts:383](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L383)

___

### initialisation

▸ **initialisation**(): `Promise`<`void`\>

**`Deprecated`**

use initialization

#### Returns

`Promise`<`void`\>

#### Inherited from

[Action](Action.md).[initialisation](Action.md#initialisation)

#### Defined in

[src/core/actions/src/action-manager.ts:456](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L456)

___

### initialization

▸ **initialization**(): `Promise`<`void`\>

Mainly used for workflows.
Can also complement init().
If it gets too complex, use hooks.

#### Returns

`Promise`<`void`\>

#### Inherited from

[Action](Action.md).[initialization](Action.md#initialization)

#### Defined in

[src/core/actions/src/action-manager.ts:465](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L465)

___

### internalLog

▸ **internalLog**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Inherited from

[Action](Action.md).[internalLog](Action.md#internallog)

#### Defined in

[src/core/actions/src/action-manager.ts:800](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L800)

___

### internalLogError

▸ **internalLogError**(`err`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

#### Returns

`void`

#### Inherited from

[Action](Action.md).[internalLogError](Action.md#internallogerror)

#### Defined in

[src/core/actions/src/action-manager.ts:820](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L820)

___

### main

▸ **main**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

This method should launched the main action process
It is called only one time.
It returns a state value.

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Overrides

[Action](Action.md).[main](Action.md#main)

#### Defined in

[src/core/actions/src/action-manager.ts:910](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L910)

___

### onMainTimeout

▸ **onMainTimeout**(): [`ActionState`](../enums/ActionState.md) \| `Promise`<[`ActionState`](../enums/ActionState.md)\>

Called in case of timeout in `ActionState.EXECUTING_MAIN` state.

It can return `ActionState.SLEEPING` if the process infers
that `main()` has not run and the action must be retried.

#### Returns

[`ActionState`](../enums/ActionState.md) \| `Promise`<[`ActionState`](../enums/ActionState.md)\>

a `ActionState` value.

#### Inherited from

[Action](Action.md).[onMainTimeout](Action.md#onmaintimeout)

#### Defined in

[src/core/actions/src/action-manager.ts:668](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L668)

___

### onStateNotification

▸ **onStateNotification**(`actionState?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `actionState` | [`ActionState`](../enums/ActionState.md) | `ActionState.UNKNOWN` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Action](Action.md).[onStateNotification](Action.md#onstatenotification)

#### Defined in

[src/core/actions/src/action-manager.ts:650](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L650)

___

### resume

▸ **resume**(): `Promise`<`any`\>

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`<`any`\>

A promise. You can not rely on this to know when an action is finished.

#### Inherited from

[Action](Action.md).[resume](Action.md#resume)

#### Defined in

[src/core/actions/src/action-manager.ts:570](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L570)

___

### resyncWithDb

▸ **resyncWithDb**(): `Promise`<`void`\>

Update the current model instance with latest data from database

#### Returns

`Promise`<`void`\>

a promise that resolves when the document has been loaded

#### Inherited from

[Action](Action.md).[resyncWithDb](Action.md#resyncwithdb)

#### Defined in

[src/core/actions/src/action-manager.ts:312](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L312)

___

### rollBack

▸ **rollBack**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Shortcut to configure a rollback.
Will be encapsulated in a larger action

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Inherited from

[Action](Action.md).[rollBack](Action.md#rollback)

#### Defined in

[src/core/actions/src/action-manager.ts:847](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L847)

___

### rollBackWatcher

▸ **rollBackWatcher**(): `Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

Shortcut to configure the watcher for the rollback.

#### Returns

`Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

#### Inherited from

[Action](Action.md).[rollBackWatcher](Action.md#rollbackwatcher)

#### Defined in

[src/core/actions/src/action-manager.ts:855](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L855)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`Object`, `Object`, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`Object`, `Object`, {}\>\>

#### Inherited from

[Action](Action.md).[save](Action.md#save)

#### Defined in

[src/core/actions/src/action-manager.ts:154](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L154)

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

#### Inherited from

[Action](Action.md).[setArgument](Action.md#setargument)

#### Defined in

[src/core/actions/src/action-manager.ts:396](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L396)

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

#### Inherited from

[Action](Action.md).[setFilter](Action.md#setfilter)

#### Defined in

[src/core/actions/src/action-manager.ts:421](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L421)

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

#### Inherited from

[Action](Action.md).[setRepeat](Action.md#setrepeat)

#### Defined in

[src/core/actions/src/action-manager.ts:406](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L406)

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

#### Inherited from

[Action](Action.md).[setResult](Action.md#setresult)

#### Defined in

[src/core/actions/src/action-manager.ts:430](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L430)

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

#### Overrides

[Action](Action.md).[watcher](Action.md#watcher)

#### Defined in

[src/core/actions/src/action-manager.ts:914](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L914)

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

#### Inherited from

[Action](Action.md).[_constructFromDb](Action.md#_constructfromdb)

#### Defined in

[src/core/actions/src/action-manager.ts:225](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L225)

___

### constructFromDb

▸ `Static` **constructFromDb**(`actionDb`): `Promise`<[`Action`](Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionDb` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`Promise`<[`Action`](Action.md)\>

#### Inherited from

[Action](Action.md).[constructFromDb](Action.md#constructfromdb)

#### Defined in

[src/core/actions/src/action-manager.ts:245](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L245)

___

### dynamicDefinitionFromWorkflowStep

▸ `Static` **dynamicDefinitionFromWorkflowStep**(`dbDoc`): `Promise`<[`Action`](Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbDoc` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`Promise`<[`Action`](Action.md)\>

#### Inherited from

[Action](Action.md).[dynamicDefinitionFromWorkflowStep](Action.md#dynamicdefinitionfromworkflowstep)

#### Defined in

[src/core/actions/src/action-manager.ts:253](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L253)

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

#### Inherited from

[Action](Action.md).[reject](Action.md#reject)

#### Defined in

[src/core/actions/src/action-manager.ts:340](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L340)

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

#### Inherited from

[Action](Action.md).[resolve](Action.md#resolve)

#### Defined in

[src/core/actions/src/action-manager.ts:329](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L329)
