import { MinPQ } from '../../2. Sorting/2.4_Priority_Queue/min-priority-queue.js';
import Queue_Linked_List from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js';
import {In, StdOut} from '../../libs/index.js';
import { EdgeWeightedGraph }from './EdgeWeightedGraph.js'

export class LazyPrimMST {
    minPQ;
    mst;
    marked;
    _weight;
    constructor(G) {
        this._weight = 0;
        this.marked = new Array(G.V()).fill(false);
        this.mst = new Queue_Linked_List();
        this.minPQ = new MinPQ(G.V());

        this.visit(G, 0);


        while(!this.minPQ.isEmpty()) {
            const e = this.minPQ.delMin();
            const v = e.either();
            const w = e.other(v);
            const weight = e.weight();
            if (this.marked[v] && this.marked[w]) continue;

            this.mst.enqueue(e);
            this._weight += e.weight();
            if (!this.marked[v]) this.visit(G, v);
            if (!this.marked[w]) this.visit(G, w);
        }

    }

    visit(G, v) {
        this.marked[v] = true;
        for (const e of G.adj(v)) {
            const w = e.other(v);
            if (!this.marked[w]) this.minPQ.insert(e);
        }
    }

    edges() {
        return this.mst;
    }

    weight() {
        return this._weight;
    }

    static main() {
        const _in = new In('assets/tinyEWG.txt');
        const G = new EdgeWeightedGraph(_in);

        const mst = new LazyPrimMST(G);

        StdOut.println('MST weight: %f', mst.weight());

        for (const e of mst.edges()) {
            StdOut.println(e._toString());
        }
    }
}