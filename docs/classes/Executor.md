[@wbce/orbits](../README.md) / [Exports](../modules.md) / Executor

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

#### Defined in

[src/action-executor.ts:7](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-executor.ts#L7)

## Methods

### createInstallAction

▸ **createInstallAction**(): [`Action`](Action.md) \| `Promise`<[`Action`](Action.md)\>

#### Returns

[`Action`](Action.md) \| `Promise`<[`Action`](Action.md)\>

#### Defined in

[src/action-executor.ts:9](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-executor.ts#L9)

___

### createUninstallAction

▸ **createUninstallAction**(): [`Action`](Action.md) \| `Promise`<[`Action`](Action.md)\>

#### Returns

[`Action`](Action.md) \| `Promise`<[`Action`](Action.md)\>

#### Defined in

[src/action-executor.ts:13](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-executor.ts#L13)

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

[src/action-executor.ts:17](https://gitlab.com/webcapsule/actions/-/blob/5d56f22/src/core/actions/src/action-executor.ts#L17)
