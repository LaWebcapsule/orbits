import { Action } from '../index';

export const putManuallyDebuggingOnAction = function () {
    const oldExecute = Action.prototype.resume;
    Action.prototype.resume = function () {
        if (!this.debuggerSet) {
            const oldMain = this.main;
            this.putDebugger = true;
            this.main = function () {
                return oldMain.call(this).then((result) => result);
            };
            this.debuggerSet = true;
        }
        return oldExecute.call(this).then((result) => result);
    };
};
