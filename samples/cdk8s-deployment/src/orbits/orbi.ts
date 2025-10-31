import { Action, ActionRuntime } from '@orbi-ts/core';
import { BasicAgent } from './basic-agent.js';

ActionRuntime.activeRuntime.waitForBootstrap.then(async () => {
    const helloAgent = new BasicAgent().setArgument({
        stackName: 'cdk8s-basic',
    });
    if (process.env['CDK8S_COMMAND'] === 'uninstall') {
        helloAgent.setCommand('Uninstall');
    }
    helloAgent.save();
    await Action.trackActionAsPromise(helloAgent);
    console.log(await helloAgent.getAgentOutput());
});
