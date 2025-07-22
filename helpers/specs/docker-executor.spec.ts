import { Action, ActionState } from '@orbi-ts/core';
import { DockerAction } from './actions-test.js';

describe('Test action', () => {
    const testAction = new DockerAction();
    testAction.setArgument({ y: 1 });

    beforeAll(() => {
        return testAction.dbDoc
            .save()
            .then(() => {
                const endState = [ActionState.SUCCESS, ActionState.ERROR];
                return Action.trackActionAsPromise(testAction, endState);
            })
            .then(() => testAction.resyncWithDb());
    });

    it('should  be a success', () => {
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testAction.result.z).toEqual(10);
    });

    afterAll(() => testAction.dbDoc.remove());
});
