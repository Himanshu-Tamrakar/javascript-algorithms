import { WeightedQuichUnionUF } from "./weighted-quick-union-uf.js";
import { In, StdIn, StdOut } from "../../../libs/index.js";

export class WeightedQuickUnionUFClient {

    static main() {
        const file = new In('assets/largeUF.txt');
        const rows = file.readRawString().split('\n');
        const V = parseInt(rows.shift());
        const uf = new WeightedQuichUnionUF(V);

        rows.forEach(edge => {
            let [v, w] = edge.split(' ');
            v = parseInt(v);
            w = parseInt(w);

            if (uf.find(v) === uf.find(w)) return;
            uf.union(v, w);
            StdOut.printf('%d %d\n', v, w);
        })
    }
}
