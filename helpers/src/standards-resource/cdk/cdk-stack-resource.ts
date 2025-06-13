import { Resource } from '@wbce/orbits-core';
import { CdkAction } from '../../standards-actions/cdk/cdk-action.js';

export class CdkStackResource extends Resource {
    IArgument: { stackName: string; stackProps: any };

    identity() {
        return this.argument.stackName;
    }

    defineBootstrap() {}

    defineInstall(): void {}

    defineUpdate() {
        const output = this.do('bootstrap', () => {
            const action = new CdkAction();
            action.stack = this.generateStack.bind(this);
            return action;
        });
        await this.do('deploy', () => {});
    }

    defineUninstall() {
        await this.do('delete', () => {});
    }

    launchCdkCommand() {}
}
