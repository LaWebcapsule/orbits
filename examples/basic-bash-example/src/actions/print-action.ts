import { Action, ActionState } from '@orbi-ts/core';

export class PrintAction extends Action {
    static permanentName: 'print-action';

    IArgument: {
        toPrint: string;
    };

    main() {
        console.log('\x1b[36m%s\x1b[0m', this.argument.toPrint);
        return ActionState.SUCCESS;
    }
}
