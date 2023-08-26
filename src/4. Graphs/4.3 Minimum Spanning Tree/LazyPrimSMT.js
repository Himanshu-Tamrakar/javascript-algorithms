import { MinPQ } from '../../2. Sorting/2.4_Priority_Queue/MinPQ.js';
import { Queue } from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js';
import {In, StdOut} from '../../libs/index.js';
import { EdgeWeightedGraph }from './EdgeWeightedGraph.js'

/**
 * Data files: https://algs4.cs.princeton.edu/43mst/tinyEWG.txt
 *             https://algs4.cs.princeton.edu/43mst/mediumEWG.txt
 *             https://algs4.cs.princeton.edu/43mst/largeEWG.txt
 *
 */
export class LazyPrimMST {
    pq;         // edges with one endpoint in tree
    mst;        // edges in the MST
    marked;     // marked[v] = true iff v on tree
    _weight = 0;    // total weight of MST

    /**
     * Compute a minimum spanning tree (or forest) of an edge-weighted graph.
     * @param G the edge-weighted graph
     */
    constructor(G) {
        this.mst = new Queue();
        this.pq = new MinPQ(G.V());
        this.marked = new Array(G.V()).fill(false);

        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) this.prim(G, v);
        }
    }

    // run Prim's algorithm
    prim(G, s) {
        this.visit(G, s);
        while(!this.pq.isEmpty()) {
            const e = this.pq.delMin();
            const v = e.either();
            const w = e.other(v);
            const weight = e.weight();
            if (this.marked[v] && this.marked[w]) continue;

            this.mst.enqueue(e);
            this._weight += e.weight();
            if (!this.marked[v]) this.visit(G, v);
            if (!this.marked[w]) this.visit(G, w);
        }
    }
    // add all edges e incident to v onto pq if the other endpoint has not yet been visit
    visit(G, v) {
        this.marked[v] = true;
        for (const e of G.adj(v)) {
            const w = e.other(v);
            if (!this.marked[w]) this.pq.insert(e);
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

        const mst = new LazyPrimMST(G);

        // StdOut.println('MST weight: %f', mst.weight());
        // StdOut.println('MST edges: %d', mst.edges().size());

        // for (const e of mst.edges()) {
        //     StdOut.println(e._toString());
        // }
        return mst.edges();
    }
}