[@orbi-ts/orbits](../README.md) / [Exports](../modules.md) / Executor

# Class: Executor

## Table of contents

### Constructors

- [constructor](Executor.md#constructor)

### Properties

- [scope](Executor.md#scope)

### Methods

- [createInstallAction](Executor.md#createinstallaction)
- [createUninstallAction](Executor.md#createuninstallaction)
- [resume](Executor.md#resume)

## Constructors

### constructor

• **new Executor**()

## Properties

### scope

• `Optional` **scope**: [`ActionState`](../enums/ActionState.md)[]

**`Default`**

undefined all ActionStates

#### Defined in

[src/core/actions/src/action-executor.ts:8](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-executor.ts#L8)

## Methods

### createInstallAction

▸ **createInstallAction**(): [`Action`](Action.md) \| `Promise`<[`Action`](Action.md)\>

#### Returns

[`Action`](Action.md) \| `Promise`<[`Action`](Action.md)\>

#### Defined in

[src/core/actions/src/action-executor.ts:10](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-executor.ts#L10)

___

### createUninstallAction

▸ **createUninstallAction**(): [`Action`](Action.md) \| `Promise`<[`Action`](Action.md)\>

#### Returns

[`Action`](Action.md) \| `Promise`<[`Action`](Action.md)\>

#### Defined in

[src/core/actions/src/action-executor.ts:14](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-executor.ts#L14)

___

### resume

▸ **resume**(`action`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `any` |

#### Returns

`any`

#### Defined in

[src/core/actions/src/action-executor.ts:18](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-executor.ts#L18)
