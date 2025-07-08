[@orbi-ts/orbits](../README.md) / [Exports](../modules.md) / ActionCron

# Class: ActionCron

## Table of contents

### Constructors

- [constructor](ActionCron.md#constructor)

### Properties

- [actions](ActionCron.md#actions)
- [app](ActionCron.md#app)
- [filter](ActionCron.md#filter)
- [maxTimeToConsumeAnAction](ActionCron.md#maxtimetoconsumeanaction)
- [nDatabaseEmpty](ActionCron.md#ndatabaseempty)

### Methods

- [consumeAction](ActionCron.md#consumeaction)
- [cycle](ActionCron.md#cycle)
- [getAction](ActionCron.md#getaction)
- [oneActionCycle](ActionCron.md#oneactioncycle)
- [resyncWithDb](ActionCron.md#resyncwithdb)
- [wait](ActionCron.md#wait)

## Constructors

### constructor

• **new ActionCron**(`filter?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter?` | `Object` |

#### Defined in

[src/core/actions/src/action-job.ts:13](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L13)

## Properties

### actions

• **actions**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>[] = `[]`

#### Defined in

[src/core/actions/src/action-job.ts:9](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L9)

___

### app

• **app**: [`ActionRuntime`](ActionRuntime.md)

#### Defined in

[src/core/actions/src/action-job.ts:10](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L10)

___

### filter

• `Optional` **filter**: `Object`

#### Defined in

[src/core/actions/src/action-job.ts:11](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L11)

___

### maxTimeToConsumeAnAction

• **maxTimeToConsumeAnAction**: `number`

#### Defined in

[src/core/actions/src/action-job.ts:8](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L8)

___

### nDatabaseEmpty

• **nDatabaseEmpty**: `number` = `0`

#### Defined in

[src/core/actions/src/action-job.ts:18](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L18)

## Methods

### consumeAction

▸ **consumeAction**(`actionDb`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionDb` | [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/core/actions/src/action-job.ts:92](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L92)

___

### cycle

▸ **cycle**(): `any`

#### Returns

`any`

#### Defined in

[src/core/actions/src/action-job.ts:45](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L45)

___

### getAction

▸ **getAction**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> & { `_id`: `ObjectId`  }\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> & { `_id`: `ObjectId`  }\>

#### Defined in

[src/core/actions/src/action-job.ts:66](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L66)

___

### oneActionCycle

▸ **oneActionCycle**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/core/actions/src/action-job.ts:52](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L52)

___

### resyncWithDb

▸ **resyncWithDb**(`action`): `Promise`<[`Action`](Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `any` |

#### Returns

`Promise`<[`Action`](Action.md)\>

#### Defined in

[src/core/actions/src/action-job.ts:177](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L177)

___

### wait

▸ **wait**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/actions/src/action-job.ts:19](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/action-job.ts#L19)
