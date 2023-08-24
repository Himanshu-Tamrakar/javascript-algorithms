import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import {EdgeWeightedDigraph} from "../4.4 Shortest Paths/EdgeWeightedDigraph.js";
import {Digraph} from "./Digraph.js";
import { In, StdOut } from "../../libs/index.js";

/**
 *  https://algs4.cs.princeton.edu/42digraph/tinyDAG.txt
 *  https://algs4.cs.princeton.edu/42digraph/tinyDG.txt
 */
export class DepthFirstOrder {
    _marked;     // marked[v] = has v been marked in dfs?
    _pre;        // pre[v]    = preorder  number of v
    _post;       // post[v]   = postorder number of v
    _preorder;   // vertices in preorder
    _postorder;  // vertices in postorder
    _preCounter; // counter or preorder numbering
    _postCounter;// counter for postorder numbering
    constructor(G) {
        this._pre    = new Array(G.V());
        this._post   = new Array(G.V());
        this._postorder = new Queue();
        this._preorder  = new Queue();
        this._marked    = new Array(G.V()).fill(false);
        this._preCounter = 0;
        this._postCounter = 0;
        if (G instanceof Digraph) {
            for (let v = 0; v < G.V(); v++)
                if (!this._marked[v]) this.dfs(G, v);
        } 
        // Determines a depth-first order for the edge-weighted digraph {@code G}.
        else if (G instanceof EdgeWeightedDigraph) {
            for (let v = 0; v < G.V(); v++)
                if (!this._marked[v]) this._dfs(G, v);
        }
    }

    // run DFS in digraph G from vertex v and compute preorder/postorder
    dfs(G, v) {
        this._marked[v] = true;
        this._pre[v] = this._preCounter++;
        this._preorder.enqueue(v);
        for (let w of G.adj(v)) {
            if (!this._marked[w]) {
                this.dfs(G, w);
            }
        }
        this._postorder.enqueue(v);
        this._post[v] = this._postCounter++;
    }

     // run DFS in edge-weighted digraph G from vertex v and compute preorder/postorder
     _dfs(G, v) {
        this._marked[v] = true;
        this._pre[v] = this._preCounter++;
        this._preorder.enqueue(v);
        for (let e of G.adj(v)) {
            let w = e.to();
            if (!this._marked[w]) {
                this._dfs(G, w);
            }
        }
        this._postorder.enqueue(v);
        this._post[v] = this._postCounter++;
    }

    /**
     * Returns the vertices in postorder.
     * @return the vertices in postorder, as an iterable of vertices
     */
    post() {
        return this._postorder;
    }

    /**
     * Returns the vertices in preorder.
     * @return the vertices in preorder, as an iterable of vertices
     */
    pre() {
        return this._preorder;
    }

    /**
     * Returns the vertices in reverse postorder.
     * @return the vertices in reverse postorder, as an iterable of vertices
     */
    reversePost() {
        const reverse = new Stack();
        for (const v of this._postorder)
            reverse.push(v);
        return reverse;
    }

    /**
     * Returns the preorder number of vertex {@code v}.
     * @param  v the vertex
     * @return the preorder number of vertex {@code v}
     * @throws IllegalArgumentException unless {@code 0 <= v < V}
     */
    preOrderNumber(v) {
        this.validateVertex(v);
        return this._pre[v];
    }

    /**
     * Returns the postorder number of vertex {@code v}.
     * @param  v the vertex
     * @return the postorder number of vertex {@code v}
     * @throws IllegalArgumentException unless {@code 0 <= v < V}
     */
    postOrderNuber(v) {
        this.validateVertex(v);
        return this._post[v];
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validateVertex(v) {
        const V = this._marked.length;
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V-1));
    }


        /**
     * Unit tests the {@code DepthFirstOrder} data type.
     *
     * @param args the command-line arguments
     */
    static main() {
        const file = 'assets/tinyDAG.txt'
        const _in = new In(file);
        const G = new Digraph(_in);
        const dfs = new DepthFirstOrder(G);
        StdOut.println("   v  pre post");
        StdOut.println("--------------");
        for (let v = 0; v < G.V(); v++) {
            StdOut.printf("   %d %d %d\n", v, dfs.preOrderNumber(v), dfs.postOrderNuber(v));
        }
        StdOut.printf("Preorder:  ");
        for (let v of dfs.pre()) {
            StdOut.printf(v + " ");
        }
        StdOut.println();
        StdOut.printf("Postorder: ");
        for (let v of dfs.post()) {
            StdOut.printf(v + " ");
        }
        StdOut.println();
        StdOut.printf("Reverse postorder: ");
        for (let v of dfs.reversePost()) {
            StdOut.printf(v + " ");
        }
        StdOut.println();
    }  

    
}