export function Counter(name) {
    this.name = name;
    this.count = 0;
}

Counter.prototype.increment = function() {
    this.count++;
}

Counter.prototype.tally = function() {
    return this.count;
}

Counter.prototype.toString = function() {
    return `${this.count} ${this.name}`
}

Counter.main = function() {
    const counter = new Counter('Himanshu');
    counter.increment();
    counter.increment();
    console.log(counter.tally());
    console.log(counter);
}

Counter.main();