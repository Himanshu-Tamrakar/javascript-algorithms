import Queue_Linked_List from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js";
import {In, StdOut} from "../../libs/index.js";
import {Digraph} from "./Digraph.js";
import { DepthFirstOrder } from "./depth-first-order.js";
export class KosarajuSharirSCC {
    _count;
    _marked;
    _id;

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

    dfs(G, v) {
        this._marked[v] = true;
        this._id[v] = this._count;
        for (const w of G.adj(v)) {
            if (!this._marked[w]) {
                this.dfs(G, w);
            }
        }
    }

    stronglyConnected(v, w) {
        this.validate(v);
        this.validate(w);
        return this._id[v] === this._id[w];
    }

    count() {
        return this._count;
    }

    id(v) {
        this.validate(v);
        return this._id[v];
    }

    validate(v) {
        if (v < 0 || v >= this._V) {
            throw new ReferenceError('vertex ' + v + ' is not between 0 to ' + (this._V-1));
        }
    }

    static main() {
        const _in = new In("assets/mediumDG.txt");
        const G = new Digraph(_in);

        const ssc = new KosarajuSharirSCC(G);
        const m = ssc.count();
        StdOut.println('%d Strong Components.', m);

        const components = new Array(m);
        for (let i = 0; i < m; i++) {
            components[i] = new Queue_Linked_List();
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