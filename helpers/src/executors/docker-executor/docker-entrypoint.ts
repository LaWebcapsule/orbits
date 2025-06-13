import { Action, ActionRuntime } from '@wbce/orbits-core';

const params = {
    bootstrapPath: process.argv[2],
    actionId: process.argv[3],
};

console.log('inside docker starting!');
import(params.bootstrapPath)
    .then((test) => {
        console.log('after import!');
        return ActionRuntime.waitForActiveRuntime;
    })
    .then(async () => {
        ActionRuntime.activeRuntime.logger.info('after bootstrap');
        const app = await ActionRuntime.getActiveApp();
        return app.ActionModel.findById(params.actionId);
    })
    .then(async (actionDb) => {
        ActionRuntime.activeRuntime.logger.info('finding in db');
        const action = await Action.constructFromDb(actionDb);
        process.chdir('/tmp');
        return action.resume();
    })
    .then(() => {
        ActionRuntime.activeRuntime.logger.info('adios');
        process.exit();
    })
    .catch((err) => {
        ActionRuntime.activeRuntime.logger.error('error in the entrypoint');
        ActionRuntime.activeRuntime.logger.error(err);
        const errCode = 1000 + (err.code || 0); //1000 because we have errorCodes values of -1, 0, ...
        process.exit(errCode);
    });
