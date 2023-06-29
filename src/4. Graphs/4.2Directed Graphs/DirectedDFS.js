import { In, StdOut } from "../../libs/index.js";;
import { Digraph } from "./Digraph.js";

export class DirectedDFS {
    _count;
    _marked;
    constructor(G, s) {
        if (typeof s === 'number') {
            this._count = 0;
            this._marked = new Array(G.V()).fill(false);
            this.validate(s);
            this.dfs(G, s);
        } else if (Array.isArray(s)) {
            this._constructor(G, s);
        }
    }

    /**
     * Computes the vertices in digraph {@code G} that are
     * connected to any of the source vertices {@code sources}.
     * @param G the graph
     * @param sources the source vertices
     */
    _constructor(G, sources) {
        this.validateVertices(sources);
        this._count = 0;
        this._marked = new Array(G.V()).fill(false);

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

    validate(v) {
        if (v < 0 || v >= this._marked.length) {
            throw ReferenceError('vertex ' + v + ' is not between 0 to ' + (this._marked.length-1))
        }
    }

    static main() {
        const _in = new In('assets/tinyDG.txt');
        const G = new Digraph(_in);
        const s = 0;
        const dfs = new DirectedDFS(G, s);

        StdOut.println("is %d connected to %d: %b", s, 6, dfs.marked(6));
    }
}