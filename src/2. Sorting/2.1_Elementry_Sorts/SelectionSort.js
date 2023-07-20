import { In } from '../../libs/index.js';

export class Selection {
    static sort (array, comparator) {

        comparator = comparator || this.defaultComparator;
        
        const n = array.length
    
        for (let i = 0; i < n; i++) {
          let min = i
    
          for (let j = i + 1; j < n; j++) {
            if (this.less(array[j], array[min], comparator)) {
              min = j
            }
          }
    
          this.exchange(array, i, min)
        }
      }

    static exchange(a, i, j) {
        [a[i], a[j]] = [a[j], a[i]];
    }

    static isSorted(a, comparator = this.defaultComparator) {
        for (let i = 1; i < a.length; i++) {
          if (this.less(a[i], a[i - 1], comparator)) {
            return false
          }
        }
    
        return true
    }

    static less(a, b, comparator = this.defaultComparator) {
        return comparator(a, b) < 0;
    }

    static defaultComparator(a, b) {
        if (a === b) return 0

        return a < b ? -1 : 1
    }

    static main() {
        // const words = ['Himanshu', 'Aman', 'Anshul', 'Shetty', 'Anup', 'Harbu', 'Paranda', 'Aditya', 'Lankshay'];
        
        // const _in = new In('assets/tiny.txt');
        // const words = _in.readAllWords();
        
        const _in = new In('assets/words3.txt');
        const words = _in.readAllWords();
        Selection.sort(words);
        console.log(words);
    }
}