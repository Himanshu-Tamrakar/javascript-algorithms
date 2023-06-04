import Queue_Linked_List from "../../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js";
import { compare, hashCode,equals } from "../../../common/index.js";

// NOTE:
// Atleast m/8 should be filled after delete
// Atleast m/2 should be empty after insersion

export class LinearProbingHashST {
    // must be a power of 2
    static INIT_CAPACITY = 4;

    _keys;
    vals;
    n;
    m;
    constructor(m = LinearProbingHashST.INIT_CAPACITY) {
        this.m = m;
        this._keys = new Array(m);
        this.vals = new Array(m);
        this.n = 0;
    }

    /***************************************************************************
    *  helper methods.
    ***************************************************************************/
    isEmpty() {
     return this.size() === 0;
    }

    size() {
     return this.n;
    }

     // Hash function from text book
     hashTextBook(key) {
        return hashCode(key) & 0x7fffffff;
     }

    // hash function for keys - returns value between 0 and m-1 (assumes m is a power of 2)
    // (from Java 7 implementation, protects against poor quality hashCode() implementations)
    hash(key) {
        let h = hashCode(key);
        h ^= (h >>> 20) ^ (h >>> 12) ^ (h >>> 7) ^ (h >>> 4);
        return h & (this.m-1);
    }

    // resizes the hash table to the given capacity by re-hashing all of the keys
    resize(m) {
        let temp = new LinearProbingHashST(m);
        
        for (let i = 0; i < this.m; i++) {
            if (this._keys[i] != null)
                temp.put(this._keys[i], this.vals[i]);
        }

        this._keys = temp._keys;
        this.vals = temp.vals;
        this.m = m;
        temp = null; // releasing for garbage collector
    }

    /***************************************************************************
    *  Standard Hash Table search.
    ***************************************************************************/

    /**
     * Returns true if this symbol table contains the specified key.
     *
     * @param  key the key
     * @return {@code true} if this symbol table contains {@code key};
     *         {@code false} otherwise
     * @throws ReferenceError if {@code key} is {@code null}
     */
    contains(key) {
        if (key == null) {
            throw new TypeError('argument key in contains() is null');
        }

        return this.get(key) !== null;
    }

      /**
     * Returns the value associated with the specified key in this symbol table.
     *
     * @param  key the key
     * @return the value associated with {@code key} in the symbol table;
     *         {@code null} if no such value
     * @throws ReferenceError if {@code key} is {@code null}
     */
    get(key) {
        if (key == null) {
            throw new TypeError('argument key in get() is null');
        }

        if (this.isEmpty()) {
            return null;
        }

        let h = this.hash(key);
        while(this._keys[h] != null) {
            if (equals(this._keys[h], key)) {
                return this.vals[h];
            }

            h = (h + 1) % this.m;
        }

        return null;
    }

    /***************************************************************************
    *  Hash Table insertion/updatation.
    ***************************************************************************/

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
    put(key, val) {
        if (key == null) {
            throw new TypeError('argument key in put() can not be null');
        }

        if (val == null) {
            this.delete(key);
            return;
        }

        // double table size if 50% full
        if (this.n >= this.m/2) this.resize(2*this.m);

        let h;
        for (h = this.hash(key); this._keys[h] != null; h = ((h+1)%this.m)) {
            if (equals(this._keys[h], key)) {
                this.vals[h] = val;
                return;
            }            
        }
        this._keys[h] = key;
        this.vals[h] = val;
        this.n++;
        
    }

    /***************************************************************************
    *  Hash Table deletion.
    ***************************************************************************/

    delete(key) {
        if (key == null) {
            throw new TypeError('argument key in delete() is null');
        }

        // If key  not exists
        if (!this.contains(key)) return null;

        // Find the hash and matching key  index
        let h = this.hash(key);
        while(!this._keys[h] != null) {
            h = (h + 1) % this.m;
        }
        // delete key-val
        this._keys[h] = null;
        this.vals[h] = null;

        // Rehash until null key found
        h = (h + 1) % this.m;
        while (this._keys[h] != null) {
            const reHashKey = this._keys[h];
            const reHashVal = this.vals[h];
            this._keys[h] = null;
            this.vals[h] = null;
            this.n--;

            this.put(reHashKey, reHashVal);
            h = (h + 1) % this.m;
        }
        this.n--;

        if (this.n > 0 && this.n < (this.m / 8)) this.resize(this.m / 2);
    }

    /**************************************************************************
    * ORdered operation
    **************************************************************************/
    keys() {
        const queue = new Queue_Linked_List();

        const i = 0;
        for (let i = 0; i < this.m; i++) {
            if (this._keys[i] != null) queue.enqueue(this._keys[i]); 
        }
        return queue;
    }
}