// Use of a static array like aux[] is inadvisable in library software because multiple
// clients might use the class concurrently. Give an implementation of Merge that does not
// use a static array. Do not make aux[] local to merge() (see the Q&A for this section).
// Hint : Pass the auxiliary array as an argument to the recursive sort()


class Example_2_2_9 {
    
    static sort(arr, comparator) {
        const _aux = new Array(arr.length);

        this._sort(arr, _aux, 0, arr.length-1, comparator);

    }

    static _sort(arr, _aux, lo, hi, comparator) {
        for (let sz = 1; sz < arr.length; sz = sz+sz) {
            
            for (let lo = 0; lo < arr.length-sz; lo = lo+sz+sz) {
                const hi = Math.min(lo+sz+sz-1, arr.length-1);
                const mid = lo+sz-1;
                this.merge(arr,  _aux, lo, mid, hi, comparator);
            }
            
        }

    }

    static merge(arr, _aux, lo, mid, hi, comparator) {
        for (let k = lo; k <= hi; k++) {
            _aux[k] = arr[k];
        }

        let i = lo;
        let j = mid+1;

        for (let k = lo; k <= hi; k++) {
            
            if (i > mid) {
                arr[k] = _aux[j++];
            } else if (j > hi) {
                arr[k] = _aux[i++];
            } else if(this.less(_aux[j], _aux[i], comparator)) {
                arr[k] = _aux[j++];
            } else {
                arr[k] = _aux[i++];
            }
        }
    }

    static defaultComparator(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }

    static less(a, b, comparator = this.defaultComparator) {
        return comparator(a, b) < 0;
    }

    static exch(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
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


export default class Example_2_2_9_Client {
    static main() {
        const arr = [];
        const len = Math.trunc(Math.random() * 100);

        for (let i = 0; i < len; i++) {
            arr[i] = Math.trunc(Math.random() * 100);
        }

        // decending order sorting
        const comparator = (a, b) => {
            if (a === b) return 0;
            return a < b ? 1 : -1;
        }
    
        Example_2_2_9.sort(arr, comparator);
        
        console.log(arr);
        console.log('Is sorted', Example_2_2_9.isSorted(arr, comparator));
    }

    
}