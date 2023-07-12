import { Queue_Linked_List } from "../Queue_Linked_List.js";

export default function josephusProblem(n, m) {

    const queue = new Queue_Linked_List();

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