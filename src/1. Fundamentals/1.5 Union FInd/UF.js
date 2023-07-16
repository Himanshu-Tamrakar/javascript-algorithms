import { In, StdIn, StdOut } from "../../libs/index.js";

/**
 * Compressed Weighted Quick Union
 * 
 */
export class UF {
    _count;
    parent;
    rank;

    /**
     * Initializes an empty union-find data structure with
     * {@code n} elements {@code 0} through {@code n-1}.
     * Initially, each element is in its own set.
     *
     * @param  n the number of elements
     * @throws Error if {@code n < 0}
     */
    constructor(v) {
        if (v < 1) {
            throw new Error('UF argument can not be zero or less');
        }
        this._count = v;
        this.parent = new Array(v);
        this.rank = new Array(v).fill(0);
        for (let i = 0; i < v; i++) {
            this.parent[i] = i;
        }
    }


    count() {
        return this._count;
    }

    /**
     * Returns the canonical element of the set containing element {@code p}.
     *
     * @param  p an element
     * @return the canonical element of the set containing {@code p}
     * @throws ReferenceError unless {@code 0 <= p < n}
     */
    find(p) {
        this.validate(p);
        while(p != this.parent[p]) {
            this.parent[p] = this.parent[this.parent[p]]; // Path Compression
            p = this.parent[p];
        }
        return p;
    }

     /**
     * Returns true if the two elements are in the same set.
     *
     * @param  p one element
     * @param  q the other element
     * @return {@code true} if {@code p} and {@code q} are in the same set;
     *         {@code false} otherwise
     * @throws ReferenceError unless
     *         both {@code 0 <= p < n} and {@code 0 <= q < n}
     * @deprecated Replace with two calls to {@link #find(int)}.
     */
     
    connected(p, q) {
        return this.find(p) == this.find(q);
    }

    /**
     * Merges the set containing element {@code p} with the set
     * containing element {@code q}.
     *
     * @param  p one element
     * @param  q the other element
     * @throws ReferenceError unless
     *         both {@code 0 <= p < n} and {@code 0 <= q < n}
     */
    union(p, q) {
        const rootP = this.find(p);
        const rootQ = this.find(q);

        if (rootP === rootQ) return;

        if      (this.rank[rootP] < this.rank[rootQ]) this.parent[rootP] = rootQ;
        else if (this.rank[rootP] > this.rank[rootQ]) this.parent[rootQ] = rootP;
        else {
            this.parent[rootQ] = rootP;
            this.rank[rootP]++;
        }

        this._count--;
    }

    // validate that p is a valid index
    validate(p) {
        const n = this.parent.length;
        if (p < 0 || p >= n) {
            throw new ReferenceError("index " + p + " is not between 0 and " + (n-1));
        }
    }

    static main() {
        // const file = new In('assets/tinyUF.txt');
        const file = new In('assets/largeUF.txt');
        const rows = file.readRawString().split('\n');
        const V = parseInt(rows.shift());
        const uf = new UF(V);

        rows.forEach(edge => {
            let [v, w] = edge.split(' ');
            v = parseInt(v);
            w = parseInt(w);

            if (uf.find(v) === uf.find(w)) return;
            uf.union(v, w);
        })

        StdOut.println('Total Connected Components: %d', uf.count());
    }
}