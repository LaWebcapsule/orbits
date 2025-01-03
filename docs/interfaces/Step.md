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

[src/core/actions/src/workflow-manager.ts:19](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L19)

___

### 5

• `Optional` **5**: `boolean`

#### Defined in

[src/core/actions/src/workflow-manager.ts:20](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L20)

___

### cb

• `Optional` **cb**: (...`args`: [`StepResult`](StepResult.md)<`any`\>[]) => `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

#### Type declaration

▸ (`...args`): `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`StepResult`](StepResult.md)<`any`\>[] |

##### Returns

`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

#### Defined in

[src/core/actions/src/workflow-manager.ts:21](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L21)

___

### name

• `Optional` **name**: `string`

#### Defined in

[src/core/actions/src/workflow-manager.ts:24](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L24)

___

### opts

• `Optional` **opts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `retry` | `number` |

#### Defined in

[src/core/actions/src/workflow-manager.ts:25](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L25)

___

### rollback

• `Optional` **rollback**: (...`args`: [`StepResult`](StepResult.md)<`any`\>[]) => `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

#### Type declaration

▸ (`...args`): `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`StepResult`](StepResult.md)<`any`\>[] |

##### Returns

`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

#### Defined in

[src/core/actions/src/workflow-manager.ts:28](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/workflow-manager.ts#L28)
