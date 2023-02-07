[@wbce/orbits](../README.md) / [Exports](../modules.md) / Action

# Class: Action

Action is the class to structure actions
Extends this class to build new actions behaviours.
You can read more here :

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
- [cronDefaultSettings](Action.md#crondefaultsettings)
- [dbDoc](Action.md#dbdoc)
- [defaultDelay](Action.md#defaultdelay)
- [defaultDelays](Action.md#defaultdelays)
- [executor](Action.md#executor)
- [isInitialised](Action.md#isinitialised)
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
- [checkExecutionDelay](Action.md#checkexecutiondelay)
- [createRollBackWorkflow](Action.md#createrollbackworkflow)
- [destroy](Action.md#destroy)
- [end](Action.md#end)
- [execute](Action.md#execute)
- [getLogs](Action.md#getlogs)
- [init](Action.md#init)
- [initialisation](Action.md#initialisation)
- [internalLog](Action.md#internallog)
- [internalLogError](Action.md#internallogerror)
- [main](Action.md#main)
- [onStateNotification](Action.md#onstatenotification)
- [quit](Action.md#quit)
- [resume](Action.md#resume)
- [resyncWithDb](Action.md#resyncwithdb)
- [rollBack](Action.md#rollback)
- [rollBackWatcher](Action.md#rollbackwatcher)
- [save](Action.md#save)
- [setArgument](Action.md#setargument)
- [setFilter](Action.md#setfilter)
- [setRepeat](Action.md#setrepeat)
- [setResult](Action.md#setresult)
- [watch](Action.md#watch)
- [watcher](Action.md#watcher)
- [constructFromDb](Action.md#constructfromdb)
- [reject](Action.md#reject)
- [resolve](Action.md#resolve)

## Constructors

### constructor

• **new Action**()

#### Defined in

[src/action-manager.ts:155](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L155)

## Properties

### IArgument

• **IArgument**: `Object`

Interface of the argument of the action

#### Defined in

[src/action-manager.ts:75](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L75)

___

### IBag

• **IBag**: `Object`

Interface of the bag of the action

#### Defined in

[src/action-manager.ts:82](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L82)

___

### IResult

• **IResult**: `Object`

Interface of the result of the action

#### Defined in

[src/action-manager.ts:88](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L88)

___

### RollBackAction

• **RollBackAction**: typeof [`Action`](Action.md) = `RollBackAction`

The action that rollback this action.

#### Defined in

[src/action-manager.ts:665](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L665)

___

### RollBackWorkflow

• **RollBackWorkflow**: typeof [`Workflow`](Workflow.md) = `RevertAction`

#### Defined in

[src/action-manager.ts:666](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L666)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Defined in

[src/action-manager.ts:31](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L31)

___

### cronDefaultSettings

• **cronDefaultSettings**: `Object`

Configure the frequence in which a cron will cause the

**`Link`**

Action.resume method.
You can also dinamically modify the dbDoc.cronActivity property to modify the call to a cron.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `activityFrequence` | `number` |

#### Defined in

[src/action-manager.ts:65](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L65)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>

The database document of this action.

#### Defined in

[src/action-manager.ts:95](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L95)

___

### defaultDelay

• **defaultDelay**: `number`

Shorcut to

**`Link`**

Action.defaultDelays[ActionState.IN_PROGRESS]

#### Defined in

[src/action-manager.ts:38](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L38)

___

### defaultDelays

• **defaultDelays**: `Object`

For the state ActionState.EXECUTING_MAIN and ActionState.IN_PROGRESS,
this object configure the time after which, if no change happened, an action is considered in error. 
For example, an action can only be in the ActionState.IN_PROGRESS state for as long as 
defaultDelays[ActionState.IN_PROGRESS] time.

**`Default Value`**

You should modify this if your actions have longer timeouts.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `1` | `number` |
| `2` | `number` |

#### Defined in

[src/action-manager.ts:53](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L53)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Defined in

[src/action-manager.ts:29](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L29)

___

### isInitialised

• **isInitialised**: `boolean` = `false`

#### Defined in

[src/action-manager.ts:346](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L346)

___

### permanentRef

▪ `Static` **permanentRef**: `string`

The id of the action we store in database.
This should be a permanent id that designates your instance.
See :

#### Defined in

[src/action-manager.ts:24](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L24)

## Accessors

### \_id

• `get` **_id**(): `this`[``"dbDoc"``][``"_id"``]

#### Returns

`this`[``"dbDoc"``][``"_id"``]

#### Defined in

[src/action-manager.ts:142](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L142)

___

### argument

• `get` **argument**(): `this`[``"dbDoc"``][``"argument"``]

#### Returns

`this`[``"dbDoc"``][``"argument"``]

#### Defined in

[src/action-manager.ts:106](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L106)

• `set` **argument**(`argument`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `argument` | `this`[``"dbDoc"``][``"argument"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:110](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L110)

___

### bag

• `get` **bag**(): `this`[``"dbDoc"``][``"bag"``]

#### Returns

`this`[``"dbDoc"``][``"bag"``]

#### Defined in

[src/action-manager.ts:97](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L97)

• `set` **bag**(`bag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bag` | `this`[``"dbDoc"``][``"bag"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:101](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L101)

___

### cronActivity

• `get` **cronActivity**(): `this`[``"dbDoc"``][``"cronActivity"``]

#### Returns

`this`[``"dbDoc"``][``"cronActivity"``]

#### Defined in

[src/action-manager.ts:133](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L133)

• `set` **cronActivity**(`cronActivity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cronActivity` | `this`[``"dbDoc"``][``"cronActivity"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:137](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L137)

___

### isRollBackPossible

• `get` **isRollBackPossible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/action-manager.ts:624](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L624)

___

### repeat

• `get` **repeat**(): `this`[``"dbDoc"``][``"repeat"``]

#### Returns

`this`[``"dbDoc"``][``"repeat"``]

#### Defined in

[src/action-manager.ts:124](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L124)

• `set` **repeat**(`repeat`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `repeat` | `this`[``"dbDoc"``][``"repeat"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:128](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L128)

___

### result

• `get` **result**(): `this`[``"dbDoc"``][``"result"``]

#### Returns

`this`[``"dbDoc"``][``"result"``]

#### Defined in

[src/action-manager.ts:115](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L115)

• `set` **result**(`result`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `this`[``"dbDoc"``][``"result"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:119](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L119)

## Methods

### \_resume

▸ **_resume**(): `any`

The function resumes the action by calling the appropriate function depending on the current
state of the action. It doesn't take into account the executor.

#### Returns

`any`

A promise. You can not rely on this to know when an action is finished.

#### Defined in

[src/action-manager.ts:437](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L437)

___

### activityLogs

▸ **activityLogs**(`options`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`string`[]

#### Defined in

[src/action-manager.ts:561](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L561)

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

[src/action-manager.ts:478](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L478)

___

### checkExecutionDelay

▸ `Private` **checkExecutionDelay**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Defined in

[src/action-manager.ts:376](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L376)

___

### createRollBackWorkflow

▸ **createRollBackWorkflow**(): [`Workflow`](Workflow.md)

#### Returns

[`Workflow`](Workflow.md)

The workflow that wait for the end of this action if needed and then rollback this action.

#### Defined in

[src/action-manager.ts:673](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L673)

___

### destroy

▸ `Private` **destroy**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Defined in

[src/action-manager.ts:557](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L557)

___

### end

▸ `Private` **end**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/action-manager.ts:494](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L494)

___

### execute

▸ `Private` **execute**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/action-manager.ts:249](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L249)

___

### getLogs

▸ **getLogs**(`options?`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.endTime?` | `number` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/action-manager.ts:565](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L565)

___

### init

▸ **init**(): `Promise`<`any`\>

Initialize the action from the action stored in the database.

**`Example`**

```ts
In order to not store secrets in the database, you can set a vault id in the argument and retrieve the secret at the initialization of the action
```

**`Example`**

```ts
You cannot store class object on the database. If your action use complex object, they can be initialized here
```

#### Returns

`Promise`<`any`\>

#### Defined in

[src/action-manager.ts:285](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L285)

___

### initialisation

▸ **initialisation**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/action-manager.ts:347](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L347)

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

[src/action-manager.ts:606](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L606)

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

[src/action-manager.ts:615](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L615)

___

### main

▸ **main**(): `unknown`

This method should launched the main action processus 
It is called only one time.
It returns a state value.

#### Returns

`unknown`

#### Defined in

[src/action-manager.ts:405](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L405)

___

### onStateNotification

▸ **onStateNotification**(`actionState?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `actionState` | [`ActionState`](../enums/ActionState.md) | `ActionState.UNKNOW` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/action-manager.ts:487](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L487)

___

### quit

▸ `Private` **quit**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/action-manager.ts:535](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L535)

___

### resume

▸ **resume**(): `Promise`<`unknown`\>

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`<`unknown`\>

A promise. You can not rely on this to know when an action is finished.

#### Defined in

[src/action-manager.ts:414](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L414)

___

### resyncWithDb

▸ **resyncWithDb**(): `Promise`<`void`\>

This function will update the current instance of the model with the latest data from the
database

#### Returns

`Promise`<`void`\>

A promise that resolves when the last document version has be loaded

#### Defined in

[src/action-manager.ts:212](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L212)

___

### rollBack

▸ **rollBack**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Shortcut to configure a rollback. Will be encapsulated in a larger action

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Defined in

[src/action-manager.ts:643](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L643)

___

### rollBackWatcher

▸ **rollBackWatcher**(): `Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

Shortcut to configure the watcher of the rollback Action

#### Returns

`Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

#### Defined in

[src/action-manager.ts:651](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L651)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Defined in

[src/action-manager.ts:146](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L146)

___

### setArgument

▸ **setArgument**(`args`): `void`

It takes an object of type `IArgument` and sets the `argument` 
that will be stored in the database.
Once set, the argument of an action should not be modified.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Object` | The arguments that you want to set. |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:295](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L295)

___

### setFilter

▸ **setFilter**(`filter`): `void`

To make filtering easier, you can pass filter to an action.
This filters are stored on the database with the `filter` property and allow you to search for 
an action or a group of actions

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Object` |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:319](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L319)

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

[src/action-manager.ts:305](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L305)

___

### setResult

▸ **setResult**(`result`): `void`

Set the result of the action.

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `Object` |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:329](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L329)

___

### watch

▸ `Private` **watch**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/action-manager.ts:359](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L359)

___

### watcher

▸ **watcher**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

This method should calculate the current state of the action.
It is called :
- potentially many times, when the action is in IN_PROGRESS state
- once time, if the action is in EXECUTING_MAIN state and the executing_main delay has expired

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Defined in

[src/action-manager.ts:342](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L342)

___

### constructFromDb

▸ `Static` **constructFromDb**(`actionDb`): [`Action`](Action.md)

Permit to construct an action from a document stored in the database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionDb` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> | a document coming from the database |

#### Returns

[`Action`](Action.md)

an action for which dbDoc property is equal to actionDb

#### Defined in

[src/action-manager.ts:199](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L199)

___

### reject

▸ `Static` **reject**(`result?`): [`RejectAction`](RejectAction.md)

`static reject(result?){`

The above function is a static function that returns a new RejectAction object. The function
takes an optional parameter called result

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result?` | `any` | The result of the action. |

#### Returns

[`RejectAction`](RejectAction.md)

A new instance of the RejectAction class.

#### Defined in

[src/action-manager.ts:243](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L243)

___

### resolve

▸ `Static` **resolve**(`result?`): [`ResolveAction`](ResolveAction.md)

It returns a new ResolveAction object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result?` | `any` | The result of the action. |

#### Returns

[`ResolveAction`](ResolveAction.md)

A new instance of the ResolveAction class.

#### Defined in

[src/action-manager.ts:229](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-manager.ts#L229)
