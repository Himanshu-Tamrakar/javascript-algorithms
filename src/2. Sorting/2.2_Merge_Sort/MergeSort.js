import { In, StdOut } from "../../libs/index.js";
export class MergeSort {
    static _aux = [];

    static sort(arr, comp) {
        this._aux = new Array(arr.length); 
        this._sort(arr, 0,  arr.length-1, comp)
    }
    
    static _sort(arr, lo, hi, comp) {

        if (hi <= lo) return
        
        const mid = lo + Math.floor((hi-lo) / 2);

        this._sort(arr, lo, mid, comp);
        this._sort(arr, mid + 1, hi, comp);
        this.merge(arr, lo, mid, hi, comp);
    }

    static merge(arr, lo, mid, hi, comp) {

        // copy content from lo to hi in aux
        for (let k = lo; k <= hi; k++) {
            this._aux[k] = arr[k]
        }

        let i = lo;
        let j = mid+1;

        for (let k = lo; k <= hi; k++) {
            if (i > mid) {
                arr[k] = this._aux[j++];
            } else if (j > hi){
                arr[k] = this._aux[i++]
            } else if(this.less(this._aux[j], this._aux[i], comp)) {
                arr[k] = this._aux[j++];
            } else {
                arr[k] = this._aux[i++];
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
        MergeSort.sort(data);
        StdOut.println(data);
    }

}

// Both statement are doing same
// static _aux = [];
// Object.defineProperty(MergeSort, '_aux', {value: [], writable: true});

