import { Workflow } from "@wbce/orbits-core";



export class OnNonMasterWorkflow extends Workflow{

    define(){
        this.next(()=>{
            return;
        }).next(()=>{
            //publish result to github
        })
    }

}