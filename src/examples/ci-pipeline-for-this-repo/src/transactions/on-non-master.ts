import { Transaction } from "@wbce/orbits-core";



export class OnNonMasterWorkflow extends Transaction{

    define(){
        this.next(()=>{
            return;
        }).next(()=>{
            //publish result to github
        })
    }

}