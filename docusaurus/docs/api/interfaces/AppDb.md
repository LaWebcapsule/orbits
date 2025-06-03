# Interface: AppDb

Defined in: [core/actions/src/app/db-connection.ts:11](https://github.com/LaWebcapsule/orbits/blob/d868a491665847b3fcad6a5fb6cc538d2ad58104/core/actions/src/app/db-connection.ts#L11)

Describes the structure of the `app.db` object.
For now, only mongo is supported.
Either `url` or `conn` should be present.

## Properties

### mongo?

> `optional` **mongo**: `object`

Defined in: [core/actions/src/app/db-connection.ts:12](https://github.com/LaWebcapsule/orbits/blob/d868a491665847b3fcad6a5fb6cc538d2ad58104/core/actions/src/app/db-connection.ts#L12)

#### conn?

> `optional` **conn**: `Connection`

#### opts?

> `optional` **opts**: `ConnectOptions`

#### url?

> `optional` **url**: `string`

***

### noDatabase?

> `optional` **noDatabase**: `boolean`

Defined in: [core/actions/src/app/db-connection.ts:17](https://github.com/LaWebcapsule/orbits/blob/d868a491665847b3fcad6a5fb6cc538d2ad58104/core/actions/src/app/db-connection.ts#L17)
