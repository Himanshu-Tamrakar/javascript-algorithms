export class QuickFindUF {
    count; // total connected components
    id;
    constructor(n) {
        this.count = n;
        this.id = new Array(n);
        for (let i = 0; i < n; i++) {
            this.id[i] = i;
        }
        
    }

    /**
     * 
     * Changing pID with qID
     * @param {*} v 
     * @param {*} w 
     */    
    union(v, w) {
        const pID = this.find(v);
        const qID = this.find(w);
        if (pID === qID) return;
        const len = this.id.length;
        for (let i = 0; i < len; i++) {
            if (this.id[i] === pID) {
                this.id[i] = qID;
            }
            
        }
        this.count--;
    }

    find(v) {
        this.validate(v);
        return this.id[v];
    }

    connected(v, w) {
        return this.find(v) === this.find(w);
    }

    validate(v) {
        const n = this.id.length;
        if (v < 0 || v >= n) {
            throw new ReferenceError("index " + v + " is not between 0 and " + (n-1))
        }
    }
}