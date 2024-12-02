[@wbce/orbits](../README.md) / [Exports](../modules.md) / ActionApp

# Class: ActionApp

## Hierarchy

- **`ActionApp`**

  ↳ [`CoreActionApp`](CoreActionApp.md)

## Table of contents

### Constructors

- [constructor](ActionApp.md#constructor)

### Properties

- [ActionModel](ActionApp.md#actionmodel)
- [actionsRegistry](ActionApp.md#actionsregistry)
- [db](ActionApp.md#db)
- [declare](ActionApp.md#declare)
- [imports](ActionApp.md#imports)
- [invertedActionsRegistry](ActionApp.md#invertedactionsregistry)
- [logger](ActionApp.md#logger)
- [numberOfWorker](ActionApp.md#numberofworker)
- [activeApp](ActionApp.md#activeapp)
- [appImportedRegistry](ActionApp.md#appimportedregistry)
- [bootstrapPath](ActionApp.md#bootstrappath)
- [rejectBootstrap](ActionApp.md#rejectbootstrap)
- [resolveBootstrap](ActionApp.md#resolvebootstrap)
- [waitForActiveApp](ActionApp.md#waitforactiveapp)

### Accessors

- [inversedActionsRegistry](ActionApp.md#inversedactionsregistry)
- [boostrapPath](ActionApp.md#boostrappath)

### Methods

- [bootstrap](ActionApp.md#bootstrap)
- [import](ActionApp.md#import)
- [getActiveApp](ActionApp.md#getactiveapp)

## Constructors

### constructor

• **new ActionApp**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ActionAppConfig`](../interfaces/ActionAppConfig.md) |

#### Defined in

[src/core/actions/src/app/action-app.ts:82](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L82)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:60](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L60)

___

### actionsRegistry

• **actionsRegistry**: `Map`<`string`, typeof [`Action`](Action.md)\>

#### Defined in

[src/core/actions/src/app/action-app.ts:44](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L44)

___

### db

• **db**: [`AppDb`](../interfaces/AppDb.md)

#### Defined in

[src/core/actions/src/app/action-app.ts:54](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L54)

___

### declare

• **declare**: typeof [`Action`](Action.md)[] = `[]`

#### Defined in

[src/core/actions/src/app/action-app.ts:50](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L50)

___

### imports

• **imports**: typeof [`ActionApp`](ActionApp.md)[] = `[]`

#### Defined in

[src/core/actions/src/app/action-app.ts:49](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L49)

___

### invertedActionsRegistry

• **invertedActionsRegistry**: `Map`<typeof [`Action`](Action.md), `string`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:45](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L45)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Defined in

[src/core/actions/src/app/action-app.ts:47](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L47)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Defined in

[src/core/actions/src/app/action-app.ts:52](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L52)

___

### activeApp

▪ `Static` **activeApp**: [`ActionApp`](ActionApp.md)

#### Defined in

[src/core/actions/src/app/action-app.ts:32](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L32)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:34](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L34)

___

### bootstrapPath

▪ `Static` **bootstrapPath**: `string`

#### Defined in

[src/core/actions/src/app/action-app.ts:42](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L42)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Defined in

[src/core/actions/src/app/action-app.ts:37](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L37)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Defined in

[src/core/actions/src/app/action-app.ts:36](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L36)

___

### waitForActiveApp

▪ `Static` **waitForActiveApp**: `Promise`<`unknown`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:38](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L38)

## Accessors

### inversedActionsRegistry

• `get` **inversedActionsRegistry**(): `Map`<typeof [`Action`](Action.md), `string`\>

**`Deprecated`**

use invertedActionsRegistry

#### Returns

`Map`<typeof [`Action`](Action.md), `string`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:72](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L72)

• `set` **inversedActionsRegistry**(`actionRegistry`): `void`

**`Deprecated`**

use invertedActionsRegistry

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionRegistry` | `Map`<typeof [`Action`](Action.md), `string`\> |

#### Returns

`void`

#### Defined in

[src/core/actions/src/app/action-app.ts:78](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L78)

___

### boostrapPath

• `Static` `get` **boostrapPath**(): `string`

**`Deprecated`**

use bootstrapPath

#### Returns

`string`

#### Defined in

[src/core/actions/src/app/action-app.ts:65](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L65)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/actions/src/app/action-app.ts:94](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L94)

___

### import

▸ `Private` **import**(): `void`

#### Returns

`void`

#### Defined in

[src/core/actions/src/app/action-app.ts:125](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L125)

___

### getActiveApp

▸ `Static` **getActiveApp**(): [`ActionApp`](ActionApp.md)

#### Returns

[`ActionApp`](ActionApp.md)

#### Defined in

[src/core/actions/src/app/action-app.ts:137](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L137)
