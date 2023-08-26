import { IndexMinPQ } from "../../2. Sorting/2.4_Priority_Queue/IndexMinPQ.js";
import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { In, StdOut } from "../../libs/index.js";
import { EdgeWeightedGraph } from './EdgeWeightedGraph.js';

/**
 *  Data files:   https://algs4.cs.princeton.edu/43mst/tinyEWG.txt
 *                https://algs4.cs.princeton.edu/43mst/mediumEWG.txt
 *                https://algs4.cs.princeton.edu/43mst/largeEWG.txt
 */
export class PrimMST {
    edgeTo; // edgeTo[v] = shortest edge from tree vertex to non-tree vertex
    distTo; // distTo[v] = weight of shortest such edge
    marked; // marked[v] = true if v on tree, false otherwise
    pq;

    /**
     * Compute a minimum spanning tree (or forest) of an edge-weighted graph.
     * @param G the edge-weighted graph
     */
    constructor(G) {
        this.edgeTo = new Array(G.V()).fill(null);
        this.distTo = Array(G.V()).fill(Number.POSITIVE_INFINITY);
        this.marked = Array(G.V()).fill(false);
        this.pq = new IndexMinPQ(G.V());

        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v])this.prim(G, v);
        }
    }

    // run Prim's algorithm in graph G, starting from vertex s
    prim(G, s) {
        this.distTo[s] = 0.0;
        this.pq.insert(s, this.distTo[s]);
        while(!this.pq.isEmpty()) {
            const v = this.pq.delMin();
            this.visit(G, v);
        }
    }

    // visit vertex v
    visit(G, v) {
        this.marked[v] = true;
        for (const e of G.adj(v)) {
            const w = e.other(v);
            if (this.marked[w]) continue;

            if (e.weight() < this.distTo[w]) {
                this.edgeTo[w] = e;
                this.distTo[w] = e.weight();
                if (this.pq.contains(w)) this.pq.decreaseKey(w, this.distTo[w]);
                else this.pq.insert(w, this.distTo[w])
            }
        }
    }

     /**
     * Returns the edges in a minimum spanning tree (or forest).
     * @return the edges in a minimum spanning tree (or forest) as an iterable of edges
     */
     edges() {
        const mst = new Queue();
        for (let v = 0; v < this.edgeTo.length; v++) {
            const e = this.edgeTo[v];
            if (e != null) {
                mst.enqueue(e);
            }
        }
        return mst;
    }

     /**
     * Returns the sum of the edge weights in a minimum spanning tree (or forest).
     * @return the sum of the edge weights in a minimum spanning tree (or forest)
     */
     weight() {
        let weight = 0;
        for (const e of this.edges())
            weight += e.weight();
        return weight;
    }

    /**
     * Unit tests the {@code PrimMST} data type.
     *
     * @param args the command-line arguments
     */
    static main() {
        // const _in = new In('assets/tinyEWG.txt');
        const _in = new In('assets/mediumEWG.txt');
        const G = new EdgeWeightedGraph(_in);
        const mst = new PrimMST(G);
        // StdOut.println('MST weight: %f', mst.weight());
        // StdOut.println('MST edges: %d', mst.edges().size());
        // for (let e of mst.edges()) {
        //     StdOut.println(e._toString());   
        // }

        return mst.edges();
    }
}



