import { In, StdIn, StdOut } from "../../libs/index.js";

export class WeightedQuichUnionUF {
    parent;   // parent[i] = parent of i
    size;     // size[i] = number of elements in subtree rooted at i
    _count;     // number of components

    /**
     * Initializes an empty union-find data structure with
     * {@code n} elements {@code 0} through {@code n-1}.
     * Initially, each element is in its own set.
     *
     * @param  n the number of elements
     */
    constructor(v) {
        this._count = v;
        this.size = Array(v).fill(1);
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
     * @param  v one element
     * @param  w the other element
     * @throws IllegalArgumentException unless both {@code 0 <= v < n} and {@code 0 <= w < n}
     */
    union(v, w) {
        const vId = this.find(v);
        const wId = this.find(w);
        if (vId === wId) return;

        const sizeV = this.size[vId];
        const sizeW = this.size[wId];

        if (sizeV < sizeW) {
            this.parent[vId] = wId;
            this.size[wId] += this.size[vId]
        } else {
            this.parent[wId] = vId;
            this.size[vId] += this.size[wId];
        }
        this._count--;
    }

    /**
     * Returns the canonical element of the set containing element {@code v}.
     *
     * @param  v an element
     * @return the canonical element of the set containing {@code p}
     * @throws ReferenceError unless {@code 0 <= v < n}
     */
    find(v) {
        this.validate(v);
        while(this.parent[v] != v) {
            v = this.parent[v];
        }
        return v;
    }

    /**
    * Returns true if the two elements are in the same set.
    *
    * @param  v one element
    * @param  w the other element
    * @return {@code true} if {@code v} and {@code w} are in the same set;{@code false} otherwise
    * @throws ReferenceError unless both {@code 0 <= v < n} and {@code 0 <= w < n}
    * @deprecated Replace with two calls to {@link #find(int)}.
    */
    connected(v, w) {
        return this.find(v) === this.find(w);
    }

    // validate that v is a valid index
    validate(v) {
        if (v < 0 || v >= this.parent.length) {
            throw new ReferenceError("index " + v + " is not between 0 and " + (n-1))
        }
    }

    static main() {
        // const file = new In('assets/tinyUF.txt');
        const file = new In('assets/largeUF.txt');
        const rows = file.readRawString().split('\n');
        const V = parseInt(rows.shift());
        const uf = new WeightedQuichUnionUF(V);

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