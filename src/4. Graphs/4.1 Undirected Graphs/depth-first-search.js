import { In, StdOut } from '../../libs/index.js';
import { Graph } from './graph.js';

/**
 *  Data files:   https://algs4.cs.princeton.edu/41graph/tinyG.txt
 *                https://algs4.cs.princeton.edu/41graph/mediumG.txt
 */
export class DepthFirstSearch {
    _marked; // marked[v] = is there an s-v path?
    _count;  // number of vertices connected to s

    /**
     * Computes the vertices in graph {@code G} that are
     * connected to the source vertex {@code s}.
     * @param G the graph
     * @param s the source vertex
     * @throws ReferenceError unless {@code 0 <= s < V}
     */
    constructor(G, s) {
        this._marked = Array(G.V()).fill(false);
        this._count = 0;
        this.validate(s);
        this.dfs(G, s);
    }

    // depth first search from v
    dfs(G, v) {
        this._count++;
        this._marked[v] = true;
        for (const w of G.adj(v)) {
            if (!this._marked[w]) this.dfs(G, w);
        }
    }

    /**
     * Returns the number of vertices connected to the source vertex {@code s}.
     * @return the number of vertices connected to the source vertex {@code s}
     */
    count() {
        return this._count;
    }

    /**
     * Is there a path between the source vertex {@code s} and vertex {@code v}?
     * @param v the vertex
     * @return {@code true} if there is a path, {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    marked(v) {
        this.validate(v);
        return this._marked[v];
    }

     // throw an ReferenceError unless {@code 0 <= v < V}
    validate(v) {
        const V = this._marked.length;
        if (v < 0 || v >= V) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (V-1));
        }
    }

    static main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);
        const s = 0;
        const search = new DepthFirstSearch(G, s);
        StdOut.println('Vertices connected to source vertex %d', s);
        for (let v = 0; v < G.V(); v++) {
            if (search.marked(v))
                StdOut.println(v + " ");
        }
        StdOut.println('Count %d', search.count());
        if (search.count() != G.V()) StdOut.println("NOT connected");
        else                         StdOut.println("connected");
    }
}