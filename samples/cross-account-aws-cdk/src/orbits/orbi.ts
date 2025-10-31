import { ActionRuntime } from '@orbi-ts/core';
import { HelloAgent } from './hello-agent.js';

ActionRuntime.activeRuntime.waitForBootstrap.then(async () => {
    const helloAgent = new HelloAgent().setArgument({
        accountA: {
            id: process.env['AWS_ACCOUNT_A'],
            profile: process.env['AWS_ACCOUNT_A_PROFILE'],
        },
        accountB: {
            id: process.env['AWS_ACCOUNT_B'],
            profile: process.env['AWS_ACCOUNT_B_PROFILE'],
        },
        region: process.env['AWS_REGION'],
    });
    if (process.env['HELLO_COMMAND'] === 'uninstall') {
        helloAgent.setCommand('Uninstall');
    }
    helloAgent.save();
});
