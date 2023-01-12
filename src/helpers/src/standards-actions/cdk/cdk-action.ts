import { Action, ActionApp, ActionState } from "@wbce/orbits-core";
import { Cli } from "@wbce/services";
import * as cdk from "aws-cdk-lib"
import { existsSync, readFileSync } from "fs";
import { DockerExecutor, EcrRegistry, PublicRegistry } from "../../executors";
import {CloudFormationClient, CloudFormationClientConfig, DescribeStackResourceCommand } from '@aws-sdk/client-cloudformation';
import { CdkHelper } from "./cdk-helper";



export class CdkAction extends Action{
    cli = new Cli();
    cdkApp = new cdk.App();
    StackConstructor : typeof cdk.Stack;
    stack : cdk.Stack;

    commandName : 'deploy' | 'bootstrap' | 'destroy';

    executor = new DockerExecutor({
        registry : new PublicRegistry('contino/aws-cdk'),
        dockerfile : './Dockerfile'
    })

    IArgument : {
        cdkContext? : {
            [k : string] : any
        },
        stackName: string,
        stackProps? : {
            env? : {
                account: string,
                region: string
            },
            [key : string]: any
        }
    }

    IResult: any;

    init(){
        this.setContextFromArgument();
        this.stack = new this.StackConstructor(this.cdkApp, this.argument.stackName, this.argument.stackProps) 
        return Promise.resolve();
    }

    main(){
        this.cdkApp.synth();
        let commandArguments : string[] = [this.commandName];
        switch (this.commandName) {
            case 'bootstrap':
                if(this.argument.stackProps?.env){
                    const env = this.argument.stackProps.env
                    commandArguments = [...commandArguments, `aws://${env.account}/${env.region}`]
                }
                break;
        
            default:
                break;
        }
        commandArguments = [...commandArguments, '--no-interactive', '--require-approval=never', '--app', this.cdkApp.outdir]
        //e.g.
        //commandArguments = ['deploy', '--no-interactive', '--app', this.cdkApp.outdir];
        return this.cli.command('cdk', commandArguments).then(()=>{
            if(existsSync(`${this.cdkApp.outdir}/cdk.context.json`)){
                this.result = JSON.parse(readFileSync(`${this.cdkApp.outdir}/cdk.context.json`).toString());
            }
            return ActionState.SUCCESS
        })
    }

    setContextFromArgument(){
        for(const k in this.argument.cdkContext){
            this.cdkApp.node.setContext(k, this.argument.cdkContext[k]);
        }
    }

    watcher(): Promise<ActionState> {
        const opts = {};
        const region = this.argument.stackProps?.env.region;
        region ? opts['region'] = region : undefined;
        const cdkHelper = new CdkHelper(opts);
        return cdkHelper.describeStack(this.stack).then((stackDescription)=>{
            if(stackDescription.LastUpdatedTime.getTime() <= this.dbDoc.stateUpdatedAt.getTime()){
                //it has not begin
                return ActionState.SLEEPING;
            }
            if(stackDescription.StackStatus.includes('IN_PROGRESS')){
                return ActionState.IN_PROGRESS
            }
            if(stackDescription.StackStatus.includes('ROLLBACK')){
                return ActionState.ERROR
            }
            if(stackDescription.StackStatus.includes('COMPLETE')){
                return ActionState.SUCCESS
            }
        }).then(()=>{
            return ActionState.SUCCESS
        }).catch((err : Error)=>{
            if(err.message.includes('Stack with id') && err.message.includes('doest not exist')){
                return ActionState.SLEEPING
            }
            throw err;
        })
    }

}

export class CdkBoostrapAction extends CdkAction{
    commandName = 'bootstrap' as 'bootstrap';
}

export class CdkDeployAction extends CdkAction{
    commandName = 'deploy' as 'deploy'
    defaultDelays = { 
       [ActionState.EXECUTING_MAIN] : 10*60*1000,
       [ActionState.IN_PROGRESS]: 10*60*1000 
    };
    RollBackAction = CdkDestroyAction;
}

export class CdkDestroyAction extends CdkAction{
    commandName = 'destroy' as 'destroy';
    defaultDelays = { 
        [ActionState.EXECUTING_MAIN] : 10*60*1000,
        [ActionState.IN_PROGRESS]: 10*60*1000 
     };
}

export class CdkHelperApp extends ActionApp{
    declare = [CdkBoostrapAction, CdkDeployAction, CdkDestroyAction ]
}
