---
title: Introduction to Concepts
---

# Orbits documentation

Welcome on board! You are at the good place to start a smooth travel and to configure your DevOps workflow to keep a stable orbit in the cloud galaxy!

# T.O.C.

- [What is orbits](#what-is-orbits)
- [Api reference](./../docs/README.md) ( :construction_worker: Redaction in Progress )
- [Examples](./../src/examples/)
- [Cdk usage](./cdk.md)

# What is orbits?

- A flow manager for DevOps
- A Continuous Integration and Continuous Deployment tool
- A tool to manage CDK deployments and CDK life events programmatically
- An opinionated framework to make DevOps easier to deal with
- (A way to write Petri net)

Orbits is a node.js Typescript framework which allows you to write Ops pipe in a very similar manner you are used to write promises or events cycles.
Robustness and precision are at the core of its developments.

# Why?

We think that:

- we should not have a specific language for each tool (terraform, circleCI, gitlab... each one develops its own syntax);
- in the same spirit of the AWS CDK, we should dispose of a complete language instead of writing configuration files;
- we should not write DevOps in some hidden file/folder like `.circleCI` or `.github`;
- we should be able to easily develop and test our pipelines locally;
- we should be able to self-host our delivery pipelines.

Orbits is a proposal to solve these problems.

# Core concepts

An orbits pipeline has three main concepts.

## Actions

Actions are the building blocks of an orbits workflow. An action includes a typescript class that extends the `Action` core class. An action launches a command on a specific resource (creating an order, installing new software on a machine, launching a Docker process...) and tracks the state of this command until it succeeds or fails. An action is a great way to follow the state of a process that doesn't terminate instantly.

You can know more about actions [here](./action.md).

## Workflows

Once you have written the actions that will compose your app (payment order, cdk deploying, signs process), you can chain and orchestrate them within a workflow.
A workflow includes a typescript class that extends the `Workflow` core class.
Workflows allow to chain action in a Promise-like style, except that you have the guarantee of consistency even if your current process crashes.

You can know more about workflows [here](./workflow.md).

## Application

Once you have written the workflows that will compose your app, you have to create and bootstrap an Orbits app. There can be only one app by process. The app manages the database configuration and maps the different actions that you can use.

You can know more about apps [here](./app.md).

## A bit more

Additionally, you will probably need to know about these points.

### Executors

Executors are a way to launch parts of your workflow in specific execution contexts (Docker, Lambda...).
As a consequence, Orbits gives you complete, customizable control over your pipeline. You can customize the access rights at a granular level in your pipeline and give specific policies to an action.

You can know more about executors [here](./executor.md).

---> :construction_worker: Work in Progress; we would be pleased to find contributors to go quicker.

### Cdk

The philosophy of this framework is close to the philosophy of the cdk.
The two couple quite well and Orbits allows you to programmatically manage a cdk app.

You can look at an example [here](./../src/examples/git-cdk-s3/).

### Git integration

There are standard actions to keep track of repository states and wait for some git events (new commits...).

---> :construction_worker: Work in Progress; we would be pleased to find contributors to go quicker.

# Examples

- [Hello world example](./../src/examples/basic-bash-example/)
- [Cdk example](./../src/examples/git-cdk-s3/)
- [Whole pipeline example](./../src/examples/ci-pipeline-for-this-repo)

# Installation

Please, see [the readme](./../README.md).
