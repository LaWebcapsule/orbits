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
- [actionsRegistry](CoreActionApp.md#actionsregistry)
- [db](CoreActionApp.md#db)
- [declare](CoreActionApp.md#declare)
- [imports](CoreActionApp.md#imports)
- [invertedActionsRegistry](CoreActionApp.md#invertedactionsregistry)
- [logger](CoreActionApp.md#logger)
- [numberOfWorker](CoreActionApp.md#numberofworker)
- [activeApp](CoreActionApp.md#activeapp)
- [appImportedRegistry](CoreActionApp.md#appimportedregistry)
- [bootstrapPath](CoreActionApp.md#bootstrappath)
- [rejectBootstrap](CoreActionApp.md#rejectbootstrap)
- [resolveBootstrap](CoreActionApp.md#resolvebootstrap)
- [waitForActiveApp](CoreActionApp.md#waitforactiveapp)

### Accessors

- [inversedActionsRegistry](CoreActionApp.md#inversedactionsregistry)
- [boostrapPath](CoreActionApp.md#boostrappath)

### Methods

- [bootstrap](CoreActionApp.md#bootstrap)
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

[src/core/actions/src/app/action-app.ts:82](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L82)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Inherited from

[ActionApp](ActionApp.md).[ActionModel](ActionApp.md#actionmodel)

#### Defined in

[src/core/actions/src/app/action-app.ts:60](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L60)

___

### actionsRegistry

• **actionsRegistry**: `Map`<`string`, typeof [`Action`](Action.md)\>

#### Inherited from

[ActionApp](ActionApp.md).[actionsRegistry](ActionApp.md#actionsregistry)

#### Defined in

[src/core/actions/src/app/action-app.ts:44](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L44)

___

### db

• **db**: [`AppDb`](../interfaces/AppDb.md)

#### Inherited from

[ActionApp](ActionApp.md).[db](ActionApp.md#db)

#### Defined in

[src/core/actions/src/app/action-app.ts:54](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L54)

___

### declare

• **declare**: (typeof [`Action`](Action.md) \| typeof [`Workflow`](Workflow.md))[]

#### Overrides

[ActionApp](ActionApp.md).[declare](ActionApp.md#declare)

#### Defined in

[src/core/actions/src/app/action-app.ts:181](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L181)

___

### imports

• **imports**: typeof [`ActionApp`](ActionApp.md)[] = `[]`

#### Inherited from

[ActionApp](ActionApp.md).[imports](ActionApp.md#imports)

#### Defined in

[src/core/actions/src/app/action-app.ts:49](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L49)

___

### invertedActionsRegistry

• **invertedActionsRegistry**: `Map`<typeof [`Action`](Action.md), `string`\>

#### Inherited from

[ActionApp](ActionApp.md).[invertedActionsRegistry](ActionApp.md#invertedactionsregistry)

#### Defined in

[src/core/actions/src/app/action-app.ts:45](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L45)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Inherited from

[ActionApp](ActionApp.md).[logger](ActionApp.md#logger)

#### Defined in

[src/core/actions/src/app/action-app.ts:47](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L47)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Inherited from

[ActionApp](ActionApp.md).[numberOfWorker](ActionApp.md#numberofworker)

#### Defined in

[src/core/actions/src/app/action-app.ts:52](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L52)

___

### activeApp

▪ `Static` **activeApp**: [`ActionApp`](ActionApp.md)

#### Inherited from

[ActionApp](ActionApp.md).[activeApp](ActionApp.md#activeapp)

#### Defined in

[src/core/actions/src/app/action-app.ts:32](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L32)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Inherited from

[ActionApp](ActionApp.md).[appImportedRegistry](ActionApp.md#appimportedregistry)

#### Defined in

[src/core/actions/src/app/action-app.ts:34](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L34)

___

### bootstrapPath

▪ `Static` **bootstrapPath**: `string`

#### Inherited from

[ActionApp](ActionApp.md).[bootstrapPath](ActionApp.md#bootstrappath)

#### Defined in

[src/core/actions/src/app/action-app.ts:42](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L42)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Inherited from

[ActionApp](ActionApp.md).[rejectBootstrap](ActionApp.md#rejectbootstrap)

#### Defined in

[src/core/actions/src/app/action-app.ts:37](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L37)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Inherited from

[ActionApp](ActionApp.md).[resolveBootstrap](ActionApp.md#resolvebootstrap)

#### Defined in

[src/core/actions/src/app/action-app.ts:36](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L36)

___

### waitForActiveApp

▪ `Static` **waitForActiveApp**: `Promise`<`unknown`\>

#### Inherited from

[ActionApp](ActionApp.md).[waitForActiveApp](ActionApp.md#waitforactiveapp)

#### Defined in

[src/core/actions/src/app/action-app.ts:38](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L38)

## Accessors

### inversedActionsRegistry

• `get` **inversedActionsRegistry**(): `Map`<typeof [`Action`](Action.md), `string`\>

**`Deprecated`**

use invertedActionsRegistry

#### Returns

`Map`<typeof [`Action`](Action.md), `string`\>

#### Inherited from

ActionApp.inversedActionsRegistry

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

#### Inherited from

ActionApp.inversedActionsRegistry

#### Defined in

[src/core/actions/src/app/action-app.ts:78](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L78)

___

### boostrapPath

• `Static` `get` **boostrapPath**(): `string`

**`Deprecated`**

use bootstrapPath

#### Returns

`string`

#### Inherited from

ActionApp.boostrapPath

#### Defined in

[src/core/actions/src/app/action-app.ts:65](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L65)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[ActionApp](ActionApp.md).[bootstrap](ActionApp.md#bootstrap)

#### Defined in

[src/core/actions/src/app/action-app.ts:94](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L94)

___

### getActiveApp

▸ `Static` **getActiveApp**(): [`ActionApp`](ActionApp.md)

#### Returns

[`ActionApp`](ActionApp.md)

#### Inherited from

[ActionApp](ActionApp.md).[getActiveApp](ActionApp.md#getactiveapp)

#### Defined in

[src/core/actions/src/app/action-app.ts:137](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/action-app.ts#L137)
