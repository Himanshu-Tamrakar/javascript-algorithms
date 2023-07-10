import { In, StdOut } from "../../libs/index.js";
import { NFA } from "./NFA.js";
export class GREP {
    static main(args) {
        const pat = `(.*${args[0]}.*)`;
        const nfa = new NFA(pat);

        const _in = new In('assets/tinyL.txt');
        const words = _in.readLines();
        words.forEach(w => {
            if (nfa.recognizes(w)) StdOut.println(w);
        })
    }
}