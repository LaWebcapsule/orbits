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

[src/action-manager.ts:156](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L156)

## Properties

### IArgument

• **IArgument**: `Object`

Interface of the argument of the action

#### Defined in

[src/action-manager.ts:76](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L76)

___

### IBag

• **IBag**: `Object`

Interface of the bag of the action

#### Defined in

[src/action-manager.ts:83](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L83)

___

### IResult

• **IResult**: `Object`

Interface of the result of the action

#### Defined in

[src/action-manager.ts:89](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L89)

___

### RollBackAction

• **RollBackAction**: typeof [`Action`](Action.md) = `RollBackAction`

The action that rollback this action.

#### Defined in

[src/action-manager.ts:666](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L666)

___

### RollBackWorkflow

• **RollBackWorkflow**: typeof [`Workflow`](Workflow.md) = `RevertAction`

#### Defined in

[src/action-manager.ts:667](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L667)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Defined in

[src/action-manager.ts:32](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L32)

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

[src/action-manager.ts:66](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L66)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>

The database document of this action.

#### Defined in

[src/action-manager.ts:96](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L96)

___

### defaultDelay

• **defaultDelay**: `number`

Shorcut to

**`Link`**

Action.defaultDelays[ActionState.IN_PROGRESS]

#### Defined in

[src/action-manager.ts:39](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L39)

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

[src/action-manager.ts:54](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L54)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Defined in

[src/action-manager.ts:30](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L30)

___

### isInitialised

• **isInitialised**: `boolean` = `false`

#### Defined in

[src/action-manager.ts:347](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L347)

___

### permanentRef

▪ `Static` **permanentRef**: `string`

The id of the action we store in database.
This should be a permanent id that designates your instance.
See :

#### Defined in

[src/action-manager.ts:25](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L25)

## Accessors

### \_id

• `get` **_id**(): `this`[``"dbDoc"``][``"_id"``]

#### Returns

`this`[``"dbDoc"``][``"_id"``]

#### Defined in

[src/action-manager.ts:143](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L143)

___

### argument

• `get` **argument**(): `this`[``"dbDoc"``][``"argument"``]

#### Returns

`this`[``"dbDoc"``][``"argument"``]

#### Defined in

[src/action-manager.ts:107](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L107)

• `set` **argument**(`argument`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `argument` | `this`[``"dbDoc"``][``"argument"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:111](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L111)

___

### bag

• `get` **bag**(): `this`[``"dbDoc"``][``"bag"``]

#### Returns

`this`[``"dbDoc"``][``"bag"``]

#### Defined in

[src/action-manager.ts:98](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L98)

• `set` **bag**(`bag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bag` | `this`[``"dbDoc"``][``"bag"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:102](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L102)

___

### cronActivity

• `get` **cronActivity**(): `this`[``"dbDoc"``][``"cronActivity"``]

#### Returns

`this`[``"dbDoc"``][``"cronActivity"``]

#### Defined in

[src/action-manager.ts:134](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L134)

• `set` **cronActivity**(`cronActivity`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cronActivity` | `this`[``"dbDoc"``][``"cronActivity"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:138](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L138)

___

### isRollBackPossible

• `get` **isRollBackPossible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/action-manager.ts:625](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L625)

___

### repeat

• `get` **repeat**(): `this`[``"dbDoc"``][``"repeat"``]

#### Returns

`this`[``"dbDoc"``][``"repeat"``]

#### Defined in

[src/action-manager.ts:125](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L125)

• `set` **repeat**(`repeat`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `repeat` | `this`[``"dbDoc"``][``"repeat"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:129](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L129)

___

### result

• `get` **result**(): `this`[``"dbDoc"``][``"result"``]

#### Returns

`this`[``"dbDoc"``][``"result"``]

#### Defined in

[src/action-manager.ts:116](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L116)

• `set` **result**(`result`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `this`[``"dbDoc"``][``"result"``] |

#### Returns

`void`

#### Defined in

[src/action-manager.ts:120](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L120)

## Methods

### \_resume

▸ **_resume**(): `any`

The function resumes the action by calling the appropriate function depending on the current
state of the action. It doesn't take into account the executor.

#### Returns

`any`

A promise. You can not rely on this to know when an action is finished.

#### Defined in

[src/action-manager.ts:438](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L438)

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

[src/action-manager.ts:562](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L562)

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

[src/action-manager.ts:479](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L479)

___

### checkExecutionDelay

▸ `Private` **checkExecutionDelay**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Defined in

[src/action-manager.ts:377](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L377)

___

### createRollBackWorkflow

▸ **createRollBackWorkflow**(): [`Workflow`](Workflow.md)

#### Returns

[`Workflow`](Workflow.md)

The workflow that wait for the end of this action if needed and then rollback this action.

#### Defined in

[src/action-manager.ts:674](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L674)

___

### destroy

▸ `Private` **destroy**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Defined in

[src/action-manager.ts:558](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L558)

___

### end

▸ `Private` **end**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/action-manager.ts:495](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L495)

___

### execute

▸ `Private` **execute**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/action-manager.ts:250](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L250)

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

[src/action-manager.ts:566](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L566)

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

[src/action-manager.ts:286](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L286)

___

### initialisation

▸ **initialisation**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/action-manager.ts:348](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L348)

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

[src/action-manager.ts:607](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L607)

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

[src/action-manager.ts:616](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L616)

___

### main

▸ **main**(): `unknown`

This method should launched the main action processus 
It is called only one time.
It returns a state value.

#### Returns

`unknown`

#### Defined in

[src/action-manager.ts:406](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L406)

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

[src/action-manager.ts:488](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L488)

___

### quit

▸ `Private` **quit**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/action-manager.ts:536](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L536)

___

### resume

▸ **resume**(): `Promise`<`unknown`\>

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`<`unknown`\>

A promise. You can not rely on this to know when an action is finished.

#### Defined in

[src/action-manager.ts:415](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L415)

___

### resyncWithDb

▸ **resyncWithDb**(): `Promise`<`void`\>

This function will update the current instance of the model with the latest data from the
database

#### Returns

`Promise`<`void`\>

A promise that resolves when the last document version has be loaded

#### Defined in

[src/action-manager.ts:213](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L213)

___

### rollBack

▸ **rollBack**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Shortcut to configure a rollback. Will be encapsulated in a larger action

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Defined in

[src/action-manager.ts:644](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L644)

___

### rollBackWatcher

▸ **rollBackWatcher**(): `Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

Shortcut to configure the watcher of the rollback Action

#### Returns

`Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

#### Defined in

[src/action-manager.ts:652](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L652)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, {}, {}\>\>

#### Defined in

[src/action-manager.ts:147](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L147)

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

[src/action-manager.ts:296](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L296)

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

[src/action-manager.ts:320](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L320)

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

[src/action-manager.ts:306](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L306)

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

[src/action-manager.ts:330](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L330)

___

### watch

▸ `Private` **watch**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/action-manager.ts:360](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L360)

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

[src/action-manager.ts:343](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L343)

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

[src/action-manager.ts:200](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L200)

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

[src/action-manager.ts:244](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L244)

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

[src/action-manager.ts:230](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L230)
