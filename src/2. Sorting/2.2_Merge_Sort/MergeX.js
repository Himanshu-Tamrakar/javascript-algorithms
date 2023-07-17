import { In, StdOut } from "../../libs/index.js";
/**
 * Mergesort with following improvement
 * Improvements. We can cut the running time of mergesort substantially 
 * with some carefully considered modifications to the implementation.
 * 
 * 1. Use insertion sort for small subarrays. We can improve most recursive 
 * algorithms by handling small cases differently. Switching to insertion sort 
 * for small subarrays will improve the running time of a typical mergesort
 *  implementation by 10 to 15 percent.
 * 
 * 2. Test whether array is already in order. We can reduce the running time 
 * to be linear for arrays that are already in order by adding a test to skip 
 * call to merge() if a[mid] is less than or equal to a[mid+1]. With this change, 
 * we still do all the recursive calls, but the running time for any sorted subarray 
 * is linear.
 * 
 * 3. Eliminate the copy to the auxiliary array. It is possible to eliminate the time 
 * (but not the space) taken to copy to the auxiliary array used for merging. 
 * To do so, we use two invocations of the sort method, one that takes its input from 
 * the given array and puts the sorted output in the auxiliary array; the other takes 
 * its input from the auxiliary array and puts the sorted output in the given array. 
 * With this approach, in a bit of mindbending recursive trickery, we can arrange the 
 * recursive calls such that the computation switches the roles of the input array and 
 * the auxiliary array at each level.
 */
export class MergeX {

    static _aux = [];
    static CUTOFF = 15;


    static merge(src, dst, lo, mid, hi) {
        let i = lo, j = mid+1;
        for (let k = lo; k <= hi; k++) {
            if      (i > mid)              dst[k] = src[j++];
            else if (j > hi)               dst[k] = src[i++];
            else if (this.less(src[j], src[i])) dst[k] = src[j++];   // to ensure stability
            else                           dst[k] = src[i++];
        }
    }

    static sort(src, comp) {
        const dst = new Array(src.length); 
        for (let i = 0; i < src.length; i++) {
            dst[i] = src[i];
            
        }
        this._sort(src, dst, 0, src.length-1, comp)
    }
    
    static _sort(src, dst, lo, hi) {
        // if (hi <= lo) return;
        // Optimization 1
        if (hi <= lo + this.CUTOFF) { 
            this.insertionSort(dst, lo, hi);
            return;
        }
        const mid = lo +  Math.floor((hi - lo) / 2);
        this._sort(dst, src, lo, mid); // optimization 3
        this._sort(dst, src, mid+1, hi); // optimization 3

        // Optimization 2
        if (!this.less(src[mid+1], src[mid])) {
            for (let i = lo; i <= hi; i++) {
                dst[i] = src[i];
            }
            return;
        }

        this.merge(src, dst, lo, mid, hi);
    }

    static insertionSort(a, lo, hi, comp) {
        for (let i = lo+1; i < a.length; i++) {
            for (let j = i; j > lo && this.less(a[j], a[j-1], comp); j--) {
                this.exch(a, j, j-1)
            }
        }
    }

    static defaultComparator(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }

    static less(a, b, comp = this.defaultComparator) {
        return comp(a, b) < 0;
    }

    static exch(a, i, j) {
        [a[i], a[j]] = [a[j], a[i]];
    }

    static isSorted(arr, comparator = this.defaultComparator) {
        for (let i = 1; i < arr.length; i++) {
            if (this.less(arr[i], arr[i-1], comparator)) {
                return false;
            }  
        }
        return true;
    }

    static main() {
        const _in = new In('assets/words3.txt');
        const data = _in.readAllWords();
        MergeX.sort(data);
        StdOut.println(data);
    }

}