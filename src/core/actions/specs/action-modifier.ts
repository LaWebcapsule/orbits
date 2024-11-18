import { Action } from '../index';

export const putManuallyDebuggingOnAction = function () {
    const oldAction = Action;
    const oldExecute = Action.prototype.resume;
    Action.prototype.resume = function () {
        if (!this.debuggerSetted) {
            const oldMain = this.main;
            this.putDebugger = true;
            this.main = function () {
                return oldMain.call(this).then((result) => {
                    return result;
                });
            };
            this.debuggerSetted = true;
        }
        return oldExecute.call(this).then((result) => {
            return result;
        });
    };
};
