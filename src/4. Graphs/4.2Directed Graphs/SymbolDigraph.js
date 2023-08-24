import {SeparateChaningHashST} from "../../3.Searching/3.4 Hash Table/SeparteChaningHashST.js";
import { Digraph } from "./Digraph.js";
import { In, StdOut } from "../../libs/index.js";

/**
 * https://algs4.cs.princeton.edu/42digraph/routes.txt
 */
export class SymbolDigraph {
    st;         // string -> index
    keys;       // index  -> string
    _digraph;   // the underlying digraph

    /**
     * Initializes a digraph from a file using the specified delimiter.
     * Each line in the file contains
     * the name of a vertex, followed by a list of the names
     * of the vertices adjacent to that vertex, separated by the delimiter.
     * @param filename the name of the file
     * @param delimiter the delimiter between fields
     */
    constructor(filename, delimeter) {
        this.st = new SeparateChaningHashST();

        const _in = new In(filename);
        const rows = _in.readRawString().split('\n');
        rows.forEach(row => {
            const cols = row.split(delimeter);
            cols.forEach(key => {
                if (!this.st.contains(key))
                    this.st.put(key, this.st.size());
            })
        });

        // inverted index to get string keys in an array
        this.keys = new Array(this.st.size());
        for (const key of this.st.keys()) {
            this.keys[this.st.get(key)] = key;   
        }

        // second pass builds the digraph by connecting first vertex on each
        // line to all others
        const G = new Digraph(this.st.size());
        rows.forEach(row => {
            const cols = row.split(delimeter);
            const v = this.st.get(cols.shift());

            for (const w of cols) {
                G.addEdge(v, this.st.get(w));
            }
        })

        this._digraph = G;
    }

    /**
     * Does the digraph contain the vertex named {@code s}?
     * @param s the name of a vertex
     * @return {@code true} if {@code s} is the name of a vertex, and {@code false} otherwise
     */
    contains(s) {
        return this.st.contains(s);
    }

    /**
     * Returns the integer associated with the vertex named {@code s}.
     * @param s the name of a vertex
     * @return the integer (between 0 and <em>V</em> - 1) associated with the vertex named {@code s}
     * @deprecated Replaced by {@link #indexOf(String)}.
     */
    index(s) {
        return this.st.get(s);
    }

    /**
     * Returns the integer associated with the vertex named {@code s}.
     * @param s the name of a vertex
     * @return the integer (between 0 and <em>V</em> - 1) associated with the vertex named {@code s}
     */
    indexOf(s) {
        return this.st.get(s);
    }

    /**
     * Returns the name of the vertex associated with the integer {@code v}.
     * @param  v the integer corresponding to a vertex (between 0 and <em>V</em> - 1)
     * @return the name of the vertex associated with the integer {@code v}
     * @throws ReferenceError unless {@code 0 <= v < V}
     * @deprecated Replaced by {@link #nameOf(int)}.
     */
    name(v) {
        this.validateVertex(v);
        return this.keys[v];
    }

    /**
     * Returns the name of the vertex associated with the integer {@code v}.
     * @param  v the integer corresponding to a vertex (between 0 and <em>V</em> - 1)
     * @throws ReferenceError unless {@code 0 <= v < V}
     * @return the name of the vertex associated with the integer {@code v}
     */
    nameOf(v) {
        this.validateVertex(v);
        return this.keys[v];
    }

    /**
     * Returns the graph associated with the symbol graph. It is the client's responsibility
     * not to mutate the graph.
     * @return the graph associated with the symbol graph
     * @deprecated Replaced by {@link #graph()}.
     */
    G() {
        return this._digraph;
    }

    /**
     * Returns the graph associated with the symbol graph. It is the client's responsibility
     * not to mutate the graph.
     * @return the graph associated with the symbol graph
     */
    graph() {
        return this._digraph;
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validateVertex(v) {
        const V = this._digraph.V();
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V-1));
    }

    static main() {
        const filepath = 'assets/jobs.txt';
        const delimeter = '/'; 
        const sdg = new SymbolDigraph(filepath, delimeter);
        const graph = sdg.graph();

        const V = graph.V();
        
        for (let i = 0; i < V; i++) {
            const key = sdg.nameOf(i);
            const v = sdg.indexOf(key);

            StdOut.println(key + ":");

            for (const w of graph.adj(v)) {
                StdOut.println("    %s", sdg.nameOf(w));
            }

            StdOut.println();
            
        }

    }


}