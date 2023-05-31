import express from 'express';


import Evaluate from './1. Fundamentals/1.3 Bags, Queues and Stack/Evaluate.js';
import Stack_Link_List from './1. Fundamentals/1.3 Bags, Queues and Stack/Stack_Linked_List.js';
import Bag from './1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js';
import Queue_Linked_List from './1. Fundamentals/1.3 Bags, Queues and Stack/Queue_Linked_List.js';
import parantheses from './1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_4.js';
import execute_1_3_9 from './1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_9.js';
import LinkedList from './1. Fundamentals/1.3 Bags, Queues and Stack/LinkedList.js';
import { execute_1_3_30, execute_1_3_30_recursive } from './1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_30.js';
import Steque from './1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_32.js';
import Deque from './1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_33.js';
import josephusProblem from './1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1.3.37.js';
import copyAStack from './1. Fundamentals/1.3 Bags, Queues and Stack/exercize/copyAStack.js';
import MoveToFront from './1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_40_Move_To_Front.js';
import closestPair from './1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/exercise/1_4_16_closest_pair.js';
import farTestPair from './1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/exercise/1_4_17_fartest_pair.js';
import bitonicSearch from './1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/exercise/1_4_20_bitonic_search.js';

import Selection from './2. Sorting/2.1_Elementry_Sorts/selection-sort/selection-sort.js';
import InsersionSortClient from './2. Sorting/2.1_Elementry_Sorts/insersion-sort/insersion-sort-client.js';
import ShellSortClient from './2. Sorting/2.1_Elementry_Sorts/shell-sort/shell-sort-client.js';
import Certification from './2. Sorting/2.1_Elementry_Sorts/exercises/exercise_2_1_16.js';
import Exercise24_InsertionSortWithSentinel from './2. Sorting/2.1_Elementry_Sorts/exercises/exercise2_1_24_InsertionSortWithSentinel.js';
import Exercise25_InsertionSortWithoutExchanges from './2. Sorting/2.1_Elementry_Sorts/exercises/exercise25_InsertionSortWithoutExchanges.js';
import MergeSortClient from './2. Sorting/2.2_Merge_Sort/merge_sort_top_down/merge_sprt_client.js';
import MergeSort_Top_Down_Client from './2. Sorting/2.2_Merge_Sort/merge_sort_bottom_up/merge_top_down_client.js';
import Example_2_2_9_Client from './2. Sorting/exersices/2.2.9.js';

import { QuickSortTestClient } from './2. Sorting/2.3_Quick_Sort/quick-sort/quick-sort-client.js';
import Quick3WayTest from './2. Sorting/2.3_Quick_Sort/quick-3-way/quick3way_test_client.js';
import {MaxPQClient} from './2. Sorting/2.4_Priority_Queue/max-priority-queue/max-priority-queue-client.js';
import {MinPQClient} from './2. Sorting/2.4_Priority_Queue/min-priority-queue/min-priority-queue-client.js';
import { HearSortClient } from './2. Sorting/2.4_Priority_Queue/heap-sort/heap-sort-client.js';
import { SequencialSTClient } from './3.Searching/3.1_Symbol Table/SequencialST/sequencial-st-client.js';
import { In } from './libs/index.js';
import { StdIn } from './libs/index.js';

import { pad } from './utils/index.js'
import { StdOut } from './libs/index.js';

import { BinarySeachStClient } from './3.Searching/3.1_Symbol Table/BinarySearchST/binary-search-st-client.js';
import {BSTClient} from './3.Searching/3.2 Binary Seach Trees/BST_client.js';
import { SeparateChaningHashSTClient } from './3.Searching/3.4 Hash Table/separate-chaning-hash-table/SeparateChaningHashSTClient.js';
import { LinearProbingHashSTClient } from './3.Searching/3.4 Hash Table/linear-probing-hash-table/LinearProbingHashSTClient.js';
import { QuickFindUFClient } from './1. Fundamentals/1.5 Union FInd/quick-find/quick-find-uf-client.js';
import {QuickUnionUFClient} from './1. Fundamentals/1.5 Union FInd/quick-union/quick-union-uf-client.js';
import {WeightedQuickUnionUFClient} from './1. Fundamentals/1.5 Union FInd/weighet-quick-union/weighted-quick-union-uf-client.js';
// 2. Sorting --- End

(function main() {
    // 1. Fundamentals--- Start
    // evaluate();
    // testStackWithLinkedList();
    // bagTestClient();
    // queueTestClient()
    // paranthesesTestClient();

    // execute_1_3_9_test_client();
    // linkedListTestingClient();
    // execute_1_3_30_Test_Client();
    // stequeTestClient();
    // dequeTestClient();

    // josephusProblem(7, 2);
    // copyAStackTestClient();

    // moveToFrontTestClient();
    // closestpairTestingClient();
    // fartestPairTestingClient();

    // const arr = [2, 6,3,1];
    // console.log(arr);
    // bitonicSearch(arr, 1);
    // QuickFindUFClient.main();
    // QuickUnionUFClient.main();
    WeightedQuickUnionUFClient.main();


    // 1. Fundamentals--- End


    // 2. Sorting--- Start
    // selectionTest();
    // InsersionSortClient.main();
    // ShellSortClient.main();
    // Certification.main();
    // Exercise24_InsertionSortWithSentinel.main();
    // Exercise25_InsertionSortWithoutExchanges.main();

    // MergeSortClient.main();
    // MergeSort_Top_Down_Client.main();
    // Example_2_2_9_Client.main();
    // 2. Sorting--- End

    // QuickSortTestClient.main();
    // Quick3WayTest.main();


    // 3. Priority Queue--Start 
    // MaxPQClient.main();
    // MinPQClient.main();
    // HearSortClient.main();



    // 2. Searching

    // SequencialSTClient.main();
    // BinarySeachStClient.main(); 
    // BSTClient.main();

    // SeparateChaningHashSTClient.main();
    // LinearProbingHashSTClient.main();



    // StdIn.read()
    //   .on('line', line => {
    //     const lineSplit = line.split(/\s+/) // by at least 1 whitespace
    //     const name = lineSplit[0]
    //     const n1 = parseInt(lineSplit[1], 10)
    //     const n2 = parseInt(lineSplit[2], 10)
    //     const n3 = n1 / n2

    //     // NOTE: JAVA format "%-10s %5d %5d %-5s %3.3f\n" (whitespace may vary)
    //     StdOut.printf('%s %s %s %s\n', pad(name, -10), pad(n1, 2), pad(n2, 5), pad(n3.toFixed(3), 8))
    //   })
    
})();



// 1. Fundamentals--- Start
function evaluate() {
    let res = -1;

    let input = '( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )';
    input = input.split(" ");
    res = Evaluate(input);
    console.log(res);
    
    const input1 = ['(', '10', '+', 'sqrt', '(', '4', ')', ')']
    res = Evaluate(input1);
    console.log(res);

}

function testStackWithLinkedList() {
    const stack = new Stack_Link_List();
    console.log('Stack is empty ', stack.isEmpty());
    stack.push(10);
    console.log('Stack is empty ', stack.isEmpty());
    console.log('Stack size', stack.size());

    stack.push(20);
    stack.push(30);

    console.log(stack.pop());
    console.log('Stack size', stack.size());
    console.log('Stack is empty ', stack.isEmpty());


    // Iterate through items using iterator[for_of()]
    for (const iterator of stack) {
        console.log(iterator);
    }
    for (const iterator of stack) {
        console.log(iterator);
    }
    // Iterate through items like for loop
    for (let x = stack.first; x; x = x.next) {
           console.log(x.item);
    }  



    const stack1 = new Stack_Link_List();
    stack1.push(190);
    stack1.push(200);

    console.log(stack1.pop());
    console.log(stack1.pop());

    try {
        console.log(stack1.pop());
    } catch(err) {
        console.log(err.message);
    }

}

function bagTestClient() {
    const bag = new Bag();

    bag.add(10);
    bag.add(20);

    for (const iterator of bag) {
        console.log(iterator);
    }

}

function queueTestClient() {
    const  queue = new Queue_Linked_List();

    queue.enqueue(10);
    queue.enqueue(30);
    queue.enqueue(20);
    queue.enqueue(40);
    queue.enqueue(50);

    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());

    try {
        console.log(queue.dequeue());
    } catch(err) {
        console.log(err.message);
    }
}

function paranthesesTestClient() {
    
    let input = "[()]{}{[()()]()}".split("");
    console.log(parantheses(input));

    input = "[(])".split("");
    console.log(parantheses(input));
}

function execute_1_3_9_test_client() {
    let input = "1+2)*3-4)*5-6)))".split("");
    console.log(execute_1_3_9(input).split("").join(" "));
    
}

function linkedListTestingClient() {
    const list = new LinkedList();
    list.appendFirst(10);
    list.appendFirst(20);
    list.appendFirst(30);
    list.appendFirst(40);
    list.appendLast(50);
    list.appendLast(60);
    list.appendFirst(70);
    // 70 -> 40 -> 30 -> 20 -> 10 -> 50 -> 60
    
    let h = list.head;
    while (h) {
        console.log(h.item);
        h = h.next;
    }
}

function stequeTestClient()  {
    const steque = new Steque();

    steque.enqueue(60);
    steque.push(50);
    steque.push(40);steque.push(30);steque.push(20);steque.enqueue(70);steque.push(10);

    let f = steque.head;

    while(f) {
        console.log(f.item);
        f = f.next;
    }
}

function execute_1_3_30_Test_Client() {
    const list = new LinkedList();
    list.appendLast(10);
    list.appendLast(20);
    list.appendLast(30);
    list.appendLast(40);
    list.appendLast(50);

    // let reverse = execute_1_3_30(list.head);
    let reverse = execute_1_3_30_recursive(list.head);

    while(reverse) {
        console.log(reverse.item);
        reverse = reverse.next;
    }
}

function dequeTestClient() {
    const deque = new Deque();
    deque.pushLeft(50);
    deque.pushRight(60)
    deque.pushLeft(40);
    deque.pushRight(70)
    deque.pushLeft(30);
    deque.pushRight(80)
    deque.pushLeft(20);
    deque.pushRight(90)
    deque.pushLeft(10);
    deque.pushRight(100)

    let x = deque.head;
    while(x) {
        console.log(x.item);
        x = x.next;
    }

    deque.popLeft();
    deque.popLeft();
    deque.popLeft();
    deque.popLeft();
    deque.popLeft();
    deque.popLeft();
    deque.popRight();

    console.log('----');
    x = deque.head;
    while(x) {
        console.log(x.item);
        x = x.next;
    }
}

function copyAStackTestClient() {
    const s = new Stack_Link_List();
    s.push(1);
    s.push(2);
    s.push(3);
    s.push(4);

    

    copyAStack(s);
    
}

function moveToFrontTestClient() {
    const input = 'brooodr'.split("");

    const moveToFront = new MoveToFront();

    let result = "";

    input.forEach(ch => {
        const pos = moveToFront.add(ch);    
        result += pos;
        result += ", ";
    });

    console.log(result);

    let res = "";
    let x = moveToFront.first;
    while(x) {
        res += x.item;
        x = x.next;
    }
    console.log(res);
}

function fartestPairTestingClient() {
    const array1 = [-5.2, 9.412, 20, -10, 21.1, 40, 50, -20];
    const array2 = [-4, -3, 0, 10, 20];
    const array3 = [-10, -3, 0, 2, 4, 20];

    const closestPair1 = farTestPair(array1);
    const closestPair2 = farTestPair(array2);
    const closestPair3 = farTestPair(array3);

    console.log("FarTestPair pair: " + closestPair1[0] + " " + closestPair1[1]);
    console.log("FarTestPair pair: " + closestPair2[0] + " " + closestPair2[1]);
    console.log("FarTestPair pair: " + closestPair3[0] + " " + closestPair3[1]);
}

function closestpairTestingClient() {
    const array1 = [-5.2, 9.412, 20, -10, 21.1, 40, 50, -20];
    const array2 = [-4, -3, 0, 10, 20];
    const array3 = [-10, -3, 0, 2, 4, 20];

    const closestPair1 = closestPair(array1);
    const closestPair2 = closestPair(array2);
    const closestPair3 = closestPair(array3);

    console.log("Closest pair: " + closestPair1[0] + " " + closestPair1[1] + " Expected: 20.0 21.1");
    console.log("Closest pair: " + closestPair2[0] + " " + closestPair2[1] + " Expected: -4.0 -3.0");
    console.log("Closest pair: " + closestPair3[0] + " " + closestPair3[1] + " Expected: 0.0 2.0");
}
// 1. Fundamentals--- End

// 2. Sorting --- Start
function selectionTest() {
    let a = [1,4,2,3,5,7,8,6];

    Selection.sort(a);

    console.log(a);
}



const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => console.log("Listening to the 5000 port"));



