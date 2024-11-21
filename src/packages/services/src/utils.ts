export const deepCopy = (src: any, dest: any) => {
    // this copy has to be free of prototype pollution
    // hence the recursive assign
    Object.assign(dest, src);
    for (const key in dest) {
        if (dest[key] && typeof dest[key] === 'object') {
            if (Array.isArray(dest[key])) {
                dest[key] = [];
            } else {
                dest[key] = {};
            }
            deepCopy(src[key], dest[key]);
        }
    }
};

export const testPath = (obj: any, ...args: string[]) => {
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

export const getBasicType = (object: any): BasicType => {
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

export const getStackTracePaths: () => string[] = () => {
    /*
     The pattern of an error is :
     Error: this is a test to see stack traces!
       at __decorate (/home/louis/webcapsule/app/app-api/src/actions/action-manager.ts:5:95)
       at Object.<anonymous> (/home/louis/webcapsule/app/app-api/src/actions/action-manager.ts:601:27)
       at Module._compile (node:internal/modules/cjs/loader:1105:14)
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
            // to manage the case file:///home/... => ///home/...
            path[1] = path[1]?.replace('///', '/');
            result.push(path[1]);
        }
    }
    return result;
};