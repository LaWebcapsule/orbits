import {ActionApp, Action} from '@wbce/actions'

const params = {
    bootstrapPath : process.argv[2],
    actionId : process.argv[3]
}


console.log("inside docker starting!")
console.log(params);
import(params.bootstrapPath).then((test)=>{
    console.log("after import!")
    console.log(test);
    return ActionApp.waitForActiveApp
}).then(()=>{
    console.log("after bootstrap")
    const app = ActionApp.getActiveApp();
    return app.ActionModel.findById(params.actionId)
}).then((actionDb)=>{
    console.log("finding in db")
    const action = Action.constructFromDb(actionDb);
    process.chdir('/tmp');
    return action.resume();
}).then(()=>{
    console.log("adios")
    process.exit()
}).catch((err)=>{
    const errCode = 1000 + (err.code || 0);//1000 because we have errorCodes values of -1, 0, ...
    process.exit(errCode)
})