import { Action, ActionRuntime, ActionState } from '../index.js';
import { BlankResource, TestAction, TestGenerator } from './test-action.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

describe('Resource', () => {
    const testResource = new BlankResource();
    let testResourceUpdate = new BlankResource();
    let testResourceChangeVersion = new BlankResource();
    testResourceChangeVersion.setArgument({
        commandName: 'xyz',
        version : '2.0.0'
    })

    beforeAll(() => {
        console.log("before all")
        return ActionRuntime.activeRuntime.ActionModel.deleteMany({}).then(()=>{
            return ActionRuntime.activeRuntime.ResourceModel.deleteMany({})
        }).then(()=>{
            return Promise.all([
                testResource.save()
            ])
        }).then(()=>{
            const endState = [ActionState.SUCCESS, ActionState.ERROR];
            return Promise.all([
                Action.trackActionAsPromise(testResource, endState),
            ])
        }).then(()=>{
            return testResourceUpdate.save()
        }).then(()=>{
            return  Action.trackActionAsPromise(testResourceUpdate, [ActionState.SUCCESS, ActionState.ERROR]);
        }).then(()=>{
            return testResourceChangeVersion.save()
        }).then(()=>{
            return  Action.trackActionAsPromise(testResourceChangeVersion, [ActionState.SUCCESS, ActionState.ERROR]);
        }).then(()=>{
            return Promise.all([
                testResource.resyncWithDb(),
                testResourceChangeVersion.resyncWithDb(),
                testResourceUpdate.resyncWithDb()
            ])
        })
    });

    it('should be in success', () => {
        expect(testResource.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testResourceChangeVersion.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testResourceUpdate.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it("should have been installed twice", async ()=>{
        const resource = new BlankResource();
        await resource.initialization();
        expect(resource.resourceDbDoc.info['ninstall']).toEqual(2);
    })

    it("should have been updated twice", async ()=>{
        const resource = new BlankResource();
        await resource.initialization();
        expect(resource.resourceDbDoc.info['nupdate']).toEqual(2);
    })

    it("should have one controller", async ()=>{
        const controllers = await ActionRuntime.activeRuntime.ActionModel.find({
            "actionRef": "ResourceController"
        })
        expect(controllers).toHaveSize(1);
    })

    it("should have correct output", async ()=>{
        const resource = new BlankResource();
        const output = await resource.getResourceOutput();
        expect(output).toEqual({
            "xyz": "abc"
        })
    })
});