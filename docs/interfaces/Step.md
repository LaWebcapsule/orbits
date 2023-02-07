[@wbce/orbits](../README.md) / [Exports](../modules.md) / Step

# Interface: Step

## Table of contents

### Properties

- [4](Step.md#4)
- [5](Step.md#5)
- [cb](Step.md#cb)
- [name](Step.md#name)
- [opts](Step.md#opts)
- [rollback](Step.md#rollback)

## Properties

### 4

• `Optional` **4**: `boolean`

#### Defined in

[src/workflow-manager.ts:10](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/workflow-manager.ts#L10)

___

### 5

• `Optional` **5**: `boolean`

#### Defined in

[src/workflow-manager.ts:11](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/workflow-manager.ts#L11)

___

### cb

• `Optional` **cb**: (...`args`: `any`[]) => `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

#### Type declaration

▸ (`...args`): `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

#### Defined in

[src/workflow-manager.ts:12](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/workflow-manager.ts#L12)

___

### name

• `Optional` **name**: `string`

#### Defined in

[src/workflow-manager.ts:13](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/workflow-manager.ts#L13)

___

### opts

• `Optional` **opts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `retry` | `number` |

#### Defined in

[src/workflow-manager.ts:14](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/workflow-manager.ts#L14)

___

### rollback

• `Optional` **rollback**: (...`args`: `any`[]) => `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

#### Type declaration

▸ (`...args`): `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

#### Defined in

[src/workflow-manager.ts:17](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/workflow-manager.ts#L17)
