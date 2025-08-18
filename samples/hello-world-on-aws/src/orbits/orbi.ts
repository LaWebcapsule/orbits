import { Workflow } from '@orbi-ts/core';
import { CodeQualityWorkflow } from './code-quality';
import { InvalidateCacheAction } from './invalidate-cache';
import { LambdaResource } from './lambda-resource';
import { VerifyLambdaDeploymentAction } from './verify';

export class DeployHelloWorkflow extends Workflow {
    declare IArgument: Workflow['IArgument'] & {
        lambdaEntryPath: string;
        region: string;
        account: string;
    };

    async define() {
        await this.do(
            'quality',
            new CodeQualityWorkflow().setArgument({
                codePath: this.argument.lambdaEntryPath,
            })
        );
        const result = await this.do(
            'deploy',
            new LambdaResource().setArgument({
                stackName: 'hello-lambda',
                stackProps: {
                    lambdaEntryPath: this.argument.lambdaEntryPath,
                    env: {
                        region: this.argument.region,
                        account: this.argument.account,
                    },
                },
            })
        );

        await this.do(
            'invalidate cache',
            new InvalidateCacheAction().setArgument({
                distributionId: result.CfId,
                env: { region: this.argument.region },
            })
        );

        await this.do(
            'verify',
            new VerifyLambdaDeploymentAction().setArgument({
                endpoint: `https://${result.CfDomainName}`,
            })
        );
    }
}
