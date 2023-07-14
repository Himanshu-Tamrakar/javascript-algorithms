import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { In, StdOut } from "../../libs/index.js";
import { Digraph } from "./Digraph.js";
export class DepthFirstDirectedPaths {

    _marked;
    _edgeTo;
    _s;

    constructor(G, s) {
        this._s = s;
        this._marked = new Array(G.V()).fill(false);
        this._edgeTo = new Array(G.V());
        this._edgeTo[s] = s;
        this.dfs(G, s);
    }

    dfs(G, v) {
        this._marked[v] = true;

        for (const w of G.adj(v)) {
            if (!this._marked[w]) {
                this._edgeTo[w] = v;
                this.dfs(G, w);
            }
        }
    }

    pathTo(v) {
        if (!this.hasPathTo(v)) return null;

        const stack = new Stack();
        while (this._edgeTo[v] !== v) {
            stack.push(v);
            v = this._edgeTo[v];
        }
        stack.push(v);
        return stack;
    }

    hasPathTo(v) {
        this.validate(v);
        return this._marked[v];
    }

    validate(v) {
        if (v < 0 || v >= this._marked.length) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (this._marked.length-1));
        }
    }

    static main() {
        const _in = new In('assets/tinyDG.txt');
        const G = new Digraph(_in);
        const s = 0;
        const paths = new DepthFirstDirectedPaths(G, s);

        for (let v = 0; v < G.V(); v++) {
            
            if (paths.hasPathTo(v)) {
                StdOut.printf('%d to %d: ', s, v);
                const path = paths.pathTo(v);
                for (const w of path) {
                    if (w === v) StdOut.printf(w)
                    else StdOut.printf("%d -> ", w);
                }
                StdOut.println();
            } else {
                StdOut.println("%d and %d not connected", s, v)
            }
        }
    
    }
}