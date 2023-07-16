import { BinarySearch } from "../1.1 Basic Programming Modal/BinarySearch.js";
import { In, StdOut } from "../../libs/index.js";

export function TwoSumFast(a) {
    a = Array.prototype.sort.call(a, (a, b) => a-b);
    if (TwoSumFast.isDuplocate(a)) throw new Error('array contains duplicate integers');
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        const j = BinarySearch.indexOf(a, -a[i]);
        if (j > i) {
            count ++;
        }
        
    }
    return count;
}

TwoSumFast.isDuplocate = function(a) {
    for (let i = 1; i < a.length; i++)
        if (a[i] == a[i-1]) return true;
    return false;
}

TwoSumFast.main = function() {
    const _in = new In('assets/2Kints.txt');
    const vals = _in.readAllInts();
    const count = this(vals);

    StdOut.println('Total number of two values whose sum is 0 is: %d', count);
}