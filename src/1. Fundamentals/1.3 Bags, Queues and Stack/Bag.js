function Node() {
    this.item;
    this.next;
}

function Bag() {
    this.N = 0;
    this.first = null;
}

/**
 * Returns true if this bag is empty.
 *
 * @return {@code true} if this bag is empty;
 *         {@code false} otherwise
 */
Bag.prototype.isEmpty = function() {
    return this.N === 0;
}
/**
 * Returns the number of items in this bag.
 *
 * @return the number of items in this bag
 */
Bag.prototype.size = function() {
    return this.N;
}


Bag.prototype.add = function(item) {
    let oldenode = this.first;
    this.first = new Node();
    this.first.item = item;
    this.first.next = oldenode;
    this.N++;
}

Bag.prototype[Symbol.iterator] = function() {

    let f = this.first;
    return {
        next: () => {
            if (f) {
                const res = {value: f.item, done: false};
                f = f.next;
                return res;
            } else {
                return {value: null, done: true}
            }
        }
    }
}

Bag.main = function() {
    const bag = new Bag();

    bag.add(10);
    bag.add(20);

    for (const iterator of bag) {
        console.log(iterator);
    }
}

export { Bag };