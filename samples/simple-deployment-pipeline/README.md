# Hello world on AWS lambda Example

A practical example demonstrating how to deploy an AWS lambda using CDK and orbits. This project showcases an hello-world example: it deploys an AWS Lambda that will respond to a GET request.

## Architecture Overview

```
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│   cloudfront   │◄──►│   api gateway  │◄──►│   lambda       │
└────────────────┘    └────────────────┘    └────────────────┘
```

## Prerequisites

### Clone this repository

- Clone [this repository](https://github.com/LaWebcapsule/orbits)
- Go to this directory:

```bash
cd samples/simple-deployment-pipeline
```

- Install node.js dependencies:

```bash
npm i
```

### Setup AWS environment

You'll need access to one AWS account.

## Deployment

#### Configure environment values

Define your AWS region and account:

```bash
export AWS_REGION=you-aws-region
export AWS_ACCOUNT=you-aws-account
```

Define your mongo_url:

```bash
export ORBITS_DB__MONGO__URL=your-mongo-url
```

#### Run the deployment workflow

As this sample aims to demonstrate the cli, `orbi.ts` only exports classes and does not run any code.

Run the workflow `DeployHelloWorkflow` this way:

```bash
orbits-cli actions run -f src/orbits/orbi.ts --local-worker \
  DeployHelloWorkflow \
  region=$AWS_REGION \
  account=$AWS_ACCOUNT
```

`DeployHelloWorkflow` takes two arguments:

- `region`: AWS region;
- `account`: AWS account;

`-f` tells the cli where to look for orbits actions.

`--local-worker` starts an orbits worker locally.

This command will:

- Run `CodeQualityWorkflow`: format, lint and test the lambda
- Create the Lambda function, an api gateway and a cloudfront distribution in front of it
- invalidate cloudfront cache
- verify that the lambda returns the correct result

## Cleanup

To remove all deployed resources:

```bash
argument=$(cat<<EOF
{
  "commandName": "uninstall",
  "stackName": "hello-lambda",
  "stackProps": { "env": { "region": "$AWS_REGION" }}
}
EOF
)
orbits-cli actions run LambdaAgent $argument -f src/orbits/orbi.ts --local-worker
```

⚠️ Warning: This will permanently delete all resources created by this example. Make sure you want to remove everything before running this command.

## Use the github actions

Create a repository from this sample repository.

Declare the following repository secrets:

```
MONGO_URL
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

and the following repository variables:

```
AWS_REGION
AWS_ACCOUNT
```

A Pull Request should trigger the quality action, a push to main should trigger a deployment.

## Project Structure

```bash
├── src/
│   ├── orbits/
│   │   ├── orbi.ts # Main Deploy workflow definition
│   │   ├── code-quality.ts # Code Quality actions definition
│   │   ├── lambda-agent.ts # lambda agent definition
│   │   ├── invalidate-cache.ts # Invalidate cache action definition
│   │   ├── verify.ts # Verify action definition
│   ├── cdk/ # CDK stack definitions
│   │   └── lambda.ts # lambda CDK stack
│   └── handler/ # lambda handler
│       ├── hello.ts # handler definition
│       └── hello.spec.ts # test file for the handler
├── package.json
└── README.md
```
