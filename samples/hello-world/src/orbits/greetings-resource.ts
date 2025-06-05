import { Resource } from "@wbce/orbits-core";
import { HelloWorkflow } from "./hello-workflow.ts";

export class GreetingResource extends Resource {

    declare IResult: string;

    declare IArgument: {
        name: string;
        date: string
    } & Resource["IArgument"]

    identity() {
        return `${this.argument.name}-${this.argument.date}`;
    }

    async defineInstall() {
        const greeting = await this.do("greeting", new HelloWorkflow().setArgument({
            name: this.argument.name
        }));
        console.log(`${greeting}  👋👋👋`);
    }

    async defineUpdate() {
        //do nothing
        console.log(`(I have already seen you.)👻`);
    }

    async defineUninstall() {
        console.log(`Goodbye my dear friend ${this.argument.name}`);
    }
}