import { Action, ActionRuntime, ActionState } from '@orbi-ts/core';
import { GreetingAgent } from './greetings-agent.ts';

ActionRuntime.activeRuntime.autostart &&
    ActionRuntime.activeRuntime.waitForBootstrap.then(async () => {
        const greetingOfTheDay = new GreetingAgent().setArgument({
            name: 'John Doe',
            date: String(new Date().toISOString().split('T')[0]),
        });
        greetingOfTheDay.save();
        await Action.trackActionAsPromise(greetingOfTheDay, [
            ActionState.SUCCESS,
            ActionState.ERROR,
        ]);

        const greetingOfTheDay2 = new GreetingAgent().setArgument({
            name: 'John Doe',
            date: String(new Date().toISOString().split('T')[0]),
        });
        greetingOfTheDay2.save();
        await Action.trackActionAsPromise(greetingOfTheDay2, [
            ActionState.SUCCESS,
            ActionState.ERROR,
        ]);
    });
