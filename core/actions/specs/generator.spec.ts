import { Action, ActionApp, ActionState } from '../index.js';
import { TestAction, TestGenerator } from './test-action.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

describe('Generators', () => {
    const testGen = new TestGenerator();
    testGen.setArgument({name: 'xyz', commandName : 'e'});

    const testGen2 = new TestGenerator();
    testGen.setArgument({name: 'xyz', commandName : 'e'});

    const testGenRunAfterFirstExecution = new TestGenerator();
    testGen.setArgument({name: 'xyz', commandName : 'e'});

    const testGenOtherName = new TestGenerator();
    testGen.setArgument({name: 'xyzzz', commandName : 'e'});

    beforeAll(() => {
        return ActionApp.activeApp.ActionModel.deleteMany({}).then(()=>{
            return Promise.all([
                testGen.resume(),
                testGen2.resume(),
                testGenOtherName.resume()
            ])
        }).then(()=>{
            const endState = [ActionState.SUCCESS, ActionState.ERROR];
            return Promise.all([
                Action.trackActionAsPromise(testGen, endState),
                Action.trackActionAsPromise(testGen2, endState),
                Action.trackActionAsPromise(testGenOtherName, endState),
            ])
        }).then(()=>{
            return testGenRunAfterFirstExecution.resume()
        }).then(()=>{
            return  Action.trackActionAsPromise(testGen, [ActionState.SUCCESS, ActionState.ERROR]);
        })
    });

    it('should be in success', () => {
        expect(testGen.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testGen2.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testGenOtherName.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should have correct result', () => {
        expect(testGen.dbDoc.result).toEqual(testGen2.dbDoc.result);
        expect(testGenOtherName.dbDoc.result).not.toEqual(testGen.dbDoc.result);
        expect(testGen.dbDoc.result).toBeGreaterThan(0);
        expect(testGenRunAfterFirstExecution.dbDoc.result).toEqual(3);
    });

    it("should have run the once step only once by identity", async ()=>{
        const onceActions = await ActionApp.activeApp.ActionModel.find({
            "definitionFrom.workflow.ref": "once",
        })
        expect(onceActions.length).toEqual(2);
        const onceActionsForTestGen = await ActionApp.activeApp.ActionModel.find({
            "workflowStack.ref": "once",
            "workflowStack.identity": testGen.stringifyIdentity() 
        })
        expect(onceActionsForTestGen.length).toEqual(1);
    })
});