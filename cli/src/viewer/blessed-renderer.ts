import blessed, { Widgets } from 'blessed';
import colors from 'colors';
import { copy } from 'copy-paste';

import { ActionState } from '@orbi-ts/core';
import { utils } from '@orbi-ts/services';

import { INPUTS_KEY, InputsDescriptionType } from '@orbi-ts/fuel';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import {
    ACTION_STATE_FORMAT,
    generatePrettyActionState,
    highlight,
    HIGHLIGHT_CLOSE,
    HIGHLIGHT_OPEN,
    type ActionsRenderer,
    type ActionsViewerAction,
} from './utils.js';

const SCROLLBAR_STYLE = { style: { bg: 'yellow' }, track: 'grey' };

const listenToChildScroll = (
    child: Widgets.Node,
    target: Widgets.BoxElement,
    callback: () => void
) => {
    const handleScroll = (direction: -1 | 1) => {
        const childBase = target.childBase;
        target.scroll(direction);
        // only call callback if there has been some change after scrolling
        if (childBase != target.childBase) callback();
    };
    child.on('wheeldown', () => handleScroll(1));
    child.on('wheelup', () => handleScroll(-1));
};

const listenToChildKey = (
    child: Widgets.Node,
    target: Widgets.BoxElement,
    callback: (target: Widgets.BoxElement, key: string) => void
) => {
    ['up', 'down', 'left', 'right'].forEach((key) => {
        child.on(`key ${key}`, () => {
            callback(target, key);
        });
    });
};

const keyScroll = (
    elt: blessed.Widgets.BoxElement,
    direction: string,
    xMax: number
): boolean => {
    const childBase = elt.childBase;
    switch (direction) {
        case 'up':
            elt.scroll(-1);
            break;
        case 'down':
            elt.scroll(1);
            break;
        case 'left':
            if ((elt.left as number) < 0) {
                (elt.left as number)++;
                return true;
            }
            break;
        case 'right':
            if ((elt.width as number) < xMax) {
                (elt.left as number)--;
                return true;
            }
    }
    return childBase !== elt.childBase;
};

const clampWidth = (
    parentWidth: number,
    minWidth: number,
    percentage: number,
    padding: number = 0
) => {
    return Math.min(
        parentWidth - padding * 2,
        Math.max(Math.ceil(percentage * parentWidth), minWidth)
    );
};

class BoxesWithLoader {
    private FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    private PLACEHOLDER = '{{LOADER}}';
    private INTERVAL = 80;
    private currentFrame: number = 0;
    private interval!: NodeJS.Timeout;
    private lastUpdateTime: number = Date.now();

    private boxes: Map<
        string,
        {
            box: blessed.Widgets.BoxElement;
            baseContent: string;
        }
    > = new Map();

    /**
     * Get placeholder used for loader.
     * Placeholder will be replaced by the actual frames.
     */
    get placeholder(): string {
        return this.PLACEHOLDER;
    }

    /**
     * Set the boxes that contain loaders.
     *
     * @param boxes
     */
    setBoxes(boxes: Map<string, blessed.Widgets.BoxElement>) {
        boxes.forEach((box) => {
            // remove box if no more loader
            if (
                this.boxes.has(box.name) &&
                !box.getContent().includes(this.PLACEHOLDER)
            ) {
                this.boxes.delete(box.name);
            } else if (box.getContent().includes(this.PLACEHOLDER)) {
                this.boxes.set(box.name, {
                    box,
                    baseContent: box.getContent(),
                });
            }
        });
    }

    /**
     * Render the boxes with placeholders replaced
     * with actual loading animation.
     *
     * @param output function to output
     */
    render(output: Function) {
        clearInterval(this.interval);

        let contentChanged = false;

        this.boxes.forEach(({ box, baseContent }) => {
            if (baseContent.includes(this.PLACEHOLDER)) {
                contentChanged = true;

                box.setContent(
                    baseContent.replaceAll(
                        this.PLACEHOLDER,
                        this.FRAMES[this.currentFrame]
                    )
                );
            }
        });

        if (!contentChanged) return;

        const now = Date.now();
        if (this.lastUpdateTime && now - this.lastUpdateTime > this.INTERVAL) {
            this.lastUpdateTime = now;
            this.currentFrame++;

            if (this.currentFrame > this.FRAMES.length - 1)
                this.currentFrame = 0;

            output();
        }

        this.interval = setInterval(() => this.render(output), this.INTERVAL);
    }
}

/**
 * Box with a label.
 * By default labels are messed up on scroll.
 *
 * Layout:
 * ```
 * ┌─ <label> ───────────┐
 * │  ....               │
 * └─────────────────────┘
 * ```
 */
class BoxWithLabel extends (blessed.box as unknown as {
    new (opts: Widgets.BoxOptions): Widgets.BoxElement;
}) {
    private label: Widgets.TextElement;

    constructor(options: Widgets.BoxOptions) {
        const { label, parent, top, ...otherOptions } = options;
        super({
            parent,
            top,
            ...otherOptions,
        });
        this.label = blessed.box({
            parent,
            top,
            left: 1,
            shrink: true,
            content: ` ${colors.bold.underline(label ?? '')} `,
        });
    }

    setTop(top: Widgets.Types.TTopLeft) {
        this.top = top;
        this.label.top = top;
    }
}

/**
 * Box that contains actions info.
 *
 * Layout:
 * ```
 * ┌─────────────────────────┐
 * │ <ref>           |state| │
 * │                         │
 * │ |id ------------------| │
 * │ |arguments -----------| │
 * │ |bag -----------------| │
 * │ |result --------------| │
 * └─────────────────────────┘
 * ```
 */
class InfoBox extends (blessed.box as unknown as {
    new (opts: Widgets.BoxOptions): Widgets.BoxElement;
}) {
    private actionId?: string;
    private actions: Map<string, ActionsViewerAction> = new Map();

    private ui: {
        container: Widgets.BoxElement;
        state: Widgets.BoxElement;
        ref: Widgets.BoxElement;
        id: BoxWithLabel;
        args: BoxWithLabel;
        bag: BoxWithLabel;
        result: BoxWithLabel;
        inputsBox: InputsBox;
        inputsButton: Widgets.ButtonElement;
    };

    constructor(
        options: Widgets.BoxOptions,
        render: (args?: any) => void,
        alert: (msg: string, pos: { x: number; y: number }) => void,
        setInputs: (
            actionId: string,
            inputs: { [key: string]: any }
        ) => Promise<void>
    ) {
        const { label, parent, top, ...otherOptions } = options;
        super({
            parent,
            top,
            ...otherOptions,
        });
        const container = blessed.box({
            parent: this,
            mouse: true,
            keys: true,
            alwaysScroll: true,
            scrollable: true,
            scrollbar: SCROLLBAR_STYLE,
            padding: { left: 1 },
        });
        const state = blessed.box({
            parent: container,
            top: 0,
            right: 2,
            border: 'line',
            style: { bold: true },
            shrink: true,
        });
        const inputsBox = new InputsBox(
            {
                parent: this,
                top: 0,
                left: 0,
                width: '100%-2',
                height: '100%-2',
                hidden: true,
                border: { type: 'line' },
                style: { border: { fg: 'magenta' } },
                shrink: true,
            },
            render,
            () => {
                inputsBox.toggle();
                render();
            },
            async (event) => {
                await setInputs(this.name, event.inputs);
                alert('Inputs set!', { x: event.x + 3, y: event.y + 1 });
            }
        );
        const inputsButton = blessed.button({
            parent: container,
            top: 0,
            right:
                (state.right as number) +
                ACTION_STATE_FORMAT.get(ActionState.IN_PROGRESS)!.full.length +
                2,
            content: 'Add inputs',
            hidden: true,
            border: 'line',
            style: { bold: true },
            shrink: true,
        });
        inputsButton.on('click', () => {
            if (!inputsBox.visible) {
                inputsBox.toggle();
                render();
            }
        });
        const ref = blessed.box({
            top: 1,
            left: 1,
            parent: container,
            style: { fg: 'cyan', bold: true, underline: true },
            shrink: true,
        });

        const boxesOptions = {
            parent: container,
            padding: 1,
            border: { type: 'line' as 'line' },
            width: '100%-2',
            shrink: true,
            style: { border: { fg: 'grey' }, fg: 'grey' },
        };
        const id = new BoxWithLabel({ ...boxesOptions, label: 'ID', top: 3 });
        const args = new BoxWithLabel({
            ...boxesOptions,
            label: 'Arguments',
            top: 6,
        });
        const bag = new BoxWithLabel({
            ...boxesOptions,
            label: 'Bag',
            top: 10,
        });
        const result = new BoxWithLabel({
            ...boxesOptions,
            label: 'Result',
            top: 14,
        });

        this.ui = {
            container,
            state,
            ref,
            id,
            args,
            bag,
            result,
            inputsBox,
            inputsButton,
        };

        // Copy content on click
        Object.entries(this.ui).forEach(([key, box]) => {
            if (
                key === 'container' ||
                key === 'inputsButton' ||
                key === 'inputsBox'
            )
                return;
            box.on('click', (event) => {
                copy(box.getContent());
                alert('Copied!', { x: event.x + 3, y: event.y + 1 });
            });
        });

        // needed so that scrolling on children
        // is registered in the parent
        this.ui.container.children.forEach((child) => {
            listenToChildScroll(child, this.ui.container, render);
            listenToChildKey(
                child,
                this.ui.container,
                (target: Widgets.BoxElement, key: string) => {
                    if (keyScroll(target, key, 0)) render();
                }
            );
        });
    }

    setActions(actions: Map<string, ActionsViewerAction>) {
        this.actions = actions;
        this.refresh();
    }

    setActionId(actionId: string) {
        this.actionId = actionId;
        // make sure inputs button and box are hidden
        this.ui.inputsButton.hide();
        this.ui.inputsBox.hide();
        this.refresh();
    }

    refresh() {
        if (!this.actionId) return;

        const action = this.actions.get(this.actionId)!;

        this.name = this.actionId;

        const { color, full } = ACTION_STATE_FORMAT.get(action.state)!;
        this.ui.state.setContent(full);
        this.ui.state.style.fg = color;
        this.ui.state.style.border.fg = color;

        if (
            action.arguments?.[INPUTS_KEY] &&
            action.state === ActionState.IN_PROGRESS
        ) {
            this.ui.inputsBox.setInputs(action);
            this.ui.inputsButton.show();
        } else {
            this.ui.inputsButton.hide();
        }

        this.ui.ref.setContent(action.ref);
        this.ui.id.setContent(action.id);
        [
            { type: 'arguments', elt: this.ui.args, prev: this.ui.id },
            { type: 'bag', elt: this.ui.bag, prev: this.ui.args },
            { type: 'result', elt: this.ui.result, prev: this.ui.bag },
        ].forEach(({ type, elt, prev }) => {
            elt.setTop((prev.top as number) + prev.getScreenLines().length + 5);
            elt.setContent(
                JSON.stringify(
                    action[type as keyof ActionsViewerAction],
                    undefined,
                    '\t'
                )
            );
        });
    }
}

class LogsBox extends (blessed.box as unknown as {
    new (opts: Widgets.BoxOptions): Widgets.BoxElement;
}) {
    private actionId?: string;

    private logs: {
        level: string;
        message: string;
        actionId?: string;
        actionRef?: string;
        timestamp?: string;
    }[] = [];

    private ui: {
        container: Widgets.BoxElement;
    };

    private selection: {
        content: string[];
        origin?: { x: number; y: number };
        start?: { x: number; y: number };
        end?: { x: number; y: number };
        direction?: number;
    } = {
        content: [],
    };

    private renderFn: (args?: any) => void;

    constructor(
        options: Widgets.BoxOptions,
        render: (args?: any) => void,
        alert: (msg: string, pos: { x: number; y: number }) => void
    ) {
        const { label, parent, top, ...otherOptions } = options;
        super({
            parent,
            top,
            ...otherOptions,
        });

        this.renderFn = render;

        this.ui = {
            container: blessed.box({
                parent: this,
                mouse: true,
                keys: true,
                alwaysScroll: true,
                scrollable: true,
                scrollbar: SCROLLBAR_STYLE,
                padding: { left: 1 },
            }),
        };

        // start selection
        this.ui.container.on('mousedown', (data) => {
            const x = Math.floor(data.x - (this.ui.container.aleft as number));
            const y = Math.floor(data.y - (this.ui.container.atop as number));

            if (!this.selection.origin) {
                this.selection.origin = { x, y };
                return;
            }

            const prevDirection = this.selection.direction;

            const xDir = Math.sign(x - this.selection.origin.x);
            const yDir = Math.sign(y - this.selection.origin.y);

            this.selection.direction = yDir === 0 ? xDir : yDir;
            if (this.selection.direction != prevDirection) {
                if (this.selection.direction < 0)
                    this.selection.end = this.selection.origin;
                else this.selection.start = this.selection.origin;
            }

            if (this.selection.direction < 0) this.selection.start = { x, y };
            else this.selection.end = { x, y };

            this.refreshSelection();
        });

        // end selection and copy
        this.ui.container.on('mouseup', async (event) => {
            if (this.selection.start && this.selection.end) {
                copy(this.selection.content.join('\n'));
                alert('Copied!', {
                    x: event.x + this.selection.direction! * 3,
                    y: event.y + this.selection.direction! * 1,
                });
                // reset selection
                this.selection = { content: [] };
                this.refreshSelection(true);
            }
        });
    }

    setActionId(actionId?: string) {
        this.actionId = actionId;
        this.refresh();
    }

    setLogs(
        logs: {
            level: string;
            message: string;
            actionId?: string;
            actionRef?: string;
            timestamp?: string;
        }[]
    ) {
        this.logs.push(...logs);
        this.refresh();
    }

    refresh() {
        const filteredLogs = this.logs.filter(
            ({ actionId }) => !this.actionId || actionId === this.actionId
        );

        this.ui.container.content = filteredLogs
            .map((log) => {
                let color;
                switch (log.level) {
                    case 'error':
                        color = colors.red;
                        break;
                    case 'warn':
                        color = colors.yellow;
                        break;
                    case 'info':
                        color = colors.white;
                        break;
                    default:
                        color = colors.grey;
                }
                if (log.timestamp && log.actionRef && log.actionId)
                    return color(
                        `${log.timestamp} - ${colors.bold(log.actionRef)} (${log.actionId}): ${log.message}`
                    );

                if (log.timestamp)
                    return color(`${log.timestamp} - ${log.message}`);

                return color(log.message);
            })
            .join('\n');

        if (this.visible) {
            // auto scroll if scroll was at the bottom
            if (this.ui.container.getScrollPerc() === 100)
                this.ui.container.setScrollPerc(100);
        }

        this.refreshSelection();
    }

    private refreshSelection(reset: boolean = false) {
        const visibleLines = this.ui.container.getScreenLines();
        if (!visibleLines.length || (!this.selection.origin && !reset)) return;

        const totalPanelHeight = this.ui.container.getScrollHeight();
        const visiblePanelHeight = this.ui.container.height as number;
        const scrollOffset = Math.round(
            (1 / 100) *
                (totalPanelHeight - visiblePanelHeight) *
                this.ui.container.getScrollPerc()
        );

        this.selection.content = [];
        const highlightedContent = visibleLines.map((line, i) => {
            const idx = i - scrollOffset;
            // strip existing tags
            line = line
                .replace(HIGHLIGHT_OPEN, '')
                .replace(HIGHLIGHT_CLOSE, ''); // at most only one occurence per line
            if (!this.selection.start || !this.selection.end) return line;
            if (idx < this.selection.start.y || idx > this.selection.end.y)
                return line;
            let startCol = 0;
            let endCol = stringWidth(line);
            if (idx === this.selection.start.y)
                startCol = this.selection.start.x;
            if (idx === this.selection.end.y) endCol = this.selection.end.x;
            this.selection.content.push(
                stripAnsi(line).slice(startCol, endCol)
            );
            return highlight(line, startCol, endCol);
        });
        this.ui.container.setContent(highlightedContent.join('\n'));
        this.renderFn();
    }
}

/**
 * ```
 * ┌─────────────────────────┐
 * │                 |CLOSE| │
 * │                         │
 * │ ┌─ [key1] ────────────┐ │
 * │ │  ....               │ │
 * │ └─────────────────────┘ │
 * │ ┌─ [key2] ────────────┐ │
 * │ │  ....               │ │
 * │ └─────────────────────┘ │
 * │ ....                    │
 * │                         │
 * │ |SET|                   │
 * └─────────────────────────┘
 * ```
 */
class InputsBox extends (blessed.box as unknown as {
    new (opts: Widgets.BoxOptions): Widgets.BoxElement;
}) {
    private ui: {
        inputsContainer: Widgets.BoxElement;
        inputs: Widgets.BoxElement[];
        dropdown: Widgets.ListElement;
        closeButton: Widgets.ButtonElement;
        submitButton: Widgets.ButtonElement;
    };

    private focusedInput: Widgets.TextboxElement | null = null;

    private action: ActionsViewerAction | null = null;

    private defaultInputs: {
        [key: string]: any;
    } = {};

    private inputs: {
        [key: string]: any;
    } = {};

    private inputsMap: {
        [key: string]: Widgets.TextboxElement;
    } = {};

    private renderFn: (args?: any) => void;

    private INPUT_FOCUSED_COLOR = 'cyan';
    private INPUT_DEFAULT_COLOR = 'grey';

    alignDropdown() {
        if (!this.focusedInput) return;
        const totalContainerHeight = this.ui.inputsContainer.getScrollHeight();
        const visibleContainerHeight = this.ui.inputsContainer.height as number;
        const scrollOffset =
            (1 / 100) *
            (totalContainerHeight - visibleContainerHeight) *
            this.ui.inputsContainer.getScrollPerc();
        this.ui.dropdown.top =
            (this.focusedInput.top as number) - scrollOffset + 2;
    }

    constructor(
        options: Widgets.BoxOptions,
        render: (args?: any) => void,
        onClose: () => void,
        onSubmit: (event: any) => void
    ) {
        const { label, parent, top, ...otherOptions } = options;
        super({
            parent,
            top,
            ...otherOptions,
        });

        this.renderFn = render;

        const inputsContainer = blessed.box({
            parent: this,
            top: 1,
            left: 0,
            bottom: 4,
            right: 0,
            scrollable: true,
            alwaysScroll: true,
            mouse: true,
            focusable: true,
            keys: true,
            scrollbar: SCROLLBAR_STYLE,
        });

        const dropdown = blessed.list({
            name: 'dropdown',
            parent: this,
            hidden: true,
            keys: true,
            mouse: true,
            style: { selected: { bg: 'magenta' }, bg: 'grey' },
        });

        dropdown.on('select', (item, idx) => {
            if (!this.focusedInput) return;

            const key = this.focusedInput.get('key', '');
            const value = this.focusedInput.get('values', [])[idx];

            this.inputs[key] = value;
            this.focusedInput.setValue(`${value}`);

            // remove border that was added on focus
            // cannot use blur as the input loses focus when the dropdown has it
            this.focusedInput.style.border.fg = this.INPUT_DEFAULT_COLOR;

            this.focus(); // blur everything
            dropdown.hide();
            render();
        });

        inputsContainer.on('scroll', () => {
            if (dropdown.visible) {
                this.alignDropdown();
                render();
            }
        });

        const closeButton = blessed.button({
            parent: this,
            top: 0,
            right: 1,
            content: 'Close',
            underline: 'grey',
            shrink: true,
            mouse: true,
        });

        closeButton.on('click', onClose);

        const submitButton = blessed.button({
            parent: this,
            left: 1,
            bottom: 0,
            border: 'line',
            keys: true,
            mouse: true,
            focusable: true,
            content: 'Add inputs',
            shrink: true,
        });

        submitButton.setIndex(0);

        submitButton.on('click', (event: any) => {
            onSubmit({ ...event, inputs: this.inputs });
        });

        this.ui = {
            inputsContainer,
            dropdown,
            inputs: [],
            closeButton,
            submitButton,
        };
    }

    setInputs(action: ActionsViewerAction) {
        const inputsDesc = Object.entries(
            action.arguments[INPUTS_KEY] as InputsDescriptionType
        ).filter(([, desc]) => desc.type === 'bag');

        const defaultChanged = inputsDesc.some(
            ([key, _]) =>
                action.bag[INPUTS_KEY][key] !== this.defaultInputs[key]
        );

        // if already set, skip
        if (this.action?.id === action.id && !defaultChanged) return;

        let refresh = false;
        // clear if it a new action
        if (this.action?.id !== action.id) {
            // clear children and reset scroll
            for (const child of [...this.ui.inputsContainer.children])
                child.destroy();
            this.ui.inputsContainer.setScroll(0);
            this.inputs = {};
            this.inputsMap = {};
            this.action = action;
        } else {
            refresh = true;
        }

        if (inputsDesc.length === 0) {
            blessed.box({
                parent: this.ui.inputsContainer,
                top: 1,
                left: 1,
                right: 1,
                content: 'No inputs',
            });
            return;
        }

        inputsDesc.forEach(([key, { options }], index) => {
            // refresh only
            if (refresh) {
                const input = this.inputsMap[key];
                const value = action.bag[INPUTS_KEY]?.[key];
                if (value != null) {
                    this.inputs[key] = value;
                    this.defaultInputs[key] = value;
                    input.setValue(`${value}`);
                }
                return;
            }

            const hasOptions = Array.isArray(options);

            const input: blessed.Widgets.TextboxElement = blessed.textbox({
                parent: this.ui.inputsContainer,
                top: 1 + index * 4,
                left: 1,
                right: 1,
                height: 3,
                border: 'line',
                keys: true,
                mouse: true,
                scrollable: false,
                shrink: true,
                style: { border: { fg: this.INPUT_DEFAULT_COLOR } },
            });

            this.inputsMap[key] = input;

            blessed.text({
                parent: this.ui.inputsContainer,
                top: 1 + index * 4,
                left: 2,
                height: 1,
                content: ` ${key} `,
            });

            const value = action.bag[INPUTS_KEY]?.[key];
            if (value != null) {
                this.inputs[key] = value;
                this.defaultInputs[key] = value;
                input.setValue(`${value}`);
            } else if (this.inputs[key]) {
                input.setValue(`${this.inputs[key]}`);
            }

            input.set('key', key);
            input.set('values', options ?? []);

            listenToChildScroll(input, this.ui.inputsContainer, () => {
                this.renderFn();
            });

            if (hasOptions) {
                input.on('focus', () => {
                    input.style.border.fg = this.INPUT_FOCUSED_COLOR;
                    this.focusedInput = input;
                    this.ui.dropdown.setItems(options.map(utils.wrapInQuotes));
                    this.ui.dropdown.left = (input.left as number) + 1;
                    this.ui.dropdown.width = (input.width as number) - 2; // 2 for borders
                    this.ui.dropdown.height = Math.min(options.length, 5);
                    // reset scroll and select
                    this.alignDropdown();
                    this.ui.dropdown.resetScroll();
                    this.ui.dropdown.select(
                        options.findIndex((opt) => opt === this.inputs[key])
                    );
                    this.ui.dropdown.focus();
                    this.ui.dropdown.show();
                    this.renderFn();
                });
            } else {
                input.on('focus', () => {
                    input.style.border.fg = this.INPUT_FOCUSED_COLOR;
                    input.readInput();
                });
                input.on('blur', () => {
                    input.style.border.fg = this.INPUT_DEFAULT_COLOR;
                    const value = input.getValue();
                    if (value !== '') this.inputs[key] = value;
                    this.screen.program.hideCursor();
                });
            }
        });
    }
}

export class ActionsBlessedRenderer implements ActionsRenderer {
    private screen!: Widgets.Screen;

    private loader = new BoxesWithLoader();

    /**
     * Main box that contains the graph of actions.
     */
    private mainBox!: Widgets.BoxElement;

    /**
     * Box that contains actions info.
     */
    private infoBox!: InfoBox;
    /**
     * Box that contains logs.
     */
    private logsBox!: LogsBox;
    private logsButton!: Widgets.TextElement;

    /**
     * Box to display alerts.
     */
    private alertBox!: Widgets.TextElement;

    private borders: Map<string, Widgets.BoxElement> = new Map();

    /**
     * Boxes for actions and links between them.
     */
    private boxes: Map<string, Widgets.BoxElement> = new Map();

    private actions: Map<string, ActionsViewerAction> = new Map();

    /**
     * X value of right side of rightmost box.
     * Allows to limit horizontal scroll.
     */
    private xMax: number = 0;

    /**
     * ID of the action at the top of the view.
     */
    topAction: string;

    /**
     * ID of the highlighted action.
     */
    highlightedAction?: string;

    /**
     * Whether display is to be refreshed.
     * If not, do not display loaders.
     */
    shouldRefresh: boolean;

    exit: Function;

    /**
     * whether the renderer can be refreshed.
     */
    active: boolean = true;

    /**
     * @param actionId Top action to view.
     */
    constructor(
        actionId: string,
        shouldRefresh: boolean = true,
        exit: Function = () => process.exit(),
        setInputs: (
            actionId: string,
            inputs: { [key: string]: any }
        ) => Promise<void>
    ) {
        this.topAction = actionId;
        this.shouldRefresh = shouldRefresh;
        this.exit = exit;
        this.setUp(setInputs);
    }

    setTopAction(actionId: string) {
        this.topAction = actionId;
    }

    highlightAction(actionId: string) {
        this.highlightedAction = actionId;
    }

    setActions(actions: Map<string, ActionsViewerAction>) {
        this.actions = actions;
        this.infoBox.setActions(actions);
    }

    setLogs(
        logs: {
            level: string;
            message: string;
            actionId?: string;
            actionRef?: string;
            timestamp?: string;
        }[]
    ) {
        this.logsBox.setLogs(logs);
    }

    renders = 0;

    private render(from: string) {
        this.debug(`${++this.renders} — render from ${from}`);
        this.borders.forEach((border) => border.setFront());

        if (this.shouldRefresh)
            this.loader.render(() => {
                this.screen.render();
            });
        else this.screen.render();
    }

    debug(...msg: any) {
        this.screen.debug(`${Date.now()}: ${msg}`);
    }

    /**
     * Set borders boxes content and position.
     */
    private setBorders() {
        const screenHeight = this.screen.height as number;
        const screenWidth = this.screen.width as number;

        this.borders.get('left')!.setContent('│\n'.repeat(screenHeight));
        this.borders.get('right')!.setContent('│\n'.repeat(screenHeight));
        this.borders.get('top')!.setContent(`╭${'─'.repeat(screenWidth - 2)}╮`);
        this.borders.get('bottom')!.top = screenHeight - 1;
        this.borders
            .get('bottom')!
            .setContent(`╰${'─'.repeat(screenWidth - 2)}╯`);
    }

    /**
     * Setup Screen and boxes.
     */
    private setUp(
        setInputs: (
            actionId: string,
            inputs: { [key: string]: any }
        ) => Promise<void>
    ) {
        this.screen = blessed.screen({
            fastCSR: true,
            debug: true, // use F12 to print debug messages
            border: { type: 'line' },
            fullUnicode: true,
            warnings: false,
        });

        this.screen.title = 'Orbits Viewer';

        // screen borders

        this.borders.set(
            'left',
            blessed.box({ parent: this.screen, height: '100%', width: 1 })
        );
        this.borders.set(
            'right',
            blessed.box({
                parent: this.screen,
                right: 0,
                height: '100%',
                width: 1,
            })
        );
        this.borders.set(
            'top',
            blessed.box({ parent: this.screen, width: '100%', height: 1 })
        );

        this.borders.set(
            'bottom',
            blessed.box({
                parent: this.screen,
                width: '100%',
                height: 1,
            })
        );

        this.setBorders();

        this.screen.on('resize', () => {
            this.setBorders();

            this.infoBox.width = this.clampWidth(70, 0.5, 2);
            this.logsBox.width = this.clampWidth(70, 0.5, 2);
        });

        this.mainBox = blessed.box({
            left: 2,
            top: 2,
            right: 1,
            bottom: 1,
            parent: this.screen,
            content: '',
            keys: true,
            mouse: true,
            alwaysScroll: true,
            scrollable: true,
            scrollbar: SCROLLBAR_STYLE,
        });

        // info box

        this.infoBox = new InfoBox(
            {
                parent: this.screen,
                top: 1,
                right: 2,
                bottom: 1,
                width: this.clampWidth(70, 0.5, 2),
                hidden: true,
                border: { type: 'line' },
                style: { border: { fg: 'magenta' } },
                shrink: true,
            },
            this.render.bind(this),
            this.alert.bind(this),
            setInputs
        );

        // Alert box

        this.alertBox = blessed.text({
            parent: this.screen,
            left: 'center',
            hidden: true,
            style: {
                fg: 'black',
                bg: 'white',
            },
        });

        // Logs box

        this.logsBox = new LogsBox(
            {
                parent: this.screen,
                top: 1,
                right: 2,
                bottom: 1,
                width: this.clampWidth(70, 0.5, 2),
                hidden: true,
                border: { type: 'line' },
                style: { border: { fg: 'magenta' } },
                shrink: true,
            },
            this.render.bind(this),
            this.alert.bind(this)
        );
        this.logsButton = blessed.text({
            parent: this.screen,
            right: 1,
            bottom: 1,
            content: ` ${colors.underline('Show logs')} `,
        });
        this.logsButton.on('click', () => this.toggleLogs());

        // Quit on Escape, q, or Control-C.
        this.screen.key(['escape', 'q', 'C-c'], () => {
            this.destroy();
            return this.exit();
        });

        ['left', 'right'].forEach((direction) => {
            this.mainBox.on(`key ${direction}`, () => {
                if (keyScroll(this.mainBox, direction, this.xMax))
                    this.render('from key scroll');
            });
        });

        // hide infoBox and logsBox on click outside
        this.mainBox.on('click', () => {
            if (this.infoBox.visible) this.toggleInfo();
            if (this.logsBox.visible) this.toggleLogs();
            this.logsBox.setActionId(); // display all logs
        });
    }

    private alert(msg: string, pos: { x: number; y: number }) {
        this.alertBox.left = pos.x;
        this.alertBox.top = pos.y;

        this.alertBox.setContent(msg);
        if (!this.alertBox.visible) this.alertBox.toggle();

        this.alertBox.setFront();
        this.render('alert');

        // toggle off after 2s
        setTimeout(() => {
            if (this.alertBox.visible) this.alertBox.toggle();
            this.alertBox.setContent('');
            this.render('alert interval');
        }, 2000);
    }

    /**
     * Generate a text box for the given action.
     * If a box already exists, update its content.
     * @param action the action to generate a box for
     * @param position position of the box as `{ x, y }`
     * @returns
     */
    private generateActionBox(
        action: ActionsViewerAction,
        { x, y }: { x: number; y: number }
    ) {
        let actionBox: blessed.Widgets.TextElement;
        if (this.boxes.has(action.id)) {
            actionBox = this.boxes.get(action.id)!;
        } else {
            actionBox = blessed.text({
                name: action.id,
                title: action.ref,
                shrink: false,
                left: x,
                top: y,
                width: ` ${action.ref} X `.length + 2,
                border: { type: 'line' },
                style: { border: { fg: 'grey' } },
            });
            this.mainBox.append(actionBox);
            listenToChildScroll(actionBox, this.mainBox, () =>
                this.render('from action box scroll')
            );
            listenToChildKey(
                actionBox,
                this.mainBox,
                (target: Widgets.BoxElement, key: string) => {
                    if (keyScroll(target, key, 0))
                        this.render('from action box key scroll');
                }
            );
            this.boxes.set(action.id, actionBox as Widgets.BoxElement);

            actionBox.on('click', () => {
                if (!this.infoBox.visible || this.infoBox.name == action.id)
                    this.toggleInfo(false);
                this.infoBox.setActionId(action.id);
                this.logsBox.setActionId(action.id);
                this.render('actionBox ' + action.id);
            });
        }

        // position may change after first render as top action can change
        actionBox.left = x;
        actionBox.top = y;

        if (action.id === this.highlightedAction)
            actionBox.style.border.fg = 'white';
        else actionBox.style.border.fg = 'grey';

        actionBox.setContent(
            ` ${colors.bold(action.ref)} ${generatePrettyActionState(action.state, this.shouldRefresh, this.loader)}`
        );

        return actionBox;
    }

    /**
     * Generate the line connecting a child to its parent
     * or its previous sibling
     *
     * Line is filled according to truth table below:
     * ```
     *           │ isLast  │ !isLast │
     *  ─────────┼─────────┼─────────┼─
     *  isFirst  │ '─────' │ '──┬──' │
     *  ─────────┼─────────┼─────────┼─
     *  !isFirst │ '  ╰──' │ '  ├──' │
     *  ─────────┼─────────┼─────────┼─
     * ```
     *
     * If the child is not first then lines with '  │  '
     * will be generated to connect to previous child
     *
     * @param isFirst whether child is first
     * @param isLast whether child is last
     * @param dY number of lines to previous child
     * @returns the connecting line between child and prev child or parent
     */
    private generateChildLink(
        isFirst: boolean,
        isLast: boolean,
        dY: number
    ): string[] {
        return (isFirst || dY <= 0 ? [] : Array(dY).fill('  │  ')).concat(
            isFirst ? (isLast ? '─────' : '──┬──') : isLast ? '  ╰──' : '  ├──'
        );
    }

    /**
     * Generate boxes for the actions.
     */
    private generateBoxes(
        actionId: string = this.topAction,
        position: { x: number; y: number } = { x: 1, y: 0 }
    ): number {
        const dX = 5;
        const dY = 3;

        const action = this.actions.get(actionId);

        let { x, y } = position;

        if (!action) return y;

        const box = this.generateActionBox(action, { x, y });

        if (x > this.xMax) this.xMax = x + (box.width as number);

        if (action.children) {
            const boxId = action.id + '-line';
            let lineBox: blessed.Widgets.BoxElement;
            if (!this.boxes.has(boxId)) {
                lineBox = blessed.box({
                    name: action.id + '-line',
                    shrink: true,
                    left: x + (box.width as number),
                    top: y + 1,
                    width: 5,
                });
                lineBox.setBack();
                this.mainBox.append(lineBox);
                this.boxes.set(boxId, lineBox);
            } else {
                lineBox = this.boxes.get(boxId)!;
                lineBox.setContent('');
            }

            // position may change after first render as top action can change
            lineBox.left = x + (box.width as number);
            lineBox.top = y + 1;

            let prevY = y;
            action.children.forEach((actionId, index) => {
                lineBox.pushLine(
                    this.generateChildLink(
                        index == 0,
                        index == action.children!.length - 1,
                        y - prevY - 1
                    )
                );
                prevY = y;
                let newY = this.generateBoxes(actionId, {
                    x: x + (box.width as number) + dX,
                    y,
                });
                y = newY != y ? newY : y + dY;
            });
        }

        return y;
    }

    refresh() {
        if (!this.active) return;
        this.generateBoxes();
        this.loader.setBoxes(this.boxes);
        this.render('refresh');
    }

    private toggleInfo(render: boolean = true) {
        this.infoBox.toggle();
        render && this.render('toggleInfo');
    }

    private toggleLogs(render: boolean = true) {
        this.logsButton.content = ` ${colors.underline(`${this.logsBox.visible ? 'Show' : 'Hide'} logs`)} `;
        this.logsBox.toggle();
        render && this.render('toggleLogs');
    }

    private clampWidth(
        minWidth: number,
        percentage: number,
        padding: number = 0
    ) {
        return clampWidth(
            this.screen.width as number,
            minWidth,
            percentage,
            padding
        );
    }

    destroy() {
        this.active = false;
        this.screen.destroy();
    }
}
