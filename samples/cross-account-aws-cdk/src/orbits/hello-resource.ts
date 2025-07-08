import { LambdaResource } from "./lambda-resource.js";
import { Resource } from "@orbi-ts/core";
import { ParamResource } from "./param-resource.js";


export class HelloResource extends Resource{

    declare IArgument: { 
        accountA : {
            id: string,
            profile: string
        },
        accountB : {
            id: string,
            profile : string
        },
        region: string
     } & Resource['IArgument'];

    identity() {
        return "hello"
    }

    async defineInstall(){
        await this.do("firstDeployLambda", this.constructLambdaResource());
    }

    async defineUpdate(){
        const lambdaResource = this.constructLambdaResource();

        const lambdaOutput = await this.do("getLambdaOutput", ()=>{
            return lambdaResource.getResourceOutput();
        })

        const paramOutput = await this.do("updateParam", this.constructParamResource(lambdaOutput));

        await this.do("updateLambda", this.constructLambdaResource(paramOutput))
    }

    async defineUninstall(){
        await this.do("uninstallLambda", this.constructLambdaResource().setCommand("Uninstall"));
        await this.do("uninstallParam", this.constructParamResource().setCommand("Uninstall"))
    }

    constructLambdaResource(paramOutput? : ParamResource['IOutput']){
        return new LambdaResource().setArgument({
            stackName: "lambda",
            awsProfileName: this.argument.accountB.profile,
            stackProps: {
                accountARoleArn: paramOutput?.roleArn,
                parameterArn: paramOutput?.paramArn,
                env: {
                    region: this.argument.region,
                    account: this.argument.accountB.id
                }
            }
        })
    }

    constructParamResource(lambdaOutput? : LambdaResource['IOutput']){
        return new ParamResource().setArgument({
            stackName: "param",
            awsProfileName: this.argument.accountA.profile,
            stackProps: {
                accountBId: this.argument.accountB.id,
                accountBRoleArn: lambdaOutput.roleArn,
                env: {
                    region: this.argument.region,
                    account: this.argument.accountA.id
                }
            }
        })
    }
}