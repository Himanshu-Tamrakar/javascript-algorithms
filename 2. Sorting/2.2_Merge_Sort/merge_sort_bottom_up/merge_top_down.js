export default class MergeSort_Top_Down {
    static _aux = [];

    static sort(arr, comparator) {
        this._aux = new Array(arr.length);
        this._sort(arr, 0, arr.length-1, comparator);
    }

    static _sort(arr, lo, hi, comparator) {
        for (let sz = 1; sz < arr.length; sz = sz + sz) {
            for (let lo = 0; lo < arr.length-sz; lo = lo + sz+sz) {
                const hi = Math.min((lo + sz + sz - 1), arr.length-1);
                const mid = lo + sz-1;
                // const mid = lo + Math.ceil((hi-lo)/2); const mid = lo + Math.floor((hi-lo)/2); // Wont work
                this.merge(arr, lo, mid, hi);
            }
            
        }
    }

    static merge(arr, lo, mid, hi, comparator) {

        let i = lo;
        let j = mid+1;

        for (let k = lo; k <= hi; k++){
            this._aux[k] = arr[k];
        }

        for (let k = lo; k <= hi; k++) {
            if (i > mid) {
                arr[k] = this._aux[j++];
            } else if (j > hi) {
                arr[k] = this._aux[i++];
            } else if(this.less(this._aux[j], this._aux[i], comparator)) {
                arr[k] = this._aux[j++];
            } else {
                arr[k] = this._aux[i++];
            }
            
        }


    }

    static exch(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    static less(a, b, comparator = this.defaultComparator) {
        return comparator(a, b) < 0;
    }

    static defaultComparator(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }

    static isSorted(arr, comparator = this.defaultComparator) {
        for (let i = 1; i < arr.length; i++) {
            if (this.less(arr[i], arr[i-1], comparator)) {
                return false;
            }   
        }
        return true;
    }
}