import { StdRandom, In, StdIn, StdOut } from '../../libs/index.js';
import { Graph } from './graph.js';
export class DepthFirstSearch {
    _marked;
    _count;
    constructor(G, s) {
        this._marked = Array(G.V()).fill(false);
        this._count = 0;
        this.dfs(G, s);
    }

    dfs(G, v) {
        this._marked[v] = true;
        this._count++;
        for (const w of G.adj(v)) {
            if (!this._marked[w]) this.dfs(G, w);
        }
    }

    count() {
        return this._count;
    }

    marked(v) {
        this.validate(v);
        return this._marked[v];
    }

    validate(v) {
        if (v < 0 || v >= this._marked.length) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (this._marked.length-1));
        }
    }

    static main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);
        // const s = 0;
        const s = 9;
        const search = new DepthFirstSearch(G, s);
        for (let v = 0; v < G.V(); v++) {
            if (search.marked(v))
                StdOut.println(v + " ");
        }

        StdOut.println();
        if (search.count() != G.V()) StdOut.println("NOT connected");
        else                         StdOut.println("connected");
    }
}