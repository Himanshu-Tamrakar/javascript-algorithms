import { DijkstraSP } from "./DijkstraSP.js";
import { EdgeWeightedDigraph } from "./EdgeWeightedDigraph.js";
import { In, StdOut } from "../../libs";

export class DijkstraAllPairSP {
    all;
    constructor(G) {
        this.all = Array(G.V());
        for (let s = 0; s < this.all.length; s++) {
            this.all[0] = new DijkstraSP(G, s);
        }
    }

    /**
     * Return directed path from s to t otherwise null
     * 
     * @param s the source vertex
     * @param t the destination vertex
     * @returns path is there is directed path from s to t otherwise null
     */
    path(s, t) {
        this.validateVertex(s);
        this.validateVertex(t);
        return this.all[s].pathTo(t);
    }

     /**
     * Return minimum weight from s to t otherwise POSITIVE_INFINITY
     * 
     * @param s the source vertex
     * @param t the destination vertex
     * @returns minimum weight from s to t otherwise POSITIVE_INFINITY
     */
    dist(s, t) {
        this.validateVertex(s);
        this.validateVertex(t);
        return this.all[s].distTo(t);
    }
    
     // throw an ReferenceError unless {@code 0 <= v < V}
     validateVertex(v) {
        const V = this.all.length;
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V-1));
    }

}