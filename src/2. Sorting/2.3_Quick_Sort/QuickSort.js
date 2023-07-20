import { In, StdOut, StdRandom } from "../../libs/index.js";
export function QuickSort() {}

/**
 * Rearranges the array in ascending order, using the natural order.
 * @param a the array to be sorted
 */
QuickSort.sort = function(arr, comparable) {
    StdRandom.shuffle(arr);
    this._sort(arr, 0, arr.length-1, comparable);
}


// quicksort the subarray from a[lo] to a[hi]
QuickSort._sort = function(arr, lo, hi, comparable) {
    if (lo >= hi) return;

    const j = this.partition(arr, lo, hi, comparable);

    this._sort(arr, lo, j-1, comparable);
    this._sort(arr, j+1, hi, comparable);
}

// partition the subarray a[lo..hi] so that a[lo..j-1] <= a[j] <= a[j+1..hi]
// and return the index j.
QuickSort.partition = function(arr, lo, hi, comparable) {
    let i = lo;
    let j = hi+1;
    let v = arr[lo];

    while(true) {
         // find item on lo to swap
        while(this.less(arr[++i], v, comparable)) if (i == hi) break;
         // find item on hi to swap
        while(this.less(v, arr[--j], comparable)) if (j == lo) break;
        // check if pointers cross
        if(i >= j) break;
        this.exch(arr, i, j);
    }
     // put partitioning item v at a[j]
    this.exch(arr, lo, j);
    return j;
}

/**
 * Rearranges the array so that {@code a[k]} contains the kth smallest key;
 * {@code a[0]} through {@code a[k-1]} are less than (or equal to) {@code a[k]}; and
 * {@code a[k+1]} through {@code a[n-1]} are greater than (or equal to) {@code a[k]}.
 *
 * @param  a the array
 * @param  k the rank of the key
 * @return the key of rank {@code k}
 * @throws Error unless {@code 0 <= k < a.length}
 */
 QuickSort.select = function(a, k) {
    if (k < 0 || k >= a.length) {
        throw new Error("index is not between 0 and " + a.length + ": " + k);
    }
    StdRandom.shuffle(a);
    const lo = 0, hi = a.length - 1;
    while (hi > lo) {
        const i = partition(a, lo, hi);
        if      (i > k) hi = i - 1;
        else if (i < k) lo = i + 1;
        else return a[i];
    }
    return a[lo];
}

/***************************************************************************
    *  Helper sorting functions.
***************************************************************************/
// exchange a[i] and a[j]
QuickSort.exch = function(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
}

QuickSort.defaultComparator = function(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}
 // is a < b ?
QuickSort.less =function(a, b, comp = this.defaultComparator) {
    return comp(a, b) < 0;
}

QuickSort.isSorted = function(arr, comparator = this.defaultComparator) {
    for (let i = 1; i < arr.length; i++) {
        if (this.less(arr[i], arr[i-1], comparator)) {
            return false;
        }        
    }
    return true;
}

QuickSort.main = function() {
    const _in = new In('assets/words3.txt');
    const data = _in.readAllWords();
    QuickSort.sort(data);
    StdOut.println(data);
}