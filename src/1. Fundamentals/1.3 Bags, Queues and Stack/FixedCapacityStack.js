import {StdOut, StdRandom} from "../../libs/index.js";

export class FixedCapacityStack {
    a; // holds the items
    n; // Number of item in the stack
    capacity; // The Fixed Capacity

    constructor(capacity) {
        this.capacity = capacity;
        this.a = new Array(capacity);
        this.n = 0;
    }

    isEmpty() {
        return this.n === 0;
    }

    size() {
        return this.n;
    }

    push(item) {
        if (this.n === this.capacity) {
            throw new Error('Stack is overflow');
        }
        this.a[this.n++] = item;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is underflow');
        }
        const item = this.a[--this.n];
        this.a[this.n] = null;
        return item;
    }

    // an array iterator, in reverse order
    [Symbol.iterator] = function() {
        let i = this.n;
        return {
            next: () => {
                if (i ===0) {
                    return {value: null, done: true}
                }
                return { value: this.a[--i], done: false};
            },
            return: (v) => {
                return {value: v, done: true};
            }
        }
    }

    static main() {
        let max = StdRandom.uniform(1, 20);
        StdOut.println('Capacity: %d', max);
        const stack = new FixedCapacityStack(max);

        for (let i = 0; i < max; i++) {
            try {
                 // toss 1 = enqueue, toss 0 = dequeue
                 const toss = StdRandom.uniform(0, 2);
                 if (toss) {
                     const random = StdRandom.uniform(0, 100);
                     stack.push(random);
                     StdOut.println('%d push %d', toss, random);
 
                 } else {
                     StdOut.println('%d pop %d', toss, stack.pop());
                 }
            } catch(err) {
                 StdOut.println(err.message);
            }
         }
    }
}