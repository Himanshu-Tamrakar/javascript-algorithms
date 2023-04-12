import MergeSort_Top_Down from "./merge_top_down.js";

export default class MergeSort_Top_Down_Client {
    static main() {
        const arr = [];
        const len = Math.trunc(Math.random() * 100);
        for (let i = 0; i < len; i++) {
            arr[i] = Math.trunc(Math.random() * 100);
        }
        MergeSort_Top_Down.sort(arr);
        console.log('Is sorted', MergeSort_Top_Down.isSorted(arr));
    }
}