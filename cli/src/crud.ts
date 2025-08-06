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
import { isValidObjectId } from 'mongoose';
import { deepMerge, JSONObject } from '../../packages/services/src/utils.js';

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
        args: JSONObject,
        filter?: JSONObject
    ): Promise<Action> {
        const ActionCtr =
            ActionRuntime.activeRuntime.getActionFromRegistry(actionRef);
        if (!ActionCtr)
            throw Error(`Action ${actionRef} not found in registry`);
        const action = new ActionCtr(ActionRuntime.activeRuntime)
            .setArgument(
                // const action = new ActionCtr(ActionRuntime.activeRuntime).setArgument(
                args
            )
            .setFilter(filter || {});
        // if (filter) action.setFilter(filter);
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
        args: JSONObject,
        states: ActionState[] = [ActionState.SUCCESS, ActionState.ERROR]
    ): Promise<Action> {
        const ActionCtr =
            ActionRuntime.activeRuntime.getActionFromRegistry(actionRef);
        if (!ActionCtr)
            throw Error(`Action ${actionRef} not found in registry`);
        const action = new ActionCtr(ActionRuntime.activeRuntime).setArgument(
            args
        );
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
        filter: any = {},
        sort?: { [key: string]: -1 | 1 }
    ): Promise<LogSchemaInterface[]> {
        return await ActionRuntime.activeRuntime.LogModel.find(
            { filter },
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
     * @param returnConstructor whether to return constructors or names
     * @returns
     */
    static async listFromRegistry(
        kind?: actionKind,
        includeBase?: boolean
    ): Promise<
        {
            ref: string;
            kind: actionKind;
            ctr: typeof Action;
        }[]
    > {
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
        actionDb.cronActivity.paused = true;
        await actionDb.save();
    }

    /**
     * resume the action
     *
     * @param actionId
     */
    static async resume(actionId: string) {
        let actionDb = await this.findActionById(actionId);

        actionDb!.cronActivity.nextActivity = new Date();

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
     * Create a new action by copying given one,
     * do not call constructFromDb so there is no issue with unregistered actions.
     *
     * @param actionId
     * @returns the id of the new action
     */
    static async replay(actionId: string): Promise<string> {
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

        // c

        // TODO does not work
        // const newActionData = actionDb.toObject();
        // delete newActionData._id;
        // delete newActionData._v;
        // delete newActionData.bag;
        // delete newActionData.result;
        // delete newActionData.createdAt;
        // delete newActionData.lockedAt;
        // delete newActionData.updatedAt;
        // delete newActionData.cronActivity.pending;
        // newActionData.cronActivity.pending = true;

        actionDb.state = ActionState.SLEEPING;
        actionDb.cronActivity.pending = false;
        actionDb.cronActivity.nextActivity = actionDb.cronActivity.lastActivity;

        await actionDb.save();

        // const newActionDb =
        //     await ActionRuntime.activeRuntime.ActionModel.create(newActionData);

        if (actionDb.workflowId) {
            const parentDb =
                await ActionRuntime.activeRuntime.ActionModel.findById(
                    actionDb.workflowId
                );

        //     // remove registered action starting from action:
        //     const registeredActions = (parentDb!.bag as Workflow['IBag'])
        //         .registeredActions;
        //     const actionIdx = registeredActions.findIndex(
        //         ({ _id }) => _id === actionDb._id
        //     );
        //     console.log(registeredActions);
        //     console.log(registeredActions.slice(0, actionIdx));

        //     (parentDb!.bag as Workflow['IBag']).registeredActions =
        //         registeredActions.slice(0, actionIdx-1);
        //     // (parentDb!.bag as Workflow['IBag']).registeredActions.push({
        //     //     ref: newActionDb.workflowRef!,
        //     //     _id: newActionDb._id.toString(),
        //     // });

            parentDb!.state = ActionState.SLEEPING;
            parentDb!.cronActivity.nextActivity = parentDb!.cronActivity.lastActivity;
            parentDb?.markModified('bag.registeredActions');
            await parentDb?.save();
        }

        //     console.log((parentDb!.bag as Workflow['IBag']).registeredActions)
        // }

        // reset parents in progress
        // let parentId = actionDb.workflowId;
        // let parentRef = actionDb.workflowRef;
        // while (parentId && parentRef) {
        //     const parentDb =
        //         await ActionRuntime.activeRuntime.ActionModel.findById(
        //             parentId
        //         );
        //     if (parentDb) {
        //         parentDb.state = ActionState.SLEEPING;
        //         parentDb.cronActivity.nextActivity = new Date();
        //         console.log(parentDb.bag.registeredActions);
        //         (parentDb.bag as Workflow['IBag']).registeredActions = [
        //             ...(parentDb.bag as Workflow['IBag']).registeredActions,
        //             {
        //                 ref: parentRef,
        //                 _id: parentId,
        //             },
        //         ];
        //         parentDb.markModified('bag');
        //         parentDb.cronActivity.pending = true;
        //         parentDb.markModified('cronActivity');
        //         await parentDb.save();
        //         // (await Action.constructFromDb(parentDb)).resume()
        //         console.log(parentDb.bag.registeredActions);
        //     }
        //     parentId = parentDb?.workflowId;
        //     parentRef = parentDb?.workflowRef;
        // }

        // return newActionDb._id.toString();
    }

    /**
     * Set an action bag, perform a merge.
     *
     * @param actionId
     * @param bag
     */
    static async setBag(
        actionId: string,
        bag: JSONObject
    ): Promise<ActionSchemaInterface> {
        const actionDb = await this.findActionById(actionId);
        deepMerge(actionDb.bag, bag);
        actionDb.bag = bag;
        return actionDb.save();
    }

    // RESOURCES

    // /**
    //  * Run cmd on given resource.
    //  *
    //  * @param resourceRefOrId
    //  */
    // static async runResourceCmd(resourceRefOrId: string, cmd: string) {
    //     // TODO: find ref if id was provided

    //     const resourceRef = '';

    //     return this.run(resourceRef, {
    //         commandName: cmd,
    //     } as Resource['IArgument']);
    // }

    // static getAllProperties(obj) {
    //     const props = new Set();

    //     while (obj && obj !== Object.prototype) {
    //         for (const key of Reflect.ownKeys(obj)) {
    //             props.add(key);
    //         }
    //         obj = Object.getPrototypeOf(obj);
    //     }

    //     return [...props];
    // }

    // /**
    //  * Run cmd on given resource.
    //  *
    //  * @param resourceRefOrId
    //  */
    // static async listResourceCommands(resourceRefOrId: string) {
    //     const resourceRef = ''; // TODO: find ref if id was provided

    //     // if id or identity is provided, first find corresponding ref
    //     // TODO: find ref

    //     const availableResources = await this.listResourcesFromRegistry(true);

    //     let resource: Resource;
    //     for (const resourceCls of availableResources) {
    //         console.log(resourceCls, resourceCls.permanentRef);
    //         if (
    //             resourceCls.permanentRef === resourceRefOrId ||
    //             new resourceCls().identity() == resourceRefOrId
    //         ) {
    //             resource = new resourceCls();
    //         }
    //     }

    //     return this.getAllProperties(resource)
    //         .filter(
    //             (member: string) =>
    //                 ![
    //                     'define',
    //                     'defineDynamicAction',
    //                     'defineCallMode',
    //                 ].includes(member) && member.startsWith('define')
    //         )
    //         .map((cmd: string) => cmd.substring('define'.length));
    // }

    // static async installResource(resourceRefOrId: string) {
    //     return this.runResourceCmd(resourceRefOrId, 'install');
    // }

    // static async uninstallResource(resourceRefOrId: string) {
    //     return this.runResourceCmd(resourceRefOrId, 'uninstall');
    // }

    // static async getResource(resourceId: string) {
    //     await ActionRuntime.waitForActiveRuntime;

    //     if (mongoose.Types.ObjectId.isValid(resourceId)) {
    //         const doc =
    //             await ActionRuntime.activeRuntime.ResourceModel.findById(
    //                 resourceId
    //             );
    //         if (doc) return doc;
    //     }

    //     // try identity
    //     return ActionRuntime.activeRuntime.ResourceModel.findOne({
    //         identity: resourceId,
    //     });
    // }

    // /**
    //  * list resources in registry
    //  *
    //  * @param [returnConstructor=false] whether to return constructors instead of resources refs
    //  */
    // static async listResourcesFromRegistry(returnConstructor: boolean = false) {
    //     return this.listFromRegistry(actionKind.RESOURCE, returnConstructor);
    // }

    // /**
    //  * List resource in database
    //  *
    //  * @returns array of resources dbDoc
    //  */
    // static async listResources() {
    //     return await ActionRuntime.activeRuntime.ResourceModel.find();
    // }
}
