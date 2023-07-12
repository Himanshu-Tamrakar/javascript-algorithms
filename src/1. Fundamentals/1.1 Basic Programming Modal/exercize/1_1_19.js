export function Fabonacci() {};

var cache = [0, 1];

Fabonacci.prototype.F = function(N) {
    if(cache[N] || N === 0) {
        return cache[N];
    }
    cache[N] = this.F(N-1) + this.F(N-2);
    return cache[N];
}

Fabonacci.main = function() {
    for (let i = 0; i < 100; i++) {
        console.log(`${this.prototype.F(i)}`);
    }
}