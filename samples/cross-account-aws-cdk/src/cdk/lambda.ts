import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface LambdaStackProps extends StackProps{
    accountARoleArn: string,
    parameterArn : string
}

export class LambdaStack extends Stack {
  constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
    super(scope, id, props);


    // Lambda function
    const helloLambdaFunction = new lambda.Function(this, 'CrossAccountLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
        const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');

        exports.handler = async () => {
          const stsClient = new STSClient({});
          
          const assumeRoleCommand = new AssumeRoleCommand({
            RoleArn: '${props?.accountARoleArn}',
            RoleSessionName: 'CrossAccountSSMSession'
          });

          const { Credentials } = await stsClient.send(assumeRoleCommand);

          const ssmClient = new SSMClient({
            credentials: {
              accessKeyId: Credentials.AccessKeyId,
              secretAccessKey: Credentials.SecretAccessKey,
              sessionToken: Credentials.SessionToken,
            }
          });

          const getParameterCommand = new GetParameterCommand({
            Name: '${props?.parameterArn}',
          });

          const param = await ssmClient.send(getParameterCommand);
          console.log('Param:', param.Parameter.Value);
        };
      `),
      timeout: cdk.Duration.seconds(10),
    });

    if(props.accountARoleArn){
      helloLambdaFunction.addToRolePolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['sts:AssumeRole'],
        resources: [props?.accountARoleArn]
      }));
    }

    new cdk.CfnOutput(this, 'roleArn', {
        value: helloLambdaFunction.role?.roleArn!
    })
  }
}
