import {
    Action,
    ActionState,
    InWorkflowActionError,
    Workflow,
} from '../index.js';
import {
    BasicWorkflow,
    ParallelSleepWorkflow,
    ThrowErrorBasicWorkflow,
    ThrowErrorComplexWorkflow,
    WithActionDynamicWorkflow,
    WithActionErrorBasicWorkflow,
    WorkflowWithDynamicDefinition,
    WorkflowWithRepeat,
} from './test-action.js';

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
        numberOfChildActions: 2,
    });
});
