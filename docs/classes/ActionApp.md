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
- [invertedActionsRegistry](ActionApp.md#invertedActionsRegistry)
- [logger](ActionApp.md#logger)
- [numberOfWorker](ActionApp.md#numberofworker)
- [activeApp](ActionApp.md#activeapp)
- [appImportedRegistry](ActionApp.md#appimportedregistry)
- [bootstrapPath](ActionApp.md#bootstrappath)
- [rejectBootstrap](ActionApp.md#rejectbootstrap)
- [resolveBootstrap](ActionApp.md#resolvebootstrap)
- [waitForActiveApp](ActionApp.md#waitforactiveapp)

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
| `opts?` | `Object` |
| `opts.db?` | `AppDb` |
| `opts.logger?` | `Logger` |

#### Defined in

[src/app/action-app.ts:56](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L56)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Defined in

[src/app/action-app.ts:54](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L54)

___

### actionsRegistry

• **actionsRegistry**: `Map`<`string`, typeof [`Action`](Action.md)\>

#### Defined in

[src/app/action-app.ts:36](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L36)

___

### db

• **db**: `AppDb`

#### Defined in

[src/app/action-app.ts:48](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L48)

___

### declare

• **declare**: typeof [`Action`](Action.md)[] = `[]`

#### Defined in

[src/app/action-app.ts:44](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L44)

___

### imports

• **imports**: typeof [`ActionApp`](ActionApp.md)[] = `[]`

#### Defined in

[src/app/action-app.ts:43](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L43)

___

### invertedActionsRegistry

• **invertedActionsRegistry**: `Map`<typeof [`Action`](Action.md), `string`\>

#### Defined in

[src/app/action-app.ts:37](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L37)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Defined in

[src/app/action-app.ts:39](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L39)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Defined in

[src/app/action-app.ts:46](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L46)

___

### activeApp

▪ `Static` **activeApp**: [`ActionApp`](ActionApp.md)

#### Defined in

[src/app/action-app.ts:24](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L24)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Defined in

[src/app/action-app.ts:26](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L26)

___

### bootstrapPath

▪ `Static` **bootstrapPath**: `string`

#### Defined in

[src/app/action-app.ts:34](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L34)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Defined in

[src/app/action-app.ts:29](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L29)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Defined in

[src/app/action-app.ts:28](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L28)

___

### waitForActiveApp

▪ `Static` **waitForActiveApp**: `Promise`<`unknown`\>

#### Defined in

[src/app/action-app.ts:30](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L30)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/app/action-app.ts:68](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L68)

___

### import

▸ `Private` **import**(): `void`

#### Returns

`void`

#### Defined in

[src/app/action-app.ts:88](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L88)

___

### getActiveApp

▸ `Static` **getActiveApp**(): [`ActionApp`](ActionApp.md)

#### Returns

[`ActionApp`](ActionApp.md)

#### Defined in

[src/app/action-app.ts:101](https://github.com/LaWebcapsule/orbits/blob/b05d8f7/src/core/actions/src/app/action-app.ts#L101)
