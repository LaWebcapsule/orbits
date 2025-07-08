[@orbi-ts/orbits](../README.md) / [Exports](../modules.md) / RevertWorkflow

# Class: RevertWorkflow<WorkflowToRevert\>

Structure actions.

Extends this class to build new actions behaviors.

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
- [dBSession](RevertWorkflow.md#dbsession)
- [dbDoc](RevertWorkflow.md#dbdoc)
- [docsToSaveAtStepStart](RevertWorkflow.md#docstosaveatstepstart)
- [executor](RevertWorkflow.md#executor)
- [isExecutorSet](RevertWorkflow.md#isexecutorset)
- [isInitialised](RevertWorkflow.md#isinitialised)
- [isInitialized](RevertWorkflow.md#isinitialized)
- [oldAction](RevertWorkflow.md#oldaction)
- [steps](RevertWorkflow.md#steps)
- [cronDefaultSettings](RevertWorkflow.md#crondefaultsettings)
- [defaultDelay](RevertWorkflow.md#defaultdelay)
- [defaultDelays](RevertWorkflow.md#defaultdelays)
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
- [breakAndReject](RevertWorkflow.md#breakandreject)
- [breakAndReturn](RevertWorkflow.md#breakandreturn)
- [catch](RevertWorkflow.md#catch)
- [changeState](RevertWorkflow.md#changestate)
- [createRollBackWorkflow](RevertWorkflow.md#createrollbackworkflow)
- [declareActionEnd](RevertWorkflow.md#declareactionend)
- [declareActionStart](RevertWorkflow.md#declareactionstart)
- [define](RevertWorkflow.md#define)
- [defineExecutor](RevertWorkflow.md#defineexecutor)
- [dynamicallyDefineFromWorkflowStep](RevertWorkflow.md#dynamicallydefinefromworkflowstep)
- [dynamiclyDefineFromWorfklowStep](RevertWorkflow.md#dynamiclydefinefromworfklowstep)
- [endStep](RevertWorkflow.md#endstep)
- [finally](RevertWorkflow.md#finally)
- [getActionsOfStep](RevertWorkflow.md#getactionsofstep)
- [getLogs](RevertWorkflow.md#getlogs)
- [getNextStep](RevertWorkflow.md#getnextstep)
- [goTo](RevertWorkflow.md#goto)
- [goToStep](RevertWorkflow.md#gotostep)
- [inWorkflowRedefineAction](RevertWorkflow.md#inworkflowredefineaction)
- [inWorkflowStepAction](RevertWorkflow.md#inworkflowstepaction)
- [init](RevertWorkflow.md#init)
- [initialisation](RevertWorkflow.md#initialisation)
- [initialization](RevertWorkflow.md#initialization)
- [internalLog](RevertWorkflow.md#internallog)
- [internalLogError](RevertWorkflow.md#internallogerror)
- [isActionActive](RevertWorkflow.md#isactionactive)
- [main](RevertWorkflow.md#main)
- [name](RevertWorkflow.md#name)
- [next](RevertWorkflow.md#next)
- [onComplete](RevertWorkflow.md#oncomplete)
- [onError](RevertWorkflow.md#onerror)
- [onErrorGoTo](RevertWorkflow.md#onerrorgoto)
- [onMainTimeout](RevertWorkflow.md#onmaintimeout)
- [onStateNotification](RevertWorkflow.md#onstatenotification)
- [onSuccessGoTo](RevertWorkflow.md#onsuccessgoto)
- [registerDetachedAction](RevertWorkflow.md#registerdetachedaction)
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
- [\_constructFromDb](RevertWorkflow.md#_constructfromdb)
- [constructFromDb](RevertWorkflow.md#constructfromdb)
- [dynamicDefinitionFromWorkflowStep](RevertWorkflow.md#dynamicdefinitionfromworkflowstep)
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

[src/core/actions/src/workflow-manager.ts:64](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L64)

## Properties

### IArgument

• **IArgument**: `Object`

Action argument

#### Type declaration

| Name | Type |
| :------ | :------ |
| `actionId` | `string` |

#### Overrides

[Workflow](Workflow.md).[IArgument](Workflow.md#iargument)

#### Defined in

[src/core/actions/src/workflow-manager.ts:604](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L604)

___

### IBag

• **IBag**: `Object`

Action bag

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `actions` | { `[key: string]`: { `index`: `number` ; `ref`: `string` ; `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } | - |
| `currentStepIndex?` | `number` | - |
| `currentStepName?` | `string` | - |
| `getNextStepAttemp` | `number` | **`Deprecated`** |
| `isRollBackPossible` | `boolean` | - |
| `nTimesCurrentStep` | `number` | - |
| `oldResult` | [`StepResult`](../interfaces/StepResult.md)<`any`\>[] | - |
| `preserveOldResult` | [`StepResult`](../interfaces/StepResult.md)<`any`\>[] | - |
| `stepsHistory` | `number`[] | - |

#### Inherited from

[Workflow](Workflow.md).[IBag](Workflow.md#ibag)

#### Defined in

[src/core/actions/src/workflow-manager.ts:42](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L42)

___

### IResult

• **IResult**: `Object`

Action result

#### Inherited from

[Workflow](Workflow.md).[IResult](Workflow.md#iresult)

#### Defined in

[src/core/actions/src/action-manager.ts:94](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L94)

___

### RollBackAction

• **RollBackAction**: typeof [`Action`](Action.md) = `RollBackAction`

The action that rollback this action.

#### Inherited from

[Workflow](Workflow.md).[RollBackAction](Workflow.md#rollbackaction)

#### Defined in

[src/core/actions/src/action-manager.ts:868](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L868)

___

### RollBackWorkflow

• **RollBackWorkflow**: typeof [`RevertWorkflow`](RevertWorkflow.md) = `RevertWorkflow`

Workflow that rollbacks the action.

Wait for action end then rollback.
Will use [RollBackAction](RollBackAction.md).

#### Inherited from

[Workflow](Workflow.md).[RollBackWorkflow](Workflow.md#rollbackworkflow)

#### Defined in

[src/core/actions/src/workflow-manager.ts:598](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L598)

___

### app

• **app**: [`ActionRuntime`](ActionRuntime.md)

#### Inherited from

[Workflow](Workflow.md).[app](Workflow.md#app)

#### Defined in

[src/core/actions/src/action-manager.ts:27](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L27)

___

### dBSession

• `Optional` **dBSession**: `ClientSession`

#### Inherited from

[Workflow](Workflow.md).[dBSession](Workflow.md#dbsession)

#### Defined in

[src/core/actions/src/workflow-manager.ts:36](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L36)

___

### dbDoc

• **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{ `actionId`: `string`  }, { `actions`: { `[key: string]`: { `index`: `number` ; `ref`: `string` ; `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `currentStepName?`: `string` ; `getNextStepAttemp`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[] ; `preserveOldResult`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[] ; `stepsHistory`: `number`[]  }, {}\>

Action Database Document

#### Inherited from

[Workflow](Workflow.md).[dbDoc](Workflow.md#dbdoc)

#### Defined in

[src/core/actions/src/action-manager.ts:99](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L99)

___

### docsToSaveAtStepStart

• **docsToSaveAtStepStart**: `Document`<`any`, `any`, `any`\>[] = `[]`

#### Inherited from

[Workflow](Workflow.md).[docsToSaveAtStepStart](Workflow.md#docstosaveatstepstart)

#### Defined in

[src/core/actions/src/workflow-manager.ts:38](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L38)

___

### executor

• `Optional` **executor**: [`Executor`](Executor.md)

Specify an executor in which all actions of this class will run.

#### Inherited from

[Workflow](Workflow.md).[executor](Workflow.md#executor)

#### Defined in

[src/core/actions/src/action-manager.ts:25](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L25)

___

### isExecutorSet

• **isExecutorSet**: `boolean` = `false`

#### Inherited from

[Workflow](Workflow.md).[isExecutorSet](Workflow.md#isexecutorset)

#### Defined in

[src/core/actions/src/action-manager.ts:478](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L478)

___

### isInitialised

• **isInitialised**: `boolean` = `false`

**`Deprecated`**

use isInitialized

#### Inherited from

[Workflow](Workflow.md).[isInitialised](Workflow.md#isinitialised)

#### Defined in

[src/core/actions/src/action-manager.ts:450](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L450)

___

### isInitialized

• **isInitialized**: `boolean` = `false`

#### Inherited from

[Workflow](Workflow.md).[isInitialized](Workflow.md#isinitialized)

#### Defined in

[src/core/actions/src/action-manager.ts:451](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L451)

___

### oldAction

• **oldAction**: `WorkflowToRevert`

#### Defined in

[src/core/actions/src/workflow-manager.ts:608](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L608)

___

### steps

• **steps**: [`Step`](../interfaces/Step.md)[] = `[]`

#### Inherited from

[Workflow](Workflow.md).[steps](Workflow.md#steps)

#### Defined in

[src/core/actions/src/workflow-manager.ts:40](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L40)

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

[Workflow](Workflow.md).[cronDefaultSettings](Workflow.md#crondefaultsettings)

#### Defined in

[src/core/actions/src/action-manager.ts:67](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L67)

___

### defaultDelay

▪ `Static` **defaultDelay**: `number` = `Infinity`

Shortcut to [[ActionState.IN_PROGRESS]](Action.md#defaultdelays).

If not set, this property will be 'inherited' from the first parent class where it is.

#### Inherited from

[Workflow](Workflow.md).[defaultDelay](Workflow.md#defaultdelay)

#### Defined in

[src/core/actions/src/workflow-manager.ts:34](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L34)

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

[Workflow](Workflow.md).[defaultDelays](Workflow.md#defaultdelays)

#### Defined in

[src/core/actions/src/action-manager.ts:55](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L55)

___

### permanentRef

▪ `Static` **permanentRef**: `string` \| `string`[]

Id of the action stored in database.
It should be a permanent id that designates the action instance.

#### Inherited from

[Workflow](Workflow.md).[permanentRef](Workflow.md#permanentref)

#### Defined in

[src/core/actions/src/action-manager.ts:20](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L20)

## Accessors

### \_id

• `get` **_id**(): `this`[``"dbDoc"``][``"_id"``]

#### Returns

`this`[``"dbDoc"``][``"_id"``]

#### Inherited from

Workflow.\_id

#### Defined in

[src/core/actions/src/action-manager.ts:150](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L150)

___

### argument

• `get` **argument**(): `this`[``"dbDoc"``][``"argument"``]

#### Returns

`this`[``"dbDoc"``][``"argument"``]

#### Inherited from

Workflow.argument

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

Workflow.argument

#### Defined in

[src/core/actions/src/action-manager.ts:118](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L118)

___

### bag

• `get` **bag**(): `this`[``"dbDoc"``][``"bag"``]

#### Returns

`this`[``"dbDoc"``][``"bag"``]

#### Inherited from

Workflow.bag

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

Workflow.bag

#### Defined in

[src/core/actions/src/action-manager.ts:109](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L109)

___

### cronActivity

• `get` **cronActivity**(): `this`[``"dbDoc"``][``"cronActivity"``]

#### Returns

`this`[``"dbDoc"``][``"cronActivity"``]

#### Inherited from

Workflow.cronActivity

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

Workflow.cronActivity

#### Defined in

[src/core/actions/src/action-manager.ts:145](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L145)

___

### isRollBackPossible

• `get` **isRollBackPossible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Workflow.isRollBackPossible

#### Defined in

[src/core/actions/src/workflow-manager.ts:585](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L585)

___

### repeat

• `get` **repeat**(): `this`[``"dbDoc"``][``"repeat"``]

#### Returns

`this`[``"dbDoc"``][``"repeat"``]

#### Inherited from

Workflow.repeat

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

Workflow.repeat

#### Defined in

[src/core/actions/src/action-manager.ts:136](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L136)

___

### result

• `get` **result**(): `this`[``"dbDoc"``][``"result"``]

#### Returns

`this`[``"dbDoc"``][``"result"``]

#### Inherited from

Workflow.result

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

Workflow.result

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

[Workflow](Workflow.md).[_resume](Workflow.md#_resume)

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

[Workflow](Workflow.md).[activityLogs](Workflow.md#activitylogs)

#### Defined in

[src/core/actions/src/action-manager.ts:752](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L752)

___

### breakAndReject

▸ **breakAndReject**(`result`): [`RejectAction`](RejectAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `any` |

#### Returns

[`RejectAction`](RejectAction.md)

#### Inherited from

[Workflow](Workflow.md).[breakAndReject](Workflow.md#breakandreject)

#### Defined in

[src/core/actions/src/workflow-manager.ts:185](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L185)

___

### breakAndReturn

▸ **breakAndReturn**(`result`): [`ResolveAction`](ResolveAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `any` |

#### Returns

[`ResolveAction`](ResolveAction.md)

#### Inherited from

[Workflow](Workflow.md).[breakAndReturn](Workflow.md#breakandreturn)

#### Defined in

[src/core/actions/src/workflow-manager.ts:178](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L178)

___

### catch

▸ **catch**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[catch](Workflow.md#catch)

#### Defined in

[src/core/actions/src/workflow-manager.ts:77](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L77)

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

[src/core/actions/src/action-manager.ts:640](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L640)

___

### createRollBackWorkflow

▸ **createRollBackWorkflow**(): [`Workflow`](Workflow.md)

Instantiate workflow that will rollback this action.

#### Returns

[`Workflow`](Workflow.md)

#### Inherited from

[Workflow](Workflow.md).[createRollBackWorkflow](Workflow.md#createrollbackworkflow)

#### Defined in

[src/core/actions/src/action-manager.ts:881](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L881)

___

### declareActionEnd

▸ **declareActionEnd**(`dbDoc`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbDoc` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Workflow](Workflow.md).[declareActionEnd](Workflow.md#declareactionend)

#### Defined in

[src/core/actions/src/workflow-manager.ts:238](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L238)

___

### declareActionStart

▸ **declareActionStart**(`dbDoc`, `index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbDoc` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |
| `index` | `number` |

#### Returns

`void`

#### Inherited from

[Workflow](Workflow.md).[declareActionStart](Workflow.md#declareactionstart)

#### Defined in

[src/core/actions/src/workflow-manager.ts:213](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L213)

___

### define

▸ **define**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Workflow](Workflow.md).[define](Workflow.md#define)

#### Defined in

[src/core/actions/src/workflow-manager.ts:624](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L624)

___

### defineExecutor

▸ **defineExecutor**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[Workflow](Workflow.md).[defineExecutor](Workflow.md#defineexecutor)

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

[Workflow](Workflow.md).[dynamicallyDefineFromWorkflowStep](Workflow.md#dynamicallydefinefromworkflowstep)

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

[Workflow](Workflow.md).[dynamiclyDefineFromWorfklowStep](Workflow.md#dynamiclydefinefromworfklowstep)

#### Defined in

[src/core/actions/src/action-manager.ts:293](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L293)

___

### endStep

▸ **endStep**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Inherited from

[Workflow](Workflow.md).[endStep](Workflow.md#endstep)

#### Defined in

[src/core/actions/src/workflow-manager.ts:409](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L409)

___

### finally

▸ **finally**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[finally](Workflow.md#finally)

#### Defined in

[src/core/actions/src/workflow-manager.ts:90](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L90)

___

### getActionsOfStep

▸ **getActionsOfStep**(`opts`): `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.oldResults?` | `any`[] |
| `opts.stepIndex?` | `number` |
| `opts.stepName?` | `string` |

#### Returns

`Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Inherited from

[Workflow](Workflow.md).[getActionsOfStep](Workflow.md#getactionsofstep)

#### Defined in

[src/core/actions/src/workflow-manager.ts:305](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L305)

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

[src/core/actions/src/action-manager.ts:756](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L756)

___

### getNextStep

▸ **getNextStep**(): `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Returns

`Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

#### Inherited from

[Workflow](Workflow.md).[getNextStep](Workflow.md#getnextstep)

#### Defined in

[src/core/actions/src/workflow-manager.ts:249](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L249)

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

[src/core/actions/src/workflow-manager.ts:170](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L170)

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

[src/core/actions/src/workflow-manager.ts:161](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L161)

___

### inWorkflowRedefineAction

▸ **inWorkflowRedefineAction**(`marker`, `actions`): `Promise`<[`Action`](Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `string` |
| `actions` | [`Action`](Action.md) |

#### Returns

`Promise`<[`Action`](Action.md)\>

#### Inherited from

[Workflow](Workflow.md).[inWorkflowRedefineAction](Workflow.md#inworkflowredefineaction)

#### Defined in

[src/core/actions/src/workflow-manager.ts:554](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L554)

▸ **inWorkflowRedefineAction**(`marker`, `actions`): `Promise`<[`Action`](Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `string` |
| `actions` | () => [`Action`](Action.md) |

#### Returns

`Promise`<[`Action`](Action.md)\>

#### Inherited from

[Workflow](Workflow.md).[inWorkflowRedefineAction](Workflow.md#inworkflowredefineaction)

#### Defined in

[src/core/actions/src/workflow-manager.ts:555](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L555)

▸ **inWorkflowRedefineAction**(`marker`, `actions`): `Promise`<[`Action`](Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `string` |
| `actions` | () => `Promise`<[`Action`](Action.md)\> |

#### Returns

`Promise`<[`Action`](Action.md)\>

#### Inherited from

[Workflow](Workflow.md).[inWorkflowRedefineAction](Workflow.md#inworkflowredefineaction)

#### Defined in

[src/core/actions/src/workflow-manager.ts:559](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L559)

___

### inWorkflowStepAction

▸ **inWorkflowStepAction**(`marker`, `opts`): [`Action`](Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `string` |
| `opts` | `Object` |
| `opts.init?` | () => `Promise`<`any`\> |
| `opts.main` | () => [`ActionState`](../enums/ActionState.md) \| `Promise`<[`ActionState`](../enums/ActionState.md)\> |
| `opts.watcher?` | () => `Promise`<[`ActionState`](../enums/ActionState.md)\> |

#### Returns

[`Action`](Action.md)

#### Inherited from

[Workflow](Workflow.md).[inWorkflowStepAction](Workflow.md#inworkflowstepaction)

#### Defined in

[src/core/actions/src/workflow-manager.ts:512](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L512)

▸ **inWorkflowStepAction**(`marker`, `cb`): [`Action`](Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `marker` | `string` |
| `cb` | () => `Promise`<`any`\> |

#### Returns

[`Action`](Action.md)

#### Inherited from

[Workflow](Workflow.md).[inWorkflowStepAction](Workflow.md#inworkflowstepaction)

#### Defined in

[src/core/actions/src/workflow-manager.ts:520](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L520)

___

### init

▸ **init**(): `Promise`<`void`\>

Initialize the action from the action stored in the database.

Example: In order to not store secrets in the database,
you can set a vault id in the argument
and retrieve the secret at the initialization of the action.

Example: You cannot store class object on the database.
If your action use complex object, they can be initialized here.

#### Returns

`Promise`<`void`\>

#### Overrides

[Workflow](Workflow.md).[init](Workflow.md#init)

#### Defined in

[src/core/actions/src/workflow-manager.ts:610](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L610)

___

### initialisation

▸ **initialisation**(): `Promise`<`void`\>

**`Deprecated`**

use initialization

#### Returns

`Promise`<`void`\>

#### Inherited from

[Workflow](Workflow.md).[initialisation](Workflow.md#initialisation)

#### Defined in

[src/core/actions/src/workflow-manager.ts:437](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L437)

___

### initialization

▸ **initialization**(): `Promise`<`void`\>

Mainly used for workflows.
Can also complement init().
If it gets too complex, use hooks.

#### Returns

`Promise`<`void`\>

#### Inherited from

[Workflow](Workflow.md).[initialization](Workflow.md#initialization)

#### Defined in

[src/core/actions/src/workflow-manager.ts:441](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L441)

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

[Workflow](Workflow.md).[internalLogError](Workflow.md#internallogerror)

#### Defined in

[src/core/actions/src/workflow-manager.ts:574](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L574)

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

[src/core/actions/src/workflow-manager.ts:202](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L202)

___

### main

▸ **main**(): `Promise`<`any`\>

This method should launched the main action process
It is called only one time.
It returns a state value.

#### Returns

`Promise`<`any`\>

#### Inherited from

[Workflow](Workflow.md).[main](Workflow.md#main)

#### Defined in

[src/core/actions/src/workflow-manager.ts:453](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L453)

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

[src/core/actions/src/workflow-manager.ts:154](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L154)

___

### next

▸ **next**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[next](Workflow.md#next)

#### Defined in

[src/core/actions/src/workflow-manager.ts:68](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L68)

___

### onComplete

▸ **onComplete**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[onComplete](Workflow.md#oncomplete)

#### Defined in

[src/core/actions/src/workflow-manager.ts:94](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L94)

___

### onError

▸ **onError**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[onError](Workflow.md#onerror)

#### Defined in

[src/core/actions/src/workflow-manager.ts:81](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L81)

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

[src/core/actions/src/workflow-manager.ts:197](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L197)

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

[Workflow](Workflow.md).[onMainTimeout](Workflow.md#onmaintimeout)

#### Defined in

[src/core/actions/src/workflow-manager.ts:465](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L465)

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

[Workflow](Workflow.md).[onStateNotification](Workflow.md#onstatenotification)

#### Defined in

[src/core/actions/src/action-manager.ts:650](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L650)

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

[src/core/actions/src/workflow-manager.ts:192](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L192)

___

### registerDetachedAction

▸ **registerDetachedAction**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](Action.md) |

#### Returns

`void`

#### Inherited from

[Workflow](Workflow.md).[registerDetachedAction](Workflow.md#registerdetachedaction)

#### Defined in

[src/core/actions/src/workflow-manager.ts:430](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L430)

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

[src/core/actions/src/workflow-manager.ts:426](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L426)

___

### resume

▸ **resume**(): `Promise`<`any`\>

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`<`any`\>

A promise. You can not rely on this to know when an action is finished.

#### Inherited from

[Workflow](Workflow.md).[resume](Workflow.md#resume)

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

[Workflow](Workflow.md).[resyncWithDb](Workflow.md#resyncwithdb)

#### Defined in

[src/core/actions/src/action-manager.ts:312](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L312)

___

### revertChildrenAction

▸ **revertChildrenAction**(`stepIndex`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stepIndex` | `any` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/core/actions/src/workflow-manager.ts:652](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L652)

___

### rollBack

▸ **rollBack**(): `Promise`<[`ActionState`](../enums/ActionState.md)\>

Shortcut to configure a rollback.
Will be encapsulated in a larger action

#### Returns

`Promise`<[`ActionState`](../enums/ActionState.md)\>

#### Inherited from

[Workflow](Workflow.md).[rollBack](Workflow.md#rollback)

#### Defined in

[src/core/actions/src/action-manager.ts:847](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L847)

___

### rollBackWatcher

▸ **rollBackWatcher**(): `Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

Shortcut to configure the watcher for the rollback.

#### Returns

`Promise`<[`UNKNOW`](../enums/ActionState.md#unknow) \| [`SUCCESS`](../enums/ActionState.md#success)\>

#### Inherited from

[Workflow](Workflow.md).[rollBackWatcher](Workflow.md#rollbackwatcher)

#### Defined in

[src/core/actions/src/action-manager.ts:855](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L855)

___

### rollback

▸ **rollback**(`cb`, `opts?`): [`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[]) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\> |
| `opts?` | `Object` |
| `opts.retry` | `number` |

#### Returns

[`RevertWorkflow`](RevertWorkflow.md)<`WorkflowToRevert`\>

#### Inherited from

[Workflow](Workflow.md).[rollback](Workflow.md#rollback-1)

#### Defined in

[src/core/actions/src/workflow-manager.ts:145](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L145)

___

### save

▸ **save**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{ `actionId`: `string`  }, { `actions`: { `[key: string]`: { `index`: `number` ; `ref`: `string` ; `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `currentStepName?`: `string` ; `getNextStepAttemp`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[] ; `preserveOldResult`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[] ; `stepsHistory`: `number`[]  }, {}\>\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<{ `actionId`: `string`  }, { `actions`: { `[key: string]`: { `index`: `number` ; `ref`: `string` ; `result`: `any` ; `state`: [`ActionState`](../enums/ActionState.md)  };  } ; `currentStepIndex?`: `number` ; `currentStepName?`: `string` ; `getNextStepAttemp`: `number` ; `isRollBackPossible`: `boolean` ; `nTimesCurrentStep`: `number` ; `oldResult`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[] ; `preserveOldResult`: [`StepResult`](../interfaces/StepResult.md)<`any`\>[] ; `stepsHistory`: `number`[]  }, {}\>\>

#### Inherited from

[Workflow](Workflow.md).[save](Workflow.md#save)

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
| `args.actionId` | `string` | - |

#### Returns

`void`

#### Inherited from

[Workflow](Workflow.md).[setArgument](Workflow.md#setargument)

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

[Workflow](Workflow.md).[setFilter](Workflow.md#setfilter)

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

[Workflow](Workflow.md).[setRepeat](Workflow.md#setrepeat)

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

[Workflow](Workflow.md).[setResult](Workflow.md#setresult)

#### Defined in

[src/core/actions/src/action-manager.ts:430](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L430)

___

### startStep

▸ **startStep**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[Workflow](Workflow.md).[startStep](Workflow.md#startstep)

#### Defined in

[src/core/actions/src/workflow-manager.ts:330](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L330)

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

#### Inherited from

[Workflow](Workflow.md).[watcher](Workflow.md#watcher)

#### Defined in

[src/core/actions/src/workflow-manager.ts:470](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L470)

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

[Workflow](Workflow.md).[_constructFromDb](Workflow.md#_constructfromdb)

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

[Workflow](Workflow.md).[constructFromDb](Workflow.md#constructfromdb)

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

[Workflow](Workflow.md).[dynamicDefinitionFromWorkflowStep](Workflow.md#dynamicdefinitionfromworkflowstep)

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

[Workflow](Workflow.md).[reject](Workflow.md#reject)

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

[Workflow](Workflow.md).[resolve](Workflow.md#resolve)

#### Defined in

[src/core/actions/src/action-manager.ts:329](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-manager.ts#L329)
