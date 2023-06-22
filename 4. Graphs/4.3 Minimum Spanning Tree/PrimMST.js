import { IndexMinPQ } from "../../2. Sorting/2.4_Priority_Queue/IndexMinPQ.js";
import Queue_Linked_List from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js";
import { In, StdOut } from "../../libs/index.js";
import { EdgeWeightedGraph } from './EdgeWeightedGraph.js';

export class PrimMST {
    edgeTo;
    distTo;
    marked;
    pq;

    constructor(G) {
        this.edgeTo = new Array(G.V()).fill(null);
        this.distTo = Array(G.V()).fill(Number.POSITIVE_INFINITY);
        this.marked = Array(G.V()).fill(false);
        this.pq = new IndexMinPQ(G.V());

        this.distTo[0] = 0.0;
        // this.edgeTo[0] = 0;
        this.pq.insert(0, 0.0);

        while(!this.pq.isEmpty()) {
            this.visit(G, this.pq.delMin());
        }
    }

    visit(G, v) {
        this.marked[v] = true;
        for (const e of G.adj(v)) {
            const w = e.other(v);
            if (this.marked[w]) continue;

            if (e.weight() < this.distTo[w]) {
                this.edgeTo[w] = e;
                this.distTo[w] = e.weight();
                if (this.pq.contains(w)) this.pq.change(w, this.distTo[w]);
                else this.pq.insert(w, this.distTo[w])
            }
        }
    }

     /**
     * Returns the edges in a minimum spanning tree (or forest).
     * @return the edges in a minimum spanning tree (or forest) as an iterable of edges
     */
     edges() {
        const mst = new Queue_Linked_List();
        for (let v = 0; v < this.edgeTo.length; v++) {
            const e = this.edgeTo[v];
            if (e != null) {
                mst.enqueue(e);
            }
        }
        return mst;
    }

     /**
     * Returns the sum of the edge weights in a minimum spanning tree (or forest).
     * @return the sum of the edge weights in a minimum spanning tree (or forest)
     */
     weight() {
        let weight = 0.0;
        for (const e of this.edges())
            weight += e.weight();
        return weight;
    }

    /**
     * Unit tests the {@code PrimMST} data type.
     *
     * @param args the command-line arguments
     */
    static main() {
        const _in = new In('assets/tinyEWG.txt');
        const G = new EdgeWeightedGraph(_in);
        const mst = new PrimMST(G);
        for (let e of mst.edges()) {
            StdOut.println(e._toString());
            
        }
        StdOut.printf("%f\n", mst.weight().toFixed(2));
    }
}



