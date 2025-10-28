import { Agent } from '@orbi-ts/core';
import { HelloWorkflow } from './hello-workflow.ts';

export class GreetingAgent extends Agent {
    declare IResult: string;

    declare IArgument: {
        name: string;
        date: string;
    } & Agent['IArgument'];

    identity() {
        return `${this.argument.name}-${this.argument.date}`;
    }

    async defineInstall() {
        const greeting = await this.do(
            'greeting',
            new HelloWorkflow().setArgument({
                name: this.argument.name,
            })
        );
        await this.do('display-greeting', () => {
            console.log(`${greeting}  👋👋👋`);
            return Promise.resolve();
        });
    }

    async defineUpdate() {
        //do nothing
        console.log(`(I have already seen you.)👻`);
    }

    async defineUninstall() {
        await this.do('display-goodbye', () => {
            console.log(`Goodbye my dear friend ${this.argument.name} 👋👋👋`);
            return Promise.resolve();
        });
    }
}
