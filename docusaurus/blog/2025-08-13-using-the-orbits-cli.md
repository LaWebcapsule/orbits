---
slug: using-the-orbits-cli
title: Using the Orbits CLI to handle your CI/CD
authors: [tom]
tags: [orchestration, orbits, cli, aws-cdk, ci/cd]
---

So far, using Orbits on its own lacks some tooling that makes it a proper enjoyable experience.
If your deployment process is just a scrolling wall of text logs or database entries, you’re flying blind when something breaks.

Orbits CLI changes that. It turns your deployments into a monitored, visual, and interactive experience right from your terminal. You see each step, track progress in real time, and quickly drill down when something fails — without relying solely on logs.

In this post, we’ll walk through a real-world example of using Orbits with its CLI to:

- Run code quality checks
- Deploy an AWS Lambda stack with CDK
- Invalidate CloudFront caches
- Verify everything is running smoothly

<!-- truncate -->

## Example: handle yor CI/CD from your terminal with Orbits

We will demo the cli using the [Hello world on AWS lambda sample](https://github.com/LaWebcapsule/orbits/tree/main/samples/hello-world-on-aws) we have on the Orbits repository.

This sample deploys an AWS Lambda that will respond to a GET request with this architecture:

```
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│   cloudfront   │◄──►│   api gateway  │◄──►│   lambda       │
└────────────────┘    └────────────────┘    └────────────────┘
```

Our complete workflow is:

1. Format, lint and test our Lambda code
2. Deploy it to AWS using CDK
3. Clear the CloudFront cache
4. Check the deployed endpoint

### Setup your environment

First, install the CLI, either globally or in your project:

```bash
npm i @orbi-ts/cli -g
```

Export the AWS region and account to env variables:

```bash
export AWS_REGION=you-aws-region
export AWS_ACCOUNT=you-aws-account
```

The CLI uses `mongodb://localhost:27017/orbits` as default for the mongo database URL.
If you want to change, set the proper env variable:

```bash
export ORBITS_DB__MONGO__URL=your-mongo-url
```

### Orbits

Let's list the Orbits actions that are available in this project:

```bash
➜ orbits-cli actions get-registry src/orbits/orbi.ts

ACTION REF                   ┆ ACTION KIND
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
AddGitWebHookAction          ┆ Action
Cdk8sResource                ┆ Resource
CdkBootstrapAction           ┆ Action
CdkDeploy                    ┆ Action
CdkDeployAction              ┆ Action
CdkDestroyAction             ┆ Action
CdkStackResource             ┆ Resource
CodeQualityWorkflow          ┆ Workflow
DeployHelloWorkflow          ┆ Workflow
FormatCodeAction             ┆ Action
GitAction                    ┆ Action
InvalidateCacheAction        ┆ Action
LambdaResource               ┆ Resource
LintCodeAction               ┆ Action
TestCodeAction               ┆ Action
VerifyLambdaDeploymentAction ┆ Action
WaitForNewCommits            ┆ Action
```

This gives us a quick view of the available Orbits actions, workflows and resources, that were declared and imported from `orbi.ts`.

As it is not possible yet to get the arguments list from the cli, we need to check the actual code,
so let's see what we have in `src/orbits/orbi.ts`:

```ts title="src/orbits/orbi.ts"
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
                endpoint: 'https://' + result.CfDomainName,
            })
        );
    }
}
```

In this example, we declared the following actions, workflows and resources:

- `DeployHelloWorkflow`: _main_ workflow that defines the whole deployment;
- `CodeQualityWorkflow`: code quality workflow, format, lint and test;
- `FormatCodeAction`: format action;
- `LintCodeAction`: lint action;
- `TestCodeAction`: test action;
- `LambdaResource`: resource definition for the lambda cdk stack;
- `InvalidateCacheAction`: action that invalidates the cloudfront cache;
- `VerifyLambdaDeploymentAction`: action that verify that the stack is up and running.

Here is how you would run this workflow without using the CLI:

```ts
await ActionRuntime.activeRuntime.waitForBootstrap;
const deploy = new DeployHelloWorkflow().setArgument({
    lambdaEntryPath: '/path/to/src/handler/hello.ts',
    region: process.env['AWS_REGION'],
    account: process.env['AWS_ACCOUNT'],
});
helloResource.save();
```

Now let's see how we can do the same with the CLI.

#### First run

Knowing the name of an Action and its arguments, running it is very easy.

Let's try to run the Code Quality workflow.
We see from the `DeployHelloWorkflow` class that it takes one argument `codePath`:

```bash
orbits-cli actions run CodeQualityWorkflow codePath=$PWD/src/handler/hello.ts -f src/orbits/orbi.ts --local-worker
```

We obtain this graphical view of the workflow, we can see that everything is green, no error!
![run results](/img/blog/cli/test-run.png)

Let's edit the handler code to fail the tests:

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

We now run again, without exiting the process. The workflow will fail and be in `ERROR` state. We can see the error in the logs, and also check the actual result in the dedicated panel.
![run fail](/img/blog/cli/test-run-fail.png)

Let's fix the test:

```ts
const firstName = event.queryStringParameters.first_name;
// const firstName = 'Alice'; <-- remove this line
```

In another terminal, we can now replay the test action with its ID:

```bash
orbits-cli actions replay $ACTION_ID
```

Or we can replay the whole workflow from the test step:

```bash
orbits-cli actions replay $WORKFLOW_ID -p test
```

It is now back to green!

See it in action:
<video controls width='100%'>

  <source src='https://orbits-assets.s3.eu-west-3.amazonaws.com/public/videos/cli-replay.mp4'/>
</video>

## Deploy the actual stack

From peeking at `orbi.ts` we know that `DeployHelloWorkflow` takes three arguments:

- `lambdaEntryPath`: the absolute path to our lambda handler, it will be passed to the stack
- `region`: the AWS region
- `account`: the AWS account

So running it is as easy as typing this command:

```bash
orbits-cli actions run -f src/orbits/orbi.ts --local-worker -b \
  DeployHelloWorkflow \
  lambdaEntryPath=$PWD/src/handler/hello.ts \
  region=$AWS_REGION \
  account=$AWS_ACCOUNT
```

**Note:** the `-b, --background` option will fork a child process running the worker, that allows not polluting the standard output and keep a nice looking display.

Here is a video of the deployment:

<video controls width='100%'>
  <source src='https://orbits-assets.s3.eu-west-3.amazonaws.com/public/videos/cli-run.mp4'/>
</video>

We can get the result of the deploy action using the get method (provided its ID is `689de1b3fcb667fee45a4bfe`):

```bash
➜ orbits-cli actions get 689de1b3fcb667fee45a4bfe
ID                       ┆ ACTION REF     ┆ STATE   ┆ RESULT                                                                                                                                                             ┆ LAST ACTIVITY ┆ NEXT ACTIVITY ┆ PARENT > REF
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
689de1b3fcb667fee45a4bfe ┆ LambdaResource ┆ SUCCESS ┆ {"CfId":"E28NIDFX6OEEC6","HelloAPIEndpointA3FBFD89":"https://fueo1zarcg.execute-api.eu-west-3.amazonaws.com/prod/","CfDomainName":"d16q083cvq1ymk.cloudfront.net"} ┆ —             ┆ in 7min 45s   ┆ 689de1b1fcb667fee45a4bc1 > deploy
```

At any moment you can run watch `ACTION_ID` to get the graphical view.

```bash
orbits-cli actions watch <ACTION_ID>
```

Since the cdk resource resumes every 10 minutes, you may want to resume it sooner, in that case you can do:

```bash
orbits-cli actions resume <ACTION_ID>
```

:::note
Except for the `run --local-worker` method, all CLI methods interact with the database. If no Orbits CRON is processing actions in the database, nothing will happen.
:::

### Cleanup

To remove all deployed resources, we will again use the cli. We run `LambdaResource`, with the `uninstall` command name.

From the definition of `DeployHelloWorkflow`, we see it takes a few other arguments:

```ts
new LambdaResource().setArgument({
    stackName: 'hello-lambda',
    stackProps: {
        lambdaEntryPath: this.argument.lambdaEntryPath,
        env: {
            region: this.argument.region,
            account: this.argument.account,
        },
    },
});
```

We saw previously that we could pass arguments to the cli with `codePath=$PWD/src/handler/hello.ts`. It also accepts json, which will prove useful:

```bash
argument=$(cat<<EOF
{
  "commandName": "uninstall",
  "stackName": "hello-lambda",
  "stackProps": { "env": { "region": "$AWS_REGION" }}
}
EOF
)
orbits-cli actions run LambdaResource $argument -f src/orbits/orbi.ts --local-worker
```

And you're done!

---

_Wanna try it yourself? The complete example code and setup instructions are available in the [github repository](https://github.com/LaWebcapsule/orbits/tree/main/samples/hello-world-on-aws). Give it a spin!._ -->
