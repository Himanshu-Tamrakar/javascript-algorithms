import { defaultComparator, compare } from "../../../common/index.js";

export class MaxPQ {

    constructor(max) {
        this._n = 0; // initial size
        this._pq = []; // default initialization

        if (typeof max === 'number' && Number.isInteger(max) && max > 0) {
            this._pq = new Array(max+1);
        } else if(Array.isArray(max)) {
            // Implement pq with array value
        }

        Object.seal(this);
    }
 

    /**
     * Compares if key at index `i` is less than key at index `j`.
     * @private
     * @param {number} i Index of first key
     * @param {number} j Index of second key
     * @returns {boolean} if key at index `i` is less than key at index`j`
     */
    less(i, j) {
        return compare(this._pq[i], this._pq[j]) < 0;
    }

    /**
     * Exchanges keys at indexes `i` and `j`.
     * @private
     * @param {number} i Index of first key
     * @param {number} j Index of second key
     * @returns {void}
     */
    exch(i, j) {
        [this._pq[i], this._pq[j]] = [this._pq[j], this._pq[i]]
    }

    /**
     * Bottom-up reheapify (maximum).
     * Algorithm to fix the heap order when a key becomes
     * __greater__ than its parent.
     * @private
     * @param {number} k Index of the key to _swim_.
     * @returns {void}
     */
    swim(k) {
        while(k > 1 && this.less(Math.floor(k / 2), k)) {
            this.exch(Math.floor(k / 2), k);
            k = Math.floor(k / 2);
        }
    }

    /**
     * Top-down reheapify (maximum).
     * Algorithm to fix the heap order when a key becomes
     * __smaller__ than a child.
     * @private
     * @param {number} k Index of the key to _sink_.
     * @returns {void}
     */
    sink(k) {
        while(2*k <= this._n) {
            let j = k*2;
            if (j < this._n && this.less(j, j+1)) j++;
            if (!this.less(k, j)) break;
            this.exch(k ,j);
            k = j;
        }
    }

    /**
     * Returns if the PQ is empty
     * @returns {boolean} if the PQ is empty
     */
    isEmpty() {
        return this._n === 0;
    }

    /**
     * Return PQ size
     * @returns  {number} the PQ size (total nodes)
     */
    size() {
        return this._n;
    }


    /**
     * Insert item into PQ and reheapify
     * @param {*} v key to be insert
     * @returns {void}
     */
    insert(v) {
        this._pq[++this._n] = v;
        this.swim(this._n);
    }

    /**
     * returns delete and return the maximum key
     * @returns {max} maximum value in PQ
     */
    delMax() {
        let max = this._pq[1];
        this.exch(1, this._n);
        this._n--;
        this._pq[this._n+1] = null;
        this.sink(1);
        return max;
    }

    /**
     * If PQ is empty then throw an error otherwise
     * return maximum value in PQ
     * @returns {max} maximum value in PQ;
     */
    max() {
        if (this._n === 0) {
            throw new ReferenceError('Priority queue is empty');
        }
        let max = this._pq[1];
        return max;
    }

}