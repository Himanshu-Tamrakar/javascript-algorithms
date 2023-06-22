import {compare} from "../../common/index.js";
import { StdOut } from "../../libs/index.js";

export class IndexMaxPQ {
    _maxN; // maximum number of elements on PQ
    _n;    // number of elements on PQ
    _pq;   // binary heap using 1-based indexing
    _qp;   // inverse of pq - qp[pq[i]] = pq[qp[i]] = i
    _keys; // keys[i] = priority of i

    constructor(maxN) {
        if (maxN < 0) throw new ReferenceError();
        this._maxN = maxN;
        this._n = 0;
        this._keys = Array(maxN + 1); // make this of length maxN??
        this._pq   = Array(maxN + 1);
        this._qp   = Array(maxN + 1).fill(-1); // make this of length maxN??
    }

    /**
    * Returns true if this priority queue is empty.
    *
    * @return {@code true} if this priority queue is empty; {@code false} otherwise
    */
    isEmpty() {
        return this._n == 0;
    }

    /**
    * Is {@code i} an index on this priority queue?
    *
    * @param  i an index
    * @return {@code true} if {@code i} is an index on this priority queue;
    *         {@code false} otherwise
    * @throws IllegalArgumentException unless {@code 0 <= i < maxN}
    */
    contains(i) {
        this.validateIndex(i);
        return this._qp[i] != -1;
    }

    /**
    * Returns the number of keys on this priority queue.
    *
    * @return the number of keys on this priority queue
    */
    size() {
        return this._n;
    }

    /**
    * Associates key with index {@code i}.
    *
    * @param  i an index
    * @param  key the key to associate with index {@code i}
    * @throws ReferenceError unless {@code 0 <= i < maxN}
    * @throws ReferenceError if there already is an item associated with index {@code i}
    */
    insert(i, key) {
        this.validateIndex(i);
        if (this.contains(i)) throw new ReferenceError("index is already in the priority queue");
        this._n++;
        this._qp[i] = this._n;
        this._pq[this._n] = i;
        this._keys[i] = key;
        this.swim(this._n);
    }

    /**
    * Returns an index associated with a minimum key.
    *
    * @return an index associated with a minimum key
    * @throws ReferenceError if this priority queue is empty
    */
    minIndex() {
        if (this._n == 0) throw new ReferenceError("Priority queue underflow");
        return this._pq[1];
    }

    /**
    * Returns a minimum key.
    *
    * @return a minimum key
    * @throws ReferenceError if this priority queue is empty
    */
    minKey() {
        if (this._n == 0) throw new ReferenceError("Priority queue underflow");
        return this._keys[this._pq[1]];
    }

    /**
    * Removes a minimum key and returns its associated index.
    * @return an index associated with a minimum key
    * @throws ReferenceError if this priority queue is empty
    */
    delMin() {
        if (this._n == 0) throw new ReferenceError("Priority queue underflow");
        let min = this._pq[1];
        this.exch(1, this._n--);
        this.sink(1);
        this._qp[min] = -1;        // delete
        this._keys[min] = null;    // to help with garbage collection
        this._pq[this._n+1] = -1;  // not needed
        return min;
    }

    /**
    * Returns the key associated with index {@code i}.
    *
    * @param  i the index of the key to return
    * @return the key associated with index {@code i}
    * @throws ReferenceError unless {@code 0 <= i < maxN}
    * @throws ReferenceError no key is associated with index {@code i}
    */
    keyOf(i) {
        this.validateIndex(i);
        if (!this.contains(i)) throw new ReferenceError("index is not in the priority queue");
        else return this._keys[i];
    }

    /**
    * Change the key associated with index {@code i} to the specified value.
    *
    * @param  i the index of the key to change
    * @param  key change the key associated with index {@code i} to this key
    * @throws ReferenceError unless {@code 0 <= i < maxN}
    * @throws ReferenceError no key is associated with index {@code i}
    */
    changeKey (i, key) {
        this.validateIndex(i);
        if (!this.contains(i)) throw new ReferenceError("index is not in the priority queue");
        this._keys[i] = key;
        this.swim(this._qp[i]);
        this.sink(this._qp[i]);
    }

    /**
    * Change the key associated with index {@code i} to the specified value.
    *
    * @param  i the index of the key to change
    * @param  key change the key associated with index {@code i} to this key
    * @throws ReferenceError unless {@code 0 <= i < maxN}
    * @deprecated Replaced by {@code changeKey(int, Key)}.
    */
    change(i, key) {
        this.changeKey(i, key);
    }

    /**
    * Decrease the key associated with index {@code i} to the specified value.
    *
    * @param  i the index of the key to decrease
    * @param  key decrease the key associated with index {@code i} to this key
    * @throws ReferenceError unless {@code 0 <= i < maxN}
    * @throws ReferenceError if {@code key >= keyOf(i)}
    * @throws ReferenceError no key is associated with index {@code i}
    */
    decreaseKey(i, key) {
        this.validateIndex(i);
        if (!this.contains(i)) throw new ReferenceError("index is not in the priority queue");
        if (compare(this._keys[i], key) == 0)
            throw new ReferenceError("Calling decreaseKey() with a key equal to the key in the priority queue");
        if (compare(this._keys[i], key) < 0)
            throw new ReferenceError("Calling decreaseKey() with a key strictly greater than the key in the priority queue");
        this._keys[i] = key;
        this.swim(this._qp[i]);
    }

    /**
    * Increase the key associated with index {@code i} to the specified value.
    *
    * @param  i the index of the key to increase
    * @param  key increase the key associated with index {@code i} to this key
    * @throws IllegalArgumentException unless {@code 0 <= i < maxN}
    * @throws IllegalArgumentException if {@code key <= keyOf(i)}
    * @throws NoSuchElementException no key is associated with index {@code i}
    */
    increaseKey(i, key) {
        this.validateIndex(i);
        if (!this.contains(i)) throw new ReferenceError("index is not in the priority queue");
        if (compare(this._keys[i], key) == 0)
            throw new ReferenceError("Calling increaseKey() with a key equal to the key in the priority queue");
        if (compare(this._keys[i], key) > 0)
            throw new ReferenceError("Calling increaseKey() with a key strictly less than the key in the priority queue");
        this._keys[i] = key;
        this.sink(this._qp[i]);
    }

    /**
    * Remove the key associated with index {@code i}.
    *
    * @param  i the index of the key to remove
    * @throws ReferenceError unless {@code 0 <= i < maxN}
    * @throws ReferenceError no key is associated with index {@code i}
    */
    delete(i) {
        this.validateIndex(i);
        if (!this.contains(i)) throw new ReferenceError("index is not in the priority queue");
        let index = this._qp[i];
        this.exch(index, this._n--);
        this.swim(index);
        this.sink(index);
        this._keys[i] = null;
        this._qp[i] = -1;
    }

    // throw an IllegalArgumentException if i is an invalid index
    validateIndex(i) {
        if (i < 0) throw new ReferenceError("index is negative: " + i);
        if (i >= this._maxN) throw new ReferenceError("index >= capacity: " + i);
    }

        /***************************************************************************
    * General helper functions.
    ***************************************************************************/

    /**
    * Compares if key at index `i` is less than key at index `j`.
    * @private
    * @param {number} i Index of first key
    * @param {number} j Index of second key
    * @returns {boolean} if key at index `i` is less than key at index`j`
    */
    less(i, j) {
        return compare(this._keys[this._pq[i]], this._keys[this._pq[j]]) < 0;
    }

    exch(i, j) {
        let swap = this._pq[i];
        this._pq[i] = this._pq[j];
        this._pq[j] = swap;
        this._qp[this._pq[i]] = i;
        this._qp[this._pq[j]] = j;
    }

    /***************************************************************************
    * Heap helper functions.
    ***************************************************************************/
    swim(k) {
        while(k > 1 && this.less(Math.floor(k / 2), k)) {
            this.exch(Math.floor(k / 2), k);
            k = Math.floor(k / 2);
        }
    }

    sink(k) {
        while(2*k <= this._n) {
            let j = k*2;
            if (j < this._n && this.less(j, j+1)) j++;
            if (!this.less(k, j)) break;
            this.exch(k ,j);
            k = j;
        }
    }

    [Symbol.iterator] = function() {
        let copy;

        // add all elements to copy of heap
        // takes linear time since already in heap order so no keys move
        copy = new IndexMaxPQ(this._pq.length - 1);
        for (let i = 1; i <= this._n; i++)
            copy.insert(this._pq[i], this._keys[this._pq[i]]);

        return {
            next() {
                if (!copy.isEmpty()) return {value: copy.delMin(), done: false}
                else return {value: null, done: true}
            },
            return(v) {
                return {value: v, done: true}
            }
        }
    }


     /**
     * Unit tests the {@code IndexMinPQ} data type.
     *
     * @param args the command-line arguments
     */
     static main() {
        // insert a bunch of strings
        let strings = [ "it", "was", "the", "best", "of", "times", "it", "was", "the", "worst"]

        const pq = new IndexMaxPQ(strings.length);
        for (let i = 0; i < strings.length; i++) {
            pq.insert(i, strings[i]);
        }

        // delete and print each key
        while (!pq.isEmpty()) {
            let i = pq.delMin();
            StdOut.println(i + " " + strings[i]);
        }
        StdOut.println();

        // reinsert the same strings
        for (let i = 0; i < strings.length; i++) {
            pq.insert(i, strings[i]);
        }

        // print each key using the iterator
        for (let i of pq) {
            StdOut.println(i + " " + strings[i]);
        }
        while (!pq.isEmpty()) {
            pq.delMin();
        }

    }


}