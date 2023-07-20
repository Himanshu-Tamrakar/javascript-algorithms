import express from 'express';

import { In } from './src/libs/index.js';
import { StdIn } from './src/libs/index.js';
import { pad } from './src/utils/index.js'
import { StdOut } from './src/libs/index.js';

import { gcd, gcd_test } from './src/1. Fundamentals/1.1 Basic Programming Modal/GreatestCommonDivisor.js';
import { lcm, lcm_test } from './src/1. Fundamentals/1.1 Basic Programming Modal/LeastCommonMultiplier.js';
import { BinarySearch } from './src/1. Fundamentals/1.1 Basic Programming Modal/BinarySearch.js';
import { BinarySearch_Recursive } from './src/1. Fundamentals/1.1 Basic Programming Modal/BinarySearch_Recursive.js';
import { SuffleTest } from './src/1. Fundamentals/1.1 Basic Programming Modal/exercize/1_1_36.js';
import { FixedCapacityStack } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/FixedCapacityStack.js';
import { ResizingArrayStack } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/ResizingArrayStack.js';
import { ResizingArrayQueue } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/ResizingArrayQueue.js';
import { Bag } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js';
import { Stack } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js';
import { Queue } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/Queue.js';
import { Evaluate, EvaluateClient } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/Evaluate.js';
import { parantheses } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_4.js';
import { execute_1_3_9 } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_9.js';
import { LinkedList } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/LinkedList.js';
import { execute_1_3_30, execute_1_3_30_recursive } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_30.js';
import { Steque } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_32.js';
import { Deque } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_33.js';
import { josephusProblem } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1.3.37.js';
import { copyAStack } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/exercize/copyAStack.js';
import { MoveToFront } from './src/1. Fundamentals/1.3 Bags, Queues and Stack/exercize/1_3_40_Move_To_Front.js';
import { closestPair } from './src/1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/exercise/1_4_16_closest_pair.js';
import { farTestPair } from './src/1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/exercise/1_4_17_fartest_pair.js';
import { bitonicSearch } from './src/1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/exercise/1_4_20_bitonic_search.js';

import { TwoSum } from './src/1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/TwoSum.js';
import { TwoSumFast } from './src/1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/TwoSumFast.js';
import { ThreeSumFast } from './src/1. Fundamentals/1.4  ANALYSIS OF ALGORITHMS/ThreeSumFast.js';


import { QuickFindUF } from './src/1. Fundamentals/1.5 Union FInd/QuickFind-uf.js';
import { QuickUnionUF } from './src/1. Fundamentals/1.5 Union FInd/QuickUnion-uf.js';
import { WeightedQuichUnionUF } from './src/1. Fundamentals/1.5 Union FInd/WeightedQuickUnionUF.js';
import { UF } from './src/1. Fundamentals/1.5 Union FInd/UF.js';

import { Selection } from './src/2. Sorting/2.1_Elementry_Sorts/SelectionSort.js';
import { InsersionSort } from './src/2. Sorting/2.1_Elementry_Sorts/InsersionSort.js';
import { ShellSort } from './src/2. Sorting/2.1_Elementry_Sorts/ShellSort.js';
import { Certification } from './src/2. Sorting/2.1_Elementry_Sorts/exercises/exercise_2_1_16.js';
import { Exercise24_InsertionSortWithSentinel } from './src/2. Sorting/2.1_Elementry_Sorts/exercises/exercise2_1_24_InsertionSortWithSentinel.js';
import { Exercise25_InsertionSortWithoutExchanges } from './src/2. Sorting/2.1_Elementry_Sorts/exercises/exercise25_InsertionSortWithoutExchanges.js';
import { InsersionX } from './src/2. Sorting/2.1_Elementry_Sorts/InsertionX.js';
import { BinaryInsertion } from './src/2. Sorting/2.1_Elementry_Sorts/BinaryInsertion.js';

import { MergeSort } from './src/2. Sorting/2.2_Merge_Sort/MergeSort.js';
import { MergeSortBottomUP } from './src/2. Sorting/2.2_Merge_Sort/MergeSortBottomUP.js';
import { Example_2_2_9 } from './src/2. Sorting/exersices/2.2.9.js';
import { MergeX } from './src/2. Sorting/2.2_Merge_Sort/MergeX.js';

import { QuickSort } from './src/2. Sorting/2.3_Quick_Sort/QuickSort.js';
import { Quick3Way } from './src/2. Sorting/2.3_Quick_Sort/Quick3Way.js';

import { MaxPQ } from './src/2. Sorting/2.4_Priority_Queue/MaxPQ.js';
import { MinPQ } from './src/2. Sorting/2.4_Priority_Queue/MinPQ.js';
import { HearSort } from './src/2. Sorting/2.4_Priority_Queue/heap-sort.js';
import { IndexMinPQ } from './src/2. Sorting/2.4_Priority_Queue/IndexMinPQ.js';
import { IndexMaxPQ } from './src/2. Sorting/2.4_Priority_Queue/IndexMaxPQ.js';
import { TopM } from './src/2. Sorting/2.4_Priority_Queue/TopM.js';

import { SequencialST } from './src/3.Searching/3.1_Symbol Table/sequencial-st.js';
import { BinarySeachSt } from './src/3.Searching/3.1_Symbol Table/binary-search-st.js';

import { BST } from './src/3.Searching/3.2 Binary Seach Trees/BST.js';

import { LinearProbingHashST } from './src/3.Searching/3.4 Hash Table/LinearProbingHashST.js';
import { SeparateChaningHashST } from './src/3.Searching/3.4 Hash Table/SeparteChaningHashST.js';


import { Graph } from './src/4. Graphs/4.1 Undirected Graphs/graph.js';

import { DepthFirstSearch } from './src/4. Graphs/4.1 Undirected Graphs/depth-first-search.js';
import { DepthFirstPaths } from './src/4. Graphs/4.1 Undirected Graphs/depth-first-paths.js';
import { BreadthFirstPaths } from './src/4. Graphs/4.1 Undirected Graphs/breadth-first-paths.js';
import { CC } from './src/4. Graphs/4.1 Undirected Graphs/CC.js';
import { Cycle } from './src/4. Graphs/4.1 Undirected Graphs/cycle.js';
import { SymbolGraph } from './src/4. Graphs/4.1 Undirected Graphs/symbol-graph.js';
import { Digraph } from './src/4. Graphs/4.2Directed Graphs/Digraph.js';
import { DirectedDFS } from './src/4. Graphs/4.2Directed Graphs/DirectedDFS.js';
import { DepthFirstDirectedPaths } from './src/4. Graphs/4.2Directed Graphs/depth-first-directed-paths.js';
import { BreadthFirstDirectedPaths } from './src/4. Graphs/4.2Directed Graphs/breadth-first-directed-paths.js';
import { DirectedCycle } from './src/4. Graphs/4.2Directed Graphs/directed-cycle.js';
import { SymbolDigraph } from './src/4. Graphs/4.2Directed Graphs/SymbolDigraph.js';
import { Topological } from './src/4. Graphs/4.2Directed Graphs/topological.js';
import { KosarajuSharirSCC } from './src/4. Graphs/4.2Directed Graphs/KosarajuSharirSCC.js';
import { TransitiveClosure } from './src/4. Graphs/4.2Directed Graphs/TransitiveClosure.js';
import { Edge } from './src/4. Graphs/4.3 Minimum Spanning Tree/Edge.js';
import { EdgeWeightedGraph } from './src/4. Graphs/4.3 Minimum Spanning Tree/EdgeWeightedGraph.js';
import { LazyPrimMST } from './src/4. Graphs/4.3 Minimum Spanning Tree/LazyPrimSMT.js';
import { KrushkalMST } from './src/4. Graphs/4.3 Minimum Spanning Tree/KrushkalMST.js';
import { PrimMST } from './src/4. Graphs/4.3 Minimum Spanning Tree/PrimMST.js';

import { DirectedEdge } from './src/4. Graphs/4.4 Shortest Paths/DirectedEdge.js';
import { EdgeWeightedDigraph } from './src/4. Graphs/4.4 Shortest Paths/EdgeWeightedDigraph.js';
import { DijkstraSP } from './src/4. Graphs/4.4 Shortest Paths/DijkstraSP.js';
import { AcyclicSP } from './src/4. Graphs/4.4 Shortest Paths/AcyclicSP.js';
import { AcyclicLP } from './src/4. Graphs/4.4 Shortest Paths/AcyclicLP.js';

import { Alphabet } from './src/5. String/5.1 String Sort/Alphabet.js';
import { Count } from './src/5. String/5.1 String Sort/Count.js';
import { LSD } from './src/5. String/5.1 String Sort/LSD.js';
import { MSD } from './src/5. String/5.1 String Sort/MSD.js';
import { Quick3string } from './src/5. String/5.1 String Sort/Quick3string.js';

import {TriST} from './src/5. String/5.2 Tries/TriST.js';
import { TST } from './src/5. String/5.2 Tries/TST.js';

import { KMP } from './src/5. String/5.3 SubString Search/KMP.js';
import { BoyerMoore } from './src/5. String/5.3 SubString Search/BoyerMoore.js';
import { RabinKarp } from './src/5. String/5.3 SubString Search/RabinKarp.js';

import { NFA } from './src/5. String/5.4 Regular Expression/NFA.js';
import { GREP } from './src/5. String/5.4 Regular Expression/GREP.js';
import {Stopwatch} from './src/adts/index.js';
// 2. Sorting --- End

(function main() {
    // const rl = StdIn.readFileAsStream('assets/m1.txt');
    // rl.on('line', line => {
    //     StdOut.println(line)
    // });

    /*************************************************************
    * Binary Seach
    *************************************************************/
    // BinarySearch.main();
    // BinarySearch_Recursive.main();
    // SuffleTest(10, 6);
    // gcd_test();
    // lcm_test();
    
    /*************************************************************
    * Bag, Queue, Stack, Dijkstra Expression Evaluation, LinkedList
    **************************************************************/
    // EvaluateClient();
    // FixedCapacityStack.main();
    // ResizingArrayStack.main();
    // ResizingArrayQueue.main();
    // Bag.main()
    // Stack.main(); 
    // Queue.main();
    // linkedListTestingClient();
    // testStackWithLinkedList();
    // queueTestClient()
    // paranthesesTestClient();
    // stequeTestClient();
    // dequeTestClient();
    // execute_1_3_9_test_client();
    // execute_1_3_30_Test_Client();
    
    /***********************************************************
    * Two Sum, Three Sum Josephus Problem, Closest Pair, 
    * Fartest Pair, BitonicSeach
    ***********************************************************/
    // TwoSum.main();
    // ThreeSumFast.main();
    // josephusProblem(7, 2);
    // copyAStackTestClient();
    // moveToFrontTestClient();
    // closestpairTestingClient();
    // fartestPairTestingClient();
    // const arr = [2, 6,3,1];
    // console.log(arr);
    // bitonicSearch(arr, 1);

    /***********************************************************
    * Union Find
    ***********************************************************/
    // QuickFindUF.main();
    // QuickUnionUF.main();
    // const watch1 = new Stopwatch()
    // WeightedQuichUnionUF.main();
    // console.log(watch1.elapsedTime());
    // const watch = new Stopwatch();
    // UF.main();
    // console.log(watch.elapsedTime());

    /************************************************************
    * Elementry Sort
    *************************************************************/
    // Selection.main()
    // InsersionSort.main();
    // ShellSort.main()
    // Certification.main();
    // Exercise24_InsertionSortWithSentinel.main();
    // Exercise25_InsertionSortWithoutExchanges.main();
    // InsersionX.main();
    // BinaryInsertion.main();

    /*************************************************************
    * MergeSort
    **************************************************************/
    // MergeSort.main()
    // MergeSortBottomUP.main();
    // MergeX.main();
    // Example_2_2_9.main();

    /*************************************************************
    * Quick Sort
    *************************************************************/
    // QuickSort.main();
    // Quick3Way.main();

    /*************************************************************
    * Priority Queue
    **************************************************************/
    // MinPQ.main()
    MaxPQ.main();
    // HearSort.main();
    // IndexMinPQ.main();
    // IndexMaxPQ.main();
    // TopM.main();

    // 2. Searching
    // SequencialST.main();
    // BinarySeachSt.main(); 
    // BST.main();
    // LinearProbingHashST.main();
    // SeparateChaningHashST.main()

    // Graph.main();
    // DepthFirstSearch.main();
    // DepthFirstPaths.main();
    // BreadthFirstPaths.main();
    // CC.main();
    // Cycle.main();
    // SymbolGraph.main();  
   
    // Digraph.main();
    // DirectedDFS.main();
    // DepthFirstDirectedPaths.main();
    // BreadthFirstDirectedPaths.main();
    // DirectedCycle.main()
    // SymbolDigraph.main();
    // Topological.main();
    // KosarajuSharirSCC.main();
    // TransitiveClosure.main();

    // Edge.main();
    // EdgeWeightedGraph.main();
    // LazyPrimMST.main();
    // PrimMST.main();
    // KrushkalMST.main();

    // DirectedEdge.main();
    // EdgeWeightedDigraph.main();
    // DijkstraSP.main();
    // AcyclicSP.main();
    // AcyclicLP.main();

    // Alphabet.main();
    // Count.main();
    // LSD.main();
    // MSD.main()
    // Quick3string.main();
    // TriST.main();
    // TST.main();

    // KMP.main();
    // BoyerMoore.main();
    // RabinKarp.main();
    // NFA.main();
    // GREP.main(["(A*B|AC)D"]);

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


function testStackWithLinkedList() {
    const stack = new Stack();
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



    const stack1 = new Stack();
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
    const s = new Stack();
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


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5001, () => console.log("Listening to the 5000 port"));



