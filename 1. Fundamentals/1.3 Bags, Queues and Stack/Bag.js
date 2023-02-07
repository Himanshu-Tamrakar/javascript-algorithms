function Node() {
    this.item;
    this.next;
}

function Bag() {
    this.N = 0;
    this.first = null;
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

export default Bag;