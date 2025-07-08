import { ActionSchemaInterface } from '@orbi-ts/core';

import { ActionsBlessedRenderer } from './blessed-renderer.js';
import { ActionsViewerAction } from './constants.js';
import { ActionsTextRenderer } from './text-renderer.js';

export class ActionsViewer {
    private top: string;

    private renderer: ActionsBlessedRenderer | ActionsTextRenderer;

    /**
     * Store for each workflow ID,
     * the IDs of the corresponding actions
     */
    private actionsToWorkflowMap: Map<string, string[]> = new Map();

    /**
     * Store an ActionsViewerAction for each action ID
     */
    private actionsMap: Map<string, ActionsViewerAction> = new Map();

    /**
     * @param id the ID of the action to view
     */
    constructor(
        id: string,
        refresh: boolean,
        renderText: boolean,
        exit: Function = () => process.exit()
    ) {
        this.top = id;
        // if output is not a terminal, always use Text rendered
        this.renderer = new (
            renderText || !process.stdout.isTTY
                ? ActionsTextRenderer
                : ActionsBlessedRenderer
        )(this.top, refresh, exit);
    }

    /**
     * Process given actions and update the view
     * @param actions
     */
    setActions(actions: ActionSchemaInterface[]) {
        this.formatActions(actions);
        this.renderer.setActions(this.actionsMap);
    }

    private appendLogsLock: Promise<void> = Promise.resolve();

    /**
     * Process given logs and update the view.
     * Only applies to the blessed renderer
     * @param logs
     */
    appendLogs(logs: string[]) {
        this.appendLogsLock = this.appendLogsLock.then(() =>
            this.appendLockInternal(logs)
        );
    }

    private async appendLockInternal(logs: string[]) {
        if (this.renderer instanceof ActionsBlessedRenderer) {
            this.renderer.appendLogs(this.formatLogs(logs));
        }
    }

    private formatActions(actions: ActionSchemaInterface[]) {
        actions.forEach((action) => {
            this.actionsMap.set(action.id, {
                ref: action.definitionFrom?.workflow.marker ?? action.actionRef,
                id: action.id,
                state: action.state,
                step: action.workflowStep,
                result: action.result,
                arguments: action.argument,
            });

            // if action is part of a workflow
            if (action.workflowId) {
                if (!this.actionsToWorkflowMap.has(action.workflowId))
                    this.actionsToWorkflowMap.set(action.workflowId, []);

                if (
                    !this.actionsToWorkflowMap
                        .get(action.workflowId)
                        ?.includes(action.id)
                )
                    this.actionsToWorkflowMap
                        .get(action.workflowId)
                        ?.push(action.id);
            }
        });

        for (const [id, actions] of this.actionsToWorkflowMap.entries()) {
            if (!this.actionsMap.has(id)) {
                continue;
            }
            (this.actionsMap.get(id) as ActionsViewerAction).children =
                actions.sort(
                    (a, b) =>
                        (this.actionsMap.get(a)?.step ?? 0) -
                        (this.actionsMap.get(b)?.step ?? 0)
                );
        }
    }

    private formatLogs(logs: string[]) {
        return logs.map((log) => {
            try {
                return JSON.parse(log);
            } catch (error) {
                return { message: log };
            }
        });
    }

    destroy() {
        return this.renderer.destroy();
    }
}
