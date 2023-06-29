// Write a function that takes the first Node in a linked list as argument and (de-
//     structively) reverses the list, returning the first Node in the result.

export function execute_1_3_30(head) {
    let reverse = null;
    while(head) {
        const nexthead = head.next;
        head.next = reverse;
        reverse = head;
        head = nexthead;
    }

    return reverse;
}

export function execute_1_3_30_recursive(head) {
    return reverseList(head, null);
}

function reverseList(head, reverse) {
    if (!head) {
        return reverse;
    }

    const nexthead = head.next;
    head.next = reverse;
    reverse = head;
    head = nexthead;

    return reverseList(head, reverse);
}

