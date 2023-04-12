/**
 * Certification. Write a check() method that calls sort() for a given array and
returns true if sort() puts the array in order and leaves the same set of objects in the
array as were there initially, false otherwise. Do not assume that sort() is restricted to
move data only with exch(). You may use Arrays.sort() and assume that it is correct.
 */



export default function Certification() {}

Certification.check = function(arr) {

    if (!Array.isArray(arr)) {
        console.log('Argument accept an array');
        return;
    }

    console.log('Origional Array');
    console.log(arr);

    const map = new Map();
    arr.forEach(element => {
        let count = 0;
        if (map.has(element)) {
            count = map.get(element);
        } 
        count++;
        map.set(element, count);
    });

    arr.sort();


    for (let i = 1; i < arr.length; i++) {
        if (arr[i-1] > arr[i]) {
            return false;
        }
    }


    arr.forEach(element => {
        if (map.has(element)) {
            let count = map.get(element);
            count--;
            if (count === 0) {
                map.delete(element);
            } else {
                map.set(element, count);
            }
        } else {
            return false;
        }
    });

    return map.size === 0;
}

function defaultComparator(a, b) {
    if (a === b) return 0;

    return a < b ? -1 : 1;
}

function less(a, b, comparator = defaultComparator) {
    return comparator(a, b) <= 0;
}

Certification.main = function() {
    let arr = 'SORTINGEXCERSIES';
    arr = arr.split('');

    const result = Certification.check(arr);

    console.log(result);
    
}

