import  Stack_Link_List  from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack_Linked_List.js';
import { In, StdOut } from '../../libs/index.js';
import {Graph} from './graph.js';

export class DepthFirstPaths {
    marked;
    edgeTo;
    s;
    constructor(G, s) {
        this.s = s;
        this.edgeTo = Array(G.V());
        this.marked = Array(G.V()).fill(false)
        this.edgeTo[s] = s; // Sorce starts with source
        this.dfs(G, s);
    }

    dfs(G, s) {
        this.marked[s] = true;
        for (const w of G.adj(s)) {
            if (!this.marked[w]) {
                this.edgeTo[w] = s;
                this.dfs(G, w);
            }
        }
    }

    hasPathTo(v) {
        this.validate(v);
        return this.marked[v];
    }

    pathTo(v) {
        if (!this.hasPathTo(v)) return null;
        const stack = new Stack_Link_List();

        while(this.edgeTo[v] != v) {
            stack.push(v);
            v = this.edgeTo[v];
        }

        stack.push(v);

        return  stack;
    }

    validate(v) {
        if (v < 0 || v >= this.marked.length) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (this.marked.length-1));
        }
    }

    static main() {
        const _in = new In('assets/tinyCG.txt');
        const G = new Graph(_in);
        const s = 0;
        const paths = new DepthFirstPaths(G, s);

        for (let v = 0; v < G.V(); v++) {
            
            if (paths.hasPathTo(v)) {
                StdOut.printf('%d to %d: ', s, v);
                const path = paths.pathTo(v);
                for (const w of path) {
                    if (w === v) StdOut.printf(w)
                    else StdOut.printf("%d - ", w);
                }
                StdOut.println();
            } else {
                StdOut.println("% and %d not connected", s, v)
            }
        }
    }
}