import { CdkStackResource } from '@orbi-ts/fuel';
import { LambdaStack } from '../cdk/lambda.js';

export class LambdaResource extends CdkStackResource {
    constructor(env?: { region: string; account: string }) {
        super();
        if (env)
            (this as LambdaResource).setArgument({
                stackName: 'hello-lambda',
                stackProps: { env },
            });
    }

    StackConstructor = LambdaStack;
}
