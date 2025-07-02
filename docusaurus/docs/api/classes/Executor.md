# Class: Executor

Defined in: [core/actions/src/action-executor.ts:4](https://github.com/LaWebcapsule/orbits/blob/ced1f82406c9b27931dd9466d50f5c852bcd31bf/core/actions/src/action-executor.ts#L4)

## Constructors

### Constructor

> **new Executor**(): `Executor`

#### Returns

`Executor`

## Properties

### scope?

> `optional` **scope**: [`ActionState`](../enumerations/ActionState.md)[]

Defined in: [core/actions/src/action-executor.ts:8](https://github.com/LaWebcapsule/orbits/blob/ced1f82406c9b27931dd9466d50f5c852bcd31bf/core/actions/src/action-executor.ts#L8)

#### Default

```ts
undefined all ActionStates
```

## Methods

### createInstallAction()

> **createInstallAction**(): [`Action`](Action.md) \| `Promise`\<[`Action`](Action.md)\>

Defined in: [core/actions/src/action-executor.ts:10](https://github.com/LaWebcapsule/orbits/blob/ced1f82406c9b27931dd9466d50f5c852bcd31bf/core/actions/src/action-executor.ts#L10)

#### Returns

[`Action`](Action.md) \| `Promise`\<[`Action`](Action.md)\>

***

### createUninstallAction()

> **createUninstallAction**(): [`Action`](Action.md) \| `Promise`\<[`Action`](Action.md)\>

Defined in: [core/actions/src/action-executor.ts:14](https://github.com/LaWebcapsule/orbits/blob/ced1f82406c9b27931dd9466d50f5c852bcd31bf/core/actions/src/action-executor.ts#L14)

#### Returns

[`Action`](Action.md) \| `Promise`\<[`Action`](Action.md)\>

***

### resume()

> **resume**(`action`): `any`

Defined in: [core/actions/src/action-executor.ts:18](https://github.com/LaWebcapsule/orbits/blob/ced1f82406c9b27931dd9466d50f5c852bcd31bf/core/actions/src/action-executor.ts#L18)

#### Parameters

##### action

`any`

#### Returns

`any`
