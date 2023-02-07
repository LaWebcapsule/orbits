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
- [inversedActionsRegistry](CoreActionApp.md#inversedactionsregistry)
- [logger](CoreActionApp.md#logger)
- [numberOfWorker](CoreActionApp.md#numberofworker)
- [activeApp](CoreActionApp.md#activeapp)
- [appImportedRegistry](CoreActionApp.md#appimportedregistry)
- [boostrapPath](CoreActionApp.md#boostrappath)
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

[src/app/action-app.ts:52](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L52)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Inherited from

[ActionApp](ActionApp.md).[ActionModel](ActionApp.md#actionmodel)

#### Defined in

[src/app/action-app.ts:50](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L50)

___

### actionsRegistry

• **actionsRegistry**: `Map`<`string`, typeof [`Action`](Action.md)\>

#### Inherited from

[ActionApp](ActionApp.md).[actionsRegistry](ActionApp.md#actionsregistry)

#### Defined in

[src/app/action-app.ts:32](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L32)

___

### db

• **db**: `AppDb`

#### Inherited from

[ActionApp](ActionApp.md).[db](ActionApp.md#db)

#### Defined in

[src/app/action-app.ts:44](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L44)

___

### declare

• **declare**: typeof [`Action`](Action.md)[]

#### Overrides

[ActionApp](ActionApp.md).[declare](ActionApp.md#declare)

#### Defined in

[src/app/action-app.ts:126](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L126)

___

### imports

• **imports**: typeof [`ActionApp`](ActionApp.md)[] = `[]`

#### Inherited from

[ActionApp](ActionApp.md).[imports](ActionApp.md#imports)

#### Defined in

[src/app/action-app.ts:39](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L39)

___

### inversedActionsRegistry

• **inversedActionsRegistry**: `Map`<typeof [`Action`](Action.md), `string`\>

#### Inherited from

[ActionApp](ActionApp.md).[inversedActionsRegistry](ActionApp.md#inversedactionsregistry)

#### Defined in

[src/app/action-app.ts:33](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L33)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Inherited from

[ActionApp](ActionApp.md).[logger](ActionApp.md#logger)

#### Defined in

[src/app/action-app.ts:35](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L35)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Inherited from

[ActionApp](ActionApp.md).[numberOfWorker](ActionApp.md#numberofworker)

#### Defined in

[src/app/action-app.ts:42](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L42)

___

### activeApp

▪ `Static` **activeApp**: [`ActionApp`](ActionApp.md)

#### Inherited from

[ActionApp](ActionApp.md).[activeApp](ActionApp.md#activeapp)

#### Defined in

[src/app/action-app.ts:20](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L20)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Inherited from

[ActionApp](ActionApp.md).[appImportedRegistry](ActionApp.md#appimportedregistry)

#### Defined in

[src/app/action-app.ts:22](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L22)

___

### boostrapPath

▪ `Static` **boostrapPath**: `string`

#### Inherited from

[ActionApp](ActionApp.md).[boostrapPath](ActionApp.md#boostrappath)

#### Defined in

[src/app/action-app.ts:30](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L30)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Inherited from

[ActionApp](ActionApp.md).[rejectBootstrap](ActionApp.md#rejectbootstrap)

#### Defined in

[src/app/action-app.ts:25](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L25)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Inherited from

[ActionApp](ActionApp.md).[resolveBootstrap](ActionApp.md#resolvebootstrap)

#### Defined in

[src/app/action-app.ts:24](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L24)

___

### waitForActiveApp

▪ `Static` **waitForActiveApp**: `Promise`<`unknown`\>

#### Inherited from

[ActionApp](ActionApp.md).[waitForActiveApp](ActionApp.md#waitforactiveapp)

#### Defined in

[src/app/action-app.ts:26](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L26)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[ActionApp](ActionApp.md).[bootstrap](ActionApp.md#bootstrap)

#### Defined in

[src/app/action-app.ts:64](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L64)

___

### getActiveApp

▸ `Static` **getActiveApp**(): [`ActionApp`](ActionApp.md)

#### Returns

[`ActionApp`](ActionApp.md)

#### Inherited from

[ActionApp](ActionApp.md).[getActiveApp](ActionApp.md#getactiveapp)

#### Defined in

[src/app/action-app.ts:97](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/app/action-app.ts#L97)
