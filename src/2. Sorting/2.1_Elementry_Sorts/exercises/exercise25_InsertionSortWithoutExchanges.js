import { Stopwatch } from '../../../adts/stop-watch/stop-watch.js';

import { StdOut, StdRandom } from '../../../libs/index.js';

function Exercise25_InsertionSortWithoutExchanges() {}

Exercise25_InsertionSortWithoutExchanges.insersionSort = function(arr, comporator) {

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

Exercise25_InsertionSortWithoutExchanges.insertionSortWithoutExchanges = function(arr, comporator) {
    comporator = comporator || function(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }

    for (let i = 1; i < arr.length; i++) {

        let j;;
        const aux = arr[i];

        for (j = i;j > 0 && comporator(aux, arr[j-1]) < 0; j--) {
            arr[j] = arr[j-1];
        }

        arr[j] = aux;
        
    }


}

Exercise25_InsertionSortWithoutExchanges.time = function(sortType, arr) {
    const stopwatch = new Stopwatch();
    if (sortType === 'DEFAULT') {
        this.insersionSort(arr);
    } else {
        this.insertionSortWithoutExchanges(arr);
    }

    return stopwatch.elapsedTime();
}

Exercise25_InsertionSortWithoutExchanges.timeRandomInput = function(insertionSortType, length, numberOfExperiments) {
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

Exercise25_InsertionSortWithoutExchanges.sortCompare = function() {
    const arrayLength = 2000;
    const numberOfExperiments = 10;
   
    let timeInsertionSortDefault = this.timeRandomInput('DEFAULT', arrayLength, numberOfExperiments);
    let timeInsertionSortwithoutExchange = this.timeRandomInput('SENTINAL_INSERSION', arrayLength, numberOfExperiments);

    StdOut.println("For %d random doubles\nInsertion Sort default is", arrayLength)
    StdOut.println("%f times faster than Insertion Sort with a sentinel", timeInsertionSortwithoutExchange / timeInsertionSortDefault)
}


Exercise25_InsertionSortWithoutExchanges.main = function() {
    this.sortCompare();
}

export {
    Exercise25_InsertionSortWithoutExchanges
}


