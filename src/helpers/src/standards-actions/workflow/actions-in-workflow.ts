import { Action, Workflow } from "@wbce/orbits-core";

export function createInWorkflowAction(workflow: Workflow, config : {
    init : Action['init'],
    main: Action['main'],
    watcher: Action['watcher']
})
export function createInWorkflowAction(workflow : Workflow, cb : ()=>Promise<void>);
export function createInWorkflowAction(workflow : Workflow, cb : ()=>Promise<Action | Action[]>);
export function createInWorkflowAction(workflow: Workflow,  ){
    
}