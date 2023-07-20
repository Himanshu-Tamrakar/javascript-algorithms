import { StdRandom, In, StdOut } from "../../libs/index.js";
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

    // quicksort the subarray a[lo .. hi] using 3-way partitioning
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

    /***************************************************************************
    *  Helper sorting functions.
    ***************************************************************************/
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

    static main() {
        const _in = new In('assets/words3.txt');
        const data = _in.readAllWords();
        const comp = (a, b) => a < b ? -1 : a > b ? 1 : 0;

        // const max = StdRandom.uniform(10, 20);
        // const data = [3,2,2,1,1,2,3,3,4,1,2,3];
        // for (let i = 0; i < max; i++) {
        //     data.push(Math.trunc(Math.random() * 10));
        // }
        // const comp = (a, b) => a-b;
            
        Quick3Way.sort(data, comp);
        StdOut.println(data);
        StdOut.println(Quick3Way.isSorted(data, comp));

    }
}