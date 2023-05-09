import { SequencialST } from "./sequencial-st.js";
import { StdRandom } from "../../../libs/index.js";

export class SequencialSTClient {
    static main() {
        const n = StdRandom.uniform(10, 50);
        const keys = 'QWERTYUIOPLKJHGFDSAZXCVBNM'.split('');

        const st = new SequencialST();

        for (let i = 0; i < keys.length; i++) {
            st.put(keys[i], i);
            
        }

        for (const key of st) {
            console.log(key, ' : ', st.get(key));
        }
    }
}