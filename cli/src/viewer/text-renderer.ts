import colors from 'colors';

import {
    generatePrettyActionState,
    type ActionsRenderer,
    type ActionsViewerAction,
} from './utils.js';

class TextWithLoader {
    private FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    private PLACEHOLDER = '{{LOADER}}';
    private INTERVAL = 80;
    private currentFrame: number = 0;
    private interval?: NodeJS.Timeout;
    private lastUpdateTime: number = Date.now();

    private lines: string[] = [];

    /**
     * Get placeholder used for loader.
     * Placeholder will be replaced by the actual frames.
     */
    get placeholder(): string {
        return this.PLACEHOLDER;
    }

    /**
     * Set the text that contains loaders.
     *
     * @param text
     */
    setLines(lines: string[]) {
        this.lines = lines;
    }

    /**
     * Render the text with placeholders replaced
     * with actual loading animation.
     *
     * @param output the function to output
     */
    render(output: Function) {
        clearInterval(this.interval);

        let contentChanged = false;

        let renderedLines = this.lines.map((line) => {
            if (line.includes(this.PLACEHOLDER)) {
                contentChanged = true;

                return line.replaceAll(
                    this.PLACEHOLDER,
                    this.FRAMES[this.currentFrame]
                );
            }
            return line;
        });

        // if nothing changed, render all lines
        if (!contentChanged && this.lines.length) {
            output(this.lines);
            return;
        }

        const now = Date.now();
        if (this.lastUpdateTime && now - this.lastUpdateTime > this.INTERVAL) {
            this.lastUpdateTime = now;
            this.currentFrame++;
            if (this.currentFrame > this.FRAMES.length - 1)
                this.currentFrame = 0;

            output(renderedLines);
        }

        this.interval = setInterval(() => this.render(output), this.INTERVAL);
    }
}

export class ActionsTextRenderer implements ActionsRenderer {
    private loader = new TextWithLoader();
    private actions: Map<string, ActionsViewerAction> = new Map();
    private lines: string[] = [];

    /**
     * Used for moving with arrow keys in case graph is too big
     */
    private offsetX: number = 0;
    private offsetY: number = 0;

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

    private setUp() {
        // nothing to setup if not in a terminal
        if (!process.stdout.isTTY || !this.shouldRefresh) return;

        process.stdout.on('resize', () => {
            this.render();
        });

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        // on any data into process.stdin
        process.stdin.on('data', (key: string) => {
            // exit on CTRL+C or escape
            if (key == '\u0003' || key == '\u001b' || key == 'q') {
                this.exit();
            }

            if (key == '\u001B\u005B\u0041') {
                if (this.offsetY > 0) this.offsetY--;
                this.render();
            }
            if (key == '\u001B\u005B\u0043') {
                this.offsetX++;
                this.render();
            }
            if (key == '\u001B\u005B\u0042') {
                if (this.offsetY + process.stdout.rows < this.lines.length)
                    this.offsetY++;
                this.render();
            }
            if (key == '\u001B\u005B\u0044') {
                if (this.offsetX > 0) this.offsetX--;
                this.render();
            }
        });
    }

    renders = 0;

    private renderLines(lines: string[]) {
        if (this.shouldRefresh) {
            process.stdout.cursorTo && process.stdout.cursorTo(0, 0);
            process.stdout.clearScreenDown && process.stdout.clearScreenDown();
        }

        process.stdout.write(
            (process.stdout.rows < lines.length
                ? lines.slice(this.offsetY, process.stdout.rows + this.offsetY)
                : lines
            )
                .map((l) => {
                    if (this.offsetX == 0 && process.stdout.columns >= l.length)
                        return l;

                    // compute actual offset accounting for colors
                    let currentTag = '';
                    let tags = [];
                    let startTags: string[] = [];
                    let endTags: string[] = [];
                    let startOffset = 0;
                    let endOffset = l.length;
                    let offset = 0;
                    for (let i = 0; i < l.length; i++) {
                        let char = l.charAt(i);
                        if (currentTag) {
                            currentTag += char;
                            if (char == 'm') {
                                tags.push(currentTag);
                                currentTag = '';
                            }
                        } else {
                            if (l.charCodeAt(i) == 27) currentTag += char;
                            else {
                                // actual character
                                if (offset == this.offsetX) {
                                    startOffset = i;
                                    startTags = tags.slice();
                                    tags = [];
                                }
                                if (
                                    offset ==
                                    process.stdout.columns + this.offsetX
                                ) {
                                    endOffset = i;
                                }
                                offset++;
                            }
                        }
                        endTags = tags;
                    }
                    return (
                        startTags.join('') +
                        l.substring(startOffset, endOffset) +
                        endTags.join('')
                    );
                })
                .join('\n')
        );
        process.stdout.write('\n');
    }

    private render() {
        if (this.shouldRefresh && process.stdout.isTTY) {
            this.loader.render((lines: string[]) => this.renderLines(lines));
        } else {
            this.renderLines(this.lines);
        }
    }

    private generateActionLine(action: ActionsViewerAction) {
        return (
            (action.id === this.highlightedAction
                ? colors.white.bold(' * ')
                : '') +
            `${colors.bold.cyan(action.ref)} ` +
            `${colors.italic.grey(action.id)} ${generatePrettyActionState(action.state, this.shouldRefresh, this.loader)}`
        );
    }

    private generateLines(
        actionId: string = this.topAction,
        prefix: string = '',
        parentAction?: ActionsViewerAction
    ): string[] {
        let lines = [];

        const action = this.actions.get(actionId)!;

        const pre = parentAction
            ? `${prefix}  ${parentAction.children!.indexOf(actionId) != parentAction.children!.length - 1 ? '├' : '╰'}─╴`
            : '';

        lines.push(`${pre}${this.generateActionLine(action)}`);

        prefix = parentAction
            ? parentAction.children!.indexOf(actionId) <
              parentAction.children!.length - 1
                ? `${prefix}  │  `
                : `${prefix}     `
            : '';

        action.children &&
            action.children.forEach((actionId) => {
                lines.push(...this.generateLines(actionId, prefix, action));
            });

        return lines;
    }

    refresh() {
        if (!this.active) return;
        if (!this.actions.size) return;
        this.lines = this.generateLines();
        this.loader.setLines(this.lines);
        this.render();
    }

    destroy() {
        this.active = false;
    }
}
