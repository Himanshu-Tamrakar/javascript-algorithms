import { Bag } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js";
import {DirectedEdge} from "./DirectedEdge.js";
import { In, StdOut } from "../../libs/index.js";

export class EdgeWeightedDigraph {
    _V;
    _E;
    _adj;
    _indegree;
    constructor(input) {
        if (typeof input === 'number') {
            if (input < 0) throw new ReferenceError('Number of vertices must be non-negative');
            this._V = input;
            this._indegree = new Array(this._V).fill(0);
            this._E = 0;
            this._adj  = new Array(this._V);
            for (let i = 0; i < this._V; i++) {
                this._adj[i] = new Bag();
            }
        } else if (typeof input === 'object') {
            this._constructor(input);
        }
    }
    _constructor(input) {
        if (!input) throw new ReferenceError("argument is null");

        const rows = input.readRawString().split('\n');
        this._V = parseInt(rows.shift());
        this._indegree = new Array(this._V).fill(0);
        if (this._V < 0) throw new ReferenceError('Number of vertices must be non-negative');
        this._adj = new Array(this._V);
        for (let i = 0; i < this._V; i++) {
            this._adj[i] = new Bag();
        }

        const E = parseInt(rows.shift());
        if (E < 0) throw new ReferenceError('Number of edges must be non-negative');
        rows.forEach(row => {
            const [v, w, weight] = row.split(' ');
            const e = new DirectedEdge(parseInt(v), parseInt(w), parseFloat(weight));
            this.addEdge(e);
        });

    }

    /**
     * Returns the number of vertices in this edge-weighted digraph.
     * @return the number of vertices in this edge-weighted digraph
     */
    V() {
        return this._V;
    }

    /**
     * Returns the number of edges in this edge-weighted digraph.
     * @return the number of edges in this edge-weighted digraph
     */
    E() {
        return this._E;
    }

    /**
     * Adds the directed edge {@code e} to this edge-weighted digraph.
     *
     * @param  e the edge
     * @throws ReferenceError unless endpoints of edge are between {@code 0} and {@code V-1}
     */
    addEdge(e) {
        const v = e.from();
        const w = e.to();
        const weight = e.weight();

        this.validateVertex(v);
        this.validateVertex(w);
        this._adj[v].add(e);
        this._indegree[w]++;
        this._E++;
    }

     /**
     * Returns the directed edges incident from vertex {@code v}.
     *
     * @param  v the vertex
     * @return the directed edges incident from vertex {@code v} as an Iterable
     * @throws IllegalArgumentException unless {@code 0 <= v < V}
     */
     adj(v) {
        this.validateVertex(v);
        return this._adj[v];
    }

    /**
     * Returns the number of directed edges incident to vertex {@code v}.
     * This is known as the <em>indegree</em> of vertex {@code v}.
     *
     * @param  v the vertex
     * @return the indegree of vertex {@code v}
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    indegree(v) {
        this.validateVertex(v);
        return this._indegree[v];
    }

    /**
     * Returns the number of directed edges incident from vertex {@code v}.
     * This is known as the <em>outdegree</em> of vertex {@code v}.
     *
     * @param  v the vertex
     * @return the outdegree of vertex {@code v}
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    outdegree(v) {
        this.validateVertex(v);
        return this._adj[v].size();
    }

     /**
     * Returns all directed edges in this edge-weighted digraph.
     * To iterate over the edges in this edge-weighted digraph, use foreach notation:
     * {@code for (const e : G.edges())}.
     *
     * @return all edges in this edge-weighted digraph, as an iterable
     */
     edges() {
        const list = new Bag();
        for (let v = 0; v < this._V; v++) {
            for (let e of this.adj(v)) {
                list.add(e);
            }
        }
        return list;
    }

    /**
     * Returns a string representation of this edge-weighted digraph.
     *
     * @return the number of vertices <em>V</em>, followed by the number of edges <em>E</em>, followed by the <em>V</em> adjacency lists of edges
     */
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

     /**
     * Unit tests the {@code EdgeWeightedDigraph} data type.
     *
     * @param args the command-line arguments
     */
     static main() {
        const _in = new In("assets/tinyEWD.txt");
        const  G = new EdgeWeightedDigraph(_in);
        StdOut.println(G._toString());
    }
}