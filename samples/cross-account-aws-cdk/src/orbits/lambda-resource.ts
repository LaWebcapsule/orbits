import { CdkStackResource } from "@orbi-ts/fuel";
import { Stack } from "aws-cdk-lib";
import { LambdaStack } from "../cdk/lambda.js";


export class LambdaResource extends CdkStackResource{
    
    StackConstructor = LambdaStack;

    declare IOutput : {
        "roleArn": string
    } 
}