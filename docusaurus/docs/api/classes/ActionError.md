# Class: ActionError

Defined in: [core/actions/src/error/error.ts:5](https://github.com/LaWebcapsule/orbits/blob/0227fc1f241d9ddfb863d821a69fe94c6051b22a/core/actions/src/error/error.ts#L5)

## Extends

- `Error`

## Constructors

### Constructor

> **new ActionError**(`message`, `code`, `otherInfo`): `ActionError`

Defined in: [core/actions/src/error/error.ts:6](https://github.com/LaWebcapsule/orbits/blob/0227fc1f241d9ddfb863d821a69fe94c6051b22a/core/actions/src/error/error.ts#L6)

#### Parameters

##### message

`string` = `''`

##### code

[`errorCodes`](../enumerations/errorCodes.md) = `errorCodes.OTHER`

##### otherInfo

`any` = `null`

#### Returns

`ActionError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: docusaurus/node\_modules/typescript/lib/lib.es2022.error.d.ts:24

#### Inherited from

`Error.cause`

***

### code

> **code**: [`errorCodes`](../enumerations/errorCodes.md) = `errorCodes.OTHER`

Defined in: [core/actions/src/error/error.ts:8](https://github.com/LaWebcapsule/orbits/blob/0227fc1f241d9ddfb863d821a69fe94c6051b22a/core/actions/src/error/error.ts#L8)

***

### message

> **message**: `string` = `''`

Defined in: [core/actions/src/error/error.ts:7](https://github.com/LaWebcapsule/orbits/blob/0227fc1f241d9ddfb863d821a69fe94c6051b22a/core/actions/src/error/error.ts#L7)

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: docusaurus/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### otherInfo

> **otherInfo**: `any` = `null`

Defined in: [core/actions/src/error/error.ts:9](https://github.com/LaWebcapsule/orbits/blob/0227fc1f241d9ddfb863d821a69fe94c6051b22a/core/actions/src/error/error.ts#L9)

***

### stack?

> `optional` **stack**: `string`

Defined in: docusaurus/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

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
