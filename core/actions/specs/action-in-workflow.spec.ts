/* import { ActionState } from '../src/models/action.js';
import { TestActionInWorkflow } from './test-action.js';

describe('Test action defined in workflow', () => {
    const testAction = new TestActionInWorkflow();

    beforeAll(() =>
        testAction
            .resume()
            .then(
                () =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(3);
                        }, 30 * 1000);
                    })
            )
            .then(() => testAction.resyncWithDb())
    );

    it('should  be a success', () => {
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should have succeeded for some subAction', () =>
        testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowSuccess',
        }).then((dbDoc) => {
            expect(dbDoc).not.toBeUndefined();
            expect(dbDoc.state).toEqual(ActionState.SUCCESS);
        }));

    it('should have failed for modified in workflow action', () =>
        testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowRedefine',
        }).then((dbDoc) => {
            expect(dbDoc).not.toBeUndefined();
            expect(dbDoc.state).toEqual(ActionState.ERROR);
        }));

    it('should have errored for one subAction', () =>
        testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowError',
        }).then((dbDoc) => {
            expect(dbDoc).not.toBeUndefined();
            expect(dbDoc.state).toEqual(ActionState.ERROR);
        }));

    it('should have error as result for inWorkflowError action', () =>
        testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowError',
        }).then((dbDoc) => {
            expect(dbDoc.result.message).toEqual('test');
        }));

    it('should have result for inWorkflowSuccess action', () =>
        testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowSuccess',
        }).then((dbDoc) => {
            expect(dbDoc.result).toEqual({ x: 1 });
        }));

    afterAll(() => testAction.dbDoc.remove());
});
 */
