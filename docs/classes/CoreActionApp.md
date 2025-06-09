[@wbce/orbits](../README.md) / [Exports](../modules.md) / CoreActionRuntime

# Class: CoreActionRuntime

## Hierarchy

- [`ActionRuntime`](ActionRuntime.md)

  ↳ **`CoreActionRuntime`**

## Table of contents

### Constructors

- [constructor](CoreActionRuntime.md#constructor)

### Properties

- [ActionModel](CoreActionRuntime.md#actionmodel)
- [actionFilter](CoreActionRuntime.md#actionfilter)
- [db](CoreActionRuntime.md#db)
- [declare](CoreActionRuntime.md#declare)
- [imports](CoreActionRuntime.md#imports)
- [logger](CoreActionRuntime.md#logger)
- [numberOfWorker](CoreActionRuntime.md#numberofworker)
- [activeRuntime](CoreActionRuntime.md#activeruntime)
- [appImportedRegistry](CoreActionRuntime.md#appimportedregistry)
- [bootstrapPath](CoreActionRuntime.md#bootstrappath)
- [rejectBootstrap](CoreActionRuntime.md#rejectbootstrap)
- [resolveBootstrap](CoreActionRuntime.md#resolvebootstrap)
- [waitForActiveRuntime](CoreActionRuntime.md#waitforactiveruntime)

### Accessors

- [boostrapPath](CoreActionRuntime.md#boostrappath)

### Methods

- [bootstrap](CoreActionRuntime.md#bootstrap)
- [getActionFromRegistry](CoreActionRuntime.md#getactionfromregistry)
- [getActionRefFromRegistry](CoreActionRuntime.md#getactionreffromregistry)
- [getActiveRuntime](CoreActionRuntime.md#getactiveruntime)

## Constructors

### constructor

• **new CoreActionRuntime**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ActionRuntimeConfig`](../interfaces/ActionRuntimeConfig.md) |

#### Inherited from

[ActionRuntime](ActionRuntime.md).[constructor](ActionRuntime.md#constructor)

#### Defined in

[src/core/actions/src/app/action-app.ts:76](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L76)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Inherited from

[ActionRuntime](ActionRuntime.md).[ActionModel](ActionRuntime.md#actionmodel)

#### Defined in

[src/core/actions/src/app/action-app.ts:67](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L67)

___

### actionFilter

• `Optional` **actionFilter**: `Object`

Used by ActionCron to
filter actions using their `filter` field

#### Inherited from

[ActionRuntime](ActionRuntime.md).[actionFilter](ActionRuntime.md#actionfilter)

#### Defined in

[src/core/actions/src/app/action-app.ts:59](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L59)

___

### db

• **db**: [`AppDb`](../interfaces/AppDb.md)

#### Inherited from

[ActionRuntime](ActionRuntime.md).[db](ActionRuntime.md#db)

#### Defined in

[src/core/actions/src/app/action-app.ts:61](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L61)

___

### declare

• **declare**: (typeof [`Action`](Action.md) \| typeof [`Workflow`](Workflow.md))[]

#### Overrides

[ActionRuntime](ActionRuntime.md).[declare](ActionRuntime.md#declare)

#### Defined in

[src/core/actions/src/app/action-app.ts:193](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L193)

___

### imports

• **imports**: typeof [`ActionRuntime`](ActionRuntime.md)[] = `[]`

#### Inherited from

[ActionRuntime](ActionRuntime.md).[imports](ActionRuntime.md#imports)

#### Defined in

[src/core/actions/src/app/action-app.ts:50](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L50)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Inherited from

[ActionRuntime](ActionRuntime.md).[logger](ActionRuntime.md#logger)

#### Defined in

[src/core/actions/src/app/action-app.ts:48](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L48)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Inherited from

[ActionRuntime](ActionRuntime.md).[numberOfWorker](ActionRuntime.md#numberofworker)

#### Defined in

[src/core/actions/src/app/action-app.ts:53](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L53)

___

### activeRuntime

▪ `Static` **activeRuntime**: [`ActionRuntime`](ActionRuntime.md)

#### Inherited from

[ActionRuntime](ActionRuntime.md).[activeRuntime](ActionRuntime.md#activeruntime)

#### Defined in

[src/core/actions/src/app/action-app.ts:33](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L33)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Inherited from

[ActionRuntime](ActionRuntime.md).[appImportedRegistry](ActionRuntime.md#appimportedregistry)

#### Defined in

[src/core/actions/src/app/action-app.ts:35](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L35)

___

### bootstrapPath

▪ `Static` **bootstrapPath**: `string`

#### Inherited from

[ActionRuntime](ActionRuntime.md).[bootstrapPath](ActionRuntime.md#bootstrappath)

#### Defined in

[src/core/actions/src/app/action-app.ts:43](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L43)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Inherited from

[ActionRuntime](ActionRuntime.md).[rejectBootstrap](ActionRuntime.md#rejectbootstrap)

#### Defined in

[src/core/actions/src/app/action-app.ts:38](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L38)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Inherited from

[ActionRuntime](ActionRuntime.md).[resolveBootstrap](ActionRuntime.md#resolvebootstrap)

#### Defined in

[src/core/actions/src/app/action-app.ts:37](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L37)

___

### waitForActiveRuntime

▪ `Static` **waitForActiveRuntime**: `Promise`<`unknown`\>

#### Inherited from

[ActionRuntime](ActionRuntime.md).[waitForActiveRuntime](ActionRuntime.md#waitforactiveruntime)

#### Defined in

[src/core/actions/src/app/action-app.ts:39](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L39)

## Accessors

### boostrapPath

• `Static` `get` **boostrapPath**(): `string`

**`Deprecated`**

use bootstrapPath

#### Returns

`string`

#### Inherited from

ActionRuntime.boostrapPath

#### Defined in

[src/core/actions/src/app/action-app.ts:72](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L72)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[ActionRuntime](ActionRuntime.md).[bootstrap](ActionRuntime.md#bootstrap)

#### Defined in

[src/core/actions/src/app/action-app.ts:112](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L112)

___

### getActionFromRegistry

▸ **getActionFromRegistry**(`actionRef`): typeof [`Action`](Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionRef` | `string` |

#### Returns

typeof [`Action`](Action.md)

#### Inherited from

[ActionRuntime](ActionRuntime.md).[getActionFromRegistry](ActionRuntime.md#getactionfromregistry)

#### Defined in

[src/core/actions/src/app/action-app.ts:104](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L104)

___

### getActionRefFromRegistry

▸ **getActionRefFromRegistry**(`action`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | typeof [`Action`](Action.md) |

#### Returns

`string`

#### Inherited from

[ActionRuntime](ActionRuntime.md).[getActionRefFromRegistry](ActionRuntime.md#getactionreffromregistry)

#### Defined in

[src/core/actions/src/app/action-app.ts:108](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L108)

___

### getActiveRuntime

▸ `Static` **getActiveRuntime**(): [`ActionRuntime`](ActionRuntime.md)

#### Returns

[`ActionRuntime`](ActionRuntime.md)

#### Inherited from

[ActionRuntime](ActionRuntime.md).[getActiveRuntime](ActionRuntime.md#getactiveruntime)

#### Defined in

[src/core/actions/src/app/action-app.ts:144](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L144)
