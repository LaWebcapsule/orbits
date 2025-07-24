---
sidebar_position: 3
---
# CDK8S simple deployment

A practical example demonstrating how to manage kube resources through CDK8S and orbits.

## Problem statement

CDK8S is powerful for defining Kubernetes resources, but it lacks built-in support for programmatic deployment, rollback mechanisms, or exposing outputs.
The Orbits CDK8S integration adds a [model-driven orchestration](https://www.wwt.com/blog/what-is-model-driven-orchestration-and-why-would-i-use-it) layer, making CDK8S fully operational in automated workflows.
With `Cdk8sResource` from Orbits, you gain:

- Programmatic deployment of your CDK8S charts;
- Automatic rollback in case of deployment failure;
- Pruning of obsolete resources removed from your charts;
- Output support to expose selected resource values for use in other stacks or systems;
- Fully customizable model-driven orchestrator.

Beyond deployment, Orbits enables you to:

- Consistently deploy your charts with built-in rollback mechanisms
  → Example: If a deployment fails due to a misconfigured resource, Orbits will automatically revert to the previous stable state.

- Extend your IaC logic, for example, by fetching the IP of a load balancer via SDK and updating your DNS provider
  → Example: After deploying an Ingress, Orbits can retrieve the LoadBalancer IP and automatically update a Route53 DNS record.

- Trigger redeployments automatically in response to specific events
  → Example: When a secret in AWS Secrets Manager is rotated, Orbits can detect the change and redeploy affected charts to refresh the credentials.

This sample demonstrates the use of Orbits on a minimal CDK8S use case.

## Prerequisites

### Clone this repository

- Clone [this repository](https://github.com/LaWebcapsule/orbits)
- Go to this directory :

```bash
cd samples/cdk8s-deployment
```

- Install node.js dependencies :
  `npm i``

### Setup kube environment

You'll need access to a Kubernetes environment.

- `kubectl` must be installed and properly configured.

This sample will use your current Kubernetes context, so ensure you're connected to the correct cluster before running any commands.

## Deployment

- Define your mongo_url :

```bash
export ORBITS_DB__MONGO__URL=your-mongo-url
```

- Deploy Cdk8s basic stack :

```bash
npx tsx src/orbits/orbi.ts
```

This command will:

- Create a new Kubernetes namespace
- Deploy a scheduled Job named hello-world that runs daily at 10:00 AM
- Output the namespace and job names in the console

### Verify the result

Get the namespace :

```bash
kubectl get namespaces -l orbits/stackName=cdk8s-basic
```

Get the job

```bash
export NS=$(kubectl get ns -l orbits/stackName=cdk8s-basic -o jsonpath='{.items[0].metadata.name}')
kubectl get all --namespace $NS -l orbits/stackName=cdk8s-basic
```

## Cleanup

To remove all deployed resources from both accounts:

```bash
export CDK8S_COMMAND=uninstall
npx tsx src/orbits/orbi.ts
```

## Project Structure

```bash
├── src/
│   ├── orbits/
│   │   └── orbi.ts # Main orchestration script
│   │   └── basic-resource.ts # Basic resource definition
│   └── cdk/              # CDK8S chart definitions
│       └── basic-cdk8s.ts # basic chart definition
├── package.json
└── README.md
```
