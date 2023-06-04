import {In, StdOut} from "../../libs/index.js";
import {Graph} from "./graph.js";

export class Cycle {
    marked;
    isCycle = false;
    constructor(G) {
        this.marked = Array(G.V()).fill(false);

        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) this.dfs(G, v, v);
            
        }
    }

    dfs(G, v, u) {
        this.marked[v] = true;
        for (const w of G.adj(v)) {
            if (!this.marked[w]) {
                this.dfs(G, w, v);
            } else if (w !== u) {
                this.isCycle = true;
            }
            
        }
    }

    hasCycle() {
        return this.isCycle;
    }

    static main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);

        const c= new Cycle(G);

        StdOut.println("Graph has cycle: ", c.hasCycle());
    }
}