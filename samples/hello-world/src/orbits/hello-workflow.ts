import { Workflow } from "@wbce/orbits-core";
import { HelloAction } from "./hello-action.ts";



export class HelloWorkflow extends Workflow{

    declare IResult: string;

    declare IArgument: {
        name: string;
    }

    async define(){
        const prefix = await this.do("hello", new HelloAction());
        const suffix = await this.do("name", ()=>{
            return Promise.resolve(this.argument.name);
        })
        return `${prefix} ${suffix}`;
    }
}