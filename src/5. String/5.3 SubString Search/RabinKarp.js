import { StdOut } from "../../libs/index.js";
export class RabinKarp {
    pat;
    patHash;
    m;  // pattern length
    q;  // a large prime, small enough to avoid long overflow
    R;  // radix
    RM; // R^(M-1) % Q

    constructor(pat) {
        this.pat = pat;
        this.R = 256; // To test use value 10 for easy calculation
        this.m = pat.length;
        this.q = 997;

        this.RM = 1;
        for (let i = 1; i <= this.m-1; i++) {
            this.RM = (this.R * this.RM) % this.q;
        }
        this.patHash = this.hash(pat, this.m);
    }

    hash(key, m) {
        let h = 0;
        for (let i = 0; i < m; i++) {
            h = (h * this.R + key.charCodeAt(i)) % this.q;
        }
        return h;
    }

    // Las Vegas version: does pat[] match txt[i..i-m+1] ?
    check(txt, i) {
        for (let j = 0; j < this.m; j++)
            if (this.pat[j] != txt[i + j])
                return false;
        return true;
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
        const n = txt.length;
        if (n < this.m) return n;
        let txtHash = this.hash(txt, this.m);

        // check for match at offset 0
        if ((this.patHash == txtHash) && this.check(txt, 0))
            return 0;

        // check for hash match; if hash match, check for exact match
        for (let i = this.m; i < n; i++) {
            // Remove leading digit, add trailing digit, check for match.
            txtHash = (txtHash + this.q - this.RM*txt.charCodeAt(i-this.m) % this.q) % this.q;
            txtHash = (txtHash*this.R + txt.charCodeAt(i)) % this.q;

            // match
            let offset = i - this.m + 1;
            if ((this.patHash == txtHash) && this.check(txt, offset))
                return offset;
        }

        // no match
        return n;
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

        const searcher = new RabinKarp(pat);
        const offset1 = searcher.search(txt);

        // print results
        StdOut.println("text:    " + txt);

        StdOut.printf("pattern: ");
        for (let i = 0; i < offset1; i++)
            StdOut.printf(" ");
        StdOut.println(pat);
    }
}
