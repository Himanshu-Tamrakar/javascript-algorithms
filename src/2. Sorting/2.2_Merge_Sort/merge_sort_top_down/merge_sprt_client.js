import MergeSort from "./merge_sort.js";
import { StdRandom } from "../../../libs/index.js";

export default class MergeSortClient {
    static main() {
        const max = StdRandom.uniform(10, 100);
        const arr = [6,8,3,2,5, 6,7,4,23];
        for (let i = 0; i < max; i++) {
            arr[i] = Math.trunc(Math.random() * 1000)
        }
        const comp = (a, b) => b-a;
        MergeSort.sort(arr, comp);
        console.log('Is sorted', MergeSort.isSorted(arr, comp));
    }
}