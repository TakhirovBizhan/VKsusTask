type Listener = (...args: unknown[]) => void;

class EventEmitter {
    private events: Map<string, Listener[]> = new Map();

    public on(eventName: string, listener: Listener): void {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName)?.push(listener);
    }

    public emit<T>(eventName: string, ...args: T[]): void {
        const listeners = this.events.get(eventName);
        if (listeners) {
            for (const listener of listeners) {
                listener(...args);
            }
        }
    }

    public off(eventName: string, listener: Listener): void {
        const listeners = this.events.get(eventName);
        if (!listeners) return;

        const updatedListeners = listeners.filter((l) => l !== listener);

        if (updatedListeners.length > 0) {
            this.events.set(eventName, updatedListeners);
        } else {
            this.events.delete(eventName);
        }
    }
}

// Example usage
const emitter = new EventEmitter();

// Register a listener
const logData = (data: unknown) => console.log(data);
emitter.on('data', logData);

// Emit an event
emitter.emit('data', { message: 'Hello, world!' });

// Remove a specific listener
emitter.off('data', logData);
