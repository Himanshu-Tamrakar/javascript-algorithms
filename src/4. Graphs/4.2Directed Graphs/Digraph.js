import { Bag } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js";
import { In } from '../../libs/index.js'

/**
 *  Data files:   https://algs4.cs.princeton.edu/42digraph/tinyDG.txt
 *                https://algs4.cs.princeton.edu/42digraph/mediumDG.txt
 *                https://algs4.cs.princeton.edu/42digraph/largeDG.txt
 */
export class Digraph {
    _adj;       // this._adj[v] = adjacency list for vertex v
    _V;         // number of vertices in this digraph
    _E;         // number of edges in this digraph
    _inDegree;  // this._indegree[v] = indegree of vertex v

    /**
     * Initializes an empty digraph with <em>V</em> vertices.
     *
     * @param  V the number of vertices
     * @throws TypeError if {@code V < 0}
     */
    constructor(V) {
        if (typeof V === 'number') {
            if (V < 0) throw new TypeError("Number of vertices in a Digraph must be non-negative");
            this._V = V;
            this._E = 0;
            this._inDegree = new Array(V).fill(0);
            this._adj = new Array(V);
            for (let i = 0; i < V; i++) {
                this._adj[i] = new Bag();
            }
        } else if (V instanceof In) {
            this._constructor(V);
         } else {
             throw new Error('Invalid input format in Digraph constructor')
         }
        
    }

    /**
     * Initializes a digraph from the specified input stream.
     * The format is the number of vertices <em>V</em>,
     * followed by the number of edges <em>E</em>,
     * followed by <em>E</em> pairs of vertices, with each entry separated by whitespace.
     *
     * @param  _in the input stream
     * @throws TypeError if {@code in} is {@code null}
     * @throws TypeError if the endpoints of any edge are not in prescribed range
     * @throws TypeError if the number of vertices or edges is negative
     * @throws TypeError if the input stream is in the wrong format
     */
    _constructor(_in) {
        if (_in == null) throw new TypeError("argument is null");
        const rows = _in.readLines();
        this._V = parseInt(rows.shift());
        if (this._V < 0) throw new TypeError('number of vertices in a Digraph must be non-negetive');
        this._E = parseInt(rows.shift());
        if (this._E < 0) throw new TypeError('number if edges in a Digraph must be non-negetive');
        this._inDegree = new Array(this._V).fill(0);
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
     * Returns the number of vertices in this digraph.
     *
     * @return the number of vertices in this digraph
     */
    V() {
        return this._V;
    }

    /**
     * Returns the number of edges in this digraph.
     *
     * @return the number of edges in this digraph
     */
    E() {
        this._E
    }

    /**
     * Adds the directed edge v→w to this digraph.
     *
     * @param  v the tail vertex
     * @param  w the head vertex
     * @throws ReferenceError unless both {@code 0 <= v < V} and {@code 0 <= w < V}
     */
    addEdge(v, w) {
        this.validate(v);
        this.validate(w);
        this._adj[v].add(w);
        this._inDegree[w]++;
        this._E++;
    }
    
    /**
     * Returns the vertices adjacent from vertex {@code v} in this digraph.
     *
     * @param  v the vertex
     * @return the vertices adjacent from vertex {@code v} in this digraph, as an iterable
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    adj(v) {
        this.validate(v);
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
    inDegree(v) {
        this.validate(v);
        return this._inDegree[v];
    }

    /**
     * Returns the number of directed edges incident from vertex {@code v}.
     * This is known as the <em>outdegree</em> of vertex {@code v}.
     *
     * @param  v the vertex
     * @return the outdegree of vertex {@code v}
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    outDegree(v) {
        this.validate(v);
        return this._adj[v].size();
    }

    /**
     * Returns the reverse of the digraph.
     *
     * @return the reverse of the digraph
     */
    reverse() {
        const reverse = new Digraph(this._V);
        for (let v = 0; v < this._V; v++) {
            for (const w of this.adj(v)) {
                reverse.addEdge(w, v);
            }
        }
        return reverse;
    }

    /**
     * Returns a string representation of the graph.
     *
     * @return the number of vertices <em>V</em>, followed by the number of edges <em>E</em>,
     *         followed by the <em>V</em> adjacency lists
     */
    _toString() {
        let s = `${this._V} vertices and ${this._E} edges;\n`;
        for (let v = 0; v < this._V; v++) {
            s += `${v} : `;
            for (const w of this.adj(v)) {
                s += `${w} `;
            }
            s += '\n';
        }
        return s;
    }

    // throw an ReferenceError unless {@code 0 <= v < 
    validate(v) {
        const V = this._V;
        if (v < 0 || v >= V) {
            throw new ReferenceError('vertex ' + v + ' is not between 0 to ' + (V-1));
        }
    }

    static main() {
        const _in = new In('assets/tinyDG.txt');
        const digraph = new Digraph(_in);
        console.log(digraph._toString());
        console.log('------------');
        console.log(digraph.reverse()._toString());
        console.log('------------');
        console.log('InDegree of 4', digraph.inDegree(4));
    }
}