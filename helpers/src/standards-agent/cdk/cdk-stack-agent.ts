import { ActionState, Agent } from '@orbi-ts/core';
import { utils } from '@orbi-ts/services';
import * as cdk from 'aws-cdk-lib';
import {
    CdkBootstrapAction,
    CdkDeployAction,
    CdkDestroyAction,
} from '../../standards-actions/cdk/cdk-action.js';
import { CdkHelper } from '../../standards-actions/cdk/cdk-helper.js';

export class CdkStackAgent extends Agent {
    declare IArgument: Agent['IArgument'] &
        CdkBootstrapAction['IArgument'] &
        Record<
            'stackProps',
            Partial<ConstructorParameters<this['StackConstructor']>[2]>
        >;

    StackConstructor: typeof cdk.Stack;

    IInfo: {
        cdkContext: utils.JSONObject;
    };

    identity() {
        return {
            name: this.argument.stackName,
            region: this.argument.stackProps.env.region,
            account: this.argument.stackProps.env.account,
        };
    }

    async defineInstall() {
        const bootstrapAction = new CdkBootstrapAction();
        bootstrapAction.setArgument(this.argument);
        bootstrapAction.setRepeat({
            [ActionState.ERROR]: 2,
        });
        await this.do('bootstrap', bootstrapAction);
    }

    async defineUpdate() {
        const deployAction = new CdkDeployAction();
        deployAction.setArgument({
            ...(this.argument as CdkBootstrapAction['IArgument'] as any),
            cdkContext: this.agentDbDoc.info.cdkContext,
        });
        deployAction.setRepeat({
            [ActionState.ERROR]: 2,
        });
        deployAction.StackConstructor = this.StackConstructor;
        const context = await this.do('deploy', {
            dynamicAction: deployAction,
        });
        await this.repeatDo(
            'saveContext',
            () => {
                this.agentDbDoc.info.cdkContext = context as utils.JSONObject;
                return this.agentDbDoc.save();
            },
            {
                [ActionState.ERROR]: 2,
            }
        );
    }

    async setOutput(): Promise<any> {
        const opts = {};
        opts['region'] = this.argument.stackProps?.env.region;
        opts['profile'] = this.argument.awsProfileName;
        const cdkHelper = new CdkHelper(opts);
        return cdkHelper
            .describeStackFromName(this.argument.stackName)
            .then((res) => {
                const result = {};
                for (const output of res.Outputs) {
                    result[output.OutputKey] = output.OutputValue;
                }
                return result;
            });
    }

    async defineUninstall() {
        const destroyAction = new CdkDestroyAction();
        destroyAction.setArgument(this.argument);
        destroyAction.setRepeat({
            [ActionState.ERROR]: 2,
        });
        await this.do('delete', destroyAction);
    }
}
