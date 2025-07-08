# CDK8S deployment example

A practical example demonstrating how to manage kube resources through CDK8S and orbits. 

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
```bash export ORBITS_DB__MONGO__URL=your-mongo-url```
- Deploy Cdk8s basic stack : 
```bash npx tsx src/orbits/orbi.ts```
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
│   │   ├── basic-resource.ts # Basic resource definition
│   ├── cdk/              # CDK8S chart definitions
│   │   ├── basic-cdk8s.ts # basic chart definition
├── package.json
└── README.md
```
