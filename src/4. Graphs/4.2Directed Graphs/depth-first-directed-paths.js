import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { In, StdOut } from "../../libs/index.js";
import { Digraph } from "./Digraph.js";

/**
 *  Data files:   https://algs4.cs.princeton.edu/42digraph/tinyDG.txt
 *                https://algs4.cs.princeton.edu/42digraph/mediumDG.txt
 *                https://algs4.cs.princeton.edu/42digraph/largeDG.txt
 */
export class DepthFirstDirectedPaths {
    _marked;    // this._marked[v] = true iff v is reachable from s
    _edgeTo;    // this._edgeTo[v] = last edge on path from s to v
    _s;         // source vertex

    /**
     * Computes a directed path from {@code s} to every other vertex in digraph {@code G}.
     * @param  G the digraph
     * @param  s the source vertex
     * @throws RefereceError unless {@code 0 <= s < V}
     */
    constructor(G, s) {
        this._s = s;
        this._marked = new Array(G.V()).fill(false);
        this._edgeTo = new Array(G.V());
        this.validate(s);
        this._edgeTo[s] = s;
        this.dfs(G, s);
    }

    dfs(G, v) {
        this._marked[v] = true;

        for (const w of G.adj(v)) {
            if (!this._marked[w]) {
                this._edgeTo[w] = v;
                this.dfs(G, w);
            }
        }
    }


    /**
     * Returns a directed path from the source vertex {@code s} to vertex {@code v}, or
     * {@code null} if no such path.
     * @param  v the vertex
     * @return the sequence of vertices on a directed path from the source vertex
     *         {@code s} to vertex {@code v}, as an Iterable
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    pathTo(v) {
        this.validate(v);
        if (!this.hasPathTo(v)) return null;
        const path = new Stack();
        for (let x = v; x != this._s; x = this._edgeTo[x])
            path.push(x);
        path.push(this._s);
        return path;
    }

    /**
     * Is there a directed path from the source vertex {@code s} to vertex {@code v}?
     * @param  v the vertex
     * @return {@code true} if there is a directed path from the source
     *         vertex {@code s} to vertex {@code v}, {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    hasPathTo(v) {
        this.validate(v);
        return this._marked[v];
    }

    validate(v) {
        if (v < 0 || v >= this._marked.length) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (this._marked.length-1));
        }
    }

    static main() {
        const _in = new In('assets/tinyDG.txt');
        const G = new Digraph(_in);
        const s = 3;
        const paths = new DepthFirstDirectedPaths(G, s);

        for (let v = 0; v < G.V(); v++) {
            
            if (paths.hasPathTo(v)) {
                StdOut.printf('%d to %d: ', s, v);
                const path = paths.pathTo(v);
                for (const w of path) {
                    if (w === v) StdOut.printf(w)
                    else StdOut.printf("%d -> ", w);
                }
                StdOut.println();
            } else {
                StdOut.println("%d and %d not connected", s, v)
            }
        }
    
    }
}