
import { StdOut } from "../../libs/index.js";
/**
 *  The {@code BinarySearch} class provides a static method for binary
 *  searching for an element in a sorted array.
 *  <p>
 *  The <em>indexOf</em> operations takes logarithmic time in the worst case.
 *  <p>
 *  For additional documentation, see <a href="https://algs4.cs.princeton.edu/11model">Section 1.1</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 *  @author Himanshu Tamrakar
 * 
 *  @note: Array Value should be comparable.
 */
export function BinarySearch() {}

/**
 * Returns the index of the specified key in the specified array.
 *
 * @param  a the array, must be sorted in ascending order
 * @param  key the search key
 * @return index of key in array {@code a} if present; {@code -1} otherwise
 */
BinarySearch.indexOf = function(arr, key) {
    let lo = 0;
    let hi = arr.length - 1;      
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (key < arr[mid]) {
            hi = mid - 1;
        } else if (key > arr[mid]) {
            lo = mid + 1;
        } else {
            return mid;
        }
    }     
    return -1;
}

/**
 * Returns the index of the specified key in the specified array.
 * This function is poorly named because it does not give the <em>rank</em>
 * if the array has duplicate keys or if the key is not in the array.
 *
 * @param  key the search key
 * @param  a the array, must be sorted in ascending order
 * @return index of key in array {@code a} if present; {@code -1} otherwise
 * @deprecated Replaced by {@link #indexOf(int[], int)}.
 */
BinarySearch.rank = function(arr, key) {
    return this.indexOf(arr, key);    
}

 
BinarySearch.main = function(args = []) {
   for (let index = 0; index < 10; index++) {
       args.push(Math.floor(Math.random() * 100));
   }
   args = args.sort((a, b) => a - b);
   StdOut.println('Sorted Inputs', args, "\n");
   for (let  i = 0; i < 5; i++) {
       const randIndex = Math.round(Math.random() * args.length) % args.length;
       
       StdOut.println('Input as ', args[randIndex], ' and search result is ', this.rank(args, args[randIndex]));
       
   }
}






