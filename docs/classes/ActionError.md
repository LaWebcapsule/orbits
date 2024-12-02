[@wbce/orbits](../README.md) / [Exports](../modules.md) / ActionError

# Class: ActionError

## Hierarchy

- `Error`

  ↳ **`ActionError`**

## Table of contents

### Constructors

- [constructor](ActionError.md#constructor)

### Properties

- [code](ActionError.md#code)
- [message](ActionError.md#message)
- [name](ActionError.md#name)
- [otherInfo](ActionError.md#otherinfo)
- [stack](ActionError.md#stack)
- [prepareStackTrace](ActionError.md#preparestacktrace)
- [stackTraceLimit](ActionError.md#stacktracelimit)

### Methods

- [captureStackTrace](ActionError.md#capturestacktrace)

## Constructors

### constructor

• **new ActionError**(`message?`, `code?`, `otherInfo?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `''` |
| `code` | [`errorCodes`](../enums/errorCodes.md) | `errorCodes.OTHER` |
| `otherInfo` | `any` | `null` |

#### Overrides

Error.constructor

#### Defined in

[src/core/actions/src/error/error.ts:5](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/error/error.ts#L5)

## Properties

### code

• **code**: [`errorCodes`](../enums/errorCodes.md) = `errorCodes.OTHER`

#### Defined in

[src/core/actions/src/error/error.ts:7](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/error/error.ts#L7)

___

### message

• **message**: `string` = `''`

#### Inherited from

Error.message

#### Defined in

[src/core/actions/src/error/error.ts:6](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/error/error.ts#L6)

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.es5.d.ts:1053

___

### otherInfo

• **otherInfo**: `any` = `null`

#### Defined in

[src/core/actions/src/error/error.ts:8](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/error/error.ts#L8)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/.pnpm/@types+node@18.19.67/node_modules/@types/node/globals.d.ts:98

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/.pnpm/@types+node@18.19.67/node_modules/@types/node/globals.d.ts:100

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/.pnpm/@types+node@18.19.67/node_modules/@types/node/globals.d.ts:91
