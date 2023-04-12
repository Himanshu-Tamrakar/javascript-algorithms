import InsersionSort from "./insersion-sort.js";

class InsersionSortClient {
    static main() {
        const arr = [6,3,4,7,80,1,2,3,5];

        // const arr = ['Himanshu', 'Aman', 'Anshul', 'Shetty', 'Anup', 'Harbu', 'Paranda', 'Aditya', 'Lankshay'];
        console.log(arr);

        InsersionSort.sort(arr);

        console.log(arr);
    }
}

export default InsersionSortClient;