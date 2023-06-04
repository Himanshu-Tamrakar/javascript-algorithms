import { Graph } from "./graph.js";
import { StdIn, In, StdOut } from '../../libs/index.js'
export class GraphClient {
    static main() {
        const _in = new In('assets/tinyG.txt');
        const G = new Graph(_in);
        console.log(G._toString());

        StdOut.println("vertex of maximum degree = " + this.maxDegree(G));
        StdOut.println("average degree           = " + this.avgDegree(G));
        StdOut.println("number of self loops     = " + this.numberOfSelfLoops(G));
    }

    static maxDegree(G) {
        let max = 0;
        for (let i = 0; i < G.V(); i++) {
            const adj = G.adj(i);
            if (max < adj.size()) max = adj.size();
        }
        return max;
    }

    static avgDegree(G) {
       
        return 2 * G.E() / G.V();
    }

    static numberOfSelfLoops(G) {
        let sl = 0;
        for (let i = 0; i < G.V(); i++) {
            const v = i;

            for (const item of G.adj(v)) {
                if (item === v) sl++;
            }
            
        }
        return sl / 2;
    }
}
