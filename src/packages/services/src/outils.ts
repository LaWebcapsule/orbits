const deepCopy = (src: any, dest: any) => {
    //!! this copy has to be free of prototype pollution.
    //that why we use recursive assign
    Object.assign(dest, src);
    for (const key in dest) {
        if (dest[key] && typeof dest[key] === 'object') {
            if (Array.isArray(dest[key])) {
                dest[key] = [];
            } else {
                dest[key] = {};
            }
            //dest[key] = new src[key].constructor();//doesn't work if the constructor expects parameters.
            deepCopy(src[key], dest[key]);
        }
    }
};

/*
Essai pour typer testPath
type z = {x : {y : {z :string}}, xx : {yy: {zz : string}}}

type Push< T extends any[], H> = [...T, H]

type Unshift<T extends any[]> = T extends [T[0], ...infer R] ? R : never;

type testPathType<A extends [any, any[]]> = A[1][0] extends keyof A[0] ? testPathType<[A[0][A[1][0]], Unshift<A[1]>]> : A[0];

type zz = testPathType<[z, ['x','y', 'eezzz']]>;

type NestedKeysOf<T> = {[K in keyof T] : [K, ...NestedKeysOf<T[K]>]} extends {[Z : string] : infer R} ? (R extends Array<any> ? R : []) : [];


type aa = NestedKeysOf<{x : {y : {z : string}}, y : ['w', 'f'], w : {z : {a : number}}}>;

 */

const testPath = (obj: any, ...args: string[]) => {
    for (const key of args) {
        if (obj && obj[key] !== undefined) {
            obj = obj[key];
        } else {
            return;
        }
    }
    return obj;
};

export type BasicType =
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function'
    | 'array'
    | 'date'
    | 'buffer';

const getBasicType = (object: any): BasicType => {
    let currentType: BasicType = typeof object;
    if (currentType === 'object') {
        if (object instanceof Date) {
            currentType = 'date';
        }
        if (Array.isArray(object)) {
            currentType = 'array';
        }
        if (Buffer.isBuffer(object)) {
            currentType = 'buffer';
        }
    }
    return currentType;
};

const getStackTracePaths: () => string[] = () => {
    /**
     * The pattern of an error is :
     * Error: this is a test to see stack traces!
        at __decorate (/home/louis/webcapsule/app/app-api/src/actions/action-manager.ts:5:95)
        at Object.<anonymous> (/home/louis/webcapsule/app/app-api/src/actions/action-manager.ts:601:27)
        at Module._compile (node:internal/modules/cjs/loader:1105:14)

     * 
     */
    const error = new Error();
    const stacks = error.stack?.split('\n') || [];
    stacks.shift();
    const result = [];
    for (let i = 0; i < stacks.length; i++) {
        const line = stacks[i];
        const pattern = /at[^\/]+([^ (]+):[0-9]+:[0-9]+/;
        const path = pattern.exec(line);
        if (path) {
            path[1] = path[1]?.replace('///', '/'); //to manage the case file:///home/... => ///home/...
            result.push(path[1]);
        }
    }
    return result;
};

export const o = {
    testPath,
    deepCopy,
    getBasicType,
    getStackTracePaths,
};
