export class Quick3Way {

    static sort(arr, comparator) {
        this._sort(arr, 0, arr.length-1, comparator)
    }
    static _sort(arr, lo, hi, comparator) {
        if (lo >= hi) return;
        const [lt, gt] = this.partition(arr, lo, hi, comparator);
        this._sort(arr, lo, lt-1, comparator);
        this._sort(arr, gt+1, hi, comparator);
    }

    static partition(arr, lo, hi, comparator) {
        let i = lo;
        let lt = lo;
        let gt = hi;
        let v = arr[lo];

        while(i <= gt) {
            if (this.less(arr[i], v, comparator)) {
                this.exch(arr, i++, lt++)
            } else if (this.less(v, arr[i], comparator)) {
                this.exch(arr, i, gt--);
            } else {
                i++;
            }
        }

        return [lt, gt];
    }

    static defaultComparator(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }

    static less(a, b, comporator = this.defaultComparator) {
        return comporator(a, b) < 0;
    }

    static exch(arr, i,j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    static isSorted(arr, comporator) {
        for (let i = 1; i < arr.length; i++) {
            if (this.less(arr[i], arr[i-1], comporator)) return false;
        }

        return true;
    }
}