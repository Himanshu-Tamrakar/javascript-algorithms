
// Stack implemention using Array Object
function Stack() {
    this.N = 0;
    this.stack = [];
}

Stack.prototype.push = function(item) {
    this.stack[this.N++] = item;
}

Stack.prototype.pop = function() {
    if (this.N === 0) {
        throw new Error('ERR-001:Stack is empty');
    }
    const res = this.stack[--this.N];
    this.stack.length = this.N; // Should check the performance
    return res;
}

Stack.prototype.peek = function() {
    if (this.N === 0) {
        throw new Error('ERR-001:Stack is empty');
    }
    return this.stack[this.N-1];

}

Stack.prototype.isEmpty = function() {
    return this.N === 0 ? true : false;
}


Stack.prototype[Symbol.iterator] = function() {
    let n = 0;
    return {
        [Symbol.iterator]() { return this; },

        next: () => {
            if (this.N !== n) {
                return {value: this.stack[n++], done: false}
            } else {
                return {value: null, done: true};
            }
        },
        return: (value) => {
            return {value, done: true};
        }
    }
}

export { Stack };











