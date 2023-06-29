import { In, StdOut } from "../../libs/index.js";
import { Alphabet } from "./Alphabet.js";

export class Count {
    static main() {
        const _in = new In('assets/abra.txt');
        const s = _in.readRawString().split('');
        const alphabet = new Alphabet('ABCDR!');
        const count = Array(alphabet.radix()).fill(0);
        
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (alphabet.contains(ch))
                count[alphabet.toIndex(ch)]++
        }

        for (let c = 0; c < alphabet.radix(); c++)
            StdOut.println(alphabet.toChar(c) + " " + count[c]);
        
    }
} 