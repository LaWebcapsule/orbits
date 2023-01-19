import { Workflow } from "@wbce/orbits-core";
import { PrintAction } from "./actions/print-action";

const defaultEnv = {
    timer: 30,
}

export class CiPipeline extends Workflow {
    define() {
        const stackName = 'main-pipeline';
        console.log("ciPipeline define")
        this.next(() => {
            const printAction = new PrintAction();
            printAction.setArgument({toPrint :'Print me boy.'});
            return printAction;
        }).catch(err => {
            // Global Pipeline Catch
            console.log(err);
            throw err;
        })
    }
}    
