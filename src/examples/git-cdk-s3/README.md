# Cdk example

This is an example of how to use the AWS CDK with Orbits.  
This example has the purpose to be simple ; if you want to use it in real life, you will have to custom it.  

## Scope

This example deploy a front stack (cloudfront+s3 bucket) and, after the deployment, dynamically add an object to the bucket.

## Architecture
- ./src/cdk-stack/cdk-stack.ts contains the cdk stack class.
- ./src/cdk-stack/cdk-action.ts contains the Action class that allow to deploy the cdk stack.
- ./src/main-workflow.ts contains our main workflow.
- ./index.ts contains the bootstrapping process

## Installation


### Requirements

See the requirements for [Orbits installation](./../../../README.md)

### Customizing the app

Once this folder downloaded on your machine and the requirements installed, you can :
- modify the bootstraping process with your mongodb url
- modify the stack with a specific bucketName

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

#### With docker compose

- Copy the docker-compose file at the root of this git project.
```console
cp ./../../../docker-compose.yml ./docker-compose.yml
```
- Launch the app with docker-compose.
```console
docker compose up
```
