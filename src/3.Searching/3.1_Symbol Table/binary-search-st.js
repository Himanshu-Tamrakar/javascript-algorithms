import {Queue} from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import {compare, equals} from "../../common/index.js";
import {In, StdIn, StdOut, StdRandom} from "../../libs/index.js";

const INIT_CAPACITY = 2;
export function BinarySeachSt(n = INIT_CAPACITY) {
    // this._keys = [];
    // this.vals = [];
    // this.N = 0;

    this._keys = new Array(n);
    this.vals = new Array(n);
    this.n = 0;
}

// resize the underlying arrays
BinarySeachSt.prototype.resize = function(capacity) {
    const keys = new Array(capacity);
    const vals = new Array(capacity);
    for (let i = 0; i < this.n; i++) {
        keys[i] = this._keys[i];
        vals[i] = this.vals[i];
    }
    this._keys = keys;
    this.vals = vals;
}

/**
 * Returns the number of key-value pairs in this symbol table.
 *
 * @return the number of key-value pairs in this symbol table
 */
BinarySeachSt.prototype.size = function() {
    return this.n;
}

/**
 * Returns true if this symbol table is empty.
 *
 * @return {@code true} if this symbol table is empty;
 *         {@code false} otherwise
 */
BinarySeachSt.prototype.isEmpty = function () {
    return this.n === 0;
}


/**
 * Does this symbol table contain the given key?
 *
 * @param  key the key
 * @return {@code true} if this symbol table contains {@code key} and
 *         {@code false} otherwise
 * @throws TypeError if {@code key} is {@code null}
 */
BinarySeachSt.prototype.contains = function (key) {
    if (key == null) {
        throw new TypeError('argument to contains() is null');
    }
    return this.get(key) != null;
}

/**
 * Returns the value associated with the given key in this symbol table.
 *
 * @param  key the key
 * @return the value associated with the given key if the key is in the symbol table
 *         and {@code null} if the key is not in the symbol table
 * @throws TypeError if {@code key} is {@code null}
 */
BinarySeachSt.prototype.get = function (key) {
    if (key == null) {
        throw new TypeError('argument to get() is null');
    }
    if (this.isEmpty()) {
        return null;
    }
    const i = this.rank(key);
    if (i < this.n && equals(this._keys[i], key)) {
        return this.vals[i];
    } 
    return null;
}

/**
 * Returns the number of keys in this symbol table strictly less than {@code key}.
 *
 * @param  key the key
 * @return the number of keys in the symbol table strictly less than {@code key}
 * @throws TypeError if {@code key} is {@code null}
 */
BinarySeachSt.prototype.rank = function (key) {
    if (key == null) throw new TypeError("argument to rank() is null");
    let lo = 0;
    let hi = this.n - 1;
    while (lo <= hi) {
        const mid = lo + Math.floor(((hi - lo) / 2));
        const cmp = compare(key, this._keys[mid]);

        if (cmp < 0) hi = mid - 1;
        else if (cmp > 0) lo = mid + 1;
        else return mid;
    }
    return lo;
}
// Same as rank justa recursive appoach
BinarySeachSt.prototype.rank_rec = function (key, lo, hi) {
    if (lo >= hi) return lo;
    const mid = lo + Math.floor((hi - lo) / 2);
    const cmp = compare(key, this._keys[mid]);
    if (cmp < 0) {
        return this.rank_rec(key, lo, mid - 1);
    } else if (cmp > 0) {
        return this.rank_rec(key, mid + 1, hi);
    } else {
        return mid;
    }
}

/**
 * Inserts the specified key-value pair into the symbol table, overwriting the old
 * value with the new value if the symbol table already contains the specified key.
 * Deletes the specified key (and its associated value) from this symbol table
 * if the specified value is {@code null}.
 *
 * @param  key the key
 * @param  val the value
 * @throws TypeError if {@code key} is {@code null}
 */
BinarySeachSt.prototype.put = function (key, val) {
    if (key == null) {
        throw new TypeError('argument key to get() is null');
    }
    if (val == null) {
        this.delete(key);
    }
    let i = this.rank(key);

    // Already in the table, i<this.n for first put
    if (i < this.n && equals(this._keys[i], key)) {
        this.vals[i] = val;
        return;
    }

    // insert new key-value pair
    if (this.n == this._keys.length) this.resize(2*this._keys.length);

    for (let j = this.n; j > i; j--) {
        this._keys[j] = this._keys[j - 1];
        this.vals[j]  = this.vals[j - 1];
    }

    this._keys[i] = key;
    this.vals[i]  = val;
    this.n++;
}

/**
 * Removes the specified key and associated value from this symbol table
 * (if the key is in the symbol table).
 *
 * @param  key the key
 * @throws IllegalArgumentException if {@code key} is {@code null}
 */
BinarySeachSt.prototype.delete = function(key) {
    if (key == null) {
        throw new TypeError('argument to delete() is null');
    }
    if (this.isEmpty()) return;

    const i = this.rank(key);

    if (i == this.n || !equals(this._keys[i], key)) {
        return null;
    }

    const tem = this.vals[i];
    for (let j = i; j < this.n-1; j++) {
        this._keys[j] = this._keys[j+1];
        this.vals[j]  = this.vals[j+1];
    }
    this.n--;
    delete this._keys[this.n];
    delete this.vals[this.n];

    if (this.n > 0 && this.n == Math.floor(this._keys.length/4)) this.resize(this._keys.length/2);
    return tem;
}

/**
  * Removes the smallest key and associated value from this symbol table.
  *
  * @throws ReferenceError if the symbol table is empty
  */
BinarySeachSt.prototype.delMin = function() {
    if (this.isEmpty()) {
        throw new ReferenceError('Symbol table underflow error');
    }
    this.delete(this.min());
}

/**
 * Removes the largest key and associated value from this symbol table.
 *
 * @throws ReferenceError if the symbol table is empty
 */
BinarySeachSt.prototype.delMax = function() {
    if (this.isEmpty()) {
        throw new ReferenceError('Symbol table underflow error');
    }
    this.delete(this.max());
}

/***************************************************************************
 *  Ordered symbol table methods.
 ***************************************************************************/

/**
  * Returns the smallest key in this symbol table.
  *
  * @return the smallest key in this symbol table
  * @throws ReferenceError if this symbol table is empty
  */
BinarySeachSt.prototype.min = function() {
    if (this.isEmpty()) {
        return null;
    }
    return this._keys[0];
}

/**
 * Returns the largest key in this symbol table.
 *
 * @return the largest key in this symbol table
 * @throws ReferenceError if this symbol table is empty
 */
BinarySeachSt.prototype.max = function() {
    if (this.isEmpty()) {
        return null;
    }
    return this._keys[this.n-1];
}


/**
 * Return the kth smallest key in this symbol table.
 *
 * @param  k the order statistic
 * @return the {@code k}th smallest key in this symbol table
 * @throws ReferenceError unless {@code k} is between 0 and
 *        <em>n</em>–1
 */
BinarySeachSt.prototype.select = function(i) {
    if (this.isEmpty() || i >= this.size()) {
        throw new ReferenceError('called select() with invalid argument: ' + k);
    }
    return this._keys[i];
}

/**
 * Returns the largest key in this symbol table less than or equal to {@code key}.
 *
 * @param {string}  key the key
 * @return the largest key in this symbol table less than or equal to {@code key}
 * @throws ReferenceError if there is no such key
 * @throws TypeError if {@code key} is {@code null}
 */
BinarySeachSt.prototype.floor = function(key) {
    if (key == null) {
        throw new TypeError('argument to floor() can not be null');
    }
    const rank = this.rank(key);
    if (rank < this.size() && equals(this._keys[rank], key)) {
        return this._keys[rank];
    }
    if (rank == 0) {
        throw new ReferenceError('argument to floor() is too small');
    } else {
        return this._keys[rank-1];
    }
}

/**
 * Returns the smallest key in this symbol table greater than or equal to {@code key}.
 *
 * @param {string} key the key
 * @return {string} the smallest key in this symbol table greater than or equal to {@code key}
 * @throws ReferenceError if there is no such key
 * @throws TypeError if {@code key} is {@code null}
 */
BinarySeachSt.prototype.ceiling = function(key) {
    if (key == null) {
        throw new TypeError('argument to ceiling() can not be null');
    }
    const i = this.rank(key);
    if (i == this.size()) {
        throw new ReferenceError('argument to ceiling() is too large');
    } else {
        return this._keys[i];
    }
}

/**
 * Returns all keys in this symbol table in the given range,
 * as an {@code Iterable}.
 * If range is nor given the return all keys from min to max
 * 
 * @param lo minimum endpoint
 * @param hi maximum endpoint
 * @return all keys in this symbol table between {@code lo}
 * (inclusive) and {@code hi} (inclusive)
 * @throws ReferenceError if either {@code lo} or {@code hi}
 * is {@code null}
 */
BinarySeachSt.prototype.keys = function (loKey = null, hiKey = null) {
    loKey = loKey || this.min();
    hiKey = hiKey || this.max();
    const queue = new Queue();
    for (let i = this.rank(loKey); i < this.rank(hiKey); i++) {
        queue.enqueue(this._keys[i]);
    }
    if (this.contains(hiKey)) queue.enqueue(this._keys[this.rank(hiKey)]);
    return queue;
}


BinarySeachSt.prototype[Symbol.iterator] = function() {
    let i = 0;
    let N = this.n;
    let keys = this._keys;
    return {
            next() {
                if (i < N) return { value: keys[i++], done: false };
                else return {value: null, done: true};
            },
            return(v) {
                return { value: v, done: true };
            }
        }
}

BinarySeachSt.main = function() {

    // const n = StdRandom.uniform(10, 50);
    // const keys = 'ABCDEFGHIJKLNOPQRSTUVWXYZ'.split('');
    // const st = new BinarySeachSt();
    // for (let i = 0; i < keys.length; i++) {
    //     st.put(keys[i], i);
        
    // }
    // for (const key of st) {
    //     console.log(key, ' : ', st.get(key));
    // }
    // StdOut.println('D: Delete, SB: ST Size Before Delete, DV: Deleted Item Value, SA: ST size after delete, TG: Try to get deleted item');
    // StdOut.println('D : SB : DV : SA : TG');
    // StdOut.println('---------------------')
    // keys.forEach(k => {
    //     const bsz  = st.size();
    //     const bval = st.delete(k);
    //     const asz  = st.size();
    //     const aval = st.get(k)
    //     console.log(`${k} : ${bsz} : ${bval} : ${asz} : ${aval}`);
    // })

    console.log('Enter word length: ');
    StdIn.read()
        .on('line', line => {
            const lineSplit = line.split(/\s+/);
            const len = parseInt(lineSplit[0]);
            let file = new In('assets/tinyTale.txt');
            const st = new BinarySeachSt();
            const w = file.readAllString();


            let distinct = 0, words = 0;
            let minlen = len;
    
            // compute frequency counts
            for (let k = 0; k < w.length; k++) {
                const key = w[k];
                if (key.length < minlen) continue;
                words++;
                if (st.contains(key)) {
                    st.put(key, st.get(key) + 1);
                }
                else {
                    st.put(key, 1);
                    distinct++;
                }
            }
    
            // find a key with the highest frequency count
            let max = "";
            st.put(max, 0);
            for (let w1 of st.keys()) {
                if (st.get(w1) > st.get(max))
                    max = w1;
            }
    
            StdOut.println(max + " " + st.get(max));
            StdOut.println("distinct = " + distinct);
            StdOut.println("words    = " + words);
        })




}