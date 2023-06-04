import { Graph } from "./graph.js";
import { StdOut, In } from "../../libs/index.js";
export class TwoColor {
    isTwoColorable = true;
    marked;
    color;
    constructor(G) {
        this.marked = Array(G.V()).fill(false);
        this.color = Array(G.V());

    }

    dfs(G, v) {
        this.marked[v] = true;

        for (const w of G.adj(v)) {
            if (!this.marked[w]) {
                this.color[w] = !this.color[v];
                this.dfs(G, w);
            } else if (this.color[w] === this.color[v]) {
                this.isTwoColorable = false;
            }
        }
    } 

    isBipartite() {
        return this.isTwoColorable;
    }
}