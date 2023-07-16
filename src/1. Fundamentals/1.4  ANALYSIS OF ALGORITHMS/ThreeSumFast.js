import { BinarySearch } from "../1.1 Basic Programming Modal/BinarySearch.js";
import { In, StdOut } from "../../libs/index.js";

export function ThreeSumFast(a) {
    a = Array.prototype.sort.call(a, (a, b) => a-b);
    if (ThreeSumFast.isDuplocate(a)) throw new Error('array contains duplicate integers');
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        for (let j = i+1; j < a.length; j++) {
            const k = BinarySearch.indexOf(a, -(a[i] + a[j]));
            if (k > j) count++;
        }
    }
    return count;


}

ThreeSumFast.isDuplocate = function(a) {
    for (let i = 1; i < a.length; i++)
        if (a[i] == a[i-1]) return true;
    return false;
}

ThreeSumFast.main = function() {
    const _in = new In('assets/2Kints.txt');
    const vals = _in.readAllInts();
    const count = this(vals);

    StdOut.println('Three values whose sum is 0 are: %d', count);
}