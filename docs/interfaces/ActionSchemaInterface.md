[@wbce/orbits](../README.md) / [Exports](../modules.md) / ActionSchemaInterface

# Interface: ActionSchemaInterface<TArgument, TBag, TResult\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TArgument` | `any` |
| `TBag` | `any` |
| `TResult` | `any` |

## Hierarchy

- `Document`

  ↳ **`ActionSchemaInterface`**

## Table of contents

### Properties

- [$locals](ActionSchemaInterface.md#$locals)
- [$op](ActionSchemaInterface.md#$op)
- [$where](ActionSchemaInterface.md#$where)
- [\_\_v](ActionSchemaInterface.md#__v)
- [\_id](ActionSchemaInterface.md#_id)
- [actionRef](ActionSchemaInterface.md#actionref)
- [argument](ActionSchemaInterface.md#argument)
- [bag](ActionSchemaInterface.md#bag)
- [baseModelName](ActionSchemaInterface.md#basemodelname)
- [collection](ActionSchemaInterface.md#collection)
- [createdAt](ActionSchemaInterface.md#createdat)
- [cronActivity](ActionSchemaInterface.md#cronactivity)
- [db](ActionSchemaInterface.md#db)
- [delay](ActionSchemaInterface.md#delay)
- [delays](ActionSchemaInterface.md#delays)
- [errors](ActionSchemaInterface.md#errors)
- [filter](ActionSchemaInterface.md#filter)
- [id](ActionSchemaInterface.md#id)
- [isNew](ActionSchemaInterface.md#isnew)
- [lockAndSave](ActionSchemaInterface.md#lockandsave)
- [locked](ActionSchemaInterface.md#locked)
- [lockedAt](ActionSchemaInterface.md#lockedat)
- [nExecutions](ActionSchemaInterface.md#nexecutions)
- [nTimes](ActionSchemaInterface.md#ntimes)
- [optimisticLock](ActionSchemaInterface.md#optimisticlock)
- [repeat](ActionSchemaInterface.md#repeat)
- [result](ActionSchemaInterface.md#result)
- [schema](ActionSchemaInterface.md#schema)
- [state](ActionSchemaInterface.md#state)
- [stateUpdatedAt](ActionSchemaInterface.md#stateupdatedat)
- [workflowId](ActionSchemaInterface.md#workflowid)
- [workflowStep](ActionSchemaInterface.md#workflowstep)
- [updateNextActivity](ActionSchemaInterface.md#updatenextactivity)
- [updatedAt](ActionSchemaInterface.md#updatedat)

### Methods

- [$assertPopulated](ActionSchemaInterface.md#$assertpopulated)
- [$clone](ActionSchemaInterface.md#$clone)
- [$getAllSubdocs](ActionSchemaInterface.md#$getallsubdocs)
- [$getPopulatedDocs](ActionSchemaInterface.md#$getpopulateddocs)
- [$ignore](ActionSchemaInterface.md#$ignore)
- [$inc](ActionSchemaInterface.md#$inc)
- [$isDefault](ActionSchemaInterface.md#$isdefault)
- [$isDeleted](ActionSchemaInterface.md#$isdeleted)
- [$isEmpty](ActionSchemaInterface.md#$isempty)
- [$isValid](ActionSchemaInterface.md#$isvalid)
- [$markValid](ActionSchemaInterface.md#$markvalid)
- [$model](ActionSchemaInterface.md#$model)
- [$parent](ActionSchemaInterface.md#$parent)
- [$session](ActionSchemaInterface.md#$session)
- [$set](ActionSchemaInterface.md#$set)
- [delete](ActionSchemaInterface.md#delete)
- [deleteOne](ActionSchemaInterface.md#deleteone)
- [depopulate](ActionSchemaInterface.md#depopulate)
- [directModifiedPaths](ActionSchemaInterface.md#directmodifiedpaths)
- [equals](ActionSchemaInterface.md#equals)
- [get](ActionSchemaInterface.md#get)
- [getChanges](ActionSchemaInterface.md#getchanges)
- [increment](ActionSchemaInterface.md#increment)
- [init](ActionSchemaInterface.md#init)
- [invalidate](ActionSchemaInterface.md#invalidate)
- [isDirectModified](ActionSchemaInterface.md#isdirectmodified)
- [isDirectSelected](ActionSchemaInterface.md#isdirectselected)
- [isInit](ActionSchemaInterface.md#isinit)
- [isModified](ActionSchemaInterface.md#ismodified)
- [isSelected](ActionSchemaInterface.md#isselected)
- [markModified](ActionSchemaInterface.md#markmodified)
- [modifiedPaths](ActionSchemaInterface.md#modifiedpaths)
- [overwrite](ActionSchemaInterface.md#overwrite)
- [populate](ActionSchemaInterface.md#populate)
- [populated](ActionSchemaInterface.md#populated)
- [remove](ActionSchemaInterface.md#remove)
- [replaceOne](ActionSchemaInterface.md#replaceone)
- [save](ActionSchemaInterface.md#save)
- [set](ActionSchemaInterface.md#set)
- [toJSON](ActionSchemaInterface.md#tojson)
- [toObject](ActionSchemaInterface.md#toobject)
- [unmarkModified](ActionSchemaInterface.md#unmarkmodified)
- [update](ActionSchemaInterface.md#update)
- [updateOne](ActionSchemaInterface.md#updateone)
- [validate](ActionSchemaInterface.md#validate)
- [validateSync](ActionSchemaInterface.md#validatesync)

## Properties

### $locals

• **$locals**: `Record`<`string`, `unknown`\>

Empty object that you can use for storing properties on the document. This
is handy for passing data to middleware without conflicting with Mongoose
internals.

#### Inherited from

mongoose.Document.$locals

#### Defined in

node_modules/mongoose/types/document.d.ts:71

___

### $op

• **$op**: ``"remove"`` \| ``"save"`` \| ``"validate"``

A string containing the current operation that Mongoose is executing
on this document. Can be `null`, `'save'`, `'validate'`, or `'remove'`.

#### Inherited from

mongoose.Document.$op

#### Defined in

node_modules/mongoose/types/document.d.ts:83

___

### $where

• **$where**: `Record`<`string`, `unknown`\>

Set this property to add additional query filters when Mongoose saves this document and `isNew` is false.

#### Inherited from

mongoose.Document.$where

#### Defined in

node_modules/mongoose/types/document.d.ts:98

___

### \_\_v

• `Optional` **\_\_v**: `any`

This documents __v.

#### Inherited from

mongoose.Document.\_\_v

#### Defined in

node_modules/mongoose/types/document.d.ts:26

___

### \_id

• `Optional` **\_id**: `any`

This documents _id.

#### Inherited from

mongoose.Document.\_id

#### Defined in

node_modules/mongoose/types/document.d.ts:23

___

### actionRef

• **actionRef**: `string`

#### Defined in

[src/models/action.ts:25](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L25)

___

### argument

• **argument**: `TArgument`

#### Defined in

[src/models/action.ts:22](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L22)

___

### bag

• **bag**: `TBag`

#### Defined in

[src/models/action.ts:23](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L23)

___

### baseModelName

• `Optional` **baseModelName**: `string`

If this is a discriminator model, `baseModelName` is the name of the base model.

#### Inherited from

mongoose.Document.baseModelName

#### Defined in

node_modules/mongoose/types/document.d.ts:101

___

### collection

• **collection**: `Collection`<`Document`\>

Collection the model uses.

#### Inherited from

mongoose.Document.collection

#### Defined in

node_modules/mongoose/types/document.d.ts:104

___

### createdAt

• **createdAt**: `Date`

#### Defined in

[src/models/action.ts:52](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L52)

___

### cronActivity

• **cronActivity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `frequence` | `number` |
| `lastActivity` | `Date` |
| `nextActivity` | `Date` |
| `pending` | `Boolean` |

#### Defined in

[src/models/action.ts:45](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L45)

___

### db

• **db**: `Connection`

Connection the model uses.

#### Inherited from

mongoose.Document.db

#### Defined in

node_modules/mongoose/types/document.d.ts:107

___

### delay

• **delay**: `number`

#### Defined in

[src/models/action.ts:40](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L40)

___

### delays

• **delays**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `1` | `number` |
| `2` | `number` |

#### Defined in

[src/models/action.ts:41](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L41)

___

### errors

• `Optional` **errors**: `ValidationError`

Returns the current validation errors.

#### Inherited from

mongoose.Document.errors

#### Defined in

node_modules/mongoose/types/document.d.ts:142

___

### filter

• **filter**: `Object`

#### Defined in

[src/models/action.ts:26](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L26)

___

### id

• `Optional` **id**: `any`

The string version of this documents _id.

#### Inherited from

mongoose.Document.id

#### Defined in

node_modules/mongoose/types/document.d.ts:154

___

### isNew

• **isNew**: `boolean`

Boolean flag specifying if the document is new.

#### Inherited from

mongoose.Document.isNew

#### Defined in

node_modules/mongoose/types/document.d.ts:185

___

### lockAndSave

• **lockAndSave**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[src/models/action.ts:55](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L55)

___

### locked

• **locked**: `Boolean`

#### Defined in

[src/models/action.ts:30](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L30)

___

### lockedAt

• **lockedAt**: `Date`

#### Defined in

[src/models/action.ts:31](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L31)

___

### nExecutions

• **nExecutions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `4` | `number` |
| `5` | `number` |

#### Defined in

[src/models/action.ts:36](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L36)

___

### nTimes

• **nTimes**: `number`

#### Defined in

[src/models/action.ts:29](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L29)

___

### optimisticLock

• **optimisticLock**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[src/models/action.ts:54](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L54)

___

### repeat

• **repeat**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `4?` | `number` |
| `5?` | `number` |

#### Defined in

[src/models/action.ts:32](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L32)

___

### result

• **result**: `TResult`

#### Defined in

[src/models/action.ts:24](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L24)

___

### schema

• **schema**: `Schema`<`any`, `Model`<`any`, `any`, `any`, `any`, `any`\>, {}, {}, {}, {}, `DefaultSchemaOptions`, {}\>

The document's schema.

#### Inherited from

mongoose.Document.schema

#### Defined in

node_modules/mongoose/types/document.d.ts:232

___

### state

• **state**: [`ActionState`](../enums/ActionState.md)

#### Defined in

[src/models/action.ts:20](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L20)

___

### stateUpdatedAt

• **stateUpdatedAt**: `Date`

#### Defined in

[src/models/action.ts:21](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L21)

___

### workflowId

• `Optional` **workflowId**: `string`

#### Defined in

[src/models/action.ts:27](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L27)

___

### workflowStep

• `Optional` **workflowStep**: `number`

#### Defined in

[src/models/action.ts:28](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L28)

___

### updateNextActivity

• **updateNextActivity**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/models/action.ts:53](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L53)

___

### updatedAt

• **updatedAt**: `Date`

#### Defined in

[src/models/action.ts:51](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/models/action.ts#L51)

## Methods

### $assertPopulated

▸ **$assertPopulated**<`Paths`\>(`path`, `values?`): `Omit`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, keyof `Paths`\> & `Paths`

Assert that a given path or paths is populated. Throws an error if not populated.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Paths` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` \| `string`[] |
| `values?` | `Partial`<`Paths`\> |

#### Returns

`Omit`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, keyof `Paths`\> & `Paths`

#### Inherited from

mongoose.Document.$assertPopulated

#### Defined in

node_modules/mongoose/types/document.d.ts:29

___

### $clone

▸ **$clone**(): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

Returns a deep clone of this document

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.$clone

#### Defined in

node_modules/mongoose/types/document.d.ts:32

___

### $getAllSubdocs

▸ **$getAllSubdocs**(): `Document`<`any`, `any`, `any`\>[]

#### Returns

`Document`<`any`, `any`, `any`\>[]

#### Inherited from

mongoose.Document.$getAllSubdocs

#### Defined in

node_modules/mongoose/types/document.d.ts:35

___

### $getPopulatedDocs

▸ **$getPopulatedDocs**(): `Document`<`any`, `any`, `any`\>[]

Returns an array of all populated documents associated with the query

#### Returns

`Document`<`any`, `any`, `any`\>[]

#### Inherited from

mongoose.Document.$getPopulatedDocs

#### Defined in

node_modules/mongoose/types/document.d.ts:47

___

### $ignore

▸ **$ignore**(`path`): `void`

Don't run validation on this path or persist changes to this path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`void`

#### Inherited from

mongoose.Document.$ignore

#### Defined in

node_modules/mongoose/types/document.d.ts:38

___

### $inc

▸ **$inc**(`path`, `val?`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

Increments the numeric value at `path` by the given `val`.
When you call `save()` on this document, Mongoose will send a
`$inc` as opposed to a `$set`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` \| `string`[] |
| `val?` | `number` |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.$inc

#### Defined in

node_modules/mongoose/types/document.d.ts:54

___

### $isDefault

▸ **$isDefault**(`path`): `boolean`

Checks if a path is set to its default.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.$isDefault

#### Defined in

node_modules/mongoose/types/document.d.ts:41

___

### $isDeleted

▸ **$isDeleted**(`val?`): `boolean`

Getter/setter, determines whether the document was removed or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `val?` | `boolean` |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.$isDeleted

#### Defined in

node_modules/mongoose/types/document.d.ts:44

___

### $isEmpty

▸ **$isEmpty**(`path`): `boolean`

Returns true if the given path is nullish or only contains empty objects.
Useful for determining whether this subdoc will get stripped out by the
[minimize option](/docs/guide.html#minimize).

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.$isEmpty

#### Defined in

node_modules/mongoose/types/document.d.ts:61

___

### $isValid

▸ **$isValid**(`path`): `boolean`

Checks if a path is invalid

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.$isValid

#### Defined in

node_modules/mongoose/types/document.d.ts:64

___

### $markValid

▸ **$markValid**(`path`): `void`

Marks a path as valid, removing existing validation errors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`void`

#### Inherited from

mongoose.Document.$markValid

#### Defined in

node_modules/mongoose/types/document.d.ts:74

___

### $model

▸ **$model**<`ModelType`\>(`name`): `ModelType`

Returns the model with the given name on this document's associated connection.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelType` | `Model`<`unknown`, {}, {}, {}, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`ModelType`

#### Inherited from

mongoose.Document.$model

#### Defined in

node_modules/mongoose/types/document.d.ts:77

___

### $parent

▸ **$parent**(): `Document`<`any`, `any`, `any`\>

If this document is a subdocument or populated document, returns the
document's parent. Returns undefined otherwise.

#### Returns

`Document`<`any`, `any`, `any`\>

#### Inherited from

mongoose.Document.$parent

#### Defined in

node_modules/mongoose/types/document.d.ts:207

___

### $session

▸ **$session**(`session?`): `ClientSession`

Getter/setter around the session associated with this document. Used to
automatically set `session` if you `save()` a doc that you got from a
query with an associated session.

#### Parameters

| Name | Type |
| :------ | :------ |
| `session?` | `ClientSession` |

#### Returns

`ClientSession`

#### Inherited from

mongoose.Document.$session

#### Defined in

node_modules/mongoose/types/document.d.ts:90

___

### $set

▸ **$set**(`path`, `val`, `type`, `options?`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

Alias for `set()`, used internally to avoid conflicts

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `val` | `any` |
| `type` | `any` |
| `options?` | `DocumentSetOptions` |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.$set

#### Defined in

node_modules/mongoose/types/document.d.ts:93

▸ **$set**(`path`, `val`, `options?`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `val` | `any` |
| `options?` | `DocumentSetOptions` |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.$set

#### Defined in

node_modules/mongoose/types/document.d.ts:94

▸ **$set**(`value`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.$set

#### Defined in

node_modules/mongoose/types/document.d.ts:95

___

### delete

▸ **delete**(`options`, `callback`): `void`

Removes this document from the db.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `QueryOptions`<`unknown`\> |
| `callback` | `Callback`<`any`\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.delete

#### Defined in

node_modules/mongoose/types/document.d.ts:110

▸ **delete**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Callback`<`any`\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.delete

#### Defined in

node_modules/mongoose/types/document.d.ts:111

▸ **delete**(`options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `QueryOptions`<`unknown`\> |

#### Returns

`any`

#### Inherited from

mongoose.Document.delete

#### Defined in

node_modules/mongoose/types/document.d.ts:112

___

### deleteOne

▸ **deleteOne**(`options`, `callback`): `void`

Removes this document from the db.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `QueryOptions`<`unknown`\> |
| `callback` | `Callback`<`any`\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.deleteOne

#### Defined in

node_modules/mongoose/types/document.d.ts:115

▸ **deleteOne**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Callback`<`any`\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.deleteOne

#### Defined in

node_modules/mongoose/types/document.d.ts:116

▸ **deleteOne**(`options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `QueryOptions`<`unknown`\> |

#### Returns

`any`

#### Inherited from

mongoose.Document.deleteOne

#### Defined in

node_modules/mongoose/types/document.d.ts:117

___

### depopulate

▸ **depopulate**(`path?`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

Takes a populated field and returns it to its unpopulated state. If called with
no arguments, then all populated fields are returned to their unpopulated state.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path?` | `string` \| `string`[] |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.depopulate

#### Defined in

node_modules/mongoose/types/document.d.ts:123

___

### directModifiedPaths

▸ **directModifiedPaths**(): `string`[]

Returns the list of paths that have been directly modified. A direct
modified path is a path that you explicitly set, whether via `doc.foo = 'bar'`,
`Object.assign(doc, { foo: 'bar' })`, or `doc.set('foo', 'bar')`.

#### Returns

`string`[]

#### Inherited from

mongoose.Document.directModifiedPaths

#### Defined in

node_modules/mongoose/types/document.d.ts:130

___

### equals

▸ **equals**(`doc`): `boolean`

Returns true if this document is equal to another document.

Documents are considered equal when they have matching `_id`s, unless neither
document has an `_id`, in which case this function falls back to using
`deepEqual()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `Document`<`any`, `any`, `any`\> |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.equals

#### Defined in

node_modules/mongoose/types/document.d.ts:139

___

### get

▸ **get**(`path`, `type?`, `options?`): `any`

Returns the value of a path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `type?` | `any` |
| `options?` | `any` |

#### Returns

`any`

#### Inherited from

mongoose.Document.get

#### Defined in

node_modules/mongoose/types/document.d.ts:145

___

### getChanges

▸ **getChanges**(): `UpdateQuery`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

Returns the changes that happened to the document
in the format that will be sent to MongoDB.

#### Returns

`UpdateQuery`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

mongoose.Document.getChanges

#### Defined in

node_modules/mongoose/types/document.d.ts:151

___

### increment

▸ **increment**(): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

Signal that we desire an increment of this documents version.

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.increment

#### Defined in

node_modules/mongoose/types/document.d.ts:157

___

### init

▸ **init**(`obj`, `opts?`, `callback?`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

Initializes the document without setters or marking anything modified.
Called internally after a document is returned from mongodb. Normally,
you do **not** need to call this function on your own.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `AnyObject` |
| `opts?` | `AnyObject` |
| `callback?` | `Callback`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\> |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.init

#### Defined in

node_modules/mongoose/types/document.d.ts:164

___

### invalidate

▸ **invalidate**(`path`, `errorMsg`, `value?`, `kind?`): `NativeError`

Marks a path as invalid, causing validation to fail.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `errorMsg` | `string` \| `NativeError` |
| `value?` | `any` |
| `kind?` | `string` |

#### Returns

`NativeError`

#### Inherited from

mongoose.Document.invalidate

#### Defined in

node_modules/mongoose/types/document.d.ts:167

___

### isDirectModified

▸ **isDirectModified**(`path`): `boolean`

Returns true if `path` was directly set and modified, else false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` \| `string`[] |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.isDirectModified

#### Defined in

node_modules/mongoose/types/document.d.ts:170

___

### isDirectSelected

▸ **isDirectSelected**(`path`): `boolean`

Checks if `path` was explicitly selected. If no projection, always returns true.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.isDirectSelected

#### Defined in

node_modules/mongoose/types/document.d.ts:173

___

### isInit

▸ **isInit**(`path`): `boolean`

Checks if `path` is in the `init` state, that is, it was set by `Document#init()` and not modified since.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.isInit

#### Defined in

node_modules/mongoose/types/document.d.ts:176

___

### isModified

▸ **isModified**(`path?`): `boolean`

Returns true if any of the given paths are modified, else false. If no arguments, returns `true` if any path
in this document is modified.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path?` | `string` \| `string`[] |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.isModified

#### Defined in

node_modules/mongoose/types/document.d.ts:182

___

### isSelected

▸ **isSelected**(`path`): `boolean`

Checks if `path` was selected in the source query which initialized this document.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Inherited from

mongoose.Document.isSelected

#### Defined in

node_modules/mongoose/types/document.d.ts:188

___

### markModified

▸ **markModified**(`path`, `scope?`): `void`

Marks the path as having pending changes to write to the db.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `scope?` | `any` |

#### Returns

`void`

#### Inherited from

mongoose.Document.markModified

#### Defined in

node_modules/mongoose/types/document.d.ts:191

___

### modifiedPaths

▸ **modifiedPaths**(`options?`): `string`[]

Returns the list of paths that have been modified.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.includeChildren?` | `boolean` |

#### Returns

`string`[]

#### Inherited from

mongoose.Document.modifiedPaths

#### Defined in

node_modules/mongoose/types/document.d.ts:194

___

### overwrite

▸ **overwrite**(`obj`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

Overwrite all values in this document with the values of `obj`, except
for immutable properties. Behaves similarly to `set()`, except for it
unsets all properties that aren't in `obj`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `AnyObject` |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.overwrite

#### Defined in

node_modules/mongoose/types/document.d.ts:201

___

### populate

▸ **populate**<`Paths`\>(`path`): `Promise`<`MergeType`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

Populates document references.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Paths` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` \| `PopulateOptions` \| (`string` \| `PopulateOptions`)[] |

#### Returns

`Promise`<`MergeType`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

#### Inherited from

mongoose.Document.populate

#### Defined in

node_modules/mongoose/types/document.d.ts:210

▸ **populate**<`Paths`\>(`path`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Paths` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` \| `PopulateOptions` \| (`string` \| `PopulateOptions`)[] |
| `callback` | `Callback`<`MergeType`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.populate

#### Defined in

node_modules/mongoose/types/document.d.ts:211

▸ **populate**<`Paths`\>(`path`, `select?`, `model?`, `match?`, `options?`): `Promise`<`MergeType`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Paths` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `select?` | `string` \| `AnyObject` |
| `model?` | `Model`<`any`, {}, {}, {}, `any`\> |
| `match?` | `AnyObject` |
| `options?` | `PopulateOptions` |

#### Returns

`Promise`<`MergeType`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\>

#### Inherited from

mongoose.Document.populate

#### Defined in

node_modules/mongoose/types/document.d.ts:212

▸ **populate**<`Paths`\>(`path`, `select?`, `model?`, `match?`, `options?`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Paths` | {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `select?` | `string` \| `AnyObject` |
| `model?` | `Model`<`any`, {}, {}, {}, `any`\> |
| `match?` | `AnyObject` |
| `options?` | `PopulateOptions` |
| `callback?` | `Callback`<`MergeType`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, `Paths`\>\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.populate

#### Defined in

node_modules/mongoose/types/document.d.ts:213

___

### populated

▸ **populated**(`path`): `any`

Gets _id(s) used during population of the given `path`. If the path was not populated, returns `undefined`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`any`

#### Inherited from

mongoose.Document.populated

#### Defined in

node_modules/mongoose/types/document.d.ts:216

___

### remove

▸ **remove**(`options`, `callback`): `void`

Removes this document from the db.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `QueryOptions`<`unknown`\> |
| `callback` | `Callback`<`any`\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.remove

#### Defined in

node_modules/mongoose/types/document.d.ts:219

▸ **remove**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Callback`<`any`\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.remove

#### Defined in

node_modules/mongoose/types/document.d.ts:220

▸ **remove**(`options?`): `Promise`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `QueryOptions`<`unknown`\> |

#### Returns

`Promise`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

mongoose.Document.remove

#### Defined in

node_modules/mongoose/types/document.d.ts:221

___

### replaceOne

▸ **replaceOne**(`replacement?`, `options?`, `callback?`): `Query`<`any`, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, {}, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

Sends a replaceOne command with this document `_id` as the query selector.

#### Parameters

| Name | Type |
| :------ | :------ |
| `replacement?` | `AnyObject` |
| `options?` | `QueryOptions`<`unknown`\> |
| `callback?` | `Callback`<`any`\> |

#### Returns

`Query`<`any`, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, {}, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

mongoose.Document.replaceOne

#### Defined in

node_modules/mongoose/types/document.d.ts:224

___

### save

▸ **save**(`options`, `callback`): `void`

Saves this document by inserting a new document into the database if [document.isNew](/docs/api/document.html#document_Document-isNew) is `true`, or sends an [updateOne](/docs/api/document.html#document_Document-updateOne) operation with just the modified paths if `isNew` is `false`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `SaveOptions` |
| `callback` | `Callback`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.save

#### Defined in

node_modules/mongoose/types/document.d.ts:227

▸ **save**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Callback`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\> |

#### Returns

`void`

#### Inherited from

mongoose.Document.save

#### Defined in

node_modules/mongoose/types/document.d.ts:228

▸ **save**(`options?`): `Promise`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `SaveOptions` |

#### Returns

`Promise`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

mongoose.Document.save

#### Defined in

node_modules/mongoose/types/document.d.ts:229

___

### set

▸ **set**(`path`, `val`, `type`, `options?`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

Sets the value of a path, or many paths.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `val` | `any` |
| `type` | `any` |
| `options?` | `any` |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.set

#### Defined in

node_modules/mongoose/types/document.d.ts:235

▸ **set**(`path`, `val`, `options?`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `val` | `any` |
| `options?` | `any` |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.set

#### Defined in

node_modules/mongoose/types/document.d.ts:236

▸ **set**(`value`): [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>

#### Inherited from

mongoose.Document.set

#### Defined in

node_modules/mongoose/types/document.d.ts:237

___

### toJSON

▸ **toJSON**<`T`\>(`options?`): `FlattenMaps`<`T`\>

The return value of this method is used in calls to JSON.stringify(doc).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `LeanDocument`<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ToObjectOptions` & { `flattenMaps?`: ``true``  } |

#### Returns

`FlattenMaps`<`T`\>

#### Inherited from

mongoose.Document.toJSON

#### Defined in

node_modules/mongoose/types/document.d.ts:240

▸ **toJSON**<`T`\>(`options`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `LeanDocument`<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ToObjectOptions` & { `flattenMaps`: ``false``  } |

#### Returns

`T`

#### Inherited from

mongoose.Document.toJSON

#### Defined in

node_modules/mongoose/types/document.d.ts:241

___

### toObject

▸ **toObject**<`T`\>(`options?`): `Require_id`<`T`\>

Converts this document into a plain-old JavaScript object ([POJO](https://masteringjs.io/tutorials/fundamentals/pojo)).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `LeanDocument`<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ToObjectOptions` |

#### Returns

`Require_id`<`T`\>

#### Inherited from

mongoose.Document.toObject

#### Defined in

node_modules/mongoose/types/document.d.ts:244

___

### unmarkModified

▸ **unmarkModified**(`path`): `void`

Clears the modified state on the specified path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`void`

#### Inherited from

mongoose.Document.unmarkModified

#### Defined in

node_modules/mongoose/types/document.d.ts:247

___

### update

▸ **update**(`update?`, `options?`, `callback?`): `Query`<`any`, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, {}, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

Sends an update command with this document `_id` as the query selector.

#### Parameters

| Name | Type |
| :------ | :------ |
| `update?` | `UpdateWithAggregationPipeline` \| `UpdateQuery`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\> |
| `options?` | `QueryOptions`<`unknown`\> |
| `callback?` | `Callback`<`any`\> |

#### Returns

`Query`<`any`, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, {}, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

mongoose.Document.update

#### Defined in

node_modules/mongoose/types/document.d.ts:250

___

### updateOne

▸ **updateOne**(`update?`, `options?`, `callback?`): `Query`<`any`, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, {}, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

Sends an updateOne command with this document `_id` as the query selector.

#### Parameters

| Name | Type |
| :------ | :------ |
| `update?` | `UpdateWithAggregationPipeline` \| `UpdateQuery`<[`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\> |
| `options?` | `QueryOptions`<`unknown`\> |
| `callback?` | `Callback`<`any`\> |

#### Returns

`Query`<`any`, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>, {}, [`ActionSchemaInterface`](ActionSchemaInterface.md)<`TArgument`, `TBag`, `TResult`\>\>

#### Inherited from

mongoose.Document.updateOne

#### Defined in

node_modules/mongoose/types/document.d.ts:253

___

### validate

▸ **validate**(`pathsToValidate`, `options`, `callback`): `void`

Executes registered validation rules for this document.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathsToValidate` | `PathsToValidate` |
| `options` | `AnyObject` |
| `callback` | `CallbackWithoutResult` |

#### Returns

`void`

#### Inherited from

mongoose.Document.validate

#### Defined in

node_modules/mongoose/types/document.d.ts:256

▸ **validate**(`pathsToValidate`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathsToValidate` | `PathsToValidate` |
| `callback` | `CallbackWithoutResult` |

#### Returns

`void`

#### Inherited from

mongoose.Document.validate

#### Defined in

node_modules/mongoose/types/document.d.ts:257

▸ **validate**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithoutResult` |

#### Returns

`void`

#### Inherited from

mongoose.Document.validate

#### Defined in

node_modules/mongoose/types/document.d.ts:258

▸ **validate**(`pathsToValidate?`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathsToValidate?` | `PathsToValidate` |
| `options?` | `AnyObject` |

#### Returns

`Promise`<`void`\>

#### Inherited from

mongoose.Document.validate

#### Defined in

node_modules/mongoose/types/document.d.ts:259

▸ **validate**(`options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.pathsToSkip?` | `pathsToSkip` |

#### Returns

`Promise`<`void`\>

#### Inherited from

mongoose.Document.validate

#### Defined in

node_modules/mongoose/types/document.d.ts:260

___

### validateSync

▸ **validateSync**(`options`): `ValidationError`

Executes registered validation rules (skipping asynchronous validators) for this document.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.pathsToSkip?` | `pathsToSkip` |

#### Returns

`ValidationError`

#### Inherited from

mongoose.Document.validateSync

#### Defined in

node_modules/mongoose/types/document.d.ts:263

▸ **validateSync**(`pathsToValidate?`, `options?`): `ValidationError`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathsToValidate?` | `PathsToValidate` |
| `options?` | `AnyObject` |

#### Returns

`ValidationError`

#### Inherited from

mongoose.Document.validateSync

#### Defined in

node_modules/mongoose/types/document.d.ts:264
