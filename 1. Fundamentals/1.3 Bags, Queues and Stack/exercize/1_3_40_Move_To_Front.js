function Node(item = null, next = null) {
    this.item = item;
    this.next = next;
}

export default function MoveToFront() {
    this.first;
}


// delete node with given item if it exists, and return location
MoveToFront.prototype.delete = function(node, ch) {
    if (!node) {
        return null;
    }

    if (node.item === ch) {
        return node.next;
    }

    node.next = this.delete(node.next, ch);

    return node;
}

// return location of item, or 0 if not found
MoveToFront.prototype.find = function(x, ch) {
    let i = 1;
    for (let first = x; first; first = first.next) {
        if (first.item === ch) {
            return i;
        }
        i++;
    }
    return 0;
}

MoveToFront.prototype.add = function(ch) {
    const position = this.find(this.first, ch);

    this.first = this.delete(this.first, ch);

    this.first = new Node(ch, this.first);
    return position;

}
