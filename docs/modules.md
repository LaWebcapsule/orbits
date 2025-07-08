[@orbi-ts/orbits](README.md) / Exports

# @orbi-ts/orbits

## Table of contents

### Enumerations

- [ActionState](enums/ActionState.md)
- [errorCodes](enums/errorCodes.md)

### Classes

- [Action](classes/Action.md)
- [ActionRuntime](classes/ActionRuntime.md)
- [ActionCron](classes/ActionCron.md)
- [ActionError](classes/ActionError.md)
- [BreakingActionState](classes/BreakingActionState.md)
- [CoreActionRuntime](classes/CoreActionRuntime.md)
- [Executor](classes/Executor.md)
- [RejectAction](classes/RejectAction.md)
- [ResolveAction](classes/ResolveAction.md)
- [RevertAction](classes/RevertAction.md)
- [RevertWorkflow](classes/RevertWorkflow.md)
- [RollBackAction](classes/RollBackAction.md)
- [Workflow](classes/Workflow.md)

### Interfaces

- [ActionRuntimeConfig](interfaces/ActionRuntimeConfig.md)
- [ActionSchemaInterface](interfaces/ActionSchemaInterface.md)
- [AppDb](interfaces/AppDb.md)
- [Step](interfaces/Step.md)
- [StepResult](interfaces/StepResult.md)

### Variables

- [actionSchema](modules.md#actionschema)

### Functions

- [bootstrapApp](modules.md#bootstrapapp)

## Variables

### actionSchema

• `Const` **actionSchema**: `Schema`<`any`, `Model`<`any`, `any`, `any`, `any`, `any`\>, {}, {}, {}, {}, `ResolveSchemaOptions`<{ `minimize`: ``false`` = false; `timestamps`: ``true`` = true }\>, { `createdAt`: `NativeDate` ; `updatedAt`: `NativeDate`  } & { `actionRef`: `string` ; `argument`: `any` ; `bag`: `any` ; `cronActivity`: { pending: boolean; frequence?: number; frequency?: number; lastActivity?: Date; nextActivity?: Date; } ; `definitionFrom`: { workflow?: { \_id?: string; ref?: string; stepIndex?: number; stepName?: string; marker?: string; }; } ; `delays`: { 1?: number; 2?: number; } ; `filter`: `any` ; `locked`: `boolean` ; `lockedAt`: `Date` ; `nExecutions`: { 4: number; 5: number; } ; `nTimes`: `number` ; `repeat`: { 4: number; 5: number; } ; `result`: `any` ; `state`: `number` ; `stateUpdatedAt`: `Date` ; `workflowId`: `string` ; `workflowStack`: { \_id?: string; ref?: string; stepIndex?: number; stepName?: string; }[] ; `workflowStep`: `number`  }\>

#### Defined in

[src/core/actions/src/models/action.ts:84](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/models/action.ts#L84)

## Functions

### bootstrapApp

▸ **bootstrapApp**(`opts`): (`classTargetConstructor`: `any`) => `void`

Bootstrap an app, used as decorator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`ActionRuntimeConfig`](interfaces/ActionRuntimeConfig.md) \| () => [`ActionRuntimeConfig`](interfaces/ActionRuntimeConfig.md) \| `Promise`<[`ActionRuntimeConfig`](interfaces/ActionRuntimeConfig.md)\> | `ActionRuntimeConfig \| (() => (ActionRuntimeConfig\|Promise<ActionRuntimeConfig>))` Either an object of class `ActionRuntimeConfig` or a callback returning a Promise that return an `ActionRuntimeConfig`. |

#### Returns

`fn`

▸ (`classTargetConstructor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `classTargetConstructor` | `any` |

##### Returns

`void`

#### Defined in

[src/core/actions/src/app/action-app.ts:157](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L157)
