[@wbce/orbits](../README.md) / [Exports](../modules.md) / ResolveAction

# Class: ResolveAction

Action is the class to structure actions
Extends this class to build new actions behaviours.
You can read more here :

## Hierarchy

- [`Action`](Action.md)

  ↳ **`ResolveAction`**

## Table of contents

### Constructors

- [constructor](ResolveAction.md#constructor)

### Properties

- [IArgument](ResolveAction.md#iargument)
- [IBag](ResolveAction.md#ibag)
- [IResult](ResolveAction.md#iresult)
- [RollBackAction](ResolveAction.md#rollbackaction)
- [RollBackWorkflow](ResolveAction.md#rollbackworkflow)
- [app](ResolveAction.md#app)
- [cronDefaultSettings](ResolveAction.md#crondefaultsettings)
- [dbDoc](ResolveAction.md#dbdoc)
- [defaultDelay](ResolveAction.md#defaultdelay)
- [defaultDelays](ResolveAction.md#defaultdelays)
- [executor](ResolveAction.md#executor)
- [isInitialised](ResolveAction.md#isinitialised)
- [permanentRef](ResolveAction.md#permanentref)

### Accessors

- [\_id](ResolveAction.md#_id)
- [argument](ResolveAction.md#argument)
- [bag](ResolveAction.md#bag)
- [cronActivity](ResolveAction.md#cronactivity)
- [isRollBackPossible](ResolveAction.md#isrollbackpossible)
- [repeat](ResolveAction.md#repeat)
- [result](ResolveAction.md#result)

### Methods

- [\_resume](ResolveAction.md#_resume)
- [activityLogs](ResolveAction.md#activitylogs)
- [changeState](ResolveAction.md#changestate)
- [createRollBackWorkflow](ResolveAction.md#createrollbackworkflow)
- [getLogs](ResolveAction.md#getlogs)
- [init](ResolveAction.md#init)
- [initialisation](ResolveAction.md#initialisation)
- [internalLog](ResolveAction.md#internallog)
- [internalLogError](ResolveAction.md#internallogerror)
- [main](ResolveAction.md#main)
- [onStateNotification](ResolveAction.md#onstatenotification)
- [resume](ResolveAction.md#resume)
- [resyncWithDb](ResolveAction.md#resyncwithdb)
- [rollBack](ResolveAction.md#rollback)
- [rollBackWatcher](ResolveAction.md#rollbackwatcher)
- [save](ResolveAction.md#save)
- [setArgument](ResolveAction.md#setargument)
- [setFilter](ResolveAction.md#setfilter)
- [setRepeat](ResolveAction.md#setrepeat)
- [setResult](ResolveAction.md#setresult)
- [watcher](ResolveAction.md#watcher)
- [constructFromDb](ResolveAction.md#constructfromdb)
- [reject](ResolveAction.md#reject)
- [resolve](ResolveAction.md#resolve)

## Constructors

### constructor

• **new ResolveAction**()

#### Inherited from

[Action](Action.md).[constructor](Action.md#constructor)

#### Defined in

[src/action-manager.ts:155](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L155)

## Properties

### IArgument

• **IArgument**: `Object`

Interface of the argument of the action

#### Inherited from

[Action](Action.md).[IArgument](Action.md#iargument)

#### Defined in

[src/action-manager.ts:75](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L75)

___

### IBag

• **IBag**: `Object`

Interface of the bag of the action

#### Inherited from

[Action](Action.md).[IBag](Action.md#ibag)

#### Defined in

[src/action-manager.ts:82](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L82)

___

### IResult

• **IResult**: `Object`

Interface of the result of the action

#### Inherited from

[Action](Action.md).[IResult](Action.md#iresult)

#### Defined in

[src/action-manager.ts:88](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L88)

___

### RollBackAction

• **RollBackAction**: typeof [`Action`](Action.md) = `RollBackAction`

The action that rollback this action.

#### Inherited from

[Action](Action.md).[RollBackAction](Action.md#rollbackaction)

#### Defined in

[src/action-manager.ts:665](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L665)

___

### RollBackWorkflow

• **RollBackWorkflow**: typeof [`Workflow`](Workflow.md) = `RevertAction`

#### Inherited from

[Action](Action.md).[RollBackWorkflow](Action.md#rollbackworkflow)

#### Defined in

[src/action-manager.ts:666](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L666)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Inherited from

[Action](Action.md).[app](Action.md#app)

#### Defined in

[src/action-manager.ts:31](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L31)

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

#### Inherited from

[Action](Action.md).[cronDefaultSettings](Action.md#crondefaultsettings)

#### Defined in

[src/action-manager.ts:65](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L65)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>

The database document of this action.

#### Inherited from

[Action](Action.md).[dbDoc](Action.md#dbdoc)

#### Defined in

[src/action-manager.ts:95](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L95)

___

### defaultDelay

• **defaultDelay**: `number`

Shorcut to

**`Link`**

Action.defaultDelays[ActionState.IN_PROGRESS]

#### Inherited from

[Action](Action.md).[defaultDelay](Action.md#defaultdelay)

#### Defined in

[src/action-manager.ts:38](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L38)

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

#### Inherited from

[Action](Action.md).[defaultDelays](Action.md#defaultdelays)

#### Defined in

[src/action-manager.ts:53](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L53)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Inherited from

[Action](Action.md).[executor](Action.md#executor)

#### Defined in

[src/action-manager.ts:29](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L29)

___

### isInitialised

• **isInitialised**: `boolean` = `false`

#### Inherited from

[Action](Action.md).[isInitialised](Action.md#isinitialised)

#### Defined in

[src/action-manager.ts:346](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L346)

___

### permanentRef

▪ `Static` **permanentRef**: `string`

The id of the action we store in database.
This should be a permanent id that designates your instance.
See :

#### Inherited from

[Action](Action.md).[permanentRef](Action.md#permanentref)

#### Defined in

[src/action-manager.ts:24](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L24)

## Accessors

### \_id

• `get` **_id**(): `this`[``"dbDoc"``][``"_id"``]

#### Returns

`this`[``"dbDoc"``][``"_id"``]

#### Inherited from

Action.\_id

#### Defined in

[src/action-manager.ts:142](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L142)

___

### argument

• `get` **argument**(): `this`[``"dbDoc"``][``"argument"``]

#### Returns

`this`[``"dbDoc"``][``"argument"``]

#### Inherited from

Action.argument

#### Defined in

[src/action-manager.ts:106](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L106)

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

[src/action-manager.ts:110](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L110)

___

### bag

• `get` **bag**(): `this`[``"dbDoc"``][``"bag"``]

#### Returns

`this`[``"dbDoc"``][``"bag"``]

#### Inherited from

Action.bag

#### Defined in

[src/action-manager.ts:97](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L97)

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

[src/action-manager.ts:101](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L101)

___

### cronActivity

• `get` **cronActivity**(): `this`[``"dbDoc"``][``"cronActivity"``]

#### Returns

`this`[``"dbDoc"``][``"cronActivity"``]

#### Inherited from

Action.cronActivity

#### Defined in

[src/action-manager.ts:133](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L133)

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

[src/action-manager.ts:137](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L137)

___

### isRollBackPossible

• `get` **isRollBackPossible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Action.isRollBackPossible

#### Defined in

[src/action-manager.ts:624](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L624)

___

### repeat

• `get` **repeat**(): `this`[``"dbDoc"``][``"repeat"``]

#### Returns

`this`[``"dbDoc"``][``"repeat"``]

#### Inherited from

Action.repeat

#### Defined in

[src/action-manager.ts:124](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L124)

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

[src/action-manager.ts:128](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L128)

___

### result

• `get` **result**(): `this`[``"dbDoc"``][``"result"``]

#### Returns

`this`[``"dbDoc"``][``"result"``]

#### Inherited from

Action.result

#### Defined in

[src/action-manager.ts:115](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L115)

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

[src/action-manager.ts:119](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L119)

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

[src/action-manager.ts:437](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L437)

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

[src/action-manager.ts:561](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L561)

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

[src/action-manager.ts:478](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L478)

___

### createRollBackWorkflow

▸ **createRollBackWorkflow**(): [`Workflow`](Workflow.md)

#### Returns

[`Workflow`](Workflow.md)

The workflow that wait for the end of this action if needed and then rollback this action.

#### Inherited from

[Action](Action.md).[createRollBackWorkflow](Action.md#createrollbackworkflow)

#### Defined in

[src/action-manager.ts:673](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L673)

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

[src/action-manager.ts:565](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L565)

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

#### Inherited from

[Action](Action.md).[init](Action.md#init)

#### Defined in

[src/action-manager.ts:285](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L285)

___

### initialisation

▸ **initialisation**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[Action](Action.md).[initialisation](Action.md#initialisation)

#### Defined in

[src/action-manager.ts:347](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L347)

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

[src/action-manager.ts:606](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L606)

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

[src/action-manager.ts:615](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L615)

___

### main

▸ **main**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

This method should launched the main action processus 
It is called only one time.
It returns a state value.

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Overrides

[Action](Action.md).[main](Action.md#main)

#### Defined in

[src/action-manager.ts:685](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L685)

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

[src/action-manager.ts:487](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L487)

___

### resume

▸ **resume**(): `Promise`<`unknown`\>

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`<`unknown`\>

A promise. You can not rely on this to know when an action is finished.

#### Inherited from

[Action](Action.md).[resume](Action.md#resume)

#### Defined in

[src/action-manager.ts:414](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L414)

___

### resyncWithDb

▸ **resyncWithDb**(): `Promise`<`void`\>

This function will update the current instance of the model with the latest data from the
database

#### Returns

`Promise`<`void`\>

A promise that resolves when the last document version has be loaded

#### Inherited from

[Action](Action.md).[resyncWithDb](Action.md#resyncwithdb)

#### Defined in

[src/action-manager.ts:212](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L212)

___

### rollBack

▸ **rollBack**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Shortcut to configure a rollback. Will be encapsulated in a larger action

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Inherited from

[Action](Action.md).[rollBack](Action.md#rollback)

#### Defined in

[src/action-manager.ts:643](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L643)

___

### rollBackWatcher

▸ **rollBackWatcher**(): `Promise`<[`UNKNOWN`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

Shortcut to configure the watcher of the rollback Action

#### Returns

`Promise`<[`UNKNOWN`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

#### Inherited from

[Action](Action.md).[rollBackWatcher](Action.md#rollbackwatcher)

#### Defined in

[src/action-manager.ts:651](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L651)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Inherited from

[Action](Action.md).[save](Action.md#save)

#### Defined in

[src/action-manager.ts:146](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L146)

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

#### Inherited from

[Action](Action.md).[setArgument](Action.md#setargument)

#### Defined in

[src/action-manager.ts:295](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L295)

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

#### Inherited from

[Action](Action.md).[setFilter](Action.md#setfilter)

#### Defined in

[src/action-manager.ts:319](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L319)

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

[src/action-manager.ts:305](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L305)

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

#### Inherited from

[Action](Action.md).[setResult](Action.md#setresult)

#### Defined in

[src/action-manager.ts:329](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L329)

___

### watcher

▸ **watcher**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

This method should calculate the current state of the action.
It is called :
- potentially many times, when the action is in IN_PROGRESS state
- once time, if the action is in EXECUTING_MAIN state and the executing_main delay has expired

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Overrides

[Action](Action.md).[watcher](Action.md#watcher)

#### Defined in

[src/action-manager.ts:689](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L689)

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

#### Inherited from

[Action](Action.md).[constructFromDb](Action.md#constructfromdb)

#### Defined in

[src/action-manager.ts:199](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L199)

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

#### Inherited from

[Action](Action.md).[reject](Action.md#reject)

#### Defined in

[src/action-manager.ts:243](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L243)

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

#### Inherited from

[Action](Action.md).[resolve](Action.md#resolve)

#### Defined in

[src/action-manager.ts:229](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L229)
