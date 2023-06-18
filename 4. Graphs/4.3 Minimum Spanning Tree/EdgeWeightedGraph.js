import { Edge } from "./Edge.js";
import Bag from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js";
import { In, StdOut } from "../../libs/index.js";

export class EdgeWeightedGraph {
    _adj;
    _V = 0;
    _E = 0;

    /**
     /**
     * Initializes an empty edge-weighted graph with {@code V} vertices and 0 edges.
     *
     * @param  V the number of vertices
     * @throws ReferenceError if {@code V < 0}
     */
    constructor(input) {
        if (typeof input === 'number') {
            if (input < 0) throw new ReferenceError('Number of vertices must be non-negative');
            this._V = input;
            this._adj = new Array(input);
            for (let i = 0; i < input; i++) {
                this._adj[i] = new Bag();
            }
        } else if (typeof input === 'object') {
            this._constructor(input);
        }
    }
    /**
    * Initializes an edge-weighted graph from an input stream.
    * The format is the number of vertices <em>V</em>,
    * followed by the number of edges <em>E</em>,
    * followed by <em>E</em> pairs of vertices and edge weights,
    * with each entry separated by whitespace.
    *
    * @param  input the input stream
    * @throws ReferenceError if {@code in} is {@code null}
    * @throws ReferenceError if the endpoints of any edge are not in prescribed range
    * @throws ReferenceError if the number of vertices or edges is negative
    */
    _constructor(input) {
        if (!input) throw new ReferenceError("argument is null");

        const rows = input.readRawString().split('\n');
        this._V = parseInt(rows.shift());
        if (this._V < 0) throw new ReferenceError('Number of vertices must be non-negative');

        this._adj = new Array(this._V);
        for (let i = 0; i < this._V; i++) {
            this._adj[i] = new Bag();
        }

        const E = parseInt(rows.shift());
        if (E < 0) throw new ReferenceError('Number of edges must be non-negative');

        rows.forEach(row => {
            const [v, w, weight] = row.split(' ');
            const e = new Edge(parseInt(v), parseInt(w),  parseFloat(weight)); //.toFixed(2);
            this.addEdge(e);
        });

    }

    /**
     * Returns the number of vertices in this edge-weighted graph.
     *
     * @return the number of vertices in this edge-weighted graph
     */
    V() {
        return this._V;
    }

    /**
     * Returns the number of edges in this edge-weighted graph.
     *
     * @return the number of edges in this edge-weighted graph
     */
    E() {
        return  this._E;
    }

    /**
     * Adds the undirected edge {@code edge} to this edge-weighted graph.
     *
     * @param  edge the edge
     * @throws ReferenceError unless both endpoints are between {@code 0} and {@code V-1}
     */
    addEdge(edge) {
        const v = edge.either();
        const w = edge.other(v);
        this.validateVertex(v);
        this.validateVertex(w);

        this._adj[v].add(edge);
        this._adj[w].add(edge);
        this._E++;
    }

    /**
     * Returns the edges incident from vertex {@code v}.
     *
     * @param  v the vertex
     * @return the edges incident on vertex {@code v} as an Iterable
     * @throws ReferenceError unless {@code 0 <= v < this._V}
     */
    adj(v) {
        this.validateVertex(v);
        return this._adj[v];
    }

    /**
     * Returns the degree of vertex {@code v}.
     *
     * @param  v the vertex
     * @return the degree of vertex {@code v}
     * @throws IllegalArgumentException unless {@code 0 <= v < V}
     */
    degree(v) {
        this.validateVertex(v);
        return tihs._adj[v].size();
    }

     /**
     * Returns all edges in this edge-weighted graph.
     * To iterate over the edges in this edge-weighted graph, use foreach notation:
     * {@code for (let e of G.edges())}.
     *
     * @return all edges in this edge-weighted graph, as an iterable
     */
    edges() {
        const list  = new Bag();

        for (let v = 0; v < this._V; v++) {
            let selfLoop = 0;

            for (const e of this.adj(v)) {
                if (v < e.other(v)) {
                    list.add(e);
                } 
                // add only one copy of each self loop (self loops will be consecutive)
                else if (v === e.other(v)) { // self loop
                    if (selfLoop % 2 === 0) list.add(e);
                    selfLoop++;
                }
            }
            
        }
        return list;

    }

    _toString() {
        let s = '';
        s += (this._V + " " + this._E + '\n');
        for (let v = 0; v < this._V; v++) {
            s += (v + ": ");
            for (let e of this._adj[v]) {
                s += (e._toString() + "  ");
            }
            s += ('\n');
        }
        return s;
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validateVertex(v) {
        if (v < 0 || v >= this._V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (this._V-1));
    }

    static main() {
        const _in = new In("assets/tinyEWG.txt");
        const G = new EdgeWeightedGraph(_in);
        StdOut.println(G._toString());

        for (const edge of G.edges()) {
            StdOut.println(edge._toString());
        }
    }
}