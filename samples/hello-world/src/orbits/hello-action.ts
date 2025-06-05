import { Action, ActionState } from '@wbce/orbits-core';



export class HelloAction extends Action{

    main(){
        console.log('Hello 👋');
        this.setResult('Hello');
        return ActionState.SUCCESS
    }

}