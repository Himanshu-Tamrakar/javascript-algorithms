import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { Digraph } from "./Digraph.js";
import { In, StdOut } from "../../libs/index.js";
export class DirectedCycle {
    isCycle;
    onStack;
    marked;
    edgeTo;
    _cycle;
    constructor(G) {
        this.onStack = new Array(G.V()).fill(false);
        this.marked = new Array(G.V()).fill(false);
        this.edgeTo = new Array(G.V());
        this.isCycle = false;
        this._cycle = new Stack();
        
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v] && !this.isCycle) {
                this.edgeTo[v] = v;
                this.dfs(G, v);
            }
        }


    }


    dfs(G, v) {
        this.marked[v] = true;
        this.onStack[v] = true;

        for (const w of G.adj(v)) {
            // short circuit if directed cycle found
            if (this.isCycle) return;
            else if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this.dfs(G, w);
            } else if(this.onStack[w]) {
                this.isCycle = true;
                this._cycle.push(w);
                let x = v;
                while(x != w) { // Trick, read depth first paths for computing path. Compare and understand
                    this._cycle.push(x);
                    x = this.edgeTo[x];
                }
                this._cycle.push(x);
                return;

            }
        }

        this.onStack[v] = false;
    }

    hasCycle() {
        return this.isCycle;
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