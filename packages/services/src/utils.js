export const deepCopy = (src, dest) => {
    if (getBasicType(src) !== 'object' && getBasicType(src) !== 'array') {
        return src;
    }
    Object.assign(dest, src);
    for (const key in dest) {
        if (dest[key] && typeof dest[key] === 'object') {
            dest[key] = Array.isArray(dest[key]) ? [] : {};
            deepCopy(src[key], dest[key]);
        }
    }
    return dest;
};
export const deepMerge = (src, dest) => {
    if (getBasicType(src) !== 'object' && getBasicType(src) !== 'array') {
        return;
    }
    for (const key in src) {
        if (!dest?.hasOwnProperty?.(key)) {
            dest[key] = deepCopy(src[key], Array.isArray(src[key]) ? [] : {});
        }
        else {
            deepMerge(src[key], dest[key]);
        }
    }
};
export const testPath = (obj, ...args) => {
    for (const key of args) {
        if (obj && obj[key] !== undefined) {
            obj = obj[key];
        }
        else {
            return;
        }
    }
    return obj;
};
export const getBasicType = (object) => {
    let currentType = typeof object;
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
export const getStackTracePaths = () => {
    const error = new Error();
    const stacks = error.stack?.split('\n') || [];
    stacks.shift();
    const result = [];
    for (let i = 0; i < stacks.length; i++) {
        const line = stacks[i];
        const pattern = /at[^\/]+([^ (]+):[0-9]+:[0-9]+/;
        const path = pattern.exec(line);
        if (path) {
            path[1] = path[1]?.replace('///', '/');
            result.push(path[1]);
        }
    }
    return result;
};
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function base64Decode(str) {
    return Buffer.from(str, 'base64').toString('utf-8');
}
