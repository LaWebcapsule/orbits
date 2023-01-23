import { Action, ActionState } from "@wbce/orbits-core";
import { Cli } from "@wbce/services";




describe("Test executor with docker", ()=>{
    const testAction = new Action();
    testAction.setArgument({y : 1});

    beforeAll(()=>{
        return testAction.resume().then(()=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    resolve(3);
                }, 30*1000)
            })
        });
    })


    it("should  be a success", ()=>{
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
    })

    it("should be written in database", ()=>{
        return testAction.app.ActionModel.findById(testAction.dbDoc._id).then((dbDoc)=>{
            expect(dbDoc).not.toBeUndefined()
        })
    })

    afterAll(()=>{
        return testAction.dbDoc.remove();
    })
    
})