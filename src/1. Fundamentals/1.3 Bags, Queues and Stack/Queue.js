import { StdRandom, StdOut } from "../../libs/index.js";

function Node(item = null, next = null) {
    this.item = item;
    this.next = next;
}

function Queue() {
    this.first = null; // beginning of queue
    this.last = null;  // end of queue
    this.n = 0;     // number of elements on queue
}

/**
 * Returns true if this queue is empty.
 *
 * @return {@code true} if this queue is empty; {@code false} otherwise
 */
Queue.prototype.isEmpty = function() {
    return this.n === 0;
}

/**
 * Returns the number of items in this queue.
 *
 * @return the number of items in this queue
 */
Queue.prototype.size = function() {
    return this.n;
}

/**
 * Returns the item least recently added to this queue.
 *
 * @return the item least recently added to this queue
 * @throws Error if this queue is empty
 */
Queue.prototype.peek = function() {
    if (this.isEmpty()) throw new Error("Queue underflow");
    return this.first.item;
}

/**
 * Adds the item to this queue.
 *
 * @param  item the item to add
 */
Queue.prototype.enqueue = function(item) {
    const oldlast = this.last;
    this.last = new Node(item, null);
    if (this.isEmpty()) this.first = this.last;
    else oldlast.next = this.last;
    this.n++;
}

/**
 * Removes and returns the item on this queue that was least recently added.
 *
 * @return the item on this queue that was least recently added
 * @throws Error if this queue is empty
 */
Queue.prototype.dequeue = function() {
    if (this.isEmpty()) throw new Error("Queue underflow");
    const item = this.first.item;
    this.first = this.first.next;
    this.n--;
    if (this.isEmpty()) this.last = null;   // to avoid loitering
    return item;
}

Queue.prototype[Symbol.iterator] = function() {
    let first = this.first;
    return {
        next: () => {
            if (first == null) {
                return {value: null, done: true}
            }
            const val = first.item;
            first = first.next;
            return { value: val, done: false};
        },
        return: (v) => {
            return { value: v, done: true};
        }
    }
}

Queue.main = function() {
    const queue = new Queue();

    for (let i = 0; i < 20; i++) {
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

export { Queue };