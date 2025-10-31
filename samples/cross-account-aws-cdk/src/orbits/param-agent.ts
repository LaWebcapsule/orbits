import { CdkStackAgent } from '@orbi-ts/fuel';
import { ParameterStoreStack } from '../cdk/param.js';

export class ParamAgent extends CdkStackAgent {
    StackConstructor = ParameterStoreStack;

    declare IOutput: {
        paramArn: string;
        roleArn: string;
    };
}
