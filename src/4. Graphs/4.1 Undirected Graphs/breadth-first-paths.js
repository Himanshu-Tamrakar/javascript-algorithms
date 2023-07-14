import { Queue } from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js';
import { Stack } from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js';
import { In, StdOut } from '../../libs/index.js';
import { Graph } from './graph.js';

export class BreadthFirstPaths {
    edgeTo;
    marked;
    s;
    constructor(G, s) {
        this.edgeTo = new Array(G.V());
        this.marked = Array(G.V()).fill(false);
        this.s = s;
        this.validate(s);
        this.edgeTo[s] = s;

        this.bfs(G, s);
    }

    bfs(G, s) {
        const queue = new Queue();
        this.marked[s] = true;
        queue.enqueue(s);

        while(!queue.isEmpty()) {
            const v = queue.dequeue();
            for (const w of G.adj(v)) {
                if (!this.marked[w]) {
                    this.marked[w] = true;
                    this.edgeTo[w] = v;
                    queue.enqueue(w);
                }
            }
        }
    }

    hasPathTo(v) {
        this.validate(v);
        return this.marked[v];
    }

    pathTo(v) {
        if (!this.hasPathTo(v)) return null;

        const stack = new Stack();
        while (this.edgeTo[v] != v) {
            stack.push(v);
            v = this.edgeTo[v];
        }
        stack.push(v);
        return stack;
    }

    validate(v) {
        if (v < 0 || v >= this.marked.length) {
            throw new ReferenceError('vertex ' + v + 'is not between 0 - ' + this.marked.length-1);
        }
    }

    static  main() {
        const _in = new In('assets/tinyCG.txt');
        const G = new Graph(_in);
        const s = 0;
        const bfs = new BreadthFirstPaths(G, s);

        for (let v = 0; v < G.V(); v++) {
            if (bfs.hasPathTo(v)) {
                StdOut.printf("%d to %d ", s, v);

                for (const w of bfs.pathTo(v)) {
                    if (w === v) StdOut.printf(w);
                    else StdOut.printf("%d - ", w);
                }
                StdOut.println();

            } else {
                StdOut.println("%d and %d not connected", s, v);
            }
            
        }


    }
}