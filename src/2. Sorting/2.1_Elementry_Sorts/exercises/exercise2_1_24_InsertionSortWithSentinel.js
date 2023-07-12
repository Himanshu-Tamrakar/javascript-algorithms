import { Stopwatch } from '../../../adts/stop-watch/stop-watch.js';
import { StdOut, StdRandom } from '../../../libs/index.js';

function Exercise24_InsertionSortWithSentinel() {}

Exercise24_InsertionSortWithSentinel.insersionSort = function(arr, comporator) {

    comporator = comporator || function(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }

    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0 && comporator(arr[j], arr[j-1]) < 0; j--) {
            [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
        }
    }

}

Exercise24_InsertionSortWithSentinel.sentinalInsersionSort = function(arr, comporator) {
    comporator = comporator || function(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }

    // Finding smallest item and its index
    let smallestIndex = 0;
    let smalestItem = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (comporator(arr[i], smalestItem) < 0) {
            smalestItem = arr[i];
            smallestIndex = i;
        }
    }

    // Swapping smallest Item with 0 index
    [arr[0],arr[smallestIndex]] = [arr[smallestIndex], arr[0]];


    for (let i = 1; i < arr.length; i++) {
        for (let j = i; comporator(arr[j], arr[j-1]) < 0; j--) {
            [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
        }
    }


}

Exercise24_InsertionSortWithSentinel.time = function(sortType, arr) {
    const stopwatch = new Stopwatch();
    if (sortType === 'DEFAULT') {
        this.insersionSort(arr);
    } else {
        this.sentinalInsersionSort(arr);
    }

    return stopwatch.elapsedTime();
}

Exercise24_InsertionSortWithSentinel.timeRandomInput = function(insertionSortType, length, numberOfExperiments) {
    let total = 0;
    const array = [];

    for (let experiment = 0; experiment < numberOfExperiments; experiment++) {
        for (let i = 0; i < length; i++) {
            array[i] = StdRandom.uniform();
        }


        total += this.time(insertionSortType, array);
    }
    return total;
}

Exercise24_InsertionSortWithSentinel.sortCompare = function() {

    const arrayLength = 2000;
    const numberOfExperiments = 10;
   
    let timeInsertionSortDefault = this.timeRandomInput('DEFAULT', arrayLength, numberOfExperiments);
    let timeInsertionSortSentinel = this.timeRandomInput('SENTINAL_INSERSION', arrayLength, numberOfExperiments);

    StdOut.println("For %d random doubles\nInsertion Sort default is", arrayLength)
    StdOut.println("%f times faster than Insertion Sort with a sentinel.", timeInsertionSortSentinel / timeInsertionSortDefault)
}


Exercise24_InsertionSortWithSentinel.main = function() {
    this.sortCompare();
}

export {
    Exercise24_InsertionSortWithSentinel
}


