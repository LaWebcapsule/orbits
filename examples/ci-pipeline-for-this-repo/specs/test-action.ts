import { Action, ActionRuntime, ActionState, Workflow } from '../index';

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

    //image = "app-api_app"

    static defaultDelay = 100 * 1000;

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
            .next(() => Action.resolve('ok'))
            .catch(() => {
                const a = new TestAction();
                return [a];
            })
            .next(
                () =>
                    new Promise<void>((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    })
            );
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
                x--;
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
            .next(() => new TestActionWithRollBack());
    }
}

export class WorkflowApp extends ActionRuntime {
    declare = [TestRollBack, TestActionWithRollBack, BasicWorkflow];
}
