import { Digraph } from "./Digraph.js";
import { In, StdOut } from "../../libs/index.js";
import Queue_Linked_List from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js";
import Stack_Link_List from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack_Linked_List.js";

export class BreadthFirstDirectedPaths {
    _marked;
    _edgeTo;
    _s;
    constructor(G, s) {
        this._marked = new Array(G.V()).fill(false);
        this._edgeTo = new Array(G.V())
        this.validate(s);
        this._edgeTo[s] = s;
        this.bfs(G, s);
    }

    bfs(G, s) {
        const queue = new Queue_Linked_List();
        this._marked[s] = true;
        queue.enqueue(s);
        while(!queue.isEmpty()) {
            const v = queue.dequeue();
            for (const w of G.adj(v)) {
                if (!this._marked[w]) {
                    this._marked[w] = true;
                    this._edgeTo[w] = v;
                    queue.enqueue(w);
                }
            }
        }
    }

    hasPathTo(v) {
        this.validate(v);
        return this._marked[v];
    }

    pathTo(v) {
        this.validate(v);

        const stack = new Stack_Link_List();
        while(this._edgeTo[v] != v) {
            stack.push(v);
            v = this._edgeTo[v];
        }
        stack.push(v);
        return stack;
    }

    validate(v) {
        if (v < 0 || v >= this._marked.length) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (this._marked.length-1));
        }
    }

    static  main() {
        const _in = new In('assets/tinyDG.txt');
        const G = new Digraph(_in);
        const s = 0;
        const bfs = new BreadthFirstDirectedPaths(G, s);
        for (let v = 0; v < G.V(); v++) {
            if (bfs.hasPathTo(v)) {
                StdOut.printf("%d to %d ", s, v);

                for (const w of bfs.pathTo(v)) {
                    if (w === v) StdOut.printf(w);
                    else StdOut.printf("%d -> ", w);
                }
                StdOut.println();

            } else {
                StdOut.println("%d and %d not connected", s, v);
            }
            
        }


    }
}