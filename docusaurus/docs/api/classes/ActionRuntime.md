# Class: ActionRuntime

Defined in: [core/actions/src/runtime/action-runtime.ts:38](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L38)

## Constructors

### Constructor

> **new ActionRuntime**(`opts?`): `ActionRuntime`

Defined in: [core/actions/src/runtime/action-runtime.ts:79](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L79)

#### Parameters

##### opts?

[`RuntimeConfig`](../interfaces/RuntimeConfig.md)

#### Returns

`ActionRuntime`

## Properties

### actionFilter?

> `optional` **actionFilter**: `Object`

Defined in: [core/actions/src/runtime/action-runtime.ts:66](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L66)

Used by ActionCron to
filter actions using their `filter` field

***

### ActionModel

> **ActionModel**: `Model`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

Defined in: [core/actions/src/runtime/action-runtime.ts:74](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L74)

***

### bootstrapPath

> **bootstrapPath**: `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:77](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L77)

***

### db

> **db**: [`AppDb`](../interfaces/AppDb.md)

Defined in: [core/actions/src/runtime/action-runtime.ts:68](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L68)

***

### declare

> **declare**: *typeof* [`Action`](Action.md)[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:58](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L58)

***

### importedFiles

> **importedFiles**: `Set`\<`string`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:149](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L149)

***

### imports

> **imports**: *typeof* `ActionRuntime`[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:57](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L57)

***

### logger

> **logger**: `Logger` = `defaultLogger`

Defined in: [core/actions/src/runtime/action-runtime.ts:55](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L55)

***

### numberOfWorker

> **numberOfWorker**: `number` = `3`

Defined in: [core/actions/src/runtime/action-runtime.ts:60](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L60)

***

### rejectBootstrap

> **rejectBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:232](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L232)

***

### resolveBootstrap

> **resolveBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:233](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L233)

***

### ResourceModel

> **ResourceModel**: `Model`\<`ResourceSchemaInterface`\<`any`, `any`\>\>

Defined in: [core/actions/src/runtime/action-runtime.ts:75](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L75)

***

### waitForBootstrap

> **waitForBootstrap**: `Promise`\<`unknown`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:234](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L234)

***

### activeRuntime

> `static` **activeRuntime**: `ActionRuntime`

Defined in: [core/actions/src/runtime/action-runtime.ts:39](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L39)

***

### bootstrapPath

> `static` **bootstrapPath**: `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:49](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L49)

***

### importRuntimeConfig

> `static` **importRuntimeConfig**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:53](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L53)

***

### rejectBootstrap

> `static` **rejectBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:44](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L44)

***

### resolveBootstrap

> `static` **resolveBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:43](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L43)

***

### runtimes

> `static` **runtimes**: `ActionRuntime`[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:41](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L41)

***

### waitForActiveRuntime

> `static` **waitForActiveRuntime**: `Promise`\<`unknown`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:45](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L45)

## Methods

### bootstrap()

> **bootstrap**(): `Promise`\<`void`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:238](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L238)

#### Returns

`Promise`\<`void`\>

***

### getActionFromRegistry()

> **getActionFromRegistry**(`actionRef`): *typeof* [`Action`](Action.md)

Defined in: [core/actions/src/runtime/action-runtime.ts:121](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L121)

#### Parameters

##### actionRef

`string`

#### Returns

*typeof* [`Action`](Action.md)

***

### getActionRefFromCtr()

> **getActionRefFromCtr**(`action`): `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:129](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L129)

#### Parameters

##### action

*typeof* [`Action`](Action.md)

#### Returns

`string`

***

### getActionRefFromRegistry()

> **getActionRefFromRegistry**(`action`): `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:125](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L125)

#### Parameters

##### action

*typeof* [`Action`](Action.md)

#### Returns

`string`

***

### recursiveImport()

> **recursiveImport**(`pathFile`): `Promise`\<`void`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:191](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L191)

#### Parameters

##### pathFile

`string`

#### Returns

`Promise`\<`void`\>

***

### scanModuleImport()

> **scanModuleImport**(`moduleImport`): `Promise`\<`boolean`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:136](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L136)

#### Parameters

##### moduleImport

`any`

#### Returns

`Promise`\<`boolean`\>

***

### setLogger()

> **setLogger**(`logger`): `void`

Defined in: [core/actions/src/runtime/action-runtime.ts:269](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L269)

#### Parameters

##### logger

`Logger`

#### Returns

`void`

***

### bootstrap()

> `static` **bootstrap**(`config`): `void`

Defined in: [core/actions/src/runtime/action-runtime.ts:274](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L274)

#### Parameters

##### config

[`RuntimeConfig`](../interfaces/RuntimeConfig.md)

#### Returns

`void`

***

### getActiveRuntime()

> `static` **getActiveRuntime**(`opts`): `Promise`\<`ActionRuntime`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:278](https://github.com/LaWebcapsule/orbits/blob/504560817f25458d3fb6654ab2ed313dea8d3ae0/core/actions/src/runtime/action-runtime.ts#L278)

#### Parameters

##### opts

###### timeout

`number` = `...`

#### Returns

`Promise`\<`ActionRuntime`\>
