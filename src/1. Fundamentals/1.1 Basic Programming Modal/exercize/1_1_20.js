export function Solution_1_1_20() {}

// This simple solution won't work as calculation !n for large n will exceed the number limit
Solution_1_1_20.prototype.Worst_F = function(N) {
    let var0 = 1;
    while(N > 1) {
        var0 *= N--;
    }

    return Math.log(var0);
}

Solution_1_1_20.prototype.F = function(N) {
    if (N === 1) {
        return 0;
    }

    return this.F(N-1) + Math.log(N);
}

Solution_1_1_20.main = function() {
    for (let i = 2; i < 200; i++) {
        console.log(`Log of !${i} is `, this.prototype.F(i), this.prototype.Worst_F(i));
    }
}
