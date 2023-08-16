import { Graph } from "./graph.js";
import { In, StdOut } from "../../libs/index.js";
import { Bag } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js";

/**
 * Data files:   https://algs4.cs.princeton.edu/41graph/tinyG.txt
 *                https://algs4.cs.princeton.edu/41graph/mediumG.txt
 *                https://algs4.cs.princeton.edu/41graph/largeG.txt
 */
export class CC {
    _id;    // this._id[v] = id of connected component containing v 
    _count; // number of connected components
    marked; // this.marked[v] = has vertex v been marked?
    _size;   // size[id] = number of vertices in given component

    /**
     * Computes the connected components of the undirected graph {@code G}.
     *
     * @param G the undirected graph
     */
    constructor(G) {
        this._id = Array(G.V()).fill(-1);
        this._size = Array(G.V()).fill(0);
        this.marked = Array(G.V()).fill(false);
        this._count = 0;
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) {
                this.dfs(G, v);
                this._count++
            }   
        }
    }

    // depth-first search for a Graph
    dfs(G, v) {
        this.marked[v] = true;
        this._id[v] = this._count;
        this._size[this._count]++;
        for (const w of G.adj(v)) {
            if (!this.marked[w]) {
                this.dfs(G, w);
            }
        }
    }

    /**
     * Returns true if vertices {@code v} and {@code w} are in the same
     * connected component.
     *
     * @param  v one vertex
     * @param  w the other vertex
     * @return {@code true} if vertices {@code v} and {@code w} are in the same
     *         connected component; {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     * @throws ReferenceError unless {@code 0 <= w < V}
     */
    connected(v, w) {
        this.validate(v);
        return this._id[v] === this._id[w];
    }
    
    /**
     * Returns the number of connected components in the graph {@code G}.
     *
     * @return the number of connected components in the graph {@code G}
     */
    count() {
        return this._count;
    }

    /**
     * Returns the component id of the connected component containing vertex {@code v}.
     *
     * @param  v the vertex
     * @return the component id of the connected component containing vertex {@code v}
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    id(v) {
        this.validate(v);
        return this._id[v];
    }

    /**
     * Returns the number of vertices in the connected component containing vertex {@code v}.
     *
     * @param  v the vertex
     * @return the number of vertices in the connected component containing vertex {@code v}
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    size(v) {
        this.validate(v);
        return this._size[this._id[v]];
    }

     // throw an ReferenceError unless {@code 0 <= v < V}
    validate(v) {
         const V = this.marked.length;
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V-1));
    }

    static main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);
        const cc = new CC(G);
        const M = cc.count();
        const components = [];
        for (let i = 0; i < M; i++) {
            components[i] = new Bag();
        }
        for (let v = 0; v < G.V(); v++) {
            components[cc.id(v)].add(v);
        }
        for (let i = 0; i < M; i++) {
            StdOut.printf("Connected Component of %d: ", i);
            for (const w of components[i]) {
                StdOut.printf("%d ", w);
            }
            StdOut.println();
        }
    }
}