import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export interface ParameterStoreStackProps extends StackProps {
    accountBId: string;
    accountBRoleArn: string;
}

export class ParameterStoreStack extends Stack {
    constructor(scope: cdk.App, id: string, props: ParameterStoreStackProps) {
        super(scope, id, props);

        const param = new ssm.StringParameter(this, 'MyParam', {
            parameterName: '/my/param',
            stringValue: 'HelloWorld',
        });

        const accessRole = new iam.Role(this, 'ParamReadRole', {
            roleName: 'ReadParamFromAccountA',
            assumedBy: new iam.ArnPrincipal(props.accountBRoleArn),
            description: 'Role that allows Account B to read a parameter',
        });

        param.grantRead(accessRole);

        new cdk.CfnOutput(this, 'paramArn', {
            value: param.parameterArn,
        });

        new cdk.CfnOutput(this, 'roleArn', {
            value: accessRole.roleArn,
        });
    }
}
