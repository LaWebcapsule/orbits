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
        this.internalLog(`Installing greeting resource for ${this.argument.name}`);
        await this.do("greeting", new HelloWorkflow())
    }

    async defineUpdate() {
        //do nothing
        this.internalLog(`(I have already seen you.)`);
    }

    async defineUninstall() {
        this.internalLog(`Goodbye my dear friend ${this.argument.name}`);
    }
}