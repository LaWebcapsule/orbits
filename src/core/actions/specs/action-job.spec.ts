import { ActionModel, ActionState } from "../../models/action";
import { ActionCron } from "./../internal"
import { TestActionWithWatcherEnding } from "./main.spec";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

const actionJob = new ActionCron();
describe("action job with empty db", ()=>{
    beforeAll(()=>{
        jasmine.setDefaultSpyStrategy(and => and.callThrough());
        spyOn(actionJob, 'cycle');
        actionJob.nDatabaseEmpty = 0;
        return new Promise<void>((resolve)=>{
            setTimeout(()=>{
                resolve();
            }, 12*1000)
        })
    })

    it("should manage pause", ()=>{
        expect(actionJob.nDatabaseEmpty).toBeGreaterThanOrEqual(2)
        expect(actionJob.cycle).toHaveBeenCalledTimes(actionJob.nDatabaseEmpty-1)
    })
})

describe("actionCron with two actions to manage", ()=>{

    beforeAll(()=>{
        const a1 = new TestActionWithWatcherEnding();
        const a2 = new TestActionWithWatcherEnding();
        actionJob.nDatabaseEmpty = 0;
        return ActionModel.deleteMany({}).then(()=>{
            return new Promise<void>((resolve)=>{
                a1.resume().then(()=>{
                    return a2.resume()
                }).then(()=>{
                    setTimeout(()=>{
                        resolve()
                    }, 1000)
                })
            })
        }) 
    })

    it("- actions should be a success", ()=>{
        return ActionModel.find({}).then(actions=>{
            expect(actions.length).toEqual(2)
            expect(actions.filter(a=>a.state === ActionState.IN_PROGRESS).length).toEqual(0)
        })
    })

    afterAll(()=>{
        return ActionModel.deleteMany({})
    })


})