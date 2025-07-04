import { Cdk8sResource } from "@wbce/orbits-fuel";
import { Chart } from "cdk8s";
import { BasicChart } from "../cdk/basic-cdk8s.js";


export class BasicResource extends Cdk8sResource {

  IResult: {
    "namespace": string,
    "cronJobName": string
  }

  StackConstructor = BasicChart ;
  stack: BasicChart;

  async setOutput(): Promise<this["IOutput"]> {
    this.stack = await this.generateStack();
    return {
      namespace: this.stack.ns.name,
      cronJobName: this.stack.cronJob.name
    }
  }

}