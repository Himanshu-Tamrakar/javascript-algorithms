import { Queue } from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js';
import { Stack } from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js';
import { In, StdOut } from '../../libs/index.js';
import { Graph } from './graph.js';
const INFINITY = Number.MAX_SAFE_INTEGER;
/**
 * Data files: https://algs4.cs.princeton.edu/41graph/tinyCG.txt
 *             https://algs4.cs.princeton.edu/41graph/tinyG.txt
 *             https://algs4.cs.princeton.edu/41graph/mediumG.txt
 *             https://algs4.cs.princeton.edu/41graph/largeG.txt
 */
export class BreadthFirstPaths {
    edgeTo; // this.edgeTo[v] = previous edge on shortest s-v path
    marked; // this.marked[v] = is there an s-v path
    _distTo; // this.distTo[v] = number of edges shortest s-v path
    s;

    /**
     * Computes the shortest path between the source vertex {@code s}
     * and every other vertex in the graph {@code G}.
     * @param G the graph
     * @param s the source vertex
     * @throws ReferenceError unless {@code 0 <= s < V}
     */
    constructor(G, s) {
        this.edgeTo = new Array(G.V());
        this._distTo = new Array(G.V());
        this.marked = Array(G.V()).fill(false);
        this.s = s;
        this.validate(s);
        this.edgeTo[s] = s;
        this.bfs(G, s);
    }

    // breadth-first search from a single source
    bfs(G, s) {
        const queue = new Queue();
        for (let v = 0; v < G.V(); v++) {
            this._distTo[v] = INFINITY;
        }
        this._distTo[s] = 0;
        this.marked[s] = true;
        queue.enqueue(s);

        while(!queue.isEmpty()) {
            const v = queue.dequeue();
            for (const w of G.adj(v)) {
                if (!this.marked[w]) {
                    this.edgeTo[w] = v;
                    this._distTo[w] = this._distTo[v] + 1;
                    this.marked[w] = true;
                    queue.enqueue(w);
                }
            }
        }
    }

    /**
     * Is there a path between the source vertex {@code s} (or sources) and vertex {@code v}?
     * @param v the vertex
     * @return {@code true} if there is a path, and {@code false} otherwise
     * @throws ReferenceErro unless {@code 0 <= v < V}
     */
    hasPathTo(v) {
        this.validate(v);
        return this.marked[v];
    }

    /**
     * Returns the number of edges in a shortest path between the source vertex {@code s}
     * (or sources) and vertex {@code v}?
     * @param v the vertex
     * @return the number of edges in such a shortest path
     *         (or {@code Integer.MAX_VALUE} if there is no such path)
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    distTo(v) {
        this.validate(v);
        return this._distTo[v];
    }

    /**
     * Returns a shortest path between the source vertex {@code s} (or sources)
     * and {@code v}, or {@code null} if no such path.
     * @param  v the vertex
     * @return the sequence of vertices on a shortest path, as an Iterable
     * @throws ReferenceErro unless {@code 0 <= v < V}
     */
    pathTo(v) {
        this.validate(v);
        if (!this.hasPathTo(v)) return null;
        const path = new Stack();
        let x;
        for (x = v; this._distTo[x] != 0; x = this.edgeTo[x]) {
            path.push(x);
        }
        path.push(x);
        return path;
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validate(v) {
        const V = this.marked.length
        if (v < 0 || v >= V) {
            throw new ReferenceError('vertex ' + v + 'is not between 0 - ' + V-1);
        }
    }

    static  main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);
        const s = 0;
        const path = new BreadthFirstPaths(G, s);

        for (let v = 0; v < G.V(); v++) {
            if (path.hasPathTo(v)) {
                StdOut.printf("%d to %d (%d) ", s, v, path.distTo(v));

                for (const w of path.pathTo(v)) {
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