import { Agent } from '@orbi-ts/core';
import { LambdaAgent } from './lambda-agent.js';
import { ParamAgent } from './param-agent.js';

export class HelloAgent extends Agent {
    declare IArgument: {
        accountA: {
            id: string;
            profile: string;
        };
        accountB: {
            id: string;
            profile: string;
        };
        region: string;
    } & Agent['IArgument'];

    identity() {
        return 'hello';
    }

    async defineInstall() {
        await this.do('firstDeployLambda', this.constructLambdaAgent());
    }

    async defineUpdate() {
        const lambdaAgent = this.constructLambdaAgent();

        const lambdaOutput = await this.do('getLambdaOutput', () => {
            return lambdaAgent.getAgentOutput();
        });

        const paramOutput = await this.do(
            'updateParam',
            this.constructParamAgent(lambdaOutput)
        );

        await this.do(
            'updateLambda',
            this.constructLambdaAgent(paramOutput)
        );
    }

    async defineUninstall() {
        await this.do(
            'uninstallLambda',
            this.constructLambdaAgent().setCommand('Uninstall')
        );
        await this.do(
            'uninstallParam',
            this.constructParamAgent().setCommand('Uninstall')
        );
    }

    constructLambdaAgent(paramOutput?: ParamAgent['IOutput']) {
        return new LambdaAgent().setArgument({
            stackName: 'lambda',
            awsProfileName: this.argument.accountB.profile,
            stackProps: {
                accountARoleArn: paramOutput?.roleArn,
                parameterArn: paramOutput?.paramArn,
                env: {
                    region: this.argument.region,
                    account: this.argument.accountB.id,
                },
            },
        });
    }

    constructParamAgent(lambdaOutput?: LambdaAgent['IOutput']) {
        return new ParamAgent().setArgument({
            stackName: 'param',
            awsProfileName: this.argument.accountA.profile,
            stackProps: {
                accountBId: this.argument.accountB.id,
                accountBRoleArn: lambdaOutput.roleArn,
                env: {
                    region: this.argument.region,
                    account: this.argument.accountA.id,
                },
            },
        });
    }
}
