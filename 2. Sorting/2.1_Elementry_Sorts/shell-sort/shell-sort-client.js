import ShellSort from "./shell-sort.js";

export default class ShellSortClient {

    static main() {
        let arr = 'qwertyuioplmknjbhgvfcdxsza';
        arr = arr.split('');
        ShellSort.sort(arr);
        console.log('Is array sorted?');
        console.log('Answer: ', ShellSort.isSorted(arr));
        console.log(arr);
    }

}