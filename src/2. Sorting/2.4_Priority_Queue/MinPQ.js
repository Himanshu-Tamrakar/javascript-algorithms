import { defaultComparator, compare } from "../../common/index.js";
import { Transaction } from "../../adts/index.js";
import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import {StdOut} from "../../libs/index.js";

export class MinPQ {

    /**
     * Initializes an empty priority queue with the given initial capacity.
     * Default value is 1;
     * @param  initCapacity the initial capacity of this priority queue
     */
    constructor(min = 1) {
        this._n = 0; // initial size
        this._pq = []; // default initialization

        if (typeof min === 'number' && Number.isInteger(min) && min > 0) {
            this._pq = new Array(min+1);
        } else if(Array.isArray(min)) {
            // Implement pq with array value
        }

        Object.seal(this);
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

    resize(capacity) {
        if (capacity <= this._n) throw Error('resize');

        const copyPQ = new Array(capacity);
        for (let i = 0; i <= this._n; i++) {
            copyPQ[i] = this._pq[i];
        }
        this._pq = copyPQ;
    }


    /**
     * Insert item into PQ and reheapify
     * @param {*} v key to be insert
     * @returns {void}
     */
    insert(v) {
        // double size of array if necessary
        if (this._n == this._pq.length - 1) this.resize(2 * this._pq.length);

        this._pq[++this._n] = v;
        this.swim(this._n);
    }

    /**
     * returns delete and return the minimum key
     * @returns {min} minimum value in PQ
     */
    delMin() {
        let min = this._pq[1];
        this.exch(1, this._n);
        this._n--;
        this._pq[this._n+1] = null;
        this.sink(1);

        if ((this._n > 0) && (this._n == Math.floor((this._pq.length - 1) / 4))) this.resize(Math.floor(this._pq.length / 2));
        return min;
    }

    /**
     * If PQ is empty then throw an error otherwise
     * return minimum value in PQ
     * @returns {min} minimum value in PQ;
     */
    min() {
        if (this._n === 0) {
            throw new ReferenceError('Priority queue is empty');
        }
        let min = this._pq[1];
        return min;
    }

    /***************************************************************************
    * Helper functions to restore the heap invariant.
    ***************************************************************************/
    /**
     * Bottom-up reheapify (minimum).
     * Algorithm to fix the heap order when a key becomes
     * __greater__ than its parent.
     * @private
     * @param {number} k Index of the key to _swim_.
     * @returns {void}
     */
    swim(k) {
        while(k > 1 && this.greater(Math.floor(k / 2), k)) {
            this.exch(Math.floor(k / 2), k);
            k = Math.floor(k / 2);
        }
    }

    /**
     * Top-down reheapify (minimum).
     * Algorithm to fix the heap order when a key becomes
     * __smaller__ than a child.
     * @private
     * @param {number} k Index of the key to _sink_.
     * @returns {void}
     */
    sink(k) {
        while(2*k <= this._n) {
            let j = k*2;
            if (j < this._n && this.greater(j, j+1)) j++;
            if (!this.greater(k, j)) break;
            this.exch(k ,j);
            k = j;
        }
    }

    /***************************************************************************
    * Helper functions for compares and swaps.
    ***************************************************************************/

    /**
     * Compares if key at index `i` is greater than key at index `j`.
     * @private
     * @param {number} i Index of first key
     * @param {number} j Index of second key
     * @returns {boolean} if key at index `i` is greater than key at index`j`
     */
    greater(i, j) {
        return compare(this._pq[i], this._pq[j]) > 0;
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

    static main() {
        const data = [
        'Turing~6/17/1990~644.08',
        'vonNeumann~3/26/2002~4121.85',
        'Dijkstra~8/22/2007~2678.40',
        'vonNeumann~1/11/1999~4409.74',
        'Dijkstra~11/18/1995~837.42',
        'Hoare~5/10/1993~3229.27',
        'vonNeumann~2/12/1994~4732.35',
        'Hoare~8/18/1992~4381.21',
        'Turing~1/11/2002~66.10',
        'Thompson~2/27/2000~4747.08',
        'Turing~2/11/1991~2156.86',
        'Hoare~8/12/2003~1025.70',
        'vonNeumann~10/13/1993~2520.97',
        'Dijkstra~9/10/2000~708.95',
        'Turing~10/12/1993~3532.36',
        'Hoare~2/10/2005~4050.20'
    ]
            
        const transactions = data.map(tran => {
            const val = tran.split('~');
            return (new Transaction(val[0], val[1], Number(val[2])));
        });

        const size = 7
        const pq = new MinPQ(size+1);
        transactions.forEach(t => {
            pq.insert(t);
            if (pq.size() > size) pq.delMin();
        });

        let stack = new Stack();
        
        while(!pq.isEmpty()) {
            stack.push(pq.delMin());
        }

        while(!stack.isEmpty()) {
            console.log(stack.pop());
        }

    }

}