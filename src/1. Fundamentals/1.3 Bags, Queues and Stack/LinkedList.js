
function Node() {
    this.item;
    this.next;
}

function LinkedList() {
    this.head;
    this.tail;
    this.N;
}

// Insert Like stack
LinkedList.prototype.appendFirst = function(item) {
    const node = new Node();
    node.item = item;

    if (!this.head) {
        this.head = this.tail = node;
    } else {
        const oldhead = this.head;
        node.next = oldhead;
        this.head = node;
    }
    this.N++;
}

LinkedList.prototype.appendLast = function(item) {
    const node = new Node();
    node.item = item;

    if (!this.head) {
        this.head = this.tail = node;
    } else {
        this.tail.next = node;
        this.tail = node;
    }
    this.N++;
}

export default LinkedList;