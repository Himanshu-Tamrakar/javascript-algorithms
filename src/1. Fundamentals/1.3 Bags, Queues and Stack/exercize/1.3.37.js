import { Queue } from "../Queue.js";
export function josephusProblem(n, m) {
    const queue = new Queue();
    for (let i = 0; i < n; i++) {
        queue.enqueue(i);
    }
    while(!queue.isEmpty()) {
        for (let i = 0; i < m-1; i++) {
            queue.enqueue(queue.dequeue());
        }
        console.log(queue.dequeue());
    }
}