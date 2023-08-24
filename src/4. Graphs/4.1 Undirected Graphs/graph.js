import { Bag } from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js';
import { StdIn, In, StdOut } from '../../libs/index.js'

/**
 * Data files: https://algs4.cs.princeton.edu/41graph/tinyG.txt
 *             https://algs4.cs.princeton.edu/41graph/mediumG.txt
 *             https://algs4.cs.princeton.edu/41graph/largeG.txt
 * Parallel edge and self loop are allowed in this graph inplementation
 */
export class Graph {
    _adj;
    _V = 0;
    _E = 0;
    
    /**
     * Initializes an empty graph with {@code V} vertices and 0 edges.
     * param V the number of vertices
     *
     * @param  V number of vertices
     * @throws Error if {@code V < 0}
     */
    constructor(V) {
        if (typeof V === 'number') {
            this._V = V;
            this._E = 0;
            this._adj = new Array(this._V);
            for (let i = 0; i < this._V; i++) {
                this._adj[i] = new Bag();
            }
        } else if (V instanceof In) {
           this.constructorTwo(V);
        } else {
            throw new Error('Invalid input format in Graph constructor')
        }
    }

    /**
     * Initializes a graph from the specified input stream.
     * The format is the number of vertices <em>V</em>,
     * followed by the number of edges <em>E</em>,
     * followed by <em>E</em> pairs of vertices, with each entry separated by whitespace.
     *
     * @param  input the input stream
     * @throws TypeError if {@code input} is {@code null}
     * @throws TypeError if the endpoints of any edge are not in prescribed range
     * @throws TypeError if the number of vertices or edges is negative
     * @throws TypeError if the input stream is in the wrong format
     */
    constructorTwo(input) {
        const rows = input.readRawString().split('\n');
        this._V = parseInt(rows.shift());
        if (this._V < 0) throw new TypeError("number of vertices in a Graph must be non-negative");
        this._E = parseInt(rows.shift());
        if (this._E < 0) throw new TypeError("number of edges in a Graph must be non-negative");
        
        this._adj = new Array(this._V);
        for (let i = 0; i < this._V; i++) {
            this._adj[i] = new Bag();
        }
        rows.forEach(row => {
            const [v, w] = row.split(" ");
            this.addEdge(parseInt(v), parseInt(w));
            this._E--;
        });
    }
    
    /**
     * Returns the number of vertices in this graph.
     *
     * @return the number of vertices in this graph
     */
    V() {
        return this._V;
    }

    /**
     * Returns the number of edges in this graph.
     *
     * @return the number of edges in this graph
     */
    E() {
        return this._E;
    }

    /**
     * Adds the undirected edge v-w to this graph.
     *
     * @param  v one vertex in the edge
     * @param  w the other vertex in the edge
     * @throws ReferenceError unless both {@code 0 <= v < V} and {@code 0 <= w < V}
     */
    addEdge(v, w) {
        this.validate(v);
        this.validate(w);
        this._adj[v].add(w);
        this._adj[w].add(v);
        this._E++;
    }

    /**
     * Returns the vertices adjacent to vertex {@code v}.
     *
     * @param  v the vertex
     * @return the vertices adjacent to vertex {@code v}, as an iterable
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    adj(v) {
        this.validate(v);
        return this._adj[v];
    }

    /**
     * Returns the degree of vertex {@code v}.
     *
     * @param  v the vertex
     * @return the degree of vertex {@code v}
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    degree(v) {
        this.validate(v);
        return this._adj[v].size();
    }

    /**
     * Returns a string representation of this graph.
     *
     * @return the number of vertices <em>V</em>, followed by the number of edges <em>E</em>,
     *         followed by the <em>V</em> adjacency lists
     */
    _toString() {
        if (this._adj.length <= 0) return '';

        let result = '';
        for (let i = 0; i < this._V; i++) {
            result += i + ' : ';

            for (const item of this.adj(i)) {
                result += item + ' ';
            }

            result += '\n';
            
        }

        return result;
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validate(v) {
        if (v < 0 || v >= this._V) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (this._V-1));
        }
    }

    /*****************************************************************************
     * UNIT TEST
     *****************************************************************************/

    static main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);
        console.log(G._toString());

        StdOut.println("Vertex of maximum degree = " + this.maxDegree(G));
        StdOut.println("Average degree           = " + this.avgDegree(G));
        StdOut.println("Number of self loops     = " + this.numberOfSelfLoops(G));
    }

    static maxDegree(G) {
        let max = 0;
        for (let i = 0; i < G.V(); i++) {
            const adj = G.adj(i);
            if (max < adj.size()) max = adj.size();
        }
        return max;
    }

    static avgDegree(G) {
       
        return 2 * G.E() / G.V();
    }

    static numberOfSelfLoops(G) {
        let sl = 0;
        for (let i = 0; i < G.V(); i++) {
            const v = i;

            for (const item of G.adj(v)) {
                if (item === v) sl++;
            }
            
        }
        return sl / 2;
    }
}