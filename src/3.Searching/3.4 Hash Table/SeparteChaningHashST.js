import { SequencialST } from "../3.1_Symbol Table/SequencialST.js";
import { hashCode } from "../../common/hash.js";
import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { In, StdOut } from "../../libs/index.js";

export class SeparateChaningHashST {
    static INIT_CAPACITY = 4;

    n = 0;
    m = 0;

    constructor(m = SeparateChaningHashST.INIT_CAPACITY) {
        this.m = m;
        this.st = new Array(m);
        for (let i = 0; i < m; i++) {
            this.st[i] = new SequencialST();
        }
    }

    /***************************************************************************
    *  helper methods.
    ***************************************************************************/
     /**
     * Returns true if this symbol table is empty.
     *
     * @return {@code true} if this symbol table is empty;
     *         {@code false} otherwise
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * Returns the number of key-value pairs in this symbol table.
     *
     * @return the number of key-value pairs in this symbol table
     */
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

    // resize the hash table to have the given number of chains,
    // rehashing all of the keys
    resize(m) {
        const temp = new SeparateChaningHashST(m)
        for (let i = 0; i < this.m; i++) {
            const queue = this.st[i].keys();
            while(!queue.isEmpty()) {
                const key = queue.dequeue();
                temp.put(key, this.st[i].get(key));
            }
        }
        this.m  = temp.m;
        this.n  = temp.n;
        this.st = temp.st;
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
            return null;
        }
        return this.get(key) != null;
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
            throw new TypeError('argument to get() can not be null');
        }
    
        if (this.isEmpty()) {
            return null;
        }
        const h = this.hash(key);
        return this.st[h].get(key);
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
            throw new TypeError('argument key to put() can not be null');
        }

        if (val == null) {
            this.delete(key);
            return;
        }
        // double table size if average length of list >= 10
        if (this.n >= 10*this.m) this.resize(2*m);

        const h = this.hash(key);
        if (!this.st[h].contains(key)) this.n++;
        this.st[h].put(key, val);
    }

    /***************************************************************************
    *  Hash Table deletion.
    ***************************************************************************/
    /**
     * delete
     * @param {*} key 
     */
    delete(key) {
        if (key == null) {
            throw new TypeError('argument key to put() can not be null');
        }

        const h = this.hash(key);
        if (this.st[h].contains(key)) {
            this.n--;
        }
        this.st[h].delete(key);

         // halve table size if average length of list <= 2
         if (this.m > SeparateChaningHashST.INIT_CAPACITY && this.n <= 2*m) this.resize(m/2);
    }

    /**************************************************************************
    * ORdered operation
    **************************************************************************/
    keys() {
        const queue = new Queue();

        const st = this.st;
        st.forEach(sqst => {
            const q = sqst.keys();
            while(!q.isEmpty()) queue.enqueue(q.dequeue());
        });
        return queue;
    }

    static main() {
        let file = new In('assets/tinyTale.txt');
        const words = file.readAllString();
        const st = new SeparateChaningHashST();
  
        words.forEach(word => {
           let init_val = 1;
           if(st.contains(word)) {
              init_val = st.get(word) + 1;
           }
  
           st.put(word, init_val);
        });
  
        const queue = st.keys();
        while(!queue.isEmpty()) {
           const key = queue.dequeue();
           StdOut.printf('Key: %s, value: %d \n', key, st.get(key));
        }
     }   
}