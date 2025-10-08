import blessed, { Widgets } from 'blessed';
import colors from 'colors';
import { copy } from 'copy-paste';

import {
    ACTION_STATE_FORMAT,
    generatePrettyActionState,
    type ActionsRenderer,
    type ActionsViewerAction,
} from './utils.js';

const SCROLLBAR_STYLE = { style: { bg: 'yellow' }, track: 'grey' };

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

export class ActionsBlessedRenderer implements ActionsRenderer {
    private screen!: Widgets.Screen;

    private loader = new BoxesWithLoader();

    /**
     * Main box that contains the graph of actions.
     */
    private mainBox!: Widgets.BoxElement;

    /**
     * Box that contains actions info.
     *
     * Layout:
     * ```
     * ┌─────────────────────────┐
     * │ <ref>        |stateBox| │
     * │                         │
     * │ |idBox ---------------| │
     * │ |argumentsBox --------| │
     * │ |resultBox -----------| │
     * └─────────────────────────┘
     * ```
     *
     * This should give:
     * ```
     * ┌─────────────────────────┐
     * │ ActionRef       |STATE| │
     * │                         │
     * │ ┌─ ID ────────────────┐ │
     * │ │  ....               │ │
     * │ └─────────────────────┘ │
     * │ ┌─ Arguments ─────────┐ │
     * │ │  ....               │ │
     * │ └─────────────────────┘ │
     * │ ┌─ Result ────────────┐ │
     * │ │  ....               │ │
     * │ └─────────────────────┘ │
     * └─────────────────────────┘
     * ```
     */
    private infoBox!: Widgets.BoxElement;
    private stateBox!: Widgets.TextElement;
    private refBox!: Widgets.TextElement;
    private idBox!: Widgets.TextElement;
    private argumentsBox!: Widgets.TextElement;
    private bagBox!: Widgets.TextElement;
    private resultBox!: Widgets.TextElement;
    private idLabelBox!: Widgets.TextElement;
    private argumentsLabelBox!: Widgets.TextElement;
    private bagLabelBox!: Widgets.TextElement;
    private resultLabelBox!: Widgets.TextElement;

    private alertBox!: Widgets.TextElement;

    private logsBox!: Widgets.BoxElement;
    private logsBoxContainer!: Widgets.BoxElement;
    private logsButton!: Widgets.TextElement;

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
        exit: Function = () => process.exit()
    ) {
        this.topAction = actionId;
        this.shouldRefresh = shouldRefresh;
        this.exit = exit;
        this.setUp();
    }

    setTopAction(actionId: string) {
        this.topAction = actionId;
    }

    highlightAction(actionId: string) {
        this.highlightedAction = actionId;
    }

    setActions(actions: Map<string, ActionsViewerAction>) {
        this.actions = actions;
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
        this.logsBoxContainer.content = logs
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
                        color = colors.grey.italic;
                }
                if (log.timestamp && log.actionRef && log.actionId)
                    return color(
                        `${log.timestamp} - ${colors.bold(log.actionRef)} (${colors.italic(log.actionId)}): ${log.message}`
                    );

                if (log.timestamp)
                    return color(`${log.timestamp} - ${log.message}`);

                return color(log.message);
            })
            .join('\n');

        if (this.logsBox.visible) {
            // auto scroll if scroll was at the bottom
            if (this.logsBoxContainer.getScrollPerc() === 100)
                this.logsBoxContainer.setScrollPerc(100);
            this.render('new logs');
        }
    }

    renders = 0;

    private render(from: string) {
        this.debug(`${++this.renders} — render from q${from}`);
        this.borders.forEach((border) => border.setFront());

        if (this.shouldRefresh) {
            this.loader.render(() => {
                this.screen.render();
            });
        } else {
            this.screen.render();
        }
    }

    private listenToChildScroll(
        child: blessed.Widgets.Node,
        target: blessed.Widgets.BoxElement
    ) {
        child.on('wheeldown', () => {
            target.scroll(1);
            this.render('listenToChildScroll wheeldown');
        });
        child.on('wheelup', () => {
            target.scroll(-1);
            this.render('listenToChildScroll wheelup');
        });
    }

    private keyScroll(elt: blessed.Widgets.BoxElement, direction: string) {
        switch (direction) {
            case 'up':
                elt.scroll(-1);
                break;
            case 'down':
                elt.scroll(1);
                break;
            case 'left':
                if ((elt.left as number) < 0) (elt.left as number)++;
                break;
            case 'right':
                if ((elt.width as number) < this.xMax) (elt.left as number)--;
        }
        this.render('keyScroll');
    }

    private listenToChildKey(
        child: blessed.Widgets.Node,
        target: blessed.Widgets.BoxElement
    ) {
        ['up', 'down', 'left', 'right'].forEach((key) => {
            child.on(`key ${key}`, () => {
                this.keyScroll(target, key);
            });
        });
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
    private setUp() {
        this.screen = blessed.screen({
            fastCSR: true,
            // useBCE: true,
            debug: true, // use F12 to print debug messages
            // warnings: true,
            border: {
                type: 'line',
            },
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

        this.infoBox = blessed.box({
            parent: this.screen,
            top: 1,
            right: 2,
            bottom: 1,
            width: this.clampWidth(70, 0.5, 2),
            hidden: true,
            border: { type: 'line' },
            style: { border: { fg: 'magenta' } },
            shrink: true,
        });

        const infoBoxContainer = blessed.box({
            parent: this.infoBox,
            mouse: true,
            keys: true,
            alwaysScroll: true,
            scrollable: true,
            scrollbar: SCROLLBAR_STYLE,
            padding: { left: 1 },
        });

        const options = {
            padding: 1,
            border: { type: 'line' as 'line' },
            width: '100%-2',
            shrink: true,
            style: { border: { fg: 'grey' }, fg: 'grey' },
        };

        this.stateBox = blessed.text({
            parent: infoBoxContainer,
            top: 0,
            right: 2,
            border: 'line',
            style: { bold: true },
            shrink: true,
        });

        this.refBox = blessed.text({
            top: 1,
            left: 1,
            parent: infoBoxContainer,
            style: { fg: 'cyan', bold: true, underline: true },
            shrink: true,
        });

        this.idBox = blessed.text({
            parent: infoBoxContainer,
            top: 3,
            ...options,
        });

        // specific box for id label because
        // label placement is broken on scroll for some reason
        this.idLabelBox = blessed.text({
            parent: infoBoxContainer,
            top: 3,
            left: 1,
            content: ` ${colors.bold.underline('ID')} `,
        });

        this.argumentsBox = blessed.text({
            parent: infoBoxContainer,
            top: 6,
            ...options,
        });

        // specific box for arguments label
        this.argumentsLabelBox = blessed.text({
            parent: infoBoxContainer,
            top: 6,
            left: 1,
            content: ` ${colors.bold.underline('Arguments')} `,
        });

        this.bagBox = blessed.text({
            parent: infoBoxContainer,
            top: 10,
            ...options,
        });

        // specific box for arguments label
        this.bagLabelBox = blessed.text({
            parent: infoBoxContainer,
            top: 10,
            left: 1,
            content: ` ${colors.bold.underline('Bag')} `,
        });

        this.resultBox = blessed.text({
            parent: infoBoxContainer,
            top: 14,
            ...options,
        });

        // specific box for result label
        this.resultLabelBox = blessed.text({
            parent: infoBoxContainer,
            top: 14,
            left: 1,
            content: ` ${colors.bold.underline('Result')} `,
        });

        // Copy content on click
        ['ref', 'state', 'id', 'arguments', 'bag', 'result'].forEach((type) => {
            (this[`${type}Box` as keyof this] as Widgets.BoxElement).on(
                'click',
                (event) => {
                    copy(
                        (
                            this[
                                `${type}Box` as keyof this
                            ] as Widgets.BoxElement
                        ).getContent()
                    );
                    this.alert('Copied!', { x: event.x + 3, y: event.y + 1 });
                }
            );
        });

        // needed so that scrolling on children
        // is registered in the parent
        infoBoxContainer.children.forEach((child) => {
            this.listenToChildScroll(child, infoBoxContainer);
            this.listenToChildKey(child, infoBoxContainer);
        });

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

        this.logsBox = blessed.box({
            parent: this.screen,
            top: 1,
            right: 2,
            bottom: 1,
            width: this.clampWidth(70, 0.5, 2),
            hidden: true,
            border: { type: 'line' },
            style: { border: { fg: 'magenta' } },
            shrink: true,
        });

        this.logsBoxContainer = blessed.box({
            parent: this.logsBox,
            mouse: true,
            keys: true,
            alwaysScroll: true,
            scrollable: true,
            scrollbar: SCROLLBAR_STYLE,
            padding: { left: 1 },
        });

        this.logsButton = blessed.text({
            parent: this.screen,
            right: 1,
            bottom: 1,
            content: ` ${colors.italic.underline('Show logs')} `,
        });

        this.logsButton.on('click', () => this.toggleLogs());

        // Quit on Escape, q, or Control-C.
        this.screen.key(['escape', 'q', 'C-c'], () => {
            this.destroy();
            return this.exit();
        });

        this.mainBox.on('key right', () => {
            this.keyScroll(this.mainBox, 'right');
        });

        this.mainBox.on('key left', () => {
            this.keyScroll(this.mainBox, 'left');
        });

        // hide infoBox and logsBox on click outside
        this.mainBox.on('click', () => {
            if (this.infoBox.visible) {
                this.infoBox.toggle();
                this.render('mainbox click');
            }
            if (this.logsBox.visible) this.toggleLogs();
        });
    }

    private alert(msg: string, pos: any) {
        this.alertBox.left = pos.x;
        this.alertBox.top = pos.y;

        this.alertBox.setContent(msg);
        if (!this.alertBox.visible) this.alertBox.toggle();

        this.alertBox.setFront();
        this.render('alert');

        setTimeout(() => {
            // toggle off
            if (this.alertBox.visible) this.alertBox.toggle();
            this.alertBox.setContent('');
            this.render('alert interval');
        }, 2000);
    }

    private setInfoBoxContent(action: ActionsViewerAction) {
        this.infoBox.name = action.id;

        const { color, full } = ACTION_STATE_FORMAT.get(action.state)!;
        this.stateBox.setContent(full);
        this.stateBox.style.fg = color;
        this.stateBox.style.border.fg = color;

        this.refBox.setContent(action.ref);
        this.idBox.setContent(action.id);
        (
            [
                ['arguments', this.idBox],
                ['bag', this.argumentsBox],
                ['result', this.bagBox],
            ] as [string, blessed.Widgets.TextElement][]
        ).forEach(([type, prevElt]) => {
            (this[`${type}LabelBox` as keyof this] as Widgets.BoxElement).top =
                (prevElt.top as number) + prevElt.getScreenLines().length + 5;
            (this[`${type}Box` as keyof this] as Widgets.BoxElement).top =
                (prevElt.top as number) + prevElt.getScreenLines().length + 5;
            (this[`${type}Box` as keyof this] as Widgets.BoxElement).setContent(
                JSON.stringify(
                    action[type as keyof ActionsViewerAction],
                    undefined,
                    '\t'
                )
            );
        });
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
            this.listenToChildScroll(actionBox, this.mainBox);
            this.listenToChildKey(actionBox, this.mainBox);
            this.boxes.set(action.id, actionBox as Widgets.BoxElement);

            actionBox.on('click', () => {
                if (
                    !this.infoBox.visible ||
                    this.infoBox.name == actionBox.name
                )
                    this.infoBox.toggle();

                this.setInfoBoxContent(this.actions.get(action.id)!);
                this.render('actionBox ' + actionBox.name);
            });
        }

        // position may change after first render as top action can change
        actionBox.left = x;
        actionBox.top = y;

        if (action.id === this.highlightedAction)
            actionBox.style.border.fg = 'white';
        else actionBox.style.border.fg = 'grey';

        // let actionRefColor = colors.bold;
        // if (!action.children?.length && action.state === ActionState.ERROR) {
        //     actionBox.style.border.fg = 'red';
        //     actionRefColor = actionRefColor.red;
        // }

        actionBox.setContent(
            ` ${colors.bold(action.ref)} ${generatePrettyActionState(action.state, this.shouldRefresh, this.loader)}`
        );

        // if infoBox is open, update it
        if (this.infoBox.visible && this.infoBox.name == action.id) {
            this.setInfoBoxContent(action);
        }

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

    private toggleLogs() {
        this.logsButton.content = ` ${colors.italic.underline(`${this.logsBox.visible ? 'Show' : 'Hide'} logs`)} `;
        this.logsBox.toggle();
        this.render('logsBox');
    }

    private clampWidth(
        minWidth: number,
        percentage: number,
        padding: number = 0
    ) {
        const screenWidth = this.screen.width as number;
        return Math.min(
            screenWidth - padding * 2,
            Math.max(Math.ceil(percentage * screenWidth), minWidth)
        );
    }
    destroy() {
        this.active = false;
        this.screen.destroy();
    }
}
