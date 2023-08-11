import { equals } from "../../common/index.js";
import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { StdOut, StdRandom } from "../../libs/index.js";

// a helper linked list data type
class Node {
    key;
    value;
    next;
    constructor(key, value, next) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

export class SequencialST {
    first;
    N;
    constructor() {
        this.first;
        this.N = 0;
    }

    /**
    * Returns the number of key-value pairs in this symbol table.
    *
    * @return the number of key-value pairs in this symbol table
    */
    size() {
        return this.N;
    }

    /**
    * Returns true if this symbol table is empty.
    *
    * @return {@code true} if this symbol table is empty;
    *         {@code false} otherwise
    */
    isEmpty() {
        return this.N === 0;
    }


    /**
    * Returns true if this symbol table contains the specified key.
    *
    * @param  key the key
    * @return {@code true} if this symbol table contains {@code key}; 
    * {@code false} otherwise
    * @throws TypeError if {@code key} is {@code null}
    */
    contains(key) {
        if (key == null) {
            throw new TypeError('"argument to contains() is null');
        } 
        const val = this.get(key);
        return val !== null;
    }


    /**
    * Returns the value associated with the given key in this symbol table.
    *
    * @param  key the key
    * @return the value associated with the given key if the key is in the symbol table
    * and {@code null} if the key is not in the symbol table
    * @throws TypeError if {@code key} is {@code null}
    */
    get(key) {
        if (key == null) {
            throw new TypeError("argument to get() is null");
        }
        for (let node = this.first; node != null; node = node.next) {
            if (equals(node.key, key)) {
                return node.value;
            }
        }
        return null;
    }

    /**
    * Inserts the specified key-value pair into the symbol table, overwriting the old
    * value with the new value if the symbol table already contains the specified key.
    * Deletes the specified key (and its associated value) from this symbol table
    * if the specified value is {@code null}.
    * RECENTLY PUT, FAST ACCESS AS IT STORE NEW ITEM INTO FIRST POSITION 
    *
    * @param  key the key
    * @param  val the value
    * @throws TypeError if {@code key} is {@code null}
    */
    put(key, value) {
        if (key == null) {
            throw new TypeError('argument key to put() is null');
        }
        if (value == null) {
            this.delete(key);
            return;
        }
        // Update is key already present and return
        for (let x = this.first; x != null; x = x.next) {
            if (equals(key, x.key)) {
                x.value = value;
                return;
            }
        }
        this.first = new Node(key, value, this.first);
        this.N++;
    }

    /**
    * Removes the specified key and its associated value from this symbol table
    * (if the key is in this symbol table).
    *
    * @param  key the key
    * @throws TypeError if {@code key} is {@code null}
    */
    delete(key) {
        if (key == null) {
            throw new TypeError('argument to delete() is null');
        }
        if (this.isEmpty()) {
            return null;
        }
        
        // Deleting element is first element
        if (equals(key, this.first.key)) {
            const val = this.first.value;
            this.first = this.first.next;
            this.N--;
            return val;
        }
        for (let prev, x = this.first; x != null; x = x.next) {
            if (equals(key, x.key)) {
                prev.next = x.next;
                this.N--;
                return x.value;
            }
            prev = x;
        }

        return null;
    }

    /**
     * Returns min
     * @returns min
     */
    min() {
        if (this.isEmpty()) {
            return null;
        }
        let min = this.first.value;
        for (let x = this.first; x != null; x = x.next) {
            if (x.value < min) min = x.value;
        }
        return min;
    }

    /**
     * Returns max
     * @returns max item
     */
    max() {
        if (this.isEmpty()) {
            return null;
        }
        let max = this.first.value;
        for (let node = this.first; node != null; node = node.next) {
            if (node.value < max) max = node.value;
        }
        return max;
    }

    floor(key) {
        throw new Error('floor not implemented. User Ordered Sysmbol Table instead');
    }

    ceiling(key) {
        throw new Error('floor not implemented. User Ordered Sysmbol Table instead');
    }

    rank(key) {
        throw new Error('floor not implemented. User Ordered Sysmbol Table instead');
    }

    select(k) {
        throw new Error('floor not implemented. User Ordered Sysmbol Table instead');
    }

    deleteMin() {
        throw new Error('floor not implemented. User Ordered Sysmbol Table instead');
    }

    deleteMax() {
        throw new Error('floor not implemented. User Ordered Sysmbol Table instead');
    }

    // size(lo, hi) {}

    /**
     * Returns all keys in the symbol table as an {@code Iterable}.
     * To iterate over all of the keys in the symbol table named {@code st},
     * use the foreach notation: {@code for (let key of st.keys())}.
     *
     * @return all keys in the symbol table
     */
    keys() {
        let node = this.first;
        const queue = new Queue()

        while(node) {
            queue.enqueue(node.key);
            node = node.next;
        }
        return queue;
    }

    [Symbol.iterator]() {
        let node = this.first;
        return {
            next() {
                if (node == null) {
                    return { value: null, done: true };
                }
                const key = node.key;
                node = node.next;
                return {value: key, done: false};
            },
            return(v) {
                return { value: v, done: true }
            }
        }
    }

    static main() {
        const n = StdRandom.uniform(10, 50);
        const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const st = new SequencialST();
        for (let i = 0; i < keys.length; i++) {
            st.put(keys[i], i);
            
        }
        for (const key of st) {
            console.log(key, ' : ', st.get(key));
        }

        StdOut.println('Deleting : Size Before : Delete : Size After : Try Get');
        keys.forEach(k => {
            const bsz = st.size();
            const bval = st.delete(k);
            const asz= st.size();
            const aval = st.get(k)
            console.log(`${k}        :    ${bsz}        :    ${bval}  :    ${asz}       :   ${aval}`);
        })
    }


}