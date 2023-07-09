import Queue_Linked_List from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js";
import {In, StdOut} from "../../libs/index.js";

const R = 256;
class Node {
    val;
    next = new Array(R).fill(null);
}
export class TriST {
    root;
    n;

    constructor() {
        this.n = 0;
        this.root = null;
    }

     /**
     * Returns the value associated with the given key.
     * @param key the key
     * @return the value associated with the given key if the key is in the symbol table and {@code null} if the key is not in the symbol table
     * @throws TypeError if {@code key} is {@code null}
     */
    get(key) {
        if (key == null) throw new TypeError('argument to get() is null');
        const x = this._get(this.root, key, 0);
        return x ? x.val : null;
    }
    
    _get(node, key, d) {
        if (node == null) return null;
        if (d === key.length) return node;
        const c = key.charCodeAt(d);
        return this._get(node.next[c], key,  d+1);
    }

    /**
     * Does this symbol table contain the given key?
     * @param key the key
     * @return {@code true} if this symbol table contains {@code key} and {@code false} otherwise
     * @throws TypeError if {@code key} is {@code null}
     */
    contains(key) {
        if (key == null) throw new TypeError('argument to contains() is null');
        const x = this.get(key);
        if (x == null) return false;
        return x.val != null
    }

    /**
     * Inserts the key-value pair into the symbol table, overwriting the old value
     * with the new value if the key is already in the symbol table.
     * If the value is {@code null}, this effectively deletes the key from the symbol table.
     * @param key the key
     * @param val the value
     * @throws TypeError if {@code key} is {@code null}
     */
    put(key, val) {
        if (key == null) throw new TypeError('argument to contains() is null');
        if (val == null) {
            this.delete(key);
            return;
        } 
        this.root = this._put(this.root, key, val, 0);
    }

    _put(node, key, val, d) {
        if (node == null) node = new Node();
        if (key.length == d) {
            if (node.val == null) this.n++;
            node.val = val;
            return node;
        }
        const c = key.charCodeAt(d);
        node.next[c] = this._put(node.next[c], key, val, d+1);
        return node;
    }

    /**
     * Returns the number of key-value pairs in this symbol table.
     * @return the number of key-value pairs in this symbol table
     */
    size() {
        return this.n;
    }

    /**
     * Is this symbol table empty?
     * @return {@code true} if this symbol table is empty and {@code false} otherwise
     */
    isEmpty() {
        return this.size() == 0;
    }

     /**
     * Returns all keys in the symbol table as an {@code Iterable}.
     * To iterate over all of the keys in the symbol table named {@code st},
     * use the foreach notation: {@code for (Key key : st.keys())}.
     * @return all keys in the symbol table as an {@code Iterable}
     */
    keys() {
        return this.keysWithPrefix(''); // Because by default val in Node is undefined
    }

    /**
     * Returns all of the keys in the set that start with {@code prefix}.
     * @param prefix the prefix
     * @return all of the keys in the set that start with {@code prefix},
     *     as an iterable
     */
    keysWithPrefix(prefix) {
        const queue = new Queue_Linked_List();
        const x = this._get(this.root, prefix, 0);
        this.collect(x, prefix, queue);
        return queue;
    }

    collect(node, pre, queue) {
        if (node == null) return;
        if (node.val !== undefined) queue.enqueue(pre); // can not use `if (node.val)` because val can be assigned with 0 and 0 is falsy;
        for (let c = 0; c < R; c++) {
            if (node.next[c]) this.collect(node.next[c], pre+String.fromCharCode(c), queue);            
        }
    }

    /**
     * Returns all of the keys in the symbol table that match {@code pattern},
     * where the character '.' is interpreted as a wildcard character.
     * @param pattern the pattern
     * @return all of the keys in the symbol table that match {@code pattern},
     *     as an iterable, where . is treated as a wildcard character.
     */
    keysThatMatch(pattern) {
        const queue = new Queue_Linked_List();
        this.collect1(this.root, '', pattern, queue);
        return queue;
    }

    collect1(node, prefix, pattern, queue) {
        if (node == null) return;
        const d = prefix.length;
        if (d == pattern.length && node.val != undefined) {
            queue.enqueue(prefix);
        }
        if (d == pattern.length) return;
        const ch = pattern[d];
        if (ch == '.') {
            for (let c = 0; c < R; c++) {
                if (node.next[c]) this.collect1(node.next[c], prefix+String.fromCharCode(c), pattern, queue);           
            }
        } else {
            const c = pattern.charCodeAt(d);
            this.collect1(node.next[c], prefix+ch, pattern, queue);
        }
    }

    /**
     * Returns the string in the symbol table that is the longest prefix of {@code query},
     * or {@code null}, if no such string.
     * @param query the query string
     * @return the string in the symbol table that is the longest prefix of {@code query},
     *     or {@code null} if no such string
     * @throws TypeError if {@code query} is {@code null}
     */
    longestPrefixOf(query) {
        if (query == null) throw new TypeError("argument to longestPrefixOf() is null");
        const len = this._longestPrefixOf(this.root, query, 0, -1);
        if (len == -1) return null;
        return query.substring(0, len);
    }

    _longestPrefixOf(node, query, d, len) {
        if (node == null) return len;
        if (node.val != undefined) len = d;
        if (d == query.length) return len;
        const c = query.charCodeAt(d);
        return this._longestPrefixOf(node.next[c], query, d+1, len);
    }

    delete(key) {
        if (key == null) throw new TypeError('argument to delete() is null');
        this.root = this._delete(this.root, key, 0);
    }
    _delete(node, key, d) {
        if (node == null) return null;
        if (d === key.length) {
            if (node.val != undefined) this.n--;
            node.val = undefined;
        } else {
            const c = key.charCodeAt(d);
            node.next[c] = this._delete(node.next[c], key, d+1);
        }

        if (node.val != undefined) return node;
        // In any where in next array some reference is  there then link should be preserved
        for (let c = 0; c < R; c++) {
            if (node.next[c] != null) return node;
        }
        return null;

    }


    static main() {
        const _in = new In('assets/shellsST.txt');
        const words = _in.readAllWords();

        const st = new TriST();
        for (let i = 0; i < words.length; i++) {
            st.put(words[i], i);
        }

        StdOut.println("keysThatMatch(\".he.l.\"):");
        for (const key of st.keysThatMatch('.he.l.')) {
            StdOut.println(key + ' ' + st.get(key));
        }
        StdOut.println();

        StdOut.println("keysWithPrefix(\"shor\"):");
        for (let s of st.keysWithPrefix("shor"))
            StdOut.println(s);
        StdOut.println();

        StdOut.println("longestPrefixOf(\"shellsort\"):");
        StdOut.println(st.longestPrefixOf("shellsort"));
        StdOut.println();

        StdOut.println("longestPrefixOf(\"quicksort\"):");
        StdOut.println(st.longestPrefixOf("quicksort"));
        StdOut.println();


        StdOut.println('Delet `shells`');
        st.delete('shells');
        StdOut.println('Does `shells` exists? ', st.contains('shells'), ' hence value is ', st.get('shells'));
        StdOut.println();
        StdOut.println('Remaining keys are')
        for (const key of st.keys()) {
            StdOut.printf(' %s', key);
        }
        StdOut.println();


    }
    

}