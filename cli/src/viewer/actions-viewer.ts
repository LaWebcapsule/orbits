import { ActionSchemaInterface, LogSchemaInterface } from '@orbi-ts/core';

import { exitCodes } from '../constants.js';
import { ActionsBlessedRenderer } from './blessed-renderer.js';
import { ActionsTextRenderer } from './text-renderer.js';
import { ActionsRenderer, ActionsViewerAction } from './utils.js';

export class ActionsViewer {
    private top: string;

    private renderer: ActionsRenderer;

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
        shouldRefresh: boolean,
        renderText: boolean,
        withLogs: boolean,
        exit: Function = () => {
            process.exit(exitCodes.SUCCESS);
        }
    ) {
        this.top = id;
        // if output is not a terminal, always use Text rendered
        this.renderer = new (
            renderText || !process.stdout.isTTY
                ? ActionsTextRenderer
                : ActionsBlessedRenderer
        )(this.top, shouldRefresh, exit);
    }

    setTopAction(actionId: string) {
        this.renderer.setTopAction(actionId);
    }

    highlightAction(actionId: string) {
        this.renderer.highlightAction(actionId);
    }

    refresh() {
        this.renderer.refresh();
    }

    /**
     * Process given actions and update the view
     * @param actions
     */
    setActions(actions: ActionSchemaInterface[]) {
        this.formatActions(actions);
        this.renderer.setActions(this.actionsMap);
    }

    setLogs(logs: LogSchemaInterface[]) {
        if (this.renderer instanceof ActionsBlessedRenderer) {
            this.renderer.setLogs(this.formatLogs(logs));
        }
    }

    private formatActions(actions: ActionSchemaInterface[]) {
        actions.forEach((action) => {
            this.actionsMap.set(action.id, {
                ref: action.workflowRef ?? action.actionRef,
                id: action.id,
                state: action.state,
                bag: action.bag,
                result: action.result,
                createdAt: action.createdAt,
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
                        (
                            this.actionsMap.get(a)?.createdAt ?? new Date()
                        ).getTime() -
                        (
                            this.actionsMap.get(b)?.createdAt ?? new Date()
                        ).getTime()
                );
        }
    }

    private formatLogs(logs: LogSchemaInterface[]) {
        return logs.map((log) => ({
            timestamp: log.timestamp?.toLocaleString(),
            level: log.level,
            actionId: log.actionId,
            actionRef: log.actionRef,
            message: log.message,
        }));
    }

    destroy() {
        return this.renderer.destroy();
    }
}
