/**
 * Program: TwoSum
 * counts the number of two values in a file of N integers that sum to 0
 */

import { In, StdOut } from "../../libs/index.js";
export function TwoSum(a) {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        for (let j = i+1; j < a.length; j++) {
            if ((a[i] + a[j]) === 0) {
                count++;
            }
        }
    }
    return count;
}

TwoSum.main = function() {
    const _in = new In('assets/2Kints.txt');
    const vals = _in.readAllInts();
    const count = this(vals);

    StdOut.println('Total number of two values whose sum is 0 is: %d', count);
}