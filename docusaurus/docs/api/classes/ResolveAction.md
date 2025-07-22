# Class: ResolveAction

Defined in: [core/actions/src/action-manager.ts:974](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L974)

Action that resolves in SUCCESS state.

## Extends

- [`Action`](Action.md)

## Constructors

### Constructor

> **new ResolveAction**(): `ResolveAction`

Defined in: [core/actions/src/action-manager.ts:203](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L203)

#### Returns

`ResolveAction`

#### Inherited from

[`Action`](Action.md).[`constructor`](Action.md#constructor)

## Properties

### dbDoc

> **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, `JSONObject`, `void` \| `Error` \| `JSONObject`\>

Defined in: [core/actions/src/action-manager.ts:113](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L113)

Action Database Document

#### Inherited from

[`Action`](Action.md).[`dbDoc`](Action.md#dbdoc)

***

### executor?

> `optional` **executor**: [`Executor`](Executor.md)

Defined in: [core/actions/src/action-manager.ts:39](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L39)

Specify an executor in which all actions of this class will run.

#### Inherited from

[`Action`](Action.md).[`executor`](Action.md#executor)

***

### IArgument

> **IArgument**: `JSONObject`

Defined in: [core/actions/src/action-manager.ts:98](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L98)

Action argument

#### Inherited from

[`Action`](Action.md).[`IArgument`](Action.md#iargument)

***

### IBag

> **IBag**: `JSONObject`

Defined in: [core/actions/src/action-manager.ts:103](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L103)

Action bag

#### Inherited from

[`Action`](Action.md).[`IBag`](Action.md#ibag)

***

### IResult

> **IResult**: `void` \| `Error` \| `JSONObject`

Defined in: [core/actions/src/action-manager.ts:108](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L108)

Action result

#### Inherited from

[`Action`](Action.md).[`IResult`](Action.md#iresult)

***

### isExecutorSet

> **isExecutorSet**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:528](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L528)

#### Inherited from

[`Action`](Action.md).[`isExecutorSet`](Action.md#isexecutorset)

***

### ~~isInitialised~~

> **isInitialised**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:500](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L500)

#### Deprecated

use isInitialized

#### Inherited from

[`Action`](Action.md).[`isInitialised`](Action.md#isinitialised)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:501](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L501)

#### Inherited from

[`Action`](Action.md).[`isInitialized`](Action.md#isinitialized)

***

### notifyHealthPromise

> **notifyHealthPromise**: `Promise`\<`any`\> = `undefined`

Defined in: [core/actions/src/action-manager.ts:955](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L955)

Send a signal to indicate that the action is still in progress..
Useful for preventing timeouts when the action's duration is long but not precisely predictable.

#### Inherited from

[`Action`](Action.md).[`notifyHealthPromise`](Action.md#notifyhealthpromise)

***

### runtime

> **runtime**: [`ActionRuntime`](ActionRuntime.md) = `ActionRuntime.activeRuntime`

Defined in: [core/actions/src/action-manager.ts:41](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L41)

#### Inherited from

[`Action`](Action.md).[`runtime`](Action.md#runtime)

***

### cronDefaultSettings

> `static` **cronDefaultSettings**: `object`

Defined in: [core/actions/src/action-manager.ts:81](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L81)

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

[`Action`](Action.md).[`cronDefaultSettings`](Action.md#crondefaultsettings)

***

### defaultDelay

> `static` **defaultDelay**: `number`

Defined in: [core/actions/src/action-manager.ts:48](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L48)

Shortcut to [\[ActionState.IN\_PROGRESS\]](Action.md#defaultdelays).

If not set, this property will be 'inherited' from the first parent class where it is.

#### Inherited from

[`Action`](Action.md).[`defaultDelay`](Action.md#defaultdelay)

***

### defaultDelays

> `static` **defaultDelays**: `object`

Defined in: [core/actions/src/action-manager.ts:69](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L69)

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

[`Action`](Action.md).[`defaultDelays`](Action.md#defaultdelays)

***

### permanentRef

> `static` **permanentRef**: `string` \| `string`[]

Defined in: [core/actions/src/action-manager.ts:34](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L34)

Id of the action stored in database.
It should be a permanent id that designates the action instance.

#### Inherited from

[`Action`](Action.md).[`permanentRef`](Action.md#permanentref)

## Accessors

### \_id

#### Get Signature

> **get** **\_id**(): `this`\[`"dbDoc"`\]\[`"_id"`\]

Defined in: [core/actions/src/action-manager.ts:164](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L164)

##### Returns

`this`\[`"dbDoc"`\]\[`"_id"`\]

#### Inherited from

[`Action`](Action.md).[`_id`](Action.md#_id)

***

### argument

#### Get Signature

> **get** **argument**(): `this`\[`"dbDoc"`\]\[`"argument"`\]

Defined in: [core/actions/src/action-manager.ts:128](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L128)

##### Returns

`this`\[`"dbDoc"`\]\[`"argument"`\]

#### Set Signature

> **set** **argument**(`argument`): `void`

Defined in: [core/actions/src/action-manager.ts:132](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L132)

##### Parameters

###### argument

`this`\[`"dbDoc"`\]\[`"argument"`\]

##### Returns

`void`

#### Inherited from

[`Action`](Action.md).[`argument`](Action.md#argument)

***

### bag

#### Get Signature

> **get** **bag**(): `this`\[`"dbDoc"`\]\[`"bag"`\]

Defined in: [core/actions/src/action-manager.ts:119](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L119)

##### Returns

`this`\[`"dbDoc"`\]\[`"bag"`\]

#### Set Signature

> **set** **bag**(`bag`): `void`

Defined in: [core/actions/src/action-manager.ts:123](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L123)

##### Parameters

###### bag

`this`\[`"dbDoc"`\]\[`"bag"`\]

##### Returns

`void`

#### Inherited from

[`Action`](Action.md).[`bag`](Action.md#bag)

***

### cronActivity

#### Get Signature

> **get** **cronActivity**(): `this`\[`"dbDoc"`\]\[`"cronActivity"`\]

Defined in: [core/actions/src/action-manager.ts:155](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L155)

##### Returns

`this`\[`"dbDoc"`\]\[`"cronActivity"`\]

#### Set Signature

> **set** **cronActivity**(`cronActivity`): `void`

Defined in: [core/actions/src/action-manager.ts:159](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L159)

##### Parameters

###### cronActivity

`this`\[`"dbDoc"`\]\[`"cronActivity"`\]

##### Returns

`void`

#### Inherited from

[`Action`](Action.md).[`cronActivity`](Action.md#cronactivity)

***

### repeat

#### Get Signature

> **get** **repeat**(): `this`\[`"dbDoc"`\]\[`"repeat"`\]

Defined in: [core/actions/src/action-manager.ts:146](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L146)

##### Returns

`this`\[`"dbDoc"`\]\[`"repeat"`\]

#### Set Signature

> **set** **repeat**(`repeat`): `void`

Defined in: [core/actions/src/action-manager.ts:150](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L150)

##### Parameters

###### repeat

`this`\[`"dbDoc"`\]\[`"repeat"`\]

##### Returns

`void`

#### Inherited from

[`Action`](Action.md).[`repeat`](Action.md#repeat)

***

### result

#### Get Signature

> **get** **result**(): `this`\[`"dbDoc"`\]\[`"result"`\]

Defined in: [core/actions/src/action-manager.ts:137](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L137)

##### Returns

`this`\[`"dbDoc"`\]\[`"result"`\]

#### Set Signature

> **set** **result**(`result`): `void`

Defined in: [core/actions/src/action-manager.ts:141](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L141)

##### Parameters

###### result

`this`\[`"dbDoc"`\]\[`"result"`\]

##### Returns

`void`

#### Inherited from

[`Action`](Action.md).[`result`](Action.md#result)

## Methods

### \_resume()

> **\_resume**(): `any`

Defined in: [core/actions/src/action-manager.ts:662](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L662)

The function resumes the action by calling the appropriate function depending on the current
state of the action. It doesn't take into account the executor.

#### Returns

`any`

A promise. You can not rely on this to know when an action is finished.

#### Inherited from

[`Action`](Action.md).[`_resume`](Action.md#_resume)

***

### activityLogs()

> **activityLogs**(`options`): `any`[] \| `Promise`\<`any`[]\>

Defined in: [core/actions/src/action-manager.ts:804](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L804)

#### Parameters

##### options

`any`

#### Returns

`any`[] \| `Promise`\<`any`[]\>

#### Inherited from

[`Action`](Action.md).[`activityLogs`](Action.md#activitylogs)

***

### clone()

> **clone**(): `any`

Defined in: [core/actions/src/action-manager.ts:927](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L927)

Clone the action.

#### Returns

`any`

a new action with the same argument

#### Inherited from

[`Action`](Action.md).[`clone`](Action.md#clone)

***

### dynamicallyDefineFromWorkflowStep()

> **dynamicallyDefineFromWorkflowStep**(`workflow`, `marker`): `void`

Defined in: [core/actions/src/action-manager.ts:325](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L325)

#### Parameters

##### workflow

[`Workflow`](Workflow.md)

##### marker

`string`

#### Returns

`void`

#### Inherited from

[`Action`](Action.md).[`dynamicallyDefineFromWorkflowStep`](Action.md#dynamicallydefinefromworkflowstep)

***

### ~~dynamiclyDefineFromWorfklowStep()~~

> **dynamiclyDefineFromWorfklowStep**(`workflow`, `marker`): `void`

Defined in: [core/actions/src/action-manager.ts:321](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L321)

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

[`Action`](Action.md).[`dynamiclyDefineFromWorfklowStep`](Action.md#dynamiclydefinefromworfklowstep)

***

### getLogs()

> **getLogs**(`options`): `Promise`\<`any`[]\>

Defined in: [core/actions/src/action-manager.ts:808](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L808)

#### Parameters

##### options

###### endTime?

`number`

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`Action`](Action.md).[`getLogs`](Action.md#getlogs)

***

### init()

> **init**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:411](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L411)

Initialize the action from the action stored in the database.

Example: In order to not store secrets in the database,
you can set a vault id in the argument
and retrieve the secret at the initialization of the action.

Example: You cannot store class object on the database.
If your action use complex object, they can be initialized here.

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`Action`](Action.md).[`init`](Action.md#init)

***

### ~~initialisation()~~

> **initialisation**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:506](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L506)

#### Returns

`Promise`\<`void`\>

#### Deprecated

use initialization

#### Inherited from

[`Action`](Action.md).[`initialisation`](Action.md#initialisation)

***

### initialization()

> **initialization**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:515](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L515)

Mainly used for workflows.
Can also complement init().
If it gets too complex, use hooks.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Action`](Action.md).[`initialization`](Action.md#initialization)

***

### internalLog()

> **internalLog**(`message`, `opts`): `void`

Defined in: [core/actions/src/action-manager.ts:869](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L869)

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

[`Action`](Action.md).[`internalLog`](Action.md#internallog)

***

### internalLogError()

> **internalLogError**(`err`): `void`

Defined in: [core/actions/src/action-manager.ts:903](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L903)

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

[`Action`](Action.md).[`internalLogError`](Action.md#internallogerror)

***

### main()

> **main**(): `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/action-manager.ts:975](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L975)

This method should launched the main action process
It is called only one time.
It returns a state value.

#### Returns

`Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

#### Overrides

[`Action`](Action.md).[`main`](Action.md#main)

***

### notifyHealth()

> **notifyHealth**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:956](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L956)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`Action`](Action.md).[`notifyHealth`](Action.md#notifyhealth)

***

### onMainTimeout()

> **onMainTimeout**(): [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/action-manager.ts:729](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L729)

Called in case of timeout in `ActionState.EXECUTING_MAIN` state.

It can return `ActionState.SLEEPING` if the process infers
that `main()` has not run and the action must be retried.

#### Returns

[`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

a `ActionState` value.

#### Inherited from

[`Action`](Action.md).[`onMainTimeout`](Action.md#onmaintimeout)

***

### resume()

> **resume**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:631](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L631)

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`\<`any`\>

A promise. You can not rely on this to know when an action is finished.

#### Inherited from

[`Action`](Action.md).[`resume`](Action.md#resume)

***

### resyncWithDb()

> **resyncWithDb**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:340](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L340)

Update the current model instance with latest data from database

#### Returns

`Promise`\<`void`\>

a promise that resolves when the document has been loaded

#### Inherited from

[`Action`](Action.md).[`resyncWithDb`](Action.md#resyncwithdb)

***

### save()

> **save**(): `Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, `JSONObject`, `void` \| `Error` \| `JSONObject`\>\>

Defined in: [core/actions/src/action-manager.ts:172](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L172)

Save an action in the database. Will then be managed by the worker.

#### Returns

`Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, `JSONObject`, `void` \| `Error` \| `JSONObject`\>\>

a promise that resolves when the action has been saved

#### Inherited from

[`Action`](Action.md).[`save`](Action.md#save)

***

### setArgument()

> **setArgument**(`args`): `ResolveAction`

Defined in: [core/actions/src/action-manager.ts:420](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L420)

Set the `argument` that will be stored in the database.
Once set, the argument of an action should not be modified.

#### Parameters

##### args

`JSONObject`

The argument to set.

#### Returns

`ResolveAction`

#### Inherited from

[`Action`](Action.md).[`setArgument`](Action.md#setargument)

***

### setExecutor()

> **setExecutor**(): `void` \| [`Executor`](Executor.md) \| `Promise`\<`void` \| [`Executor`](Executor.md)\>

Defined in: [core/actions/src/action-manager.ts:547](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L547)

Set the executor for this action.
It is called only once when the action is created.
If you want to set an executor, you should override this method.

#### Returns

`void` \| [`Executor`](Executor.md) \| `Promise`\<`void` \| [`Executor`](Executor.md)\>

a promise that resolves when you have set the executor is set

#### Inherited from

[`Action`](Action.md).[`setExecutor`](Action.md#setexecutor)

***

### setFilter()

> **setFilter**(`filter`): `ResolveAction`

Defined in: [core/actions/src/action-manager.ts:452](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L452)

Make filtering actions easier with the `filter` property.
These filters are stored in database with
the `filter` property and allow to search for
an action or a group of actions

#### Parameters

##### filter

`Object`

#### Returns

`ResolveAction`

#### Inherited from

[`Action`](Action.md).[`setFilter`](Action.md#setfilter)

***

### setRepeat()

> **setRepeat**(`opts`): `ResolveAction`

Defined in: [core/actions/src/action-manager.ts:436](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L436)

Configure the number of times an action is repeated.

#### Parameters

##### opts

###### 4?

`number`

###### 5?

`number`

#### Returns

`ResolveAction`

#### Inherited from

[`Action`](Action.md).[`setRepeat`](Action.md#setrepeat)

***

### setResult()

> **setResult**(...`results`): `ResolveAction`

Defined in: [core/actions/src/action-manager.ts:462](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L462)

Set the action result.

#### Parameters

##### results

...`any`[]

#### Returns

`ResolveAction`

#### Inherited from

[`Action`](Action.md).[`setResult`](Action.md#setresult)

***

### watcher()

> **watcher**(): `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/action-manager.ts:979](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L979)

Watch the action state.

It is called :
- potentially many times when the action is in `IN_PROGRESS` state
- one time if the action is in `EXECUTING_MAIN` state and the executing_main delay has expired.

#### Returns

`Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

promise

#### Overrides

[`Action`](Action.md).[`watcher`](Action.md#watcher)

***

### \_constructFromDb()

> `static` **\_constructFromDb**(`actionDb`): [`Action`](Action.md)

Defined in: [core/actions/src/action-manager.ts:259](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L259)

Construct an action from a document stored in the database.

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

a document coming from the database

#### Returns

[`Action`](Action.md)

an action for which dbDoc property is equal to actionDb

#### Inherited from

[`Action`](Action.md).[`_constructFromDb`](Action.md#_constructfromdb)

***

### \_constructFromWorkflow()

> `static` **\_constructFromWorkflow**(`dbDoc`): `Promise`\<[`Action`](Action.md)\>

Defined in: [core/actions/src/action-manager.ts:284](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L284)

Construct an action from a document stored in the database and whose definition depends on a workflow.

#### Parameters

##### dbDoc

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

#### Returns

`Promise`\<[`Action`](Action.md)\>

an action for which dbDoc property is equal to actionDb

#### Inherited from

[`Action`](Action.md).[`_constructFromWorkflow`](Action.md#_constructfromworkflow)

***

### constructFromDb()

> `static` **constructFromDb**(`actionDb`): `Promise`\<[`Action`](Action.md)\>

Defined in: [core/actions/src/action-manager.ts:308](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L308)

Construct an action from a document stored in the database.

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

a document coming from the database

#### Returns

`Promise`\<[`Action`](Action.md)\>

an action for which dbDoc property is equal to actionDb

#### Inherited from

[`Action`](Action.md).[`constructFromDb`](Action.md#constructfromdb)

***

### reject()

> `static` **reject**(`result?`): [`RejectAction`](RejectAction.md)

Defined in: [core/actions/src/action-manager.ts:368](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L368)

Return a new [RejectAction](RejectAction.md) object.

#### Parameters

##### result?

`any`

action result

#### Returns

[`RejectAction`](RejectAction.md)

new `RejectAction`instance

#### Inherited from

[`Action`](Action.md).[`reject`](Action.md#reject)

***

### resolve()

> `static` **resolve**(`result?`): `ResolveAction`

Defined in: [core/actions/src/action-manager.ts:357](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L357)

Return a new ResolveAction object.

#### Parameters

##### result?

`any`

action result

#### Returns

`ResolveAction`

new `ResolveAction`instance

#### Inherited from

[`Action`](Action.md).[`resolve`](Action.md#resolve)

***

### trackActionAsPromise()

> `static` **trackActionAsPromise**(`action`, `states`): `Promise`\<`unknown`\>

Defined in: [core/actions/src/action-manager.ts:939](https://github.com/LaWebcapsule/orbits/blob/6d5fcb96a52f50e33dec256b205946535214bcf9/core/actions/src/action-manager.ts#L939)

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

[`Action`](Action.md).[`trackActionAsPromise`](Action.md#trackactionaspromise)
