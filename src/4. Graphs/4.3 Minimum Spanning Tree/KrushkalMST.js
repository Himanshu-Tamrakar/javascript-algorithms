import { WeightedQuichUnionUF } from "../../1. Fundamentals/1.5 Union FInd/weighet-quick-union/weighted-quick-union-uf.js";
import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { StdOut, In } from "../../libs/index.js";
import { EdgeWeightedGraph } from "./EdgeWeightedGraph.js";
export class KrushkalMST {
    mst;
    uf;
    _weight;
    constructor(G) {
        this.uf = new WeightedQuichUnionUF(G.V());
        this.mst = new Queue();
        this._weight = 0;
        let edges = new Array(G.E());
        let i = 0;
        for (const e of G.edges()) {
            edges[i++] = e;
        }

        edges = edges.sort((e1, e2) => e1.weight() - e2.weight());

        while(edges.length > 0 && this.mst.size() < G.V()-1) {
            const edge = edges.shift();
            const v = edge.either();
            const w = edge.other(v);
            if (!this.uf.connected(v, w)) {
                this.uf.union(v, w);
                this._weight += edge.weight();
                this.mst.enqueue(edge);
            }
        }

        

    }

    edges() {
        return this.mst;
    }

    weight() {
        return this._weight;
    }

    static main() {
        const _in = new In('assets/tinyEWG.txt');
        const G = new EdgeWeightedGraph(_in);

        const mst = new KrushkalMST(G);

        StdOut.println('MST weight: %f', mst.weight());

        for (const e of mst.edges()) {
            StdOut.println(e._toString());
        }
    }
}