# Interface: Step

Defined in: [core/actions/src/workflow-manager.ts:18](https://github.com/LaWebcapsule/orbits/blob/926d7670e86e6f73526a4a346bafd3821a9bbf94/core/actions/src/workflow-manager.ts#L18)

## Properties

### 4?

> `optional` **4**: `boolean`

Defined in: [core/actions/src/workflow-manager.ts:19](https://github.com/LaWebcapsule/orbits/blob/926d7670e86e6f73526a4a346bafd3821a9bbf94/core/actions/src/workflow-manager.ts#L19)

***

### 5?

> `optional` **5**: `boolean`

Defined in: [core/actions/src/workflow-manager.ts:20](https://github.com/LaWebcapsule/orbits/blob/926d7670e86e6f73526a4a346bafd3821a9bbf94/core/actions/src/workflow-manager.ts#L20)

***

### cb()?

> `optional` **cb**: (...`args`) => `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`\<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

Defined in: [core/actions/src/workflow-manager.ts:21](https://github.com/LaWebcapsule/orbits/blob/926d7670e86e6f73526a4a346bafd3821a9bbf94/core/actions/src/workflow-manager.ts#L21)

#### Parameters

##### args

...[`StepResult`](../type-aliases/StepResult.md)[]

#### Returns

`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`\<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

***

### name?

> `optional` **name**: `string`

Defined in: [core/actions/src/workflow-manager.ts:24](https://github.com/LaWebcapsule/orbits/blob/926d7670e86e6f73526a4a346bafd3821a9bbf94/core/actions/src/workflow-manager.ts#L24)

***

### opts?

> `optional` **opts**: `object`

Defined in: [core/actions/src/workflow-manager.ts:25](https://github.com/LaWebcapsule/orbits/blob/926d7670e86e6f73526a4a346bafd3821a9bbf94/core/actions/src/workflow-manager.ts#L25)

#### retry

> **retry**: `number`

***

### rollback()?

> `optional` **rollback**: (...`args`) => `void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`\<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>

Defined in: [core/actions/src/workflow-manager.ts:28](https://github.com/LaWebcapsule/orbits/blob/926d7670e86e6f73526a4a346bafd3821a9bbf94/core/actions/src/workflow-manager.ts#L28)

#### Parameters

##### args

...[`StepResult`](../type-aliases/StepResult.md)[]

#### Returns

`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[] \| `Promise`\<`void` \| [`Action`](../classes/Action.md) \| [`Action`](../classes/Action.md)[]\>
