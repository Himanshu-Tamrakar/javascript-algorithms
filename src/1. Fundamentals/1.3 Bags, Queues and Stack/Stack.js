import { StdOut, StdRandom } from "../../libs/index.js";
class Node {
    next;
    item;
    constructor(item, next) {
        this.item = item;
        this.next = next;
    }
}
export class Stack {
    first; // top of stack
    n;     // size of the stack
    constructor(s) {
        this.first = null;
        this.n = 0;

        if (s) {
            let f = s.first;
            this.first = new Node(f.item, f.next);
            let x = this.first;
            while(x.next != null) {
                x.next = new Node(x.next.item, x.next.next);
                x = x.next;
            }

            this.n = s.size();
        }
    }

    /**
     * Returns true if this stack is empty.
     *
     * @return true if this stack is empty; false otherwise
     */
    isEmpty() {
        return this.n === 0;
    }

    size() {
        return this.n;
    }

     /**
     * Adds the item to this stack.
     *
     * @param  item the item to add
     */
    push(item) {
        const oldFirst = this.first;
        this.first = new Node(item, oldFirst);
        this.n++;
    }

    /**
     * Removes and returns the item most recently added to this stack.
     *
     * @return the item most recently added
     * @throws Error if this stack is empty
     */
    pop() {
        if (this.isEmpty()) {
            throw new Error('stack is  underflow');
        }
        const item = this.first.item;
        this.first = this.first.next;
        this.n--;
        return item;
    }

    /**
     * Returns (but does not remove) the item most recently added to this stack.
     *
     * @return the item most recently added to this stack
     * @throws NoSuchElementException if this stack is empty
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error('stack is  underflow');
        }
        const item = this.first.item;
        return item;
    }

    // recursive copy
    copy(x) {
        if (!x) {
            return null;
        }
        const node = new Node(x.item);
        node.next = copy(x.next);
        return node;
    }

    /**
     * Returns an iterator onject to this stack that iterates through the items in LIFO order.
     *
     * @return an iterator to this stack that iterates through the items in LIFO order
     */
    [Symbol.iterator] = function() {
        let current = this.first;
        return {
            next: () => {
                if (current == null) {
                    return { value: null, done: true}
                }
                const item = current.item;
                current = current.next;
                return { value: item, done:false }
            },
            return: (v) => {
                return { value: v, done: true }
            }
        }
    }

    static main() {
        const stack = new Stack();

        for (let i = 0; i < 20; i++) {
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