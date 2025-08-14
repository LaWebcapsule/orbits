import { CdkStackResource } from '@orbi-ts/fuel';
import { LambdaStack } from '../cdk/lambda.js';

export class LambdaResource extends CdkStackResource {
    StackConstructor = LambdaStack;
}
