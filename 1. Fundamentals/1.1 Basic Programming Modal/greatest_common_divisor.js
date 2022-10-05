// Euclid Algorithm
function gcd(p, q) {
    if(q === 0) {
        return p
    }

    const r = p % q; // if q > p then % with r will be p;
    return gcd(q, r);
};

console.log(gcd(100, 20));
console.log(gcd(5, 4));
console.log(gcd(36, 4));

console.log(gcd(4, 36));
console.log(gcd(20, 100));
console.log(gcd(-20, -100));
