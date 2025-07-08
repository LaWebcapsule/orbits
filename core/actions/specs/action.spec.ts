import { ActionState } from '../index.js';
import { TestAction } from './test-action.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

describe('Test action', () => {
    const testAction = new TestAction();
    testAction.setArgument({ y: 1 });

    beforeAll(() => testAction.resume());

    it('should  be a success', () => {
        expect(testAction.dbDoc.bag).toEqual({
            x: 10,
        });
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should be written in database', () =>
        testAction.runtime.ActionModel.findById(testAction.dbDoc._id).then(
            (dbDoc) => {
                expect(dbDoc).not.toBeUndefined();
            }
        ));

    afterAll(() => testAction.dbDoc.remove());
});
