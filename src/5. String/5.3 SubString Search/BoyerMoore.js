import { StdOut } from "../../libs/index.js";
export class BoyerMoore {
    pat;    // the pattern
    right;  // the bad-character skip array

    /**
     * Preprocesses the pattern string.
     *
     * @param pat the pattern string
     */
    constructor(pat) {
        this.pat = pat;
        const M = pat.length;
        const R = 256;
        this.right = new Array(R).fill(-1); // all filled with -1 indicates char not present in pattern

        // position of rightmost occurrence of c in the pattern
        for (let i = 0; i < M; i++) {
            const c = pat.charCodeAt(i);
            this.right[c] = i; // right most position in pattern
        }
    }

    /**
     * Returns the index of the first occurrence of the pattern string
     * in the text string.
     *
     * @param  txt the text string
     * @return the index of the first occurrence of the pattern string
     *         in the text string; n if no such match
     */
    search(txt) {
        const N = txt.length;
        const M = this.pat.length;
        let skip;
        for (let i = 0; i < N-M; i += skip) {
            skip = 0;
            for (let j = M-1; j >= 0; j--) {
                if (txt[i+j] != this.pat[j]) {
                    skip = j - this.right[txt.charCodeAt(i+j)];
                    if (skip < 1) skip = 1;
                    break; 
                }
            }

            if (skip === 0) return i;
        }
        return -1;
    }

    /**
     * Takes a pattern string and an input string as command-line arguments;
     * searches for the pattern string in the text string; and prints
     * the first occurrence of the pattern string in the text string.
     *
     * @param args the command-line arguments
     */
     static main() {
        const pat = 'abracadabra';
        const txt = 'abacadabrabracabracadabrabrabracad';

        const boyermoore1 = new BoyerMoore(pat);
        const offset1 = boyermoore1.search(txt);

        // print results
        StdOut.println("text:    " + txt);

        StdOut.printf("pattern: ");
        for (let i = 0; i < offset1; i++)
            StdOut.printf(" ");
        StdOut.println(pat);

    }
}