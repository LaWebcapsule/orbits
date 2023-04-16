import { BootstrapTestStack, DeployTestStack, DockerAction } from "./actions-test";
import {ActionState} from "@wbce/orbits-core";

describe("Test action", ()=>{
    let testAction = new DeployTestStack();
    const defaultEnv = {
        account : '889065479324',
        region : 'eu-west-3'
    }
    testAction.setArgument({
        stackName : 'test-deploy',
        stackProps : {
            env: defaultEnv
        }
    });
    testAction

    beforeAll(()=>{
        spyOn(testAction, 'init');
        return testAction.dbDoc.save().then(()=>{
            return new Promise<void>(resolve=>{
                setTimeout(()=>{
                    resolve();
                }, 2*60*1000)
            })
        }).then(()=>{
            return testAction.resyncWithDb();
        });
    })

    it("should  be a success", ()=>{
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testAction.result).toEqual(10);
    })

    afterAll(()=>{
        const rollback = testAction.createRollBackWorkflow();
        return rollback.dbDoc.save();
    })
    
})