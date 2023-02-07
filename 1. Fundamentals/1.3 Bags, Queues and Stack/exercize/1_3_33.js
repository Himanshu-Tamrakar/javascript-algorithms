// 1.3.33 Deque. A double-ended queue or deque (pronounced “deck”) is like a stack or
// a queue but supports adding and removing items at both ends. A deque stores a collec-
// tion of items and supports the following API:


function Node() {
    this.item;
    this.next;
    this.prev;
}

export default function Deque() {
    this.head;
    this.tail;
    this.N = 0;
}

Deque.prototype.size =  function() {
    return this.N;
}

Deque.prototype.pushLeft = function(item) {

    const node = new Node();
    node.item = item;

    if (this.N === 0) {
        this.head = this.tail = node;
    } else {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    this.N++;
}

Deque.prototype.pushRight = function(item) {

    const node = new Node();
    node.item = item;

    if (this.N === 0) {
        this.head = this.tail = node;
    } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    this.N++;
}

Deque.prototype.popLeft = function() {

    if (this.N === 0) {
        throw new Error('Deque is empty');
    }

    const data = this.head.item;

    if (this.N === 1) {
        this.head = this.tail = null;
    } else {
        this.head.next.prev = null;
        this.head = this.head.next;
    }
    this.N--;
    return data;
}

Deque.prototype.popRight = function() {

    if (this.N === 0) {
        throw new Error('Deque is empty');
    }

    const data = this.tail.item;

    if (this.N === 1) {
        this.head = this.tail = null;
    } else {
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
    }
    this.N--;
    return data;
}

