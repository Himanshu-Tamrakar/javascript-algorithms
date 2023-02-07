// 1.3.32 Steque. A stack-ended queue or steque is a data type that supports push, pop, and
// enqueue. Articulate an API for this ADT. Develop a linked-list-based implementation.

import Node from './LinklistNode.js';

export default function Steque() {
    this.head;
    this.tail;
    this.N = 0;
}

Steque.prototype.push = function(item) {
    const node = new Node();
    node.item = item;

    if (this.N === 0) {
        this.head = this.tail = node;
    } else {
        node.next = this.head;
        this.head = node;
    }
    this.N++;
}

Steque.prototype.pop = function() {
    if (this.N === 0) {
        throw new Error('Steque is empty');
    }
    
    const data = head.item;
    
    if (this.N === 1) {
        this.head = this.tail = null;
    } else {
        this.head = this.head.next;
    }
    this.N--;

    return data;
}

Steque.prototype.enqueue = function(item) {
    const node = new Node();
    node.item = item;

    if (this.N === 0) {
        this.head = this.tail = node;
    } else {
        this.tail.next = node;
        this.tail = node;
    }
    this.N++;
}