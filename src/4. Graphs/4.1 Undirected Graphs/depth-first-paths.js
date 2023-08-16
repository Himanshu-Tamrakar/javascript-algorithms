import { Stack } from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js';
import { In, StdOut } from '../../libs/index.js';
import {Graph} from './graph.js';

/**
 *  Data files:   https://algs4.cs.princeton.edu/41graph/tinyCG.txt
 *                https://algs4.cs.princeton.edu/41graph/tinyG.txt
 *                https://algs4.cs.princeton.edu/41graph/mediumG.txt
 *                https://algs4.cs.princeton.edu/41graph/largeG.txt
 */
export class DepthFirstPaths {
    marked; // this.marked[v] = is there an s-v path?
    edgeTo; // this.edgeTo[v] = last edge on s-v path
    s;      // source vertex

    /**
     * Computes a path between {@code s} and every other vertex in graph {@code G}.
     * @param G the graph
     * @param s the source vertex
     * @throws ReferenceError unless {@code 0 <= s < V}
     */
    constructor(G, s) {
        this.s = s;
        this.edgeTo = Array(G.V());
        this.marked = Array(G.V()).fill(false)
        this.edgeTo[s] = s; // Sorce starts with source
        this.validate(s);
        this.dfs(G, s);
    }

    // depth first search from v
    dfs(G, s) {
        this.marked[s] = true;
        for (const w of G.adj(s)) {
            if (!this.marked[w]) {
                this.edgeTo[w] = s;
                this.dfs(G, w);
            }
        }
    }

    /**
     * Is there a path between the source vertex {@code s} and vertex {@code v}?
     * @param v the vertex
     * @return {@code true} if there is a path, {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    hasPathTo(v) {
        this.validate(v);
        return this.marked[v];
    }

    /**
     * Returns a path between the source vertex {@code s} and vertex {@code v}, or
     * {@code null} if no such path.
     * @param  v the vertex
     * @return the sequence of vertices on a path between the source vertex
     *         {@code s} and vertex {@code v}, as an Iterable
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    pathTo(v) {
        this.validate(v);
        if (!this.hasPathTo(v)) return null;
        const path = new Stack();
        for (let x = v; x != this.s; x = this.edgeTo[x])
            path.push(x);
        path.push(this.s);
        return path;
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validate(v) {
        const V = this.marked.length;
        if (v < 0 || v >= V) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (V-1));
        }
    }

    static main() {
        const _in = new In('assets/tinyCG.txt');
        const G = new Graph(_in);
        const s = 0;
        const paths = new DepthFirstPaths(G, s);

        for (let v = 0; v < G.V(); v++) {
            
            if (paths.hasPathTo(v)) {
                StdOut.printf('%d to %d: ', s, v);
                const path = paths.pathTo(v);
                for (const w of path) {
                    if (w === v) StdOut.printf(w)
                    else StdOut.printf("%d - ", w);
                }
                StdOut.println();
            } else {
                StdOut.println("% and %d not connected", s, v)
            }
        }
    }
}