export function closestPair(arr) {
    arr = Array.prototype.sort.call(arr, (a, b) => a-b);

    let minimumValue = Number.MAX_SAFE_INTEGER;
    const result = [];
    for (let i = 0; i < arr.length-1; i++) {
        if (Math.abs(arr[i] - arr[i+1]) < minimumValue) {
            minimumValue = Math.abs(arr[i] - arr[i+1]);
            result[0]= arr[i];
            result[1] = arr[i+1];
        }
    }
    return result;

}