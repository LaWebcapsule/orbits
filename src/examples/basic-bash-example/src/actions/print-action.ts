import {Action, ActionState} from '@wbce/orbits-core'

export class PrintAction extends Action{    
    static permanentName: 'print-action'

    IArgument : {
        toPrint : string
    }

    main(){
            console.log(this.argument.toPrint);
            return ActionState.SUCCESS;
        }

}

