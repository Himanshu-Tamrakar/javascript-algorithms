import { StdOut } from "../../libs/index.js";
const MAX_VALUE = 65535; // Unicode possible charectors
export class Alphabet {

    /**
     *  The binary alphabet { 0, 1 }.
     */
    static BINARY = new Alphabet("01");

    /**
     *  The octal alphabet { 0, 1, 2, 3, 4, 5, 6, 7 }.
     */
    static OCTAL = new Alphabet("01234567");

    /**
     *  The decimal alphabet { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }.
     */
    static DECIMAL = new Alphabet("0123456789");

    /**
     *  The hexadecimal alphabet { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F }.
     */
    static HEXADECIMAL = new Alphabet("0123456789ABCDEF");

    /**
     *  The DNA alphabet { A, C, T, G }.
     */
    static DNA = new Alphabet("ACGT");

    /**
     *  The lowercase alphabet { a, b, c, ..., z }.
     */
    static LOWERCASE = new Alphabet("abcdefghijklmnopqrstuvwxyz");

    /**
     *  The uppercase alphabet { A, B, C, ..., Z }.
     */

    static UPPERCASE = new Alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

    /**
     *  The protein alphabet { A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y }.
     */
    static PROTEIN = new Alphabet("ACDEFGHIKLMNPQRSTVWY");

    /**
     *  The base-64 alphabet (64 characters).
     */
    static BASE64 = new Alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    R;
    unicode;
    inverse;
    alphabet;

    constructor(alpha) {
        if (typeof alpha === 'string') {
            this.unicode = Array(MAX_VALUE).fill(false);
            for (let i = 0; i < alpha.length; i++) {
                const c = alpha.charCodeAt(i);
                if (this.unicode[c])
                    throw new TypeError("Illegal alphabet: repeated character = '" + c + "'");
                this.unicode[c] = true;
            }

            this.alphabet = alpha;
            this.R = alpha.length;
            this.inverse = Array(MAX_VALUE).fill(-1);


            for (let c = 0; c < this.R; c++) {
                this.inverse[this.alphabet.charCodeAt(c)] = c;
            }
        }
    }

    contains(ch) {
        return this.inverse[ch.charCodeAt(0)] != -1;
    }

    /**
     * Returns the number of characters in this alphabet (the radix).
     * 
     * @return the number of characters in this alphabet
     */
    radix() {
        return this.R;
    }

     /**
     * Returns the binary logarithm of the number of characters in this alphabet.
     * 
     * @return the binary logarithm (rounded up) of the number of characters in this alphabet
     */
     lgR() {
        let lgR = 0;
        for (let t = this.R-1; t >= 1; t = Math.floor(t/2))
            lgR++;
        return lgR;
    }

    /**
     * Returns the index corresponding to the argument character.
     * 
     * @param  c the character
     * @return the index corresponding to the character {@code c}
     * @throws TypeError unless {@code c} is a character in this alphabet
     */
    toIndex(c) {
        const ch = c.charCodeAt(0);
        if (ch >= this.inverse.length || this.inverse[ch] == -1) {
            throw new TypeError("Character " + c + " not in alphabet");
        }
        return this.inverse[ch];
    }

    /**
     * Returns the indices corresponding to the argument characters.
     * 
     * @param  s the characters
     * @return the indices corresponding to the characters {@code s}
     * @throws TypeError unless every character in {@code s}
     *         is a character in this alphabet
     */
    toIndices(s) {
        let source = s;
        let target  = new Array(s.length);
        for (let i = 0; i < source.length; i++)
            target[i] = this.toIndex(source[i]);
        return target;
    }

      /**
     * Returns the character corresponding to the argument index.
     * 
     * @param  index the index
     * @return the character corresponding to the index {@code index}
     * @throws IllegalArgumentException unless {@code 0 <= index < R}
     */
      toChar(index) {
        if (index < 0 || index >= this.R) {
            throw new TypeError("index must be between 0 and " + R + ": " + index);
        }
        return this.alphabet[index];
    }

    /**
     * Returns the characters corresponding to the argument indices.
     * 
     * @param  indices the indices
     * @return the characters corresponding to the indices {@code indices}
     * @throws TypeError unless {@code 0 < indices[i] < R}
     *         for every {@code i}
     */
    toChars(indices) {
        let s = '';
        for (let i = 0; i < indices.length; i++)
            s += (this.toChar(indices[i]));
        return s.toString();
    }

    static main() {
        
        let encoded1 = Alphabet.BASE64.toIndices("NowIsTheTimeForAllGoodMen");
        let decoded1 = Alphabet.BASE64.toChars(encoded1);
        StdOut.println(decoded1);
 
        let encoded2 = Alphabet.DNA.toIndices("AACGAACGGTTTACCCCG");
        let decoded2 = Alphabet.DNA.toChars(encoded2);
        StdOut.println(decoded2);

        let encoded3 = Alphabet.DECIMAL.toIndices("01234567890123456789");
        let decoded3 = Alphabet.DECIMAL.toChars(encoded3);
        StdOut.println(decoded3);


        const alpha = new Alphabet('ACTG');
        console.log(alpha.lgR());
        console.log(alpha.toIndex('G'));
        console.log(alpha.toIndices('ACG'));
        console.log(alpha.toChars('013'));

    }
}