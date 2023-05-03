import { defaultComparator, compare } from "../../../common/index.js";
export class HearSort {
    static sort(a, comparator) {
        let n = a.length;
        let mid = Math.floor(n/2);
        for (let k = mid; k >= 1; k--) {
            this.sink(a, k, n, comparator);
        }
        let k = n;
        while (k > 1) {
            this.exch(a, 1, k--, comparator);
            this.sink(a, 1, k, comparator);
        }


    }

    static sink(a, k, n, comparator) {
        while(2*k <= n) {
            let j = 2*k;
            if (j < n && this.less(a, j, j+1, comparator)) j++;

            if (!this.less(a, k, j, comparator)) break;
            this.exch(a, j, k);
            k = j;
        }
    }

    // static swim(a, k, n, comparator) {
    //     while(k > 1 && thie.less(a, Math.floor(k/2), k, comparator)) {
    //         this.exch(a, Math.floor(k/2), k);
    //         k = Math.floor(k/2);
    //     }
    // }

    static less(a, i, j, comparator = defaultComparator) {
        return comparator(a[i-1], a[j-1]) < 0;
    }

    static exch(a, i, j) {
        [a[i-1], a[j-1]] = [a[j-1], a[i-1]];
    }

}