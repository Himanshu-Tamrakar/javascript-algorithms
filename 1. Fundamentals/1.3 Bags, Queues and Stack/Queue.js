export function Queue() {
    this.queue = [];
}

Queue.prototype.enqueue = function(item) {
    this.queue.push(item);
}

Queue.prototype.dequeue = function() {
    if (this.queue.length === 0) {
        throw new Error('ERR-001:Queue is empty');
    }

    return this.queue.shift();
}

Queue.prototype.isEmpty = function() {
    return this.queue.length === 0 ? true : false;
}

// const queue = new Queue();

// try {
//     console.log(queue.isEmpty());
//     queue.enqueue(1);
//     queue.enqueue(2);
//     queue.enqueue(3);
//     console.log(queue.isEmpty());

//     console.log(queue.dequeue());
//     console.log(queue.isEmpty());
//     console.log(queue.dequeue());
//     console.log(queue.dequeue());
//     console.log(queue.dequeue());
// } catch(error) {
//     console.log(error.message.split(':')[0]);
// } 