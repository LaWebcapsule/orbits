# Class: ActionApp

Defined in: [core/actions/src/app/action-app.ts:32](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L32)

## Constructors

### Constructor

> **new ActionApp**(`opts?`): `ActionApp`

Defined in: [core/actions/src/app/action-app.ts:81](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L81)

#### Parameters

##### opts?

[`ActionAppConfig`](../interfaces/ActionAppConfig.md)

#### Returns

`ActionApp`

## Properties

### actionFilter?

> `optional` **actionFilter**: `Object`

Defined in: [core/actions/src/app/action-app.ts:66](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L66)

Used by ActionCron to
filter actions using their `filter` field

***

### ActionModel

> **ActionModel**: `Model`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

Defined in: [core/actions/src/app/action-app.ts:74](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L74)

***

### bootstrapPath

> **bootstrapPath**: `string`

Defined in: [core/actions/src/app/action-app.ts:79](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L79)

***

### db

> **db**: [`AppDb`](../interfaces/AppDb.md)

Defined in: [core/actions/src/app/action-app.ts:68](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L68)

***

### declare

> **declare**: *typeof* [`Action`](Action.md)[] = `[]`

Defined in: [core/actions/src/app/action-app.ts:58](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L58)

***

### importedFiles

> **importedFiles**: `Set`\<`string`\>

Defined in: [core/actions/src/app/action-app.ts:138](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L138)

***

### imports

> **imports**: *typeof* `ActionApp`[] = `[]`

Defined in: [core/actions/src/app/action-app.ts:57](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L57)

***

### logger

> **logger**: `Logger` = `defaultLogger`

Defined in: [core/actions/src/app/action-app.ts:55](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L55)

***

### numberOfWorker

> **numberOfWorker**: `number` = `3`

Defined in: [core/actions/src/app/action-app.ts:60](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L60)

***

### rejectBootstrap

> **rejectBootstrap**: `any`

Defined in: [core/actions/src/app/action-app.ts:192](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L192)

***

### resolveBootstrap

> **resolveBootstrap**: `any`

Defined in: [core/actions/src/app/action-app.ts:193](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L193)

***

### ResourceModel

> **ResourceModel**: `Model`\<`ResourceSchemaInterface`\>

Defined in: [core/actions/src/app/action-app.ts:75](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L75)

***

### waitForBootstrap

> **waitForBootstrap**: `Promise`\<`unknown`\>

Defined in: [core/actions/src/app/action-app.ts:194](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L194)

***

### activeApp

> `static` **activeApp**: `ActionApp`

Defined in: [core/actions/src/app/action-app.ts:33](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L33)

***

### apps

> `static` **apps**: `ActionApp`[] = `[]`

Defined in: [core/actions/src/app/action-app.ts:35](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L35)

***

### bootstrapPath

> `static` **bootstrapPath**: `string`

Defined in: [core/actions/src/app/action-app.ts:43](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L43)

***

### executedVia

> `static` **executedVia**: `"ts"` \| `"js"`

Defined in: [core/actions/src/app/action-app.ts:145](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L145)

***

### importAppConfig

> `static` **importAppConfig**: `any`

Defined in: [core/actions/src/app/action-app.ts:53](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L53)

***

### rejectBootstrap

> `static` **rejectBootstrap**: `any`

Defined in: [core/actions/src/app/action-app.ts:38](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L38)

***

### resolveBootstrap

> `static` **resolveBootstrap**: `any`

Defined in: [core/actions/src/app/action-app.ts:37](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L37)

***

### waitForActiveApp

> `static` **waitForActiveApp**: `Promise`\<`unknown`\>

Defined in: [core/actions/src/app/action-app.ts:39](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L39)

## Accessors

### boostrapPath

#### Get Signature

> **get** `static` **boostrapPath**(): `string`

Defined in: [core/actions/src/app/action-app.ts:47](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L47)

##### Deprecated

use bootstrapPath

##### Returns

`string`

## Methods

### bootstrap()

> **bootstrap**(): `Promise`\<`void`\>

Defined in: [core/actions/src/app/action-app.ts:198](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L198)

#### Returns

`Promise`\<`void`\>

***

### getActionFromRegistry()

> **getActionFromRegistry**(`actionRef`): *typeof* [`Action`](Action.md)

Defined in: [core/actions/src/app/action-app.ts:120](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L120)

#### Parameters

##### actionRef

`string`

#### Returns

*typeof* [`Action`](Action.md)

***

### getActionRefFromRegistry()

> **getActionRefFromRegistry**(`action`): `string`

Defined in: [core/actions/src/app/action-app.ts:124](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L124)

#### Parameters

##### action

*typeof* [`Action`](Action.md)

#### Returns

`string`

***

### recursiveImport()

> **recursiveImport**(`pathFile`): `Promise`\<`void`\>

Defined in: [core/actions/src/app/action-app.ts:148](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L148)

#### Parameters

##### pathFile

`string`

#### Returns

`Promise`\<`void`\>

***

### scanModuleImport()

> **scanModuleImport**(`moduleImport`): `Promise`\<`void`\>

Defined in: [core/actions/src/app/action-app.ts:128](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L128)

#### Parameters

##### moduleImport

`any`

#### Returns

`Promise`\<`void`\>

***

### bootstrap()

> `static` **bootstrap**(`config`): `void`

Defined in: [core/actions/src/app/action-app.ts:224](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L224)

#### Parameters

##### config

[`ActionAppConfig`](../interfaces/ActionAppConfig.md)

#### Returns

`void`

***

### getActiveApp()

> `static` **getActiveApp**(`opts`): `Promise`\<`ActionApp`\>

Defined in: [core/actions/src/app/action-app.ts:228](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L228)

#### Parameters

##### opts

###### timeout

`number` = `...`

#### Returns

`Promise`\<`ActionApp`\>

***

### setExecutedVia()

> `static` **setExecutedVia**(): `"ts"` \| `"js"`

Defined in: [core/actions/src/app/action-app.ts:139](https://github.com/LaWebcapsule/orbits/blob/005da96cd1cd634f11172ebcc8f82d8d36aba627/core/actions/src/app/action-app.ts#L139)

#### Returns

`"ts"` \| `"js"`
