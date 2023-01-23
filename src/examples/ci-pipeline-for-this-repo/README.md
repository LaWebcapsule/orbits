# CI Pipeline example

This is an example of how to build a CI pipeline with Orbits.
This example is a live example : this app is currently managing the Github repository "LaWebcapsule/Orbits". 

## Scope

This example manages CI/CD workflows for the github repository "LaWebcapsule/Orbits".
It demonstrates how we think we should use Orbits for DevOps workflow :
- an entire Node.js package which only DevOps functions, actions.
You can change some variables to use it for your own repository.
Here is the state of the current implementation of the pipeline :
- :heavy_check_mark: publish npm packages on each commit on the master branch
- :construction_worker: test all PR before merging

## Architecture
- ./src/actions/ contains the Actions like publishing an npm package, updating package.json...
- ./src/workflows/ contains the Workflow for the different git branches behaviour.
- ./src/main-workflow/ will contains our main workflow
- ./index.ts contains the bootstrapping process

## Installation


### Requirements

See the requirements for [Orbits installation](./../../../README.md)
Secrets are currently passed through environment variables.
This package need four environment variables : `git_user`, `git_pwd`, `gh_token`, `NPM_TOKEN`

### Customizing the app

Once this folder downloaded on your machine and the requirements installed, you can :
- modify the bootstraping process with your mongodb url
- modify the git repository (current : LaWebcapsule/orbits)
- add or remove different steps of the process.
- e.g., you can integrate a pipeline with a CDK deployment (see the [cdk example](./../git-cdk-s3/README.md))



### Launching the app

- install the dependencies
```console
npm install
```
- build the app
```console
npm run build
```
- launch the app
```console
npm start
```

You can also use ts-node :
```console
npx ts-node index.ts
```