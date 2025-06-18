import * as path from 'path';
import precinct from 'precinct';
import { Action } from './index.js';

const deps = precinct.paperwork('./specs/main.spec.ts');
console.log(deps);

const actionMap = new Map();
const fileMap = new Set();
const recursiveLoadAction = async (modulePath: string) => {
    console.log('dealing with' + modulePath);
    const deps = precinct.paperwork(modulePath.replace('.js', '.ts'), {
        includeCore: false,
    });
    const imports = await import(modulePath);
    for (const key in imports) {
        //console.log(key);
    }
    for (let file of deps) {
        if (!fileMap.has(file) && file.startsWith('.')) {
            const baseDir = path.dirname(modulePath);
            fileMap.add(file);
            const filePath = `./${path.join(baseDir, file)}`;
            const imports = await import(filePath);
            for (const key in imports) {
                if (imports[key].prototype instanceof Action) {
                    console.log('here!!!!!!!!!!!');
                    console.log(key, imports[key]);
                    actionMap.set(key, imports[key]);
                }
                //console.log(key);
            }
            await recursiveLoadAction(filePath);
        }
    }
};

recursiveLoadAction('./specs/main.spec.ts').then(() => {
    console.log(actionMap);
});
