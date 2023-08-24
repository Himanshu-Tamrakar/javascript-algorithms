import {SeparateChaningHashST} from "../../3.Searching/3.4 Hash Table/SeparteChaningHashST.js";
import {Graph} from "./graph.js";
import {In, StdOut} from "../../libs/index.js";

/**
 * Data files: https://algs4.cs.princeton.edu/41graph/routes.txt
 *             https://algs4.cs.princeton.edu/41graph/movies.txt
 *             https://algs4.cs.princeton.edu/41graph/moviestiny.txt
 *             https://algs4.cs.princeton.edu/41graph/moviesG.txt
 *             https://algs4.cs.princeton.edu/41graph/moviestopGrossing.txt
 *
 */
export class SymbolGraph {
    st;     // String -> int
    keys;   // int -> string
    _graph;

    /**
     * Initializes a graph from a file using the specified delimiter.
     * Each line in the file contains
     * the name of a vertex, followed by a list of the names
     * of the vertices adjacent to that vertex, separated by the delimiter.
     * @param filename the name of the file
     * @param delimiter the delimiter between fields
     */
    constructor (filename, delimeter) {
        this.st = new SeparateChaningHashST();
        const _in = new In(filename);
        const rows = _in.readRawString().split('\n');
        // const rows = _in.readLines();

        // Smbol table initialization
        rows.forEach(row => {
            const cols = row.split(delimeter);
            cols.forEach(key => {
                if (!this.st.contains(key))
                    this.st.put(key, this.st.size());
            })
        });

        // Keys initialization
        this.keys = new Array(this.st.size());
        for (const key of this.st.keys()) {
            this.keys[this.st.get(key)] = key;
        }

        // Graph initialization
        const G = new Graph(this.st.size());
        rows.forEach(row => {
            const cols = row.split(delimeter);
            const v = cols.shift();

            for (const w of cols) {
                G.addEdge(this.st.get(v), this.st.get(w));
            }
        });

        this._graph = G;
    }

    /**
     * Does the graph contain the vertex named {@code s}?
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
        return this._graph;
    }

    /**
     * Returns the graph associated with the symbol graph. It is the client's responsibility
     * not to mutate the graph.
     * @return the graph associated with the symbol graph
     */
    graph() {
        return this._graph;
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validateVertex(v) {
        const V = this._graph.V();
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V - 1));
    }

    static main() {
        const filepath = 'assets/routes.txt';
        const delimeter = ' ';
        // const filepath = 'assets/movies.txt';
        // const delimeter = '/';
        const sg = new SymbolGraph(filepath, delimeter);
        const graph = sg.graph();

        const V = graph.V();

        for (let v = 0; v < V; v++) {
            const key = sg.nameOf(v);
            // const v = sg.indexOf(key);
            StdOut.println(key + ":");
            for (const w of graph.adj(v)) {
                StdOut.println("    %s", sg.nameOf(w));
            }
            StdOut.println();
        }
    }
}



















