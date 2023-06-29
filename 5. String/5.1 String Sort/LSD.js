import {In} from "../../libs/index.js";

export class LSD {
    static sort(arr, W) {

        const R = 256;
        
        for (let w = W-1; w >= 0; w--) {
            const count = new Array(R+1).fill(0);

            for (let j = 0; j < arr.length; j++) {
                count[arr[j].charCodeAt(w)+1]++;
            }
            for (let j = 0; j < R; j++) {
                count[j+1] += count[j];
            }
            const aux = new Array(arr.length);
            for (let j = 0; j < arr.length; j++) {
                aux[count[arr[j].charCodeAt(w)]++] = arr[j];
            }

            for (let j = 0; j < arr.length; j++) {
                arr[j] = aux[j];
            }

        }

    }

    static main() {
        const _in = new In('assets/words3.txt');
        const words = _in.readAllWords();
        console.log(words.length);
        LSD.sort(words, 3);
        console.log(words.length);
    }
}