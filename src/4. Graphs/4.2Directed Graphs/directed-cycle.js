import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { Digraph } from "./Digraph.js";
import { In, StdOut } from "../../libs/index.js";
export class DirectedCycle {
    onStack;    // this.onStack[v] = is vertex on the stack?
    marked;     // this.marked[v] = has vertex v been marked?
    edgeTo;     // this.edgeTo[v] = previous vertex on path to v
    _cycle;     // directed cycle (or null if no such cycle)

    /**
     * Determines whether the digraph {@code G} has a directed cycle and, if so,
     * finds such a cycle.
     * @param G the digraph
     */
    constructor(G) {
        this.onStack = new Array(G.V()).fill(false);
        this.marked = new Array(G.V()).fill(false);
        this.edgeTo = new Array(G.V());
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v] && this._cycle == null) {
                this.dfs(G, v);
            }
        }
    }

    dfs(G, v) {
        this.onStack[v] = true;
        this.marked[v] = true;

        for (const w of G.adj(v)) {
            // short circuit if directed cycle found
            if (this._cycle != null) return;

            // found new vertex, so recur
            else if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this.dfs(G, w);
            } 
            
            // trace back directed cycle
            else if(this.onStack[w]) {
                this._cycle = new Stack();
                for (let x = v; x != w; x = this.edgeTo[x]) {
                    this._cycle.push(x);
                }
                this._cycle.push(w);
                this._cycle.push(v);
            }
        }
        this.onStack[v] = false;
    }

    /**
     * Does the digraph have a directed cycle?
     * @return {@code true} if the digraph has a directed cycle, {@code false} otherwise
     */
    hasCycle() {
        return this._cycle != null;
    }

    /**
     * Returns a directed cycle if the digraph has a directed cycle, and {@code null} otherwise.
     * @return a directed cycle (as an iterable) if the digraph has a directed cycle,
     *    and {@code null} otherwise
     */
    cycle() {
        return this._cycle;
    }

    static  main() {
        const _in = new In('assets/tinyDG.txt');
        const G = new Digraph(_in);

        const finder = new DirectedCycle(G);
        if (finder.hasCycle()) {
            StdOut.printf("Directed cycle: ");
            for (let v of finder.cycle()) {
                StdOut.printf(v + " ");
            }
            StdOut.println();
        }

        else {
            StdOut.println("No directed cycle");
        }
        StdOut.println();
    }


}