import {StdOut} from "../../libs/index.js";

// Euclid Algorithm
/**
 * Gretest common divisor
 * @param {} p integer value 
 * @param {} q integer value 
 * @returns return the gsd or 1
 */
export function gcd(p, q) {
    if (Number.isNaN(p) || Number.isNaN(q)) {
        throw new TypeError('argument p and q in gcd() should be a number');
    }
    if(q === 0) {
        return p
    }

    const r = p % q; 
    return gcd(q, r);
};

export function gcd_test() {
    StdOut.println(gcd(100, 20));
    StdOut.println(gcd(5, 4));
    StdOut.println(gcd(36, 4));
    // if q > p then % with r will be p;
    StdOut.println(gcd(4, 36));
    StdOut.println(gcd(20, 100));
    StdOut.println(gcd(-20, -100));
}


