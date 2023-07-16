import { In } from '../../libs/index.js';
export class ShellSort {

    static sort(arr, comparator) {
        const N = arr.length;
        comparator = comparator || this.defaultComparator;

        let h = 1;
        while (h < N / 3) h = (h * 3) + 1; //1, 4, 13, 40;

        while (h >= 1) {
            for (let i = h; i < N; i++) {
                for (let j = i; j >= h && this.less(arr[j], arr[j - h], comparator); j -= h) {
                    this.exch(arr, j, j - h)
                }
            }
            h = Math.trunc(h / 3);
        }
    }

    static isSorted(arr) {
        for (let i = 1; i < arr.length; i++)
            if (this.less(arr[i], arr[i - 1])) return false;

        return true;
    }

    static less(a, b, comp = this.defaultComparator) {
        return comp(a, b) == -1;
    }

    static exch(a, i, j) {
        [a[i], a[j]] = [a[j], a[i]];
    }

    static defaultComparator(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }

    static main() {
        // const words = ['Himanshu', 'Aman', 'Anshul', 'Shetty', 'Anup', 'Harbu', 'Paranda', 'Aditya', 'Lankshay'];
        
        // const _in = new In('assets/tiny.txt');
        // const words = _in.readAllWords();
        
        const _in = new In('assets/words3.txt');
        const words = _in.readAllWords();
        ShellSort.sort(words);
        console.log(words);
    }
}