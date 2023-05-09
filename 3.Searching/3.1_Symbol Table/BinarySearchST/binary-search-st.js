import {compare, equals} from "../../../common/index.js";

export function BinarySeachSt() {
    this.keys1 = [];
    this.vals = [];
    this.N = 0;
}

BinarySeachSt.prototype.rank = function (key) {
    let lo = 0;
    let hi = this.N - 1;

    while (lo <= hi) {
        const mid = lo + Math.floor(((hi - lo) / 2));
        const cmp = compare(key, this.keys1[mid]);

        if (cmp < 0) hi = mid - 1;
        else if (cmp > 0) lo = mid + 1;
        else return mid;
    }

    return lo;

}

BinarySeachSt.prototype.rank_recursive = function (key, lo, hi) {
    if (lo >= hi) return lo;

    const mid = lo + Math.floor((hi - lo) / 2);
    const cmp = compare(key, this.keys1[mid]);

    if (cmp < 0) {
        return this.rank_recursive(key, lo, mid - 1);
    } else if (cmp > 0) {
        return this.rank_recursive(key, mid + 1, hi);
    } else {
        return mid;
    }
}

BinarySeachSt.prototype.put = function (key, val) {
    let pos = this.rank(key, 0, this.keys1.length - 1);

    if (equals(this.keys1[pos], key)) {
        this.vals[pos] = val;
        return;
    }

    for (let i = this.N; i > pos; i--) {
        this.keys1[i] = this.keys1[i - 1];
        this.vals[i] = this.vals[i - 1];
    }

    this.keys1[pos] = key;
    this.vals[pos] = val;
    this.N++;
}

BinarySeachSt.prototype.get = function (key) {
    if (key == null) {
        throw new TypeError('argument to get() can not be null');
    }

    if (this.isEmpty()) {
        return null;
    }

    const pos = this.rank_recursive(key, 0, this.N - 1);
    if (equals(this.keys1[pos], key)) return this.vals[pos];

    return null;
}

BinarySeachSt.prototype.isEmpty = function () {
    return this.N === 0;
}

BinarySeachSt.prototype.contains = function (key) {
    if (key == null) {
        throw new TypeError('argument to contains() can not be null');
    }

    return this.get(key) != null;
}

BinarySeachSt.prototype.keys = function () {
    let i = 0;
    let N = this.N;
    let keys = this.keys1;
    return {
            [Symbol.iterator]() {return this},
            next() {
                if (i < N) return {value: keys[i++], done: false};
                else return {value: null, done: true};
            },
            return(v) {
                return {value: v, done: true};
            }
    
        }
}

BinarySeachSt.prototype.min = function() {
    if (this.isEmpty()) {
        throw new ReferenceError('symbol table underflow error');
    }

    return this.keys1[0];
}

BinarySeachSt.prototype.max = function() {
    if (this.isEmpty()) {
        throw new ReferenceError('symbol table underflow error');
    }

    return this.keys1[this.N-1];
}

BinarySeachSt.prototype.size = function() {
    return this.N;
}

/**
 * return key of rank i
 * @param {number} i: rank of key 
 * @returns key at rank i
 */
BinarySeachSt.prototype.select = function(i) {
    if (this.isEmpty() || i >= this.size()) {
        throw new ReferenceError('symbol table underflow error');
    }

    return this.keys1[i];
}

/**
 * Returns the largest key in this symbol table less than or equal to {@code key}.
 *
 * @param {string}  key the key
 * @return the largest key in this symbol table less than or equal to {@code key}
 * @throws ReferenceError if there is no such key
 * @throws TypeError if {@code key} is {@code null}
 */
BinarySeachSt.prototype.floor = function(key) {
    if (key == null) {
        throw new TypeError('argument to floor() can not be null');
    }
    const rank = this.rank(key);
    if (rank < this.size() && equals(this.keys1[rank], key)) {
        return this.keys1[rank];
    }

    if (rank == 0) {
        throw new ReferenceError('argument to floor is too small');
    } else {
        return this.keys1[rank-1];
    }
}

/**
 * Returns the smallest key in this symbol table greater than or equal to {@code key}.
 *
 * @param {string} key the key
 * @return {string} the smallest key in this symbol table greater than or equal to {@code key}
 * @throws ReferenceError if there is no such key
 * @throws TypeError if {@code key} is {@code null}
 */
BinarySeachSt.prototype.ceiling = function(key) {
    if (key == null) {
        throw new TypeError('argument to ceiling() can not be null');
    }
    const i = this.rank(key);
    if (i == this.size()) {
        throw new ReferenceError('argument to ceiling() is too large');
    } else {
        return this.keys1[i];
    }
}

BinarySeachSt.prototype.delete = function(key) {
    if (key == null) {
        throw new TypeError('argument to delete() can not be null');
    }

    const i = this.rank(key);

    if (i == this.size() || !equals(this.keys1[i], key)) {
        return;
    }

    for (let j = i; j < this.N-1; j++) {
        this.keys1[j] = this.keys1[j+1];
        this.vals[j] = this.vals[j+1];
    }
    delete this.keys1[this.N-1];
    delete this.vals[this.N-1];
    this.N--;
}

BinarySeachSt.prototype.delMin = function() {
    if (this.isEmpty()) {
        throw new ReferenceError('symbol table underflow error');
    }

    this.delete(this.min());
}

BinarySeachSt.prototype.delMax = function() {
    if (this.isEmpty()) {
        throw new ReferenceError('symbol table underflow error');
    }

    this.delete(this.max());
}

BinarySeachSt.prototype[Symbol.iterator] = function() {
    let i = 0;
    let N = this.N;
    let keys = this.keys1;
    return {
            next() {
                if (i < N) return {value: keys[i++], done: false};
                else return {value: null, done: true};
            },
            return(v) {
                return {value: v, done: true};
            }
    
        }
}