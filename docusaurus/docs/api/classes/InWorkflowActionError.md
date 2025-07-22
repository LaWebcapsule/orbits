# Class: InWorkflowActionError

Defined in: [core/actions/src/error/error.ts:15](https://github.com/LaWebcapsule/orbits/blob/9dfb205b4c535735246a802b81e1b3b887b61283/core/actions/src/error/error.ts#L15)

## Extends

- `Error`

## Constructors

### Constructor

> **new InWorkflowActionError**(`workflow`, `ref`, `action`): `InWorkflowActionError`

Defined in: [core/actions/src/error/error.ts:27](https://github.com/LaWebcapsule/orbits/blob/9dfb205b4c535735246a802b81e1b3b887b61283/core/actions/src/error/error.ts#L27)

#### Parameters

##### workflow

[`Workflow`](Workflow.md)

##### ref

`string`

##### action

[`ActionSchemaInterface`](../interfaces/ActionSchemaInterface.md)

#### Returns

`InWorkflowActionError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: docusaurus/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

***

### message

> **message**: `string`

Defined in: docusaurus/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: docusaurus/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### rootAction

> **rootAction**: `object`

Defined in: [core/actions/src/error/error.ts:22](https://github.com/LaWebcapsule/orbits/blob/9dfb205b4c535735246a802b81e1b3b887b61283/core/actions/src/error/error.ts#L22)

#### \_id

> **\_id**: `string`

#### actionRef

> **actionRef**: `string`

***

### stack?

> `optional` **stack**: `string`

Defined in: docusaurus/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### workflowTrace

> **workflowTrace**: `object`[] = `[]`

Defined in: [core/actions/src/error/error.ts:16](https://github.com/LaWebcapsule/orbits/blob/9dfb205b4c535735246a802b81e1b3b887b61283/core/actions/src/error/error.ts#L16)

#### ref

> **ref**: `string`

#### workflowCtr

> **workflowCtr**: `string`

#### workflowId

> **workflowId**: `string`

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@18.19.67/node\_modules/@types/node/globals.d.ts:98

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@18.19.67/node\_modules/@types/node/globals.d.ts:100

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/.pnpm/@types+node@18.19.67/node\_modules/@types/node/globals.d.ts:91

Create .stack property on a target object

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`
