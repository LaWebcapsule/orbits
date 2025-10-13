import {
    Action,
    ActionState,
    InWorkflowActionError,
    Workflow,
} from '../index.js';
import {
    BasicWorkflow,
    ParallelSleepWorkflow,
    SequentialSleepWorkflow,
    ThrowErrorBasicWorkflow,
    ThrowErrorComplexWorkflow,
    WithActionDynamicWorkflow,
    WithActionErrorBasicWorkflow,
    WorkflowWithDynamicDefinition,
    WorkflowWithRepeat,
} from './test-action.js';

// Wait until action finishes, efficient for performance tests - trackActionAsPromise has an interval of 10 * 1000
async function waitUntilFinished(
    action: Action,
    states: ActionState[] = [ActionState.SUCCESS, ActionState.ERROR],
    timeoutMs = 30000,
    intervalMs = 100
) {
    const start = Date.now();
    for (;;) {
        await action.resyncWithDb();
        if (states.includes(action.dbDoc.state)) return action.dbDoc.state;
        if (Date.now() - start > timeoutMs)
            throw new Error('waitUntilFinished timeout');
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
}

function testAWorkflow(
    w: Workflow,
    opts: {
        expectedActionState: ActionState;
        expectedResult: any;
        numberOfChildActions: number;
        timeBeforeRunningTest?: number;
    }
) {
    beforeAll(() => {
        jasmine.setDefaultSpyStrategy((and) => and.callThrough());
        return w.runtime.ActionModel.deleteMany({})
            .then(() => {
                return w.save();
            })
            .then(() => {
                return Action.trackActionAsPromise(w, [
                    ActionState.SUCCESS,
                    ActionState.ERROR,
                ]);
            })
            .then(() => w.resyncWithDb());
    });

    it(`should be a ${opts.expectedActionState}`, () => {
        expect(w.dbDoc.state).toEqual(opts.expectedActionState);
    });

    it(`should have correct result`, () => {
        let result: any = w.dbDoc.result;
        if (w.dbDoc.state === ActionState.ERROR) {
            (result as Error).stack = undefined;
            opts.expectedResult.stack = undefined;
            result.formatedError = undefined;
            result = jasmine.objectContaining(opts.expectedResult);
        }
        expect(result as any).toEqual(opts.expectedResult);
    });

    it('should have launched sub-actions', () =>
        w.runtime.ActionModel.find({
            workflowId: w.dbDoc._id,
        }).then((actions) => {
            expect(actions.length).toEqual(opts.numberOfChildActions);
            actions.map((a) => {
                expect(a.state).toBeGreaterThanOrEqual(ActionState.SUCCESS);
            });
        }));
}

describe('basic Workflow', () => {
    const basicWorkflow = new BasicWorkflow();
    basicWorkflow.setArgument({ x: 14 });
    testAWorkflow(basicWorkflow, {
        expectedActionState: ActionState.SUCCESS,
        expectedResult: 10,
        numberOfChildActions: 5,
    });
});

describe('throw Error in Workflow', () => {
    const throwErrorWorkflow = new ThrowErrorBasicWorkflow();
    testAWorkflow(throwErrorWorkflow, {
        expectedActionState: ActionState.ERROR,
        expectedResult: { message: 'xyz', stack: undefined },
        numberOfChildActions: 2,
    });
});

describe('throw error in Workflow from children', () => {
    const throwErrorWorkflow = new ThrowErrorComplexWorkflow();
    const throwBasicErr = new ThrowErrorBasicWorkflow();
    throwBasicErr.setResult({
        message: 'xyz',
        stack: undefined,
    });

    testAWorkflow(throwErrorWorkflow, {
        expectedActionState: ActionState.ERROR,
        expectedResult: new InWorkflowActionError(
            throwErrorWorkflow,
            'basicError',
            throwBasicErr.dbDoc
        ),
        numberOfChildActions: 1,
    });
});

describe('action in error in workflow', () => {
    let withActionErrorWorkflow = new WithActionErrorBasicWorkflow();
    const targetError = new Error();
    targetError.message = 'xyz';
    (targetError as any as InWorkflowActionError).workflowTrace = [
        {
            workflowCtr: withActionErrorWorkflow.dbDoc.actionRef,
            workflowId: withActionErrorWorkflow.dbDoc._id.toString(),
            ref: 't2',
        },
    ];
    testAWorkflow(withActionErrorWorkflow, {
        expectedActionState: ActionState.ERROR,
        expectedResult: { ...targetError },
        numberOfChildActions: 2,
        timeBeforeRunningTest: 10,
    });
});

describe('dynamic action in workflow', () => {
    const dynamicActionWorkflow = new WorkflowWithDynamicDefinition();
    testAWorkflow(dynamicActionWorkflow, {
        expectedActionState: ActionState.SUCCESS,
        expectedResult: 4,
        numberOfChildActions: 3,
        timeBeforeRunningTest: 20,
    });
});

describe('workflow with repeat', () => {
    const workflowWithRepeat = new WorkflowWithRepeat();
    testAWorkflow(workflowWithRepeat, {
        expectedActionState: ActionState.SUCCESS,
        expectedResult: 6,
        numberOfChildActions: 10,
    });
});

describe('repeat workflow when error', () => {
    const repeatWorkflow = new WithActionDynamicWorkflow();
    repeatWorkflow.setRepeat({
        [ActionState.ERROR]: 2,
        [ActionState.SUCCESS]: 0,
    });
    testAWorkflow(repeatWorkflow, {
        expectedActionState: ActionState.SUCCESS,
        expectedResult: 0,
        numberOfChildActions: 2,
        timeBeforeRunningTest: 10,
    });
});

describe('parallel sleep', () => {
    const parallel = new ParallelSleepWorkflow();
    testAWorkflow(parallel, {
        expectedActionState: ActionState.SUCCESS,
        expectedResult: 0,
        numberOfChildActions: 5,
    });
});

describe('sequential sleep', () => {
    const parallel = new ParallelSleepWorkflow();
    testAWorkflow(parallel, {
        expectedActionState: ActionState.SUCCESS,
        expectedResult: 0,
        numberOfChildActions: 5,
    });
});

describe('performance: parallel vs sequential sleep', () => {
    it('parallel (Promise.all) should be faster than sequential', async () => {
        const parallel = new ParallelSleepWorkflow();
        const sequential = new SequentialSleepWorkflow();

        const t0 = Date.now();
        await parallel.save();
        await waitUntilFinished(
            parallel,
            [ActionState.SUCCESS, ActionState.ERROR],
            20000,
            50
        );
        const t1 = Date.now();
        const parallelMs = t1 - t0;

        const t2 = Date.now();
        await sequential.save();
        await waitUntilFinished(
            sequential,
            [ActionState.SUCCESS, ActionState.ERROR],
            20000,
            50
        );
        const t3 = Date.now();
        const sequentialMs = t3 - t2;

        expect(parallelMs).toBeLessThan(sequentialMs);
    }, 40000);
});
