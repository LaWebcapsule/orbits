import {ActionApp, Action} from '@wbce/orbits-core'

const params = {
    bootstrapPath : process.argv[2],
    actionId : process.argv[3]
}


console.log("inside docker starting!")
import(params.bootstrapPath).then((test)=>{
    console.log("after import!")
    return ActionApp.waitForActiveApp
}).then(()=>{
    ActionApp.activeApp.logger.info("after bootstrap")
    const app = ActionApp.getActiveApp();
    return app.ActionModel.findById(params.actionId)
}).then(async (actionDb)=>{
    ActionApp.activeApp.logger.info("finding in db")
    const action = await Action.constructFromDb(actionDb);
    process.chdir('/tmp');
    return action.resume();
}).then(()=>{
    ActionApp.activeApp.logger.info("adios")
    process.exit()
}).catch((err)=>{
    ActionApp.activeApp.logger.error("error in the entrypoint")
    ActionApp.activeApp.logger.error(err)
    const errCode = 1000 + (err.code || 0);//1000 because we have errorCodes values of -1, 0, ...
    process.exit(errCode)
})