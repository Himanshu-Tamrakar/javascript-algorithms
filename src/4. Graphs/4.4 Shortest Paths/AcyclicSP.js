import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph.js';
import { In, StdOut } from "../../libs/index.js";
import { Topological } from "../4.2Directed Graphs/topological.js";

/**
 * Data files:   https://algs4.cs.princeton.edu/44sp/tinyEWDAG.txt
 */
export class AcyclicSP {
    _distTo; // distTo[v] = distance  of shortest s->v path
    _edgeTo; // edgeTo[v] = last edge on shortest s->v path

    /**
     * Computes a shortest paths tree from {@code s} to every other vertex in
     * the directed acyclic graph {@code G}.
     * @param G the acyclic digraph
     * @param s the source vertex
     * @throws ReferenceError if the digraph is not acyclic
     * @throws ReferenceError unless {@code 0 <= s < V}
     */
    constructor(G, s) {
        this._distTo = Array(G.V()).fill(Number.POSITIVE_INFINITY);
        this._edgeTo = new Array(G.V());

        this.validateVertex(s);
        this._distTo[s] = 0.0;

        // visit vertices in topological order for EDGE WEIGHTED DIDRAPH
        const topological = new Topological(G);
        if (!topological.hasOrder())
            throw new ReferenceError("Digraph is not acyclic.");
        for (let v of topological.order()) {
            for (const e of G.adj(v))
                this.relax(e);
        }
    }

     // relax directed edge e
     relax(e) {
        const v = e.from(), w = e.to();
        if (this._distTo[w] > this._distTo[v] + e.weight()) {
            this._distTo[w] = this._distTo[v] + e.weight();
            this._edgeTo[w] = e;
        }
    }

    /**
     * Returns the length of a shortest path from the source vertex {@code s} to vertex {@code v}.
     * @param  v the destination vertex
     * @return the length of a shortest path from the source vertex {@code s} to vertex {@code v};
     *         {@code Double.POSITIVE_INFINITY} if no such path
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    distTo(v) {
        this.validateVertex(v);
        return this._distTo[v];
    }

    /**
     * Is there a path from the source vertex {@code s} to vertex {@code v}?
     * @param  v the destination vertex
     * @return {@code true} if there is a path from the source vertex
     *         {@code s} to vertex {@code v}, and {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    hasPathTo(v) {
        this.validateVertex(v);
        return this._distTo[v] < Number.POSITIVE_INFINITY;
    }

     /**
     * Returns a shortest path from the source vertex {@code s} to vertex {@code v}.
     * @param  v the destination vertex
     * @return a shortest path from the source vertex {@code s} to vertex {@code v}
     *         as an iterable of edges, and {@code null} if no such path
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
     pathTo(v) {
        this.validateVertex(v);
        if (!this.hasPathTo(v)) return null;
        const path = new Stack();
        for (let e = this._edgeTo[v]; e != null; e = this._edgeTo[e.from()]) {
            path.push(e);
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
     * Unit tests the {@code AcyclicSP} data type.
     *
     * @param args the command-line arguments
     */
     static main() {
        const _in = new In('assets/tinyEWDAG.txt');
        const s = 5;
        const G = new EdgeWeightedDigraph(_in);

        // find shortest path from s to each other vertex in DAG
        const sp = new AcyclicSP(G, s);
        for (let v = 0; v < G.V(); v++) {
            if (sp.hasPathTo(v)) {
                StdOut.printf("%d to %d (%f)  ", s, v, sp.distTo(v).toFixed(2));
                for (const e of sp.pathTo(v)) {
                    StdOut.printf(e._toString() + "   ");
                }
                StdOut.println();
            }
            else {
                StdOut.printf("%d to %d         no path\n", s, v);
            }
        }
    }
}