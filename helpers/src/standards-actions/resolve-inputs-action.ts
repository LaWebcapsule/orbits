import { Action, ActionError, ActionState } from '@orbi-ts/core';
import { utils } from '@orbi-ts/services';

export const INPUT_TYPE_BAG = 'bag';

export type InputDescriptionType = {
    type?: string; // 'bag' | 'file' | 'url' | ..., bag by default
    options?: (string | boolean | number)[];
    [key: string]: any;
};
export type InputsDescriptionType = Record<string, InputDescriptionType>;
export type InputsResultType = Record<string, any>;

export const INPUTS_KEY = '__inputs';

export interface InputHandler {
    /**
     * Retrieve the input value based on description.
     * May return immediately (like bag), or perform async logic (like file or url).
     */
    getValue(
        key: string,
        desc: InputDescriptionType,
        ctx: ResolveInputsAction
    ): Promise<any>;

    /**
     * Optionally validate the retrieved value.
     * Return validation error message for invalid values.
     */
    validate?(value: any, desc: InputDescriptionType): string | void;
}

export class BagInputHandler implements InputHandler {
    getValue(key: string, desc: any, ctx: ResolveInputsAction) {
        return ctx.bag[INPUTS_KEY]?.[key] ?? undefined;
    }

    validate(value: any, desc: InputDescriptionType) {
        if (desc.options && !desc.options.includes(value))
            return `must be one of ${desc.options.join(', ')}`;
    }
}

export class ResolveInputsAction extends Action {
    static permanentRef = 'RequestInput';

    declare IArgument: Action['IArgument'] & {
        [INPUTS_KEY]: InputsDescriptionType;
    };

    declare IBag: Action['IBag'] & {
        [INPUTS_KEY]: InputsResultType;
    };

    declare IResult: Action['IResult'] & InputsResultType;

    private inputsHandlersRegistry: Record<string, InputHandler> = {
        [INPUT_TYPE_BAG]: new BagInputHandler(),
    };

    constructor() {
        super();
        this.argument[INPUTS_KEY] = {};
        this.dbDoc.markModified(`argument.${INPUTS_KEY}`);
    }

    async init() {
        this.bag[INPUTS_KEY] ||= {};
        this.dbDoc.markModified(`bag.${INPUTS_KEY}`);
    }

    async resolveInputs() {
        const inputsDesc = this.argument[INPUTS_KEY] || {};
        let bagUpdated = false;

        await Promise.all(
            Object.entries(inputsDesc).map(async ([key, desc]) => {
                if (!desc.type) desc.type = INPUT_TYPE_BAG;
                const handler = this.inputsHandlersRegistry[desc.type];
                if (!handler)
                    throw new ActionError(`Unknown input type: '${desc.type}'`);

                try {
                    const value = await handler.getValue(key, desc, this);
                    if (value === undefined) return;
                    const validateErrMsg = handler.validate?.(value, desc);
                    if (validateErrMsg) {
                        this.internalLog(
                            `Invalid value ${utils.wrapInQuotes(value)} for input '${key}': ${validateErrMsg}`,
                            { level: 'error' }
                        );
                        return;
                    }
                    this.bag[INPUTS_KEY][key] = value;
                    bagUpdated = true;
                } catch (err) {
                    this.internalLog(
                        `Error resolving input '${key}': ${(err as Error).message}`,
                        { level: 'error' }
                    );
                }
            })
        );

        if (bagUpdated) {
            this.dbDoc.markModified(`bag.${INPUTS_KEY}`);
            await this.dbDoc.save();
        }

        return (
            Object.keys(this.bag[INPUTS_KEY]).length ===
            Object.keys(this.argument[INPUTS_KEY]).length
        );
    }

    async main() {
        return ActionState.IN_PROGRESS;
    }

    async watcher() {
        try {
            if (await this.resolveInputs()) {
                this.setResult(this.bag[INPUTS_KEY]);
                return ActionState.SUCCESS;
            }
        } catch (err) {
            this.internalLog((err as Error).message, { level: 'error' });
            return ActionState.ERROR;
        }
        return ActionState.IN_PROGRESS;
    }

    async rollBack() {
        return ActionState.SUCCESS;
    }

    registerInputHandler(type: string, handler: InputHandler) {
        if (this.inputsHandlersRegistry[type])
            throw new ActionError(
                `Input handler for type "${type}" already registered`
            );
        this.inputsHandlersRegistry[type] = handler;
        return this;
    }

    addInput(key: string, desc: InputDescriptionType) {
        return this.addInputs({ key, desc });
    }

    addInputs(
        inputs:
            | { key: string; desc: InputDescriptionType }
            | { key: string; desc: InputDescriptionType }[]
    ) {
        inputs = Array.isArray(inputs) ? inputs : [inputs];
        inputs.forEach(({ key, desc }) => {
            if (!desc.type) desc.type = INPUT_TYPE_BAG;
            if (!(desc.type in this.inputsHandlersRegistry))
                throw new ActionError(`No handler for input '${key}'`);
            if (this.argument[INPUTS_KEY][key])
                throw new ActionError(`Input '${key}' already added`);
            this.argument[INPUTS_KEY][key] = desc;
        });
        return this;
    }
}
