import { Action, ActionRuntime, ActionState } from '../index.js';
import { TestGenerator } from './test-action.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

describe('Generators', () => {
    const testGen = new TestGenerator();
    testGen.setArgument({ name: 'xyz', commandName: '1' });

    const testGen2 = new TestGenerator();
    testGen2.setArgument({ name: 'xyz', commandName: '2' });

    const testGenRunAfterFirstExecution = new TestGenerator();
    testGenRunAfterFirstExecution.setArgument({
        name: 'xyz',
        commandName: '3',
    });

    const testGenOtherName = new TestGenerator();
    testGenOtherName.setArgument({ name: 'xyzzz', commandName: '4' });

    beforeAll(() => {
        return ActionRuntime.activeRuntime.ActionModel.deleteMany({})
            .then(() => {
                return Promise.all([
                    testGen.save(),
                    testGen2.save(),
                    testGenOtherName.save(),
                ]);
            })
            .then(() => {
                const endState = [ActionState.SUCCESS, ActionState.ERROR];
                return Promise.all([
                    Action.trackActionAsPromise(testGen, endState),
                    Action.trackActionAsPromise(testGen2, endState),
                    Action.trackActionAsPromise(testGenOtherName, endState),
                ]);
            })
            .then(() => {
                return testGenRunAfterFirstExecution.save();
            })
            .then(() => {
                return Action.trackActionAsPromise(
                    testGenRunAfterFirstExecution,
                    [ActionState.SUCCESS, ActionState.ERROR]
                );
            });
    });

    it('should be in success', () => {
        expect(testGen.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testGen2.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testGenOtherName.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should have correct result', () => {
        const result = testGen.dbDoc.result;
        const result2 = testGen2.dbDoc.result;
        expect(result as any).toEqual(result2 as any);
        expect(testGenOtherName.dbDoc.result as any).not.toEqual(
            testGen.dbDoc.result
        );
        expect(testGen.dbDoc.result).toBeGreaterThan(0);
        expect(testGenRunAfterFirstExecution.dbDoc.result as any).toEqual(3);
    });

    it('should have run the once step only once by identity', async () => {
        const onceActions = await ActionRuntime.activeRuntime.ActionModel.find({
            'definitionFrom.workflow.ref': 'once',
        });
        expect(onceActions).toHaveSize(2);
        const onceActionsForTestGen =
            await ActionRuntime.activeRuntime.ActionModel.find({
                workflowRef: 'once',
                workflowIdentity: testGen.stringifyIdentity(),
            });
        expect(onceActionsForTestGen).toHaveSize(1);
    });

    it('should have run the sleep generator only twice', async () => {
        const sleepGenActions =
            await ActionRuntime.activeRuntime.ActionModel.find({
                identity: 'sleep',
            });
        expect(sleepGenActions).toHaveSize(2);
    });
});
