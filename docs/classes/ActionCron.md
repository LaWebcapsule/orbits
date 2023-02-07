[@wbce/orbits](../README.md) / [Exports](../modules.md) / ActionCron

# Class: ActionCron

## Table of contents

### Constructors

- [constructor](ActionCron.md#constructor)

### Properties

- [actions](ActionCron.md#actions)
- [app](ActionCron.md#app)
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

• **new ActionCron**()

#### Defined in

[src/action-job.ts:14](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L14)

## Properties

### actions

• **actions**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>[] = `[]`

#### Defined in

[src/action-job.ts:10](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L10)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Defined in

[src/action-job.ts:11](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L11)

___

### maxTimeToConsumeAnAction

• **maxTimeToConsumeAnAction**: `number`

#### Defined in

[src/action-job.ts:9](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L9)

___

### nDatabaseEmpty

• **nDatabaseEmpty**: `number` = `0`

#### Defined in

[src/action-job.ts:18](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L18)

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

[src/action-job.ts:88](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L88)

___

### cycle

▸ **cycle**(): `any`

#### Returns

`any`

#### Defined in

[src/action-job.ts:46](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L46)

___

### getAction

▸ **getAction**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> & { `_id`: `ObjectId`  }\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> & { `_id`: `ObjectId`  }\>

#### Defined in

[src/action-job.ts:69](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L69)

___

### oneActionCycle

▸ **oneActionCycle**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/action-job.ts:56](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L56)

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

[src/action-job.ts:135](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L135)

___

### wait

▸ **wait**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/action-job.ts:19](https://github.com/LaWebcapsule/orbits/blob/96719ff/src/core/actions/src/action-job.ts#L19)
