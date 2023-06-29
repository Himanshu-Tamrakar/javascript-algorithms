export class WeightedQuichUnionUF {
    count;
    size;
    parent;
    constructor(v) {
        this.count = v;
        this.size = Array(v).fill(1);
        this.parent = new Array(v);
        for (let i = 0; i < v; i++) {
            this.parent[i] = i;
        }
    }

    union(v, w) {
        const rootV = this.find(v);
        const rootW = this.find(w);
        if (rootV === rootW) return;

        const sizeV = this.size[rootV];
        const sizeW = this.size[rootW];

        if (sizeV < sizeW) {
            this.parent[rootV] = rootW;
            this.size[rootW] += this.size[rootV]
        } else {
            this.parent[rootW] = rootV;
            this.size[rootV] += this.size[rootW];
        }


        this.count--;

    }

    find(v) {
        this.validate(v);
        while(this.parent[v] != v) {
            v = this.parent[v];
        }
        return v;
    }
    connected(v, w) {
        return this.find(v) === this.find(w);
    }
    validate(v) {
        if (v < 0 || v >= this.parent.length) {
            throw new ReferenceError("index " + v + " is not between 0 and " + (n-1))
        }
    }
}