[@wbce/orbits](../README.md) / [Exports](../modules.md) / StepResult

# Interface: StepResult<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

- [actionId](StepResult.md#actionid)
- [actionRef](StepResult.md#actionref)
- [isError](StepResult.md#iserror)
- [parentStepId](StepResult.md#parentstepid)
- [parentStepName](StepResult.md#parentstepname)
- [result](StepResult.md#result)
- [state](StepResult.md#state)

## Properties

### actionId

• **actionId**: `string`

#### Defined in

[src/core/actions/src/workflow-manager.ts:13](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/workflow-manager.ts#L13)

___

### actionRef

• **actionRef**: `string`

#### Defined in

[src/core/actions/src/workflow-manager.ts:12](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/workflow-manager.ts#L12)

___

### isError

• **isError**: `boolean`

#### Defined in

[src/core/actions/src/workflow-manager.ts:11](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/workflow-manager.ts#L11)

___

### parentStepId

• **parentStepId**: `number`

#### Defined in

[src/core/actions/src/workflow-manager.ts:14](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/workflow-manager.ts#L14)

___

### parentStepName

• **parentStepName**: `string`

#### Defined in

[src/core/actions/src/workflow-manager.ts:15](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/workflow-manager.ts#L15)

___

### result

• **result**: `T`

#### Defined in

[src/core/actions/src/workflow-manager.ts:10](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/workflow-manager.ts#L10)

___

### state

• **state**: [`SUCCESS`](../enums/ActionState.md#success) \| [`ERROR`](../enums/ActionState.md#error)

#### Defined in

[src/core/actions/src/workflow-manager.ts:9](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/workflow-manager.ts#L9)
