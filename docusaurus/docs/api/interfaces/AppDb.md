# Interface: AppDb

Defined in: [core/actions/src/runtime/db-connection.ts:11](https://github.com/LaWebcapsule/orbits/blob/b2ed139d2834e94332a6be176a7be8c87c0438c4/core/actions/src/runtime/db-connection.ts#L11)

Describes the structure of the `app.db` object.
For now, only mongo is supported.
Either `url` or `conn` should be present.

## Properties

### mongo?

> `optional` **mongo**: `object`

Defined in: [core/actions/src/runtime/db-connection.ts:12](https://github.com/LaWebcapsule/orbits/blob/b2ed139d2834e94332a6be176a7be8c87c0438c4/core/actions/src/runtime/db-connection.ts#L12)

#### conn?

> `optional` **conn**: `Connection`

#### opts?

> `optional` **opts**: `ConnectOptions`

#### url?

> `optional` **url**: `string`

***

### noDatabase?

> `optional` **noDatabase**: `boolean`

Defined in: [core/actions/src/runtime/db-connection.ts:17](https://github.com/LaWebcapsule/orbits/blob/b2ed139d2834e94332a6be176a7be8c87c0438c4/core/actions/src/runtime/db-connection.ts#L17)
