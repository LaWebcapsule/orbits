import { Action, ActionState } from '@orbi-ts/core';



export class HelloAction extends Action{

    main(){
        console.log('Hello 👋');
        this.setResult('Hello');
        return ActionState.SUCCESS
    }

}