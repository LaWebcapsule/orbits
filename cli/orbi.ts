import {
    Action,
    ActionRuntime,
    ActionState,
    Resource,
    Workflow,
} from '@orbi-ts/core';

import { unlinkSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CRUD } from './src/crud.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class MyAction extends Action {
    static permanentRef = 'coucou';

    declare IArgument: {
        firstname: string;
        lastname: string;
    };

    static cronDefaultSettings = { activityFrequency: 20 * 1000 };

    // main() {
    //   setTimeout(() => {
    //     writeFileSync(
    //       __dirname + `/${this.argument.arg1}_${this.argument.arg2}`,
    //       `hello, ${this.argument.arg1} ${this.argument.arg2}`
    //     );
    //   }, 10000);
    //   return ActionState.IN_PROGRESS;
    // }

    // async watcher(): Promise<ActionState> {
    //   this.internalLog("IN WATCHER");
    //   try {
    //     readFileSync(__dirname + `/${this.argument.arg1}_${this.argument.arg2}`);
    //   } catch (err) {
    //     console.log(err);
    //     return ActionState.IN_PROGRESS;
    //   }
    //   return ActionState.SUCCESS;
    // }

    async main() {
        this.setResult(
            `coucou ${this.argument.firstname} ${this.argument.lastname}`
        );
        return ActionState.SUCCESS;
    }
}

export class MyWorkflow extends Workflow {
    async define() {
        let result = '';
        result += await this.do(
            'helloJohn',
            new MyAction().setArgument({ firstname: 'John', lastname: 'Doe' })
        );
        result += '\n';
        result += await this.do(
            'helloJane',
            new MyAction().setArgument({ firstname: 'Jane', lastname: 'Doe' })
        );
        return result;
    }
}

export class MyWorkflow2 extends Workflow {
    async define() {
        let result = '';
        result += await this.do('helloJohnAndJane', new MyWorkflow());
        result += await this.do('dynamic', async () => {
            return ActionState.SUCCESS;
        });
        return result;
    }
}

export class SimpleResource extends Resource {
    identity() {
        return 'simple-resource';
    }

    version = '3.0.0';

    defineInstall(): void {
        writeFileSync('simpleresource.txt', 'installed');
    }

    defineUpdate(): void {
        console.log('⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄');
        console.log('⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄');
        console.log('⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄');
        console.log('⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄');
        console.log('UPDATE');
        console.log('^^^^^^^^^^^^^^^^^^^');
        console.log('^^^^^^^^^^^^^^^^^^^');
        console.log('^^^^^^^^^^^^^^^^^^^');
        console.log('^^^^^^^^^^^^^^^^^^^');
    }

    defineUninstall(): void {
        unlinkSync('simpleresource.txt');
    }
}

export class SimpleWorkflow extends Workflow {}
export class SimpleAction extends Action {
    main(): ActionState | Promise<ActionState> {
        return ActionState.SUCCESS;
    }
}

export class WaitAction extends Action {
    static cronDefaultSettings = { activityFrequency: 1000 }; // 10 min // wait for

    count = 0;

    declare IBag: {
        count: number;
    };

    main() {
        this.internalLog('info - IN_PROGRESS', { level: 'info' });
        this.internalLog('warn - THIS IS A LOG', { level: 'warn' });
        this.internalLog('debug - THIS IS A LOG', { level: 'debug' });
        this.internalLog('error - THIS IS A LOG', { level: 'error' });
        return ActionState.IN_PROGRESS;
    }

    async watcher() {
        if (this.bag.count >= 1) {
            return ActionState.SUCCESS;
        }
        return ActionState.IN_PROGRESS;
    }
}

export class WaitWorkflow extends Workflow {
    async define() {
        try {
            await this.do('wait1', new WaitAction());
            await this.do('wait2', new WaitAction());
        } catch {
            await this.do('successFulAction', async () => ActionState.SUCCESS);
        }
    }
}

export class DirectWorkflow extends Workflow {
    async define() {
        await this.do('wait', new WaitAction());
        await this.do('action1', async () => ActionState.SUCCESS);
        await this.do('action2', async () => ActionState.SUCCESS);
    }
}

export class WorkflowInWorkflow extends Workflow {
    declare IBag: Workflow['IBag'] & {
        count: number;
    };

    async define() {
        await this.do('waitWorkflow1', new WaitWorkflow());
        await this.do('waitWorkflow2', new WaitWorkflow());
    }
}

// async function main() {
//     ActionRuntime.activeRuntime = undefined as unknown as ActionRuntime;
//     new ActionRuntime({
//         db: {
//             mongo: {
//                 url: process.env['ORBITS_DB__MONGO__URL'],
//             },
//         },
//         workers: {
//             quantity: 1,
//             filter: { cli: true, cliInstanceUUID: 123 },
//         },
//     });

//     await ActionRuntime.waitForActiveRuntime;
//     try {
//         await CRUD.run('WaitWorkflow', {}, { cli: true, cliInstanceUUID: 123 });
//         // console.log((await CRUD.listResourcesFromRegistry()).map(res => {
//         //     const ctr = ActionRuntime.activeRuntime.getActionFromRegistry(res);
//         //     return (new ctr() as Resource).identity();
//         // }));
//     } catch (error) {
//         console.log(error);
//     }
//     //   await CRUD.resume(actionId);
// }

// main();
