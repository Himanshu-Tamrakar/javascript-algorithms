import MergeSort from "./merge_sort.js";

export default class MergeSortClient {
    static main() {
        const arr = [];
        const len = Math.trunc(Math.random() * 20);;
        for (let i = 0; i < len; i++) {
            arr[i] = Math.trunc(Math.random() * 100);
        }
        MergeSort.sort(arr);
        console.log('Is sorted', MergeSort.isSorted(arr));
    }
}