import {StdOut, StdRandom} from "../../libs/index.js";

const INITIAL_CAPACITY = 8;
export class ResizingArrayStack {
    a; // holds the items
    n; // Number of item in the stack

    constructor() {
        this.a = new Array(INITIAL_CAPACITY);
        this.n = 0;
    }

    isEmpty() {
        return this.n === 0;
    }

    size() {
        return this.n;
    }

    resize(capacity) {
        const copy = new Array(capacity);
        for (let i = 0; i < this.n; i++) {
            copy[i] = this.a[i];
        }
        this.a = copy;
    }

    push(item) {
        if (this.a.length === this.n) this.resize(2*this.a.length);
        this.a[this.n++] = item;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is underflow');
        }
        const item = this.a[--this.n];
        this.a[this.n] = null;
        if (this.n > 0 && this.n == Math.floor(this.a.length / 4)) {
            this.resize(this.a.length/2);
        }
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
        const stack = new ResizingArrayStack();

        for (let i = 0; i < 200; i++) {
            try {
                    // toss 1 = enqueue, toss 0 = dequeue
                    const toss = StdRandom.uniform(0, 2);
                    if (toss) {
                        const random = StdRandom.uniform(0, 100);
                        stack.push(random);
                        StdOut.printf('push: ');
                        StdOut.println('%d',  random);
                    } else {
                        StdOut.printf('pop: ');
                        StdOut.println('%d', stack.pop());
                    }
            } catch(err) {
                 StdOut.println(err.message);
            }
         }

         StdOut.println('Items in stack: ');
         for (const item of stack) {
            StdOut.printf(item + ' ');
         }
         StdOut.println();
    }
}