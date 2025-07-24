---
slug: cross-account-cdk
title: Solving cross-account resources for AWS CDK
authors: [louis]
tags: [aws-cdk, orbits]
---

# Solving AWS Cross-Account Resource Access through CDK Orchestration

If you've ever tried to build a multi-account AWS architecture using CDK or CloudFormation, you've probably hit the same frustrating wall: cross-account resource references don't work without manual coordination and hardcoded values. What should be a simple task—like reading a parameter from Account A in a Lambda function deployed to Account B—becomes a tedious manual process. This behaviour is already [documented](https://www.luminis.eu/blog/cross-account-aws-resource-access-with-aws-cdk/) and while AWS also documents [workarounds](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/walkthrough-crossstackref.html), there’s no indication that this is going to change anytime soon. However, these approaches don't scale when you have multiple services and resources spanning different accounts across your organization.

This post walks through a practical example that demonstrates both the problem and a solution using orbits, a tool designed to seamless orchestrate all of your IaC with code.

<!-- truncate -->

## The Cross-Account Problem

AWS CDK and CloudFormation have a limitation: stacks cannot directly reference resources from other AWS accounts. This creates friction for common architectural patterns like:

- Sharing Docker images between development and production accounts
- Accessing centralized secrets from distributed applications
- Setting up VPC peering connections
- Managing cross-account S3 bucket permissions
- Distributing Lambda layers across organizational boundaries

Here's what this limitation looks like in practice:

```ts
const app = new cdk.App();

const paramA = new ParamStack(app, 'stack-A', {
    env: { account: 'account-A' },
});

const lambdaB = new LambdaStack(app, 'stack-B', {
    parameterArn: paramA.parameter.arn, // ❌ This fails at synthesis time
    env: { account: 'account-B' },
});
```

The traditional workaround involves manual steps: extracting ARNs, hardcoding values, coordinating resource policies, and deploying in specific sequences. This breaks the declarative nature of infrastructure-as-code and makes architectures brittle.

## A Real-World Example

Here's an "hello-world" scenario to illustrate the problem: deploying an AWS Systems Manager parameter in Account A and reading it from a Lambda function in Account B. While the "cross-account sharing" feature for AWS SSM parameter could be used, this simple use case illustrates the broader challenge perfectly.

### The Traditional CDK Approach (Doesn't scale)

With standard CDK, you'd need to:

1. Deploy the parameter stack in Account A
2. Manually extract the parameter ARN
3. Hardcode the ARN into your Lambda stack for Account B
4. Manually configure cross-account IAM policies
5. Deploy the Lambda stack in Account B
6. Hope nothing changes, because updates require repeating this process

### The Orchestration Solution with orbits

With orbits, the same architecture becomes straightforward:

```ts
const paramOutput = await this.do('updateParam', new ParamResource());

await this.do(
    'updateLambda',
    new LambdaResource().setArgument({
        stackProps: {
            parameterArn: paramOutput.parameterArn, // ✅ Direct cross-account reference
            env: { account: this.argument.accountB.id },
        },
    })
);
```

The key difference? Orbits handles the cross-account coordination automatically, allowing you to reference resources naturally regardless of which account they live in.

## Hands-On: Building the Example

The following section walks through building this cross-account parameter example step by step.

### Prerequisites

You'll need:

- Access to two AWS accounts with CloudFormation deployment permissions
- Node.js and npm installed
- MongoDB instance for orbits state management

### Project Setup

```bash
# Clone the repository
git clone <repository-url>
cd cross-account-example

# Install dependencies
npm install

# Configure environment
cp .base.env .env
# Edit .env with your account details
vi .env
```

### Project structure

```bash
├── src/
│   ├── orbits/
│   │   ├── orbi.ts # Main orchestration script
│   │   ├── lambda-resource.ts # lambda resource definition
│   │   ├── param-resource.ts # Param resource definition
│   │   └── hello-resource.ts # Hello resource definition: the resource that make the junction between param and lambda
│   └── cdk/              # CDK stack definitions
│       ├── lambda.ts # lambda CDK stack
│       └── param.ts # Param CDK stack
├── .base.env                # Environment template
├── .env                     # Your environment variables (git-ignored)
├── package.json
└── README.md
```

### The Resource Definitions

#### Lambda and Param CDK Stack

We focus on two stack `LambdaStack` and `ParameterStoreStack`
[link to the stack]

##### Lambda stack

A lambda that will display the value of the parameter passed in parameter if it can access it.

#### Parameter stack

A parameter store that stores an "hello-world" value.

#### Encapsulate the stacks in a resource definition.

Here's what a CDK resource definitions look like:

**Lambda Resource (lambda-resource.ts):**

```ts title="src/orbits/lambda-resource.ts"
export class LambdaResource extends CdkStackResource {
    StackConstructor = LambdaStack;

    declare IOutput: {
        roleArn: string;
    };
}
```

Let's go line by line.

- `StackConstructor = LambdaStack`: this tells the orchestrator that `LambdaResource` will use the `LambdaStack` class constructor to define and manage its infrastructure.
-

```ts
declare IOutput: {
    "roleArn": string
}
```

The CloudFormation stack for the Lambda function exports a single output: "roleArn", which is the ARN of the Lambda's execution role.
The IOutput declaration is used for type safety—it informs the developer that this resource will expose an output matching that structure.

:::info
If not already done, the CDK environment will be automatically bootstrapped by the CDKResource—no other step is required, the full lifecycle of your resource is managed.
:::

#### Write a proxy resource to orchestrate both lambda and param deployment

We could choose different orchestrations strategies.
Here we choose to have a proxy resources that deploy both the `Param` and the `Lambda` stack and that synchronize the use of both in coordination.

##### Install step

During the first step, we launch a first deployment of the `Lambda` stack.
At this step, the `ParamStore` stack does not exist, so no optional properties are passed.

```ts title="src/orbits/hello-resource.ts"
async defineInstall() {
    await this.do('firstDeployLambda', this.constructLambdaResource());
}

constructLambdaResource() {
    return new LambdaResource().setArgument({
        stackName: 'lambda',
        awsProfileName: this.argument.accountB.profile,
        stackProps: {
            env: {
                region: this.argument.region,
                account: this.argument.accountB.id,
            },
        },
    });
}
```

##### Update step

When updating the resource, we deploy both the `Param` and `Lambda` stack.

```ts title="src/orbits/hello-resource.ts"
async defineUpdate() {
    const lambdaResource = this.constructLambdaResource();

    const lambdaOutput = await this.do('getLambdaOutput', () => {
        return lambdaResource.getResourceOutput();
    });

    const paramOutput = await this.do(
        'updateParam',
        this.constructParamResource(lambdaOutput)
    );

    await this.do('updateLambda', this.constructLambdaResource(paramOutput));
}
```

`ParamResource` consumes the output of `LambdaResource` and vice versa.
As a consequence, we need to refine the constructs methods.

```ts title="src/orbits/hello-resource.ts"
constructLambdaResource(paramOutput?: ParamResource['IOutput']) {
    return new LambdaResource().setArgument({
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

constructParamResource(lambdaOutput?: LambdaResource['IOutput']) {
    return new ParamResource().setArgument({
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
```

#### Uninstall step

To uninstall, we uninstall both the `Lambda` and `ParamStore` stacks.

```ts title="src/orbits/hello-resource.ts"
async defineUninstall() {
    await this.do(
        'uninstallLambda',
        this.constructLambdaResource().setCommand('Uninstall')
    );
    await this.do(
        'uninstallParam',
        this.constructParamResource().setCommand('Uninstall')
    );
}
```

### Deployment

The entire cross-account deployment happens with a single command:

```bash
export $(cat .env | xargs)
export ORBITS_DB__MONGO__URL=your-mongo-url
npx tsx src/orbits/orbi.ts
```

This orchestrates:

1. Parameter deployment in Account A
2. Cross-account IAM policy setup
3. Lambda function deployment in Account B
4. All necessary permissions and configurations

#### Verification

After deployment, you can test the Lambda function in Account B. It will successfully retrieve the parameter from Account A, demonstrating seamless cross-account access.

The Lambda logs will show:

```
Param: hello-world
```

### Cleanup

To remove all deployed resources from both accounts:

```bash
export HELLO_COMMAND=uninstall
npx tsx src/orbits/orbi.ts
```

:::warning
This will permanently delete all resources created by this example. Make sure you want to remove everything before running this command.
:::

## Why This Matters

This example might seem simple, but it represents a fundamental gain in how we think about multi-account architectures. Instead of treating cross-account access as an exception requiring special handling, orbits makes it a first-class citizen of your infrastructure-as-code workflow. It allows to completely automate cross-account resources definition.

### Key Benefits

- **Declarative Cross-Account Resources:** Reference any resource from any account without manual coordination.
- **Automatic Permission Management:** IAM policies and resource policies are handled automatically.
- **Consistent Deployment Experience:** Multi-account deployments feel the same as single-account ones.
- **Simplified Maintenance:** Updates and changes don't require manual ARN extraction and policy coordination.

## Looking Forward

Cross-account resource management shouldn't be a second-class citizen in your infrastructure-as-code workflow. Tools like orbits point toward a future where account boundaries enhance security without sacrificing developer experience.

If you're building multi-account architectures, I encourage you to try this example and see how much simpler cross-account resource management can be. The days of manual ARN extraction and policy coordination don't have to be permanent fixtures of AWS multi-account architectures.

---

_Ready to try it yourself? The complete example code and setup instructions are available in the repository. Give it a spin and share your experience with cross-account resource management._
