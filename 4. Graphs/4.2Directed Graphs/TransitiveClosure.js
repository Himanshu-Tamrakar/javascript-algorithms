import {DirectedDFS} from "./DirectedDFS.js";
import { In, StdOut } from "../../libs/index.js";
import {Digraph} from "./Digraph.js";

export class TransitiveClosure {
    tc;
    constructor(G) {
        this.tc = new Array(G.V());

        for (let v = 0; v < G.V(); v++) {
            this.tc[v] = new DirectedDFS(G, v);
        }
    }

     /**
     * Is there a directed path from vertex {@code v} to vertex {@code w} in the digraph?
     * @param  v the source vertex
     * @param  w the target vertex
     * @return {@code true} if there is a directed path from {@code v} to {@code w},
     *         {@code false} otherwise
     * @throws ReferenceError unless {@code 0 <= v < V}
     * @throws ReferenceError unless {@code 0 <= w < V}
     */
     reachable(v, w) {
        this.validateVertex(v);
        this.validateVertex(w);
        return this.tc[v].marked(w);
    }

      // throw an ReferenceError unless {@code 0 <= v < V}
      validateVertex(v) {
        const V = this.tc.length;
        if (v < 0 || v >= V)
            throw new ReferenceError("vertex " + v + " is not between 0 and " + (V-1));
    }

    /**
     * Unit tests the {@code TransitiveClosure} data type.
     *
     * @param args the command-line arguments
     */
    static main() {

        const _in = new In("assets/tinyDG.txt");
        const G = new Digraph(_in);

        const tc = new TransitiveClosure(G);

        // print header
        StdOut.println("     ");
        for (let v = 0; v < G.V(); v++)
            StdOut.printf("%d ", v);

        StdOut.println();
        StdOut.println("--------------------------------------------");

        // print transitive closure
        for (let v = 0; v < G.V(); v++) {
            StdOut.printf("%d:   ", v);
            for (let w = 0; w < G.V(); w++) {
                if (tc.reachable(v, w)) StdOut.printf("  T");
                else                    StdOut.printf("   ");
            }
            StdOut.println();
        }
    }
}