import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { Graph } from "./graph.js";
import { In, StdOut } from "../../libs/index.js";

export class Bipartite {
    _isBipartite; // is the graph bipartite?
    _color;       // color[v] gives vertices on one side of bipartition
    marked;      // marked[v] = true iff v has been visited in DFS
    edgeTo;      // edgeTo[v] = last edge on path to v
    _cycle;       // odd-length cycle

    /**
     * Determines whether an undirected graph is bipartite and finds either a
     * bipartition or an odd-length cycle.
     *
     * @param  G the graph
     */
    constructor(G) {

        this._isBipartite = true;
        this._color  = new Array(G.V()).fill(false);
        this.marked = new Array(G.V()).fill(false);
        this.edgeTo = new Array(G.V());

        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) {
                this.dfs(G, v);
            }
        }
    }

    dfs(G, v) {
        this.marked[v] = true;
        for (const w of G.adj(v)) {
            // short circuit if odd-length cycle found
            if (this._cycle != null) return;

            // found uncolored vertex, so recur
            if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this._color[w] = !this._color[v];
                this.dfs(G, w);
            }
            // if v-w create an odd-length cycle, find it; 
            else  if (this._color[w] === this._color[v]) {
                this._isBipartite = false;
                this._cycle = new Stack();
                this._cycle.push(w);
                for (let x = v; x != w; x = this.edgeTo[x]) {
                    this._cycle.push(x);
                }
                this._cycle.push(w);
            }
        }
    }

    /**
     * Returns true if the graph is bipartite.
     *
     * @return {@code true} if the graph is bipartite; {@code false} otherwise
     */
    isBipartite() {
        return this._isBipartite;
    }

        /**
     * Returns the side of the bipartite that vertex {@code v} is on.
     *
     * @param  v the vertex
     * @return the side of the bipartition that vertex {@code v} is on; two vertices
     *         are in the same side of the bipartition if and only if they have the
     *         same color
     * @throws ReferenceError unless {@code 0 <= v < V}
     * @throws Error if this method is called when the graph
     *         is not bipartite
     */
    color(v) {
        this.validateVertex(v);
        if (!this._isBipartite)
            throw new Error("graph is not bipartite");
        return this._color[v];
    }

    /**
     * Returns an odd-length cycle if the graph is not bipartite, and
     * {@code null} otherwise.
     *
     * @return an odd-length cycle if the graph is not bipartite
     *         (and hence has an odd-length cycle), and {@code null}
     *         otherwise
     */
    oddCycle() {
        return this._cycle;
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validateVertex(v) {
        const V = this.marked.length;
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V-1));
    }

     /**
     * Unit tests the {@code Bipartite} data type.
     *
     * @param args the command-line arguments
     */
    static main(args) {
       // create random bipartite graph with V1 vertices on left side,
       // V2 vertices on right side, and E edges; then add F random edges
       const G = new Graph(new In('assets/bipartite.txt'));
       
       const b = new Bipartite(G);
       if (b.isBipartite()) {
           StdOut.println("Graph is bipartite");
           for (let v = 0; v < G.V(); v++) {
               StdOut.println(v + ": " + b.color(v));
           }
       }
       else {
           StdOut.printf("Graph has an odd-length cycle: ");
           for (const x of b.oddCycle()) {
               StdOut.printf(x + " ");
           }
           StdOut.println();
       }
    }
}