import { ActionState } from '../index.js';
import { BasicWorkflow, TestRollBack, x } from './test-action.js';

describe('testing workflow -', () => {
    let basicWorkflow = new BasicWorkflow();
    basicWorkflow.setArgument({ x: 14 });
    basicWorkflow.dbDoc.save();

    beforeAll(() => {
        jasmine.setDefaultSpyStrategy((and) => and.callThrough());
        return new Promise((resolve) => {
            let i = 0;
            let runTime = 10; //seconds
            const sI = setInterval(() => {
                console.log(`launching tests in ${runTime - i} seconds`);
                if (i > runTime) {
                    clearInterval(sI);
                    console.log('debut des tests!');
                    resolve('ok');
                }
                i++;
            }, 1000);
        }).then(() => basicWorkflow.resyncWithDb());
    });

    it('should be a success', () => {
        expect(basicWorkflow.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should have correct path', () => {
        expect(basicWorkflow.bag.stepsHistory).toEqual([0, 1, 3, 4]);
    });

    it('should have launched sub-actions', () =>
        basicWorkflow.app.ActionModel.find({
            workflowId: basicWorkflow.dbDoc._id,
        }).then((actions) => {
            expect(actions.length).toEqual(4);
        }));

    afterAll(() =>
        basicWorkflow.app.ActionModel.remove({
            workflowId: basicWorkflow.dbDoc._id,
        })
    );
});

let rollBack;
describe('testing rollBack -', () => {
    let t;
    beforeAll(() => {
        jasmine.setDefaultSpyStrategy((and) => and.callThrough());
        t = new TestRollBack();
        return t
            .resume()
            .then(
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            console.log('launching rollback');
                            rollBack = new t.RollBackWorkflow();
                            rollBack.setArgument({
                                actionId: t.dbDoc._id.toString(),
                            });
                            rollBack.resume().then(() => {
                                resolve(rollBack);
                            });
                        }, 2000);
                    })
            )
            .then(
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(1);
                        }, 30000);
                    })
            );
    });

    it('should be a success', () =>
        t.app.ActionModel.findById(rollBack.dbDoc._id).then((tr) => {
            expect(tr.state).toEqual(ActionState.SUCCESS);
        }));

    it('should have rollBacked resource', () => {
        expect(x).toEqual(0);
    });

    afterAll(() => {});
});
