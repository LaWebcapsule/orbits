import { Action, ActionRuntime, ActionState } from '@orbi-ts/core';
import { GreetingResource } from './greetings-resource.ts';

ActionRuntime.activeRuntime.waitForBootstrap.then(async () => {
    const greetingOfTheDay = new GreetingResource().setArgument({
        name: 'John Doe',
        date: String(new Date().toISOString().split('T')[0]),
    });
    greetingOfTheDay.save();
    await Action.trackActionAsPromise(greetingOfTheDay, [
        ActionState.SUCCESS,
        ActionState.ERROR,
    ]);

    const greetingOfTheDay2 = new GreetingResource().setArgument({
        name: 'John Doe',
        date: String(new Date().toISOString().split('T')[0]),
    });
    greetingOfTheDay2.save();
    await Action.trackActionAsPromise(greetingOfTheDay2, [
        ActionState.SUCCESS,
        ActionState.ERROR,
    ]);
});
