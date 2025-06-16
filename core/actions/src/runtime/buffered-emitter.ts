import { EventEmitter } from 'events';

/**
 * EventEmitter class that buffers events so that
 * they are emitted when the corresponding listener is attached.
 */
export class BufferedEmitter extends EventEmitter {
    eventBuffer: Map<string, any>;

    constructor() {
        super();
        this.eventBuffer = new Map();

        this.on('newListener', (event) => {
            // skip internal events
            if (event === 'newListener' || event === 'removeListener') return;

            if (this.eventBuffer.has(event)) {
                const args = this.eventBuffer.get(event);
                this.eventBuffer.delete(event);
                process.nextTick(() => {
                    this.emit(event, ...args);
                });
            }
        });
    }

    /**
     * Emit the event with the given args
     * if there is a listener for it, or cache it for later.
     *
     * @param event
     * @param args
     * @return `true` if the event had listeners, `false` otherwise.
     */
    emit(event: string, ...args: any[]) {
        if (this.listenerCount(event) === 0) {
            this.eventBuffer.set(event, args);
            return false;
        }
        return super.emit(event, ...args);
    }
}
