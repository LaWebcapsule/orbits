# CDK Resources
CDK8S Resources let you programmatically manage and deploy your CDK8S charts.
It provides an enhanced way of working with the CDK8S, enabling you to:
- Consistently deploy your charts with built-in rollback mechanisms in case of failure  
- Extend your infrastructure-as-code logic (e.g., fetch the IP of a load balancer via SDK calls and update your DNS provider automatically)
- Trigger redeployments in response to specific events

## Installation

The `CdkResource` construct is part of the `@wbce/orbits-fuel` package.
You need to install it first:
```bash
npm install  @wbce/orbits-fuel
```
Then import it : 
```typescript
import {CdkResource} from "@wbce/orbits-fuel
```

### Prerequisite

- `kubectl` must be installed and properly configured.

## Encapsulate a CDK8S chart

Assume you have a CDK8S chart named `BasicChart`.
You wrap it in a CDK8S resource by extending the `Cdk8sResource` class.

```typescript
export class BasicResource extends Cdk8sResource {
  StackConstructor = BasicChart ;
}
```

### Outputs

In cdk8s, there is no-built in mechanism as Cloudformation or pulumi output.
With orbits, you can mimic this behaviour by defining your own output you can reuse elsewhere.
You define your output overriding the `setOutput` method.

#### Static output

You can output any values of the object in your stack. 
```typescript title="src/cdk/lambda-stack.ts"
export class BasicResource extends Cdk8sResource {
  StackConstructor = BasicChart ;
  stack: BasicChart;//for typing purpose

  async setOutput(): Promise<this["IOutput"]> {
    const stack = await this.generateStack();
    return {
      namespace: stack.ns.name,
      cronJobName: stack.cronJob.name
    }
  }
}
```
This way, you can, for example : 
- let the cdk8s generate a namespace name : `this.ns = new kplus.Namespace(this, 'my-namespace')`
- retrieve and output the generated name : 
```typescript title="src/cdk/lambda-stack.ts"
export class BasicResource extends Cdk8sResource {
  StackConstructor = BasicChart ;
  stack: BasicChart;//for typing purpose

  async setOutput(): Promise<this["IOutput"]> {
    const stack = await this.generateStack();
    return {
      namespace: stack.ns.name,
      cronJobName: stack.cronJob.name
    }
  }
}
```

#### Dynamic output

You can also want more complex export.
For example, you maybe need the ip of your loadbalancer in order to set this IP into your DNS.
- First in your stack, export the load balancer service : 
```typescript
````
- Then, in the `setOutput()`, query the kube api to have the IP address


```typescript title="src/orbits/lambda-resource.ts"
export class LambdaResource extends CdkResource{
    StackConstructor = `LambdaStack`

    declare IOutput : {
        roleArn: string
    }
}
```

## Consuming the resource

You can consume cdk resource in any workflow/resource.

```typescript title="src/orbits/my-workflow.ts"
export class MyWorkflow extends Workflow{
    
    async define(){
        //...
        await this.do("deployMyChart", new MyChartResource().setArgument({
            stackName: "my-chart",
            stackProps: {
                //other props that will be passed to the stack constructors.
                xyz: "xyz",
            }
        }))
    }
}
```

## Resource lifecycle


### Update step

The update step deploys the CDK8S stack, using argument.stackProps as input to the StackConstructor.

:::info
For advanced scenarios (e.g. when needing secrets or dynamic inputs), you can override the init method.
```typescript src="src/orbits/lambda-resource.ts"

secretValue = ""
async init(){
    this.secretValue = await this.getSecret(this.argument.secretId)
}
```
This lets you fetch secrets at runtime and ensures they are never stored by Orbits.
:::

The update step processus is : 
- synth the stack and deploy it through `kubectl apply`
- wait for the success of the deployment
- if the deployment is a success, prune old resources
- if the deployment is a failure, rollback to previous state and prune new resources


### Cycle step (drift detection)

By default, there is no cycle step defined.
However, the cycle hook can be used to do drift detection.
In this case, just define a cycle hook and choose what to do inside.
```typescript
defineCycle(){
    const currentState = await this.do("getCurrentState", ()=>{
        //some call with kube sdk
    })
    if(currentState !== this.argument.stackProps.someParams){
        //choose to redeploy
        await this.do("redeploy", this.clone().setCommand("Update"))
    }
}
```
By default, the cycle is run every 10 minutes.
You can override this parameters overiding `defaultResourceSettings`. 

### Uninstall step
The uninstall step removes the CDK8S stack from the kube environment.

## Resource output

You can retrieve Kube outputs from the deployed chart using `getResourceOutput()` method.

```typescript
        //shortcut to get cloudformation output of the stacks
        const myOutput = await this.do("getMyChartOutput", ()=>{
            return myChartResource.getResourceOutput();
        })
        //output are also available after a deployments
        const myChartOutput = await this.do("deployMyChart", myChartResource);

```
The type of `myChartOutput` will be `MyChart['IOutput']`.

## Kube credentials

By default, the stack will be deployed using the local kubeconfig of your environment.
However, you can explicitly define how the kubeconfig is selected.

** Example: Using a specific kubeconfig file **
You can specify the way kubeConfig is chosen .
```typescript
new MyChartResource().setArgument({
    kubeConfig: {
      from : {
        file : '/tmp/my-file', //path to the file
        cluster: boolean
      }
    }
})
```

** Advanced Use Cases **

In more complex scenarios, you might need to download the `kubeconfig` dynamically before deploying.
You may also want to standardize how kube credentials are handled across all your actions, instead of specifying kubeConfig every time you instantiate a chart resource.
To do this, you can override the asynchronous `setKubeApi` method:

```typescript
export class MyChartResource extends Cdk8sResource {
  
  override async setKubeApi() {
    // Download the kubeconfig file, e.g., from your cloud provider
    await getConfigFile(this.argument.clusterName);

    this.kubeApi = new KubeApi({
      from: {
        file: '/path/to/the/downloaded/config'
      }
    });
  }
}
```


