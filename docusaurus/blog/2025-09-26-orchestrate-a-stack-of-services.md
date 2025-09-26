---
slug: orchestrate-stack
title: Orchestrating a stack of services across multiple environments
authors: [loic]
tags: [orchestration, node.js, workflow, orbits]
---

In our [previous blog post](./2025-08-05-orchestration-in-typescript.md), we introduced the basics of orchestration and showed how to write a deployment workflow for a backend service. 
Now, let’s take it further. 
Imagine our web agencies manage web services across multiple tenants : one cloud instance per client. The stack includes several services, such as frontend, authentication, and backend. And it must support multi-tenant deployment. This brings new challenges:
- coordinating deployments across environments
- sharing common resources (like a cloud account, a VPC, a database...) between services in the stack
- handling failures and rollbacks
- keeping each tenant isolated yet manageable
To address this, we need to go beyond simple workflows and start managing state, transitions, shared resources, and deployment strategies. 
Let’s see how simple this becomes with Orbits.

![orchestration](/img/blog/orchestration-2.png)
<!-- truncate -->

## From workflows to resources

In Orbits, a `Workflow` is a one-time execution: it runs, performs its actions, and then it's done. While this is useful, it's not enough when you want to manage stateful, reusable services across multiple environments or tenants.

Instead, Orbits introduces the concept of a `Resource`.

A `Resource` encapsulates both the identity of what you’re deploying and the logic for how to install, update, or manage it. Resources can be reused, composed, and tracked.

### Defining a BaseResource 

#### Giving an identity to our services

To manage multiple services per tenant—such as frontend and backend—we start by defining a BaseResource. This base class provides a common identity mechanism using the tenantId and a service-specific name. The `identity()` method uniquely identifies each resource instance, which allows Orbits to track, reconcile, and avoid duplicating shared resources.

```ts
export class BaseResource extends Resource{
  IArgument: {
    tenantId: string;
  };

  serviceName = 'base'

  identity() {
    return `${this.serviceName}-${this.argument.tenantId}`;
  }
}
```

#### Sharing a common installation step

Orbits ressources distinguishe between the installation phase and the update phase. This allows precise control over what happens during first-time deployment versus subsequent updates.

We can implement shared setup—such as Git repository creation and cloud account provisioning—in the `defineInstall()` method of BaseResource:

```ts
export class BaseResource extends Resource{

  defineInstall(){
    const createGit = new GitResource().setArgument({
      name : this.serviceName
    });
    const createAWS = new AWSResource().setArgument({
      id: this.tenantId
    });

    await Promise.all([
      this.do("git-install", createGit),
      this.do("aws-install", createAWS),
    ]);
  }
}
```

In this setup:
- GitResource uses `serviceName`, so each service (frontend, backend) gets its own Git repository.
- AWSResource uses `tenantId`, ensuring every services share the same cloud account for a given tenant—no duplicate account will be created.

### Differentiating frontend and backend

Once the shared installation is abstracted, each service can implement its own logic tailored to its infrastructure and operational needs.
Here we modify the `update` step.

#### Backend resource

```ts
export class BackendResource extends BaseResource{

  declare serviceName = 'backend'

  defineUpdate(){

    // Step 1: Deploy Infrastructure-as-Code
    const deploymentOutput = await this.do("iac-deploy", new BackCDKStack());

    // Step 2: Run SQL migrations inside the provisioned environment
    const migration = new RunSQLMigrations();
    migration.executor = new CloudExecutor(deploymentOutput.env);
    await this.do("sql-migrate", migration);
  }
}

```

#### Frontend resource

```ts
export class FrontendResource extends BaseResource{

  declare serviceName = 'frontend'

  defineUpdate(){
    // Step 1: Deploy Infrastructure-as-Code
    const deploymentOutput = await this.do("iac-deploy", new FrontCDKStack());

    // Step 2: clear caches inside the provisioned environment
    await this.do("clear-cdn-cache", new CdnClearCacheAction().setArgument({
      cdnArn : deploymentOutput.cdnArn
    }));
  }
}
```

This pattern offers:
- clear separation of concerns between services
- reusability of common setup logic
- flexibility for specialized behavior per service



### Scaling to multiple tenants

#### Managing a stack

Now let’s define an application stack that orchestrates both frontend and backend services. This approach gives us control over the deployment order, error handling, and rollback strategy.
Below is a schematic version of what this orchestration might look like:

```ts
export class MyStack extends Resource{
  defineUpdate(){
    //choose a deployment strategy
    //here we first deploy the frontend and then the backend.
    //could have done this in parellel
    const backendResource = new BackendResource().setArgument(this.argument);
    const frontendResource = new FrontendResource().setArgument(this.argument);
    try{
      await this.do("update-backend", backendResource);
      await this.do("update-frontend", frontendResource);
    }
    catch(err){
      //rollback to previous commit
      await this.do("rollback-backend", backendResource);
      await this.do("rollback-frontend", frontendResource)
    }
  }
}
```

:::tip
You could easily parallelize both deployments using Promise.all if the order doesn’t matter.
:::

#### Managing multiple tenants

To scale across tenants, we define a Tenants resource that loops over each tenant and applies the stack. Failures are isolated and can be reported via Slack, email, or any other channel.

```ts

export class Tenants extends Resource{

  // you would likely fetch this from a database
  tenants = ["clientA", "clientB", "clientC"]

  async defineUpdate() {
    const failed = [];

    for (const tenantId of this.argument.tenants) {
      try {
        await this.do("update-tenant", new MyStack().setArgument({ tenantId }));
      } catch (err) {
        failed.push({ tenantId, error: err });
        // Optionally notify immediately, or collect all and notify later
      }
    }

    if (failed.length > 0) {
      await this.do("notify-failures", new SlackNotification().setArgument({ failures: failed }));
    }
  }
    
}
```

## What Orbits takes care of under the hood


This simples syntax addresses common pain points in managing cloud services under the hood:
- avoiding duplication: when multiple executions of a resource run in parallel, Orbits ensures the same final state without recreating resources unnecessarily. The orchestrator intelligently determines what needs updating, skipping, or preserving.
- running scripts in different contexts : The concept of an executor provides a clean way to run specific actions within the right environment or context. Since infrastructure and scripts are managed together, it’s easy to target the exact environment where a command should execute.
- safe error handling: Encapsulating orchestration logic in `Resource` enables rollback strategies when something fails mid-deployment.
- multi-Tenant scalability: The `Tenants` resource allows applying the same stack logic across many clients, while isolating failures and surfacing them clearly.

## Possible enhancements 

This example provides a basic overview of how we manage multi-tenant deployments. Looking ahead, there are several potential improvements that can be explored:
- we could implement more complex rollback strategies 
- we could implement drift detection via the `cycle` hook
- we could share some resources accross tenants with the same concept of `Resource`



