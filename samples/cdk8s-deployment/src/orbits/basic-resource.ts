import { Cdk8sResource } from '@orbi-ts/fuel';
import { BasicChart } from '../cdk8s/basic-cdk8s.js';

export class BasicResource extends Cdk8sResource {
    IResult: {
        namespace: string;
        cronJobName: string;
    };

    StackConstructor = BasicChart;
    stack: BasicChart;

    async setOutput(): Promise<this['IOutput']> {
        this.stack = await this.generateStack();
        return {
            namespace: this.stack.ns.name,
            cronJobName: this.stack.cronJob.name,
        };
    }
}
