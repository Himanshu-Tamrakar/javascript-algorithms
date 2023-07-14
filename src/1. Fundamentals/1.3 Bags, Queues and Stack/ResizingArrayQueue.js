import {StdOut, StdRandom} from "../../libs/index.js";

const INIT_CAPACITY = 8;
export class ResizingArrayQueue {

    q;      // queue elements
    n;      // number of elements on queue
    first;  // index of first element of queue
    last;   // index of next available slot

     /**
     * Initializes an empty queue.
     */
    constructor() {
        this.q = new Array(INIT_CAPACITY);
        this.n = 0;
        this.first = 0;
        this.last = 0;
    }

    /**
     * Is this queue empty?
     * @return true if this queue is empty; false otherwise
     */
    isEmpty() {
        return this.n == 0;
    }

     /**
     * Returns the number of items in this queue.
     * @return the number of items in this queue
     */
     size() {
        return this.n;
    }

     // resize the underlying array
     resize(capacity) {
        const copy = new Array(capacity);
        for (let i = 0; i < this.n; i++) {
            copy[i] = this.q[(this.first + i) % this.q.length];
        }
        this.q = copy;
        this.first = 0;
        this.last  = this.n;
    }

     /**
     * Adds the item to this queue.
     * @param item the item to add
     */
     enqueue(item) {
        // double size of array if necessary and recopy to front of array
        if (this.n == this.q.length) this.resize(2*this.q.length);   // double size of array if necessary
        this.q[this.last++] = item; // add item
        if (this.last == this.q.length) this.last = 0; 
        // wrap-around
        this.n++;
    }

      /**
     * Removes and returns the item on this queue that was least recently added.
     * @return the item on this queue that was least recently added
     * @throws java.util.Error if this queue is empty
     */
      dequeue() {
        if (this.isEmpty()) throw new Error('Queue is underflow');
        const item = this.q[this.first];
        this.q[this.first] = null;                            // to avoid loitering
        this.n--;
        this.first++;
        if (this.first == this.q.length) this.first = 0;           // wrap-around
        // shrink size of array if necessary
        if (this.n > 0 && this.n == Math.floor(this.q.length/4)) this.resize(this.q.length/2);
        return item;
    }

    [Symbol.iterator] = function() {
        let i = 0;
        return {
            next: () => {
                if (i === this.n) {
                    return {value: null, done: true}
                }
                const val = this.q[(this.first + i) % this.q.length];
                i++;
                return { value: val, done: false };
            },
            return: (v) => {
                return {value: v, done: true};
            }
        }

    }

    static main() {
        const queue = new ResizingArrayQueue();

        for (let i = 0; i < 200; i++) {
           try {
                // toss 1 = enqueue, toss 0 = dequeue
                const toss = StdRandom.uniform(0, 2);
                if (toss) {
                    const random = StdRandom.uniform(0, 100);
                    queue.enqueue(random);
                    StdOut.printf('enqueue: ');
                    StdOut.println('%d', random);
                } else {
                    StdOut.printf('dequeue: ');
                    StdOut.println('%d', queue.dequeue());
                }
           } catch(err) {
                StdOut.println(err.message);
           }
        }

        StdOut.println('Items in Queue: ');
        for (const item of queue) {
           StdOut.printf(item + ' ');
        }
        StdOut.println();
    }
}