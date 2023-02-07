export function Accumulator() {
    this.total = 0;
    this.N = 0;
}

Accumulator.prototype.addDataValue = function(val) {
    this.total += val;
    this.N++;
}

Accumulator.prototype.mean = function() {
    return this.total / this.N;
}

Accumulator.prototype.toString = function() {
    return `Mean (${this.N}  values): ${this.mean()}`
}