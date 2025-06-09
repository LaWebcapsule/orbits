[@wbce/orbits](../README.md) / [Exports](../modules.md) / ActionRuntime

# Class: ActionRuntime

## Hierarchy

- **`ActionRuntime`**

  ↳ [`CoreActionRuntime`](CoreActionRuntime.md)

## Table of contents

### Constructors

- [constructor](ActionRuntime.md#constructor)

### Properties

- [ActionModel](ActionRuntime.md#actionmodel)
- [actionFilter](ActionRuntime.md#actionfilter)
- [actionsRegistry](ActionRuntime.md#actionsregistry)
- [db](ActionRuntime.md#db)
- [declare](ActionRuntime.md#declare)
- [imports](ActionRuntime.md#imports)
- [invertedActionsRegistry](ActionRuntime.md#invertedactionsregistry)
- [logger](ActionRuntime.md#logger)
- [numberOfWorker](ActionRuntime.md#numberofworker)
- [activeRuntime](ActionRuntime.md#activeruntime)
- [appImportedRegistry](ActionRuntime.md#appimportedregistry)
- [bootstrapPath](ActionRuntime.md#bootstrappath)
- [rejectBootstrap](ActionRuntime.md#rejectbootstrap)
- [resolveBootstrap](ActionRuntime.md#resolvebootstrap)
- [waitForActiveRuntime](ActionRuntime.md#waitforactiveruntime)

### Accessors

- [boostrapPath](ActionRuntime.md#boostrappath)

### Methods

- [bootstrap](ActionRuntime.md#bootstrap)
- [getActionFromRegistry](ActionRuntime.md#getactionfromregistry)
- [getActionRefFromRegistry](ActionRuntime.md#getactionreffromregistry)
- [import](ActionRuntime.md#import)
- [registerAction](ActionRuntime.md#registeraction)
- [getActiveRuntime](ActionRuntime.md#getactiveruntime)

## Constructors

### constructor

• **new ActionRuntime**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ActionRuntimeConfig`](../interfaces/ActionRuntimeConfig.md) |

#### Defined in

[src/core/actions/src/app/action-app.ts:76](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L76)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:67](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L67)

___

### actionFilter

• `Optional` **actionFilter**: `Object`

Used by ActionCron to
filter actions using their `filter` field

#### Defined in

[src/core/actions/src/app/action-app.ts:59](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L59)

___

### actionsRegistry

• `Private` **actionsRegistry**: `Map`<`string`, typeof [`Action`](Action.md)\>

#### Defined in

[src/core/actions/src/app/action-app.ts:45](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L45)

___

### db

• **db**: [`AppDb`](../interfaces/AppDb.md)

#### Defined in

[src/core/actions/src/app/action-app.ts:61](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L61)

___

### declare

• **declare**: typeof [`Action`](Action.md)[] = `[]`

#### Defined in

[src/core/actions/src/app/action-app.ts:51](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L51)

___

### imports

• **imports**: typeof [`ActionRuntime`](ActionRuntime.md)[] = `[]`

#### Defined in

[src/core/actions/src/app/action-app.ts:50](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L50)

___

### invertedActionsRegistry

• `Private` **invertedActionsRegistry**: `Map`<typeof [`Action`](Action.md), `string`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:46](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L46)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Defined in

[src/core/actions/src/app/action-app.ts:48](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L48)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Defined in

[src/core/actions/src/app/action-app.ts:53](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L53)

___

### activeRuntime

▪ `Static` **activeRuntime**: [`ActionRuntime`](ActionRuntime.md)

#### Defined in

[src/core/actions/src/app/action-app.ts:33](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L33)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:35](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L35)

___

### bootstrapPath

▪ `Static` **bootstrapPath**: `string`

#### Defined in

[src/core/actions/src/app/action-app.ts:43](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L43)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Defined in

[src/core/actions/src/app/action-app.ts:38](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L38)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Defined in

[src/core/actions/src/app/action-app.ts:37](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L37)

___

### waitForActiveRuntime

▪ `Static` **waitForActiveRuntime**: `Promise`<`unknown`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:39](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L39)

## Accessors

### boostrapPath

• `Static` `get` **boostrapPath**(): `string`

**`Deprecated`**

use bootstrapPath

#### Returns

`string`

#### Defined in

[src/core/actions/src/app/action-app.ts:72](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L72)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

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

#### Defined in

[src/core/actions/src/app/action-app.ts:108](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L108)

___

### import

▸ `Private` **import**(): `void`

#### Returns

`void`

#### Defined in

[src/core/actions/src/app/action-app.ts:132](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L132)

___

### registerAction

▸ `Private` **registerAction**(`action`): `void`

Register action in App registries.

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | typeof [`Action`](Action.md) |

#### Returns

`void`

#### Defined in

[src/core/actions/src/app/action-app.ts:94](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L94)

___

### getActiveRuntime

▸ `Static` **getActiveRuntime**(): [`ActionRuntime`](ActionRuntime.md)

#### Returns

[`ActionRuntime`](ActionRuntime.md)

#### Defined in

[src/core/actions/src/app/action-app.ts:144](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L144)
