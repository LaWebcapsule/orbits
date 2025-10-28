export enum actionKind {
    // The action is a basic action
    ACTION = 'orbits/action',
    // The action is a workflow
    WORKFLOW = 'orbits/workflow',
    //the action is a coalescing workflow
    COALESCING_WORKFLOW = 'orbits/coalescingWorkflow',
    // The action is a agent controller
    AGENT_CONTROLLER = 'orbits/agentController',
    // The action is a agent
    AGENT = 'orbits/agent',
}

export const actionKindSymbols: Map<actionKind, symbol> = new Map<
    actionKind,
    symbol
>(Object.values(actionKind).map((key) => [key, Symbol.for(key)]));
