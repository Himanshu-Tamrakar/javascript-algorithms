import { In, StdIn, StdOut } from "../../../libs/index.js";
import { QuickUnionUF } from "./quick-union-uf.js";
export class QuickUnionUFClient {
    static main() {
        const file = new In('assets/tinyUF.txt');
        const rows = file.readRawString().split('\n');
        const V = parseInt(rows.shift());
        const uf = new QuickUnionUF(V);

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