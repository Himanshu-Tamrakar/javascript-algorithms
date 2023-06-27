import { StdOut } from "../../libs/index.js";
import { Graph } from "../4.1 Undirected Graphs/graph.js";
import { SymbolGraph } from "../4.1 Undirected Graphs/symbol-graph.js";
import { EdgeWeightedGraph } from "../4.3 Minimum Spanning Tree/EdgeWeightedGraph.js";
import { EdgeWeightedDigraph } from "../4.4 Shortest Paths/EdgeWeightedDigraph.js";
import { Digraph } from "./Digraph.js";
import { SymbolDigraph } from "./SymbolDigraph.js";
import { DepthFirstOrder } from "./depth-first-order.js";
import { DirectedCycle } from "./directed-cycle.js";
import { EdgeWeightedDirectedCycle } from '../4.4 Shortest Paths/EdgeWeightedDirectedCycle.js'

export class Topological {
    _order;
    _rank;
    constructor(G) {
        if (G instanceof Digraph) {
            const finder = new DirectedCycle(G);
            if (!finder.hasCycle()) {
                const dfs = new DepthFirstOrder(G);
                this._order = dfs.reversePost();
                this._rank = new Array(G.V());
                let i = 0;
                for (const v of this._order) {
                    this._rank[v] = i++;
                }
            }
        } else if (G instanceof EdgeWeightedDigraph) {
            this._constructor(G);
        }
    }

    /**
    * Determines whether the edge-weighted digraph {@code G} has a topological
    * order and, if so, finds such an order.
    * @param G the edge-weighted digraph
    */
    _constructor(G) {
        const finder = new EdgeWeightedDirectedCycle(G);
        if (!finder.hasCycle()) {
            const dfs = new DepthFirstOrder(G);
            this._order = dfs.reversePost();
            this._rank = new Array(G.V());
            let i = 0;
            for (const v of this._order) {
                this._rank[v] = i++;
            }
        }
    }


    /**
    * Returns a topological order if the digraph has a topological order,
    * and {@code null} otherwise.
    * @return a topological order of the vertices (as an iterable) if the
    *    digraph has a topological order (or equivalently, if the digraph is a DAG),
    *    and {@code null} otherwise
    */
    order() {
        return this._order;
    }

    /**
    * Does the digraph have a topological order?
    * @return {@code true} if the digraph has a topological order (or equivalently,
    *    if the digraph is a DAG), and {@code false} otherwise
    */
    hasOrder() {
        return this._order ? true : false
    }

    /**
    * The rank of vertex {@code v} in the topological order;
    * -1 if the digraph is not a DAG
    *
    * @param v the vertex
    * @return the position of vertex {@code v} in a topological order
    *    of the digraph; -1 if the digraph is not a DAG
    * @throws Reference Error unless {@code 0 <= v < V}
    */
    rank(v) {
        this.validateVertex(v);
        if (this.hasOrder()) return this._rank[v];
        else return -1;
    }

     // throw an ReferenceError unless {@code 0 <= v < V}
     validateVertex(v) {
        const V = this._rank.length;
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V-1));
    }

    static main() {
        const sdg = new SymbolDigraph('assets/jobs.txt', '/');
        const G = sdg.graph();
        const topological = new Topological(G);
        for (const v of topological.order()) {
            StdOut.println(sdg.nameOf(v));
        }
    }
}