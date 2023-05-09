import { equals } from "../../../common/index.js";

class Node {
    constructor(key, value, next) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

export class SequencialST {
    constructor() {
        this.first;
        this.N = 0;
    }

    put(key, value) {
        if (key == null) {
            throw new TypeError('Key can not be null');
        }

        if (this.N === 0) {
            const node = new Node(key, value);
            this.first = node;
            this.N++;
        }

        for (let node = this.first; node != null; node = node.next) {
            if (equals(node.key, key)) {
                node.value = value;
                return;
            }
        }

        this.first = new Node(key, value, this.first);
        this.N++;
    }

    get(key) {
        if (key == null) {
            throw new TypeError('Key can not be null');
        }

        for (let node = this.first; node != null; node = node.next) {
            if (equals(node.key, key)) {
                return node.value;
            }
        }

        return null;
    }

    delete(key) {
        if (key == null) {
            throw new TypeError('Key can not be null');
        }

        if (this.isEmpty()) {
            return null;
        }

        if (this.N === 1) {
            this.first = this.first.next;
            this.N--;
            return this.first.value;
        }

        for (let prev, node = this.first; node != null; node = node.next) {
            if (node.next != null && equals(node.next.key, key))  {
                node.next = node.next.next;
                this.N--;
                return node.next.value;
            }
        }

        return null;
    }

    contains(key) {
        if (key == null) {
            throw new TypeError('Key can not be null');
        }
        const val = this.get(key);
        return val !== null;
    }

    isEmpty() {
        return this.N === 0;
    }

    size() {
        return this.N;
    }

    min() {
        if (this.isEmpty()) {
            return null;
        }

        let min = this.first.value;

        for (let node = this.first; node != null; node = node.next) {
            if (node.value < min) min = node.value;
        }

        return min;
    }

    max() {
        if (this.isEmpty()) {
            return null;
        }

        let max = this.first.value;

        for (let node = this.first; node != null; node = node.next) {
            if (node.value < max) max = node.value;
        }

        return max;
    }

    floor(key) {}

    ceiling(key) {}

    rank(key) {}

    select(k) {}

    deleteMin() {}

    deleteMax() {}

    // size(lo, hi) {}

    keys() {
        let node = this.first;
        return {
            [Symbol.iterator]() {return this;},
            next() {
                if (!node) {
                    return {value: null, done: true};
                }
                let item = {value: node.key, done: false};
                node = node.next;
                return item;
            },
            return(v) {
                return {value: v, done: true};
            }
        }
    }

    [Symbol.iterator]() {
        let node = this.first;
        return {
            next() {
                if (!node) {
                    return {value: null, done: true};
                }
                let item = { value: node.key, done: false}
                node = node.next;
                return item;
            },
            return(v) {
                return {value: v, done: true}
            }
        }
    }


}