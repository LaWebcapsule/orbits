import { Action, ActionState } from '@orbi-ts/core';
import { Cli } from '@orbi-ts/services';

describe('Test executor with docker', () => {
    const testAction = new Action();
    testAction.setArgument({ y: 1 });

    beforeAll(() =>
        testAction.resume().then(
            () =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(3);
                    }, 30 * 1000);
                })
        )
    );

    it('should  be a success', () => {
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should be written in database', () =>
        testAction.app.ActionModel.findById(testAction.dbDoc._id).then(
            (dbDoc) => {
                expect(dbDoc).not.toBeUndefined();
            }
        ));

    afterAll(() => testAction.dbDoc.remove());
});
