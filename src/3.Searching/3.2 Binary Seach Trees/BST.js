import { Queue_Linked_List } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js";
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
    constructor() {
        this.root;
    }

    isEmpty() {
        return this.size() === 0;
    }
    
    size() {
        return this._size(this.root);
    }
    _size(x) {
        if (x == null) return 0;
        return x.size;
    }
    min() {
        if (this.isEmpty()) {
            return null;
        }

        let x = this.root;

        while(x) {
            if (x.left) {
                x = x.left;
            } else {
                return x.key;
            }
        }
    }
    _min(node) {
        if (node.left == null) return node;
        else return this._min(node.left);
    }
    max() {
        if (this.isEmpty()) {
            return null;
        }

        let x = this.root;

        while(x) {
            if (x.right) {
                x = x.right;
            } else {
                return x.key;
            }
        }
    }
    _max(node) {
        if (node.right == null) return node;
        else return this._max(node.right);
    }
    contains(key) {
        const x = this.get(key);
        return x !== null; 
    }
    get(key) {
        if (key == null) {
            throw new TypeError('argument in put() can not be null');
        }
        return this._get(this.root, key);
    }
    _get(node, key) {
        if (node == null) return null;

        const cmp = compare(key, node.key);
        if (cmp < 0) return this._get(node.left, key);
        else if( cmp > 0) return this._get(node.right, key);
        else return node.value;
    }
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
    _put(node, key, value) {
        if (node == null) {
            return new Node(key, value, null, null, 1);
        }

        const cmp = compare(key, node.key);
        if (cmp < 0) {
            node.left = this._put(node.left, key, value);
        } else if (cmp > 0) {
            node.right = this._put(node.right, key, value);
        } else {
            node.value = value;
        }
        node.size = 1 + this._size(node.left) + this._size(node.right);
        return node;
    }

    floor(key) {
        if (key == null) {
            throw new TypeError('argument to floor() can not be null');
        }
        if (this.isEmpty()) {
            return null;
        }
        const x = this._floor(this.root, key)
        return x == null ? x : x.key;
    }
    _floor(node, key) {
        if (node == null) {
            return null;
        }

        const cmp = compare(key, node.key);
        if (cmp === 0) return node;
        if (cmp < 0) {
            return this._floor(node.left, key);
        }
        const x = this._floor(node.right, key);
        return x == null ? node : x;
    }
    ceiling(key) {
        if (key == null) {
            throw new TypeError('argument to floor() can not be null');
        }
        if (this.isEmpty()) {
            return null;
        }
        const x = this._ceiling(this.root, key);
        return x == null ? x : x.key;
    }
    _ceiling(node, key) {
        if (node == null) {
            return null;
        }
        const cmp = compare(key, node.key);
        if (cmp === 0) return node;
        if (cmp < 0) {
            const x = this._ceiling(node.left, key);
            return x == null ? node : x;
        } 
        return this._ceiling(node.right, key);
    }
    delete(key) {
        if (key == null) {
            throw new TypeError('argument to delete() can not be null');
        }

        if (this.isEmpty()) {
            throw new ReferenceError('Symbol table is underflow');
        }

        this.root = this._delete(this.root, key);

    }
    _delete(node, key) {
        if (node == null) return null;

        const cmp = compare(key, node.key);
        if (cmp < 0) node.left = this._delete(node.left, key);
        else if(cmp > 0) node.right = this._delete(node.right, key);
        else {
            if (node.right == null) return node.left;
            if (node.left == null) return node.right;
            const t = node;
            const node = this._min(node.right);
            node.right = this._delMin(t.right);
            node.left = t.left;
        }
        node.size = 1 + this._size(node.left) + this._size(node.right);
        return node;
    }
    delMin() {
        if (this.isEmpty()) {
            throw new ReferenceError('Symbol table is underflow');
        }
        this.root = this._delMin(this.root);
    }   
    _delMin(node) {
        if (node.left == null) {
            return node.right;
        }
        node.left = this._delMin(node.left);
        node.size = 1 + this._size(node.left) + this._size(node.right);
        return node;
    }
    delMax() {
        if (this.isEmpty()) {
            throw new ReferenceError('Symbol table is underflow');
        }
        this.root = this._delMax(this.root);
    }
    _delMax(node) {
        if (node.right == null) {
            return node.left;
        }

        node.right = this._delMax(node.right);
        node.size = 1 + this._size(node.left) + this._size(node.right);
        return node;
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
    select(i) {
        if (this.isEmpty()) {
            throw new ReferenceError('Symbol table is  underflow');
        }
        return this._select(this.root, i);
    }
    _select(node, rank) {
        if (node == null) return null;

        const leftsize = this.size(node.left);
        
        if (leftsize > rank) {
            return this._select(node.left, rank);
        } else if (leftsize < rank){
            return this.select(node.right, rank-leftsize-1);
        } else {
            return node.key;
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
    _rank(node, key) {
        if (node == null) return 0;

        const cmp = compare(key, node.key);
        if (cmp < 0) {
            return this._rank(node.left, key);
        } else if (cmp > 0) {
            return 1 + this.size(node.left) + this._rank(node.right, key);
        } else {
            return this.size(node.left);
        }
    }

    keys() {
        const queue = new Queue_Linked_List();
        this._keys(this.root, queue, this.min(), this.max());
        return queue;
    }
    _keys(node, queue, lo, hi) {
        if (node == null) return null;
        const cmplo = compare(lo, node.key);
        const cmphi = compare(hi, node.key);

        if (cmplo < 0) this._keys(node.left, queue, lo, hi);
        if (cmplo <= 0 && cmphi >= 0) queue.enqueue(node.key);
        if (cmphi > 0) this._keys(node.right, queue, lo, hi);
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
        console.log('Enter size of word');
        StdIn.read()
            .on('line', line => {
                const lineSplit = line.split(/\s+/);
                const len = parseInt(lineSplit[0]);
                let file = new In('assets/tinyTale.txt');
                const st = new BST();
                const words = file.readAllString();


                for (let i = 0; i < words.length; i++) {
                    const word = words[i];

                    if (word.length < len) continue;

                    if (!st.contains(word)) st.put(word, 1);
                    else st.put(word, st.get(word) + 1);
                }

              

                console.log('Printing all the keys');
                let res = '';
                for (const key of st) {
                    res += key + ', ';
                }
                console.log(res);

                console.log('Minimum is: %s', st.min());
                console.log('Maximum is: %s', st.max());
                console.log('Deleting Minimum, maximum');
                try {
                    st.delMin();
                    st.delMax();

                } catch(err) {
                    console.log(err.message);
                };
                console.log('Minimum is: %s', st.min());
                console.log('Maximum is: %s', st.max());

                console.log('Printing all keys');
                res = '';
                for (const key of st) {
                    res += key + ', ';
                }
                console.log(res);


                let max = '';
                st.put(max, 0);
                const queue = st.keys();
                while(!queue.isEmpty()) {
                    const word = queue.dequeue();
                    if (st.get(word) > st.get(max)) max = word;
                }

                StdOut.printf('Maximum count word is: %s and frequency is: %d', max, st.get(max));
            });
    }
}