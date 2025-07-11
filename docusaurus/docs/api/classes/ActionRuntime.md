# Class: ActionRuntime

Defined in: [core/actions/src/runtime/action-runtime.ts:39](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L39)

## Constructors

### Constructor

> **new ActionRuntime**(`opts?`): `ActionRuntime`

Defined in: [core/actions/src/runtime/action-runtime.ts:86](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L86)

#### Parameters

##### opts?

[`RuntimeConfig`](../interfaces/RuntimeConfig.md)

#### Returns

`ActionRuntime`

## Properties

### actionFilter?

> `optional` **actionFilter**: `Object`

Defined in: [core/actions/src/runtime/action-runtime.ts:73](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L73)

Used by ActionCron to
filter actions using their `filter` field

***

### ActionModel

> **ActionModel**: `Model`\<[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)\<`any`, `any`, `any`\>\>

Defined in: [core/actions/src/runtime/action-runtime.ts:81](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L81)

***

### bootstrapPath

> **bootstrapPath**: `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:84](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L84)

***

### db

> **db**: [`AppDb`](../interfaces/AppDb.md)

Defined in: [core/actions/src/runtime/action-runtime.ts:75](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L75)

***

### declare

> **declare**: *typeof* [`Action`](Action.md)[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:65](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L65)

***

### importedFiles

> **importedFiles**: `Set`\<`string`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:156](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L156)

***

### imports

> **imports**: *typeof* `ActionRuntime`[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:64](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L64)

***

### logger

> **logger**: `Logger` = `defaultLogger`

Defined in: [core/actions/src/runtime/action-runtime.ts:62](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L62)

***

### numberOfWorker

> **numberOfWorker**: `number` = `3`

Defined in: [core/actions/src/runtime/action-runtime.ts:67](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L67)

***

### rejectBootstrap

> **rejectBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:241](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L241)

***

### resolveBootstrap

> **resolveBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:242](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L242)

***

### ResourceModel

> **ResourceModel**: `Model`\<`ResourceSchemaInterface`\<`any`, `any`\>\>

Defined in: [core/actions/src/runtime/action-runtime.ts:82](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L82)

***

### waitForBootstrap

> **waitForBootstrap**: `Promise`\<`unknown`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:243](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L243)

***

### activeRuntime

> `static` **activeRuntime**: `ActionRuntime`

Defined in: [core/actions/src/runtime/action-runtime.ts:40](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L40)

***

### bootstrapPath

> `static` **bootstrapPath**: `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:50](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L50)

***

### importRuntimeConfig

> `static` **importRuntimeConfig**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:60](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L60)

***

### rejectBootstrap

> `static` **rejectBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:45](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L45)

***

### resolveBootstrap

> `static` **resolveBootstrap**: `any`

Defined in: [core/actions/src/runtime/action-runtime.ts:44](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L44)

***

### runtimes

> `static` **runtimes**: `ActionRuntime`[] = `[]`

Defined in: [core/actions/src/runtime/action-runtime.ts:42](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L42)

***

### waitForActiveRuntime

> `static` **waitForActiveRuntime**: `Promise`\<`unknown`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:46](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L46)

## Accessors

### boostrapPath

#### Get Signature

> **get** `static` **boostrapPath**(): `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:54](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L54)

##### Deprecated

use bootstrapPath

##### Returns

`string`

## Methods

### bootstrap()

> **bootstrap**(): `Promise`\<`void`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:247](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L247)

#### Returns

`Promise`\<`void`\>

***

### getActionFromRegistry()

> **getActionFromRegistry**(`actionRef`): *typeof* [`Action`](Action.md)

Defined in: [core/actions/src/runtime/action-runtime.ts:128](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L128)

#### Parameters

##### actionRef

`string`

#### Returns

*typeof* [`Action`](Action.md)

***

### getActionRefFromCtr()

> **getActionRefFromCtr**(`action`): `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:136](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L136)

#### Parameters

##### action

*typeof* [`Action`](Action.md)

#### Returns

`string`

***

### getActionRefFromRegistry()

> **getActionRefFromRegistry**(`action`): `string`

Defined in: [core/actions/src/runtime/action-runtime.ts:132](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L132)

#### Parameters

##### action

*typeof* [`Action`](Action.md)

#### Returns

`string`

***

### recursiveImport()

> **recursiveImport**(`pathFile`): `Promise`\<`void`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:200](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L200)

#### Parameters

##### pathFile

`string`

#### Returns

`Promise`\<`void`\>

***

### scanModuleImport()

> **scanModuleImport**(`moduleImport`): `Promise`\<`boolean`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:143](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L143)

#### Parameters

##### moduleImport

`any`

#### Returns

`Promise`\<`boolean`\>

***

### setLogger()

> **setLogger**(`logger`): `void`

Defined in: [core/actions/src/runtime/action-runtime.ts:276](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L276)

#### Parameters

##### logger

`Logger`

#### Returns

`void`

***

### bootstrap()

> `static` **bootstrap**(`config`): `void`

Defined in: [core/actions/src/runtime/action-runtime.ts:281](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L281)

#### Parameters

##### config

[`RuntimeConfig`](../interfaces/RuntimeConfig.md)

#### Returns

`void`

***

### getActiveRuntime()

> `static` **getActiveRuntime**(`opts`): `Promise`\<`ActionRuntime`\>

Defined in: [core/actions/src/runtime/action-runtime.ts:285](https://github.com/LaWebcapsule/orbits/blob/bbbd9eebce5770238b908654ee2aa6d801856ff0/core/actions/src/runtime/action-runtime.ts#L285)

#### Parameters

##### opts

###### timeout

`number` = `...`

#### Returns

`Promise`\<`ActionRuntime`\>
