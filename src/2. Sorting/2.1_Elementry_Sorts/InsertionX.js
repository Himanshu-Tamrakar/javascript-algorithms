import { In } from '../../libs/index.js';
/**
 *  Sorts a sequence of strings from standard input using an optimized
 *  version of insertion sort that uses half exchanges instead of
 *  full exchanges to reduce data movement..
 */
export class InsersionX {
    static sort(a) {

        const n = a.length;

        // put smallest element in position to serve as sentinel
        let exchanges = 0;
        for (let i = n-1; i > 0; i--) {
            if (this.less(a[i], a[i-1])) {
                this.exch(a, i, i-1);
                exchanges++;
            }
        }

        if (exchanges == 0) return;

        // insertion sort with half-exchanges
        for (let i = 2; i < n; i++) {
            const v = a[i];
            let j = i;
            while (this.less(v, a[j-1])) {
                a[j] = a[j-1];
                j--;
            }
            a[j] = v;
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
        InsersionX.sort(words);
        console.log(words);
    }

    
}