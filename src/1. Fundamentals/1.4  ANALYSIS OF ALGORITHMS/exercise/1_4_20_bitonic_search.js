function getTippingPoint(arr, lo, hi) {
    const mid = Math.floor(lo + (hi-lo) / 2);

    if (hi === lo) {
        return lo;
    }

    if (mid === 0) {
        return lo;
    }

    
    // if (mid === 0 && arr[mid] < arr[mid + 1]) {
    //     lo = mid + 1;
    // } else if (mid === arr.length-1 && arr[mid] > arr[mid-1]) {
    //     hi = mid -1;
    // } else
    
    if (arr[mid] > arr[mid-1] && arr[mid] > arr[mid+1]) {
        return mid;
    } else if (arr[mid] > arr[mid-1] && arr[mid] < arr[mid+1]) {
        lo = mid + 1;
    } else if (arr[mid] < arr[mid-1] && arr[mid] > arr[mid+1]) {
        hi = mid - 1;
    } else {
        return -1;
    }

    return getTippingPoint(arr, lo, hi);
}

function ascBitonicBinarySeach(arr, item, lo, hi) {

    // if (lo > hi) {
    //     return -1;
    // }

    // const mid = Math.floor(lo + (hi-lo) / 2);

    // if (arr[mid] === item) {
    //     return mid;
    // } else if(arr[mid] < item) {
    //     hi = mid+1;
    // } else {
    //     lo = mid-1;
    // }
    
    // return ascBitonicBinarySeach(arr, item, lo, hi);


    while(lo <= hi) {
        const mid = Math.floor(lo + (hi-lo) / 2);

        if (arr[mid] === item) {
            return mid;
        } else if(arr[mid] < item) {
            lo = mid+1;
        } else {
            hi = mid-1;
        }
    }

    return -1;

}

function desBitonicBinarySeach(arr, item, lo, hi) {
    while(lo <= hi) {
        const mid = Math.floor(lo + (hi-lo) / 2);

        if (arr[mid] === item) {
            return mid;
        } else if(arr[mid] > item) {
            lo = mid+1;
        } else {
            hi = mid-1;
        }
    }

    return -1;

}



export function bitonicSearch(arr, item) {
    const tip = getTippingPoint(arr, 0, arr.length-1);
    if (tip !== -1) {

        // Search Left
        let result = ascBitonicBinarySeach(arr, item, 0, tip);
        if (result !== -1) {
            console.log('item ' + item + ' present at index '+ result);
            return;
        }

        // Search Right
        let result1 = desBitonicBinarySeach(arr, item, tip, arr.length-1);
        if (result1 !== -1) {
            console.log('item ' + item + ' present at index '+ result1);
        } else {
            console.log('Not found ' + item);
        }
    } else {
        return console.log('Not a proper bitonic array');
    } 
}