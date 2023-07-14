import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { StdOut, In } from "../../libs/index.js";

class Node {
    ch;
    val;
    left;
    mid;
    right;
    constructor() {
        this.ch = undefined; //Character
        this.val = undefined; //value associated with key
        this.left = this.right = this.mid = null;
    }
}
export class TST {
    n;
    root;
    constructor() {
        this.n = 0;
        this.root = null;
    }

    /**
     * Returns the number of key-value pairs in this symbol table.
     * @return the number of key-value pairs in this symbol table
     */
    size() {
        return this.n;
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
     * Returns the value associated with the given key.
     * @param key the key
     * @return the value associated with the given key if the key is in the symbol table
     *     and {@code null} if the key is not in the symbol table
     * @throws TypeError if {@code key} is {@code null}
     */
     get(key) {
        if (key == null) {
            throw new TypeError("calls get() with null argument");
        }
        if (key.length == 0) throw new TypeError("key must have length >= 1");
        const x = this._get(this.root, key, 0);
        if (x == null) return null;
        return x.val;
    }
    _get(node, key, d) {
        if (node == null) return null;
        const ch = key[d];
        if (ch < node.ch) return this._get(node.left, key, d);
        else if (ch > node.ch) return this._get(node.right, key,  d);
        else if (d < key.length-1) return this._get(node.mid, key, d+1);
        else return node;
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
        if (key == null) throw new TypeError('calls put() with null key');
        if (!this.contains(key)) this.n++;
        else if (val == null) this.n--;

        this.root = this._put(this.root, key, val, 0);
    }
    _put(node, key, val,  d) {
        const ch = key[d];
        if (node == null) {
            node = new Node();
            node.ch = key[d];
        }

        if (ch < node.ch) node.left = this._put(node.left, key, val, d);
        else if (ch > node.ch) node.right = this._put(node.right, key, val, d);
        else if (d < key.length-1) node.mid = this._put(node.mid, key, val, d+1);
        else node.val = val;

        return node;
        
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
        if (query == null) throw new TypeError('calls longestPrefixOf() with null key');
        if (query.length == 0) return null;
        let len = 0;
        let x = this.root;
        let i = 0;
        while (x != null && i < query.length) {
            const ch = query[i];
            if (ch < x.ch) x = x.left;
            else if(ch > x.ch) x = x.right;
            else {
                i++;
                if (x.val != undefined) len = i;
                x = x.mid;
            }
        }

        return query.substring(0, len);

    }

     /**
     * Returns all keys in the symbol table as an {@code Iterable}.
     * To iterate over all of the keys in the symbol table named {@code st},
     * use the foreach notation: {@code for (Key key : st.keys())}.
     * @return all keys in the symbol table as an {@code Iterable}
     */
    keys() {
        const queue = new Queue();
        this.collect(this.root, '', queue);
        return queue;
    }

    /**
     * Returns all of the keys in the set that start with {@code prefix}.
     * @param prefix the prefix
     * @return all of the keys in the set that start with {@code prefix},
     *     as an iterable
     * @throws TypeError if {@code prefix} is {@code null}
     */
    keysWithPrefix(prefix) {
        if (prefix == null) {
            throw new TypeError("calls keysWithPrefix() with null argument");
        }
        const queue = new Queue();
        let x = this._get(this.root, prefix, 0);
        if (x == null) return queue;
        if (x.val != null) queue.enqueue(prefix);
        this.collect(x.mid, prefix, queue);
        return queue;
    }

    collect(node, pre, queue) {
        if (node == null) return;
        this.collect(node.left, pre, queue);
        if (node.val != undefined) queue.enqueue(pre + node.ch);
        this.collect(node.mid, pre+node.ch, queue);
        this.collect(node.right, pre, queue);
    }

    /**
     * Returns all of the keys in the symbol table that match {@code pattern},
     * where the character '.' is interpreted as a wildcard character.
     * @param pattern the pattern
     * @return all of the keys in the symbol table that match {@code pattern},
     *     as an iterable, where . is treated as a wildcard character.
     */
    keysThatMatch(pattern) {
        const queue = new Queue();
        this.collect1(this.root, '', 0, pattern, queue);
        return queue;
    }

    collect1(node, prefix, i, pattern, queue) {
        if (node == null) return;
        const ch = pattern[i];
        if (ch == '.' || ch < node.ch) this.collect1(node.left, prefix, i, pattern, queue);
        if (ch == '.' || ch == node.ch) {
            if (i == pattern.length-1 && node.val != undefined) queue.enqueue(prefix + node.ch);
            if (i < pattern.length-1) {
                this.collect1(node.mid, prefix+node.ch, i+1, pattern, queue);
            }
        }
        if (ch == '.' || ch > node.ch ) this.collect1(node.right, prefix, i, pattern, queue);
    }


    static main() {
        const _in = new In('assets/shellsST.txt');
        const words = _in.readAllWords();

        const st = new TST();
        for (let i = 0; i < words.length; i++) {
            st.put(words[i], i);
        }

        for (let key of st.keys()) {
            StdOut.println(key + " " + st.get(key));
        }
        StdOut.println();

        StdOut.println("longestPrefixOf(\"shellsort\"):");
        StdOut.println(st.longestPrefixOf("shellsort"));
        StdOut.println();

        StdOut.println("longestPrefixOf(\"shell\"):");
        StdOut.println(st.longestPrefixOf("shell"));
        StdOut.println();

        StdOut.println("keysWithPrefix(\"shor\"):");
        for (let s of st.keysWithPrefix("shor"))
            StdOut.println(s);
        StdOut.println();

        StdOut.println("keysThatMatch(\".he.l.\"):");
        for (let s of st.keysThatMatch(".he.l."))
            StdOut.println(s);
    }



}