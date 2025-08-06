---
slug: orchestration-typescript
title: A deployment workflow with typescript
authors: [louis]
tags: [orchestration, self-adaptive platform, drift-detection, automation, orbits, workflow]
---

In modern platform engineering, building a developer self-service portal isn’t just about provisioning — it’s about ensuring the entire [golden path](https://www.redhat.com/en/topics/platform-engineering/golden-paths) reliably completes, from infrastructure to runtime configuration.
Whether you're spinning up environments for feature previews or onboarding a new client, orchestration is [the logic that holds everything together](https://platformengineering.org/blog/why-your-internal-developer-platform-needs-a-backend) — especially when things go wrong.
Your orchestrator should let you observe state transitions and trigger specific commands accordingly—whether it's provisioning, reconciling drift, or handling failures.

![workflow](/img/blog/workflow.png)


<!-- truncate -->

## Example: deploying a backend from stratch

Let’s walk through a typical use case for an agency or SaaS company: deploying a new backend environment for a client or project. This often involves:
- Creating a dedicated cloud account
- Creating a Git repository
- Deploying infrastructure-as-code (e.g., CDK or Terraform)
- Running SQL migrations in the target environment
- Notifying the team of success or failure

Here’s how you would orchestrate that using Orbits:


### A Simple declarative workflow in typeScript
 

```ts
export class DeployBackend extends Workflow {
  async define() {
    try {
      // Step 1: Create Git and Cloud resources in parallel
      const createGit = new CreateGitRepo();
      const createAWS = new CreateAWSAccount();

      await Promise.all([
        this.do("git-create", createGit),
        this.do("aws-create", createAWS),
      ]);

      // Step 2: Deploy Infrastructure-as-Code
      const deploymentOutput = await this.do("iac-deploy", new DeployCDKStack());

      // Step 3: Run SQL migrations inside the newly provisioned environment
      const migration = new RunSQLMigrations();
      migration.executor = new CloudExecutor(deploymentOutput.env);
      await this.do("sql-migrate", migration);

    } catch (err) {
      // Step 4: Handle errors with a notification
      await this.do("notify-slack", new SendSlackAlert().setArgument(err));
    }
  }
}

```

### Advantages

#### Inheritance and code reuse

When managing multiple services (e.g., backend, frontend, authentication), it's common to share infrastructure logic—like creating a Git repository or provisioning a cloud account.

Orbits makes this easy by allowing you to extract shared logic into a base class:

```ts 
export class BaseWorkflow extends Workflow{

    defineCreation(){
        const createGit = new CreateGitRepo();
        const createAWS = new CreateAWSAccount();

        await Promise.all([
            this.do("git-create", createGit),
            this.do("aws-create", createAWS),
        ]);
    }
}
```
You can then extend this base in specific workflows:

```ts
export class FrontendWorkflow extends BaseWorkflow{
  // Additional frontend-specific steps
}
```
By properly modeling shared resources, you can also ensure that different services (like frontend and backend) reuse the same AWS account rather than creating duplicates.


#### TypeScript ecosystem

Since Orbits is written in TypeScript, you can directly use SDKs from your providers (like the AWS SDK).
For example, in order to create an AWS account, you can just call : 
```ts
const client = new OrganizationsClient();
client.send(
    new CreateAccountCommand({
        AccountName: name,
        Email: email,
    })
);
```


#### Test on local

All the orchestrator run inside your node.js process.
As a consequence, you can run and test your workflows locally, just like any other TypeScript code — enabling fast iteration and simplified debugging during development.


### Going further

Want to go further and orchestrate multiple tenants or environments? Check out our next post on managing a fleet of stacks with Orbits.