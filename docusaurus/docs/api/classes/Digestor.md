# Class: `abstract` Digestor

Defined in: [core/actions/src/coalescing-manager.ts:103](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L103)

Structure actions.

Extends this class to build new actions behaviors.

## Extends

- [`CoalescingWorkflow`](CoalescingWorkflow.md)

## Constructors

### Constructor

> **new Digestor**(): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:71](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L71)

#### Returns

`Digestor`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`constructor`](CoalescingWorkflow.md#constructor)

## Properties

### app

> **app**: [`ActionApp`](ActionApp.md) = `ActionApp.activeApp`

Defined in: [core/actions/src/action-manager.ts:29](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L29)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`app`](CoalescingWorkflow.md#app)

***

### dbDoc

> **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `getNextStepAttemp`: `number`; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `Error` \| `JSONObject`\>

Defined in: [core/actions/src/action-manager.ts:101](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L101)

Action Database Document

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dbDoc`](CoalescingWorkflow.md#dbdoc)

***

### dBSession?

> `optional` **dBSession**: `ClientSession`

Defined in: [core/actions/src/workflow-manager.ts:38](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L38)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dBSession`](CoalescingWorkflow.md#dbsession)

***

### defineCallMode

> **defineCallMode**: `"main"` \| `"actionFinding"`

Defined in: [core/actions/src/workflow-manager.ts:224](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L224)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defineCallMode`](CoalescingWorkflow.md#definecallmode)

***

### docsToSaveAtStepStart

> **docsToSaveAtStepStart**: `Document`\<`any`, `any`, `any`\>[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:40](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L40)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`docsToSaveAtStepStart`](CoalescingWorkflow.md#docstosaveatstepstart)

***

### dynamicActionFound

> **dynamicActionFound**: [`Action`](Action.md)

Defined in: [core/actions/src/workflow-manager.ts:236](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L236)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dynamicActionFound`](CoalescingWorkflow.md#dynamicactionfound)

***

### dynamicActionToFound

> **dynamicActionToFound**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)

Defined in: [core/actions/src/workflow-manager.ts:235](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L235)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`dynamicActionToFound`](CoalescingWorkflow.md#dynamicactiontofound)

***

### executingDefine

> **executingDefine**: `boolean` = `false`

Defined in: [core/actions/src/workflow-manager.ts:223](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L223)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`executingDefine`](CoalescingWorkflow.md#executingdefine)

***

### executor?

> `optional` **executor**: [`Executor`](Executor.md)

Defined in: [core/actions/src/action-manager.ts:27](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L27)

Specify an executor in which all actions of this class will run.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`executor`](CoalescingWorkflow.md#executor)

***

### IArgument

> **IArgument**: `JSONObject`

Defined in: [core/actions/src/action-manager.ts:86](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L86)

Action argument

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`IArgument`](CoalescingWorkflow.md#iargument)

***

### IBag

> **IBag**: `object`

Defined in: [core/actions/src/workflow-manager.ts:44](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L44)

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

> **IResult**: `Error` \| `JSONObject`

Defined in: [core/actions/src/action-manager.ts:96](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L96)

Action result

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`IResult`](CoalescingWorkflow.md#iresult)

***

### isExecutorSet

> **isExecutorSet**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:492](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L492)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isExecutorSet`](CoalescingWorkflow.md#isexecutorset)

***

### ~~isInitialised~~

> **isInitialised**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:464](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L464)

#### Deprecated

use isInitialized

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isInitialised`](CoalescingWorkflow.md#isinitialised)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:465](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L465)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`isInitialized`](CoalescingWorkflow.md#isinitialized)

***

### mapRefWithStrategy

> **mapRefWithStrategy**: `Map`\<`string`, `"default"` \| `"cross-workflow"`\>

Defined in: [core/actions/src/coalescing-manager.ts:61](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L61)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`mapRefWithStrategy`](CoalescingWorkflow.md#maprefwithstrategy)

***

### registeredActionIds

> **registeredActionIds**: `any`[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:466](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L466)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`registeredActionIds`](CoalescingWorkflow.md#registeredactionids)

***

### resolveDefineIteration()

> **resolveDefineIteration**: (`actionState?`) => `void`

Defined in: [core/actions/src/workflow-manager.ts:271](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L271)

#### Parameters

##### actionState?

[`ActionState`](../enumerations/ActionState.md)

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resolveDefineIteration`](CoalescingWorkflow.md#resolvedefineiteration)

***

### steps

> **steps**: [`Step`](../interfaces/Step.md)[] = `[]`

Defined in: [core/actions/src/workflow-manager.ts:42](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L42)

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`steps`](CoalescingWorkflow.md#steps)

***

### cronDefaultSettings

> `static` **cronDefaultSettings**: `object`

Defined in: [core/actions/src/action-manager.ts:69](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L69)

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

Defined in: [core/actions/src/workflow-manager.ts:36](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L36)

Shortcut to [\[ActionState.IN\_PROGRESS\]](Action.md#defaultdelays).

If not set, this property will be 'inherited' from the first parent class where it is.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`defaultDelay`](CoalescingWorkflow.md#defaultdelay)

***

### defaultDelays

> `static` **defaultDelays**: `object`

Defined in: [core/actions/src/action-manager.ts:57](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L57)

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

Defined in: [core/actions/src/action-manager.ts:22](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L22)

Id of the action stored in database.
It should be a permanent id that designates the action instance.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`permanentRef`](CoalescingWorkflow.md#permanentref)

## Accessors

### \_id

#### Get Signature

> **get** **\_id**(): `this`\[`"dbDoc"`\]\[`"_id"`\]

Defined in: [core/actions/src/action-manager.ts:152](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L152)

##### Returns

`this`\[`"dbDoc"`\]\[`"_id"`\]

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`_id`](CoalescingWorkflow.md#_id)

***

### argument

#### Get Signature

> **get** **argument**(): `this`\[`"dbDoc"`\]\[`"argument"`\]

Defined in: [core/actions/src/action-manager.ts:116](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L116)

##### Returns

`this`\[`"dbDoc"`\]\[`"argument"`\]

#### Set Signature

> **set** **argument**(`argument`): `void`

Defined in: [core/actions/src/action-manager.ts:120](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L120)

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

Defined in: [core/actions/src/action-manager.ts:107](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L107)

##### Returns

`this`\[`"dbDoc"`\]\[`"bag"`\]

#### Set Signature

> **set** **bag**(`bag`): `void`

Defined in: [core/actions/src/action-manager.ts:111](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L111)

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

Defined in: [core/actions/src/action-manager.ts:143](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L143)

##### Returns

`this`\[`"dbDoc"`\]\[`"cronActivity"`\]

#### Set Signature

> **set** **cronActivity**(`cronActivity`): `void`

Defined in: [core/actions/src/action-manager.ts:147](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L147)

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

Defined in: [core/actions/src/action-manager.ts:134](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L134)

##### Returns

`this`\[`"dbDoc"`\]\[`"repeat"`\]

#### Set Signature

> **set** **repeat**(`repeat`): `void`

Defined in: [core/actions/src/action-manager.ts:138](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L138)

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

Defined in: [core/actions/src/action-manager.ts:125](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L125)

##### Returns

`this`\[`"dbDoc"`\]\[`"result"`\]

#### Set Signature

> **set** **result**(`result`): `void`

Defined in: [core/actions/src/action-manager.ts:129](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L129)

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

Defined in: [core/actions/src/action-manager.ts:627](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L627)

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

Defined in: [core/actions/src/action-manager.ts:779](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L779)

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

Defined in: [core/actions/src/workflow-manager.ts:195](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L195)

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

Defined in: [core/actions/src/workflow-manager.ts:188](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L188)

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

Defined in: [core/actions/src/action-manager.ts:902](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L902)

Clone the action.

#### Returns

`any`

a new action with the same argument

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`clone`](CoalescingWorkflow.md#clone)

***

### define()

> **define**(): `Promise`\<\{ \}\>

Defined in: [core/actions/src/coalescing-manager.ts:106](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L106)

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

Defined in: [core/actions/src/workflow-manager.ts:238](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L238)

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

Defined in: [core/actions/src/coalescing-manager.ts:119](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L119)

#### Returns

`Promise`\<`string`[]\>

***

### do()

#### Call Signature

> **do**\<`T`\>(`ref`, `action`): `DoPromise`\<`T`\[`"IResult"`\]\>

Defined in: [core/actions/src/workflow-manager.ts:478](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L478)

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

Defined in: [core/actions/src/workflow-manager.ts:488](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L488)

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

Defined in: [core/actions/src/workflow-manager.ts:501](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L501)

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

Defined in: [core/actions/src/workflow-manager.ts:516](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L516)

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

Defined in: [core/actions/src/workflow-manager.ts:519](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L519)

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

Defined in: [core/actions/src/action-manager.ts:301](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L301)

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

Defined in: [core/actions/src/action-manager.ts:297](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L297)

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

Defined in: [core/actions/src/coalescing-manager.ts:62](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L62)

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

Defined in: [core/actions/src/action-manager.ts:783](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L783)

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

Defined in: [core/actions/src/workflow-manager.ts:180](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L180)

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

Defined in: [core/actions/src/workflow-manager.ts:171](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L171)

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

Defined in: [core/actions/src/coalescing-manager.ts:7](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L7)

#### Returns

`any`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`identity`](CoalescingWorkflow.md#identity)

***

### init()

> **init**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:387](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L387)

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

Defined in: [core/actions/src/action-manager.ts:470](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L470)

#### Returns

`Promise`\<`void`\>

#### Deprecated

use initialization

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`initialisation`](CoalescingWorkflow.md#initialisation)

***

### initialization()

> **initialization**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:479](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L479)

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

Defined in: [core/actions/src/action-manager.ts:844](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L844)

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

`string` = `'info'`

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`internalLog`](CoalescingWorkflow.md#internallog)

***

### internalLogError()

> **internalLogError**(`err`): `void`

Defined in: [core/actions/src/workflow-manager.ts:743](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L743)

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

Defined in: [core/actions/src/workflow-manager.ts:212](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L212)

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

Defined in: [core/actions/src/coalescing-manager.ts:92](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L92)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`lastOutput`](CoalescingWorkflow.md#lastoutput)

***

### main()

> **main**(): `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/workflow-manager.ts:311](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L311)

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

Defined in: [core/actions/src/workflow-manager.ts:164](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L164)

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

Defined in: [core/actions/src/workflow-manager.ts:87](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L87)

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

### once()

> **once**(`ref`, `opts`): `Promise`\<`unknown`\>

Defined in: [core/actions/src/coalescing-manager.ts:80](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L80)

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

Defined in: [core/actions/src/workflow-manager.ts:104](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L104)

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

Defined in: [core/actions/src/workflow-manager.ts:95](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L95)

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

Defined in: [core/actions/src/workflow-manager.ts:207](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L207)

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

Defined in: [core/actions/src/workflow-manager.ts:662](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L662)

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

Defined in: [core/actions/src/workflow-manager.ts:202](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L202)

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

Defined in: [core/actions/src/workflow-manager.ts:631](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L631)

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

Defined in: [core/actions/src/workflow-manager.ts:632](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L632)

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

Defined in: [core/actions/src/workflow-manager.ts:237](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L237)

#### Returns

`void`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resolveDynamicActionFinding`](CoalescingWorkflow.md#resolvedynamicactionfinding)

***

### resume()

> **resume**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:596](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L596)

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

Defined in: [core/actions/src/action-manager.ts:316](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L316)

Update the current model instance with latest data from database

#### Returns

`Promise`\<`void`\>

a promise that resolves when the document has been loaded

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`resyncWithDb`](CoalescingWorkflow.md#resyncwithdb)

***

### rollback()

> **rollback**(`cb`, `opts?`): `Digestor`

Defined in: [core/actions/src/workflow-manager.ts:155](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L155)

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

Defined in: [core/actions/src/coalescing-manager.ts:29](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L29)

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

Defined in: [core/actions/src/action-manager.ts:396](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L396)

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

Defined in: [core/actions/src/action-manager.ts:511](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L511)

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

Defined in: [core/actions/src/action-manager.ts:428](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L428)

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

Defined in: [core/actions/src/action-manager.ts:412](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L412)

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

Defined in: [core/actions/src/action-manager.ts:438](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L438)

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

Defined in: [core/actions/src/workflow-manager.ts:406](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L406)

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

Defined in: [core/actions/src/workflow-manager.ts:378](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L378)

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

Defined in: [core/actions/src/coalescing-manager.ts:12](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L12)

#### Returns

`string`

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`stringifyIdentity`](CoalescingWorkflow.md#stringifyidentity)

***

### substitute()

> **substitute**(`otherPendingActionsWithSameIdentity`): [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `getNextStepAttemp`: `number`; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `Error` \| `JSONObject`\>

Defined in: [core/actions/src/coalescing-manager.ts:25](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/coalescing-manager.ts#L25)

#### Parameters

##### otherPendingActionsWithSameIdentity

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `getNextStepAttemp`: `number`; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `Error` \| `JSONObject`\>[]

#### Returns

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, \{ `actions`: \{[`key`: `string`]: `object`; \}; `currentStepIndex?`: `number`; `currentStepName?`: `string`; `currentTrackIds`: `string`[]; `getNextStepAttemp`: `number`; `isRollBackPossible`: `boolean`; `nTimesCurrentStep`: `number`; `oldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `preserveOldResult`: [`StepResult`](../type-aliases/StepResult.md)[]; `registeredActions`: `object`[]; `stepsHistory`: `number`[]; \}, `Error` \| `JSONObject`\>

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`substitute`](CoalescingWorkflow.md#substitute)

***

### toPromise()

> `protected` **toPromise**(`ref`, `dbDoc`): `DoPromise`\<`unknown`\>

Defined in: [core/actions/src/workflow-manager.ts:447](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L447)

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

Defined in: [core/actions/src/workflow-manager.ts:83](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L83)

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

Defined in: [core/actions/src/workflow-manager.ts:667](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L667)

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

Defined in: [core/actions/src/action-manager.ts:231](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L231)

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

Defined in: [core/actions/src/action-manager.ts:256](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L256)

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

Defined in: [core/actions/src/action-manager.ts:284](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L284)

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

Defined in: [core/actions/src/workflow-manager.ts:715](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/workflow-manager.ts#L715)

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

Defined in: [core/actions/src/action-manager.ts:344](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L344)

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

Defined in: [core/actions/src/action-manager.ts:333](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L333)

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

Defined in: [core/actions/src/action-manager.ts:914](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-manager.ts#L914)

Track an action until it reaches one of the given states.

#### Parameters

##### action

[`Action`](Action.md)

The action to track.

##### states

[`ActionState`](../enumerations/ActionState.md)[]

The states to reach.

#### Returns

`Promise`\<`unknown`\>

A promise that resolves when the action reaches one of the given states. The promise resolves with the state reached.

#### Inherited from

[`CoalescingWorkflow`](CoalescingWorkflow.md).[`trackActionAsPromise`](CoalescingWorkflow.md#trackactionaspromise)
