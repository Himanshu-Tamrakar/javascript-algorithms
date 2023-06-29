import MergeSort_Top_Down from "./merge_top_down.js";
import { StdRandom } from "../../../libs/index.js";

export default class MergeSort_Top_Down_Client {
    static main() {
        const max = StdRandom.uniform(10, 100);
        const arr = [6,8,3,2,5, 6,7,4,23];
        for (let i = 0; i < max; i++) {
            arr[i] = Math.trunc(Math.random() * 1000)
        }
        const comp = (a, b) => b-a;
        MergeSort_Top_Down.sort(arr);
        console.log('Is sorted', MergeSort_Top_Down.isSorted(arr));
    }
}