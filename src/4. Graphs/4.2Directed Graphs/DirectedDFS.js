import { In, StdOut } from "../../libs/index.js";;
import { Digraph } from "./Digraph.js";
import { isIterable } from "../../utils/index.js";

/**
 *  Data files:   https://algs4.cs.princeton.edu/42digraph/tinyDG.txt
 *                https://algs4.cs.princeton.edu/42digraph/mediumDG.txt
 *                https://algs4.cs.princeton.edu/42digraph/largeDG.txt
 */
export class DirectedDFS {
    _count;     // number of vertices reachable from source(s)
    _marked;    // marked[v] = true iff v is reachable from source(s)

    /**
     * Computes the vertices in digraph {@code G} that are
     * reachable from the source vertex {@code s}.
     * @param G the digraph
     * @param s the source vertex
     * @throws ReferenceError unless {@code 0 <= s < V}
     */
    constructor(G, s) {
        if (typeof s === 'number') {
            this._count = 0;
            this._marked = new Array(G.V()).fill(false);
            this.validate(s);
            this.dfs(G, s);
        } else if (Array.isArray(s) || isIterable(s)) {
            this._constructor(G, s);
        }
    }

    /**
     * Computes the vertices in digraph {@code G} that are
     * connected to any of the source vertices {@code sources}.
     * @param G the graph
     * @param sources the source vertices
     * @throws ReferenceError if {@code sources} is {@code null}
     * @throws ReferenceError if {@code sources} contains no vertices
     * @throws ReferenceError unless {@code 0 <= s < V}
     *         for each vertex {@code s} in {@code sources}
     */
    _constructor(G, sources) {
        this._count = 0;
        this._marked = new Array(G.V()).fill(false);
        this.validateVertices(sources);

        for (const w of sources) {
            if (!this._marked[w]) this.dfs(G, w);
        }
    }
    
    dfs(G, s) {
        this._count++;
        this._marked[s] = true;
        for (const w of G.adj(s)) {
            if (!this._marked[w]) {
                this.dfs(G, w);
            }
        }
    }

    /**
     * Is there a directed path from the source vertex (or any
     * of the source vertices) and vertex {@code v}?
     * @param  v the vertex
     * @return {@code true} if there is a directed path, {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    marked(v) {
        this.validate(v);
        return this._marked[v];
    }

    /**
     * Returns the number of vertices reachable from the source vertex
     * (or source vertices).
     * @return the number of vertices reachable from the source vertex
     *   (or source vertices)
     */
    count() {
        return this._count;
    }

    // throw an ReferenceError if vertices is null, has zero vertices,
    // or has a vertex not between 0 and V-1
    validateVertices(sources) {
        if (sources == null) {
            throw new TypeError("argument is null");
        }
        let vCount = 0;
        for (const v of sources) {
            vCount++;
            if (v == null) {
                throw new TypeError('vertex is null');
            }
            this.validate(v);
        }
        if (vCount === 0) {
            throw new TypeError('zero vertices')
        }
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validate(v) {
        if (v < 0 || v >= this._marked.length) {
            throw ReferenceError('vertex ' + v + ' is not between 0 to ' + (this._marked.length-1))
        }
    }

    static main() {
        const _in = new In('assets/tinyDG.txt');
        const G = new Digraph(_in);
        const s = 1;
        const dfs = new DirectedDFS(G, s);

        // print out vertices reachable from sources
        for (let v = 0; v < G.V(); v++) {
            if (dfs.marked(v)) StdOut.printf(v + " ");
        }
        StdOut.println();
    }
}