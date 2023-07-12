
export function BinarySearch() {}

BinarySearch.prototype.rank = function(key, arr) {
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


 
 BinarySearch.main = function(args = []) {
    for (let index = 0; index < 10; index++) {
        args.push(Math.floor(Math.random() * 100));
    }
    args = args.sort((a, b) => a - b);
    console.log('Sorted Inputs', args, "\n");

    for (let  i = 0; i < 5; i++) {
        const randIndex = Math.round(Math.random() * args.length) % args.length;
        
        console.log('Input as ', args[randIndex], ' and search result is ', this.prototype.rank(args[randIndex], args));
        
    }
 }






