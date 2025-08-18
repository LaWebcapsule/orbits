import { Action, ActionState } from '@orbi-ts/core';

export class VerifyLambdaDeploymentAction extends Action {
    declare IArgument: Action['IArgument'] & {
        endpoint: string;
    };

    async main() {
        const firstName = 'John';
        const lastName = 'Doe';

        const now = new Date();
        const wantPattern = new RegExp(
            `Hello ${firstName} ${lastName}, time is ${now.getUTCHours()}:${now.getUTCMinutes()}:\\d+ \\(UTC\\)`
        );

        const params = new URLSearchParams();
        params.append('first_name', firstName);
        params.append('last_name', lastName);

        const response = await fetch(`${this.argument.endpoint}?${params}`);

        if (!response.ok) {
            const msg = `Response is not ok: ${response}`;
            this.internalLog(msg);
            throw Error(msg);
        }

        const resText = await response.text();
        if (!wantPattern.test(resText)) {
            const msg = `Response is not correct: ${resText} does not match ${wantPattern}`;
            this.internalLog(msg);
            throw Error(msg);
        }

        return ActionState.SUCCESS;
    }
}
