import { Stack_Link_List } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack_Linked_List.js";
import {In, StdOut} from "../../libs/index.js";
import {Graph} from "./graph.js";

// No paraller edge and self loop present. 
export class Cycle {
    marked;
    isCycle = false;
    edgeTo;
    _cycle;
    isCycle;
    constructor(G) {
        this.marked = Array(G.V()).fill(false);
        this.edgeTo = new Array(G.V());
        this._cycle = new Stack_Link_List();
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v] && !this.isCycle) this.dfs(G, v, v);
            
        }
    }

    dfs(G, v, u) {
        this.marked[v] = true;
        for (const w of G.adj(v)) {
            if (this.isCycle) return;
            else if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this.dfs(G, w, v);
            } else if (w !== u) {
                this.isCycle = true;
                this._cycle.push(w);
                let x = v;
                while (x != w) {
                    this._cycle.push(x);
                    x = this.edgeTo[x];
                }
                this._cycle.push(x);
            }
            
        }
    }

    hasCycle() {
        return this.isCycle;
    }

    cycle() {
        return this._cycle;
    }

    static main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);
        const finder = new Cycle(G);
        StdOut.println("Graph has cycle: ", finder.hasCycle());

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