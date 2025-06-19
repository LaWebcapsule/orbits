export enum actionKind {
    // The action is a basic action
    ACTION = "orbits/action",
    // The action is a workflow
    WORKFLOW = "orbits/workflow",
    //the action is a coalescing workflow
    COALESCING_WORKFLOW = "orbits/coalescingWorkflow",
    // The action is a resource controller
    RESOURCE_CONTROLLER = "orbits/resource-controller",
    // The action is a resource
    RESOURCE = "orbits/resource",  
     
}

export const actionKindSymbols: Map<actionKind, symbol> = new Map<actionKind, symbol>(Object.values(actionKind).map((key) => [key, Symbol.for(key)]));