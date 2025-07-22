# Class: `abstract` Digestor

Defined in: [core/actions/src/coalescing-manager.ts:139](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L139)

Structure actions.

Extends this class to build new actions behaviors.

## Extends

- [`CoalescingWorkflow`](CoalescingWorkflow.md)

## Constructors

### Constructor

> **new Digestor**(): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:80](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L80)

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`constructor`](CoalescingWorkflow.md#constructor)

## Properties

### dbDoc

> **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `getNextStepAttemp`: `number`; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `void` \| `Error` \| `JSONObject`\>

Defined in: [core/actions/src/action-manager.ts:114](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L114)

Action Database Document

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dbDoc`](CoalescingWorkflow.md#dbdoc)

***

### dBSession?

> `optional` **dBSession**: `ClientSession`

Defined in: [core/actions/src/workflow-manager.ts:47](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L47)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dBSession`](CoalescingWorkflow.md#dbsession)

***

### defineCallMode

> **defineCallMode**: `"main"` \| `"actionFinding"`

Defined in: [core/actions/src/workflow-manager.ts:233](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L233)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defineCallMode`](CoalescingWorkflow.md#definecallmode)

***

### docsToSaveAtStepStart

> **docsToSaveAtStepStart**: `Document`\<`any`, `any`, `any`\>[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:49](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L49)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`docsToSaveAtStepStart`](CoalescingWorkflow.md#docstosaveatstepstart)

***

### dynamicActionFound

> **dynamicActionFound**: [`Action`](Action.md)

Defined in: [core/actions/src/workflow-manager.ts:245](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L245)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dynamicActionFound`](CoalescingWorkflow.md#dynamicactionfound)

***

### dynamicActionToFound

> **dynamicActionToFound**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)

Defined in: [core/actions/src/workflow-manager.ts:244](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L244)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dynamicActionToFound`](CoalescingWorkflow.md#dynamicactiontofound)

***

### executingDefine

> **executingDefine**: `boolean` = `false`

Defined in: [core/actions/src/workflow-manager.ts:232](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L232)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`executingDefine`](CoalescingWorkflow.md#executingdefine)

***

### executor?

> `optional` **executor**: [`Executor`](Executor.md)

Defined in: [core/actions/src/action-manager.ts:40](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L40)

Specify an executor in which all actions of this class will run.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`executor`](CoalescingWorkflow.md#executor)

***

### IArgument

> **IArgument**: `JSONObject`

Defined in: [core/actions/src/action-manager.ts:99](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L99)

Action argument

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`IArgument`](CoalescingWorkflow.md#iargument)

***

### IBag

> **IBag**: `object`

Defined in: [core/actions/src/workflow-manager.ts:53](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L53)

Action bag

#### actions

> **actions**: `object`

##### Index Signature

\[`key`: `string`\]: `object`

#### currentStepIndex?

> `optional` **currentStepIndex**: `number`

#### currentStepName?

> `optional` **currentStepName**: `string`

#### currentTrackIds

> **currentTrackIds**: `string`[]

#### ~~getNextStepAttemp~~

> **getNextStepAttemp**: `number`

##### Deprecated

#### isRollBackPossible

> **isRollBackPossible**: `boolean`

#### nTimesCurrentStep

> **nTimesCurrentStep**: `number`

#### oldResult

> **oldResult**: [`StepResult`](../type-aliases/StepResult.md)[]

#### preserveOldResult

> **preserveOldResult**: [`StepResult`](../type-aliases/StepResult.md)[]

#### registeredActions

> **registeredActions**: `object`[]

#### stepsHistory

> **stepsHistory**: `number`[]

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`IBag`](CoalescingWorkflow.md#ibag)

***

### IResult

> **IResult**: `void` \| `Error` \| `JSONObject`

Defined in: [core/actions/src/action-manager.ts:109](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L109)

Action result

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`IResult`](CoalescingWorkflow.md#iresult)

***

### isExecutorSet

> **isExecutorSet**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:530](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L530)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isExecutorSet`](CoalescingWorkflow.md#isexecutorset)

***

### ~~isInitialised~~

> **isInitialised**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:502](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L502)

#### Deprecated

use isInitialized

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isInitialised`](CoalescingWorkflow.md#isinitialised)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:503](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L503)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isInitialized`](CoalescingWorkflow.md#isinitialized)

***

### mapRefWithStrategy

> **mapRefWithStrategy**: `Map`\<`string`, `"default"` \| `"cross-workflow"`\>

Defined in: [core/actions/src/coalescing-manager.ts:90](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L90)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`mapRefWithStrategy`](CoalescingWorkflow.md#maprefwithstrategy)

***

### notifyHealthPromise

> **notifyHealthPromise**: `Promise`\<`any`\> = `undefined`

Defined in: [core/actions/src/action-manager.ts:962](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L962)

Send a signal to indicate that the action is still in progress..
Useful for preventing timeouts when the action's duration is long but not precisely predictable.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`notifyHealthPromise`](CoalescingWorkflow.md#notifyhealthpromise)

***

### registeredActionIds

> **registeredActionIds**: `any`[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:495](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L495)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`registeredActionIds`](CoalescingWorkflow.md#registeredactionids)

***

### resolveDefineIteration()

> **resolveDefineIteration**: (`actionState?`) => `void`

Defined in: [core/actions/src/workflow-manager.ts:279](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L279)

#### Parameters

##### actionState?

[`ActionState`](../enumerations/ActionState.md)

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resolveDefineIteration`](CoalescingWorkflow.md#resolvedefineiteration)

***

### runtime

> **runtime**: [`ActionRuntime`](ActionRuntime.md) = `ActionRuntime.activeRuntime`

Defined in: [core/actions/src/action-manager.ts:42](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L42)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`runtime`](CoalescingWorkflow.md#runtime)

***

### steps

> **steps**: [`Step`](../interfaces/Step.md)[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:51](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L51)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`steps`](CoalescingWorkflow.md#steps)

***

### cronDefaultSettings

> `static` **cronDefaultSettings**: `object`

Defined in: [core/actions/src/action-manager.ts:82](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L82)

Configure the frequency at which a cron will launch [Action.resume](Action.md#resume).
It is also possible to dynamically modify the dbDoc.cronActivity property to modify the call to a cron.
If not set, this property will be 'inherited' from the first parent class where it is.

#### ~~activityFrequence?~~

> `optional` **activityFrequence**: `number`

##### Deprecated

use activityFrequency

#### activityFrequency?

> `optional` **activityFrequency**: `number`

TODO: set this as required after activityFrequence removal

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`cronDefaultSettings`](CoalescingWorkflow.md#crondefaultsettings)

***

### defaultDelay

> `static` **defaultDelay**: `number` = `Infinity`

Defined in: [core/actions/src/workflow-manager.ts:43](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L43)

Shortcut to [\[ActionState.IN\_PROGRESS\]](Action.md#defaultdelays).

If not set, this property will be 'inherited' from the first parent class where it is.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defaultDelay`](CoalescingWorkflow.md#defaultdelay)

***

### defaultDelays

> `static` **defaultDelays**: `object`

Defined in: [core/actions/src/action-manager.ts:70](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L70)

For the states `ActionState.EXECUTING_MAIN` and `ActionState.IN_PROGRESS`,
this object configures the time after which, if no change happened, an action is considered in error.

For example, an action can only be in the `ActionState.IN_PROGRESS` state for as long as
`defaultDelays[ActionState.IN_PROGRESS]` time.

#### 1?

> `optional` **1**: `number`

#### 2?

> `optional` **2**: `number`

#### Default Value

```
{
   [ActionState.IN_PROGRESS] : this.defaultDelay,
   [ActionState.EXECUTING_MAIN] : 2*60*1000,
}
```

You should configure this if your actions have longer timeouts.

If not set, this property will be 'inherited' from the first parent class where it is.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defaultDelays`](CoalescingWorkflow.md#defaultdelays)

***

### permanentRef

> `static` **permanentRef**: `string` \| `string`[]

Defined in: [core/actions/src/action-manager.ts:35](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L35)

Id of the action stored in database.
It should be a permanent id that designates the action instance.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`permanentRef`](CoalescingWorkflow.md#permanentref)

## Accessors

### \_id

#### Get Signature

> **get** **\_id**(): `this`\[`"dbDoc"`\]\[`"_id"`\]

Defined in: [core/actions/src/action-manager.ts:165](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L165)

##### Returns

`this`\[`"dbDoc"`\]\[`"_id"`\]

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`_id`](CoalescingWorkflow.md#_id)

***

### argument

#### Get Signature

> **get** **argument**(): `this`\[`"dbDoc"`\]\[`"argument"`\]

Defined in: [core/actions/src/action-manager.ts:129](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L129)

##### Returns

`this`\[`"dbDoc"`\]\[`"argument"`\]

#### Set Signature

> **set** **argument**(`argument`): `void`

Defined in: [core/actions/src/action-manager.ts:133](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L133)

##### Parameters

###### argument

`this`\[`"dbDoc"`\]\[`"argument"`\]

##### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`argument`](CoalescingWorkflow.md#argument)

***

### bag

#### Get Signature

> **get** **bag**(): `this`\[`"dbDoc"`\]\[`"bag"`\]

Defined in: [core/actions/src/action-manager.ts:120](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L120)

##### Returns

`this`\[`"dbDoc"`\]\[`"bag"`\]

#### Set Signature

> **set** **bag**(`bag`): `void`

Defined in: [core/actions/src/action-manager.ts:124](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L124)

##### Parameters

###### bag

`this`\[`"dbDoc"`\]\[`"bag"`\]

##### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`bag`](CoalescingWorkflow.md#bag)

***

### cronActivity

#### Get Signature

> **get** **cronActivity**(): `this`\[`"dbDoc"`\]\[`"cronActivity"`\]

Defined in: [core/actions/src/action-manager.ts:156](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L156)

##### Returns

`this`\[`"dbDoc"`\]\[`"cronActivity"`\]

#### Set Signature

> **set** **cronActivity**(`cronActivity`): `void`

Defined in: [core/actions/src/action-manager.ts:160](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L160)

##### Parameters

###### cronActivity

`this`\[`"dbDoc"`\]\[`"cronActivity"`\]

##### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`cronActivity`](CoalescingWorkflow.md#cronactivity)

***

### repeat

#### Get Signature

> **get** **repeat**(): `this`\[`"dbDoc"`\]\[`"repeat"`\]

Defined in: [core/actions/src/action-manager.ts:147](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L147)

##### Returns

`this`\[`"dbDoc"`\]\[`"repeat"`\]

#### Set Signature

> **set** **repeat**(`repeat`): `void`

Defined in: [core/actions/src/action-manager.ts:151](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L151)

##### Parameters

###### repeat

`this`\[`"dbDoc"`\]\[`"repeat"`\]

##### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`repeat`](CoalescingWorkflow.md#repeat)

***

### result

#### Get Signature

> **get** **result**(): `this`\[`"dbDoc"`\]\[`"result"`\]

Defined in: [core/actions/src/action-manager.ts:138](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L138)

##### Returns

`this`\[`"dbDoc"`\]\[`"result"`\]

#### Set Signature

> **set** **result**(`result`): `void`

Defined in: [core/actions/src/action-manager.ts:142](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L142)

##### Parameters

###### result

`this`\[`"dbDoc"`\]\[`"result"`\]

##### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`result`](CoalescingWorkflow.md#result)

## Methods

### \_resume()

> **\_resume**(): `any`

Defined in: [core/actions/src/action-manager.ts:664](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L664)

The function resumes the action by calling the appropriate function depending on the current
state of the action. It doesn't take into account the executor.

#### Returns

`any`

A promise. You can not rely on this to know when an action is finished.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`_resume`](CoalescingWorkflow.md#_resume)

***

### activityLogs()

> **activityLogs**(`options`): `any`[] \| `Promise`\<`any`[]\>

Defined in: [core/actions/src/action-manager.ts:808](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L808)

#### Parameters

##### options

`any`

#### Returns

`any`[] \| `Promise`\<`any`[]\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`activityLogs`](CoalescingWorkflow.md#activitylogs)

***

### breakAndReject()

> **breakAndReject**(`result`): [`RejectAction`](RejectAction.md)

Defined in: [core/actions/src/workflow-manager.ts:204](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L204)

#### Parameters

##### result

`any`

#### Returns

[`RejectAction`](RejectAction.md)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`breakAndReject`](CoalescingWorkflow.md#breakandreject)

***

### breakAndReturn()

> **breakAndReturn**(`result`): [`ResolveAction`](ResolveAction.md)

Defined in: [core/actions/src/workflow-manager.ts:197](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L197)

#### Parameters

##### result

`any`

#### Returns

[`ResolveAction`](ResolveAction.md)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`breakAndReturn`](CoalescingWorkflow.md#breakandreturn)

***

### clone()

> **clone**(): `any`

Defined in: [core/actions/src/action-manager.ts:931](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L931)

Clone the action.

#### Returns

`any`

a new action with the same argument

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`clone`](CoalescingWorkflow.md#clone)

***

### define()

> **define**(): `Promise`\<\{ \}\>

Defined in: [core/actions/src/coalescing-manager.ts:140](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L140)

Defines the workflow logic.
Called multiple times for a single workflow process.
Use the `do` method to apply mutating operations.

#### Returns

`Promise`\<\{ \}\>

Promise that resolves with an argument of type `this['IResult']`.

#### Overrides

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`define`](CoalescingWorkflow.md#define)

***

### defineDynamicAction()

> **defineDynamicAction**(`actionDb`): `Promise`\<[`Action`](Action.md)\>

Defined in: [core/actions/src/workflow-manager.ts:247](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L247)

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)

#### Returns

`Promise`\<[`Action`](Action.md)\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defineDynamicAction`](CoalescingWorkflow.md#definedynamicaction)

***

### digest()

> **digest**(): `Promise`\<`string`[]\>

Defined in: [core/actions/src/coalescing-manager.ts:153](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L153)

#### Returns

`Promise`\<`string`[]\>

***

### do()

#### Call Signature

> **do**\<`T`\>(`ref`, `action`): `DoPromise`\<`T`\[`"IResult"`\]\>

Defined in: [core/actions/src/workflow-manager.ts:505](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L505)

Executes an action in the workflow.
If the action already exists, it will be tracked and resumed.
If not, it will be started.

##### Type Parameters

###### T

`T` *extends* [`Action`](Action.md)

##### Parameters

###### ref

`string`

the step reference of the action to execute

###### action

`T`

##### Returns

`DoPromise`\<`T`\[`"IResult"`\]\>

a promise that resolves with the result of the action

##### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`do`](CoalescingWorkflow.md#do)

#### Call Signature

> **do**\<`T`\>(`ref`, `cb`): `DoPromise`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:515](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L515)

Executes an action in the workflow.
If the action already exists, it will be tracked and resumed.
If not, it will be started.

##### Type Parameters

###### T

`T`

##### Parameters

###### ref

`string`

the step reference of the action to execute

###### cb

() => `Promise`\<`T`\>

a callback that returns a promise

##### Returns

`DoPromise`\<`T`\>

a promise that resolves with the result of the promise

##### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`do`](CoalescingWorkflow.md#do)

#### Call Signature

> **do**(`ref`, `opts`): `DoPromise`\<`any`\>

Defined in: [core/actions/src/workflow-manager.ts:528](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L528)

Executes an action in the workflow.
If the action already exists, it will be tracked and resumed.
If not, it will be started.

##### Parameters

###### ref

`string`

the step reference of the action to execute

###### opts

an object containing a pattern of the action to execute

###### init?

() => `Promise`\<`any`\>

the init method of the action

###### main

() => [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

the main method of the action

###### watcher?

() => `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

the watcher method of the action

##### Returns

`DoPromise`\<`any`\>

a promise that resolves with the result of the action

##### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`do`](CoalescingWorkflow.md#do)

#### Call Signature

> **do**\<`T`\>(`ref`, `opts`): `any`

Defined in: [core/actions/src/workflow-manager.ts:546](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L546)

Executes an action in the workflow.
If the action already exists, it will be tracked and resumed.
If not, it will be started.

##### Type Parameters

###### T

`T` *extends* [`Action`](Action.md)

##### Parameters

###### ref

`string`

the step reference of the action to execute

###### opts

an object containing an instanciation of a dynamic action

###### dynamicAction

`T` \| () => `T`

an action or a function that returns an action

##### Returns

`any`

a promise that resolves with the result of the action

##### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`do`](CoalescingWorkflow.md#do)

#### Call Signature

> **do**\<`T`\>(`ref`, `opts`, `params?`): `DoPromise`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:552](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L552)

Executes an action in the workflow.
If the action already exists, it will be tracked and resumed.
If not, it will be started.

##### Type Parameters

###### T

`T`

##### Parameters

###### ref

`string`

the step reference of the action to execute

###### opts

[`Action`](Action.md) |

\{ `init?`: () => `Promise`\<`any`\>; `main`: () => [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>; `watcher?`: () => `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>; \}

###### init?

() => `Promise`\<`any`\>

###### main

() => [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

###### watcher?

() => `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

| \{ `dynamicAction`: [`Action`](Action.md) \| () => [`Action`](Action.md); \} | () => `Promise`\<`any`\>

###### params?

###### nCall

`number`

##### Returns

`DoPromise`\<`T`\>

a promise that resolves with the result of the action

##### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`do`](CoalescingWorkflow.md#do)

***

### dynamicallyDefineFromWorkflowStep()

> **dynamicallyDefineFromWorkflowStep**(`workflow`, `marker`): `void`

Defined in: [core/actions/src/action-manager.ts:329](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L329)

#### Parameters

##### workflow

[`Workflow`](Workflow.md)

##### marker

`string`

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dynamicallyDefineFromWorkflowStep`](CoalescingWorkflow.md#dynamicallydefinefromworkflowstep)

***

### ~~dynamiclyDefineFromWorfklowStep()~~

> **dynamiclyDefineFromWorfklowStep**(`workflow`, `marker`): `void`

Defined in: [core/actions/src/action-manager.ts:325](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L325)

#### Parameters

##### workflow

[`Workflow`](Workflow.md)

##### marker

`string`

#### Returns

`void`

#### Deprecated

use dynamicallyDefineFromWorkflowStep

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dynamiclyDefineFromWorfklowStep`](CoalescingWorkflow.md#dynamiclydefinefromworfklowstep)

***

### findIfEquivalentActionAlreadyExists()

> **findIfEquivalentActionAlreadyExists**(`ref`, `action`): `Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

Defined in: [core/actions/src/coalescing-manager.ts:91](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L91)

#### Parameters

##### ref

`string`

##### action

[`Action`](Action.md)

#### Returns

`Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`findIfEquivalentActionAlreadyExists`](CoalescingWorkflow.md#findifequivalentactionalreadyexists)

***

### getLogs()

> **getLogs**(`options`): `Promise`\<`any`[]\>

Defined in: [core/actions/src/action-manager.ts:812](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L812)

#### Parameters

##### options

###### endTime?

`number`

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`getLogs`](CoalescingWorkflow.md#getlogs)

***

### goTo()

> **goTo**(`name`, `onState`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:189](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L189)

#### Parameters

##### name

`string`

##### onState

[`ActionState`](../enumerations/ActionState.md)

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`goTo`](CoalescingWorkflow.md#goto)

***

### goToStep()

> **goToStep**(`name`): [`ResolveAction`](ResolveAction.md)

Defined in: [core/actions/src/workflow-manager.ts:180](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L180)

#### Parameters

##### name

`string`

#### Returns

[`ResolveAction`](ResolveAction.md)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`goToStep`](CoalescingWorkflow.md#gotostep)

***

### identity()

> **identity**(): `any`

Defined in: [core/actions/src/coalescing-manager.ts:26](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L26)

#### Returns

`any`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`identity`](CoalescingWorkflow.md#identity)

***

### init()

> **init**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:415](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L415)

Initialize the action from the action stored in the database.

Example: In order to not store secrets in the database,
you can set a vault id in the argument
and retrieve the secret at the initialization of the action.

Example: You cannot store class object on the database.
If your action use complex object, they can be initialized here.

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`init`](CoalescingWorkflow.md#init)

***

### ~~initialisation()~~

> **initialisation**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:508](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L508)

#### Returns

`Promise`\<`void`\>

#### Deprecated

use initialization

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`initialisation`](CoalescingWorkflow.md#initialisation)

***

### initialization()

> **initialization**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:517](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L517)

Mainly used for workflows.
Can also complement init().
If it gets too complex, use hooks.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`initialization`](CoalescingWorkflow.md#initialization)

***

### internalLog()

> **internalLog**(`message`, `opts`): `void`

Defined in: [core/actions/src/action-manager.ts:873](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L873)

Log a message in the internal logger.

#### Parameters

##### message

`string`

The message to log.

##### opts

Options for logging, such as the log level.
the final log message will be:
```
{
  actionRef: this.dbDoc.actionRef,
 actionId: this.dbDoc._id.toString(),
 filter: this.dbDoc.filter,
 definedIn: this.dbDoc.definitionFrom.workflow ? this.dbDoc.definitionFrom.workflow.toObject() : undefined,
 timestamp: new Date().toISOString(),
 level: opts.level || 'info',
 message: message,
}
```

###### level

`string` = `'debug'`

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`internalLog`](CoalescingWorkflow.md#internallog)

***

### internalLogError()

> **internalLogError**(`err`): `void`

Defined in: [core/actions/src/workflow-manager.ts:833](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L833)

Log an error in the internal logger.

#### Parameters

##### err

`Error`

The error to log.
the final log message will be:
```
{
  actionRef: this.dbDoc.actionRef,
  actionId: this.dbDoc._id.toString(),
  filter: this.dbDoc.filter,
  definedIn: this.dbDoc.definitionFrom.workflow ? this.dbDoc.definitionFrom.workflow.toObject() : undefined,
  err: err,
  timestamp: new Date().toISOString(),
}

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`internalLogError`](CoalescingWorkflow.md#internallogerror)

***

### isActionActive()

> **isActionActive**(`action`): `boolean`

Defined in: [core/actions/src/workflow-manager.ts:221](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L221)

#### Parameters

##### action

[`Action`](Action.md)

#### Returns

`boolean`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isActionActive`](CoalescingWorkflow.md#isactionactive)

***

### lastOutput()

> **lastOutput**(): `Promise`\<`any`\>

Defined in: [core/actions/src/coalescing-manager.ts:130](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L130)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`lastOutput`](CoalescingWorkflow.md#lastoutput)

***

### main()

> **main**(): `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/workflow-manager.ts:323](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L323)

This method should launched the main action process
It is called only one time.
It returns a state value.

#### Returns

`Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`main`](CoalescingWorkflow.md#main)

***

### name()

> **name**(`name`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:173](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L173)

#### Parameters

##### name

`string`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`name`](CoalescingWorkflow.md#name)

***

### next()

> **next**(`cb`, `opts?`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:96](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L96)

#### Parameters

##### cb

(...`args`) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`\<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

##### opts?

###### retry

`number`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`next`](CoalescingWorkflow.md#next)

***

### notifyHealth()

> **notifyHealth**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:963](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L963)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`notifyHealth`](CoalescingWorkflow.md#notifyhealth)

***

### once()

> **once**(`ref`, `opts`): `Promise`\<`unknown`\>

Defined in: [core/actions/src/coalescing-manager.ts:112](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L112)

#### Parameters

##### ref

`string`

##### opts

[`Action`](Action.md) |

\{ `init?`: () => `Promise`\<`any`\>; `main`: () => [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>; `watcher?`: () => `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>; \}

###### init?

() => `Promise`\<`any`\>

###### main

() => [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

###### watcher?

() => `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

| \{ `dynamicAction`: [`Action`](Action.md) \| () => [`Action`](Action.md); \} | () => `Promise`\<`any`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`once`](CoalescingWorkflow.md#once)

***

### onComplete()

> **onComplete**(`cb`, `opts?`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:113](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L113)

#### Parameters

##### cb

(...`args`) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`\<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

##### opts?

###### retry

`number`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onComplete`](CoalescingWorkflow.md#oncomplete)

***

### onError()

> **onError**(`cb`, `opts?`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:104](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L104)

#### Parameters

##### cb

(...`args`) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`\<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

##### opts?

###### retry

`number`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onError`](CoalescingWorkflow.md#onerror)

***

### onErrorGoTo()

> **onErrorGoTo**(`name`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:216](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L216)

#### Parameters

##### name

`string`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onErrorGoTo`](CoalescingWorkflow.md#onerrorgoto)

***

### onMainTimeout()

> **onMainTimeout**(): [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/workflow-manager.ts:735](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L735)

Called in case of timeout in `ActionState.EXECUTING_MAIN` state.

It can return `ActionState.SLEEPING` if the process infers
that `main()` has not run and the action must be retried.

#### Returns

[`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

a `ActionState` value.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onMainTimeout`](CoalescingWorkflow.md#onmaintimeout)

***

### onSuccessGoTo()

> **onSuccessGoTo**(`name`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:211](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L211)

#### Parameters

##### name

`string`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onSuccessGoTo`](CoalescingWorkflow.md#onsuccessgoto)

***

### repeatDo()

#### Call Signature

> **repeatDo**\<`T`\>(`ref`, `cb`, `repeat`): `DoPromise`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:692](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L692)

Repeats a do a number of times.

##### Type Parameters

###### T

`T`

##### Parameters

###### ref

`string`

the step reference of the action to repeat

###### cb

() => `Promise`\<`T`\>

a callback that returns a promise

###### repeat

`object` & `object`

an object containing the number of times to repeat the action

##### Returns

`DoPromise`\<`T`\>

a promise that resolves with the result of the last action

##### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`repeatDo`](CoalescingWorkflow.md#repeatdo)

#### Call Signature

> **repeatDo**\<`T`\>(`ref`, `opts`, `repeat`): `DoPromise`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:697](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L697)

Repeats a do a number of times.

##### Type Parameters

###### T

`T`

##### Parameters

###### ref

`string`

the step reference of the action to repeat

###### opts

() => `Promise`\<`T`\>

###### repeat

`object` & `object`

an object containing the number of times to repeat the action

##### Returns

`DoPromise`\<`T`\>

a promise that resolves with the result of the last action

##### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`repeatDo`](CoalescingWorkflow.md#repeatdo)

***

### resolveDynamicActionFinding()

> **resolveDynamicActionFinding**(): `void`

Defined in: [core/actions/src/workflow-manager.ts:246](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L246)

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resolveDynamicActionFinding`](CoalescingWorkflow.md#resolvedynamicactionfinding)

***

### resume()

> **resume**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:633](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L633)

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`\<`any`\>

A promise. You can not rely on this to know when an action is finished.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resume`](CoalescingWorkflow.md#resume)

***

### resyncWithDb()

> **resyncWithDb**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:344](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L344)

Update the current model instance with latest data from database

#### Returns

`Promise`\<`void`\>

a promise that resolves when the document has been loaded

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resyncWithDb`](CoalescingWorkflow.md#resyncwithdb)

***

### rollback()

> **rollback**(`cb`, `opts?`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:164](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L164)

#### Parameters

##### cb

(...`args`) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`\<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

##### opts?

###### retry

`number`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`rollback`](CoalescingWorkflow.md#rollback)

***

### save()

> **save**(`params`): `any`

Defined in: [core/actions/src/coalescing-manager.ts:49](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L49)

Save an action in the database. Will then be managed by the worker.

#### Parameters

##### params

###### isNew

`boolean` = `...`

###### nCall

`number` = `0`

#### Returns

`any`

a promise that resolves when the action has been saved

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`save`](CoalescingWorkflow.md#save)

***

### setArgument()

> **setArgument**(`args`): `Digestor`

Defined in: [core/actions/src/action-manager.ts:424](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L424)

Set the `argument` that will be stored in the database.
Once set, the argument of an action should not be modified.

#### Parameters

##### args

`JSONObject`

The argument to set.

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setArgument`](CoalescingWorkflow.md#setargument)

***

### setExecutor()

> **setExecutor**(): `void` \| [`Executor`](Executor.md) \| `Promise`\<`void` \| [`Executor`](Executor.md)\>

Defined in: [core/actions/src/action-manager.ts:549](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L549)

Set the executor for this action.
It is called only once when the action is created.
If you want to set an executor, you should override this method.

#### Returns

`void` \| [`Executor`](Executor.md) \| `Promise`\<`void` \| [`Executor`](Executor.md)\>

a promise that resolves when you have set the executor is set

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setExecutor`](CoalescingWorkflow.md#setexecutor)

***

### setFilter()

> **setFilter**(`filter`): `Digestor`

Defined in: [core/actions/src/action-manager.ts:455](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L455)

Make filtering actions easier with the `filter` property.
These filters are stored in database with
the `filter` property and allow to search for
an action or a group of actions

#### Parameters

##### filter

`Object`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setFilter`](CoalescingWorkflow.md#setfilter)

***

### setRepeat()

> **setRepeat**(`opts`): `Digestor`

Defined in: [core/actions/src/action-manager.ts:439](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L439)

Configure the number of times an action is repeated.

#### Parameters

##### opts

###### 4?

`number`

###### 5?

`number`

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setRepeat`](CoalescingWorkflow.md#setrepeat)

***

### setResult()

> **setResult**(...`results`): `Digestor`

Defined in: [core/actions/src/action-manager.ts:465](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L465)

Set the action result.

#### Parameters

##### results

...`any`[]

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setResult`](CoalescingWorkflow.md#setresult)

***

### startAction()

> `protected` **startAction**(`ref`, `action`): `Promise`\<`void`\>

Defined in: [core/actions/src/workflow-manager.ts:435](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L435)

#### Parameters

##### ref

`string`

##### action

[`Action`](Action.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`startAction`](CoalescingWorkflow.md#startaction)

***

### startActionTransaction()

> `protected` **startActionTransaction**(`ref`, `action`): `Promise`\<`any`[]\>

Defined in: [core/actions/src/workflow-manager.ts:407](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L407)

#### Parameters

##### ref

`string`

##### action

[`Action`](Action.md)

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`startActionTransaction`](CoalescingWorkflow.md#startactiontransaction)

***

### stringifyIdentity()

> **stringifyIdentity**(): `string`

Defined in: [core/actions/src/coalescing-manager.ts:31](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L31)

#### Returns

`string`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`stringifyIdentity`](CoalescingWorkflow.md#stringifyidentity)

***

### substitute()

> **substitute**(`otherPendingActionsWithSameIdentity`): [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `getNextStepAttemp`: `number`; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `void` \| `Error` \| `JSONObject`\>

Defined in: [core/actions/src/coalescing-manager.ts:43](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/coalescing-manager.ts#L43)

#### Parameters

##### otherPendingActionsWithSameIdentity

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `getNextStepAttemp`: `number`; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `void` \| `Error` \| `JSONObject`\>[]

#### Returns

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `getNextStepAttemp`: `number`; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `void` \| `Error` \| `JSONObject`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`substitute`](CoalescingWorkflow.md#substitute)

***

### toPromise()

> `protected` **toPromise**(`ref`, `dbDoc`): `DoPromise`\<`unknown`\>

Defined in: [core/actions/src/workflow-manager.ts:476](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L476)

#### Parameters

##### ref

`string`

##### dbDoc

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)

#### Returns

`DoPromise`\<`unknown`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`toPromise`](CoalescingWorkflow.md#topromise)

***

### transform()

> **transform**(`ref`, `action`): [`Action`](Action.md)

Defined in: [core/actions/src/workflow-manager.ts:92](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L92)

Proxy that will be called before the start of any action.
Use this method to transform any action before it is started.

#### Parameters

##### ref

`string`

the step reference of the action to transform

##### action

[`Action`](Action.md)

the action to transform

#### Returns

[`Action`](Action.md)

the transformed action

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`transform`](CoalescingWorkflow.md#transform)

***

### watcher()

> **watcher**(): `Promise`\<[`IN_PROGRESS`](../enumerations/ActionState.md#in_progress) \| [`PAUSED`](../enumerations/ActionState.md#paused)\>

Defined in: [core/actions/src/workflow-manager.ts:740](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L740)

Watch the action state.

It is called :
- potentially many times when the action is in `IN_PROGRESS` state
- one time if the action is in `EXECUTING_MAIN` state and the executing_main delay has expired.

#### Returns

`Promise`\<[`IN_PROGRESS`](../enumerations/ActionState.md#in_progress) \| [`PAUSED`](../enumerations/ActionState.md#paused)\>

promise

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`watcher`](CoalescingWorkflow.md#watcher)

***

### \_constructFromDb()

> `static` **\_constructFromDb**(`actionDb`): [`Action`](Action.md)

Defined in: [core/actions/src/action-manager.ts:266](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L266)

Construct an action from a document stored in the database.

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

a document coming from the database

#### Returns

[`Action`](Action.md)

an action for which dbDoc property is equal to actionDb

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`_constructFromDb`](CoalescingWorkflow.md#_constructfromdb)

***

### \_constructFromWorkflow()

> `static` **\_constructFromWorkflow**(`dbDoc`): `Promise`\<[`Action`](Action.md)\>

Defined in: [core/actions/src/action-manager.ts:291](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L291)

Construct an action from a document stored in the database and whose definition depends on a workflow.

#### Parameters

##### dbDoc

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

#### Returns

`Promise`\<[`Action`](Action.md)\>

an action for which dbDoc property is equal to actionDb

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`_constructFromWorkflow`](CoalescingWorkflow.md#_constructfromworkflow)

***

### constructFromDb()

> `static` **constructFromDb**(`actionDb`): `Promise`\<[`Action`](Action.md)\>

Defined in: [core/actions/src/action-manager.ts:314](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L314)

Construct an action from a document stored in the database.

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

a document coming from the database

#### Returns

`Promise`\<[`Action`](Action.md)\>

an action for which dbDoc property is equal to actionDb

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`constructFromDb`](CoalescingWorkflow.md#constructfromdb)

***

### findPendingWorkflowUsingAction()

> `static` **findPendingWorkflowUsingAction**(`actionDbDoc`): `Query`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\> & `object`[], [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\> & `object`, \{ \}, [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

Defined in: [core/actions/src/workflow-manager.ts:800](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/workflow-manager.ts#L800)

#### Parameters

##### actionDbDoc

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)

#### Returns

`Query`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\> & `object`[], [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\> & `object`, \{ \}, [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`findPendingWorkflowUsingAction`](CoalescingWorkflow.md#findpendingworkflowusingaction)

***

### reject()

> `static` **reject**(`result?`): [`RejectAction`](RejectAction.md)

Defined in: [core/actions/src/action-manager.ts:372](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L372)

Return a new [RejectAction](RejectAction.md) object.

#### Parameters

##### result?

`any`

action result

#### Returns

[`RejectAction`](RejectAction.md)

new `RejectAction`instance

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`reject`](CoalescingWorkflow.md#reject)

***

### resolve()

> `static` **resolve**(`result?`): [`ResolveAction`](ResolveAction.md)

Defined in: [core/actions/src/action-manager.ts:361](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L361)

Return a new [ResolveAction](ResolveAction.md) object.

#### Parameters

##### result?

`any`

action result

#### Returns

[`ResolveAction`](ResolveAction.md)

new `ResolveAction`instance

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resolve`](CoalescingWorkflow.md#resolve)

***

### trackActionAsPromise()

> `static` **trackActionAsPromise**(`action`, `states`): `Promise`\<`unknown`\>

Defined in: [core/actions/src/action-manager.ts:943](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L943)

Track an action until it reaches one of the given states.

#### Parameters

##### action

[`Action`](Action.md)

The action to track.

##### states

[`ActionState`](../enumerations/ActionState.md)[] = `...`

The states to reach.

#### Returns

`Promise`\<`unknown`\>

A promise that resolves when the action reaches one of the given states. The promise resolves with the state reached.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`trackActionAsPromise`](CoalescingWorkflow.md#trackactionaspromise)
