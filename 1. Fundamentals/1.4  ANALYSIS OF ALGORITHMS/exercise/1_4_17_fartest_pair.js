export default function farTestPair(arr) {

    let minVal = Number.MAX_SAFE_INTEGER;
    let maxVal = Number.MIN_SAFE_INTEGER;

    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (minVal > arr[i]) {
            minVal = arr[i];
        }

        if (maxVal < arr[i]) {
            maxVal = arr[i];
        }
    }
    
    return [minVal, maxVal];

}