import {StdOut} from '../../libs/index.js';

export class KMP {
    pat;
    dfa;
    constructor(pattern) {
        this.pat = pattern;
        const M = pattern.length;
        const R = 256;
         //(Matrix of R X M)
        this.dfa = new Array(R);
        for (let i = 0; i < R; i++) {
         this.dfa[i] = new Array(M).fill(0);
        }
        const c = this.pat.charCodeAt(0);
        this.dfa[c][0] = 1;
        for (let X = 0, j = 0; j < M; j++) {
            for (let c = 0; c < R; c++) {
                this.dfa[c][j] = this.dfa[c][X]
            }
            const c = this.pat.charCodeAt(j);
            this.dfa[c][j] = j+1;
            X = this.dfa[this.pat.charCodeAt(j)][X];
        }
    }

    search(txt) {
        let i, j, N = txt.length, M = this.pat.length;
        for (i = 0, j = 0; i < N && j < M; i++) {
            const c = txt.charCodeAt(i);
            j = this.dfa[c][j];
        }
        if (j == M) return i - M;
        return -1;
    }   

    static main() {
        const pat = 'abracadabra';
        const txt = 'abacadabrabracabracadabrabrabracad';

        // const pat = 'vallvall';
        // const txt = 'abacadabrabracabracvalladvallvallabrabrabracad';

        const kmp1 = new KMP(pat);
        const offset1 = kmp1.search(txt);

        // print results
        StdOut.println("text:    " + txt);

        StdOut.printf("pattern: ");
        for (let i = 0; i < offset1; i++)
            StdOut.printf(" ");
        StdOut.println(pat);

    }
} 