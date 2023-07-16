export class Stopwatch {
    constructor() {
        this._start = Date.now();
        Object.seal(this);
    }

    /**
     * Elapsed time in second
     * @returns Elapsed time in seconds
     */
    elapsedTime() {
        const now = Date.now();
        return (now - this._start) / 1000;
    }
}

