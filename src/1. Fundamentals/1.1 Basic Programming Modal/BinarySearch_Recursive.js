export function BinarySearch_Recursive() {}

/**
 * Returns the index of the specified key in the specified array.
 *
 * @param  a the array, must be sorted in ascending order
 * @param  key the search key
 * @return index of key in array {@code a} if present; {@code -1} otherwise
 */
BinarySearch_Recursive.indexOf = function(arr, key) {
    let lo = 0;
    let hi = arr.length - 1;      
    return this._rank(arr, key, lo, hi);
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
BinarySearch_Recursive.rank = function(arr, key) {
    return this.indexOf(arr, key)
}

/**
 * 
 * @param {} arr a the array, must be sorted in ascending order
 * @param {} key the search key
 * @param {} lo 
 * @param {} hi 
 * @returns 
 */
BinarySearch_Recursive._rank = function(arr, key, lo, hi) {
   if (lo > hi) {
       return -1;
   }
   const mid = lo + Math.floor((hi - lo) / 2);

   if (key === arr[mid]) {
       return mid;
   } else if (arr[mid] > key) {
       return this._rank(arr, key, lo, mid - 1);
   } else {
       return this._rank(arr, key, mid + 1, hi);
   }
}

BinarySearch_Recursive.main = function(args = []) {
   for (let index = 0; index < 10; index++) {
       args.push(Math.floor(Math.random() * 100));
   }
   args = args.sort((a, b) => a - b);
   console.log('Sorted Inputs', args, "\n");

   console.log("Successful Search");
   for (let  i = 0; i < 5; i++) {
       const randIndex = Math.round(Math.random() * args.length) % args.length;
       console.log('Input as ', args[randIndex], ' and search result is ', this.rank(args, args[randIndex]));
   }

   console.log("Unsuccessful Search");
   for (let  i = 0; i < 10; i++) {
        const key = Math.floor(Math.random() * 100);
        console.log('Input as ', key, ' and search result is ', this.rank(args, key));
    }
}

