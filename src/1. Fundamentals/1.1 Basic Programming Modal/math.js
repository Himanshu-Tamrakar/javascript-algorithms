HMath = function() {};

HMath.prototype.sqrt = function(c) {
    if (c < 0) Number.MIN_SAFE_INTEGER;

    let err = 1e-15;
    let t = c;
    while (Math.abs(t - c/t) > err * t) {
        t = (c/t + t) / 2.0;
    }

    return t;
}

HMath.prototype.isPrime = function(n) {
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;        
    }
    return true;
}

HMath.main = function(arr = []) {

    console.log('---TEST sqrt: Start---');
    arr = [36, 25, 49, 12];

    arr.forEach(n => {
        console.log(`SQRT for ${n} is: ${this.prototype.sqrt(n)}`);
    })
    console.log('---TEST sqrt: End---');


    console
    .log('---TEST isPrime: Start---');
    arr = [36, 25, 49, 12, 13, 7, 11, 749];

    arr.forEach(n => {
        console.log(`${n} is Prime Number: ${this.prototype.isPrime(n)}`);
    })
    console.log('---TEST sqrt: End---');


}

HMath.main();