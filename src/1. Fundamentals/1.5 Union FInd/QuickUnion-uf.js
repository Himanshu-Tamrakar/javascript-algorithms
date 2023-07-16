/**
 * Analysis:
 * union; O(h)
 * find: O(h)
 * h(height) cound be 1 to N
 * dependes on sequesnce of input
 */
import { In, StdOut } from "../../libs/index.js";

export class QuickUnionUF {
    _count;  // number of components
    parent; // parent[i] = parent of i

    /**
     * Initializes an empty union-find data structure with
     * {@code n} elements {@code 0} through {@code n-1}.
     * Initially, each element is in its own set.
     *
     * @param  n the number of elements
     */
    constructor(v) {
        this._count = v;
        this.parent = new Array(v);
        for (let i = 0; i < v; i++) {
            this.parent[i] = i;
        }
    }

    /**
     * Returns the number of sets.
     *
     * @return the number of sets (between {@code 1} and {@code n})
     */
    count() {
        return this._count;
    }
    
    /**
     * Merges the set containing element {@code p} with the set
     * containing element {@code q}.
     *
     * @param  p one element
     * @param  q the other element
     * @throws ReferenceError unless both {@code 0 <= p < n} and {@code 0 <= q < n}
     */
    union(v, w) {
        const vRoot = this.find(v);
        const wRoot = this.find(w);

        if (vRoot === wRoot) return;
        this.parent[vRoot] = wRoot;
        this._count--;
    }

    /**
     * Returns the canonical element of the set containing element {@code p}.
     *
     * @param  p an element
     * @return the canonical element of the set containing {@code p}
     * @throws ReferenceError unless {@code 0 <= p < n}
     */
    find(v) {
        this.validate(v);
        while (v != this.parent[v] ) {
            v = this.parent[v];
        }

        return v;
    }

    /** Returns true if the two elements are in the same set.
     * @param  p one element
     * @param  q the other element
     * @return {@code true} if {@code p} and {@code q} are in the same set; {@code false} otherwise
     * @throws ReferenceError unless both {@code 0 <= p < n} and {@code 0 <= q < n}
     * @deprecated Replace with two calls to {@link #find(int)}.
     */
    connected(v, w) {
        this.validate(v);
        this.validate(w);
        return this.find(v) === this.find(w);
    }

   
    // validate that p is a valid index
    validate(v) {
        const n = this.parent.length;
        if (v < 0 || v >= n) {
            throw new ReferenceError("index " + v + " is not between 0 and " + (n-1))
        }
    }

    static main() {
        const file = new In('assets/tinyUF.txt');
        const rows = file.readRawString().split('\n');
        const V = parseInt(rows.shift());
        const uf = new QuickUnionUF(V);

        rows.forEach(edge => {
            let [v, w] = edge.split(' ');
            v = parseInt(v);
            w = parseInt(w);

            if (uf.find(v) === uf.find(w)) return;
            uf.union(v, w);
            StdOut.printf('%d %d\n', v, w);
        });

        StdOut.println('Total Connected Components: %d', uf.count());
    }
}