import { UF } from "../../1. Fundamentals/1.5 Union FInd/UF.js";
import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { StdOut, In } from "../../libs/index.js";
import { EdgeWeightedGraph } from "./EdgeWeightedGraph.js";

/**
 *  Data files:   https://algs4.cs.princeton.edu/43mst/tinyEWG.txt
 *                https://algs4.cs.princeton.edu/43mst/mediumEWG.txt
 *                https://algs4.cs.princeton.edu/43mst/largeEWG.txt
 */
export class KrushkalMST {
    mst = new Queue();          // edges in MST
    _weight = 0;                // weight of MST

    /**
     * Compute a minimum spanning tree (or forest) of an edge-weighted graph.
     * @param G the edge-weighted graph
     */
    constructor(G) {
        let edges = new Array(G.E());
        let t = 0;
        for (const e of G.edges()) {
            edges[t++] = e;
        }
        edges = edges.sort((e1, e2) => e1.weight() - e2.weight()); // Sort all edges according to wiegth
        
        const uf = new UF(G.V());
        for (let i = 0; i < G.E() && this.mst.size() < G.V(); i++) {
            const edge = edges[i];
            const v = edge.either();
            const w = edge.other(v);
            if (uf.find(v) !== uf.find(w)) {
                uf.union(v, w);
                this.mst.enqueue(edge);
                this._weight += edge.weight();
            }
        }
    }

    /**
     * Returns the edges in a minimum spanning tree (or forest).
     * @return the edges in a minimum spanning tree (or forest) as
     *    an iterable of edges
     */
    edges() {
        return this.mst;
    }

    /**
     * Returns the sum of the edge weights in a minimum spanning tree (or forest).
     * @return the sum of the edge weights in a minimum spanning tree (or forest)
     */
    weight() {
        return this._weight;
    }

    static main() {
        // const _in = new In('assets/tinyEWG.txt');
        const _in = new In('assets/mediumEWG.txt');
        const G = new EdgeWeightedGraph(_in);

        const mst = new KrushkalMST(G);

        // StdOut.println('MST weight: %f', mst.weight());
        // StdOut.println('MST edges: %d', mst.edges().size());

        // for (const e of mst.edges()) {
        //     StdOut.println(e._toString());
        // }

    }
}