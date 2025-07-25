---
sidebar_position: 2
---
# CDK Cross-Account Resource Example

A practical example demonstrating how to manage AWS resources across multiple accounts using CDK and orbits. This project showcases an hello-world example: it deploys an AWS Systems Manager parameter in Account A and read it from a Lambda function in Account B.

## Problem statement

Using AWS CDK and CloudFormation, consuming cross-account resources is difficult because stacks cannot directly reference resources from other AWS accounts, requiring manual coordination and hardcoded values.

Common problematic scenarios include:

- Accessing Docker images built in account A from account B;
- Using secrets from account A in account B applications;
- Establishing VPC peering between accounts;
- Granting cross-account S3 bucket access;
- Sharing Lambda layers across accounts;
- Writing values into the DNS zone of account A from account B.

This limitation is shown in this example:

```ts
const app = new cdk.App()

const paramA = new ParamStack(app, 'stack-A', {
    ...,
    env: {
        account: "account-A"
    }
})

const lambdaB = new LambdaStack(app, 'stack-A', {
    ...,
    parameterArn : paramA.parameter.arn, // ❌ you can not reference a resource from a stack from another account
    env: {
        account: "account-B"
    }
})
```

With orbits, cross-account resource sharing works seamlessly:

```ts
const paramOutput = await this.do('updateParam', new ParamResource());

await this.do(
    'updateLambda',
    new LambdaResource().setArgument({
        stackProps: {
            parameterArn: paramOutput.parameterArn, // ✅ you can reference any stack
            env: {
                account: this.argument.accountA.id,
            },
        },
    })
);
```

## Architecture Overview

```mermaid
---
config:
  flowchart:
    htmlLabels: false
---
flowchart LR
    legend@{ label: "Account A (Parameter Store)" } ~~~ B@{ label: "Account B (Lambda Consumer)" }
    markdown["SSM Parameter Store
    Key:  /my/param
    Value: 'Hello World'
    "] <--> newLines["Lambda Function
    Reads cross-account parameter
    "]
    legend@{ shape: rect}
    B@{ shape: rect}
    style legend stroke:none
    style B stroke:none
```

## Prerequisites

### Clone this repository

- Clone [this repository](https://github.com/LaWebcapsule/orbits)
- Go to this directory :

```bash
cd samples/cross-account-aws-cdk
```

- Install node.js dependencies :
  `npm i`

### Setup AWS environment

You'll need access to two AWS accounts with the following permissions:

- Account A: CloudFormation deployment rights
- Account B: CloudFormation deployment rights

#### Configure environment values

- Copy the environment template:
    ```bash
    cp .base.env .env
    ```
- Edit `.env` file with your account details.

## Deployment

- Load environment variables:
    ```bash
    export $(cat .env | xargs)
    ```
- Define your mongo_url:
    ```bash
    export ORBITS_DB__MONGO__URL=your-mongo-url
    ```
- Deploy Cross-Account Infrastructure:
    ```bash
    npx tsx src/orbits/orbi.ts
    ```
    This command will:
    - Deploy the SSM parameter in Account A;
    - Create the Lambda function in Account B with appropriate cross-account permissions;
    - Set up the necessary IAM roles and policies for cross-account access.

### Verify the result of the Lambda Function

- Navigate to the AWS Console for Account B
- Go to Lambda service
- Find the deployed function (typically named with a stack prefix)
- Click Test to create a test event
- Execute the test

- Expected Output

    The Lambda function should successfully retrieve the parameter from Account A and should display the value of parameter A in its logs.

    ```ts
    console.log('Param:', param.Parameter.Value);
    ```

    The default value of parameter is "hello-world".

## Cleanup

To remove all deployed resources from both accounts:

```bash
export HELLO_COMMAND=uninstall
npx tsx src/orbits/orbi.ts
```

:::warning
This will permanently delete all resources created by this example. Make sure you want to remove everything before running this command.
:::

## Project Structure

```bash
├── src/
│   ├── orbits/
│   │   └── orbi.ts # Main orchestration script
│   │   ├── lambda-resource.ts # lambda resource definition
│   │   ├── param-resource.ts # Param resource definition
│   │   ├── hello-resource.ts # Hello resource definition : the resource that make the junction between param and lambda
│   └── cdk/ # CDK stack definitions
│       ├── lambda.ts # lambda CDK stack
│       └── param.ts # Param CDK stack
├── .base.env # Environment template
├── .env # Your environment variables (git-ignored)
├── package.json
└── README.md
```

## Step-by-step explanation

For a detailed walkthrough of the different files and how they work together, check out [this blog post](../../blog/cross-account-cdk).

## Security Considerations

The cross-account access follows the principle of least privilege.
Parameters are accessed using IAM roles, not hardcoded credentials.
CloudFormation stacks can be easily audited for security compliance
