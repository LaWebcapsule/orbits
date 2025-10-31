import { CdkStackAgent } from '@orbi-ts/fuel';
import { LambdaStack } from '../cdk/lambda.js';

export class LambdaAgent extends CdkStackAgent {
    StackConstructor = LambdaStack;

    declare IOutput: {
        roleArn: string;
    };
}
