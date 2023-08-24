import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import {In, StdOut} from "../../libs/index.js";
import {Digraph} from "./Digraph.js";
import { DepthFirstOrder } from "./depth-first-order.js";

/**
 * Data files:  https://algs4.cs.princeton.edu/42digraph/tinyDG.txt
 *              https://algs4.cs.princeton.edu/42digraph/mediumDG.txt
 *              https://algs4.cs.princeton.edu/42digraph/largeDG.txt
 */
export class KosarajuSharirSCC {
    _count;     // number of strongly-connected components
    _marked;    // this._marked[v] = has vertex v been visited?
    _id;        // this._id[v] = id of strong component containing v

    /**
     * Computes the strong components of the digraph {@code G}.
     * @param G the digraph
     */
    constructor(G) {
        const reverseG = G.reverse();
        const order = new DepthFirstOrder(reverseG);
        this._marked = new Array(G.V());
        this._id = new Array(G.V());
        this._count = 0;
        for (const v of order.reversePost()) {
            if (!this._marked[v]) {
                this.dfs(G, v);
                this._count++;
            }
        }

    }

    // DFS on graph G
    dfs(G, v) {
        this._marked[v] = true;
        this._id[v] = this._count;
        for (const w of G.adj(v)) {
            if (!this._marked[w]) {
                this.dfs(G, w);
            }
        }
    }

    /**
     * Are vertices {@code v} and {@code w} in the same strong component?
     * @param  v one vertex
     * @param  w the other vertex
     * @return {@code true} if vertices {@code v} and {@code w} are in the same
     *         strong component, and {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     * @throws ReferenceError unless {@code 0 <= w < V}
     */
    stronglyConnected(v, w) {
        this.validate(v);
        this.validate(w);
        return this._id[v] === this._id[w];
    }

    /**
     * Returns the number of strong components.
     * @return the number of strong components
     */
    count() {
        return this._count;
    }


    /**
     * Returns the component id of the strong component containing vertex {@code v}.
     * @param  v the vertex
     * @return the component id of the strong component containing vertex {@code v}
     * @throws ReferenceError unless {@code 0 <= s < V}
     */
    id(v) {
        this.validate(v);
        return this._id[v];
    }

    // throw an RefereceError unless {@code 0 <= v < V}
    validate(v) {
        const V = this._V;
        if (v < 0 || v >= V) {
            throw new ReferenceError('vertex ' + v + ' is not between 0 to ' + (V-1));
        }
    }

    static main() {
        const _in = new In("assets/tinyDG.txt");
        const G = new Digraph(_in);

        const ssc = new KosarajuSharirSCC(G);
        const m = ssc.count();
        StdOut.println('%d Strong Components.', m);

        const components = new Array(m);
        for (let i = 0; i < m; i++) {
            components[i] = new Queue();
        }

        for (let v = 0; v < G.V(); v++) {
            components[ssc.id(v)].enqueue(v);
        }

        for (let i = 0; i < m; i++) {
            StdOut.printf("component: " + i + " : ")
            for (let v of components[i]) {
                StdOut.printf(v + " ");
            }
            StdOut.println();
        }
    }
    
}