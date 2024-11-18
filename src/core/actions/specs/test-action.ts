import { Cli } from '@wbce/services';
import { Action, ActionApp, ActionState, Executor, Workflow } from '../index';

export class TestActionWithWatcherEnding extends Action {
    main() {
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

    watcher() {
        return Promise.resolve(ActionState.SUCCESS);
    }
}

export class TestActionWithError extends Action {
    //cette fonction ajoute 9 à un nombre en 30 secondes
    IBag: {
        x: number;
    };

    IArgument: {
        y: number;
    };

    init() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    main() {
        return Promise.resolve(ActionState.ERROR);
    }

    watcher() {
        return Promise.resolve(ActionState.UNKNOWN);
    }
}

export class TestActionMainTimeout extends Action {
    static defaultDelays = {
        [ActionState.EXECUTING_MAIN]: 10,
        [ActionState.IN_PROGRESS]: 1000,
    };

    main() {
        return undefined as any;
    }

    onMainTimeout() {
        return ActionState.SUCCESS;
    }
}

export class TestAction extends Action {
    //cette fonction ajoute 9 à un nombre en 30 secondes
    IBag: {
        x: number;
    };

    IArgument: {
        y: number;
    };

    init() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    main() {
        return new Promise<ActionState>((resolve) => {
            setTimeout(() => {
                this.bag.x = this.argument.y + 9;
                resolve(ActionState.SUCCESS);
            }, 1000);
        });
    }

    watcher() {
        return Promise.resolve(ActionState.UNKNOWN);
    }
}

export class BasicWorkflow extends Workflow {
    IBag: {
        n: number;
    } & Workflow['IBag'];

    constructor() {
        super();
        this.next(() => {
            const a = new TestAction();
            return [a];
        })
            .next(() => {
                const a = new TestActionWithWatcherEnding();
                const b = new TestActionWithError();
                return [a, b];
            })
            .next(() => {
                return Action.resolve('ok');
            })
            .catch(() => {
                const a = new TestAction();
                return [a];
            })
            .next(() => {
                return new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });
            });
        /*     .checkPoint("end")
      .next(() => {
  
      })
      .onSuccessGoTo("end"); */
    }
}

export let x = 0;
export class TestActionWithRollBack extends Action {
    main() {
        x += 20;
        return Promise.resolve(ActionState.SUCCESS);
    }

    rollBack() {
        x -= 20;
        return Promise.resolve(ActionState.SUCCESS);
    }
}

export class TestRollBack extends Workflow {
    constructor() {
        super();
        this.next(() => {
            x++;
        })
            .rollback(() => {
                x--;
            })
            .next(() => {
                x++;
                return Action.reject(3);
            })
            .rollback(() => {
                x--;
            })
            .next(() => {
                x += 2;
            })
            .rollback(() => {
                x -= 2;
            })
            .catch(() => {
                x += 2;
            })
            .rollback(() => {
                x -= 2;
            })
            .next(() => {
                if (x < 10) {
                    return new TestRollBack();
                }
            })
            .next(() => {
                return new TestActionWithRollBack();
            });
    }
}

export class TestExecutor extends Executor {
    resume(action) {
        return action._resume();
    }
}

export class TestExecutorAction extends Action {
    cli = new Cli();

    defineExecutor(): Promise<undefined> | undefined {
        //this.executor = new TestExecutor();
        return;
    }

    main() {
        return this.cli.command('node', ['-v']).then(
            () => {
                return ActionState.SUCCESS;
            },
            () => {
                return ActionState.ERROR;
            }
        );
    }
}

export class TestActionInWorkflow extends Workflow {
    static permanentRef: string | string[] = ['xx', 'xxx'];

    define(): Promise<void> | void {
        this.next(() => {
            return Action.resolve();
        })
            .name('actionInWorkflow')
            .next(async () => {
                const inWorkflowAction = this.inWorkflowStepAction(
                    'inWorkflowSuccess',
                    () => {
                        return Promise.resolve({ x: 1 });
                    }
                );
                const inWorkflowError = this.inWorkflowStepAction(
                    'inWorkflowError',
                    () => {
                        return Promise.reject(new Error('test'));
                    }
                );
                const modifiedInWorkflowAction = this.inWorkflowRedefineAction(
                    'inWorkflowRedefine',
                    () => {
                        const action = new TestAction();
                        action.main = () => {
                            action.setResult({
                                x: '10',
                            });
                            return Promise.resolve(ActionState.ERROR);
                        };
                        return action;
                    }
                );
                return [
                    inWorkflowAction,
                    inWorkflowError,
                    await modifiedInWorkflowAction,
                ];
            })
            .name('catch')
            .catch(() => {
                const inWorkflowAction = this.inWorkflowStepAction(
                    'inWorkflowSuccess2',
                    () => {
                        return Promise.resolve();
                    }
                );
                return [
                    new TestAction(),
                    inWorkflowAction,
                    new BasicWorkflow(),
                    Action.reject('xyz'),
                ];
            })
            .name('workflowInWorkflow')
            .catch(() => {
                const workflow = new Workflow();
                workflow
                    .name('start')
                    .next(() => {
                        const action = workflow.inWorkflowStepAction(
                            'error',
                            () => {
                                return Promise.reject();
                            }
                        );
                        return action;
                    })
                    .name('end')
                    .catch(() => {
                        const action = workflow.inWorkflowStepAction(
                            'success',
                            () => {
                                return Promise.resolve();
                            }
                        );
                        return action;
                    });
                workflow.dynamiclyDefineFromWorfklowStep(this, 'wInW');
                return workflow;
            });
    }
}

export class WorkflowApp extends ActionApp {
    declare = [
        TestRollBack,
        TestActionWithRollBack,
        BasicWorkflow,
        TestExecutorAction,
        TestActionInWorkflow,
        TestActionMainTimeout,
        Workflow,
    ];
}
