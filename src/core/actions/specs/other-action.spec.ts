import { ActionModel, ActionState } from "../../models/action";
import { ActionCron } from "../action-job";
import { WaitForInput } from "../standards-actions/wait-for-input";

//plutot un playbook qu'un test car difficile savoir quand action est finie


describe('testing input', ()=>{
    let waitInput : WaitForInput;
    beforeAll(() => {
        return ActionModel.deleteMany({}).then(() => {
            const cron = new ActionCron();
            waitInput = new WaitForInput();
            waitInput.setArgument({
                inputs : [
                    {
                        type : 'string',
                        key : 'test'
                }, {
                    type : 's3',
                    key : 't2'
                }]
            })
            return waitInput.dbDoc.save();
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    waitInput.resyncWithDb().then(resolve)
                }, 3000)
            })
        }).then(()=>{
            return waitInput.addInputs({
                'test' : 'zzzz'
            })
        }).then(()=>{
            console.log(waitInput.getPreSignedPostForS3('t2'));
        }).then(()=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    resolve(1)
                }, 3000)
            })
        })
    })

    it("should be a success", ()=>{
        return ActionModel.findById(waitInput.dbDoc._id).then((tr) => {
            expect(tr.state).toEqual(ActionState.SUCCESS);
        });
    })
})