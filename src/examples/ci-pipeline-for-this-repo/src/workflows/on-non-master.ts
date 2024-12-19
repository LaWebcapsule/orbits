import { Workflow } from '@wbce/orbits-core';

export class OnNonMasterWorkflow extends Workflow {
    define() {
        this.next(() => {}).next(() => {
            //publish result to github
        });
    }
}
