# Interface: ActionSchemaInterface\<TArgument, TBag, TResult\>

Defined in: [core/actions/src/models/action.ts:18](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L18)

## Extends

- `Document`

## Type Parameters

### TArgument

`TArgument` = `any`

### TBag

`TBag` = `any`

### TResult

`TResult` = `any`

## Properties

### \_\_v?

> `optional` **\_\_v**: `any`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:26

This documents __v.

#### Inherited from

`mongoose.Document.__v`

***

### \_id?

> `optional` **\_id**: `any`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:23

This documents _id.

#### Inherited from

`mongoose.Document._id`

***

### $locals

> **$locals**: `Record`\<`string`, `unknown`\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:71

Empty object that you can use for storing properties on the document. This
is handy for passing data to middleware without conflicting with Mongoose
internals.

#### Inherited from

`mongoose.Document.$locals`

***

### $op

> **$op**: `"remove"` \| `"save"` \| `"validate"`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:83

A string containing the current operation that Mongoose is executing
on this document. Can be `null`, `'save'`, `'validate'`, or `'remove'`.

#### Inherited from

`mongoose.Document.$op`

***

### $where

> **$where**: `Record`\<`string`, `unknown`\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:98

Set this property to add additional query filters when Mongoose saves this document and `isNew` is false.

#### Inherited from

`mongoose.Document.$where`

***

### actionRef

> **actionRef**: `string`

Defined in: [core/actions/src/models/action.ts:28](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L28)

***

### argument

> **argument**: `TArgument`

Defined in: [core/actions/src/models/action.ts:25](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L25)

***

### bag

> **bag**: `TBag`

Defined in: [core/actions/src/models/action.ts:26](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L26)

***

### baseModelName?

> `optional` **baseModelName**: `string`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:101

If this is a discriminator model, `baseModelName` is the name of the base model.

#### Inherited from

`mongoose.Document.baseModelName`

***

### collection

> **collection**: `Collection`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:104

Collection the model uses.

#### Inherited from

`mongoose.Document.collection`

***

### createdAt

> **createdAt**: `Date`

Defined in: [core/actions/src/models/action.ts:65](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L65)

***

### cronActivity

> **cronActivity**: `object`

Defined in: [core/actions/src/models/action.ts:58](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L58)

#### frequency

> **frequency**: `number`

#### lastActivity

> **lastActivity**: `Date`

#### nextActivity

> **nextActivity**: `Date`

#### pending

> **pending**: `Boolean`

***

### db

> **db**: `Connection`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:107

Connection the model uses.

#### Inherited from

`mongoose.Document.db`

***

### definitionFrom?

> `optional` **definitionFrom**: `object`

Defined in: [core/actions/src/models/action.ts:66](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L66)

#### workflow

> **workflow**: `object`

##### workflow.\_id

> **workflow.\_id**: `string`

##### workflow.marker

> **workflow.marker**: `string`

##### workflow.ref

> **workflow.ref**: `string`

##### workflow.stepIndex

> **workflow.stepIndex**: `number`

##### workflow.stepName

> **workflow.stepName**: `string`

***

### delay

> **delay**: `number`

Defined in: [core/actions/src/models/action.ts:53](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L53)

***

### delays

> **delays**: `object`

Defined in: [core/actions/src/models/action.ts:54](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L54)

#### 1

> **1**: `number`

#### 2

> **2**: `number`

***

### errors?

> `optional` **errors**: `ValidationError`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:142

Returns the current validation errors.

#### Inherited from

`mongoose.Document.errors`

***

### filter

> **filter**: `Object`

Defined in: [core/actions/src/models/action.ts:30](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L30)

***

### generatorCount

> **generatorCount**: `number`

Defined in: [core/actions/src/models/action.ts:41](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L41)

***

### id?

> `optional` **id**: `any`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:154

The string version of this documents _id.

#### Inherited from

`mongoose.Document.id`

***

### identity

> **identity**: `string`

Defined in: [core/actions/src/models/action.ts:29](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L29)

***

### isNew

> **isNew**: `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:185

Boolean flag specifying if the document is new.

#### Inherited from

`mongoose.Document.isNew`

***

### lockAndSave()

> **lockAndSave**: () => `Promise`\<`void`\>

Defined in: [core/actions/src/models/action.ts:77](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L77)

#### Returns

`Promise`\<`void`\>

***

### locked

> **locked**: `Boolean`

Defined in: [core/actions/src/models/action.ts:43](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L43)

***

### lockedAt

> **lockedAt**: `Date`

Defined in: [core/actions/src/models/action.ts:44](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L44)

***

### nExecutions

> **nExecutions**: `object`

Defined in: [core/actions/src/models/action.ts:49](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L49)

#### 4

> **4**: `number`

#### 5

> **5**: `number`

***

### nTimes

> **nTimes**: `number`

Defined in: [core/actions/src/models/action.ts:42](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L42)

***

### optimisticLock()

> **optimisticLock**: () => `Promise`\<`void`\>

Defined in: [core/actions/src/models/action.ts:76](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L76)

#### Returns

`Promise`\<`void`\>

***

### repeat

> **repeat**: `object`

Defined in: [core/actions/src/models/action.ts:45](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L45)

#### 4?

> `optional` **4**: `number`

#### 5?

> `optional` **5**: `number`

***

### result

> **result**: `TResult`

Defined in: [core/actions/src/models/action.ts:27](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L27)

***

### schema

> **schema**: `Schema`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:232

The document's schema.

#### Inherited from

`mongoose.Document.schema`

***

### state

> **state**: [`ActionState`](../enumerations/ActionState.md)

Defined in: [core/actions/src/models/action.ts:23](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L23)

***

### stateUpdatedAt

> **stateUpdatedAt**: `Date`

Defined in: [core/actions/src/models/action.ts:24](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L24)

***

### updatedAt

> **updatedAt**: `Date`

Defined in: [core/actions/src/models/action.ts:64](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L64)

***

### updateNextActivity()

> **updateNextActivity**: () => `void`

Defined in: [core/actions/src/models/action.ts:75](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L75)

#### Returns

`void`

***

### workflowId?

> `optional` **workflowId**: `string`

Defined in: [core/actions/src/models/action.ts:31](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L31)

***

### workflowIdentity?

> `optional` **workflowIdentity**: `string`

Defined in: [core/actions/src/models/action.ts:34](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L34)

***

### workflowRef?

> `optional` **workflowRef**: `string`

Defined in: [core/actions/src/models/action.ts:33](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L33)

***

### workflowStack

> **workflowStack**: `object`[]

Defined in: [core/actions/src/models/action.ts:35](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L35)

#### \_id

> **\_id**: `string`

#### ref

> **ref**: `string`

#### stepIndex

> **stepIndex**: `number`

#### stepName

> **stepName**: `string`

***

### workflowStep?

> `optional` **workflowStep**: `number`

Defined in: [core/actions/src/models/action.ts:32](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/models/action.ts#L32)

## Methods

### $assertPopulated()

> **$assertPopulated**\<`Paths`\>(`path`, `values?`): `Omit`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>, keyof `Paths`\> & `Paths`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:29

Assert that a given path or paths is populated. Throws an error if not populated.

#### Type Parameters

##### Paths

`Paths` = \{ \}

#### Parameters

##### path

`string` | `string`[]

##### values?

`Partial`\<`Paths`\>

#### Returns

`Omit`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>, keyof `Paths`\> & `Paths`

#### Inherited from

`mongoose.Document.$assertPopulated`

***

### $clone()

> **$clone**(): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:32

Returns a deep clone of this document

#### Returns

`this`

#### Inherited from

`mongoose.Document.$clone`

***

### $getAllSubdocs()

> **$getAllSubdocs**(): `Document`\<`any`, `any`, `any`\>[]

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:35

#### Returns

`Document`\<`any`, `any`, `any`\>[]

#### Inherited from

`mongoose.Document.$getAllSubdocs`

***

### $getPopulatedDocs()

> **$getPopulatedDocs**(): `Document`\<`any`, `any`, `any`\>[]

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:47

Returns an array of all populated documents associated with the query

#### Returns

`Document`\<`any`, `any`, `any`\>[]

#### Inherited from

`mongoose.Document.$getPopulatedDocs`

***

### $ignore()

> **$ignore**(`path`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:38

Don't run validation on this path or persist changes to this path.

#### Parameters

##### path

`string`

#### Returns

`void`

#### Inherited from

`mongoose.Document.$ignore`

***

### $inc()

> **$inc**(`path`, `val?`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:54

Increments the numeric value at `path` by the given `val`.
When you call `save()` on this document, Mongoose will send a
`$inc` as opposed to a `$set`.

#### Parameters

##### path

`string` | `string`[]

##### val?

`number`

#### Returns

`this`

#### Inherited from

`mongoose.Document.$inc`

***

### $isDefault()

> **$isDefault**(`path`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:41

Checks if a path is set to its default.

#### Parameters

##### path

`string`

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.$isDefault`

***

### $isDeleted()

> **$isDeleted**(`val?`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:44

Getter/setter, determines whether the document was removed or not.

#### Parameters

##### val?

`boolean`

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.$isDeleted`

***

### $isEmpty()

> **$isEmpty**(`path`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:61

Returns true if the given path is nullish or only contains empty objects.
Useful for determining whether this subdoc will get stripped out by the
[minimize option](/docs/guide.html#minimize).

#### Parameters

##### path

`string`

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.$isEmpty`

***

### $isValid()

> **$isValid**(`path`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:64

Checks if a path is invalid

#### Parameters

##### path

`string`

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.$isValid`

***

### $markValid()

> **$markValid**(`path`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:74

Marks a path as valid, removing existing validation errors.

#### Parameters

##### path

`string`

#### Returns

`void`

#### Inherited from

`mongoose.Document.$markValid`

***

### $model()

> **$model**\<`ModelType`\>(`name`): `ModelType`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:77

Returns the model with the given name on this document's associated connection.

#### Type Parameters

##### ModelType

`ModelType` = `Model`\<`unknown`, \{ \}, \{ \}, \{ \}, `any`\>

#### Parameters

##### name

`string`

#### Returns

`ModelType`

#### Inherited from

`mongoose.Document.$model`

***

### $parent()

> **$parent**(): `Document`\<`any`, `any`, `any`\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:207

If this document is a subdocument or populated document, returns the
document's parent. Returns undefined otherwise.

#### Returns

`Document`\<`any`, `any`, `any`\>

#### Inherited from

`mongoose.Document.$parent`

***

### $session()

> **$session**(`session?`): `ClientSession`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:90

Getter/setter around the session associated with this document. Used to
automatically set `session` if you `save()` a doc that you got from a
query with an associated session.

#### Parameters

##### session?

`ClientSession`

#### Returns

`ClientSession`

#### Inherited from

`mongoose.Document.$session`

***

### $set()

#### Call Signature

> **$set**(`path`, `val`, `type`, `options?`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:93

Alias for `set()`, used internally to avoid conflicts

##### Parameters

###### path

`string`

###### val

`any`

###### type

`any`

###### options?

`DocumentSetOptions`

##### Returns

`this`

##### Inherited from

`mongoose.Document.$set`

#### Call Signature

> **$set**(`path`, `val`, `options?`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:94

Alias for `set()`, used internally to avoid conflicts

##### Parameters

###### path

`string`

###### val

`any`

###### options?

`DocumentSetOptions`

##### Returns

`this`

##### Inherited from

`mongoose.Document.$set`

#### Call Signature

> **$set**(`value`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:95

Alias for `set()`, used internally to avoid conflicts

##### Parameters

###### value

`any`

##### Returns

`this`

##### Inherited from

`mongoose.Document.$set`

***

### delete()

#### Call Signature

> **delete**(`options`, `callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:110

Removes this document from the db.

##### Parameters

###### options

`QueryOptions`

###### callback

`Callback`

##### Returns

`void`

##### Inherited from

`mongoose.Document.delete`

#### Call Signature

> **delete**(`callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:111

Removes this document from the db.

##### Parameters

###### callback

`Callback`

##### Returns

`void`

##### Inherited from

`mongoose.Document.delete`

#### Call Signature

> **delete**(`options?`): `any`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:112

Removes this document from the db.

##### Parameters

###### options?

`QueryOptions`

##### Returns

`any`

##### Inherited from

`mongoose.Document.delete`

***

### deleteOne()

#### Call Signature

> **deleteOne**(`options`, `callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:115

Removes this document from the db.

##### Parameters

###### options

`QueryOptions`

###### callback

`Callback`

##### Returns

`void`

##### Inherited from

`mongoose.Document.deleteOne`

#### Call Signature

> **deleteOne**(`callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:116

Removes this document from the db.

##### Parameters

###### callback

`Callback`

##### Returns

`void`

##### Inherited from

`mongoose.Document.deleteOne`

#### Call Signature

> **deleteOne**(`options?`): `any`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:117

Removes this document from the db.

##### Parameters

###### options?

`QueryOptions`

##### Returns

`any`

##### Inherited from

`mongoose.Document.deleteOne`

***

### depopulate()

> **depopulate**(`path?`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:123

Takes a populated field and returns it to its unpopulated state. If called with
no arguments, then all populated fields are returned to their unpopulated state.

#### Parameters

##### path?

`string` | `string`[]

#### Returns

`this`

#### Inherited from

`mongoose.Document.depopulate`

***

### directModifiedPaths()

> **directModifiedPaths**(): `string`[]

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:130

Returns the list of paths that have been directly modified. A direct
modified path is a path that you explicitly set, whether via `doc.foo = 'bar'`,
`Object.assign(doc, { foo: 'bar' })`, or `doc.set('foo', 'bar')`.

#### Returns

`string`[]

#### Inherited from

`mongoose.Document.directModifiedPaths`

***

### equals()

> **equals**(`doc`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:139

Returns true if this document is equal to another document.

Documents are considered equal when they have matching `_id`s, unless neither
document has an `_id`, in which case this function falls back to using
`deepEqual()`.

#### Parameters

##### doc

`Document`\<`any`\>

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.equals`

***

### get()

> **get**(`path`, `type?`, `options?`): `any`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:145

Returns the value of a path.

#### Parameters

##### path

`string`

##### type?

`any`

##### options?

`any`

#### Returns

`any`

#### Inherited from

`mongoose.Document.get`

***

### getChanges()

> **getChanges**(): `UpdateQuery`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:151

Returns the changes that happened to the document
in the format that will be sent to MongoDB.

#### Returns

`UpdateQuery`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

`mongoose.Document.getChanges`

***

### increment()

> **increment**(): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:157

Signal that we desire an increment of this documents version.

#### Returns

`this`

#### Inherited from

`mongoose.Document.increment`

***

### init()

> **init**(`obj`, `opts?`, `callback?`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:164

Initializes the document without setters or marking anything modified.
Called internally after a document is returned from mongodb. Normally,
you do **not** need to call this function on your own.

#### Parameters

##### obj

`AnyObject`

##### opts?

`AnyObject`

##### callback?

`Callback`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

#### Returns

`this`

#### Inherited from

`mongoose.Document.init`

***

### invalidate()

> **invalidate**(`path`, `errorMsg`, `value?`, `kind?`): `NativeError`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:167

Marks a path as invalid, causing validation to fail.

#### Parameters

##### path

`string`

##### errorMsg

`string` | `NativeError`

##### value?

`any`

##### kind?

`string`

#### Returns

`NativeError`

#### Inherited from

`mongoose.Document.invalidate`

***

### isDirectModified()

> **isDirectModified**(`path`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:170

Returns true if `path` was directly set and modified, else false.

#### Parameters

##### path

`string` | `string`[]

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.isDirectModified`

***

### isDirectSelected()

> **isDirectSelected**(`path`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:173

Checks if `path` was explicitly selected. If no projection, always returns true.

#### Parameters

##### path

`string`

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.isDirectSelected`

***

### isInit()

> **isInit**(`path`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:176

Checks if `path` is in the `init` state, that is, it was set by `Document#init()` and not modified since.

#### Parameters

##### path

`string`

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.isInit`

***

### isModified()

> **isModified**(`path?`, `options?`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:182

Returns true if any of the given paths are modified, else false. If no arguments, returns `true` if any path
in this document is modified.

#### Parameters

##### path?

`string` | `string`[]

##### options?

###### ignoreAtomics?

`boolean`

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.isModified`

***

### isSelected()

> **isSelected**(`path`): `boolean`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:188

Checks if `path` was selected in the source query which initialized this document.

#### Parameters

##### path

`string`

#### Returns

`boolean`

#### Inherited from

`mongoose.Document.isSelected`

***

### markModified()

> **markModified**(`path`, `scope?`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:191

Marks the path as having pending changes to write to the db.

#### Parameters

##### path

`string`

##### scope?

`any`

#### Returns

`void`

#### Inherited from

`mongoose.Document.markModified`

***

### modifiedPaths()

> **modifiedPaths**(`options?`): `string`[]

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:194

Returns the list of paths that have been modified.

#### Parameters

##### options?

###### includeChildren?

`boolean`

#### Returns

`string`[]

#### Inherited from

`mongoose.Document.modifiedPaths`

***

### overwrite()

> **overwrite**(`obj`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:201

Overwrite all values in this document with the values of `obj`, except
for immutable properties. Behaves similarly to `set()`, except for it
unsets all properties that aren't in `obj`.

#### Parameters

##### obj

`AnyObject`

#### Returns

`this`

#### Inherited from

`mongoose.Document.overwrite`

***

### populate()

#### Call Signature

> **populate**\<`Paths`\>(`path`): `Promise`\<`MergeType`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:210

Populates document references.

##### Type Parameters

###### Paths

`Paths` = \{ \}

##### Parameters

###### path

`string` | `PopulateOptions` | (`string` \| `PopulateOptions`)[]

##### Returns

`Promise`\<`MergeType`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

##### Inherited from

`mongoose.Document.populate`

#### Call Signature

> **populate**\<`Paths`\>(`path`, `callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:211

Populates document references.

##### Type Parameters

###### Paths

`Paths` = \{ \}

##### Parameters

###### path

`string` | `PopulateOptions` | (`string` \| `PopulateOptions`)[]

###### callback

`Callback`\<`MergeType`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

##### Returns

`void`

##### Inherited from

`mongoose.Document.populate`

#### Call Signature

> **populate**\<`Paths`\>(`path`, `select?`, `model?`, `match?`, `options?`): `Promise`\<`MergeType`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:212

Populates document references.

##### Type Parameters

###### Paths

`Paths` = \{ \}

##### Parameters

###### path

`string`

###### select?

`string` | `AnyObject`

###### model?

`Model`\<`any`\>

###### match?

`AnyObject`

###### options?

`PopulateOptions`

##### Returns

`Promise`\<`MergeType`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

##### Inherited from

`mongoose.Document.populate`

#### Call Signature

> **populate**\<`Paths`\>(`path`, `select?`, `model?`, `match?`, `options?`, `callback?`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:213

Populates document references.

##### Type Parameters

###### Paths

`Paths` = \{ \}

##### Parameters

###### path

`string`

###### select?

`string` | `AnyObject`

###### model?

`Model`\<`any`\>

###### match?

`AnyObject`

###### options?

`PopulateOptions`

###### callback?

`Callback`\<`MergeType`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

##### Returns

`void`

##### Inherited from

`mongoose.Document.populate`

***

### populated()

> **populated**(`path`): `any`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:216

Gets _id(s) used during population of the given `path`. If the path was not populated, returns `undefined`.

#### Parameters

##### path

`string`

#### Returns

`any`

#### Inherited from

`mongoose.Document.populated`

***

### remove()

#### Call Signature

> **remove**(`options`, `callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:219

Removes this document from the db.

##### Parameters

###### options

`QueryOptions`

###### callback

`Callback`

##### Returns

`void`

##### Inherited from

`mongoose.Document.remove`

#### Call Signature

> **remove**(`callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:220

Removes this document from the db.

##### Parameters

###### callback

`Callback`

##### Returns

`void`

##### Inherited from

`mongoose.Document.remove`

#### Call Signature

> **remove**(`options?`): `Promise`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:221

Removes this document from the db.

##### Parameters

###### options?

`QueryOptions`

##### Returns

`Promise`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

##### Inherited from

`mongoose.Document.remove`

***

### replaceOne()

> **replaceOne**(`replacement?`, `options?`, `callback?`): `Query`\<`any`, `ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:224

Sends a replaceOne command with this document `_id` as the query selector.

#### Parameters

##### replacement?

`AnyObject`

##### options?

`QueryOptions`\<`unknown`\>

##### callback?

`Callback`

#### Returns

`Query`\<`any`, `ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

`mongoose.Document.replaceOne`

***

### save()

#### Call Signature

> **save**(`options`, `callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:227

Saves this document by inserting a new document into the database if [document.isNew](/docs/api/document.html#document_Document-isNew) is `true`, or sends an [updateOne](/docs/api/document.html#document_Document-updateOne) operation with just the modified paths if `isNew` is `false`.

##### Parameters

###### options

`SaveOptions`

###### callback

`Callback`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

##### Returns

`void`

##### Inherited from

`mongoose.Document.save`

#### Call Signature

> **save**(`callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:228

Saves this document by inserting a new document into the database if [document.isNew](/docs/api/document.html#document_Document-isNew) is `true`, or sends an [updateOne](/docs/api/document.html#document_Document-updateOne) operation with just the modified paths if `isNew` is `false`.

##### Parameters

###### callback

`Callback`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

##### Returns

`void`

##### Inherited from

`mongoose.Document.save`

#### Call Signature

> **save**(`options?`): `Promise`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:229

Saves this document by inserting a new document into the database if [document.isNew](/docs/api/document.html#document_Document-isNew) is `true`, or sends an [updateOne](/docs/api/document.html#document_Document-updateOne) operation with just the modified paths if `isNew` is `false`.

##### Parameters

###### options?

`SaveOptions`

##### Returns

`Promise`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

##### Inherited from

`mongoose.Document.save`

***

### set()

#### Call Signature

> **set**(`path`, `val`, `type`, `options?`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:235

Sets the value of a path, or many paths.

##### Parameters

###### path

`string`

###### val

`any`

###### type

`any`

###### options?

`any`

##### Returns

`this`

##### Inherited from

`mongoose.Document.set`

#### Call Signature

> **set**(`path`, `val`, `options?`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:236

Sets the value of a path, or many paths.

##### Parameters

###### path

`string`

###### val

`any`

###### options?

`any`

##### Returns

`this`

##### Inherited from

`mongoose.Document.set`

#### Call Signature

> **set**(`value`): `this`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:237

Sets the value of a path, or many paths.

##### Parameters

###### value

`any`

##### Returns

`this`

##### Inherited from

`mongoose.Document.set`

***

### toJSON()

#### Call Signature

> **toJSON**\<`T`\>(`options?`): `FlattenMaps`\<`T`\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:240

The return value of this method is used in calls to JSON.stringify(doc).

##### Type Parameters

###### T

`T` = `LeanDocument`\<`any`\>

##### Parameters

###### options?

`ToObjectOptions` & `object`

##### Returns

`FlattenMaps`\<`T`\>

##### Inherited from

`mongoose.Document.toJSON`

#### Call Signature

> **toJSON**\<`T`\>(`options`): `T`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:241

The return value of this method is used in calls to JSON.stringify(doc).

##### Type Parameters

###### T

`T` = `LeanDocument`\<`any`\>

##### Parameters

###### options

`ToObjectOptions` & `object`

##### Returns

`T`

##### Inherited from

`mongoose.Document.toJSON`

***

### toObject()

> **toObject**\<`T`\>(`options?`): `Require_id`\<`T`\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:244

Converts this document into a plain-old JavaScript object ([POJO](https://masteringjs.io/tutorials/fundamentals/pojo)).

#### Type Parameters

##### T

`T` = `LeanDocument`\<`any`\>

#### Parameters

##### options?

`ToObjectOptions`

#### Returns

`Require_id`\<`T`\>

#### Inherited from

`mongoose.Document.toObject`

***

### unmarkModified()

> **unmarkModified**(`path`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:247

Clears the modified state on the specified path.

#### Parameters

##### path

`string`

#### Returns

`void`

#### Inherited from

`mongoose.Document.unmarkModified`

***

### update()

> **update**(`update?`, `options?`, `callback?`): `Query`\<`any`, `ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:250

Sends an update command with this document `_id` as the query selector.

#### Parameters

##### update?

`UpdateWithAggregationPipeline` | `UpdateQuery`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

##### options?

`QueryOptions`\<`unknown`\>

##### callback?

`Callback`

#### Returns

`Query`\<`any`, `ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

`mongoose.Document.update`

***

### updateOne()

> **updateOne**(`update?`, `options?`, `callback?`): `Query`\<`any`, `ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:253

Sends an updateOne command with this document `_id` as the query selector.

#### Parameters

##### update?

`UpdateWithAggregationPipeline` | `UpdateQuery`\<`ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

##### options?

`QueryOptions`\<`unknown`\>

##### callback?

`Callback`

#### Returns

`Query`\<`any`, `ActionSchemaInterface`\<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

`mongoose.Document.updateOne`

***

### validate()

#### Call Signature

> **validate**(`pathsToValidate`, `options`, `callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:256

Executes registered validation rules for this document.

##### Parameters

###### pathsToValidate

`PathsToValidate`

###### options

`AnyObject`

###### callback

`CallbackWithoutResult`

##### Returns

`void`

##### Inherited from

`mongoose.Document.validate`

#### Call Signature

> **validate**(`pathsToValidate`, `callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:257

Executes registered validation rules for this document.

##### Parameters

###### pathsToValidate

`PathsToValidate`

###### callback

`CallbackWithoutResult`

##### Returns

`void`

##### Inherited from

`mongoose.Document.validate`

#### Call Signature

> **validate**(`callback`): `void`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:258

Executes registered validation rules for this document.

##### Parameters

###### callback

`CallbackWithoutResult`

##### Returns

`void`

##### Inherited from

`mongoose.Document.validate`

#### Call Signature

> **validate**(`pathsToValidate?`, `options?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:259

Executes registered validation rules for this document.

##### Parameters

###### pathsToValidate?

`PathsToValidate`

###### options?

`AnyObject`

##### Returns

`Promise`\<`void`\>

##### Inherited from

`mongoose.Document.validate`

#### Call Signature

> **validate**(`options`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:260

Executes registered validation rules for this document.

##### Parameters

###### options

###### pathsToSkip?

`pathsToSkip`

##### Returns

`Promise`\<`void`\>

##### Inherited from

`mongoose.Document.validate`

***

### validateSync()

#### Call Signature

> **validateSync**(`options`): `ValidationError`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:263

Executes registered validation rules (skipping asynchronous validators) for this document.

##### Parameters

###### options

###### pathsToSkip?

`pathsToSkip`

##### Returns

`ValidationError`

##### Inherited from

`mongoose.Document.validateSync`

#### Call Signature

> **validateSync**(`pathsToValidate?`, `options?`): `ValidationError`

Defined in: node\_modules/.pnpm/mongoose@6.13.8\_@aws-sdk+client-sso-oidc@3.758.0/node\_modules/mongoose/types/document.d.ts:264

Executes registered validation rules (skipping asynchronous validators) for this document.

##### Parameters

###### pathsToValidate?

`PathsToValidate`

###### options?

`AnyObject`

##### Returns

`ValidationError`

##### Inherited from

`mongoose.Document.validateSync`
