import { utils } from '@orbi-ts/services';
import { JSONObject } from '@orbi-ts/services/src/utils.js';
import {
    Action,
    ActionError,
    ActionRuntime,
    ActionSchemaInterface,
    ActionState,
    errorCodes,
    Workflow,
} from '../index.js';
import { AgentSchemaInterface } from './models/agent.js';
import { actionKind, actionKindSymbols } from './runtime/action-kind.js';

const COALESCING_WORKFLOW_TAG = actionKindSymbols.get(
    actionKind.COALESCING_WORKFLOW
);
const AGENT_TAG = actionKindSymbols.get(actionKind.AGENT);
const AGENT_CONTROLLER_TAG = actionKindSymbols.get(actionKind.AGENT_CONTROLLER);

export abstract class CoalescingWorkflow extends Workflow {
    static [COALESCING_WORKFLOW_TAG] = true;

    identity(): any {
        return;
    }

    private identityString: string;
    stringifyIdentity() {
        if (!this.identityString) {
            const identity = this.identity();
            if (typeof identity === 'string') {
                this.identityString = identity;
            } else {
                this.identityString = JSON.stringify(this.identity());
            }
        }
        return this.identityString;
    }

    substitute(
        otherPendingActionsWithSameIdentity: this['dbDoc'][]
    ): this['dbDoc'] | undefined {
        return otherPendingActionsWithSameIdentity?.[0];
    }

    async save(params = { nCall: 0, isNew: this.dbDoc.isNew }) {
        if (params.isNew || !this.dbDoc.identity) {
            const pendingActionsWithSameIdentity =
                await ActionRuntime.activeRuntime.ActionModel.find({
                    actionRef: this.dbDoc.actionRef,
                    identity: this.stringifyIdentity(),
                    state: {
                        $lt: ActionState.SUCCESS,
                    },
                }).sort('createdAt');
            let substitutionDoc: ActionSchemaInterface;
            if (pendingActionsWithSameIdentity.length) {
                substitutionDoc = this.substitute(
                    pendingActionsWithSameIdentity
                );
            }
            if (!substitutionDoc) {
                this.dbDoc.identity = this.stringifyIdentity();
                const actionsWithSameIdentity =
                    await ActionRuntime.activeRuntime.ActionModel.find({
                        actionRef: this.dbDoc.actionRef,
                        identity: this.dbDoc.identity,
                    }).sort({ generatorCount: -1 });
                this.dbDoc.generatorCount =
                    (actionsWithSameIdentity?.[0]?.generatorCount || 0) + 1;
            } else {
                this.dbDoc = substitutionDoc;
            }
        }
        return super.save().catch((err) => {
            if (
                err.code === 11000 &&
                err.message.includes('duplicate key error') &&
                params.nCall < 1
            ) {
                //we retry only once;
                params.nCall++;
                return this.save(params);
            }
            throw err;
        });
    }

    mapRefWithStrategy = new Map<string, 'default' | 'cross-workflow'>();
    async findIfEquivalentActionAlreadyExists(ref: string, action: Action) {
        const strategy = this.mapRefWithStrategy.get(ref);
        let actionDb: ActionSchemaInterface;
        if (strategy === 'cross-workflow') {
            const actions = await ActionRuntime.activeRuntime.ActionModel.find({
                workflowRef: ref,
                workflowIdentity: this.stringifyIdentity(),
            }).sort('createdAt');
            for (const action of actions) {
                if (!this.registeredActionIds.includes(action.id)) {
                    actionDb = action;
                    break;
                }
            }
        }
        return (
            actionDb ||
            (await super.findIfEquivalentActionAlreadyExists(ref, action))
        );
    }

    async once(
        ref: string,
        opts:
            | {
                  init?: Action['init'];
                  main: Action['main'];
                  watcher?: Action['watcher'];
              }
            | Action
            | {
                  dynamicAction: Action | (() => Action);
              }
            | (() => Promise<any>)
    ) {
        this.mapRefWithStrategy.set(ref, 'cross-workflow');
        return super.do(ref, opts);
    }

    async lastOutput() {
        const oldActions = await ActionRuntime.activeRuntime.ActionModel.find({
            identity: this.stringifyIdentity(),
            actionRef: this.dbDoc.actionRef,
        }).sort({ createdAt: -1 });
        return oldActions[0]?.result;
    }
}

export abstract class Digestor extends CoalescingWorkflow {
    async define() {
        await this.once('installController', async () => {
            return new Action();
        });
        const changes = await this.do('digest', () => {
            return this.digest();
        });
        for (const c of changes) {
            await this[`define${c}`];
        }
        return {};
    }

    digest(): Promise<string[]> {
        return Promise.resolve([]);
    }
}

export class Sleep extends Action {
    declare IArgument: {
        time: number;
    };

    static cronDefaultSettings = { activityFrequency: 60 * 1000 };

    main() {
        this.dbDoc.delays = {
            [ActionState.EXECUTING_MAIN]: this.argument.time,
            [ActionState.IN_PROGRESS]: 2 * this.argument.time,
        };
        this.dbDoc.cronActivity.nextActivity = new Date(
            Date.now() + this.argument.time
        );
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

    onMainTimeout(): ActionState | Promise<ActionState> {
        return this.watcher();
    }

    async watcher() {
        const elapsedTime = Date.now() - this.dbDoc.createdAt.getTime();
        if (elapsedTime > this.argument.time) {
            return ActionState.SUCCESS;
        }
        return ActionState.IN_PROGRESS;
    }
}

export class AgentController<T extends Agent> extends CoalescingWorkflow {
    declare IArgument: T['IArgument'] & {
        actionRef: string;
    };

    static [AGENT_CONTROLLER_TAG] = true;

    constructor(agent?: T) {
        super();
        if (agent) {
            this.setArgument({
                ...agent.argument,
                actionRef: agent.dbDoc.actionRef,
            });
            this.setFilter(agent.dbDoc.filter);
        }
    }

    agent: T;
    agentDbDoc: T['agentDbDoc'];

    identity() {
        this.constructAgent();
        return this.agent.identity();
    }

    constructAgent() {
        if (this.agent) {
            return this.agent;
        }
        const ActionCtr = ActionRuntime.activeRuntime.getActionFromRegistry(
            this.argument.actionRef
        );
        const agent = new ActionCtr() as T;
        agent.setArgument({
            ...this.argument,
            actionRef: undefined,
        });
        this.agent = agent;
        return agent;
    }

    async init() {
        await super.init();
        const agent = this.constructAgent();
        await agent.getAgentDoc();
        this.agent = agent;
        this.agentDbDoc = agent.agentDbDoc;
    }

    async define() {
        const sleep = new Sleep().setArgument({
            time: this.agentDbDoc.cycle.frequency,
        });
        await this.do('sleep', sleep);

        try {
            this.agent.setCommand('cycle' as any);
            await this.do('cycle', this.agent.clone());
        } catch (err) {
            this.internalLog(`Error during cycle execution: ${err}`);
            //do nothing
        }

        await this.do('launchClone', async () => {
            const clone = this.clone();
            await clone.save();
        });
        return {};
    }
}

export class ScopeOfChanges<T> {
    constructor(
        public commandName: T,
        public opts?: any
    ) {}
}

type AgentCommands<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
        ? K extends `define${infer S}`
            ? K extends keyof Workflow
                ? never
                : S
            : never
        : never;
}[keyof T];

export class Agent extends CoalescingWorkflow {
    static [AGENT_TAG] = true;

    declare IArgument: { commandName?: string };

    async init() {
        await this.getAgentDoc();
        await super.init();
    }

    declare IResult: this['IOutput'];

    IOutput: JSONObject;
    IInfo: JSONObject;

    agentDbDoc: AgentSchemaInterface<this['IOutput'], this['IInfo']>;
    async getAgentDoc() {
        if (this.agentDbDoc) {
            return Promise.resolve(this.agentDbDoc);
        }

        let identity = this.stringifyIdentity();

        this.agentDbDoc = await this.runtime.AgentModel.findOne({
            identity,
            actionRef: this.runtime.getActionRefFromRegistry(
                this.constructor as any
            ),
        });
        return this.agentDbDoc;
    }

    defaultAgentSettings: { cycle: { frequency: number } } = {
        cycle: {
            frequency: 10 * 60 * 1000, //default to 10 minutes
        },
    };

    async createAgentDoc() {
        if (await this.getAgentDoc()) {
            return; //already exists
        }
        this.agentDbDoc = new this.runtime.AgentModel({
            ...this.defaultAgentSettings,
            identity: this.stringifyIdentity(),
            actionRef: this.runtime.getActionRefFromRegistry(
                this.constructor as any
            ),
        });
        return this.agentDbDoc.save();
    }

    async saveAgentOutput(output: any) {
        this.agentDbDoc.output = output;
        await this.agentDbDoc.save();
    }

    async getAgentOutput() {
        const agentDbDoc = await this.getAgentDoc();
        return agentDbDoc.output;
    }

    setArgument(args: Omit<this['IArgument'], 'commandName'>): this {
        return super.setArgument(args);
    }

    setCommand(commandName: AgentCommands<this>) {
        return this.setArgument({
            ...this.argument,
            commandName,
        });
    }

    defineInstall() {}

    defineCycle() {}

    version: string = '1.0.0';

    noConcurrencyCommandNames = ['install', 'update', 'uninstall'];
    async lockCommand(commandName: string) {
        if (this.noConcurrencyCommandNames.includes(commandName)) {
            if (this.agentDbDoc.locks.length) {
                this.agentDbDoc.locks.push({
                    name: commandName,
                });
                await this.agentDbDoc.save();
            } else {
                throw new ActionError(
                    'a command is already in progress',
                    errorCodes.AGENT_LOCKED
                );
            }
        }
    }

    async define() {
        await this.once('createAgentDoc', () => {
            return this.createAgentDoc();
        });
        await this.once('installController', () => {
            const controller = new AgentController(this);
            return controller.save();
        });
        const commandName = this.argument.commandName
            ? utils.capitalize(this.argument.commandName)
            : '';
        if (commandName && typeof this[`define${commandName}`] === 'function') {
            await this.do('lock', this.lockCommand.bind(this));
            try {
                return await this[`define${commandName}`]();
            } finally {
                await this.repeatDo(
                    'unlock',
                    async () => {
                        await this.getAgentDoc();
                        (this.agentDbDoc.locks as any).pull({
                            name: commandName,
                        });
                        await this.agentDbDoc.save();
                    },
                    {
                        [ActionState.ERROR]: Infinity,
                    }
                );
            }
        } else {
            const changes = await this.do('digest', () => {
                return this.digest();
            });
            for (const c of changes) {
                const clone = this.clone();
                clone.setCommand(c.commandName);
                await this.do(c.commandName, clone);
            }
            await this.do('saveVersion', () => {
                this.agentDbDoc.version = this.version;
                return this.agentDbDoc.save();
            });
            try {
                await this.repeatDo(
                    'endDigestor',
                    () => {
                        return this.endDigestor();
                    },
                    {
                        [ActionState.ERROR]: 2,
                    }
                );
            } catch (err) {
                //do nothing here.
            }
            return this.agentDbDoc.output;
        }
    }

    async digest(): Promise<ScopeOfChanges<string>[]> {
        const changes = [];
        if (this.agentDbDoc.version !== this.version) {
            changes.push(new ScopeOfChanges('install'));
        }
        changes.push(new ScopeOfChanges('update'));
        return changes;
    }

    defineUpdate() {}

    defineUninstall() {}

    async setOutput(): Promise<this['IOutput']> {
        return;
    }

    async endDigestor() {
        const output = await this.setOutput();
        await this.saveAgentOutput(output);
    }

    substitute(
        otherPendingActionsWithSameIdentity: ActionSchemaInterface[]
    ): ActionSchemaInterface | undefined {
        return otherPendingActionsWithSameIdentity.filter(
            (a) => a.argument.commandName === this.argument.commandName
        )?.[0];
    }

    resyncWithDb() {
        this.agentDbDoc = undefined;
        return this.getAgentDoc().then(() => {
            return super.resyncWithDb();
        });
    }
}

/**
 * @deprecated `Resource` has been renamed to `Agent`.
 * Please replace all occurrences of `Resource` with `Agent`.
 * See: https://github.com/LaWebcapsule/orbits/pull/113
 */
export const Resource = new Proxy(Agent, {
    construct(target, args, newTarget) {
      console.warn(
        "⚠️ 'Resource' is deprecated. Please replace to use 'Agent' constructor instead.\nSee: https://github.com/LaWebcapsule/orbits/pull/113"
      );
      return Reflect.construct(target, args, newTarget);
    },
});

type x = AgentCommands<Agent>;
