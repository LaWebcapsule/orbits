# CDK Cross-Account Agent Example

A practical example demonstrating how to manage AWS resources across multiple accounts using CDK and orbits. This project showcases an hello-world example: it deploys an AWS Systems Manager parameter in Account A and read it from a Lambda function in Account B.

## Architecture Overview

```
   Account A (Parameter Store)          Account B (Lambda Consumer)
┌───────────────────────────────┐    ┌───────────────────────────────┐
│  SSM Parameter Store          │    │  Lambda Function              │
│  Key:  /my/param              │◄───┤  Reads cross-account          │
│  Value: "Hello World"         │    │  parameter                    │
└───────────────────────────────┘    └───────────────────────────────┘
```

## Prerequisites

### Clone this repository

- Clone [this repository](https://github.com/LaWebcapsule/orbits)
- Go to this directory:

```bash
cd samples/cross-account-aws-cdk
```

- Install node.js dependencies:

```bash
npm i
```

### Setup AWS environment

You'll need access to two AWS accounts with the following permissions:

Account A: CloudFormation deployment rights
Account B: CloudFormation deployment rights

#### Configure environment values

- Copy the environment template:

```bash
cp .base.env .env
```

- Edit .env file with your account details.

## Deployment

- Load environment variables:

```bash
export $(cat .env | xargs)
```

- Define your mongo_url:

```bash
export ORBITS_DB__MONGO__URL=your-mongo-url
```

- Deploy Cross-Account Infrastructure

```bash
npx tsx src/orbits/orbi.ts
```

This command will:

- Deploy the SSM parameter in Account A
- Create the Lambda function in Account B with appropriate cross-account permissions
- Set up the necessary IAM roles and policies for cross-account access

### Verify the result of Lambda Function

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

⚠️ Warning: This will permanently delete all resources created by this example. Make sure you want to remove everything before running this command.

## Project Structure

```bash
├── src/
│   ├── orbits/
│   │   ├── orbi.ts # Main orchestration script
│   │   ├── lambda-agent.ts # lambda agent definition
│   │   ├── param-agent.ts # Param agent definition
│   │   ├── hello-agent.ts # Hello agent definition: the agent that make the junction between param and lambda
│   └── cdk/ # CDK stack definitions
│       ├── lambda.ts # lambda CDK stack
│       └── param.ts # Param CDK stack
├── .base.env # Environment template
├── .env # Your environment variables (git-ignored)
├── package.json
└── README.md
```

## Security Considerations

The cross-account access follows the principle of least privilege
Parameters are accessed using IAM roles, not hardcoded credentials
CloudFormation stacks can be easily audited for security compliance.
