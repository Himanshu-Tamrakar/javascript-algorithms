import {BinarySeachSt} from "./binary-search-st.js";
import {In, StdIn, StdOut, StdRandom} from "../../../libs/index.js";

export class BinarySeachStClient {
    static main() {
        console.log('Enter word length: ');
        StdIn.read()
            .on('line', line => {
                const lineSplit = line.split(/\s+/);
                const len = parseInt(lineSplit[0]);
                let file = new In('assets/tinyTale.txt');
                const st = new BinarySeachSt();
                const words = file.readAllString();


                for (let i = 0; i < words.length; i++) {
                    const word = words[i];

                    if (word.length < len) continue;

                    if (!st.contains(word)) st.put(word, 1);
                    else st.put(word, st.get(word) + 1);
                }

              

                console.log('Printing all the keys');
                let res = '';
                for (const key of st) {
                    res += key + ', ';``
                }
                console.log(res);

                console.log('Minimum is: %s', st.min());
                console.log('Maximum is: %s', st.max());
                console.log('Deleting Minimum, maximum');
                st.delMin();
                st.delMax();
                console.log('Minimum is: %s', st.min());
                console.log('Maximum is: %s', st.max());

                console.log('Printing all keys');
                res = '';
                for (const key of st) {
                    res += key + ', ';
                }
                console.log(res);


                let max = '';
                st.put(max, 0);
                for (const word of st.keys()) {
                    if (st.get(word) > st.get(max)) max = word;
                }
                StdOut.printf('Maximum count word is: %s and frequency is: %d', max, st.get(max));
            })




    }
}