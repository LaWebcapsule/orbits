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
- [invertedActionsRegistry](CoreActionApp.md#invertedActionsRegistry)
- [logger](CoreActionApp.md#logger)
- [numberOfWorker](CoreActionApp.md#numberofworker)
- [activeApp](CoreActionApp.md#activeapp)
- [appImportedRegistry](CoreActionApp.md#appimportedregistry)
- [bootstrapPath](CoreActionApp.md#bootstrappath)
- [rejectBootstrap](CoreActionApp.md#rejectbootstrap)
- [resolveBootstrap](CoreActionApp.md#resolvebootstrap)
- [waitForActiveApp](CoreActionApp.md#waitforactiveapp)

### Methods

- [bootstrap](CoreActionApp.md#bootstrap)
- [getActiveApp](CoreActionApp.md#getactiveapp)

## Constructors

### constructor

• **new CoreActionApp**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Object` |
| `opts.db?` | `AppDb` |
| `opts.logger?` | `Logger` |

#### Inherited from

[ActionApp](ActionApp.md).[constructor](ActionApp.md#constructor)

#### Defined in

[src/app/action-app.ts:56](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L56)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Inherited from

[ActionApp](ActionApp.md).[ActionModel](ActionApp.md#actionmodel)

#### Defined in

[src/app/action-app.ts:54](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L54)

___

### actionsRegistry

• **actionsRegistry**: `Map`<`string`, typeof [`Action`](Action.md)\>

#### Inherited from

[ActionApp](ActionApp.md).[actionsRegistry](ActionApp.md#actionsregistry)

#### Defined in

[src/app/action-app.ts:36](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L36)

___

### db

• **db**: `AppDb`

#### Inherited from

[ActionApp](ActionApp.md).[db](ActionApp.md#db)

#### Defined in

[src/app/action-app.ts:48](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L48)

___

### declare

• **declare**: typeof [`Action`](Action.md)[]

#### Overrides

[ActionApp](ActionApp.md).[declare](ActionApp.md#declare)

#### Defined in

[src/app/action-app.ts:147](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L147)

___

### imports

• **imports**: typeof [`ActionApp`](ActionApp.md)[] = `[]`

#### Inherited from

[ActionApp](ActionApp.md).[imports](ActionApp.md#imports)

#### Defined in

[src/app/action-app.ts:43](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L43)

___

### invertedActionsRegistry

• **invertedActionsRegistry**: `Map`<typeof [`Action`](Action.md), `string`\>

#### Inherited from

[ActionApp](ActionApp.md).[invertedActionsRegistry](ActionApp.md#invertedActionsRegistry)

#### Defined in

[src/app/action-app.ts:37](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L37)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Inherited from

[ActionApp](ActionApp.md).[logger](ActionApp.md#logger)

#### Defined in

[src/app/action-app.ts:39](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L39)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Inherited from

[ActionApp](ActionApp.md).[numberOfWorker](ActionApp.md#numberofworker)

#### Defined in

[src/app/action-app.ts:46](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L46)

___

### activeApp

▪ `Static` **activeApp**: [`ActionApp`](ActionApp.md)

#### Inherited from

[ActionApp](ActionApp.md).[activeApp](ActionApp.md#activeapp)

#### Defined in

[src/app/action-app.ts:24](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L24)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Inherited from

[ActionApp](ActionApp.md).[appImportedRegistry](ActionApp.md#appimportedregistry)

#### Defined in

[src/app/action-app.ts:26](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L26)

___

### bootstrapPath

▪ `Static` **bootstrapPath**: `string`

#### Inherited from

[ActionApp](ActionApp.md).[bootstrapPath](ActionApp.md#bootstrappath)

#### Defined in

[src/app/action-app.ts:34](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L34)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Inherited from

[ActionApp](ActionApp.md).[rejectBootstrap](ActionApp.md#rejectbootstrap)

#### Defined in

[src/app/action-app.ts:29](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L29)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Inherited from

[ActionApp](ActionApp.md).[resolveBootstrap](ActionApp.md#resolvebootstrap)

#### Defined in

[src/app/action-app.ts:28](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L28)

___

### waitForActiveApp

▪ `Static` **waitForActiveApp**: `Promise`<`unknown`\>

#### Inherited from

[ActionApp](ActionApp.md).[waitForActiveApp](ActionApp.md#waitforactiveapp)

#### Defined in

[src/app/action-app.ts:30](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L30)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[ActionApp](ActionApp.md).[bootstrap](ActionApp.md#bootstrap)

#### Defined in

[src/app/action-app.ts:68](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L68)

___

### getActiveApp

▸ `Static` **getActiveApp**(): [`ActionApp`](ActionApp.md)

#### Returns

[`ActionApp`](ActionApp.md)

#### Inherited from

[ActionApp](ActionApp.md).[getActiveApp](ActionApp.md#getactiveapp)

#### Defined in

[src/app/action-app.ts:101](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L101)
