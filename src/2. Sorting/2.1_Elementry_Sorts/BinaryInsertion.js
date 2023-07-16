
import { In } from '../../libs/index.js';
/**
 * Sorts a sequence of strings from standard input using
 * binary insertion sort with half exchanges.
 */
export class BinaryInsertion {
    /**
     * Rearranges the array in ascending order, using the natural order.
     * @param a the array to be sorted
     */
     static sort(a) {
        const n = a.length;
        for (let i = 1; i < n; i++) {

            // binary search to determine index j at which to insert a[i]
            const v = a[i];
            let lo = 0, hi = i;
            while (lo < hi) {
                const mid = lo + Math.floor((hi - lo) / 2);
                if (this.less(v, a[mid])) hi = mid;
                else                 lo = mid + 1;
            }

            // insertion sort with "half exchanges"
            // (insert a[i] at index j and shift a[j], ..., a[i-1] to right)
            for (let j = i; j > lo; --j)
                a[j] = a[j-1];
            a[lo] = v;
        }
    }


    static defaultComparator = function(a, b) {
        if (a === b) return 0
    
        return a < b ? -1 : 1
    }

    static exch = function(a, i, j) {
        [a[i], a[j]] = [a[j], a[i]];
    }

    static less = function(a, b, comp = this.defaultComparator) {
        return comp(a, b) < 0;
    }

    static isSorted = function(arr, comp = this.defaultComparator) {
        for (let i = 1; i < arr.length; i++) {
            if (this.less(arr[i], arr[i-1], comp)) {
                return false;
            }
        }
        return true;
    }

    static main = function() {
        // const words = ['Himanshu', 'Aman', 'Anshul', 'Shetty', 'Anup', 'Harbu', 'Paranda', 'Aditya', 'Lankshay'];
        
        // const _in = new In('assets/tiny.txt');
        // const words = _in.readAllWords();

        const _in = new In('assets/words3.txt');
        const words = _in.readAllWords();
        BinaryInsertion.sort(words);
        console.log(words);
    }

}

