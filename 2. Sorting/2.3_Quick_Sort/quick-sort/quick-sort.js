import { StdRandom } from "../../../libs/index.js";
export function QuickSort() {}

QuickSort.sort = function(arr, comparable) {
    StdRandom.shuffle(arr);
    this._sort(arr, 0, arr.length-1, comparable);
}

QuickSort._sort = function(arr, lo, hi, comparable) {
    if (lo >= hi) return;

    const j = this.partition(arr, lo, hi, comparable);

    this._sort(arr, lo, j-1, comparable);
    this._sort(arr, j+1, hi, comparable);
}

QuickSort.partition = function(arr, lo, hi, comparable) {
    let i = lo;
    let j = hi+1;
    let v = arr[lo];

    while(true) {
        while(this.less(arr[++i], v, comparable)) if (i == hi) break;
        while(this.less(v, arr[--j], comparable)) if (j == lo) break;
        
        if(i >= j) break;
        this.exch(arr, i, j);
    }

    this.exch(arr, lo, j);
    return j;
}

QuickSort.exch = function(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
}

QuickSort.defaultComparator = function(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}

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