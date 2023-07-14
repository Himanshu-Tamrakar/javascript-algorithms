import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import {EdgeWeightedDigraph} from "../4.4 Shortest Paths/EdgeWeightedDigraph.js";
import {Digraph} from "./Digraph.js";

export class DepthFirstOrder {
    _pre;
    _post;
    _reversePost;
    _marked;

    constructor(G) {
        this._pre  = new Queue();
        this._post = new Queue();
        this._reversePost = new Stack();
        this._marked = new Array(G.V()).fill(false);

        if (G instanceof Digraph) {
            for (let v = 0; v < G.V(); v++) {
                if (!this._marked[v]) {
                    this.dfs(G, v);
                }
                
            }
        } else if (G instanceof EdgeWeightedDigraph) {
            for (let v = 0; v < G.V(); v++) {
                if (!this._marked[v]) {
                    this._dfs(G, v);
                }
                
            }
        }

        
    }

    // run DFS in digraph G from vertex v and compute preorder/postorder
    dfs(G, v) {
        this._marked[v] = true;
        this._pre.enqueue(v);
        for (const w of G.adj(v)) {
            if (!this._marked[w]) {
                this.dfs(G, w);
            }
        }
        this._post.enqueue(v);
        this._reversePost.push(v);
    }

     // run DFS in edge-weighted digraph G from vertex v and compute preorder/postorder
     _dfs(G, v) {
        this._marked[v] = true;
        this._pre.enqueue(v);
        for (const e of G.adj(v)) {
            const w = e.to();
            if (!this._marked[w]) {
                this._dfs(G, w);
            }
        }
        this._post.enqueue(v);
        this._reversePost.push(v);
    }

    pre() {
        return this._pre;
    }

    post() {
        return this._post;
    }

    reversePost() {
        return this._reversePost;
    }

    
}