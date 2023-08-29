import {In, StdOut} from "../../libs/index.js";

/**
 * Data files:   https://algs4.cs.princeton.edu/51radix/words3.txt
 */
export class LSD {

    /**
     * Rearranges the array of w-character strings in ascending order.
     *
     * @param a the array to be sorted
     * @param w the number of characters per string
     */
    static sort(a, w) {
        const n = a.length;
        const R = 256;   // extend ASCII alphabet size
        const aux = new Array(n);

        for (let d = w-1; d >= 0; d--) {
            // sort by key-indexed counting on dth character

            // compute frequency counts
            const count = new Array(R+1).fill(0);
            for (let i = 0; i < n; i++)
                count[a[i].charCodeAt(d) + 1]++;

            // compute cumulates
            for (let r = 0; r < R; r++)
                count[r+1] += count[r];

            // move data
            for (let i = 0; i < n; i++)
                aux[count[a[i].charCodeAt(d)]++] = a[i];

            // copy back
            for (let i = 0; i < n; i++)
                a[i] = aux[i];
        }


    }

    static main() {
        const _in = new In('assets/words3.txt');
        const words = _in.readAllWords();
        LSD.sort(words, words[0].length);
        StdOut.println('Sorted Array: ');
        StdOut.println(words);
    }
}