import { Cli } from '@wbce/services';
import { Action } from '../src/action-manager';
import { ActionState } from '../src/models/action';
import { Executor } from '../src/action-executor';
import { TestExecutorAction } from './test-action';

describe('Test executor with docker', () => {
    const testAction = new TestExecutorAction();
    testAction.setArgument({ y: 1 });

    beforeAll(() => {
        return testAction.resume().then(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(3);
                }, 30 * 1000);
            });
        });
    });

    it('should  be a success', () => {
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should be written in database', () => {
        return testAction.app.ActionModel.findById(testAction.dbDoc._id).then(
            (dbDoc) => {
                expect(dbDoc).not.toBeUndefined();
            }
        );
    });

    afterAll(() => {
        return testAction.dbDoc.remove();
    });
});
