# Interface: Step

Defined in: [core/actions/src/workflow-manager.ts:19](https://github.com/LaWebcapsule/orbits/blob/fdabe4406970f5d9afffe326fe940d326210b361/core/actions/src/workflow-manager.ts#L19)

## Properties

### 4?

> `optional` **4**: `boolean`

Defined in: [core/actions/src/workflow-manager.ts:20](https://github.com/LaWebcapsule/orbits/blob/fdabe4406970f5d9afffe326fe940d326210b361/core/actions/src/workflow-manager.ts#L20)

***

### 5?

> `optional` **5**: `boolean`

Defined in: [core/actions/src/workflow-manager.ts:21](https://github.com/LaWebcapsule/orbits/blob/fdabe4406970f5d9afffe326fe940d326210b361/core/actions/src/workflow-manager.ts#L21)

***

### cb()?

> `optional` **cb**: (...`args`) => `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`\<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

Defined in: [core/actions/src/workflow-manager.ts:22](https://github.com/LaWebcapsule/orbits/blob/fdabe4406970f5d9afffe326fe940d326210b361/core/actions/src/workflow-manager.ts#L22)

#### Parameters

##### args

...[`StepResult`](../type-aliases/StepResult.md)[]

#### Returns

`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`\<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

***

### name?

> `optional` **name**: `string`

Defined in: [core/actions/src/workflow-manager.ts:25](https://github.com/LaWebcapsule/orbits/blob/fdabe4406970f5d9afffe326fe940d326210b361/core/actions/src/workflow-manager.ts#L25)

***

### opts?

> `optional` **opts**: `object`

Defined in: [core/actions/src/workflow-manager.ts:26](https://github.com/LaWebcapsule/orbits/blob/fdabe4406970f5d9afffe326fe940d326210b361/core/actions/src/workflow-manager.ts#L26)

#### retry

> **retry**: `number`

***

### rollback()?

> `optional` **rollback**: (...`args`) => `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`\<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

Defined in: [core/actions/src/workflow-manager.ts:29](https://github.com/LaWebcapsule/orbits/blob/fdabe4406970f5d9afffe326fe940d326210b361/core/actions/src/workflow-manager.ts#L29)

#### Parameters

##### args

...[`StepResult`](../type-aliases/StepResult.md)[]

#### Returns

`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`\<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>
