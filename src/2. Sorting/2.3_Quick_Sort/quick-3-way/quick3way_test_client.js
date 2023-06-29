import { StdRandom } from "../../../libs/index.js";
import { Quick3Way } from "./quick3way.js";

export default class Quick3WayTest {
    static main() {
        const max = StdRandom.uniform(10, 100000);
        
        const arr = [3,2,2,1,1,2,3,3,4,1,2,3];
        const comp = (a, b) => b-a;
        for (let i = 0; i < max; i++) {
            arr.push(Math.trunc(Math.random() * 10));
        }
            
        Quick3Way.sort(arr, comp);
        console.log(Quick3Way.isSorted(arr, comp));
    }
}