/**
 * Analysis:
 * union; O(h)
 * find: O(h)
 * h(height) cound be 1 to N
 * dependes on sequesnce of input
 */
import { In, StdIn, StdOut } from "../../../libs/index.js";

export class QuickUnionUF {
    count;
    parent;
    constructor(v) {
        this.count = v;
        this.parent = new Array();
        for (let i = 0; i < v; i++) {
            this.parent[i] = i;
        }
    }
    
    /**
     * 
     * @param {*} v 
     * @param {*} w 
     * @returns 
     */
    union(v, w) {
        const vRoot = this.find(v);
        const wRoot = this.find(w);

        if (vRoot === wRoot) return;
        this.parent[vRoot] = wRoot;
        this.count--;
    }

    /**
     * 
     * @param {*} v 
     * @returns 
     */
    find(v) {
        this.validate(v);
        while (this.parent[v] != v) {
            v = this.parent[v];
        }

        return v;
    }

    /**
     * 
     * @param {*} v 
     * @param {*} w 
     * @returns 
     */
    connected(v, w) {
        return this.find(v) === this.find(w);
    }

    /**
     * 
     * @param {*} v 
     */
    validate(v) {
        const n = this.parent.length;
        if (v < 0 || v >= n) {
            throw new ReferenceError("index " + v + " is not between 0 and " + (n-1))
        }
    }
}