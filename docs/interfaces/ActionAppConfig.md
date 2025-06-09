[@wbce/orbits](../README.md) / [Exports](../modules.md) / ActionRuntimeConfig

# Interface: ActionRuntimeConfig

Describes how the app can be configured.

## Table of contents

### Properties

- [db](ActionRuntimeConfig.md#db)
- [logger](ActionRuntimeConfig.md#logger)
- [workers](ActionRuntimeConfig.md#workers)

## Properties

### db

• `Optional` **db**: [`AppDb`](AppDb.md)

db configuration

#### Defined in

[src/core/actions/src/app/action-app.ts:23](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L23)

___

### logger

• `Optional` **logger**: `Logger`

log driver configuration

#### Defined in

[src/core/actions/src/app/action-app.ts:25](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L25)

___

### workers

• `Optional` **workers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `filter?` | `Object` |
| `quantity` | `number` |

#### Defined in

[src/core/actions/src/app/action-app.ts:26](https://github.com/LaWebcapsule/orbits/blob/a1dfd88/src/core/actions/src/app/action-app.ts#L26)
