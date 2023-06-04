import { Graph } from "./graph.js";
import { In, StdOut } from "../../libs/index.js";
import Bag from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js";
 export class CC {

    _id;
    _count;
    marked;
    constructor(G) {
        this._id = Array(G.V()).fill(-1);
        this.marked = Array(G.V()).fill(false);
        this._count = 0;

        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) {
                this.dfs(G, v);
                this._count++
            }
            
        }

    }

    dfs(G, s) {
        this.marked[s] = true;
        this._id[s] = this._count;
        for (const w of G.adj(s)) {
            if (!this.marked[w]) {
                this.dfs(G, w);
            }
        }
    }

    connected(v, w) {
        this.validate(v);
        return this._id[v] === this._id[w];
    }

    count() {
        return this._count;
    }

    id(v) {
        this.validate(v);
        return this._id[v];
    }

    validate(v) {
        if (v < 0 || v >= this._id.length) {

        }
    }

    static main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);
        const cc = new CC(G);
        const M = cc.count();
        const components = [];
        for (let i = 0; i < M; i++) {
            components[i] = new Bag();
        }

        for (let v = 0; v < G.V(); v++) {
            components[cc.id(v)].add(v);
        }

        for (let i = 0; i < M; i++) {
            StdOut.printf("Connected Component of %d: ", i);
            for (const w of components[i]) {
                StdOut.printf("%d ", w);
            }

            StdOut.println();
        }

    }
 }