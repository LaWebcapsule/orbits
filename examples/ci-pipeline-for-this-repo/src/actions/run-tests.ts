import { Action, ActionState } from '@wbce/orbits-core';
import { DockerExecutor, PublicRegistry } from '@wbce/orbits-fuel';
import { GitCloneAction } from './git-clone-repo';

export class RunTest extends GitCloneAction {
    static defaultDelays = {
        [ActionState.EXECUTING_MAIN]: 10 * 60 * 1000, //test can not take more than 10 minutes.
    };

    main() {}
}
