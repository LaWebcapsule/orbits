import { Action, ActionApp, ActionState } from "@wbce/orbits-core";
import { GreetingResource } from "./greetings-resource.ts";


const db = {
    protocol: 'mongodb+srv',
    url: process.env['MONGO_URL'],
    name: 'orbits-hello-world',
    connectQsParams: '?retryWrites=true&w=majority',
};
let dbOpts = {};

const app = new ActionApp({
    db: {
        mongo: {
            url: `${db.protocol || 'mongodb'}://${db.url}/${db.name}${db.connectQsParams}`,
            opts: dbOpts,
        },
    },
})

ActionApp.activeApp.waitForBootstrap.then(async ()=>{
    const greetingOfTheDay = new GreetingResource().setArgument({
        name: "John Doe",
        date: String(new Date().toISOString().split("T")[0])
    })
    greetingOfTheDay.save();
    await Action.trackActionAsPromise(greetingOfTheDay, [ActionState.SUCCESS, ActionState.ERROR])

    const greetingOfTheDay2 = new GreetingResource().setArgument({
        name: "John Doe",
        date: String(new Date().toISOString().split("T")[0])
    })
    greetingOfTheDay2.save();
    await Action.trackActionAsPromise(greetingOfTheDay2, [ActionState.SUCCESS, ActionState.ERROR])

})