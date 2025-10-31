import { CdkStackAgent } from '@orbi-ts/fuel';
import { LambdaStack } from '../cdk/lambda.js';

export class LambdaAgent extends CdkStackAgent {
    constructor(env?: { region: string; account: string }) {
        super();
        if (env)
            (this as LambdaAgent).setArgument({
                stackName: 'hello-lambda',
                stackProps: { env },
            });
    }

    StackConstructor = LambdaStack;
}
