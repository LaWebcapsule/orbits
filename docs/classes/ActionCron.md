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

[src/core/actions/src/action-job.ts:12](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L12)

## Properties

### actions

• **actions**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\>[] = `[]`

#### Defined in

[src/core/actions/src/action-job.ts:9](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L9)

___

### app

• **app**: [`ActionApp`](ActionApp.md)

#### Defined in

[src/core/actions/src/action-job.ts:10](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L10)

___

### maxTimeToConsumeAnAction

• **maxTimeToConsumeAnAction**: `number`

#### Defined in

[src/core/actions/src/action-job.ts:8](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L8)

___

### nDatabaseEmpty

• **nDatabaseEmpty**: `number` = `0`

#### Defined in

[src/core/actions/src/action-job.ts:16](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L16)

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

[src/core/actions/src/action-job.ts:89](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L89)

___

### cycle

▸ **cycle**(): `any`

#### Returns

`any`

#### Defined in

[src/core/actions/src/action-job.ts:43](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L43)

___

### getAction

▸ **getAction**(): `Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> & { `_id`: `ObjectId`  }\>

#### Returns

`Promise`<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)<`any`, `any`, `any`\> & { `_id`: `ObjectId`  }\>

#### Defined in

[src/core/actions/src/action-job.ts:64](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L64)

___

### oneActionCycle

▸ **oneActionCycle**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/core/actions/src/action-job.ts:50](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L50)

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

[src/core/actions/src/action-job.ts:174](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L174)

___

### wait

▸ **wait**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/actions/src/action-job.ts:17](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/action-job.ts#L17)
