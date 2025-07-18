# Class: ActionRuntime

Defined in: [core/actions/src/runtime/action-runtime.ts:38](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L38)

## Constructors

### Constructor

> **new ActionRuntime**(`opts?`): `ActionRuntime`

Defined in: [core/actions/src/runtime/action-runtime.ts:85](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L85)

#### Parameters

##### opts?

[`RuntimeConfig`](../interfaces/RuntimeConfig.md)

#### Returns

`ActionRuntime`

## Properties

### actionFilter?

> `optional` **actionFilter**: `Object`

Defined in: [core/actions/src/runtime/action-runtime.ts:72](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L72)

Used by ActionCron to
filter actions using their `filter` field

***

### ActionModel

> **ActionModel**: `Model`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

Defined in: [core/actions/src/runtime/action-runtime.ts:80](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L80)

***

### bootstrapPath

> **bootstrapPath**: `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:83](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L83)

***

### db

> **db**: [`AppDb`](../interfaces/AppDb.md)

Defined in: [core/actions/src/runtime/action-runtime.ts:74](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L74)

***

### declare

> **declare**: *typeof* [`Action`](Action.md)[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:64](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L64)

***

### importedFiles

> **importedFiles**: `Set`\<`string`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:155](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L155)

***

### imports

> **imports**: *typeof* `ActionRuntime`[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:63](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L63)

***

### logger

> **logger**: `Logger` = `defaultLogger`

Defined in: [core/actions/src/runtime/action-runtime.ts:61](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L61)

***

### numberOfWorker

> **numberOfWorker**: `number` = `3`

Defined in: [core/actions/src/runtime/action-runtime.ts:66](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L66)

***

### rejectBootstrap

> **rejectBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:238](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L238)

***

### resolveBootstrap

> **resolveBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:239](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L239)

***

### ResourceModel

> **ResourceModel**: `Model`\<`ResourceSchemaInterface`\<`any`, `any`\>\>

Defined in: [core/actions/src/runtime/action-runtime.ts:81](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L81)

***

### waitForBootstrap

> **waitForBootstrap**: `Promise`\<`unknown`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:240](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L240)

***

### activeRuntime

> `static` **activeRuntime**: `ActionRuntime`

Defined in: [core/actions/src/runtime/action-runtime.ts:39](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L39)

***

### bootstrapPath

> `static` **bootstrapPath**: `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:49](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L49)

***

### importRuntimeConfig

> `static` **importRuntimeConfig**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:59](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L59)

***

### rejectBootstrap

> `static` **rejectBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:44](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L44)

***

### resolveBootstrap

> `static` **resolveBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:43](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L43)

***

### runtimes

> `static` **runtimes**: `ActionRuntime`[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:41](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L41)

***

### waitForActiveRuntime

> `static` **waitForActiveRuntime**: `Promise`\<`unknown`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:45](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L45)

## Accessors

### boostrapPath

#### Get Signature

> **get** `static` **boostrapPath**(): `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:53](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L53)

##### Deprecated

use bootstrapPath

##### Returns

`string`

## Methods

### bootstrap()

> **bootstrap**(): `Promise`\<`void`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:244](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L244)

#### Returns

`Promise`\<`void`\>

***

### getActionFromRegistry()

> **getActionFromRegistry**(`actionRef`): *typeof* [`Action`](Action.md)

Defined in: [core/actions/src/runtime/action-runtime.ts:127](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L127)

#### Parameters

##### actionRef

`string`

#### Returns

*typeof* [`Action`](Action.md)

***

### getActionRefFromCtr()

> **getActionRefFromCtr**(`action`): `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:135](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L135)

#### Parameters

##### action

*typeof* [`Action`](Action.md)

#### Returns

`string`

***

### getActionRefFromRegistry()

> **getActionRefFromRegistry**(`action`): `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:131](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L131)

#### Parameters

##### action

*typeof* [`Action`](Action.md)

#### Returns

`string`

***

### recursiveImport()

> **recursiveImport**(`pathFile`): `Promise`\<`void`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:197](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L197)

#### Parameters

##### pathFile

`string`

#### Returns

`Promise`\<`void`\>

***

### scanModuleImport()

> **scanModuleImport**(`moduleImport`): `Promise`\<`boolean`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:142](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L142)

#### Parameters

##### moduleImport

`any`

#### Returns

`Promise`\<`boolean`\>

***

### setLogger()

> **setLogger**(`logger`): `void`

Defined in: [core/actions/src/runtime/action-runtime.ts:275](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L275)

#### Parameters

##### logger

`Logger`

#### Returns

`void`

***

### bootstrap()

> `static` **bootstrap**(`config`): `void`

Defined in: [core/actions/src/runtime/action-runtime.ts:280](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L280)

#### Parameters

##### config

[`RuntimeConfig`](../interfaces/RuntimeConfig.md)

#### Returns

`void`

***

### getActiveRuntime()

> `static` **getActiveRuntime**(`opts`): `Promise`\<`ActionRuntime`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:284](https://github.com/LaWebcapsule/orbits/blob/66ea15e0068e5833cb03c092623a7262269820a0/core/actions/src/runtime/action-runtime.ts#L284)

#### Parameters

##### opts

###### timeout

`number` = `...`

#### Returns

`Promise`\<`ActionRuntime`\>
