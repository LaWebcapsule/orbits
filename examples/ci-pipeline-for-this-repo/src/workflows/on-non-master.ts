import { Workflow } from '@orbi-ts/core';

export class OnNonMasterWorkflow extends Workflow {
    define() {
        this.next(() => {}).next(() => {
            //publish result to github
        });
    }
}
