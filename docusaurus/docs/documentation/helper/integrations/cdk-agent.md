# CDK Agents

CDK Agents let you programmatically manage and deploy your CDK stacks.
They provide an enhanced way of working with the CDK, enabling you to:

- Easily write cross-account or cross-region resources sharing;
- Extend your IaC logic where necessary (e.g. using SDK calls to create AWS account programmatically);
- Redeploy stacks in response to specific events.

## Installation

The `CdkAgent` construct is part of the `@orbi-ts/fuel` package.
You'll need to install it first:

```bash
npm install @orbi-ts/fuel
```

Then import it :

```ts
import { CdkAgent } from '@orbi-ts/fuel';
```

## Encapsulate a cdk constructor

Assume you have a CDK stack constructor named `LambdaStack`.
You wrap it in a CDK agent by extending the `CdkAgent` class.

```ts
export class LambdaAgent extends CdkAgent {
    StackConstructor = `LambdaStack`;
}
```

If `LambdaStack` defines [CloudFormation outputs](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Stack.html#exportwbrvalueexportedvalue-options), you should mention their names through an interface.

```ts title="src/cdk/lambda-stack.ts"
export class LambdaStack extends Stack {
    constructor() {
        //...
        new cdk.CfnOutput(this, 'roleArn', {
            value: helloLambdaFunction.role?.roleArn!,
        });
    }
}
```

```ts title="src/orbits/lambda-agent.ts"
export class LambdaAgent extends CdkAgent {
    StackConstructor = `LambdaStack`;

    declare IOutput: {
        roleArn: string;
    };
}
```

## Consuming the agent

You can consume cdk agent in any workflow/agent.

```ts title="src/orbits/my-workflow.ts"
export class MyWorkflow extends Workflow {
    async define() {
        //...
        await this.do(
            'deployLambda',
            new LambdaAgent().setArgument({
                stackName: 'lambda',
                stackProps: {
                    //other props that will be passed to the stack constructors.
                    env: {
                        account: 'aws-account-id',
                        region: 'aws-account-region',
                    },
                },
            })
        );
    }
}
```

## Agent lifecycle

### Install step

The install step checks whether the target AWS environment has been bootstrapped with the CDK.
If not, it automatically bootstraps it.

### Update step

The update step launches the CDK stack, using `argument.stackProps` as input to the StackConstructor.

:::info
For advanced scenarios (e.g. when needing secrets or dynamic inputs), you can override the `init` method.

```ts title="src/orbits/lambda-agent.ts"
secretValue = '';
async init() {
    this.secretValue = await this.getSecret(this.argument.secretArn);
}
```

This lets you fetch secrets at runtime and ensures they are never stored by Orbits.
:::

### Cycle step (drift detection)

By default, there is no cycle step defined.
However, the cycle hook can be used to do drift detection.
In this case, just define a cycle hook and choose what to do inside.

```ts
async defineCycle() {
    const currentState = await this.do('getCurrentState', () => {
        // some call with aws sdk
    });
    if (currentState !== this.argument.stackProps.someParams) {
        // choose to redeploy
        await this.do('redeploy', this.clone().setCommand('Update'));
    }
}
```

By default, the cycle is run every 10 minutes.
You can override this parameter with `defaultAgentSettings`.

### Uninstall step

The uninstall step removes the CDK stack from the AWS environment.

## Agent output

You can retrieve CloudFormation outputs from the deployed stack using `getAgentOutput()` method.

```ts
// shortcut to get the cloudformation output of the stacks
const lambdaOutput = await this.do('getLambdaOutput', () => {
    return lambdaAgent.getAgentOutput();
});
// output is also available after a deployment
const lambdaOutput = await this.do('deployLambda', lambdaAgent);
```

The type of `lambdaOutput` will be `LambdaAgent['IOutput']`.

## AWS credentials

If you don't specify anything, the default [aws credentials](https://docs.aws.amazon.com/cdk/v2/guide/configure-access.html) of your environment will be used to deploy your stack to cloudformation.
You can specify a specific profile to be used using the `awsProfile` argument of the agent.

```ts
new LambdaAgent().setArgument({
    awsProfile: 'my-profile',
});
```
