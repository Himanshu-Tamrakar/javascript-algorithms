import { In, StdOut } from "../../../libs/index.js";
import { hashCode } from "../../../common/index.js";
import {LinearProbingHashST} from "./LinearProbingHashST.js";

export class LinearProbingHashSTClient {
   static main() {
      let file = new In('assets/tinyTale.txt');
      const words = file.readAllString();
      const st = new LinearProbingHashST();

      words.forEach(word => {
        debugger
         let init_val = 1;
         if(st.contains(word)) {
            init_val = st.get(word) + 1;
         }

         st.put(word, init_val);
      });

      debugger
      const queue = st.keys();
      while(!queue.isEmpty()) {
         const key = queue.dequeue();
         StdOut.printf('Key: %s, value: %d \n', key, st.get(key));
      }
   }   
}