---
slug: ci-cd-in-typescript
title: Write your CI/CD in TypeScript
authors: [tom]
tags: [orchestration, orbits, cli, aws-cdk, ci/cd]
---

If most CI/CD tools today are robust, the way we define scripts in them comes with a few drawbacks:

- they have strong vendor lock-ins;
- they are difficult to test and debug locally;
- they all use a different syntax in YAML, which is difficult to extend and compose.
  For all these reasons, when the person who wrote them is not around, it’s not uncommon that teams don’t know what scripts do. They rarely evolve and their maintenance is hard.

Using code and native Node.js modules to write CI/CD could solve all these problems and comes with a lot of benefits:

- it’s possible to debug locally. To avoid regressions, it's even possible to test the CI/CD with a normal testing framework;
- it offers better reusability across projects and greater composability;
- it uses code instead of configuration, making it easy to catch errors, manage retries, loops, and conditional logic;
- it integrates seamlessly with the rich Node.js ecosystem.

![ci-cd](/img/blog/singe-ci-cd.png)

<!-- truncate -->

## Example: handle your CI/CD in Node.js with Orbits

This blog post will follow the [simple deployment pipeline sample](https://github.com/LaWebcapsule/orbits/tree/main/samples/simple-deployment-pipeline) available on the github repository of orbits.

This sample deploys an AWS Lambda that will respond to a GET request with this architecture:

```
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│   cloudfront   │◄──►│   api gateway  │◄──►│   lambda       │
└────────────────┘    └────────────────┘    └────────────────┘
```

Our complete workflow is:

1. Format, lint and test our Lambda code
2. Deploy it to AWS using CDK and the orbits CDK helper
3. Clear the CloudFront cache
4. Check the deployed endpoint

### Prerequisites

You'll need:

- Access to one AWS account
- Node.js and npm installed
- MongoDB instance for orbits state management

### Project Setup

```bash
# Clone the repository
git clone https://github.com/LaWebcapsule/orbits.git
cd samples/simple-deployment-pipeline

# Install dependencies
npm install

# Configure environment
export AWS_REGION=you-aws-region
export AWS_ACCOUNT=you-aws-account

# Install the CLI either globally or in your project
## globally
npm i @orbi-ts/cli -g

## in your project
npm i @orbi-ts/cli

# define your mongo_url
## default is mongodb://localhost:27017/orbits
export ORBITS_DB__MONGO__URL=your-mongo-url
```

### Run the deployment workflow

From peeking at `orbi.ts` we see that `DeployHelloWorkflow` takes two arguments:

- `region`: the AWS region
- `account`: the AWS account

So running it is as easy as typing this command:

```bash
orbits-cli actions run -f src/orbits/orbi.ts --local-worker \
  DeployHelloWorkflow \
  region=$AWS_REGION \
  account=$AWS_ACCOUNT
```

Here is a video of the deployment:
<video controls width='100%'>

<source src='https://orbits-assets.s3.eu-west-3.amazonaws.com/public/videos/cli-run.mp4'/>
</video>
<br/><br/>

We can get the result of the deploy action using the get method (provided its ID is `689de1b3fcb667fee45a4bfe`):

```bash
➜ orbits-cli actions get 689de1b3fcb667fee45a4bfe
ID                       ┆ ACTION REF     ┆ STATE   ┆ RESULT                                                                                                                                                             ┆ LAST ACTIVITY ┆ NEXT ACTIVITY ┆ PARENT > REF
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
689de1b3fcb667fee45a4bfe ┆ LambdaAgent ┆ SUCCESS ┆ {"CfId":"E28NIDFX6OEEC6","HelloAPIEndpointA3FBFD89":"https://fueo1zarcg.execute-api.eu-west-3.amazonaws.com/prod/","CfDomainName":"d16q083cvq1ymk.cloudfront.net"} ┆ —             ┆ in 7min 45s   ┆ 689de1b1fcb667fee45a4bc1 > deploy
```

With its ID, you can get the graphical view of an Action / Workflow at any moment:

```bash
orbits-cli actions watch <ACTION_ID>
```

With this in mind, you have a complete history of your deployment and can see precisely where it failed.

### Debugging part of the workflow

In this section, we’ll introduce a failure in the Code Quality workflow and see how it shows up during execution.

First, here’s how our deployment workflow is defined:

```ts title="src/orbits/orbi.ts"
import { Workflow } from '@orbi-ts/core';
import { CodeQualityWorkflow } from './code-quality';
import { InvalidateCacheAction } from './invalidate-cache';
import { LambdaAgent } from './lambda-agent';
import { VerifyLambdaDeploymentAction } from './verify';

export class DeployHelloWorkflow extends Workflow {
    declare IArgument: Workflow['IArgument'] & {
        region: string;
        account: string;
    };

    async define() {
        await this.do('quality', new CodeQualityWorkflow());
        const result = await this.do(
            'deploy',
            new LambdaAgent({
                region: this.argument.region,
                account: this.argument.account,
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
```

Because we know the name of an action and its arguments, running it directly is very simple.

Let’s try running the _Code Quality_ workflow. Since the `DeployHelloWorkflow` action doesn’t require arguments, we can run:

```bash
orbits-cli actions run CodeQualityWorkflow -f src/orbits/orbi.ts --local-worker
```

We get the following graphical view of the workflow — everything is green, no errors!

![run results](/img/blog/cli/test-run.png)

Now let’s make the handler fail the tests. We’ll modify the code as follows:

```ts title="src/handler/hello.ts"
type HelloEvent = {
    queryStringParameters: {
        first_name?: string;
        last_name?: string;
    };
};

export const handler = async (
    event: HelloEvent
): Promise<{
    statusCode: number;
    body: string;
}> => {
    // const firstName = event.queryStringParameters.first_name;
    const firstName = 'Alice';
    const lastName = event.queryStringParameters.last_name;
    const now = new Date();
    return {
        statusCode: 200,
        body:
            `Hello ${[firstName, lastName].filter(Boolean).join(' ') || 'Guest'}, ` +
            `time is ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()} (UTC)`,
    };
};
```

When we re-run without exiting the process, the workflow fails and moves into the `ERROR` state. We can inspect the error in the logs, or view the result in the dedicated panel:

![run fail](/img/blog/cli/test-run-fail.png)

Let’s fix the test by restoring the original line:

```ts
const firstName = event.queryStringParameters.first_name;
// const firstName = 'Alice'; <-- remove this line
```

Now, in another terminal, we can replay the test action by its ID:

```bash
orbits-cli actions replay $ACTION_ID
```

Or replay the entire workflow starting from the test step:

```bash
orbits-cli actions replay $WORKFLOW_ID -p test
```

This time everything passes again — back to green ✅.

See it in action:
<video controls width='100%'>

  <source src='https://orbits-assets.s3.eu-west-3.amazonaws.com/public/videos/cli-replay.mp4'/>
</video>
<br/><br/>

### Going further

- You can now write and integrate CI/CD workflows directly into your own project.
- More than just workflows, orbits is especially useful when you want to share workflows across projects and tenants. Read our [blog series about orchestration](./2025-08-05-orchestration-in-typescript.md).
- As the project grows, we plan to add more helper functions to quickly build your CI/CD. Stay up to date by following the [github repository](https://github.com/LaWebcapsule/orbits).

---

_Wanna try it yourself? The complete example code and setup instructions are available in the [github repository](https://github.com/LaWebcapsule/orbits/tree/main/samples/simple-deployment-pipeline). Give it a spin!_
