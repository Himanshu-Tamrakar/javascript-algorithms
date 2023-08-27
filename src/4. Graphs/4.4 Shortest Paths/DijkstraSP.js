import {EdgeWeightedDigraph} from "./EdgeWeightedDigraph.js";
import { IndexMinPQ } from "../../2. Sorting/2.4_Priority_Queue/IndexMinPQ.js";
import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { In, StdOut } from "../../libs/index.js";

/**
 * Single source shortest pathe. Works only for non negetive edges.
 * 
 * Data files:   https://algs4.cs.princeton.edu/44sp/tinyEWD.txt
 *               https://algs4.cs.princeton.edu/44sp/mediumEWD.txt
 *               https://algs4.cs.princeton.edu/44sp/largeEWD.txt
 */
export class DijkstraSP {
    _edgeTo;    // _distTo[v] = distance  of shortest s->v path
    _distTo;    // _edgeTo[v] = last edge on shortest s->v path
    _pq;        // priority queue of vertices

    /**
     * Computes a shortest-paths tree from the source vertex {@code s} to every other
     * vertex in the edge-weighted digraph {@code G}.
     *
     * @param  G the edge-weighted digraph
     * @param  s the source vertex
     * @throws ReferenceError if an edge weight is negative
     * @throws ReferenceError unless {@code 0 <= s < V}
     */
    constructor(G, s) {
        // Dijlstra works only with positive edges
        for (const e of G.edges()) {
            if (e.weight() < 0)
                throw new TypeError("edge " + e + " has negative weight");
        }

        this._edgeTo = new Array(G.V()).fill(null);
        this._distTo = Array(G.V()).fill(Number.POSITIVE_INFINITY);
        this._pq = new IndexMinPQ(G.V());
        this.validateVertex(s);
        this._distTo[s] = 0;
        this._pq.insert(s, this._distTo[s]);

        while(!this._pq.isEmpty()) {
            this.relax(G, this._pq.delMin());
        }
    }

    relax(G, v) {
        for (const e of G.adj(v)) {
            const w = e.to();
            if (this._distTo[w] > this._distTo[v] + e.weight()) {
                this._distTo[w] = this._distTo[v] + e.weight();
                this._edgeTo[w] = e;

                if (this._pq.contains(w)) this._pq.decreaseKey(w, this._distTo[w]);
                else this._pq.insert(w, this._distTo[w]);
            }
        }
    }

    /**
     * Returns the length of a shortest path from the source vertex {@code s} to vertex {@code v}.
     * @param  v the destination vertex
     * @return the length of a shortest path from the source vertex {@code s} to vertex {@code v}; {@code Double.POSITIVE_INFINITY} if no such path
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    distTo(v) {
        this.validateVertex(v);
        return this._distTo[v];
    }

     /**
     * Returns true if there is a path from the source vertex {@code s} to vertex {@code v}.
     *
     * @param  v the destination vertex
     * @return {@code true} if there is a path from the source vertex
     *         {@code s} to vertex {@code v}; {@code false} otherwise
     * @throws IllegalArgumentException unless {@code 0 <= v < V}
     */
     hasPathTo(v) {
        this.validateVertex(v);
        return this._distTo[v] < Number.POSITIVE_INFINITY;
    }

    /**
     * Returns a shortest path from the source vertex {@code s} to vertex {@code v}.
     *
     * @param  v the destination vertex
     * @return a shortest path from the source vertex {@code s} to vertex {@code v}
     *         as an iterable of edges, and {@code null} if no such path
     * @throws IllegalArgumentException unless {@code 0 <= v < V}
     */
    pathTo(v) {
        this.validateVertex(v);
        if (!this.hasPathTo(v)) return null;
        const path = new Stack();
        let x = this._edgeTo[v];
        while(x !== null) {
            path.push(x);
            x = this._edgeTo[x.from()];
        }
        return path;
    }

     // throw an ReferenceError unless {@code 0 <= v < V}
     validateVertex(v) {
        const V = this._distTo.length;
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V-1));
    }

    /**
    * Unit tests the {@code DijkstraSP} data type.
    *
    * @param args the command-line arguments
    */
   static main() {
       const _in = new In('assets/tinyEWD.txt');
       const G = new EdgeWeightedDigraph(_in);
       const s = Number.parseInt(0);

       // compute shortest paths
       const sp = new DijkstraSP(G, s);


       // print shortest path
       for (let t = 0; t < G.V(); t++) {
           if (sp.hasPathTo(t)) {
               StdOut.printf("%d to %d (%f)  ", s, t, sp.distTo(t).toFixed(2));
               for (const e of sp.pathTo(t)) {
                   StdOut.printf(e._toString() + "  ");
               }
               StdOut.println();
           } else {
               StdOut.printf("%d to %d         no path\n", s, t);
           }
       }
   }
}