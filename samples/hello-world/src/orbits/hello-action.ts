import { Action, ActionState } from '@wbce/orbits-core';



export class HelloAction extends Action{

    main(){
        this.internalLog('Hello 👋');
        this.setResult('Hello');
        return ActionState.SUCCESS
    }

}