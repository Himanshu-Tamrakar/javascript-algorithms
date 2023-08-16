import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import {In, StdOut} from "../../libs/index.js";
import {Graph} from "./graph.js";


/**
 * No paraller edge and self loop present. 
 * Data files: https://algs4.cs.princeton.edu/41graph/tinyG.txt
 *             https://algs4.cs.princeton.edu/41graph/mediumG.txt
 *             https://algs4.cs.princeton.edu/41graph/largeG.txt
 */
export class Cycle {
    marked;
    edgeTo;
    _cycle;
    isCycle = false;

    /**
     * Determines whether the undirected graph {@code G} has a cycle and,
     * if so, finds such a cycle.
     *
     * @param G the undirected graph
     */
    constructor(G) {
        // need special case to identify parallel edge as a cycle
        if (this.hasParallelEdges(G)) return;

        // don't need special case to identify self-loop as a cycle
        // if (this.hasSelfLoop(G)) return;

        this.marked = Array(G.V()).fill(false);
        this.edgeTo = new Array(G.V());
        // this._cycle = new Stack();
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) this.dfs(G, -1, v);
        }
    }

    dfs(G, u, v) {
        this.marked[v] = true;
        for (const w of G.adj(v)) {
            // short circuit if cycle already found
            if (this._cycle != null) return;
            
            if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this.dfs(G, v, w);
            } 
            // check for cycle (but disregard reverse edge for w-v when check for v-w)
            else if (w !== u) {
                this._cycle = new Stack();
                for (let x = v; x != w; x = this.edgeTo[x]) {
                    this._cycle.push(x);
                }
                this._cycle.push(w);
                this._cycle.push(v);
            }
            
        }
    }

    /**
     * Returns true if the graph {@code G} has a cycle.
     *
     */
    hasCycle() {
        return this._cycle != null;
    }

    /**
     * Returns a cycle in the graph {@code G}.
     * @return a cycle if the graph {@code G} has a cycle,
     *         and {@code null} otherwise
     */
    cycle() {
        return this._cycle;
    }

    // does this graph have two parallel edges?
    // side effect: initialize cycle to be two parallel edges
    hasParallelEdges(G) {
        this.marked = Array(G.V()).fill(false);
        for (let v = 0; v < G.V(); v++) {
            for (const w of G.adj(v)) {
                if (this.marked[w]) {
                    this._cycle = new Stack();
                    this._cycle.push(v);
                    this._cycle.push(w);
                    this._cycle.push(v);
                    return true;
                }

                this.marked[w] = true;
            }
            //  reset
            for (const w of G.adj(v)) {
                this.marked[w] = false;
            }
        }
        return false;
    }

    // does this graph have a self loop?
    // side effect: initialize cycle to be self loop
    hasSelfLoop(G) {
        for (let v = 0; v < G.V(); v++) {
            for (let w of G.adj(v)) {
                if (v == w) {
                    this._cycle = new Stack();
                    this._cycle.push(v);
                    this._cycle.push(v);
                    return true;
                }
            }
        }
        return false;
    }

    static main() {
        const _in = new In('assets/mediumG.txt');
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
            StdOut.println("Graph is acyclic");
        }
        StdOut.println();

    }
}