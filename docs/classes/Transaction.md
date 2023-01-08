[@wbce/orbits](../README.md) / [Exports](../modules.md) / Transaction

# Class: Transaction

Action is the class to structure actions
Extends this class to build new actions behaviours.
You can read more here :

## Hierarchy

- [`Action`](Action.md)

  ↳ **`Transaction`**

  ↳↳ [`RevertTransaction`](RevertTransaction.md)

  ↳↳ [`RevertAction`](RevertAction.md)

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Properties

- [IArgument](Transaction.md#iargument)
- [IBag](Transaction.md#ibag)
- [IResult](Transaction.md#iresult)
- [RollBackAction](Transaction.md#rollbackaction)
- [RollBackTransaction](Transaction.md#rollbacktransaction)
- [app](Transaction.md#app)
- [cronDefaultSettings](Transaction.md#crondefaultsettings)
- [dBSession](Transaction.md#dbsession)
- [dbDoc](Transaction.md#dbdoc)
- [defaultDelay](Transaction.md#defaultdelay)
- [defaultDelays](Transaction.md#defaultdelays)
- [docsToSaveAtStepStart](Transaction.md#docstosaveatstepstart)
- [executor](Transaction.md#executor)
- [isInitialised](Transaction.md#isinitialised)
- [steps](Transaction.md#steps)
- [permanentRef](Transaction.md#permanentref)

### Accessors

- [\_id](Transaction.md#_id)
- [argument](Transaction.md#argument)
- [bag](Transaction.md#bag)
- [cronActivity](Transaction.md#cronactivity)
- [isRollBackPossible](Transaction.md#isrollbackpossible)
- [repeat](Transaction.md#repeat)
- [result](Transaction.md#result)

### Methods

- [\_resume](Transaction.md#_resume)
- [activityLogs](Transaction.md#activitylogs)
- [catch](Transaction.md#catch)
- [changeState](Transaction.md#changestate)
- [checkPoint](Transaction.md#checkpoint)
- [createRollBackTransaction](Transaction.md#createrollbacktransaction)
- [declareActionEnd](Transaction.md#declareactionend)
- [declareActionStart](Transaction.md#declareactionstart)
- [define](Transaction.md#define)
- [endStep](Transaction.md#endstep)
- [finally](Transaction.md#finally)
- [getLogs](Transaction.md#getlogs)
- [getNextStep](Transaction.md#getnextstep)
- [goTo](Transaction.md#goto)
- [goToStep](Transaction.md#gotostep)
- [init](Transaction.md#init)
- [initialisation](Transaction.md#initialisation)
- [internalLog](Transaction.md#internallog)
- [internalLogError](Transaction.md#internallogerror)
- [isActionActive](Transaction.md#isactionactive)
- [main](Transaction.md#main)
- [next](Transaction.md#next)
- [onErrorGoTo](Transaction.md#onerrorgoto)
- [onStateNotification](Transaction.md#onstatenotification)
- [onSuccessGoTo](Transaction.md#onsuccessgoto)
- [registerDocToSaveAtStepStart](Transaction.md#registerdoctosaveatstepstart)
- [resume](Transaction.md#resume)
- [resyncWithDb](Transaction.md#resyncwithdb)
- [rollBack](Transaction.md#rollback)
- [rollBackWatcher](Transaction.md#rollbackwatcher)
- [rollback](Transaction.md#rollback-1)
- [save](Transaction.md#save)
- [setArgument](Transaction.md#setargument)
- [setFilter](Transaction.md#setfilter)
- [setRepeat](Transaction.md#setrepeat)
- [setResult](Transaction.md#setresult)
- [startStep](Transaction.md#startstep)
- [watcher](Transaction.md#watcher)
- [constructFromDb](Transaction.md#constructfromdb)
- [reject](Transaction.md#reject)
- [resolve](Transaction.md#resolve)

## Constructors

### constructor

• **new Transaction**()

#### Overrides

[Action](Action.md).[constructor](Action.md#constructor)

#### Defined in

[src/transaction-manager.ts:46](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L46)

## Properties

### IArgument

• **IArgument**: `Object`

Interface of the argument of the action

#### Inherited from

[Action](Action.md).[IArgument](Action.md#iargument)

#### Defined in

[src/action-manager.ts:76](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L76)

___

### IBag

• **IBag**: `Object`

Interface of the bag of the action

#### Type declaration

| Name | Type |
| :------ | :------ |
| `actions` | { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } |
| `currentStepIndex?` | `number` |
| `isRollBackPossible` | `boolean` |
| `nTimesCurrentStep` | `number` |
| `oldResult` | `any` |
| `stepsHistory` | `number`[] |

#### Overrides

[Action](Action.md).[IBag](Action.md#ibag)

#### Defined in

[src/transaction-manager.ts:32](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L32)

___

### IResult

• **IResult**: `Object`

Interface of the result of the action

#### Inherited from

[Action](Action.md).[IResult](Action.md#iresult)

#### Defined in

[src/action-manager.ts:89](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L89)

___

### RollBackAction

• **RollBackAction**: typeof [`Action`](Action.md) = `RollBackAction`

The action that rollback this action.

#### Inherited from

[Action](Action.md).[RollBackAction](Action.md#rollbackaction)

#### Defined in

[src/action-manager.ts:666](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L666)

___

### RollBackTransaction

• **RollBackTransaction**: typeof [`RevertTransaction`](RevertTransaction.md) = `RevertTransaction`

#### Overrides

[Action](Action.md).[RollBackTransaction](Action.md#rollbacktransaction)

#### Defined in

[src/transaction-manager.ts:386](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L386)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Inherited from

[Action](Action.md).[app](Action.md#app)

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

#### Inherited from

[Action](Action.md).[cronDefaultSettings](Action.md#crondefaultsettings)

#### Defined in

[src/action-manager.ts:66](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L66)

___

### dBSession

• `Optional` **dBSession**: `ClientSession`

#### Defined in

[src/transaction-manager.ts:26](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L26)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>

The database document of this action.

#### Inherited from

[Action](Action.md).[dbDoc](Action.md#dbdoc)

#### Defined in

[src/action-manager.ts:96](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L96)

___

### defaultDelay

• **defaultDelay**: `number` = `Infinity`

Shorcut to

**`Link`**

Action.defaultDelays[ActionState.IN_PROGRESS]

#### Overrides

[Action](Action.md).[defaultDelay](Action.md#defaultdelay)

#### Defined in

[src/transaction-manager.ts:23](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L23)

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

[src/action-manager.ts:54](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L54)

___

### docsToSaveAtStepStart

• **docsToSaveAtStepStart**: `Document`<`any`, `any`, `any`\>[] = `[]`

#### Defined in

[src/transaction-manager.ts:28](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L28)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Inherited from

[Action](Action.md).[executor](Action.md#executor)

#### Defined in

[src/action-manager.ts:30](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L30)

___

### isInitialised

• **isInitialised**: `boolean` = `false`

#### Inherited from

[Action](Action.md).[isInitialised](Action.md#isinitialised)

#### Defined in

[src/action-manager.ts:347](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L347)

___

### steps

• **steps**: [`Step`](../interfaces/Step.md)[] = `[]`

#### Defined in

[src/transaction-manager.ts:30](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L30)

___

### permanentRef

▪ `Static` **permanentRef**: `string`

The id of the action we store in database.
This should be a permanent id that designates your instance.
See :

#### Inherited from

[Action](Action.md).[permanentRef](Action.md#permanentref)

#### Defined in

[src/action-manager.ts:25](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L25)

## Accessors

### \_id

• `get` **_id**(): `this`[``"dbDoc"``][``"_id"``]

#### Returns

`this`[``"dbDoc"``][``"_id"``]

#### Inherited from

Action.\_id

#### Defined in

[src/action-manager.ts:143](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L143)

___

### argument

• `get` **argument**(): `this`[``"dbDoc"``][``"argument"``]

#### Returns

`this`[``"dbDoc"``][``"argument"``]

#### Inherited from

Action.argument

#### Defined in

[src/action-manager.ts:107](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L107)

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

[src/action-manager.ts:111](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L111)

___

### bag

• `get` **bag**(): `this`[``"dbDoc"``][``"bag"``]

#### Returns

`this`[``"dbDoc"``][``"bag"``]

#### Inherited from

Action.bag

#### Defined in

[src/action-manager.ts:98](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L98)

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

[src/action-manager.ts:102](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L102)

___

### cronActivity

• `get` **cronActivity**(): `this`[``"dbDoc"``][``"cronActivity"``]

#### Returns

`this`[``"dbDoc"``][``"cronActivity"``]

#### Inherited from

Action.cronActivity

#### Defined in

[src/action-manager.ts:134](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L134)

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

[src/action-manager.ts:138](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L138)

___

### isRollBackPossible

• `get` **isRollBackPossible**(): `boolean`

#### Returns

`boolean`

#### Overrides

Action.isRollBackPossible

#### Defined in

[src/transaction-manager.ts:372](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L372)

___

### repeat

• `get` **repeat**(): `this`[``"dbDoc"``][``"repeat"``]

#### Returns

`this`[``"dbDoc"``][``"repeat"``]

#### Inherited from

Action.repeat

#### Defined in

[src/action-manager.ts:125](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L125)

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

[src/action-manager.ts:129](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L129)

___

### result

• `get` **result**(): `this`[``"dbDoc"``][``"result"``]

#### Returns

`this`[``"dbDoc"``][``"result"``]

#### Inherited from

Action.result

#### Defined in

[src/action-manager.ts:116](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L116)

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

[src/action-manager.ts:120](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L120)

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

#### Inherited from

[Action](Action.md).[activityLogs](Action.md#activitylogs)

#### Defined in

[src/action-manager.ts:562](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L562)

___

### catch

▸ **catch**(`cb`, `opts?`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/transaction-manager.ts:60](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L60)

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

[src/action-manager.ts:479](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L479)

___

### checkPoint

▸ **checkPoint**(`name`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/transaction-manager.ts:124](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L124)

___

### createRollBackTransaction

▸ **createRollBackTransaction**(): [`Transaction`](Transaction.md)

#### Returns

[`Transaction`](Transaction.md)

The transaction that wait for the end of this action if needed and then rollback this action.

#### Inherited from

[Action](Action.md).[createRollBackTransaction](Action.md#createrollbacktransaction)

#### Defined in

[src/action-manager.ts:674](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L674)

___

### declareActionEnd

▸ **declareActionEnd**(`dbDoc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbDoc` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`void`

#### Defined in

[src/transaction-manager.ts:175](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L175)

___

### declareActionStart

▸ **declareActionStart**(`dbDoc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbDoc` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`void`

#### Defined in

[src/transaction-manager.ts:162](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L162)

___

### define

▸ **define**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/transaction-manager.ts:315](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L315)

___

### endStep

▸ **endStep**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/transaction-manager.ts:288](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L288)

___

### finally

▸ **finally**(`cb`, `opts?`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/transaction-manager.ts:69](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L69)

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

#### Inherited from

[Action](Action.md).[getLogs](Action.md#getlogs)

#### Defined in

[src/action-manager.ts:566](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L566)

___

### getNextStep

▸ **getNextStep**(): `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Returns

`Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Defined in

[src/transaction-manager.ts:186](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L186)

___

### goTo

▸ **goTo**(`name`, `onState`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `onState` | [`ActionState`](../enums/ActionState.md) |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/transaction-manager.ts:140](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L140)

___

### goToStep

▸ **goToStep**(`name`): [`ResolveAction`](ResolveAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ResolveAction`](ResolveAction.md)

#### Defined in

[src/transaction-manager.ts:132](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L132)

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

[src/action-manager.ts:286](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L286)

___

### initialisation

▸ **initialisation**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Action](Action.md).[initialisation](Action.md#initialisation)

#### Defined in

[src/transaction-manager.ts:306](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L306)

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

#### Inherited from

[Action](Action.md).[internalLogError](Action.md#internallogerror)

#### Defined in

[src/action-manager.ts:616](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L616)

___

### isActionActive

▸ **isActionActive**(`action`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](Action.md) |

#### Returns

`boolean`

#### Defined in

[src/transaction-manager.ts:158](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L158)

___

### main

▸ **main**(): `Promise`<`unknown`\>

This method should launched the main action processus 
It is called only one time.
It returns a state value.

#### Returns

`Promise`<`unknown`\>

#### Overrides

[Action](Action.md).[main](Action.md#main)

#### Defined in

[src/transaction-manager.ts:319](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L319)

___

### next

▸ **next**(`cb`, `opts?`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/transaction-manager.ts:51](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L51)

___

### onErrorGoTo

▸ **onErrorGoTo**(`name`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/transaction-manager.ts:153](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L153)

___

### onStateNotification

▸ **onStateNotification**(`actionState?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `actionState` | [`ActionState`](../enums/ActionState.md) | `ActionState.UNKNOW` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Action](Action.md).[onStateNotification](Action.md#onstatenotification)

#### Defined in

[src/action-manager.ts:488](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L488)

___

### onSuccessGoTo

▸ **onSuccessGoTo**(`name`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/transaction-manager.ts:148](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L148)

___

### registerDocToSaveAtStepStart

▸ **registerDocToSaveAtStepStart**(`doc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `Document`<`any`, `any`, `any`\> |

#### Returns

`void`

#### Defined in

[src/transaction-manager.ts:302](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L302)

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

[src/action-manager.ts:415](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L415)

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

[src/action-manager.ts:213](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L213)

___

### rollBack

▸ **rollBack**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Shortcut to configure a rollback. Will be encapsulated in a larger action

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Inherited from

[Action](Action.md).[rollBack](Action.md#rollback)

#### Defined in

[src/action-manager.ts:644](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L644)

___

### rollBackWatcher

▸ **rollBackWatcher**(): `Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

Shortcut to configure the watcher of the rollback Action

#### Returns

`Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

#### Inherited from

[Action](Action.md).[rollBackWatcher](Action.md#rollbackwatcher)

#### Defined in

[src/action-manager.ts:652](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L652)

___

### rollback

▸ **rollback**(`cb`, `opts?`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/transaction-manager.ts:115](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L115)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>\>

#### Inherited from

[Action](Action.md).[save](Action.md#save)

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

#### Inherited from

[Action](Action.md).[setArgument](Action.md#setargument)

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

#### Inherited from

[Action](Action.md).[setFilter](Action.md#setfilter)

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

#### Inherited from

[Action](Action.md).[setRepeat](Action.md#setrepeat)

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

#### Inherited from

[Action](Action.md).[setResult](Action.md#setresult)

#### Defined in

[src/action-manager.ts:330](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L330)

___

### startStep

▸ **startStep**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/transaction-manager.ts:228](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L228)

___

### watcher

▸ **watcher**(): `Promise`<`ActionState`\>

This method should calculate the current state of the action.
It is called :
- potentially many times, when the action is in IN_PROGRESS state
- once time, if the action is in EXECUTING_MAIN state and the executing_main delay has expired

#### Returns

`Promise`<`ActionState`\>

#### Overrides

[Action](Action.md).[watcher](Action.md#watcher)

#### Defined in

[src/transaction-manager.ts:334](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/transaction-manager.ts#L334)

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

#### Inherited from

[Action](Action.md).[reject](Action.md#reject)

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

#### Inherited from

[Action](Action.md).[resolve](Action.md#resolve)

#### Defined in

[src/action-manager.ts:230](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-manager.ts#L230)
