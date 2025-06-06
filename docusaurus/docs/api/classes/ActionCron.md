# Class: ActionCron

Defined in: [core/actions/src/action-job.ts:8](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L8)

## Constructors

### Constructor

> **new ActionCron**(`filter?`): `ActionCron`

Defined in: [core/actions/src/action-job.ts:14](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L14)

#### Parameters

##### filter?

`Object`

#### Returns

`ActionCron`

## Properties

### actions

> **actions**: [`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>[] = `[]`

Defined in: [core/actions/src/action-job.ts:10](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L10)

***

### app

> **app**: [`ActionApp`](ActionApp.md) = `ActionApp.activeApp`

Defined in: [core/actions/src/action-job.ts:11](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L11)

***

### filter?

> `optional` **filter**: `Object`

Defined in: [core/actions/src/action-job.ts:12](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L12)

***

### maxTimeToConsumeAnAction

> **maxTimeToConsumeAnAction**: `number`

Defined in: [core/actions/src/action-job.ts:9](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L9)

***

### nDatabaseEmpty

> **nDatabaseEmpty**: `number` = `0`

Defined in: [core/actions/src/action-job.ts:22](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L22)

## Methods

### consumeAction()

> **consumeAction**(`actionDb`): `Promise`\<`any`\>

Defined in: [core/actions/src/action-job.ts:99](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L99)

#### Parameters

##### actionDb

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`\>

#### Returns

`Promise`\<`any`\>

***

### cycle()

> **cycle**(): `any`

Defined in: [core/actions/src/action-job.ts:49](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L49)

#### Returns

`any`

***

### getAction()

> **getAction**(): `Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\> & `object`\>

Defined in: [core/actions/src/action-job.ts:70](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L70)

#### Returns

`Promise`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\> & `object`\>

***

### oneActionCycle()

> **oneActionCycle**(): `Promise`\<`any`\>

Defined in: [core/actions/src/action-job.ts:56](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L56)

#### Returns

`Promise`\<`any`\>

***

### resyncWithDb()

> **resyncWithDb**(`action`): `Promise`\<[`Action`](Action.md)\>

Defined in: [core/actions/src/action-job.ts:188](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L188)

#### Parameters

##### action

`any`

#### Returns

`Promise`\<[`Action`](Action.md)\>

***

### wait()

> **wait**(): `Promise`\<`void`\>

Defined in: [core/actions/src/action-job.ts:23](https://github.com/LaWebcapsule/orbits/blob/bf61656fb93c3816eb39d899bbc365fbc0c278b9/core/actions/src/action-job.ts#L23)

#### Returns

`Promise`\<`void`\>
