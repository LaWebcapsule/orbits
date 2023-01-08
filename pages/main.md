# Orbits documentation

Welcome on board ! You are at the good place to start a smooth travel and to configure your DevOps workflow to keep a stable orbit in the cloud galaxy !

# T.O.C.

- [What is orbit](#what-is-orbit)
- [Api documentation](./../docs/README.md)
- [Examples](./../src/examples/)
- [Cdk usage](./cdk.md)

# What is orbit ?

 - A flow manager for DevOps
 - A Continuous Integration and Continuous Deployment tool
 - A tool to manage CDK deployments and CDK life events programatically
 - An opinionated framework to make DevOps easier to deal with 
 - (A way to write Petri net)

Orbit is a node.js Typescript framework which allow you to write Ops pipe in a very similar manner you are used to write promises or events cycles.
Robusteness and precision are at the core of its developments.

# Why ?

We think that :
- we should not have a specific language for each tools (terraform, circleCI, gitlab... each one develops its own syntax)
- in the same spirit of the AWS CDK, we should dispose of complete language instead of writing configuration files
- we should not write DevOps in some hidden file/folder like .circleCI or .github
- we should be able to easily develop and test our pipelines on local
- we should be able to self-host our delivery pipelines.

Orbit is a proposal to solve this problems.


# Core concepts

An orbit pipeline has three main concepts.

## Actions

Actions are the building blocks of an orbit workflow. An action includes a typescript class that extends the `Action` core class. An action launch a command on a specific resource (creating an order, installing a new software on a machine, launching a Docker process...) and track the state of this command until it succeeds or fails. An action is a great way to follow the state of process that doesn't answer instantly.

You can know more about this [here](./action.md).

## Transaction

Once you have written the actions that will compose your app (payment order, cdk deploying, signs process), you can chain and orchestrate them within a transaction.
A transaction includes a typescript class that extends the `Transaction` core class.
Transaction allows to chain action in a Promise-like style, except that you have the guarantee of consistness even if your current process crashes.

You can know more about this [here](./transaction.md).

## Application

Once you have written the transactions that will compose your app, you have to create and bootstrap an Orbit app. There can be only one app by process. The app manages database configuration and maps the different actions that you can use.

You can know more about this [here](./app.md).

## A bit more

Additionnally, you will probably need to know about this points.

### Executors

Executors are a way to launch part of your workflow in a specific execution context (Docker, Lambda...). 
As a consequence, orbit give you a full and customizable control over your pipeline. You can custom the policies rights access at a granular level in your pipeline.
You can know more about this [here](./executor.md)

---> :construction_worker: Work in Progress ; we would be please to find contributors to go quicker.

### Cdk
The philosophy of this framework is near the philosophy of the cdk.
The two couples quite well and Orbit allows you use to programmatically manage a cdk app.
You can see an example here :

### Git integration
 
There are standard actions that allows to keep track of a repository states and to wait for some git events (new commits...)

---> :construction_worker: Work in Progress ; we would be please to find contributors to go quicker.

# Get startted

You can read :
- this
- this

# Examples

- Cdk example :
- Git example :
- Whole pipeline example :