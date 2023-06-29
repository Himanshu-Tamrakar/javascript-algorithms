export class Stopwatch {
    constructor() {
        this._start = Date.now();
        Object.seal(this);
    }

    elapsedTime() {
        const now = Date.now();
        return (now - this._start) / 1000;
    }
}

