[@wbce/orbits](../README.md) / [Exports](../modules.md) / Workflow

# Class: Workflow

Action is the class to structure actions
Extends this class to build new actions behaviours.
You can read more here :

## Hierarchy

- [`Action`](Action.md)

  ↳ **`Workflow`**

  ↳↳ [`RevertWorkflow`](RevertWorkflow.md)

  ↳↳ [`RevertAction`](RevertAction.md)

## Table of contents

### Constructors

- [constructor](Workflow.md#constructor)

### Properties

- [IArgument](Workflow.md#iargument)
- [IBag](Workflow.md#ibag)
- [IResult](Workflow.md#iresult)
- [RollBackAction](Workflow.md#rollbackaction)
- [RollBackWorkflow](Workflow.md#rollbackworkflow)
- [app](Workflow.md#app)
- [cronDefaultSettings](Workflow.md#crondefaultsettings)
- [dBSession](Workflow.md#dbsession)
- [dbDoc](Workflow.md#dbdoc)
- [defaultDelay](Workflow.md#defaultdelay)
- [defaultDelays](Workflow.md#defaultdelays)
- [docsToSaveAtStepStart](Workflow.md#docstosaveatstepstart)
- [executor](Workflow.md#executor)
- [isInitialized](Workflow.md#isInitialized)
- [steps](Workflow.md#steps)
- [permanentRef](Workflow.md#permanentref)

### Accessors

- [\_id](Workflow.md#_id)
- [argument](Workflow.md#argument)
- [bag](Workflow.md#bag)
- [cronActivity](Workflow.md#cronactivity)
- [isRollBackPossible](Workflow.md#isrollbackpossible)
- [repeat](Workflow.md#repeat)
- [result](Workflow.md#result)

### Methods

- [\_resume](Workflow.md#_resume)
- [activityLogs](Workflow.md#activitylogs)
- [catch](Workflow.md#catch)
- [changeState](Workflow.md#changestate)
- [createRollBackWorkflow](Workflow.md#createrollbackworkflow)
- [declareActionEnd](Workflow.md#declareactionend)
- [declareActionStart](Workflow.md#declareactionstart)
- [define](Workflow.md#define)
- [endStep](Workflow.md#endstep)
- [finally](Workflow.md#finally)
- [getLogs](Workflow.md#getlogs)
- [getNextStep](Workflow.md#getnextstep)
- [goTo](Workflow.md#goto)
- [goToStep](Workflow.md#gotostep)
- [init](Workflow.md#init)
- [initialization](Workflow.md#initialization)
- [internalLog](Workflow.md#internallog)
- [internalLogError](Workflow.md#internallogerror)
- [isActionActive](Workflow.md#isactionactive)
- [main](Workflow.md#main)
- [name](Workflow.md#name)
- [next](Workflow.md#next)
- [onErrorGoTo](Workflow.md#onerrorgoto)
- [onStateNotification](Workflow.md#onstatenotification)
- [onSuccessGoTo](Workflow.md#onsuccessgoto)
- [registerDocToSaveAtStepStart](Workflow.md#registerdoctosaveatstepstart)
- [resume](Workflow.md#resume)
- [resyncWithDb](Workflow.md#resyncwithdb)
- [rollBack](Workflow.md#rollback)
- [rollBackWatcher](Workflow.md#rollbackwatcher)
- [rollback](Workflow.md#rollback-1)
- [save](Workflow.md#save)
- [setArgument](Workflow.md#setargument)
- [setFilter](Workflow.md#setfilter)
- [setRepeat](Workflow.md#setrepeat)
- [setResult](Workflow.md#setresult)
- [startStep](Workflow.md#startstep)
- [watcher](Workflow.md#watcher)
- [constructFromDb](Workflow.md#constructfromdb)
- [reject](Workflow.md#reject)
- [resolve](Workflow.md#resolve)

## Constructors

### constructor

• **new Workflow**()

#### Overrides

[Action](Action.md).[constructor](Action.md#constructor)

#### Defined in

[src/workflow-manager.ts:44](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L44)

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

[src/workflow-manager.ts:30](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L30)

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

• **RollBackWorkflow**: typeof [`RevertWorkflow`](RevertWorkflow.md) = `RevertWorkflow`

#### Overrides

[Action](Action.md).[RollBackWorkflow](Action.md#rollbackworkflow)

#### Defined in

[src/workflow-manager.ts:384](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L384)

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

Configure the frequency in which a cron will cause the

**`Link`**

Action.resume method.
You can also dinamically modify the dbDoc.cronActivity property to modify the call to a cron.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `activityFrequency` | `number` |

#### Inherited from

[Action](Action.md).[cronDefaultSettings](Action.md#crondefaultsettings)

#### Defined in

[src/action-manager.ts:65](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L65)

___

### dBSession

• `Optional` **dBSession**: `ClientSession`

#### Defined in

[src/workflow-manager.ts:24](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L24)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>

The database document of this action.

#### Inherited from

[Action](Action.md).[dbDoc](Action.md#dbdoc)

#### Defined in

[src/action-manager.ts:95](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L95)

___

### defaultDelay

• **defaultDelay**: `number` = `Infinity`

Shorcut to

**`Link`**

Action.defaultDelays[ActionState.IN_PROGRESS]

#### Overrides

[Action](Action.md).[defaultDelay](Action.md#defaultdelay)

#### Defined in

[src/workflow-manager.ts:21](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L21)

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

### docsToSaveAtStepStart

• **docsToSaveAtStepStart**: `Document`<`any`, `any`, `any`\>[] = `[]`

#### Defined in

[src/workflow-manager.ts:26](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L26)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Inherited from

[Action](Action.md).[executor](Action.md#executor)

#### Defined in

[src/action-manager.ts:29](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L29)

___

### isInitialized

• **isInitialized**: `boolean` = `false`

#### Inherited from

[Action](Action.md).[isInitialized](Action.md#isInitialized)

#### Defined in

[src/action-manager.ts:346](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L346)

___

### steps

• **steps**: [`Step`](../interfaces/Step.md)[] = `[]`

#### Defined in

[src/workflow-manager.ts:28](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L28)

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

#### Overrides

Action.isRollBackPossible

#### Defined in

[src/workflow-manager.ts:370](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L370)

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

### catch

▸ **catch**(`cb`, `opts?`): [`Workflow`](Workflow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/workflow-manager.ts:58](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L58)

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

### declareActionEnd

▸ **declareActionEnd**(`dbDoc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbDoc` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`void`

#### Defined in

[src/workflow-manager.ts:173](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L173)

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

[src/workflow-manager.ts:160](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L160)

___

### define

▸ **define**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/workflow-manager.ts:313](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L313)

___

### endStep

▸ **endStep**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Defined in

[src/workflow-manager.ts:286](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L286)

___

### finally

▸ **finally**(`cb`, `opts?`): [`Workflow`](Workflow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/workflow-manager.ts:67](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L67)

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

### getNextStep

▸ **getNextStep**(): `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Returns

`Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Defined in

[src/workflow-manager.ts:184](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L184)

___

### goTo

▸ **goTo**(`name`, `onState`): [`Workflow`](Workflow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `onState` | [`ActionState`](../enums/ActionState.md) |

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/workflow-manager.ts:138](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L138)

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

[src/workflow-manager.ts:130](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L130)

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

### initialization

▸ **initialization**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Action](Action.md).[initialization](Action.md#initialization)

#### Defined in

[src/workflow-manager.ts:304](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L304)

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

### isActionActive

▸ **isActionActive**(`action`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](Action.md) |

#### Returns

`boolean`

#### Defined in

[src/workflow-manager.ts:156](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L156)

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

[src/workflow-manager.ts:317](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L317)

___

### name

▸ **name**(`name`): [`Workflow`](Workflow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/workflow-manager.ts:122](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L122)

___

### next

▸ **next**(`cb`, `opts?`): [`Workflow`](Workflow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/workflow-manager.ts:49](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L49)

___

### onErrorGoTo

▸ **onErrorGoTo**(`name`): [`Workflow`](Workflow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/workflow-manager.ts:151](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L151)

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

### onSuccessGoTo

▸ **onSuccessGoTo**(`name`): [`Workflow`](Workflow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/workflow-manager.ts:146](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L146)

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

[src/workflow-manager.ts:300](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L300)

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

### rollback

▸ **rollback**(`cb`, `opts?`): [`Workflow`](Workflow.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`Workflow`](Workflow.md)

#### Defined in

[src/workflow-manager.ts:113](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L113)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{}, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>\>

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

### startStep

▸ **startStep**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/workflow-manager.ts:226](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L226)

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

[src/workflow-manager.ts:332](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L332)

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
