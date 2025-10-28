import {
    CloudFormationClient,
    CloudFormationClientConfig,
    DeleteStackCommand,
    DescribeStackResourceCommand,
    DescribeStacksCommand,
    GetTemplateSummaryCommand,
} from '@aws-sdk/client-cloudformation';
import * as cdk from 'aws-cdk-lib';

export class CdkHelper {
    cfnClient: CloudFormationClient;

    constructor(opts?: CloudFormationClientConfig) {
        this.cfnClient = new CloudFormationClient(opts);
    }

    describePhysicalAgent(stackAgent: cdk.Resource, stack: cdk.Stack) {
        const command = new DescribeStackResourceCommand({
            LogicalResourceId: stack.getLogicalId(
                stackAgent.node.defaultChild as any
            ),
            StackName: stack.stackName,
        });
        return this.cfnClient.send(command);
    }

    describeStack(stack: cdk.Stack) {
        const command = new DescribeStacksCommand({
            StackName: stack.stackName,
        });
        return this.cfnClient.send(command).then((res) => res.Stacks[0]);
    }

    describeStackFromName(stackName: string) {
        const command = new DescribeStacksCommand({
            StackName: stackName,
        });
        return this.cfnClient.send(command).then((res) => res.Stacks[0]);
    }

    describeStackTemplate(stackName: string) {
        const command = new GetTemplateSummaryCommand({
            StackName: stackName,
        });
        return this.cfnClient.send(command).then((res) => res);
    }

    deleteStack(stackName: string) {
        const command = new DeleteStackCommand({
            StackName: stackName,
        });
        return this.cfnClient.send(command);
    }
}
