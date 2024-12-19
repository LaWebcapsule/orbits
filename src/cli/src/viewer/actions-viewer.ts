import { ActionSchemaInterface, ActionState } from '@wbce/orbits-core';

import { ActionsBlessedRenderer } from './blessed-renderer.js';
import { ActionsTextRenderer } from './text-renderer.js';
import { ActionsViewerAction } from './constants.js';

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

    destroy() {
        return this.renderer.destroy();
    }
}
