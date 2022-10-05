import  { Suffle }  from "../shuffle.js";

function SuffleTest(M, N) {
    const arr = [];
    for (let index = 0; index < M; index++) {
        arr.push(index);
    }
    console.log('Actual Array');
    console.log(arr);
    
    for (let i = 0; i < N; i++) {
        const testArr = arr.map(n => n);
        Suffle.prototype.suffle(testArr);
        console.log('Shuffled array');
        console.log(testArr);
    }


}

SuffleTest(5, 5);