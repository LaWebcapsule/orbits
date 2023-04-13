import {Action, ActionState, ActionApp, bootstrapApp} from '@wbce/orbits-core'
import {Cli} from '@wbce/services'
import {DockerExecutor, EcrRegistry, PublicRegistry} from './../index'
import * as cdk from 'aws-cdk-lib'
import { CdkBoostrapAction, CdkDeployAction } from '../src/standards-actions/cdk/cdk-action'

export class DockerAction extends Action{
    executor = new DockerExecutor({
        registry : new PublicRegistry('node','16.14.2')
    })

    IResult: {
        z : number;
    }

    cli = new Cli();

    main() {
        return this.cli.command('node', ['--version']).then(()=>{
            this.result.z = 10;
            return ActionState.SUCCESS
        }, ()=>{
            return ActionState.ERROR
        })
    }
}


export class TestStack extends cdk.Stack{

    constructor(scope, name, props : cdk.StackProps){
        super(scope, name, props);

        this.node.setContext("test", true);

        const myVpc = cdk.aws_ec2.Vpc.fromLookup(this, 'vpc', {isDefault: true})
        
        new cdk.aws_s3.Bucket(this, 'my-bucket', {
            removalPolicy : cdk.RemovalPolicy.DESTROY
        })
    }
}

export class DeployTestStack extends CdkDeployAction{
    StackConstructor: typeof cdk.Stack = TestStack;

    executor = new DockerExecutor({
        registry : new PublicRegistry('node', '16'),
        dockerConfig : {
            env : {
                'AWS_ACCESS_KEY_ID': process.env['AWS_ACCESS_KEY_ID'],
                'AWS_SECRET_ACCESS_KEY': process.env['AWS_SECRET_ACCESS_KEY']
            }
        }
    })
}

export class BootstrapTestStack extends CdkBoostrapAction{
    StackConstructor: typeof cdk.Stack = TestStack;
}


@bootstrapApp({
    db: {
        mongo: {
            url: 'mongodb://localhost:27017/test'
        }
    }
})
export class TestApp extends ActionApp{
    declare = [DockerAction, DeployTestStack, BootstrapTestStack]
}