[@wbce/orbits](../README.md) / [Exports](../modules.md) / RevertWorkflow

# Class: RevertWorkflow<WorkflowToRevert\>

Action is the class to structure actions
Extends this class to build new actions behaviours.
You can read more here :

## Type parameters

| Name | Type |
| :------ | :------ |
| `WorkflowToRevert` | extends [`Workflow`](Workflow.md) |

## Hierarchy

- [`Workflow`](Workflow.md)

  ↳ **`RevertWorkflow`**

## Table of contents

### Constructors

- [constructor](RevertWorkflow.md#constructor)

### Properties

- [IArgument](RevertWorkflow.md#iargument)
- [IBag](RevertWorkflow.md#ibag)
- [IResult](RevertWorkflow.md#iresult)
- [RollBackAction](RevertWorkflow.md#rollbackaction)
- [RollBackWorkflow](RevertWorkflow.md#rollbackworkflow)
- [app](RevertWorkflow.md#app)
- [cronDefaultSettings](RevertWorkflow.md#crondefaultsettings)
- [dBSession](RevertWorkflow.md#dbsession)
- [dbDoc](RevertWorkflow.md#dbdoc)
- [defaultDelay](RevertWorkflow.md#defaultdelay)
- [defaultDelays](RevertWorkflow.md#defaultdelays)
- [docsToSaveAtStepStart](RevertWorkflow.md#docstosaveatstepstart)
- [executor](RevertWorkflow.md#executor)
- [isInitialised](RevertWorkflow.md#isinitialised)
- [oldAction](RevertWorkflow.md#oldaction)
- [steps](RevertWorkflow.md#steps)
- [permanentRef](RevertWorkflow.md#permanentref)

### Accessors

- [\_id](RevertWorkflow.md#_id)
- [argument](RevertWorkflow.md#argument)
- [bag](RevertWorkflow.md#bag)
- [cronActivity](RevertWorkflow.md#cronactivity)
- [isRollBackPossible](RevertWorkflow.md#isrollbackpossible)
- [repeat](RevertWorkflow.md#repeat)
- [result](RevertWorkflow.md#result)

### Methods

- [\_resume](RevertWorkflow.md#_resume)
- [activityLogs](RevertWorkflow.md#activitylogs)
- [catch](RevertWorkflow.md#catch)
- [changeState](RevertWorkflow.md#changestate)
- [createRollBackWorkflow](RevertWorkflow.md#createrollbackworkflow)
- [declareActionEnd](RevertWorkflow.md#declareactionend)
- [declareActionStart](RevertWorkflow.md#declareactionstart)
- [define](RevertWorkflow.md#define)
- [endStep](RevertWorkflow.md#endstep)
- [finally](RevertWorkflow.md#finally)
- [getLogs](RevertWorkflow.md#getlogs)
- [getNextStep](RevertWorkflow.md#getnextstep)
- [goTo](RevertWorkflow.md#goto)
- [goToStep](RevertWorkflow.md#gotostep)
- [init](RevertWorkflow.md#init)
- [initialisation](RevertWorkflow.md#initialisation)
- [internalLog](RevertWorkflow.md#internallog)
- [internalLogError](RevertWorkflow.md#internallogerror)
- [isActionActive](RevertWorkflow.md#isactionactive)
- [main](RevertWorkflow.md#main)
- [name](RevertWorkflow.md#name)
- [next](RevertWorkflow.md#next)
- [onErrorGoTo](RevertWorkflow.md#onerrorgoto)
- [onStateNotification](RevertWorkflow.md#onstatenotification)
- [onSuccessGoTo](RevertWorkflow.md#onsuccessgoto)
- [registerDocToSaveAtStepStart](RevertWorkflow.md#registerdoctosaveatstepstart)
- [resume](RevertWorkflow.md#resume)
- [resyncWithDb](RevertWorkflow.md#resyncwithdb)
- [revertChildrenAction](RevertWorkflow.md#revertchildrenaction)
- [rollBack](RevertWorkflow.md#rollback)
- [rollBackWatcher](RevertWorkflow.md#rollbackwatcher)
- [rollback](RevertWorkflow.md#rollback-1)
- [save](RevertWorkflow.md#save)
- [setArgument](RevertWorkflow.md#setargument)
- [setFilter](RevertWorkflow.md#setfilter)
- [setRepeat](RevertWorkflow.md#setrepeat)
- [setResult](RevertWorkflow.md#setresult)
- [startStep](RevertWorkflow.md#startstep)
- [watcher](RevertWorkflow.md#watcher)
- [constructFromDb](RevertWorkflow.md#constructfromdb)
- [reject](RevertWorkflow.md#reject)
- [resolve](RevertWorkflow.md#resolve)

## Constructors

### constructor

• **new RevertWorkflow**<`WorkflowToRevert`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `WorkflowToRevert` | extends [`Workflow`](Workflow.md)<`WorkflowToRevert`\> |

#### Inherited from

[Workflow](Workflow.md).[constructor](Workflow.md#constructor)

#### Defined in

[src/workflow-manager.ts:44](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L44)

## Properties

### IArgument

• **IArgument**: `Object`

Interface of the argument of the action

#### Type declaration

| Name | Type |
| :------ | :------ |
| `actionId` | `string` |

#### Overrides

[Workflow](Workflow.md).[IArgument](Workflow.md#iargument)

#### Defined in

[src/workflow-manager.ts:390](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L390)

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

#### Inherited from

[Workflow](Workflow.md).[IBag](Workflow.md#ibag)

#### Defined in

[src/workflow-manager.ts:30](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L30)

___

### IResult

• **IResult**: `Object`

Interface of the result of the action

#### Inherited from

[Workflow](Workflow.md).[IResult](Workflow.md#iresult)

#### Defined in

[src/action-manager.ts:88](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L88)

___

### RollBackAction

• **RollBackAction**: typeof [`Action`](Action.md) = `RollBackAction`

The action that rollback this action.

#### Inherited from

[Workflow](Workflow.md).[RollBackAction](Workflow.md#rollbackaction)

#### Defined in

[src/action-manager.ts:665](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L665)

___

### RollBackWorkflow

• **RollBackWorkflow**: typeof [`RevertWorkflow`](RevertWorkflow.md) = `RevertWorkflow`

#### Inherited from

[Workflow](Workflow.md).[RollBackWorkflow](Workflow.md#rollbackworkflow)

#### Defined in

[src/workflow-manager.ts:384](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L384)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Inherited from

[Workflow](Workflow.md).[app](Workflow.md#app)

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

[Workflow](Workflow.md).[cronDefaultSettings](Workflow.md#crondefaultsettings)

#### Defined in

[src/action-manager.ts:65](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L65)

___

### dBSession

• `Optional` **dBSession**: `ClientSession`

#### Inherited from

[Workflow](Workflow.md).[dBSession](Workflow.md#dbsession)

#### Defined in

[src/workflow-manager.ts:24](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L24)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{ `actionId`: `string`  }, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>

The database document of this action.

#### Inherited from

[Workflow](Workflow.md).[dbDoc](Workflow.md#dbdoc)

#### Defined in

[src/action-manager.ts:95](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L95)

___

### defaultDelay

• **defaultDelay**: `number` = `Infinity`

Shorcut to

**`Link`**

Action.defaultDelays[ActionState.IN_PROGRESS]

#### Inherited from

[Workflow](Workflow.md).[defaultDelay](Workflow.md#defaultdelay)

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

[Workflow](Workflow.md).[defaultDelays](Workflow.md#defaultdelays)

#### Defined in

[src/action-manager.ts:53](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L53)

___

### docsToSaveAtStepStart

• **docsToSaveAtStepStart**: `Document`<`any`, `any`, `any`\>[] = `[]`

#### Inherited from

[Workflow](Workflow.md).[docsToSaveAtStepStart](Workflow.md#docstosaveatstepstart)

#### Defined in

[src/workflow-manager.ts:26](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L26)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Inherited from

[Workflow](Workflow.md).[executor](Workflow.md#executor)

#### Defined in

[src/action-manager.ts:29](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L29)

___

### isInitialised

• **isInitialised**: `boolean` = `false`

#### Inherited from

[Workflow](Workflow.md).[isInitialised](Workflow.md#isinitialised)

#### Defined in

[src/action-manager.ts:346](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L346)

___

### oldAction

• **oldAction**: `WorkflowToRevert`

#### Defined in

[src/workflow-manager.ts:394](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L394)

___

### steps

• **steps**: [`Step`](../interfaces/Step.md)[] = `[]`

#### Inherited from

[Workflow](Workflow.md).[steps](Workflow.md#steps)

#### Defined in

[src/workflow-manager.ts:28](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L28)

___

### permanentRef

▪ `Static` **permanentRef**: `string`

The id of the action we store in database.
This should be a permanent id that designates your instance.
See :

#### Inherited from

[Workflow](Workflow.md).[permanentRef](Workflow.md#permanentref)

#### Defined in

[src/action-manager.ts:24](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L24)

## Accessors

### \_id

• `get` **_id**(): `this`[``"dbDoc"``][``"_id"``]

#### Returns

`this`[``"dbDoc"``][``"_id"``]

#### Inherited from

Workflow.\_id

#### Defined in

[src/action-manager.ts:142](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L142)

___

### argument

• `get` **argument**(): `this`[``"dbDoc"``][``"argument"``]

#### Returns

`this`[``"dbDoc"``][``"argument"``]

#### Inherited from

Workflow.argument

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

Workflow.argument

#### Defined in

[src/action-manager.ts:110](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L110)

___

### bag

• `get` **bag**(): `this`[``"dbDoc"``][``"bag"``]

#### Returns

`this`[``"dbDoc"``][``"bag"``]

#### Inherited from

Workflow.bag

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

Workflow.bag

#### Defined in

[src/action-manager.ts:101](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L101)

___

### cronActivity

• `get` **cronActivity**(): `this`[``"dbDoc"``][``"cronActivity"``]

#### Returns

`this`[``"dbDoc"``][``"cronActivity"``]

#### Inherited from

Workflow.cronActivity

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

Workflow.cronActivity

#### Defined in

[src/action-manager.ts:137](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L137)

___

### isRollBackPossible

• `get` **isRollBackPossible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Workflow.isRollBackPossible

#### Defined in

[src/workflow-manager.ts:370](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L370)

___

### repeat

• `get` **repeat**(): `this`[``"dbDoc"``][``"repeat"``]

#### Returns

`this`[``"dbDoc"``][``"repeat"``]

#### Inherited from

Workflow.repeat

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

Workflow.repeat

#### Defined in

[src/action-manager.ts:128](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L128)

___

### result

• `get` **result**(): `this`[``"dbDoc"``][``"result"``]

#### Returns

`this`[``"dbDoc"``][``"result"``]

#### Inherited from

Workflow.result

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

Workflow.result

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

[Workflow](Workflow.md).[_resume](Workflow.md#_resume)

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

[Workflow](Workflow.md).[activityLogs](Workflow.md#activitylogs)

#### Defined in

[src/action-manager.ts:561](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L561)

___

### catch

▸ **catch**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[catch](Workflow.md#catch)

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

[Workflow](Workflow.md).[changeState](Workflow.md#changestate)

#### Defined in

[src/action-manager.ts:478](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L478)

___

### createRollBackWorkflow

▸ **createRollBackWorkflow**(): [`Workflow`](Workflow.md)

#### Returns

[`Workflow`](Workflow.md)

The workflow that wait for the end of this action if needed and then rollback this action.

#### Inherited from

[Workflow](Workflow.md).[createRollBackWorkflow](Workflow.md#createrollbackworkflow)

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

#### Inherited from

[Workflow](Workflow.md).[declareActionEnd](Workflow.md#declareactionend)

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

#### Inherited from

[Workflow](Workflow.md).[declareActionStart](Workflow.md#declareactionstart)

#### Defined in

[src/workflow-manager.ts:160](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L160)

___

### define

▸ **define**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Workflow](Workflow.md).[define](Workflow.md#define)

#### Defined in

[src/workflow-manager.ts:406](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L406)

___

### endStep

▸ **endStep**(): `Promise`<`ActionState`\>

#### Returns

`Promise`<`ActionState`\>

#### Inherited from

[Workflow](Workflow.md).[endStep](Workflow.md#endstep)

#### Defined in

[src/workflow-manager.ts:286](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L286)

___

### finally

▸ **finally**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[finally](Workflow.md#finally)

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

[Workflow](Workflow.md).[getLogs](Workflow.md#getlogs)

#### Defined in

[src/action-manager.ts:565](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L565)

___

### getNextStep

▸ **getNextStep**(): `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Returns

`Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Inherited from

[Workflow](Workflow.md).[getNextStep](Workflow.md#getnextstep)

#### Defined in

[src/workflow-manager.ts:184](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L184)

___

### goTo

▸ **goTo**(`name`, `onState`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `onState` | [`ActionState`](../enums/ActionState.md) |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[goTo](Workflow.md#goto)

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

#### Inherited from

[Workflow](Workflow.md).[goToStep](Workflow.md#gotostep)

#### Defined in

[src/workflow-manager.ts:130](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L130)

___

### init

▸ **init**(): `Promise`<`void`\>

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

`Promise`<`void`\>

#### Overrides

[Workflow](Workflow.md).[init](Workflow.md#init)

#### Defined in

[src/workflow-manager.ts:396](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L396)

___

### initialisation

▸ **initialisation**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[Workflow](Workflow.md).[initialisation](Workflow.md#initialisation)

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

[Workflow](Workflow.md).[internalLog](Workflow.md#internallog)

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

[Workflow](Workflow.md).[internalLogError](Workflow.md#internallogerror)

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

#### Inherited from

[Workflow](Workflow.md).[isActionActive](Workflow.md#isactionactive)

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

#### Inherited from

[Workflow](Workflow.md).[main](Workflow.md#main)

#### Defined in

[src/workflow-manager.ts:317](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L317)

___

### name

▸ **name**(`name`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[name](Workflow.md#name)

#### Defined in

[src/workflow-manager.ts:122](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L122)

___

### next

▸ **next**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[next](Workflow.md#next)

#### Defined in

[src/workflow-manager.ts:49](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L49)

___

### onErrorGoTo

▸ **onErrorGoTo**(`name`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[onErrorGoTo](Workflow.md#onerrorgoto)

#### Defined in

[src/workflow-manager.ts:151](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L151)

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

[Workflow](Workflow.md).[onStateNotification](Workflow.md#onstatenotification)

#### Defined in

[src/action-manager.ts:487](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L487)

___

### onSuccessGoTo

▸ **onSuccessGoTo**(`name`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[onSuccessGoTo](Workflow.md#onsuccessgoto)

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

#### Inherited from

[Workflow](Workflow.md).[registerDocToSaveAtStepStart](Workflow.md#registerdoctosaveatstepstart)

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

[Workflow](Workflow.md).[resume](Workflow.md#resume)

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

[Workflow](Workflow.md).[resyncWithDb](Workflow.md#resyncwithdb)

#### Defined in

[src/action-manager.ts:212](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L212)

___

### revertChildrenAction

▸ **revertChildrenAction**(`stepIndex`): `Promise`<[`Workflow`](Workflow.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stepIndex` | `any` |

#### Returns

`Promise`<[`Workflow`](Workflow.md)[]\>

#### Defined in

[src/workflow-manager.ts:439](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L439)

___

### rollBack

▸ **rollBack**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Shortcut to configure a rollback. Will be encapsulated in a larger action

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Inherited from

[Workflow](Workflow.md).[rollBack](Workflow.md#rollback)

#### Defined in

[src/action-manager.ts:643](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L643)

___

### rollBackWatcher

▸ **rollBackWatcher**(): `Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

Shortcut to configure the watcher of the rollback Action

#### Returns

`Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

#### Inherited from

[Workflow](Workflow.md).[rollBackWatcher](Workflow.md#rollbackwatcher)

#### Defined in

[src/action-manager.ts:651](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L651)

___

### rollback

▸ **rollback**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `any`[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[rollback](Workflow.md#rollback-1)

#### Defined in

[src/workflow-manager.ts:113](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/workflow-manager.ts#L113)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{ `actionId`: `string`  }, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{ `actionId`: `string`  }, { `actions`: { `[key: string]`: { `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: `any` ; `stepsHistory`: `number`[]  }, {}\>\>

#### Inherited from

[Workflow](Workflow.md).[save](Workflow.md#save)

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
| `args.actionId` | `string` | - |

#### Returns

`void`

#### Inherited from

[Workflow](Workflow.md).[setArgument](Workflow.md#setargument)

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

[Workflow](Workflow.md).[setFilter](Workflow.md#setfilter)

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

[Workflow](Workflow.md).[setRepeat](Workflow.md#setrepeat)

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

[Workflow](Workflow.md).[setResult](Workflow.md#setresult)

#### Defined in

[src/action-manager.ts:329](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L329)

___

### startStep

▸ **startStep**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[Workflow](Workflow.md).[startStep](Workflow.md#startstep)

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

#### Inherited from

[Workflow](Workflow.md).[watcher](Workflow.md#watcher)

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

[Workflow](Workflow.md).[constructFromDb](Workflow.md#constructfromdb)

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

[Workflow](Workflow.md).[reject](Workflow.md#reject)

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

[Workflow](Workflow.md).[resolve](Workflow.md#resolve)

#### Defined in

[src/action-manager.ts:229](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/action-manager.ts#L229)
