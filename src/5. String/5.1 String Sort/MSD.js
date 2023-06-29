import {In} from "../../libs/index.js";

export class MSD {
    static R = 256;
    static CUTOFF = 15;

    static sort(arr) {
        const aux = new Array(arr.length);
        this._sort(arr, 0, arr.length-1, 0, aux);
    }

    static _sort(arr, lo, hi, d, aux) {
        // if (lo >= hi) return; // Not require is CUTOFF condition is applied. For debugging remove cutoff condition and uncomment this check

        // cutoff to insertion sort for small subarrays
        if (hi <= lo + this.CUTOFF) {
            this.insertion(arr, lo, hi, d);
            return;
        }

        const count = new Array(this.R+2).fill(0);
        for (let i = lo; i <= hi; i++) {
            const c = this.chatAt(arr[i], d)
            count[c+2]++;
        }

        // transform count indeces
        for (let i = 0; i < this.R+1; i++) {
            count[i+1] += count[i];
        }

        // Sort based on position in count
        for (let i = lo; i <= hi; i++) {
            const c = this.chatAt(arr[i], d);
            aux[count[c+1]++] = arr[i];
        }

        // Copy back
        for (let i = lo; i <= hi; i++) {
            arr[i] = aux[i-lo];
        }

        // Recursively call
        for (let i = 0; i < this.R; i++) {
            this._sort(arr, lo + count[i], lo+count[i+1]-1, d+1, aux);
        }
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
        MSD.sort(words);
        console.log(words);
    }
}