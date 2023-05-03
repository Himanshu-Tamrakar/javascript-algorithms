import { HearSort } from "./heap-sort.js";
import { StdRandom } from "../../../libs/index.js";
export class HearSortClient {
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