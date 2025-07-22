# Class: Action

Defined in: [core/actions/src/action-manager.ts:24](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L24)

Structure actions.

Extends this class to build new actions behaviors.

## Extended by

- [`ResolveAction`](ResolveAction.md)
- [`RejectAction`](RejectAction.md)
- [`Workflow`](Workflow.md)
- [`TrackPromise`](TrackPromise.md)
- [`Sleep`](Sleep.md)

## Constructors

### Constructor

> **new Action**(): `Action`

Defined in: [core/actions/src/action-manager.ts:209](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L209)

#### Returns

`Action`

## Properties

### dbDoc

> **dbDoc**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, `JSONObject`, `void` \| `Error` \| `JSONObject`\>

Defined in: [core/actions/src/action-manager.ts:114](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L114)

Action Database Document

***

### executor?

> `optional` **executor**: [`Executor`](Executor.md)

Defined in: [core/actions/src/action-manager.ts:40](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L40)

Specify an executor in which all actions of this class will run.

***

### IArgument

> **IArgument**: `JSONObject`

Defined in: [core/actions/src/action-manager.ts:99](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L99)

Action argument

***

### IBag

> **IBag**: `JSONObject`

Defined in: [core/actions/src/action-manager.ts:104](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L104)

Action bag

***

### IResult

> **IResult**: `void` \| `Error` \| `JSONObject`

Defined in: [core/actions/src/action-manager.ts:109](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L109)

Action result

***

### isExecutorSet

> **isExecutorSet**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:530](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L530)

***

### ~~isInitialised~~

> **isInitialised**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:502](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L502)

#### Deprecated

use isInitialized

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [core/actions/src/action-manager.ts:503](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L503)

***

### notifyHealthPromise

> **notifyHealthPromise**: `Promise`\<`any`\> = `undefined`

Defined in: [core/actions/src/action-manager.ts:962](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L962)

Send a signal to indicate that the action is still in progress..
Useful for preventing timeouts when the action's duration is long but not precisely predictable.

***

### runtime

> **runtime**: [`ActionRuntime`](ActionRuntime.md) = `ActionRuntime.activeRuntime`

Defined in: [core/actions/src/action-manager.ts:42](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L42)

***

### cronDefaultSettings

> `static` **cronDefaultSettings**: `object`

Defined in: [core/actions/src/action-manager.ts:82](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L82)

Configure the frequency at which a cron will launch [Action.resume](#resume).
It is also possible to dynamically modify the dbDoc.cronActivity property to modify the call to a cron.
If not set, this property will be 'inherited' from the first parent class where it is.

#### ~~activityFrequence?~~

> `optional` **activityFrequence**: `number`

##### Deprecated

use activityFrequency

#### activityFrequency?

> `optional` **activityFrequency**: `number`

TODO: set this as required after activityFrequence removal

***

### defaultDelay

> `static` **defaultDelay**: `number`

Defined in: [core/actions/src/action-manager.ts:49](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L49)

Shortcut to [\[ActionState.IN\_PROGRESS\]](#defaultdelays).

If not set, this property will be 'inherited' from the first parent class where it is.

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

***

### permanentRef

> `static` **permanentRef**: `string` \| `string`[]

Defined in: [core/actions/src/action-manager.ts:35](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L35)

Id of the action stored in database.
It should be a permanent id that designates the action instance.

## Accessors

### \_id

#### Get Signature

> **get** **\_id**(): `this`\[`"dbDoc"`\]\[`"_id"`\]

Defined in: [core/actions/src/action-manager.ts:165](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L165)

##### Returns

`this`\[`"dbDoc"`\]\[`"_id"`\]

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

## Methods

### \_resume()

> **\_resume**(): `any`

Defined in: [core/actions/src/action-manager.ts:664](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L664)

The function resumes the action by calling the appropriate function depending on the current
state of the action. It doesn't take into account the executor.

#### Returns

`any`

A promise. You can not rely on this to know when an action is finished.

***

### activityLogs()

> **activityLogs**(`options`): `any`[] \| `Promise`\<`any`[]\>

Defined in: [core/actions/src/action-manager.ts:808](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L808)

#### Parameters

##### options

`any`

#### Returns

`any`[] \| `Promise`\<`any`[]\>

***

### clone()

> **clone**(): `any`

Defined in: [core/actions/src/action-manager.ts:931](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L931)

Clone the action.

#### Returns

`any`

a new action with the same argument

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

***

### ~~initialisation()~~

> **initialisation**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:508](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L508)

#### Returns

`Promise`\<`void`\>

#### Deprecated

use initialization

***

### initialization()

> **initialization**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:517](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L517)

Mainly used for workflows.
Can also complement init().
If it gets too complex, use hooks.

#### Returns

`Promise`\<`void`\>

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

***

### internalLogError()

> **internalLogError**(`err`): `void`

Defined in: [core/actions/src/action-manager.ts:907](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L907)

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

***

### main()

> **main**(): [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/action-manager.ts:624](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L624)

This method should launched the main action process
It is called only one time.
It returns a state value.

#### Returns

[`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

***

### notifyHealth()

> **notifyHealth**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:963](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L963)

#### Returns

`Promise`\<`any`\>

***

### onMainTimeout()

> **onMainTimeout**(): [`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/action-manager.ts:733](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L733)

Called in case of timeout in `ActionState.EXECUTING_MAIN` state.

It can return `ActionState.SLEEPING` if the process infers
that `main()` has not run and the action must be retried.

#### Returns

[`ActionState`](../enumerations/ActionState.md) \| `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

a `ActionState` value.

***

### resume()

> **resume**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-manager.ts:633](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L633)

The function resumes the action by calling the appropriate executor if needed and then by calling the appropriate function depending on the current
state of the action

#### Returns

`Promise`\<`any`\>

A promise. You can not rely on this to know when an action is finished.

***

### resyncWithDb()

> **resyncWithDb**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-manager.ts:344](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L344)

Update the current model instance with latest data from database

#### Returns

`Promise`\<`void`\>

a promise that resolves when the document has been loaded

***

### save()

> **save**(): `Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, `JSONObject`, `void` \| `Error` \| `JSONObject`\>\>

Defined in: [core/actions/src/action-manager.ts:173](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L173)

Save an action in the database. Will then be managed by the worker.

#### Returns

`Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`JSONObject`, `JSONObject`, `void` \| `Error` \| `JSONObject`\>\>

a promise that resolves when the action has been saved

***

### setArgument()

> **setArgument**(`args`): `Action`

Defined in: [core/actions/src/action-manager.ts:424](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L424)

Set the `argument` that will be stored in the database.
Once set, the argument of an action should not be modified.

#### Parameters

##### args

`JSONObject`

The argument to set.

#### Returns

`Action`

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

***

### setFilter()

> **setFilter**(`filter`): `Action`

Defined in: [core/actions/src/action-manager.ts:455](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L455)

Make filtering actions easier with the `filter` property.
These filters are stored in database with
the `filter` property and allow to search for
an action or a group of actions

#### Parameters

##### filter

`Object`

#### Returns

`Action`

***

### setRepeat()

> **setRepeat**(`opts`): `Action`

Defined in: [core/actions/src/action-manager.ts:439](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L439)

Configure the number of times an action is repeated.

#### Parameters

##### opts

###### 4?

`number`

###### 5?

`number`

#### Returns

`Action`

***

### setResult()

> **setResult**(...`results`): `Action`

Defined in: [core/actions/src/action-manager.ts:465](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L465)

Set the action result.

#### Parameters

##### results

...`any`[]

#### Returns

`Action`

***

### watcher()

> **watcher**(): `Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

Defined in: [core/actions/src/action-manager.ts:495](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L495)

Watch the action state.

It is called :
- potentially many times when the action is in `IN_PROGRESS` state
- one time if the action is in `EXECUTING_MAIN` state and the executing_main delay has expired.

#### Returns

`Promise`\<[`ActionState`](../enumerations/ActionState.md)\>

promise

***

### \_constructFromDb()

> `static` **\_constructFromDb**(`actionDb`): `Action`

Defined in: [core/actions/src/action-manager.ts:266](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L266)

Construct an action from a document stored in the database.

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

a document coming from the database

#### Returns

`Action`

an action for which dbDoc property is equal to actionDb

***

### \_constructFromWorkflow()

> `static` **\_constructFromWorkflow**(`dbDoc`): `Promise`\<`Action`\>

Defined in: [core/actions/src/action-manager.ts:291](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L291)

Construct an action from a document stored in the database and whose definition depends on a workflow.

#### Parameters

##### dbDoc

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

#### Returns

`Promise`\<`Action`\>

an action for which dbDoc property is equal to actionDb

***

### constructFromDb()

> `static` **constructFromDb**(`actionDb`): `Promise`\<`Action`\>

Defined in: [core/actions/src/action-manager.ts:314](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L314)

Construct an action from a document stored in the database.

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

a document coming from the database

#### Returns

`Promise`\<`Action`\>

an action for which dbDoc property is equal to actionDb

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

***

### trackActionAsPromise()

> `static` **trackActionAsPromise**(`action`, `states`): `Promise`\<`unknown`\>

Defined in: [core/actions/src/action-manager.ts:943](https://github.com/LaWebcapsule/orbits/blob/af76aea9967645ddd9a56c7c9b077bfc77e5cc61/core/actions/src/action-manager.ts#L943)

Track an action until it reaches one of the given states.

#### Parameters

##### action

`Action`

The action to track.

##### states

[`ActionState`](../enumerations/ActionState.md)[] = `...`

The states to reach.

#### Returns

`Promise`\<`unknown`\>

A promise that resolves when the action reaches one of the given states. The promise resolves with the state reached.
