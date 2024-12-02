[@wbce/orbits](../README.md) / [Exports](../modules.md) / AppDb

# Interface: AppDb

Describes the structure of the `app.db` object.
For now, only mongo is supported.
Either `url` or `conn` should be present.

## Table of contents

### Properties

- [mongo](AppDb.md#mongo)
- [noDatabase](AppDb.md#nodatabase)

## Properties

### mongo

• `Optional` **mongo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `conn?` | `Connection` |
| `opts?` | `ConnectOptions` |
| `url?` | `string` |

#### Defined in

[src/core/actions/src/app/db-connection.ts:11](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/db-connection.ts#L11)

___

### noDatabase

• `Optional` **noDatabase**: `boolean`

#### Defined in

[src/core/actions/src/app/db-connection.ts:16](https://github.com/LaWebcapsule/orbits/blob/fea9124/src/core/actions/src/app/db-connection.ts#L16)
