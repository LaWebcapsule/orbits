import { Action, ActionError, ActionState } from '@orbi-ts/core';
import { utils } from '@orbi-ts/services';

export type InputsDescription = {
    [key: string]: {
        type: string;
        options?: (string | boolean | number)[]; // to specify a list of acceptable values, any value if not provided
        [key: string]: any;
    };
};

export type InputsResult = {
    [key: string]: any;
};

export class WaitForInput extends Action {
    static permanentRef = 'WaitForInput';

    declare IArgument: Action['IArgument'] & {
        inputs: InputsDescription;
    };

    declare IBag: Action['IArgument'] & {
        inputs: InputsResult;
    };

    declare IResult: Action['IResult'] & {
        inputs: InputsResult;
    };

    async init() {
        if (!this.bag.inputs) this.bag.inputs = {};
        if (!this.result.inputs) this.result.inputs = {};
        this.dbDoc.markModified('bag.inputs');
        this.dbDoc.markModified('result.inputs');
    }

    async checkInputs() {
        // for each input, call checkInput<Type>
        // could check for file existence for instance, or response from an URL
        const changes = await Promise.all(
            Object.entries(this.argument.inputs).map(
                async ([key, { type, options, ...other }]) => {
                    // input already registered
                    // or
                    // no need to do anything for bag inputs
                    // as they are already there
                    if (key in this.bag.inputs || type === 'bag') return;

                    try {
                        const input = await this[
                            `checkInputs${utils.capitalize(type)}`
                        ](key, other);

                        if (!options || options.includes(input)) {
                            this.bag.inputs[key] = input;
                            return true;
                        }

                        this.internalLog(
                            `Invalid value for ${key}: ${utils.wrapInQuotes(input)}, (options: [${options.map(utils.wrapInQuotes).join(', ')}])`,
                            { level: 'error' }
                        );
                    } catch (err) {
                        this.internalLog(
                            `Error checking input ${key}: ${err}`,
                            { level: 'error' }
                        );
                    }
                }
            )
        );

        if (changes.filter(Boolean).length > 0) {
            this.dbDoc.markModified('bag.inputs');
            await this.dbDoc.save();
        }

        return (
            Object.keys(this.bag.inputs).length ===
            Object.keys(this.argument.inputs).length
        );
    }

    async main() {
        return ActionState.IN_PROGRESS;
    }

    async watcher() {
        if (await this.checkInputs()) {
            this.setResult(this.bag.inputs);
            return ActionState.SUCCESS;
        }
        return ActionState.IN_PROGRESS;
    }

    async rollBack() {
        return ActionState.SUCCESS;
    }

    setArgument(args: this['IArgument']) {
        // check that we have one checkInput<Type> method for each given argument
        // bag doesn't need a specific checkInput method
        for (const [key, { type }] of Object.entries(args.inputs)) {
            if (
                type !== 'bag' &&
                typeof this[`checkInputs${utils.capitalize(type)}`] !==
                    'function'
            )
                throw new ActionError(
                    `No checkInputs${utils.capitalize(type)} method for input '${key}'`
                );
        }
        return super.setArgument(args);
    }
}
