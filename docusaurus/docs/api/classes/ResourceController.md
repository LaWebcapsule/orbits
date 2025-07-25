# Class: ResourceController\<T\>

Defined in: [core/actions/src/coalescing-manager.ts:191](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L191)

Structure actions.

Extends this class to build new actions behaviors.

## Extends

- [`CoalescingWorkflow`](CoalescingWorkflow.md)

## Type Parameters

### T

`T` *extends* [`Resource`](Resource.md)

## Constructors

### Constructor

> **new ResourceController**\<`T`\>(`resource?`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/coalescing-manager.ts:198](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L198)

#### Parameters

##### resource?

`T`

#### Returns

`ResourceController`\<`T`\>

#### Overrides

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`constructor`](CoalescingWorkflow.md#constructor)

## Properties

### dbDoc

> **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`T`\[`"IArgument"`\] & `object`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `void` \| `Error` \| `JSONObject`\>

Defined in: [core/actions/src/action-manager.ts:106](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L106)

Action Database Document

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dbDoc`](CoalescingWorkflow.md#dbdoc)

***

### dBSession?

> `optional` **dBSession**: `ClientSession`

Defined in: [core/actions/src/workflow-manager.ts:47](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L47)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dBSession`](CoalescingWorkflow.md#dbsession)

***

### defineCallMode

> **defineCallMode**: `"main"` \| `"actionFinding"`

Defined in: [core/actions/src/workflow-manager.ts:229](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L229)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defineCallMode`](CoalescingWorkflow.md#definecallmode)

***

### docsToSaveAtStepStart

> **docsToSaveAtStepStart**: `Document`\<`any`, `any`, `any`\>[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:49](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L49)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`docsToSaveAtStepStart`](CoalescingWorkflow.md#docstosaveatstepstart)

***

### dynamicActionFound

> **dynamicActionFound**: [`Action`](Action.md)

Defined in: [core/actions/src/workflow-manager.ts:241](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L241)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dynamicActionFound`](CoalescingWorkflow.md#dynamicactionfound)

***

### dynamicActionToFound

> **dynamicActionToFound**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)

Defined in: [core/actions/src/workflow-manager.ts:240](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L240)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dynamicActionToFound`](CoalescingWorkflow.md#dynamicactiontofound)

***

### executingDefine

> **executingDefine**: `boolean` = `false`

Defined in: [core/actions/src/workflow-manager.ts:228](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L228)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`executingDefine`](CoalescingWorkflow.md#executingdefine)

***

### executor?

> `optional` **executor**: [`Executor`](Executor.md)

Defined in: [core/actions/src/action-manager.ts:40](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L40)

Specify an executor in which all actions of this class will run.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`executor`](CoalescingWorkflow.md#executor)

***

### IArgument

> **IArgument**: `T`\[`"IArgument"`\] & `object`

Defined in: [core/actions/src/coalescing-manager.ts:192](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L192)

Action argument

#### Type declaration

##### actionRef

> **actionRef**: `string`

#### Overrides

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`IArgument`](CoalescingWorkflow.md#iargument)

***

### IBag

> **IBag**: `object`

Defined in: [core/actions/src/workflow-manager.ts:53](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L53)

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

Defined in: [core/actions/src/action-manager.ts:101](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L101)

Action result

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`IResult`](CoalescingWorkflow.md#iresult)

***

### isExecutorSet

> **isExecutorSet**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:499](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L499)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isExecutorSet`](CoalescingWorkflow.md#isexecutorset)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:484](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L484)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isInitialized`](CoalescingWorkflow.md#isinitialized)

***

### mapRefWithStrategy

> **mapRefWithStrategy**: `Map`\<`string`, `"default"` \| `"cross-workflow"`\>

Defined in: [core/actions/src/coalescing-manager.ts:92](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L92)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`mapRefWithStrategy`](CoalescingWorkflow.md#maprefwithstrategy)

***

### notifyHealthPromise

> **notifyHealthPromise**: `Promise`\<`any`\> = `undefined`

Defined in: [core/actions/src/action-manager.ts:932](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L932)

Send a signal to indicate that the action is still in progress..
Useful for preventing timeouts when the action's duration is long but not precisely predictable.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`notifyHealthPromise`](CoalescingWorkflow.md#notifyhealthpromise)

***

### registeredActionIds

> **registeredActionIds**: `any`[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:491](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L491)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`registeredActionIds`](CoalescingWorkflow.md#registeredactionids)

***

### resolveDefineIteration()

> **resolveDefineIteration**: (`actionState?`) => `void`

Defined in: [core/actions/src/workflow-manager.ts:275](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L275)

#### Parameters

##### actionState?

[`ActionState`](../enumerations/ActionState.md)

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resolveDefineIteration`](CoalescingWorkflow.md#resolvedefineiteration)

***

### resource

> **resource**: `T`

Defined in: [core/actions/src/coalescing-manager.ts:208](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L208)

***

### resourceDbDoc

> **resourceDbDoc**: `T`\[`"resourceDbDoc"`\]

Defined in: [core/actions/src/coalescing-manager.ts:209](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L209)

***

### runtime

> **runtime**: [`ActionRuntime`](ActionRuntime.md) = `ActionRuntime.activeRuntime`

Defined in: [core/actions/src/action-manager.ts:42](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L42)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`runtime`](CoalescingWorkflow.md#runtime)

***

### steps

> **steps**: [`Step`](../interfaces/Step.md)[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:51](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L51)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`steps`](CoalescingWorkflow.md#steps)

***

### cronDefaultSettings

> `static` **cronDefaultSettings**: `object`

Defined in: [core/actions/src/action-manager.ts:82](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L82)

Configure the frequency at which a cron will launch [Action.resume](Action.md#resume).
It is also possible to dynamically modify the dbDoc.cronActivity property to modify the call to a cron.
If not set, this property will be 'inherited' from the first parent class where it is.

#### activityFrequency

> **activityFrequency**: `number`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`cronDefaultSettings`](CoalescingWorkflow.md#crondefaultsettings)

***

### defaultDelay

> `static` **defaultDelay**: `number` = `Infinity`

Defined in: [core/actions/src/workflow-manager.ts:43](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L43)

Shortcut to [\[ActionState.IN\_PROGRESS\]](Action.md#defaultdelays).

If not set, this property will be 'inherited' from the first parent class where it is.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defaultDelay`](CoalescingWorkflow.md#defaultdelay)

***

### defaultDelays

> `static` **defaultDelays**: `object`

Defined in: [core/actions/src/action-manager.ts:70](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L70)

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
   [ActionState.IN_PROGRESS]: this.defaultDelay,
   [ActionState.EXECUTING_MAIN]: 2*60*1000,
}
```

You should configure this if your actions have longer timeouts.

If not set, this property will be 'inherited' from the first parent class where it is.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defaultDelays`](CoalescingWorkflow.md#defaultdelays)

***

### permanentRef

> `static` **permanentRef**: `string` \| `string`[]

Defined in: [core/actions/src/action-manager.ts:35](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L35)

Id of the action stored in database.
It should be a permanent id that designates the action instance.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`permanentRef`](CoalescingWorkflow.md#permanentref)

## Accessors

### \_id

#### Get Signature

> **get** **\_id**(): `this`\[`"dbDoc"`\]\[`"_id"`\]

Defined in: [core/actions/src/action-manager.ts:157](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L157)

##### Returns

`this`\[`"dbDoc"`\]\[`"_id"`\]

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`_id`](CoalescingWorkflow.md#_id)

***

### argument

#### Get Signature

> **get** **argument**(): `this`\[`"dbDoc"`\]\[`"argument"`\]

Defined in: [core/actions/src/action-manager.ts:121](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L121)

##### Returns

`this`\[`"dbDoc"`\]\[`"argument"`\]

#### Set Signature

> **set** **argument**(`argument`): `void`

Defined in: [core/actions/src/action-manager.ts:125](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L125)

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

Defined in: [core/actions/src/action-manager.ts:112](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L112)

##### Returns

`this`\[`"dbDoc"`\]\[`"bag"`\]

#### Set Signature

> **set** **bag**(`bag`): `void`

Defined in: [core/actions/src/action-manager.ts:116](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L116)

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

Defined in: [core/actions/src/action-manager.ts:148](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L148)

##### Returns

`this`\[`"dbDoc"`\]\[`"cronActivity"`\]

#### Set Signature

> **set** **cronActivity**(`cronActivity`): `void`

Defined in: [core/actions/src/action-manager.ts:152](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L152)

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

Defined in: [core/actions/src/action-manager.ts:139](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L139)

##### Returns

`this`\[`"dbDoc"`\]\[`"repeat"`\]

#### Set Signature

> **set** **repeat**(`repeat`): `void`

Defined in: [core/actions/src/action-manager.ts:143](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L143)

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

Defined in: [core/actions/src/action-manager.ts:130](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L130)

##### Returns

`this`\[`"dbDoc"`\]\[`"result"`\]

#### Set Signature

> **set** **result**(`result`): `void`

Defined in: [core/actions/src/action-manager.ts:134](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L134)

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

Defined in: [core/actions/src/action-manager.ts:633](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L633)

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

Defined in: [core/actions/src/action-manager.ts:777](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L777)

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

Defined in: [core/actions/src/workflow-manager.ts:200](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L200)

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

Defined in: [core/actions/src/workflow-manager.ts:193](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L193)

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

Defined in: [core/actions/src/action-manager.ts:901](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L901)

Clone the action.

#### Returns

`any`

a new action with the same argument

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`clone`](CoalescingWorkflow.md#clone)

***

### constructResource()

> **constructResource**(): `T`

Defined in: [core/actions/src/coalescing-manager.ts:216](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L216)

#### Returns

`T`

***

### define()

> **define**(): `Promise`\<\{ \}\>

Defined in: [core/actions/src/coalescing-manager.ts:240](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L240)

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

Defined in: [core/actions/src/workflow-manager.ts:243](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L243)

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)

#### Returns

`Promise`\<[`Action`](Action.md)\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defineDynamicAction`](CoalescingWorkflow.md#definedynamicaction)

***

### do()

#### Call Signature

> **do**\<`T`\>(`ref`, `action`): `DoPromise`\<`T`\[`"IResult"`\]\>

Defined in: [core/actions/src/workflow-manager.ts:501](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L501)

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

Defined in: [core/actions/src/workflow-manager.ts:511](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L511)

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

Defined in: [core/actions/src/workflow-manager.ts:524](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L524)

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

Defined in: [core/actions/src/workflow-manager.ts:542](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L542)

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

an object containing an instantiation of a dynamic action

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

Defined in: [core/actions/src/workflow-manager.ts:548](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L548)

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

Defined in: [core/actions/src/action-manager.ts:314](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L314)

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

### findIfEquivalentActionAlreadyExists()

> **findIfEquivalentActionAlreadyExists**(`ref`, `action`): `Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

Defined in: [core/actions/src/coalescing-manager.ts:93](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L93)

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

Defined in: [core/actions/src/action-manager.ts:781](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L781)

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

> **goTo**(`name`, `onState`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:185](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L185)

#### Parameters

##### name

`string`

##### onState

[`ActionState`](../enumerations/ActionState.md)

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`goTo`](CoalescingWorkflow.md#goto)

***

### goToStep()

> **goToStep**(`name`): [`ResolveAction`](ResolveAction.md)

Defined in: [core/actions/src/workflow-manager.ts:176](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L176)

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

Defined in: [core/actions/src/coalescing-manager.ts:211](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L211)

#### Returns

`any`

#### Overrides

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`identity`](CoalescingWorkflow.md#identity)

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [core/actions/src/coalescing-manager.ts:232](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L232)

Initialize the action from the action stored in the database.

Example: In order to not store secrets in the database,
you can set a vault id in the argument
and retrieve the secret at the initialization of the action.

Example: You cannot store class object on the database.
If your action use complex object, they can be initialized here.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`init`](CoalescingWorkflow.md#init)

***

### initialization()

> **initialization**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:491](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L491)

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

Defined in: [core/actions/src/action-manager.ts:842](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L842)

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
    definedIn: this.dbDoc.definitionFrom.workflow?.toObject(),
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

Defined in: [core/actions/src/workflow-manager.ts:829](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L829)

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
    definedIn: this.dbDoc.definitionFrom.workflow?.toObject(),
    err: err,
    timestamp: new Date().toISOString(),
}
```

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`internalLogError`](CoalescingWorkflow.md#internallogerror)

***

### isActionActive()

> **isActionActive**(`action`): `boolean`

Defined in: [core/actions/src/workflow-manager.ts:217](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L217)

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

Defined in: [core/actions/src/coalescing-manager.ts:132](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L132)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`lastOutput`](CoalescingWorkflow.md#lastoutput)

***

### main()

> **main**(): `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/workflow-manager.ts:319](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L319)

This method should launched the main action process
It is called only one time.
It returns a state value.

#### Returns

`Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`main`](CoalescingWorkflow.md#main)

***

### name()

> **name**(`name`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:169](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L169)

#### Parameters

##### name

`string`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`name`](CoalescingWorkflow.md#name)

***

### next()

> **next**(`cb`, `opts?`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:92](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L92)

#### Parameters

##### cb

(...`args`) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`\<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

##### opts?

###### retry

`number`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`next`](CoalescingWorkflow.md#next)

***

### notifyHealth()

> **notifyHealth**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:933](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L933)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`notifyHealth`](CoalescingWorkflow.md#notifyhealth)

***

### once()

> **once**(`ref`, `opts`): `Promise`\<`unknown`\>

Defined in: [core/actions/src/coalescing-manager.ts:114](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L114)

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

> **onComplete**(`cb`, `opts?`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:109](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L109)

#### Parameters

##### cb

(...`args`) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`\<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

##### opts?

###### retry

`number`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onComplete`](CoalescingWorkflow.md#oncomplete)

***

### onError()

> **onError**(`cb`, `opts?`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:100](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L100)

#### Parameters

##### cb

(...`args`) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`\<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

##### opts?

###### retry

`number`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onError`](CoalescingWorkflow.md#onerror)

***

### onErrorGoTo()

> **onErrorGoTo**(`name`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:212](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L212)

#### Parameters

##### name

`string`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onErrorGoTo`](CoalescingWorkflow.md#onerrorgoto)

***

### onMainTimeout()

> **onMainTimeout**(): [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/workflow-manager.ts:731](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L731)

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

> **onSuccessGoTo**(`name`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:207](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L207)

#### Parameters

##### name

`string`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`onSuccessGoTo`](CoalescingWorkflow.md#onsuccessgoto)

***

### repeatDo()

#### Call Signature

> **repeatDo**\<`T`\>(`ref`, `cb`, `repeat`): `DoPromise`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:688](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L688)

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

Defined in: [core/actions/src/workflow-manager.ts:693](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L693)

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

Defined in: [core/actions/src/workflow-manager.ts:242](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L242)

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resolveDynamicActionFinding`](CoalescingWorkflow.md#resolvedynamicactionfinding)

***

### resume()

> **resume**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:602](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L602)

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

Defined in: [core/actions/src/action-manager.ts:329](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L329)

Update the current model instance with latest data from database

#### Returns

`Promise`\<`void`\>

a promise that resolves when the document has been loaded

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resyncWithDb`](CoalescingWorkflow.md#resyncwithdb)

***

### rollback()

> **rollback**(`cb`, `opts?`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/workflow-manager.ts:160](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L160)

#### Parameters

##### cb

(...`args`) => `void` \| [`Action`](Action.md) \| [`Action`](Action.md)[] \| `Promise`\<`void` \| [`Action`](Action.md) \| [`Action`](Action.md)[]\>

##### opts?

###### retry

`number`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`rollback`](CoalescingWorkflow.md#rollback)

***

### save()

> **save**(`params`): `any`

Defined in: [core/actions/src/coalescing-manager.ts:49](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L49)

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

> **setArgument**(`args`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/action-manager.ts:409](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L409)

Set the `argument` that will be stored in the database.
Once set, the argument of an action should not be modified.

#### Parameters

##### args

`T`\[`"IArgument"`\] & `object`

The argument to set.

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setArgument`](CoalescingWorkflow.md#setargument)

***

### setExecutor()

> **setExecutor**(): `void` \| [`Executor`](Executor.md) \| `Promise`\<`void` \| [`Executor`](Executor.md)\>

Defined in: [core/actions/src/action-manager.ts:518](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L518)

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

> **setFilter**(`filter`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/action-manager.ts:440](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L440)

Make filtering actions easier with the `filter` property.
These filters are stored in database with
the `filter` property and allow to search for
an action or a group of actions

#### Parameters

##### filter

`Object`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setFilter`](CoalescingWorkflow.md#setfilter)

***

### setRepeat()

> **setRepeat**(`opts`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/action-manager.ts:424](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L424)

Configure the number of times an action is repeated.

#### Parameters

##### opts

###### 4?

`number`

###### 5?

`number`

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setRepeat`](CoalescingWorkflow.md#setrepeat)

***

### setResult()

> **setResult**(...`results`): `ResourceController`\<`T`\>

Defined in: [core/actions/src/action-manager.ts:450](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L450)

Set the action result.

#### Parameters

##### results

...`any`[]

#### Returns

`ResourceController`\<`T`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`setResult`](CoalescingWorkflow.md#setresult)

***

### startAction()

> `protected` **startAction**(`ref`, `action`): `Promise`\<`void`\>

Defined in: [core/actions/src/workflow-manager.ts:431](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L431)

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

Defined in: [core/actions/src/workflow-manager.ts:403](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L403)

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

Defined in: [core/actions/src/coalescing-manager.ts:31](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L31)

#### Returns

`string`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`stringifyIdentity`](CoalescingWorkflow.md#stringifyidentity)

***

### substitute()

> **substitute**(`otherPendingActionsWithSameIdentity`): [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`T`\[`"IArgument"`\] & `object`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `void` \| `Error` \| `JSONObject`\>

Defined in: [core/actions/src/coalescing-manager.ts:43](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/coalescing-manager.ts#L43)

#### Parameters

##### otherPendingActionsWithSameIdentity

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`T`\[`"IArgument"`\] & `object`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `void` \| `Error` \| `JSONObject`\>[]

#### Returns

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`T`\[`"IArgument"`\] & `object`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `void` \| `Error` \| `JSONObject`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`substitute`](CoalescingWorkflow.md#substitute)

***

### toPromise()

> `protected` **toPromise**(`ref`, `dbDoc`): `DoPromise`\<`unknown`\>

Defined in: [core/actions/src/workflow-manager.ts:472](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L472)

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

Defined in: [core/actions/src/workflow-manager.ts:88](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L88)

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

Defined in: [core/actions/src/workflow-manager.ts:736](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L736)

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

Defined in: [core/actions/src/action-manager.ts:258](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L258)

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

Defined in: [core/actions/src/action-manager.ts:283](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L283)

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

Defined in: [core/actions/src/action-manager.ts:306](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L306)

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

Defined in: [core/actions/src/workflow-manager.ts:796](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/workflow-manager.ts#L796)

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

Defined in: [core/actions/src/action-manager.ts:357](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L357)

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

Defined in: [core/actions/src/action-manager.ts:346](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L346)

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

Defined in: [core/actions/src/action-manager.ts:913](https://github.com/LaWebcapsule/orbits/blob/77b89aa7080dc6291f73a8e29105fc1d762b6c3f/core/actions/src/action-manager.ts#L913)

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
