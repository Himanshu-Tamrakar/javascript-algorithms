import {In} from "../../libs/index.js";
export class Quick3string {
    static CUTOFF = 15;
    static sort(arr) {
        this._sort(arr, 0, arr.length-1, 0);
    }

    static _sort(arr, lo, hi, d) {
        if (lo >= hi) return;

        // cutoff to insertion sort for small subarrays
        if (hi <= lo + this.CUTOFF) {
            this.insertion(arr, lo, hi, d);
            return;
        }

        let lt = lo;
        let gt = hi;
        let v = this.chatAt(arr[lo], d)
        let i = lo+1;
        while(i <= gt) {
            const t = this.chatAt(arr[i], d);
            if (t < v) this.exch(arr, i++, lt++)
            else if (t > v) this.exch(arr, i, gt--)
            else i++;
        }
        this._sort(arr, lo, lt-1, d);
        if (v >= 0) this._sort(arr, lt, gt, d+1);
        this._sort(arr, gt+1, hi, d);
    }

    static chatAt(str, w) {
        return w < str.length ? str.charCodeAt(w) : -1;
    }

     // insertion sort a[lo..hi], starting at dth character
     static insertion(a, lo, hi, d) {
        for (let i = lo; i <= hi; i++)
            for (let j = i; j > lo && this.less(a[j], a[j-1], d); j--)
                this.exch(a, j, j-1);
    }

    // exchange a[i] and a[j]
    static exch(a, i, j) {
        const temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    // is v less than w, starting at character d
    static less(v, w, d) {
        // assert v.substring(0, d).equals(w.substring(0, d));
        for (let i = d; i < Math.min(v.length, w.length); i++) {
            if (this.chatAt(v, i) < this.chatAt(w, i)) return true;
            if (this.chatAt(v, i) > this.chatAt(w, i)) return false;
        }
        return v.length < w.length;
    }

    static main() {
        const _in = new In('assets/shells.txt');
        const words = _in.readAllWords();
        Quick3string.sort(words);
        console.log(words);
    }
}