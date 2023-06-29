import {StdRandom} from "../../../libs/index.js";
import { QuickSort } from "./quick-sort.js";

export class QuickSortTestClient {
    static main() {
        const max = StdRandom.uniform(10, 100);
        const arr = [6,8,3,2,5, 6,7,4,23];
        for (let i = 0; i < max; i++) {
            arr[i] = Math.trunc(Math.random() * 1000)
        }
        const comp = (a, b) => b-a;
        QuickSort.sort(arr, comp);
        console.log('Is Sorted', QuickSort.isSorted(arr, comp));
    }
}