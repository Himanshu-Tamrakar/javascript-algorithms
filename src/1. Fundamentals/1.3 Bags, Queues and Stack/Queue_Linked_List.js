// IMprovements: this.last key is pointing to last item after last item deletion
function Node() {
    this.item;
    this.next;
}

function Queue_Linked_List() {
    this.N = 0;
    this.first;
    this.last;
}

Queue_Linked_List.prototype.enqueue = function(item) {
    const node = new Node();
    node.item = item;

    if (!this.N) {
        this.first = this.last = node;
    } else {
        this.last.next = node;
        this.last = node;
    }
    this.N++;
}

Queue_Linked_List.prototype.dequeue = function() {
    if (!this.N) {
        throw new Error('Queue is empty');
    } else {
        const res = this.first.item;
        this.first = this.first.next;
        this.N--;
        return res;
    }
}

Queue_Linked_List.prototype.size = function() {
    return this.N;
}

Queue_Linked_List.prototype.isEmpty = function() {
    return this.N === 0 ? true : false;
}

Queue_Linked_List.prototype[Symbol.iterator] = function() {
    let first = this.first;
    return {
        next: () => {
            if (first != null) {
                const item = first.item;
                first = first.next;
                return { value: item, done: false };
            } else {
                return {value: null, done: true};
            }
        },
        return: (v) => {
            return {value: v, done: true};
        }
    }
}

export { Queue_Linked_List };