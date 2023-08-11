import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { compare } from "../../common/index.js";
import { StdIn, StdOut, In, StdRandom } from "../../libs/index.js";
class Node {
    constructor(key, value, left, right, size) {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
        this.size = size;
    }
}
export class BST {
    root;
    constructor() {
        this.root;
    }

    /**
     * Returns true if this symbol table is empty.
     * @return {@code true} if this symbol table is empty; {@code false} otherwise
     */
    isEmpty() {
        return this.size() === 0;
    }
    
    /**
     * Returns the number of key-value pairs in this symbol table.
     * @return the number of key-value pairs in this symbol table
     */
    size() {
        return this._size(this.root);
    }

    // return number of key-value pairs in BST rooted at x
    _size(x) {
        if (x == null) return 0;
        return x.size;
    }

    /**
     * Does this symbol table contain the given key?
     *
     * @param  key the key
     * @return {@code true} if this symbol table contains {@code key} and
     * {@code false} otherwise
     * @throws TypeError if {@code key} is {@code null}
     */
    contains(key) {
        if (key == null) throw new TypeError("argument to contains() is null");
        const x = this.get(key);
        return x !== null; 
    }

    /**
     * Returns the value associated with the given key.
     *
     * @param  key the key
     * @return the value associated with the given key if the key is in the symbol table
     * and {@code null} if the key is not in the symbol table
     * @throws TypeError if {@code key} is {@code null}
     */
    get(key) {
        if (key == null) throw new TypeError('argument in put() can not be null');
        return this._get(this.root, key);
    }
    _get(x, key) {
        if (x == null) return null;
        const cmp = compare(key, x.key);
        if     (cmp < 0) return this._get(x.left, key);
        else if(cmp > 0) return this._get(x.right, key);
        else             return x.value;
    }

    /**
     * Inserts the specified key-value pair into the symbol table, overwriting the old
     * value with the new value if the symbol table already contains the specified key.
     * Deletes the specified key (and its associated value) from this symbol table
     * if the specified value is {@code null}.
     *
     * @param  key the key
     * @param  value the value
     * @throws TypeError if {@code key} is {@code null}
     */
    put(key, value) {
        if (key == null) {
            throw new TypeError('argumarnt to put() can not be null');
        }
        if (value == null) {
            this.delete(key);
            return;
        }
        this.root = this._put(this.root, key, value);
    }
    _put(x, key, value) {
        if (x == null) {
            return new Node(key, value, null, null, 1);
        }
        const cmp = compare(key, x.key);
        if     (cmp < 0) x.left = this._put(x.left, key, value);
        else if(cmp > 0) x.right = this._put(x.right, key, value);
        else             x.value = value;

        x.size = 1 + this._size(x.left) + this._size(x.right);
        return x;
    }

    /**
     * Removes the smallest key and associated value from the symbol table.
     *
     * @throws ReferenceError if the symbol table is empty
     */
    delMin() {
        if (this.isEmpty()) throw new ReferenceError('Symbol table is underflow');
        this.root = this._delMin(this.root);
    }   
    _delMin(x) {
        if (x.left == null) return x.right;
        x.left = this._delMin(x.left);
        x.size = 1 + this._size(x.left) + this._size(x.right);
        return x;
    }

    /**
     * Removes the largest key and associated value from the symbol table.
     *
     * @throws ReferenceError if the symbol table is empty
     */
    delMax() {
        if (this.isEmpty()) throw new ReferenceError('Symbol table is underflow');
        this.root = this._delMax(this.root);
    }
    _delMax(x) {
        if (x.right == null) return x.left;
        x.right = this._delMax(x.right);
        x.size = 1 + this._size(x.left) + this._size(x.right);
        return x;
    }

    /**
     * Removes the specified key and its associated value from this symbol table
     * (if the key is in this symbol table).
     *
     * @param  key the key
     * @throws TypeError if {@code key} is {@code null}
     */
    delete(key) {
        if (key == null) throw new TypeError('argument to delete() can not be null');
        this.root = this._delete(this.root, key);
    }
    _delete(x, key) {
        if (x == null) return null;

        const cmp = compare(key, x.key);
        if      (cmp < 0) x.left  = this._delete(x.left,  key);
        else if (cmp > 0) x.right = this._delete(x.right, key);
        else {
            if (x.right == null) return x.left;
            if (x.left  == null) return x.right;
            const t = x;
            x = this._min(t.right);
            x.right = this._delMin(t.right);
            x.left = t.left;
        }
        x.size = this.size(x.left) + this.size(x.right) + 1;
        return x;
    }


    /**
     * Returns the smallest key in the symbol table.
     *
     * @return the smallest key in the symbol table
     * @throws ReferenceError if the symbol table is empty
     */
    min() {
        if (this.isEmpty()) return null;
        let x = this.root;
        while(x) {
            if (x.left) {
                x = x.left;
            } else {
                return x.key;
            }
        }
    }
    _min(x) {
        if (x.left == null) return x;
        else return this._min(x.left);
    }

    /**
     * Returns the largest key in the symbol table.
     *
     * @return the largest key in the symbol table
     * @throws ReferenceError if the symbol table is empty
     */
    max() {
        if (this.isEmpty()) return null;
        let x = this.root;
        while(x) {
            if (x.right) {
                x = x.right;
            } else {
                return x.key;
            }
        }
    }
    _max(x) {
        if (x.right == null) return x;
        else return this._max(x.right);
    }
   
    /**
     * Returns the largest key in the symbol table less than or equal to {@code key}.
     *
     * @param  key the key
     * @return the largest key in the symbol table less than or equal to {@code key}
     * @throws TypeError if {@code key} is {@code null}
     */
    floor(key) {
        if (key == null) throw new TypeError('argument to floor() can not be null');
        if (this.isEmpty()) return null;
        const x = this._floor(this.root, key)
        return x == null ? x : x.key;
    }
    _floor(x, key) {
        if (x == null) return null;
        const cmp = compare(key, x.key);
        if (cmp === 0) return x;
        if (cmp < 0) return this._floor(x.left, key);
        const t = this._floor(x.right, key);
        return t != null ? t : x;
    }

    floor2(key) {
        const x = this._floor2(this.root, key, null);
        if (x == null) throw new ReferenceError("argument to floor() is too small");
        else return x;

    }
    _floor2(x, key, best) {
        if (x == null) return best;
        const cmp = compare(key, x.key);
        if      (cmp  < 0) return this._floor2(x.left, key, best);
        else if (cmp  > 0) return this._floor2(x.right, key, x.key);
        else               return x.key;
    }

    /**
     * Returns the smallest key in the symbol table greater than or equal to {@code key}.
     *
     * @param  key the key
     * @return the smallest key in the symbol table greater than or equal to {@code key}
     * @throws TypeError if {@code key} is {@code null}
     */
    ceiling(key) {
        if (key == null) throw new TypeError('argument to floor() can not be null');
        if (this.isEmpty()) return null;
        const x = this._ceiling(this.root, key);
        return x == null ? x : x.key;
    }
    _ceiling(x, key) {
        if (x == null) return null;
        const cmp = compare(key, x.key);
        if (cmp === 0) return x;
        if (cmp < 0) {
            const t = this._ceiling(x.left, key);
            return t != null ? t : x;
        } 
        return this._ceiling(x.right, key);
    }
    
    
     /**
     * Return the key in the symbol table of a given {@code rank}.
     * This key has the property that there are {@code rank} keys in
     * the symbol table that are smaller. In other words, this key is the
     * ({@code rank}+1)st smallest key in the symbol table.
     *
     * @param  rank the order statistic
     * @return the key in the symbol table of given {@code rank}
     * @throws ReferenceError unless {@code rank} is between 0 and
     * <em>n</em>–1
     */
    select(i) {
        if (this.isEmpty()) throw new ReferenceError('Symbol table is  underflow');
        return this._select(this.root, i);
    }
    _select(x, rank) {
        if (x == null) return null;

        const leftsize = this.size(x.left);
        
        if (leftsize > rank) {
            return this._select(x.left, rank);
        } else if (leftsize < rank){
            return this.select(x.right, rank-leftsize-1);
        } else {
            return x.key;
        }
    }

     /**
     * Return the number of keys in the symbol table strictly less than {@code key}.
     *
     * @param  key the key
     * @return the number of keys in the symbol table strictly less than {@code key}
     * @throws ReferenceError if {@code key} is {@code null}
     */
    rank(key) {
        if (key == null) throw new ReferenceError("argument to rank() is null");
        return this._rank(this.root, key);
    }
    // Number of keys in the subtree less than key.
    _rank(x, key) {
        if (x == null) return 0;

        const cmp = compare(key, x.key);
        if (cmp < 0) {
            return this._rank(x.left, key);
        } else if (cmp > 0) {
            return 1 + this.size(x.left) + this._rank(x.right, key);
        } else {
            return this.size(x.left);
        }
    }

    keys() {
        const queue = new Queue();
        this._keys(this.root, queue, this.min(), this.max());
        return queue;
    }
    _keys(x, queue, lo, hi) {
        if (x == null) return null;
        const cmplo = compare(lo, x.key);
        const cmphi = compare(hi, x.key);

        if (cmplo < 0) this._keys(x.left, queue, lo, hi);
        if (cmplo <= 0 && cmphi >= 0) queue.enqueue(x.key);
        if (cmphi > 0) this._keys(x.right, queue, lo, hi);
    }
    
    [Symbol.iterator]() {
        const queue = this.keys();
        return {
            next() {
                if (!queue.isEmpty()) {
                    return {value: queue.dequeue(), done: false};
                }
                return {value:null, done: true}
            },
            return(v) {
                return {value: v, done: true}
            }
        }
    }


    static main() {
        const keys = 'ABCDEFGHIJKLNOPQRSTUVWXYZ'.split('');
        const st = new BST();
        for (let i = 0; i < keys.length; i++) {
            st.put(keys[i], i);
            
        }
        for (const key of st) {
            console.log(key, ' : ', st.get(key));
        }
        StdOut.println('D: Delete, SB: ST Size Before Delete, SA: ST size after delete, TG: Try to get deleted item');
        StdOut.println('D : SB  : SA : TG');
        StdOut.println('---------------------')
        keys.forEach(k => {
            const bsz  = st.size();
            st.delete(k);
            const asz  = st.size();
            const aval = st.get(k)
            console.log(`${k} : ${bsz} : ${asz} : ${aval}`);
        })

        // console.log('Enter size of word');
        // StdIn.read()
        //     .on('line', line => {
        //         const lineSplit = line.split(/\s+/);
        //         const len = parseInt(lineSplit[0]);
        //         let file = new In('assets/tinyTale.txt');
        //         const st = new BST();
        //         const words = file.readAllString();


        //         for (let i = 0; i < words.length; i++) {
        //             const word = words[i];

        //             if (word.length < len) continue;

        //             if (!st.contains(word)) st.put(word, 1);
        //             else st.put(word, st.get(word) + 1);
        //         }

              

        //         console.log('Printing all the keys');
        //         let res = '';
        //         for (const key of st) {
        //             res += key + ', ';
        //         }
        //         console.log(res);

        //         console.log('Minimum is: %s', st.min());
        //         console.log('Maximum is: %s', st.max());
        //         console.log('Deleting Minimum, maximum');
        //         try {
        //             st.delMin();
        //             st.delMax();

        //         } catch(err) {
        //             console.log(err.message);
        //         };
        //         console.log('Minimum is: %s', st.min());
        //         console.log('Maximum is: %s', st.max());

        //         console.log('Printing all keys');
        //         res = '';
        //         for (const key of st) {
        //             res += key + ', ';
        //         }
        //         console.log(res);


        //         let max = '';
        //         st.put(max, 0);
        //         const queue = st.keys();
        //         while(!queue.isEmpty()) {
        //             const word = queue.dequeue();
        //             if (st.get(word) > st.get(max)) max = word;
        //         }

        //         StdOut.printf('Maximum count word is: %s and frequency is: %d', max, st.get(max));
        //     });
    }
}