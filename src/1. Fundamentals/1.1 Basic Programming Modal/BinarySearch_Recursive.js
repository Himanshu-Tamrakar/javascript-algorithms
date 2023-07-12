export function BinarySearch_Recursive() {}

BinarySearch_Recursive.prototype.rank = function(arr, key) {
    let lo = 0;
    let hi = arr.length - 1;      
    return this._rank(arr, key, lo, hi);
}

BinarySearch_Recursive.prototype._rank = function(arr, key, lo, hi) {
   if (lo > hi) {
       return -1;
   }
   const mid = lo + Math.round((hi - lo) / 2);

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
       console.log('Input as ', args[randIndex], ' and search result is ', this.prototype.rank(args, args[randIndex]));
   }

   console.log("Unsuccessful Search");
   for (let  i = 0; i < 10; i++) {
        const key = Math.floor(Math.random() * 100);
        console.log('Input as ', key, ' and search result is ', this.prototype.rank(args, key));
    }
}

