import { ActionCron } from '../src/action-job.js';
import { Action } from '../src/action-manager.js';
import { ActionState } from '../src/models/action.js';
import { ActionRuntime } from '../src/runtime/action-runtime.js';
import { TestActionWithWatcherEnding } from './test-action.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

const actionJob = new ActionCron();
describe('action job with empty db', () => {
    beforeAll(() => {
        jasmine.setDefaultSpyStrategy((and) => and.callThrough());
        spyOn(actionJob, 'cycle');
        actionJob.nDatabaseEmpty = 0;
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 12 * 1000);
        });
    });

    it('should manage pause', () => {
        expect(actionJob.nDatabaseEmpty).toBeGreaterThanOrEqual(2);
        expect(actionJob.cycle).toHaveBeenCalledTimes(actionJob.nDatabaseEmpty);
    });
});

let wrongDefAction: Action;
describe('actionCron with two actions to manage', () => {
    beforeAll(() => {
        const a1 = new TestActionWithWatcherEnding();
        const a2 = new TestActionWithWatcherEnding();
        wrongDefAction = new TestActionWithWatcherEnding();
        wrongDefAction.dbDoc.definitionFrom.workflow._id = 'xyz';
        actionJob.nDatabaseEmpty = 0;
        return ActionRuntime.activeRuntime.ActionModel.deleteMany({}).then(
            () =>
                new Promise<void>((resolve) => {
                    a1.save()
                        .then(() => a2.save())
                        .then(() => wrongDefAction.save())
                        .then(() => {
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        });
                })
        );
    });

    it('- actions should be a success', () =>
        ActionRuntime.activeRuntime.ActionModel.find({}).then((actions) => {
            expect(actions.length).toEqual(3);
            expect(
                actions.filter((a) => a.state === ActionState.SUCCESS).length
            ).toEqual(2);
        }));

    it(' - wrongly defined action should be still pending', () =>
        wrongDefAction.resyncWithDb().then(() => {
            expect(wrongDefAction.dbDoc.state).toEqual(ActionState.SLEEPING);
        }));
});
