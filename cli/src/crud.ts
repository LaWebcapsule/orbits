import {
    Action,
    actionKind,
    actionKindSymbols,
    ActionRuntime,
    ActionSchemaInterface,
    ActionState,
    LogSchemaInterface,
    Workflow,
} from '@orbi-ts/core';
import { INPUTS_KEY } from '@orbi-ts/fuel';
import { utils } from '@orbi-ts/services';
import { isValidObjectId } from 'mongoose';

export const BASE_ACTIONS = [
    'Action',
    'ResolveAction',
    'RejectAction',
    'Workflow',
    'TrackPromise',
    'Resource',
    'CoalescingWorkflow',
    'Digestor',
    'Sleep',
    'ResourceController',
    'Resource',
];

export class InvalidParameterError extends Error {}
export class NotFoundError extends Error {}

export class CRUD {
    /**
     * Get action from database. Error out if action is not found.
     *
     * @param actionId the id of the action to find.
     * @returns
     */
    private static async findActionById(actionId: string) {
        if (!isValidObjectId(actionId))
            throw new InvalidParameterError('invalid action id');
        const actionDb =
            await ActionRuntime.activeRuntime.ActionModel.findById(actionId);
        if (!actionDb) throw new NotFoundError('action not found');
        return actionDb;
    }

    /**
     * Create a new action with the given `actionRef` in the database.
     * Error our if action is not found in active runtime registry.
     *
     * @param actionRef
     * @param args action arguments
     * @param filter additional filter
     * @returns the created action
     */
    static async run(
        actionRef: string,
        args: utils.JSONObject,
        filter?: utils.JSONObject
    ): Promise<Action> {
        const ActionCtr =
            ActionRuntime.activeRuntime.getActionFromRegistry(actionRef);
        if (!ActionCtr)
            throw Error(`Action ${actionRef} not found in registry`);
        const action = new ActionCtr()
            .setArgument(args)
            .setFilter(filter || {});
        await action.save();
        return action;
    }

    /**
     * Create a new action with the given `actionRef` in the database.
     * Resolve only when action has finished.
     * Error our if action is not found in active runtime registry.
     *
     * @param actionRef
     * @param args action arguments
     * @returns the created action
     */
    static async runSync(
        actionRef: string,
        args: utils.JSONObject,
        states: ActionState[] = [ActionState.SUCCESS, ActionState.ERROR]
    ): Promise<Action> {
        const ActionCtr =
            ActionRuntime.activeRuntime.getActionFromRegistry(actionRef);
        if (!ActionCtr)
            throw Error(`Action ${actionRef} not found in registry`);
        const action = new ActionCtr().setArgument(args);
        await action.save();
        await Action.trackActionAsPromise(action, states);
        return action;
    }

    /**
     * Get action from database.
     * If parents is provided, it won't error out if a parent is not found.
     *
     * @param actionId
     * @param filter additional filter
     * @param parentDepth if action is within a workflow, go up in the tree by parentDepth; if `< 1`: do not get
     * @returns
     */
    static async get(
        actionId: string,
        filter: {},
        parentDepth: number = 0
    ): Promise<{
        action: ActionSchemaInterface;
        actions: ActionSchemaInterface[];
        topId: string;
    }> {
        let action = await this.findActionById(actionId);

        let topId = actionId;

        if (parentDepth > 0 && action.workflowStack.length > 0) {
            topId =
                action.workflowStack[
                    Math.max(0, action.workflowStack.length - parentDepth)
                ]._id;
        }

        const actions = await ActionRuntime.activeRuntime.ActionModel.find({
            $and: [
                {
                    $or: [
                        { _id: topId },
                        { _id: actionId },
                        { 'workflowStack._id': topId },
                        { 'workflowStack._id': actionId },
                    ],
                },
                filter,
            ],
        });

        return {
            action,
            actions,
            topId,
        };
    }

    /**
     * Get logs from database for given action.
     *
     * @param actionIds ids of the actions
     * @returns list of logs
     */
    static async listLogs(
        query: any = {},
        sort?: { [key: string]: -1 | 1 }
    ): Promise<LogSchemaInterface[]> {
        return await ActionRuntime.activeRuntime.LogModel.find(
            query,
            {},
            { sort: sort }
        );
    }

    /**
     * List all actions in database.
     *
     * @param filter
     * @param sort
     */
    static async list(
        filter: any = {},
        sort?: { [key: string]: -1 | 1 }
    ): Promise<ActionSchemaInterface[]> {
        return await ActionRuntime.activeRuntime.ActionModel.find(
            filter,
            {},
            { sort: sort }
        );
    }

    /**
     * List all available actions from runtime registry.
     *
     * @param kind kind of the action
     * @param includeBase whether to include base actions
     * @returns
     */
    static listFromRegistry(
        kind?: actionKind,
        includeBase?: boolean
    ): {
        ref: string;
        kind: actionKind;
        ctr: typeof Action;
    }[] {
        const actions: {
            ref: string;
            kind: actionKind;
            ctr: typeof Action;
        }[] = [];
        ActionRuntime.activeRuntime['actionsRegistry'].forEach(
            (value: typeof Action, key: string) => {
                if (!includeBase && BASE_ACTIONS.includes(key)) return;

                // order is important as broader types have inherited tags
                for (const tagKind of [
                    actionKind.RESOURCE,
                    actionKind.RESOURCE_CONTROLLER,
                    actionKind.COALESCING_WORKFLOW,
                    actionKind.WORKFLOW,
                    actionKind.ACTION,
                ]) {
                    const tag = actionKindSymbols.get(tagKind);
                    if (tag && value[tag]) {
                        if (!kind || kind === tagKind)
                            actions.push({
                                ref: key,
                                kind: tagKind,
                                ctr: value,
                            });
                        break;
                    }
                }
            }
        );
        return actions;
    }

    /**
     * pause the action (useful for workflows)
     * @param actionId
     * @param duration in seconds
     *
     * @draft This is still under development, it needs work done in core to work properly.
     */
    static async pause(actionId: string, duration?: number) {
        let actionDb = await this.findActionById(actionId);

        if (actionDb.state !== ActionState.IN_PROGRESS) return;

        const nextActivity = new Date();

        if (duration === undefined) nextActivity.setFullYear(9999);
        else
            nextActivity.setMilliseconds(
                nextActivity.getMilliseconds() + duration * 1000
            );

        // pause children that are workflows
        // get registered actions and for each check if it has registered actions meaning it is a workflow
        (actionDb.bag as Workflow['IBag'])?.registeredActions?.forEach(
            async (subAction) => {
                const subActionDb =
                    await ActionRuntime.activeRuntime.ActionModel.findById(
                        subAction._id
                    );
                if (subActionDb?.bag.registeredActions) {
                    this.pause(subActionDb.id, duration);
                }
            }
        );

        actionDb.cronActivity.nextActivity = nextActivity;
        // TODO: rework core to pause a workflow
        // actionDb.cronActivity.paused = true;
        await actionDb.save();
    }

    /**
     * resume the action
     *
     * @param actionId
     */
    static async resume(actionId: string) {
        let actionDb = await this.findActionById(actionId);

        this.resumeActionDb(actionDb);

        // resume children that are workflows
        // get registered actions and for each check if it has registered actions meaning it is a workflow
        // await to 'resume' in order
        (actionDb.bag as Workflow['IBag'])?.registeredActions?.forEach(
            async (subAction) => {
                const subActionDb = await this.findActionById(subAction._id);
                if (subActionDb?.bag.registeredActions) {
                    this.resume(subActionDb.id);
                }
            }
        );

        await actionDb!.save();
    }

    /**
     * End the given action with provided state (default: `SUCCESS`).
     * For a workflow, end all sub actions.
     * Do nothing if the action has already ended. (in states `SUCCESS`, `ERROR`, `CLOSED` or `REVERTED`)
     *
     * @param actionId
     * @param state state to use instead of `SUCCESS`
     */
    static async end(
        actionId: string,
        state: ActionState.SUCCESS | ActionState.ERROR = ActionState.SUCCESS
    ) {
        const actionDb = await this.findActionById(actionId);

        if (
            actionDb.state == ActionState.REVERTED ||
            actionDb.state == ActionState.CLOSED ||
            actionDb.state == ActionState.ERROR ||
            actionDb.state == ActionState.SUCCESS
        )
            return;

        actionDb.state = state;
        await actionDb.save();

        if (!(actionDb.bag as Workflow['IBag'])?.registeredActions) return;

        // if actionId is a workflow, then end subActions
        for (const child of (actionDb.bag as Workflow['IBag'])
            ?.registeredActions) {
            await this.end(child._id, state);
        }
    }

    /**
     * Replay an action, only possible for actions that were not closed.
     *
     * @param actionId
     * @param replayFrom step to replay from in format `(childRef | childIdx), ( subChildRef | subChildIdx)...`
     */
    static async replay(
        actionId: string,
        replayFrom: (number | string)[] = [0]
    ) {
        const actionDb = await this.findActionById(actionId);

        if (
            actionDb.state !== ActionState.CLOSED &&
            actionDb.state !== ActionState.ERROR &&
            actionDb.state !== ActionState.SUCCESS
        ) {
            throw Error(
                `Action cannot be replayed in its current state (${ActionState[actionDb.state]})`
            );
        }

        actionDb.cronActivity.nextActivity = actionDb.cronActivity.lastActivity;

        const resetChildren = async (
            rootDbDoc: ActionSchemaInterface | undefined,
            steps: (number | string)[] = [0]
        ) => {
            if (!rootDbDoc) return;
            const isWorkflow = !!rootDbDoc.bag?.registeredActions;
            let registeredActions: { _id: string; ref: string }[] = [];
            if (isWorkflow) {
                registeredActions =
                    (rootDbDoc.bag as Workflow['IBag']).registeredActions ?? [];

                const [replayFromStep, ...remainingSteps] = steps;
                let reset = false;

                for (const [
                    idx,
                    registeredAction,
                ] of registeredActions.entries()) {
                    const isReplayPoint =
                        steps.length === 0 ||
                        registeredAction.ref === replayFromStep ||
                        idx === replayFromStep;

                    // enable reset starting from the matching step
                    if (isReplayPoint) reset = true;

                    if (reset) {
                        const childAction = await this.findActionById(
                            registeredAction._id
                        );
                        await resetChildren(
                            childAction,
                            isReplayPoint ? remainingSteps : [0]
                        );
                    }
                }

                if (!reset)
                    throw new InvalidParameterError(
                        `nothing to replay for step ${replayFromStep}`
                    );
            }

            // reset state, bag and result
            rootDbDoc.state = ActionState.SLEEPING;
            // rootDbDoc.bag = isWorkflow ? { registeredActions } : {};
            rootDbDoc.result = {};

            await rootDbDoc.save();
        };

        await resetChildren(actionDb, replayFrom);

        if (actionDb.workflowId) {
            const parentDb =
                await ActionRuntime.activeRuntime.ActionModel.findById(
                    actionDb.workflowId
                );

            parentDb!.state = ActionState.SLEEPING;
            parentDb!.cronActivity.nextActivity =
                parentDb!.cronActivity.lastActivity;
            await parentDb?.save();
        }

        await actionDb.save();
    }

    /**
     * Set an action bag, perform a merge.
     *
     * @param actionId
     * @param bag
     */
    static async setBag(
        actionId: string,
        bag: utils.JSONObject
    ): Promise<ActionSchemaInterface> {
        const actionDb = await this.findActionById(actionId);
        utils.deepMerge(actionDb.bag, bag);
        actionDb.bag = bag;
        this.resumeActionDb(actionDb);
        return actionDb.save();
    }

    static async addInputs(
        actionId: string,
        inputs: { [key: string]: any }
    ): Promise<ActionSchemaInterface> {
        const actionDb = await this.findActionById(actionId);
        if (!(INPUTS_KEY in actionDb.argument))
            throw new InvalidParameterError(
                `provided action doesn't accept inputs`
            );

        for (const [key, value] of Object.entries(inputs)) {
            const input = actionDb.argument[INPUTS_KEY][key];
            if (!input)
                throw new InvalidParameterError(
                    `no matching input for key '${key}'`
                );
            if (input.type !== 'bag')
                throw new InvalidParameterError(
                    `invalid type ${typeof value} for input ${key}=${value}}, expected ${input.type}`
                );

            if (input.options && !input.options.includes(value)) {
                throw new InvalidParameterError(
                    `Invalid input for ${key}: ${this.wrapInQuotes(value)}, ` +
                        `(options: [${input.options.map(this.wrapInQuotes).join(', ')}])`
                );
            }

            actionDb.bag[INPUTS_KEY][key] = value;
        }
        actionDb.markModified(`bag.${INPUTS_KEY}`);
        this.resumeActionDb(actionDb);
        return actionDb.save();
    }

    private static resumeActionDb(actionDb: ActionSchemaInterface) {
        actionDb!.cronActivity.nextActivity =
            actionDb!.cronActivity.lastActivity ?? new Date();
    }

    /**
     * Return value as a string, wrapped in quotes if it is a string
     * @param value
     * @returns string
     */
    private static wrapInQuotes(value: boolean | number | string): string {
        if (typeof value === 'string') return `'${value}'`;
        return `${value}`;
    }

    // TODO: move this into core
    // TODO: add CRUD for resources
}
