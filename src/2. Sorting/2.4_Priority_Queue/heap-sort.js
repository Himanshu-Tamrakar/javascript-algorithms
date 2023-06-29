import { defaultComparator, compare } from "../../common/index.js";
import { StdRandom } from "../../libs/index.js";
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

    static main() {
        const max = StdRandom.uniform(10, 20);
        const arr = [6,8,3,2,5,7,4,23];
        for (let i = 0; i < max; i++) {
            arr[i] = Math.trunc(Math.random() * 100)
        }
        const comp = (a, b) => a-b;
        HearSort.sort(arr, comp);

        arr.forEach(v => console.log(v));
    }

}