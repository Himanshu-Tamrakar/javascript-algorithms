import { In } from '../../libs/index.js';


function InsersionSort() {}

InsersionSort.sort = function(arr, comp = this.defaultComparator) {

    for (let i = 1; i < arr.length; i++) {
        
        for (let j = i; j > 0 && this.less(arr[j], arr[j-1], comp); j--) {
            this.exch(arr, j, j-1);
        }
        
    }
}

InsersionSort.defaultComparator = function(a, b) {
    if (a === b) return 0

    return a < b ? -1 : 1
}

InsersionSort.exch = function(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
}

InsersionSort.less = function(a, b, comp = this.defaultComparator) {
    return comp(a, b) < 0;
}


InsersionSort.isSorted = function(arr, comp = this.defaultComparator) {
    for (let i = 1; i < arr.length; i++) {
        if (this.less(arr[i], arr[i-1], comp)) {
            return false;
        }
    }
    return true;
}

InsersionSort.main = function() {
    

    // const words = ['Himanshu', 'Aman', 'Anshul', 'Shetty', 'Anup', 'Harbu', 'Paranda', 'Aditya', 'Lankshay'];
    
    // const _in = new In('assets/tiny.txt');
    // const words = _in.readAllWords();

    const _in = new In('assets/words3.txt');
    const words = _in.readAllWords();
    InsersionSort.sort(words);
    console.log(words);
}

export { InsersionSort }
