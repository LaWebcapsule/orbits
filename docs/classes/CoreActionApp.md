[@wbce/orbits](../README.md) / [Exports](../modules.md) / CoreActionApp

# Class: CoreActionApp

## Hierarchy

- [`ActionApp`](ActionApp.md)

  ↳ **`CoreActionApp`**

## Table of contents

### Constructors

- [constructor](CoreActionApp.md#constructor)

### Properties

- [ActionModel](CoreActionApp.md#actionmodel)
- [actionFilter](CoreActionApp.md#actionfilter)
- [db](CoreActionApp.md#db)
- [declare](CoreActionApp.md#declare)
- [imports](CoreActionApp.md#imports)
- [logger](CoreActionApp.md#logger)
- [numberOfWorker](CoreActionApp.md#numberofworker)
- [activeApp](CoreActionApp.md#activeapp)
- [appImportedRegistry](CoreActionApp.md#appimportedregistry)
- [bootstrapPath](CoreActionApp.md#bootstrappath)
- [rejectBootstrap](CoreActionApp.md#rejectbootstrap)
- [resolveBootstrap](CoreActionApp.md#resolvebootstrap)
- [waitForActiveApp](CoreActionApp.md#waitforactiveapp)

### Accessors

- [boostrapPath](CoreActionApp.md#boostrappath)

### Methods

- [bootstrap](CoreActionApp.md#bootstrap)
- [getActionFromRegistry](CoreActionApp.md#getactionfromregistry)
- [getActionRefFromRegistry](CoreActionApp.md#getactionreffromregistry)
- [getActiveApp](CoreActionApp.md#getactiveapp)

## Constructors

### constructor

• **new CoreActionApp**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ActionAppConfig`](../interfaces/ActionAppConfig.md) |

#### Inherited from

[ActionApp](ActionApp.md).[constructor](ActionApp.md#constructor)

#### Defined in

[src/core/actions/src/app/action-app.ts:76](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L76)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Inherited from

[ActionApp](ActionApp.md).[ActionModel](ActionApp.md#actionmodel)

#### Defined in

[src/core/actions/src/app/action-app.ts:67](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L67)

___

### actionFilter

• `Optional` **actionFilter**: `Object`

Used by ActionCron to
filter actions using their `filter` field

#### Inherited from

[ActionApp](ActionApp.md).[actionFilter](ActionApp.md#actionfilter)

#### Defined in

[src/core/actions/src/app/action-app.ts:59](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L59)

___

### db

• **db**: [`AppDb`](../interfaces/AppDb.md)

#### Inherited from

[ActionApp](ActionApp.md).[db](ActionApp.md#db)

#### Defined in

[src/core/actions/src/app/action-app.ts:61](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L61)

___

### declare

• **declare**: (typeof [`Action`](Action.md) \| typeof [`Workflow`](Workflow.md))[]

#### Overrides

[ActionApp](ActionApp.md).[declare](ActionApp.md#declare)

#### Defined in

[src/core/actions/src/app/action-app.ts:193](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L193)

___

### imports

• **imports**: typeof [`ActionApp`](ActionApp.md)[] = `[]`

#### Inherited from

[ActionApp](ActionApp.md).[imports](ActionApp.md#imports)

#### Defined in

[src/core/actions/src/app/action-app.ts:50](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L50)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Inherited from

[ActionApp](ActionApp.md).[logger](ActionApp.md#logger)

#### Defined in

[src/core/actions/src/app/action-app.ts:48](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L48)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Inherited from

[ActionApp](ActionApp.md).[numberOfWorker](ActionApp.md#numberofworker)

#### Defined in

[src/core/actions/src/app/action-app.ts:53](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L53)

___

### activeApp

▪ `Static` **activeApp**: [`ActionApp`](ActionApp.md)

#### Inherited from

[ActionApp](ActionApp.md).[activeApp](ActionApp.md#activeapp)

#### Defined in

[src/core/actions/src/app/action-app.ts:33](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L33)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Inherited from

[ActionApp](ActionApp.md).[appImportedRegistry](ActionApp.md#appimportedregistry)

#### Defined in

[src/core/actions/src/app/action-app.ts:35](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L35)

___

### bootstrapPath

▪ `Static` **bootstrapPath**: `string`

#### Inherited from

[ActionApp](ActionApp.md).[bootstrapPath](ActionApp.md#bootstrappath)

#### Defined in

[src/core/actions/src/app/action-app.ts:43](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L43)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Inherited from

[ActionApp](ActionApp.md).[rejectBootstrap](ActionApp.md#rejectbootstrap)

#### Defined in

[src/core/actions/src/app/action-app.ts:38](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L38)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Inherited from

[ActionApp](ActionApp.md).[resolveBootstrap](ActionApp.md#resolvebootstrap)

#### Defined in

[src/core/actions/src/app/action-app.ts:37](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L37)

___

### waitForActiveApp

▪ `Static` **waitForActiveApp**: `Promise`<`unknown`\>

#### Inherited from

[ActionApp](ActionApp.md).[waitForActiveApp](ActionApp.md#waitforactiveapp)

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

ActionApp.boostrapPath

#### Defined in

[src/core/actions/src/app/action-app.ts:72](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L72)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[ActionApp](ActionApp.md).[bootstrap](ActionApp.md#bootstrap)

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

[ActionApp](ActionApp.md).[getActionFromRegistry](ActionApp.md#getactionfromregistry)

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

[ActionApp](ActionApp.md).[getActionRefFromRegistry](ActionApp.md#getactionreffromregistry)

#### Defined in

[src/core/actions/src/app/action-app.ts:108](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L108)

___

### getActiveApp

▸ `Static` **getActiveApp**(): [`ActionApp`](ActionApp.md)

#### Returns

[`ActionApp`](ActionApp.md)

#### Inherited from

[ActionApp](ActionApp.md).[getActiveApp](ActionApp.md#getactiveapp)

#### Defined in

[src/core/actions/src/app/action-app.ts:144](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L144)
