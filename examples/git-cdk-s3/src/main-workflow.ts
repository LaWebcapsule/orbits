import { Action, Workflow } from '@orbi-ts/core';
import { CdkBoostrapAction, CdkHelper, CdkHelperApp } from '@orbi-ts/fuel';
import {
    CdkBootstrapFrontStack,
    CdkDeployFrontStack,
} from './cdk-stack/cdk-action';
import * as s3Client from '@aws-sdk/client-s3';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { FrontStack } from './cdk-stack/cdk-stack';
import { App } from 'aws-cdk-lib';

const defaultEnv = {
    account: '123456789',
    region: 'eu-west-3',
};

export class CiPipeline extends Workflow {
    define() {
        const stackName = 'my-first-pipe';
        console.log('ciPipeline define');
        this.next(() => {
            //cdk bootstrap
            const bootstrapAction = new CdkBootstrapFrontStack();
            bootstrapAction.setArgument({
                stackName,
                stackProps: {
                    env: defaultEnv,
                },
            });
            return bootstrapAction;
        })
            .next(() => {
                //cdk first deploy
                const deployAction = new CdkDeployFrontStack();
                deployAction.setArgument({
                    stackName,
                    stackProps: {
                        env: defaultEnv,
                    },
                });
                return deployAction;
            })
            .next(() => {
                //copy file to s3
                const myStack = new FrontStack(new App(), stackName, {
                    env: defaultEnv,
                });
                const s3Client = new S3Client({ region: 'eu-west-3' });
                const cdkHelper = new CdkHelper({ region: 'eu-west-3' });
                return cdkHelper
                    .describePhysicalResource(myStack.bucket, myStack)
                    .then((res) => {
                        const command = new PutObjectCommand({
                            Body: 'test!',
                            Bucket: res.StackResourceDetail.PhysicalResourceId,
                            Key: 'test',
                        });
                        return s3Client.send(command);
                    })
                    .then(() => Action.resolve())
                    .catch((err) => {
                        console.log(err);
                        throw err;
                    });
            });
        return Promise.resolve();
    }
}
