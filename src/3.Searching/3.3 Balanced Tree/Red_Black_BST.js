import {compare} from "../../common/index.js";

class Node {
    constructor(key, val, left, right, size, color) {
        this.key = key;
        this.val = value;
        this.left = left;
        this.right = right;
        this.size = size;
        this.color = color;
    }
}

const RED = true;
const BLACK = false;

export class RedBlackBST {
    constructor() {
        this.root;
    }

    /***************************************************************************
    *  Node helper methods.
    ***************************************************************************/

    /**
     * Is node x is RED. false is null or not RED;
     * @param {Node | null} x 
     * @returns true | false
     */
    isRed(x) {
        if (x == null) return false;
        return x.color == RED;
    }

    /**
     * Returns the number of key value pairs in symbol table
     * @returns the number of key value pairs in symbol table
     */
    size() {
        return this._size(this.root);
    }
    // Number of nodes in subtree rooted at x; 0 is x is null
    _size(x) {
        if (this.root == null) {
            return 0;
        }
        return x.size;
    }

    /**
     * Is this symbol table empty?
     * @return {@code true} if this symbol table is empty and {@code false} otherwise
     */
    isEmpty() {
        return this.root == null;
    }

    /***************************************************************************
    *  Standard BST search.
    ***************************************************************************/

    /**
     * return the value associated with given key or null
     * @param {*} the key in symbol table 
     * @returns value associated with given key
     * @throws TypeError if key is null
     */
    get(key) {
        if (key == null) {
            throw new TypeError('argument key to put() can not be null');
        }
        if (this.isEmpty()) return null;
        return this._get(this.root, key);
    }
    // Return the value assocoated with the tree rooted at x
    _get(x, key) {
        while (x != null) {
            const cmp = compare(key, x.key);
            if (x < 0) x = x.left;
            else if (x > 0) x = x.right;
            else return x.val;
        }

        return null;
    }
   
    /**
     * Does this symbol table contain the given key?
     * @param {*} the key in symbol table
     * @returns true is key present in symbol table, false otherwise
     * @throws TypeError if key is null;
     */
    contains(key) {
        return this.get(key) !== null;
    }


    /***************************************************************************
    *  Red-black tree insertion.
    ***************************************************************************/
     /**
     * Insert is key is not present update otherwise;
     * Deletes the specified key (and its associated value) from this symbol table
     * if the specified value is {@code null}
     * @param {Comparale Type} the key in symbol table 
     * @param {any} the val  
     * @returns void
     */
     put(key, val) {
        if (key == null) {
            throw new TypeError('argument key to put() can not be null');
        }

        if (val == null) {

            return
        }

        this.root = this._put(this.root, key, val);
        this.root.color = BLACK;
    }

    // insert the key-value pair in the subtree rooted at h
    _put(x, key, val) {
        if (x == null) return new Node(key, val, null, null, 1, RED);

        const cmp = compare(key, x.key);
        if (cmp < 0)      x.left = this._put(x.left, key, val);
        else if (cmp > 0) x.right = this._put(x.right, key, val);
        else              x.val = val;

        if (this.isRed(x.right) && !this.isRed(x.left)) x = this.rotateLeft(x);
        if (this.isRed(x.left) && this.isRed(this.left.left)) x = this.rotateRight(x);
        if (this.isRed(x.left) && this.isRed(x.right)) this.flipColors(x);

        x.size = 1 + this._size(x.left) + this._size(x.right);
        return x;

    }
    /***************************************************************************
    *  Red-black tree deletion.
    ***************************************************************************/
    delet(key) {}
    delMin() {}
    delMax() {}

    /***************************************************************************
    *  Red-black tree helper functions.
    ***************************************************************************/
    // make a right-leaning link lean to the left
    rotateLeft(h) {
        const x = h.right;
        h.right = x.left;
        x.left  = h;
        x.color = h.color;
        h.color = RED;
        x.size  = h.size;
        h.size  = 1 + this._size(h.left) + this._size(h.right);
        return x;
    }

    // make a left-leaning link lean to the right
    rotateRight(h) {
        const x = h.left;
        h.left  = x.right;
        x.right = h;
        x.color = h.color;
        h.color = RED;
        x.size  = h.size;
        h.size  = 1 + this._size(h.left) + this._size(h.right);
        return x;
    }

    // flip the colors of a node and its two children
     flipColors(h) {
         h.color = RED;
         h.left.color = BLACK;
         h.right.color = BLACK;
     }
    
     /***************************************************************************
     *  Ordered symbol table methods.
     ***************************************************************************/
    /**
     * Return the smalles key in the symbol table
     * @returns Return the smalles key in the symbol table
     * @throws ReferenceError is symbol table is empty
     */
    min() {
         if (this.isEmpty()) {
             throw new ReferenceError('symbol table is underflow');
         }
         return this._min(this.root).key;
    }

    // the smallest key in subtree rooted at x; null if no such key
    _min(x) {
         if (x == null) throw new ReferenceError('calling _min() with null');
         if (x.left == null) return x;
         else                return this._min(x.left);
    }

    /**
     * return the maximum key in the symbol table
     * @returns return the maximum key in the symbol table
     * @throws ReferenceError issymbol table is empty
     */
    max() {
         if (this.isEmpty()) {
             throw new ReferenceError('symbol table is underflow');
         }
         return this._max(this.root).key;
    }
    // the maximum keu in the subtree rooted at x; null if not sucj  key
    _max(x) {
         if (x == null) throw new ReferenceError('calling _max() with null');
         if (x.right == null) return x;
         else                 return this._max(x.right);   
    }

    /**
     * Returns the largest key in the symbol table less than or equal to {@code key}.
     * @param key the key
     * @return the largest key in the symbol table less than or equal to {@code key}
     * @throws ReferenceError if {@code key} is {@code null}
     */
    floor(key) {
     if (key == null) throw new ReferenceError('argument to floor() can not be null');
     if (this.isEmpty()) throw new ReferenceError('symbol table is underflow');
     const x = this._floor(this.root, key);
    
     if (x == null) throw new ReferenceError('argument to floor() is too small');
     return x.key;
    
    }
    // the largest key in the subtree rooted at x less than or equal to the given key
    _floor(x, key) {
         if (x == null) return null;
         const cmp = compare(key, x.key);
         if (cmp === 0) return x;
         if (cmp < 0) return this._floor(x.left, key);
         const t = this._floor(x.right, key);
         if (t != null) return t;
         else return x;
    
    }

    /**
     * Returns the smallest key in the symbol table greater than or equal to {@code key}.
     * @param key the key
     * @return the smallest key in the symbol table greater than or equal to {@code key}
     * @throws ReferenceError if {@code key} is {@code null}
     */
    ceiling(key) {
     if (key == null) throw new ReferenceError('argument to ceiling() can not be null');
     if (this.isEmpty()) throw new ReferenceError('symbol table is underflow');
     const x = this._ceiling(this.root, key);
    
     if (x == null) throw new ReferenceError('argument to ceiling() is too small');
     return x.key;
    }
    // the smallest key in the subtree rooted at x greater than or equal to the given key
    _ceiling(x, key) {
         if (x == null) return null;
         const cmp = compare(key, x.key);
         if (cmp === 0) return x;
         if (cmp > 0) return this._ceiling(x.right, key);
         const t = this._ceiling(x.left, key);
         if (t != null) return t;
         else return x;
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
      *        <em>n</em>–1
      */
    select(rank) {
     if (rank < 0 || rank >= size()) {
         throw new ReferenceError("argument to select() is invalid: " + rank);
     }
     return this._select(this.root, rank);
    }
     // Return key in BST rooted at x of given rank.
     // Precondition: rank is in legal range.
    _select(x, rank) {
         if (x == null) return null;
         const  leftSize = this._size(x.left);
         if (leftSize > rank) return this._select(x.left, rank);
         else if (leftSize < rank) return this._select(x.right, rank - leftSize - 1);
         else return x.key;
    }

    /**
      * Return the number of keys in the symbol table strictly less than {@code key}.
      * @param key the key
      * @return the number of keys in the symbol table strictly less than {@code key}
      * @throws TypeError if {@code key} is {@code null}
      */
    rank(key) {
     if (key == null) throw new TypeError("argument to rank() is null");
     return this._rank(this.root, key);
    } 
    // number of keys less than key in the subtree rooted at x
    _rank(x, key) {
         if (x == null) return 0;
         const cmp = compare(key, x.key);
         if (cmp < 0) return this._rank(x.left, key);
         else if (cmp > 0) return 1 + this.size(x.left) + this._rank(x.right, key);
         else return this.size(x.left);
    }

}