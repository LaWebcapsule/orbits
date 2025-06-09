import { Action, ActionError, ActionRuntime, ActionState, InWorkflowActionError, Workflow } from '../index.js';
import { BasicWorkflow, ThrowErrorBasicWorkflow, WithActionErrorBasicWorkflow, WorkflowWithDynamicDefinition, WorkflowWithRepeat } from './test-action.js';


function testAWorkflow(w: Workflow, opts: {expectedActionState : ActionState, expectedResult : any, numberOfChildActions : number, timeBeforeRunningTest?: number}){

    beforeAll(() => {
        jasmine.setDefaultSpyStrategy((and) => and.callThrough());
        return w.runtime.ActionModel.deleteMany({}).then(()=>{
            return w.save()
        }).then(()=>{
            return Action.trackActionAsPromise(w, [ActionState.SUCCESS, ActionState.ERROR]);
        })
        .then(() => w.resyncWithDb());
    });

    it(`should be a ${opts.expectedActionState}`, () => {
        expect(w.dbDoc.state).toEqual(opts.expectedActionState);
    });

    it(`should have correct result`, ()=>{
        let result : any = w.dbDoc.result;
        if((result as ActionError).stack){
            (result as Error).stack = undefined;
            opts.expectedResult.stack = undefined;
            result = jasmine.objectContaining(opts.expectedResult)
        }
        expect(result as any).toEqual(result)
    })

    it('should have launched sub-actions', () =>
        w.runtime.ActionModel.find({
            workflowId: w.dbDoc._id,
        }).then((actions) => {
            expect(actions.length).toEqual(opts.numberOfChildActions);
            actions.map(a=>{
                expect(a.state).toBeGreaterThanOrEqual(ActionState.SUCCESS)
            })
    }));

}


describe('basic Workflow', ()=>{
    const basicWorkflow = new BasicWorkflow();
    basicWorkflow.setArgument({ x: 14 });
    testAWorkflow(basicWorkflow, {
        expectedActionState : ActionState.SUCCESS, 
        expectedResult : 10, 
        numberOfChildActions : 5
    })
})

describe('throw Error in Workflow', ()=>{
    const throwErrorWorkflow = new ThrowErrorBasicWorkflow();
    testAWorkflow(throwErrorWorkflow, {
        expectedActionState : ActionState.ERROR, 
        expectedResult : {message: "xyz", stack : undefined}, 
        numberOfChildActions : 2,
        timeBeforeRunningTest : 10
    })
})

describe('action in error in workflow', () => {
    let withActionErrorWorkflow = new WithActionErrorBasicWorkflow();
    const targetError = new Error();
    targetError.message = "xyz";
    (targetError as any as InWorkflowActionError).workflowTrace = [{
        workflowCtr : withActionErrorWorkflow.dbDoc.actionRef,
        workflowId : withActionErrorWorkflow.dbDoc._id.toString(),
        ref : "t2",
    }]
    testAWorkflow(withActionErrorWorkflow, {
        expectedActionState : ActionState.ERROR, 
        expectedResult : {...targetError}, 
        numberOfChildActions : 2,
        timeBeforeRunningTest : 10
    })
});

describe('dynamic action in workflow', () => {
    const dynamicActionWorkflow = new WorkflowWithDynamicDefinition();
    testAWorkflow(dynamicActionWorkflow, {
        expectedActionState : ActionState.SUCCESS, 
        expectedResult : 4, 
        numberOfChildActions : 3,
        timeBeforeRunningTest : 20
    })
});

describe('workflow with repeat', ()=>{
    const workflowWithRepeat = new WorkflowWithRepeat();
    testAWorkflow(workflowWithRepeat, {
        expectedActionState: ActionState.SUCCESS,
        expectedResult: 6,
        numberOfChildActions: 10,
    })
})