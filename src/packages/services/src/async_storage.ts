import { AsyncLocalStorage } from 'async_hooks';
import { o } from './outils';

export interface StorageObject {
    logInfo?: any;
    aws?: any;
}

export class WBCEAsyncStorage extends AsyncLocalStorage<StorageObject> {
    //we can not use promise syntax here
    //e.g. we cannot implement something like :
    //this.addNestedStorage({}).then(...)
    //because of https://github.com/nodejs/help/issues/3041

    addNestedStorage<Type>(info: StorageObject, cb: () => Promise<Type>) {
        //storage is added only for the child zones
        const currentStorage = this.getStore();
        return new Promise<Type>((resolve, reject) => {
            const newStorage = {};
            o.deepCopy(currentStorage, newStorage);
            o.deepCopy(info, newStorage);
            this.run(newStorage, () => {
                cb().then(resolve, reject);
            });
        });
    }

    addToStorage(info: StorageObject) {
        //storage is added for the main zone :
        const currentStorage = this.getStore();
        o.deepCopy(info, currentStorage);
    }
}

export const wbceAsyncStorage = new WBCEAsyncStorage();
