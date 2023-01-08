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
- [inversedActionsRegistry](ActionApp.md#inversedactionsregistry)
- [logger](ActionApp.md#logger)
- [numberOfWorker](ActionApp.md#numberofworker)
- [activeApp](ActionApp.md#activeapp)
- [appImportedRegistry](ActionApp.md#appimportedregistry)
- [boostrapPath](ActionApp.md#boostrappath)
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

[src/app/action-app.ts:52](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L52)

## Properties

### ActionModel

• **ActionModel**: `Model`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>, {}, {}, {}, `any`\>

#### Defined in

[src/app/action-app.ts:50](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L50)

___

### actionsRegistry

• **actionsRegistry**: `Map`<`string`, typeof [`Action`](Action.md)\>

#### Defined in

[src/app/action-app.ts:32](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L32)

___

### db

• **db**: `AppDb`

#### Defined in

[src/app/action-app.ts:44](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L44)

___

### declare

• **declare**: typeof [`Action`](Action.md)[] = `[]`

#### Defined in

[src/app/action-app.ts:40](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L40)

___

### imports

• **imports**: typeof [`ActionApp`](ActionApp.md)[] = `[]`

#### Defined in

[src/app/action-app.ts:39](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L39)

___

### inversedActionsRegistry

• **inversedActionsRegistry**: `Map`<typeof [`Action`](Action.md), `string`\>

#### Defined in

[src/app/action-app.ts:33](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L33)

___

### logger

• **logger**: `Logger` = `defaultLogger`

#### Defined in

[src/app/action-app.ts:35](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L35)

___

### numberOfWorker

• **numberOfWorker**: `number` = `3`

#### Defined in

[src/app/action-app.ts:42](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L42)

___

### activeApp

▪ `Static` **activeApp**: [`ActionApp`](ActionApp.md)

#### Defined in

[src/app/action-app.ts:20](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L20)

___

### appImportedRegistry

▪ `Static` **appImportedRegistry**: `Map`<`any`, `any`\>

#### Defined in

[src/app/action-app.ts:22](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L22)

___

### boostrapPath

▪ `Static` **boostrapPath**: `string`

#### Defined in

[src/app/action-app.ts:30](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L30)

___

### rejectBootstrap

▪ `Static` **rejectBootstrap**: `any`

#### Defined in

[src/app/action-app.ts:25](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L25)

___

### resolveBootstrap

▪ `Static` **resolveBootstrap**: `any`

#### Defined in

[src/app/action-app.ts:24](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L24)

___

### waitForActiveApp

▪ `Static` **waitForActiveApp**: `Promise`<`unknown`\>

#### Defined in

[src/app/action-app.ts:26](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L26)

## Methods

### bootstrap

▸ **bootstrap**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/app/action-app.ts:64](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L64)

___

### import

▸ `Private` **import**(): `void`

#### Returns

`void`

#### Defined in

[src/app/action-app.ts:84](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L84)

___

### getActiveApp

▸ `Static` **getActiveApp**(): [`ActionApp`](ActionApp.md)

#### Returns

[`ActionApp`](ActionApp.md)

#### Defined in

[src/app/action-app.ts:97](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/app/action-app.ts#L97)
