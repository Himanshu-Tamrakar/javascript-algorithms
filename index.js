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

import { SequencialST } from './src/3.Searching/3.1_Symbol Table/SequencialST.js';
import { BinarySeachSt } from './src/3.Searching/3.1_Symbol Table/binary-search-st.js';

import { BST } from './src/3.Searching/3.2 Binary Seach Trees/BST.js';

import { RedBlackBST } from './src/3.Searching/3.3 Balanced Tree/RedBlackBST.js';

import { LinearProbingHashST } from './src/3.Searching/3.4 Hash Table/LinearProbingHashST.js';
import { SeparateChaningHashST } from './src/3.Searching/3.4 Hash Table/SeparteChaningHashST.js';


import { Graph } from './src/4. Graphs/4.1 Undirected Graphs/graph.js';

import { DepthFirstSearch } from './src/4. Graphs/4.1 Undirected Graphs/depth-first-search.js';
import { DepthFirstPaths } from './src/4. Graphs/4.1 Undirected Graphs/depth-first-paths.js';
import { BreadthFirstPaths } from './src/4. Graphs/4.1 Undirected Graphs/breadth-first-paths.js';
import { CC } from './src/4. Graphs/4.1 Undirected Graphs/CC.js';
import { Cycle } from './src/4. Graphs/4.1 Undirected Graphs/cycle.js';
import { Bipartite } from './src/4. Graphs/4.1 Undirected Graphs/Bipartite.js';
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

// var findMedianSortedArrays = function(nums1, nums2) {
//     const n1 = nums1.length;
//     const n2 = nums2.length;
//     const isOdd = (n1+n2)%2 != 0;

//     const mid = Math.floor((n1+n2)/2);
//     let i = -1;
//     let j = -1;
//     let k = 0;
//     // let last;
//     // let secondLast;
//     // let isIIncremented = false;
//     while (k <= mid) {
//         if (i >= n1-1) j++;
//         else if (j >= n2-1) i++;
//         else if (nums1[i+1] < nums2[j+1]) i++;
//         else  j++;
//         k++;
//     }

//     if (isOdd) {
//         if      (i < 0) return nums2[j--];
//         else if (j < 0) return nums1[i--];
//         else if (nums1[i] < nums2[j]) return nums2[j];
//         else return nums1[i];
//     } else {
//         // const last = nums1[i] < nums2[j] ? nums2[j--] : nums1[i--];

//         let last; 
//         let secondLast;
//         if      (i < 0) last = nums2[j--];
//         else if (j < 0) last = nums1[i--];
//         else if (nums1[i] < nums2[j]) last = nums2[j--];
//         else last = nums1[i--];
        
//         if      (i < 0) secondLast = nums2[j--];
//         else if (j < 0) secondLast = nums1[i--];
//         else            secondLast = nums1[i] < nums2[j] ? nums2[j--] : nums1[i--];
//         return (last + secondLast) / 2;
//     }
    
// };

// var findMin = function(nums) {
//     return _findMin(nums,  0, nums.length-1);
// };

// var _findMin = function(nums, lo, hi) {
//     if (lo === hi) return nums[lo];
//     const mid = lo + Math.floor((hi-lo) / 2);
//     if (nums[mid] < nums[hi]) return _findMin(nums,  lo,  mid);
//     else if (nums[mid] > nums[hi]) return _findMin(nums, mid+1, hi);
//     else return Math.min(_findMin(nums,  lo,  mid), _findMin(nums, mid+1, hi));
// };

// var translations = new Map([
//     [1000000000, 'Billion'],
//     [1000000, 'Million'],
//     [1000, 'Thousand'],
//     [100, 'Hundred'],
//     [90, 'Ninety'],
//     [80, 'Eighty'],
//     [70, 'Seventy'],
//     [60, 'Sixty'],
//     [50, 'Fifty'],
//     [40, 'Forty'],
//     [30, 'Thirty'],
//     [20, 'Twenty'],
//     [19, 'Nineteen'],
//     [18, 'Eighteen'],
//     [17, 'Seventeen'],
//     [16, 'Sixteen'],
//     [15, 'Fifteen'],
//     [14, 'Fourteen'],
//     [13, 'Thirteen'],
//     [12, 'Twelve'],
//     [11, 'Eleven'],
//     [10, 'Ten'],
//     [9, 'Nine'],
//     [8, 'Eight'],
//     [7, 'Seven'],
//     [6, 'Six'],
//     [5, 'Five'],
//     [4, 'Four'],
//     [3, 'Three'],
//     [2, 'Two'],
//     [1, 'One'],
//   ]);

// var numberToWords = function(num) {
//     if (num < 10) return translations.get(num) || '';
//     let res = ''
//     for (let [val, unit] of translations) {
//         const times = Math.floor(num/val);
//         if (times === 0) continue;
//         num = num - (times*val);
//         if (val < 100) {
//             res += unit + ' ' + numberToWords(num);
//             break;
//         } else {
//             res += numberToWords(times) +' ' + unit + ' ';
//         }
//     }
//     return res;  
// };

/**
 * @param {string} expression
 * @return {number}
 */

var varRegex = new RegExp('^[a-z][a-z0-9]*');
var numRegex = new RegExp('^[\-0-9][0-9]*');

function isVar(epxr) {
    return varRegex.test(epxr);
}

function isNum(expr) {
    return numRegex.test(expr);
}

function tokenize(expr) {
    const result = [];
    let lastPos = 0; // Last position of used expression
    let leftBracket = 0; // Counts number of left brackets
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            leftBracket++;
            lastPos = i;
        } 
        else if (expr[i] === ' ' || (expr[i] === ')' && leftBracket === 1)) { // Read expression from lastPos to i, if expression is var the add as string; if expression is number convert into number
            let data = expr.slice(lastPos + 1, i);
            if (isNum(data)) {
                data = +data;
            }
            result.push(data); /// lastPos+1 means remove '('
            lastPos = i;
        } 
        
        if (leftBracket > 1) {
            i++;
            while (i < expr.length && leftBracket > 1) {
                if (expr[i] === '(') {
                    leftBracket++;
                }
                else if (expr[i] === ')'){
                    leftBracket--;
                }
                i++;
            }
            result.push(expr.slice(lastPos, i));
            lastPos = i;
        }
    }
    return result;
}


function evaluate(expr, map = {}) {
    if (isVar(expr)) return map[expr];
    if (isNum(expr)) return expr;

    expr = tokenize(expr);
    const m = Object.assign({}, map);

    if (expr[0] === 'add')  return (evaluate(expr[1], m) + evaluate(expr[2], m));
    if (expr[0] === 'mult') return (evaluate(expr[1], m) * evaluate(expr[2], m));

    for (let i = 1; i < expr.length; i++) {
        if (isVar(expr[i])) {
            if (i+1 < expr.length)
                m[expr[i]] = evaluate(expr[++i], m);
            else return evaluate(expr[i], m);
        } 
        else return evaluate(expr[i], m);
    }
}


function parseBoolExpr(expr) {
    if (expr === 'f') return false;
    if (expr === 't') return true;

    expr = lexing(expr);
    if (expr[0] == '&') {
        for (let i = 1; i < expr.length; i++) {
            expr[i] = parseBoolExpr(expr[i]);
            if (!expr[i]) return false;
        }
        return true;
    } else if (expr[0] === '|') {
        for (let i = 1; i < expr.length; i++) {
            expr[i] = parseBoolExpr(expr[i]);
            if (expr[i]) return true;
        }
        return false;
    } else { // if (expr[0] === '!')
        return !(parseBoolExpr(expr[1]))
    }
}

function lexing(expr) {

    const res = [];
    if (expr[0] === '&' || expr[0] === '|' || expr[0] === '!') res.push(expr[0]);

    let lastPos = 1;
    let leftBracket = -1;
    for (let i = 1; i < expr.length; i++) {
        if (expr[i] === '(') {
            leftBracket++;
            if (leftBracket > 0) {
                lastPos = i-1;

                while(++i < expr.length && leftBracket > 0) {
                    if (expr[i] === '(') leftBracket++;
                    if (expr[i] === ')') leftBracket--;
                }
                res.push(expr.slice(lastPos, i));
                lastPos = i;
            } 
        } else if (expr[i] === ',') {
            res.push(expr.slice(lastPos+1, i));
            lastPos = i;
        } else if (expr[i] === ')') {
            res.push(expr.slice(lastPos+1, i));
            lastPos = i;
        }
    }
    return res;
}


function countGoodNumbers(n) {
    let count = 0;
    const max = createMaxNum(n);
    console.log('Num : ', max)
    for (let i = 0; i <= max; i++) 
        if (isGoodNum(i)) count++;

    return count;
};

function createMaxNum(n) {
    let res = '';
    for (let i = 0; i < n; i++) res += '9';
    return +res;
}

function isGoodNum(n) {
    n = String(n);
    let even = true;

    for (let i = 0; i < n.length; i++) {
        if (even) {
            if (!isEven(+n[i])) return false;
        } else {
            if (!isPrime(+n[i])) return false;
        }
        even = !even;
    }
    console.log('NUM, ', n, true);
    return true;
}
function isPrime(n) {
    if (n == 2 || n === 3 || n === 5 || n === 7) return true;
    return false;
}
function isEven(n) {
    return n%2 === 0;
}

/**----------------*/
function ListNode(val, next) {
   this.val = (val===undefined ? 0 : val)
   this.next = (next===undefined ? null : next)
}

function removeNodes(head) {
    
    let stack = [head];
    let first = head.next;
    while (first != null) {
        if (stack.length > 0 && stack[stack.length-1].val < first.val) {
            while (stack.length > 0 && stack[stack.length-1].val < first.val) stack.pop();
            stack.push(first);
        } else {
            stack.push(first);
        }

        first = first.next;

    }

    let copy = [];
    while (stack.length > 0) {
        copy.push(stack.pop());
    }

    first = copy.pop();
    let temp = first;
    while (copy.length > 0) { temp.next = copy.pop(); temp = temp.next };
    temp.next = null;
    return first;
};

/** ***************** */

function longestValidParentheses(s) {
    const stack = [];
    let last = -1;
    let result = 0;
    let leftBracket = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
          stack.push(i);
          leftBracket++;
        } 
        else {
            if (stack.length === 0) continue;
            leftBracket--; // if left present then only minus
            
            const val = stack.pop();
            if (leftBracket === 0 && (last+1 === val || last === -1)) {
              result += (i-val+1);
              last = i;
            } else {
              result = Math.max(result, i-val+1);
            }
                
            
        }
    }
    return result;  
  };

  /** ************** */
function simplifyPath(path) {
    let stack = [];
    path = path.split('/');
    
    for (let i = 0; i < path.length; i++) {
        if      (path[i] == '.' || path[i] == '') continue;
        else if (path[i] == '..')                 stack.pop();
        else                                      stack.push(path[i]);
    }

    return "/" + stack.join("/");

};

/** ****** */
function decodeString(s) {
    let res = '';
    let stack = [];

    let i = 0;
    while (i < s.length) {
        let ch = s[i];
        if (ch >= '0' && ch <= '9') {
            let start = i;
            while (s[i] !== '[') i++;
            stack.push(+(s.slice(start, i)));
        } else if (ch === ']') {
            i++;
            let encoded_string = [];
            let item = stack.pop();
            while (item !== '[') {
                encoded_string.unshift(item);
                item = stack.pop();
            }
            encoded_string = encoded_string.join('');
            
            let k = +(stack.pop());
            let temp = '';
            while (k-- > 0) {
                temp += encoded_string;
            }
            stack.push(temp);
        }   
        else {
          stack.push(s[i++]);  
        }
    }
    let copyStack = []
    while (stack.length > 0) copyStack.push(stack.pop())
    while (copyStack.length > 0) res += copyStack.pop();
    return res;
};
function asteroidCollision(asteroids) {
    const stack = [];
    let canPush = true;
    for (const asteroid of asteroids) {
        canPush = true;
        if (stack.length === 0) {
            stack.push(asteroid);
            continue;
        } 
        
        while (stack[stack.length-1] > 0 && asteroid < 0) {
            const peek = stack[stack.length-1];
            if (peek < -(asteroid)) {
                stack.pop();
            } 
            else if (peek === -(asteroid)) {
                stack.pop(); 
                canPush = false; 
                break;
            }
            else {
                canPush = false; 
                break;
            };
        }
        if (canPush) stack.push(asteroid);
    }
    return stack;

};

function addMinimum(word) {
    let res = 0;
    const stack = [word[0]];
    let i = 1;
    while (i < word.length) {
        const peek = stack[stack.length-1];
        if (peek === 'a') {
            if (word[i] === 'a') {
                res += 2;
            }
            else if (word[i] === 'b'){
            } 
            else {
                res++; 
            }
        } else if (peek === 'b') {
            if (word[i] === 'a') {
                res ++;
            }
            else if (word[i] === 'b'){
                res++;
            } 
            else {
            }
        } else {
            if (word[i] === 'a') {
            }
            else if (word[i] === 'b'){
                res++;
            } 
            else {
                res += 2;
            }
        }
        stack.push(word[i]);
        i++;

    }
    if (word[word.length-1] === 'a') res +=2;
    if (word[word.length-1] === 'b') res++;
    return res;
};
/** ***** */


function TreeNode2(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
function flatten(root) {
    function solve(root) {
        if (root == null) return null;
        if (root.left == null && root.right === null) return root;

        const left = root.left;
        const right = root.right;
        root.left = null;

        let res;
        if (left) {
            res = solve(left);
        } 
        if (res) {
            let lastRightOfRes = res;
            while (lastRightOfRes.right != null) lastRightOfRes = lastRightOfRes.right;
            lastRightOfRes.right = solve(right);
        } 

        if (res) root.right = res;
        return root;
    }

    root = solve(root);
    return root;
};


(function main() {

    // let root = new TreeNode2(1, new TreeNode2(2, new TreeNode2(3, null, null), new TreeNode2(4, null, null)), new TreeNode2(5, null, new TreeNode2(6, null, null)));
    // root = flatten(root);
    // console.log(root);
    // console.log(
    //     addMinimum('abc')
    // );

    // console.log(
    //     asteroidCollision([10, 10, -10])
    //     asteroidCollision([-2,-2,1,-2])
    //     asteroidCollision([1,-2,-2,-2])
    //     asteroidCollision([-2,-2,1,-1])
    //     asteroidCollision([-2,-1,1,2])
    // );

    // console.log(
    //     isValidSerialization("9,3,4,#,#,1,#,#,2,#,6,#,#")
    // );
    // console.log(
    //     // decodeString("100[leetcode]")
    //     // decodeString("1[a10[bc]de]")
    //     decodeString("3[z]2[2[y]pq4[2[jk]e1[f]]]ef")
    // );
    // console.log(
    //     simplifyPath("/home/../../..")
    // );

    // console.log(
    //     // longestValidParentheses(')()())')
    //     // longestValidParentheses('()(())')
    //     longestValidParentheses('(()()')
    // );

    // const first = new ListNode(5, new ListNode(2, new ListNode(13, new ListNode(3, new ListNode(8, null)))));
    // let res = removeNodes(first);
    // while(res !== null) {
    //     console.log(res.val);
    //     res = res.next;
    // }

    // console.log(
    //     countGoodNumbers(4)
    // );

    // console.log(
    //     // lexing("&(|(f))")
    //     // lexing('|(f,f,f,t)')
    //     // lexing('!(&(f,t))')
    //     // lexing('&(f,t)')

    //     // parseBoolExpr('&(|(f))')
    //     // parseBoolExpr('|(f,f,f,t)')
    //     // parseBoolExpr('!(&(f,t))')
    // );

    // [ 'let', 'x', '2', '(mult x (let x 3 y 4 (add x y)))' ]
    // console.log(
        // isVar('var1')
        // tokenize("(let x 2 (mult x (let x 3 y 4 (add x y))))")
        // tokenize("(let x 3 y 4 (add x y))")    
        // tokenize("(add (let x 3 (let x 4 x)) x)")
        // tokenize("(let x0 -5 x2 -2 x4 -4 x6 -4 x8 0 (let x0 3 x3 -1 x6 4 x9 -2 (let x0 0 x4 -3 x8 -2 (add (add x4 (let x0 -5 x7 1 (let x0 -2 x8 -2 (mult x2 x7)))) x0))))")
        // tokenize("(let x0 3 x3 -1 x6 4 x9 -2 (let x0 0 x4 -3 x8 -2 (add (add x4 (let x0 -5 x7 1 (let x0 -2 x8 -2 (mult x2 x7)))) x0)))")
        // tokenize("(let x0 0 x4 -3 x8 -2 (add (add x4 (let x0 -5 x7 1 (let x0 -2 x8 -2 (mult x2 x7)))) x0))")
        // tokenize("(add (add x4 (let x0 -5 x7 1 (let x0 -2 x8 -2 (mult x2 x7)))) x0)")
        // tokenize("(add x4 (let x0 -5 x7 1 (let x0 -2 x8 -2 (mult x2 x7))))")
        // tokenize("(let x0 -5 x7 1 (let x0 -2 x8 -2 (mult x2 x7)))")
        // tokenize("(let x0 -2 x8 -2 (mult x2 x7)")


        // evaluate("(let x 2 (mult x (let x 3 y 4 (add x y))))")
        // evaluate("(let x 3 x 2 x)")
        // evaluate("(let x 1 y 2 x (add x y) (add x y))")
        // evaluate("(let x 2 (add (let x 3 (let x 4 x)) x))")
        // evaluate("(let x0 -4 x1 1 x2 -1 x3 -1 x4 3 x5 1 x6 -4 x7 -1 x8 -5 x9 3 (let x0 -5 x2 -2 x4 -4 x6 -4 x8 0 (let x0 3 x3 -1 x6 4 x9 -2 (let x0 0 x4 -3 x8 -2 (add (add x4 (let x0 -5 x7 1 (let x0 -2 x8 -2 (mult x2 x7)))) x0)))))")
        // evaluate("(let x0 -4 x1 1 x2 -1 x3 -1 x4 3 x5 1 x6 -4 x7 -1 x8 -5 x9 3 (let x0 -5 x2 -2 x4 -4 x6 -4 x8 0 (let x0 3 x3 -1 x6 4 x9 -2 (let x0 0 x4 -3 x8 -2 (add (add x4 (let x0 -5 x7 1 (let x0 -2 x8 -2 (mult x2 x7)))) x0)))))")
    // );

    // console.log(
    //     numberToWords(2147483647)
    //     // numberToWords(147)
    // );
    
    // const res = findMin([3,3,1,3]);
    // console.log(res);

    // const a1 = [];
    // const a2 = [2, 3];
    // const res = findMedianSortedArrays(a1, a2);
    // console.log(res);
    
    
    
    
   

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
    // MaxPQ.main();
    // HearSort.main();
    // IndexMinPQ.main();
    // IndexMaxPQ.main();
    // TopM.main();

    // SequencialST.main();
    // BinarySeachSt.main(); 

    // BST.main();

    // RedBlackBST.main();

    // LinearProbingHashST.main();
    // SeparateChaningHashST.main()

    // Graph.main();
    // DepthFirstSearch.main();
    // DepthFirstPaths.main();
    // BreadthFirstPaths.main();
    // CC.main();
    // Cycle.main();
    // Bipartite.main()
    SymbolGraph.main();  
   
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



