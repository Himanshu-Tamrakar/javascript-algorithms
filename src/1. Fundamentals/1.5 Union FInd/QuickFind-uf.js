import { In, StdIn, StdOut } from "../../libs/index.js";

export class QuickFindUF {
    _count; // total connected components
    id;     // id[i] = component identifier of i

    /**
     * Initializes an empty union-find data structure with
     * {@code n} elements {@code 0} through {@code n-1}.
     * Initially, each element is in its own set.
     *
     * @param  n the number of elements
     */
    constructor(n) {
        this._count = n;
        this.id = new Array(n);
        for (let i = 0; i < n; i++) {
            this.id[i] = i;
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
        this.validate(v);
        this.validate(w);
        const pID = this.find(v);
        const qID = this.find(w);
        if (pID === qID) return;
        const len = this.id.length;
        for (let i = 0; i < len; i++) {
            if (this.id[i] === pID) this.id[i] = qID;
        }
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
        return this.id[v];
    }

    /**
     * Returns true if the two elements are in the same set.
     *
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
        const n = this.id.length;
        if (v < 0 || v >= n) {
            throw new ReferenceError("index " + v + " is not between 0 and " + (n-1))
        }
    }

    static main() {
        const file = new In('assets/tinyUF.txt');
        const rows = file.readRawString().split('\n');
        const V = parseInt(rows.shift());
        const uf = new QuickFindUF(V);

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