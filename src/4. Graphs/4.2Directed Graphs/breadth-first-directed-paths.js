import { Digraph } from "./Digraph.js";
import { In, StdOut } from "../../libs/index.js";
import { Queue } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js";
import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { isIterable } from "../../utils/index.js";

/**
 *  Data files:   https://algs4.cs.princeton.edu/42digraph/tinyDG.txt
 *                https://algs4.cs.princeton.edu/42digraph/mediumDG.txt
 *                https://algs4.cs.princeton.edu/42digraph/largeDG.txt
 */
export class BreadthFirstDirectedPaths {
    _marked;    // this._marked[v] = is there an s->v path?
    _edgeTo;    // this._edgeTo[v] = last edge on shortest s->v path
    _distTo;    // dthis._istTo[v] = length of shortest s->v path
    _s;         // source vertex

    /**
     * Computes the shortest path from {@code s} and every other vertex in graph {@code G}.
     * @param G the digraph
     * @param s the source vertex
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    constructor(G, s) {
        if (typeof s === 'number') {
            this._marked = new Array(G.V()).fill(false);
            this._edgeTo = new Array(G.V())
            this._distTo = new Array(G.V()).fill(Number.POSITIVE_INFINITY);
            this.validate(s);
            this.bfs(G, s);    
        } else if (Array.isArray(s) || isIterable(s)) {
            this._constructor(G, s);
        }
        
    }

    /**
     * Computes the shortest path from any one of the source vertices in {@code sources}
     * to every other vertex in graph {@code G}.
     * @param G the digraph
     * @param sources the source vertices
     * @throws ReferenceError if {@code sources} is {@code null}
     * @throws ReferenceError if {@code sources} contains no vertices
     * @throws ReferenceError unless each vertex {@code v} in
     *         {@code sources} satisfies {@code 0 <= v < V}
     */
    _constructor(G, sources) {
        this._marked = new Array(G.V()).fill(false);
        this._distTo = new Array(G.V()).fill(Number.POSITIVE_INFINITY);;
        this._edgeTo = new Array(G.V());
        
        this.validate(sources);
        this.bfs_multiple_sources(G, sources);
    }

    // BFS from single source
    bfs(G, s) {
        const queue = new Queue();
        this._marked[s] = true;
        this._distTo[s] = 0;
        queue.enqueue(s);
        while(!queue.isEmpty()) {
            const v = queue.dequeue();
            for (const w of G.adj(v)) {
                if (!this._marked[w]) {
                    this._edgeTo[w] = v;
                    this._distTo[w] = this._distTo[v] + 1;
                    this._marked[w] = true;
                    queue.enqueue(w);
                }
            }
        }
    }

    // BFS from multiple sources
    bfs_multiple_sources(G, sources) {
        const q = new Queue();
        for (const s of sources) {
            this._marked[s] = true;
            this._distTo[s] = 0;
            q.enqueue(s);
        }
        while (!q.isEmpty()) {
            const v = q.dequeue();
            for (const w of G.adj(v)) {
                if (!this._marked[w]) {
                    this._edgeTo[w] = v;
                    this._distTo[w] = this._distTo[v] + 1;
                    this._marked[w] = true;
                    q.enqueue(w);
                }
            }
        }
    }

    /**
     * Is there a directed path from the source {@code s} (or sources) to vertex {@code v}?
     * @param v the vertex
     * @return {@code true} if there is a directed path, {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    hasPathTo(v) {
        this.validate(v);
        return this._marked[v];
    }

    /**
     * Returns the number of edges in a shortest path from the source {@code s}
     * (or sources) to vertex {@code v}?
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
     * Returns a shortest path from {@code s} (or sources) to {@code v}, or
     * {@code null} if no such path.
     * @param v the vertex
     * @return the sequence of vertices on a shortest path, as an Iterable
     * @throws ReferenceError unless {@code 0 <= v < V}
     */
    pathTo(v) {
        this.validate(v);

        if (!this.hasPathTo(v)) return null;
        const path = new Stack();
        let x;
        for (x = v; this._distTo[x] != 0; x = this._edgeTo[x])
            path.push(x);
        path.push(x);
        return path;
    }

    // throw an ReferenceError unless {@code 0 <= v < V}
    validate(v) {
        if (v < 0 || v >= this._marked.length) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (this._marked.length-1));
        }
    }

    // throw an ReferenceError if vertices is null, has zero vertices,
    // or has a vertex not between 0 and V-1
    validateVertices(vertices) {
        if (vertices == null) {
            throw new ReferenceError("argument is null");
        }
        let vertexCount = 0;
        for (let v of vertices) {
            vertexCount++;
            if (v == null) {
                throw new ReferenceError("vertex is null");
            }
            this.validate(v);
        }
        if (vertexCount == 0) {
            throw new ReferenceError("zero vertices");
        }
    }
    
    static  main() {
        const _in = new In('assets/tinyDG.txt');
        const G = new Digraph(_in);
        const s = 3;

        const bfs = new BreadthFirstDirectedPaths(G, s);

        for (let v = 0; v < G.V(); v++) {
            if (bfs.hasPathTo(v)) {
                StdOut.printf("%d to %d (%d):  ", s, v, bfs.distTo(v));
                for (let x of bfs.pathTo(v)) {
                    if (x == s) StdOut.printf(x);
                    else        StdOut.printf("->" + x);
                }
                StdOut.println();
            }

            else {
                StdOut.printf("%d to %d (-):  not connected\n", s, v);
            }

        }
    }
}