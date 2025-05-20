import { ActionApp } from '@wbce/orbits-core';
import { Play } from './resources/game.js';


const db = {
  protocol: 'mongodb+srv',
  url: process.env.MONGO_URL,
  name: 'orbits-sample-diplomacy',
  connectQsParams: '?retryWrites=true&w=majority',
};
let dbOpts = {};

new ActionApp({
  workers: {
    quantity: 1,
  },
  db: {
    mongo: {
      url: `${db.protocol || 'mongodb'}://${db.url}/${db.name}${db.connectQsParams}`,
      opts: dbOpts,
    },
  },
});

ActionApp.waitForActiveApp.then(async () => {
  if (process.env.main=== 'main') {
    const action = new Play();
    action.save();
  }
});