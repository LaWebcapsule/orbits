import { Cli } from '@wbce/services';
import { Action } from '../src/action-manager';
import { ActionState } from '../src/models/action';
import { Executor } from '../src/action-executor';
import { TestActionInWorkflow, TestExecutorAction } from './test-action';

describe('Test action defined in workflow', () => {
    const testAction = new TestActionInWorkflow();

    beforeAll(() => {
        return testAction
            .resume()
            .then(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(3);
                    }, 30 * 1000);
                });
            })
            .then(() => {
                return testAction.resyncWithDb();
            });
    });

    it('should  be a success', () => {
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should have succeeded for some subAction', () => {
        return testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowSuccess',
        }).then((dbDoc) => {
            expect(dbDoc).not.toBeUndefined();
            expect(dbDoc.state).toEqual(ActionState.SUCCESS);
        });
    });

    it('should have failed for modified in workflow action', () => {
        return testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowRedefine',
        }).then((dbDoc) => {
            expect(dbDoc).not.toBeUndefined();
            expect(dbDoc.state).toEqual(ActionState.ERROR);
        });
    });

    it('should have errored for one subAction', () => {
        return testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowError',
        }).then((dbDoc) => {
            expect(dbDoc).not.toBeUndefined();
            expect(dbDoc.state).toEqual(ActionState.ERROR);
        });
    });

    it('should have error as result for inWorkflowError action', () => {
        return testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowError',
        }).then((dbDoc) => {
            expect(dbDoc.result.message).toEqual('test');
        });
    });

    it('should have result for inWorkflowSuccess action', () => {
        return testAction.app.ActionModel.findOne({
            'definitionFrom.workflow.marker': 'inWorkflowSuccess',
        }).then((dbDoc) => {
            expect(dbDoc.result).toEqual({ x: 1 });
        });
    });

    afterAll(() => {
        return testAction.dbDoc.remove();
    });
});
