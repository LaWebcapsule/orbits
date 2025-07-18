import { CdkStackResource } from '@orbi-ts/fuel';
import { ParameterStoreStack } from '../cdk/param.js';

export class ParamResource extends CdkStackResource {
    StackConstructor = ParameterStoreStack;

    declare IOutput: {
        paramArn: string;
        roleArn: string;
    };
}
