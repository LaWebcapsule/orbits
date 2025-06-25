import { BaseCredentials, BootstrapEnvironments, NonInteractiveIoHost, StackSelectionStrategy, Toolkit } from '@aws-cdk/toolkit-lib';
import { Action, ActionState } from '@wbce/orbits-core';
import * as cdk from 'aws-cdk-lib';
import { CdkHelper } from './cdk-helper.js';


class CdkAction extends Action{

    IArgument: {
        stackName : string
        stackProps : cdk.StackProps & {env: cdk.Environment}
        awsProfileName?: string 
    } & Action['IArgument']

    IBag: {
        env : cdk.Environment
    } & Action['IBag']

    stackName : string;

    getBaseCredentials(){
        return BaseCredentials.awsCliCompatible({
            profile: this.argument.awsProfileName || 'default'
        })
    }

    generateNewToolkit(){
        const ioHost = new NonInteractiveIoHost({
            isCI: true,
        })
        const mapLogLevel = {
            'result': 'info',
            'trace': 'debug'
        };
        ioHost.notify = async (msg)=>{
            this.runtime.logger.log({
                ...msg,
                level : mapLogLevel[msg.level] || msg.level,
                data : undefined,
                message : msg.message
            });
            if(this.dbDoc.stateUpdatedAt.getTime() > Date.now()- 30*1000){
                await this.notifyHealth();
            }
        }

        const toolkit = new Toolkit({
            color: false,
            emojis: false,
            ioHost,
            sdkConfig: {
                baseCredentials: this.getBaseCredentials()
            }   
        });
        return toolkit;
    }

    getStackName(){
        return this.argument.stackName;
    }

    onMainTimeout(): ActionState | Promise<ActionState> {
        return this.watcher();
    }

    watcher(): Promise<ActionState> {
        const opts = {};
        opts['region'] =
            this.argument.stackProps?.env.region || this.bag.env?.region;
        opts['profile'] = this.argument.awsProfileName;
        const cdkHelper = new CdkHelper(opts);
        return cdkHelper
            .describeStackFromName(
                this.getStackName()
            )
            .then((stackDescription) => {
                const lastDeployTime =
                    stackDescription.LastUpdatedTime ||
                    stackDescription.CreationTime; //after the first deploy of a stack, there is no LastUpdatedTime
                if (
                    lastDeployTime.getTime() <= this.dbDoc.createdAt.getTime()
                ) {
                    //it has not begin
                    return ActionState.SLEEPING;
                }
                if (stackDescription.StackStatus.includes('IN_PROGRESS')) {
                    return ActionState.IN_PROGRESS;
                }
                if (stackDescription.StackStatus.includes('ROLLBACK')) {
                    return ActionState.ERROR;
                }
                if (stackDescription.StackStatus.includes('COMPLETE')) {
                    return ActionState.SUCCESS;
                }
                return ActionState.UNKNOWN;
            })
            .catch((err: Error) => {
                if (
                    err.message.includes('Stack with id') &&
                    err.message.includes('doest not exist')
                ) {
                    return ActionState.SLEEPING;
                }
                throw err;
            });
    }
}

export class CdkBootstrapAction extends CdkAction{

    getStackName(): string {
        return 'CDKToolkit'
    }

    main(){
        const toolkit = this.generateNewToolkit();

        return toolkit.bootstrap(BootstrapEnvironments.fromList([`aws://${this.argument.stackProps.env.account}/${this.argument.stackProps.env.region}`])).then(()=>{
            return ActionState.SUCCESS
        }).finally(async ()=>{
            await (this.notifyHealthPromise || Promise.resolve())
        })
    }
    
}

export class CdkDeployAction extends CdkAction {

    IArgument: {
        cdkContext?: {
            [k: string]: any;
        };
    } & CdkAction['IArgument']

    static permanentRef = "CdkDeploy"

    static defaultDelays = {
        [ActionState.EXECUTING_MAIN]: 10 * 60 * 1000,
        [ActionState.IN_PROGRESS]: 10 * 60 * 1000,
    };

    cdkApp : cdk.App;
    StackConstructor: typeof cdk.Stack;
    stack: cdk.Stack;


    async produce() {
        this.cdkApp = new cdk.App();
        this.setContextFromArgument();
        this.generateStack(this.cdkApp);
        this.stack.addMetadata('actionId', this._id.toString());
        return this.cdkApp.synth();
    }

    generateStack(app : cdk.App) {
        this.stack = new this.StackConstructor(
            app,
            this.getStackName(),
            {
                env: this.bag.env,
                ...this.argument.stackProps, 
            }
        );
    }

    setContextFromArgument() {
        for (const k in this.argument.cdkContext) {
            this.cdkApp.node.setContext(k, this.argument.cdkContext[k]);
        }
    }

    init() {
        this.setContextFromArgument();
        return Promise.resolve();
    }

    async main(){
        const toolkit = this.generateNewToolkit();
        const cx = await toolkit.fromAssemblyBuilder(async ()=>{
            return await this.produce();
        }, {clobberEnv: false});

        await toolkit.deploy(cx, {
            stacks: {
                strategy: StackSelectionStrategy.PATTERN_MUST_MATCH,
                patterns: [this.getStackName()],
            }
        }).finally(async ()=>{
            await (this.notifyHealthPromise || Promise.resolve())
        })

        return ActionState.SUCCESS;
    }
}

export class CdkDestroyAction extends CdkAction{
    static permanentRef = "CdkDestroyAction"

    async main(){
        const opts = {};
        opts['region'] =
            this.argument.stackProps?.env.region || this.bag.env?.region;
        const cdkHelper = new CdkHelper(opts);
        await cdkHelper.deleteStack(this.getStackName());
        return ActionState.SUCCESS
    }

    async watcher(): Promise<ActionState> {
        const opts = {};
        opts['region'] =
            this.argument.stackProps?.env.region || this.bag.env?.region;
        const cdkHelper = new CdkHelper(opts);
        return cdkHelper
            .describeStackFromName(
                this.getStackName()
            ).then((stackDescription)=>{
                if (stackDescription.StackStatus.includes('DELETE_IN_PROGRESS')) {
                    return ActionState.IN_PROGRESS;
                }
                if (stackDescription.StackStatus.includes('DELETE_COMPLETE')) {
                    return ActionState.SUCCESS;
                }
                return ActionState.ERROR;
            }).catch((err: Error) => {
                if (
                    err.message.includes('Stack with id') &&
                    err.message.includes('doest not exist')
                ) {
                    return ActionState.SUCCESS;
                }
                throw err;
            });
    }

}
