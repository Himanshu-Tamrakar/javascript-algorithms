import { Stack_Link_List } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack_Linked_List.js";
import { EdgeWeightedDigraph } from "./EdgeWeightedDigraph.js";
import { In, StdOut } from "../../libs/index.js";

export class EdgeWeightedDirectedCycle {
    marked; // marked[v] = has vertex v been marked?
    edgeTo; // edgeTo[v] = previous edge on path to v
    onStack;// onStack[v] = is vertex on the stack?
    _cycle; // directed cycle (or null if no such cycle)


    /**
     * Determines whether the edge-weighted digraph {@code G} has a directed cycle and,
     * if so, finds such a cycle.
     * @param G the edge-weighted digraph
     */
    constructor(G) {
        this.onStack = new Array(G.V()).fill(false);
        this.marked = new Array(G.V()).fill(false);
        this.edgeTo = new Array(G.V());
        this.isCycle = false;
        this._cycle = new Stack_Link_List();
        
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) this.dfs(G, v);
        }

    }

    // check that algorithm computes either the topological order or finds a directed cycle
    dfs(G, v) {
        this.onStack[v] = true;
        this.marked[v] = true;
        for (const e of G.adj(v)) {
            const w = e.to();

            // short circuit if directed cycle found
            if (this.isCycle != null) return;

            // found new vertex, so recur
            else if (!this.marked[w]) {
                this.edgeTo[w] = e;
                this.dfs(G, w);
            }

            // trace back directed cycle
            else if (this.onStack[w]) {
                this._cycle = new Stack_Link_List();

                const f = e;
                while (f.from() != w) {
                    this._cycle.push(f);
                    f = this.edgeTo[f.from()];
                }
                this._cycle.push(f);

                return;
            }
        }

        this.onStack[v] = false;
    }

    /**
     * Does the edge-weighted digraph have a directed cycle?
     * @return {@code true} if the edge-weighted digraph has a directed cycle,
     * {@code false} otherwise
     */
    hasCycle() {
        return this.isCycle;
    }

    /**
     * Returns a directed cycle if the edge-weighted digraph has a directed cycle,
     * and {@code null} otherwise.
     * @return a directed cycle (as an iterable) if the edge-weighted digraph
     *    has a directed cycle, and {@code null} otherwise
     */
    cycle() {
        return this._cycle;
    }


    /**
     * Unit tests the {@code EdgeWeightedDirectedCycle} data type.
     *
     * @param args the command-line arguments
     */
    static main() {
    }

}