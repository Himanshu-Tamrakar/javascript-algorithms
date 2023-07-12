// Dijkastra's two stack aritimatic expression evalution

import { Stack }  from "./Stack.js";

function Evaluate(input) {
    const ops = new Stack();
    const vals = new Stack();

    let result = 0;

    for (const item of input) {
        if (item === '(') {

        } else if (item === '+') {
            ops.push(item);
        } else if (item === '-') {
            ops.push(item);
        } else if (item == '*') {
            ops.push(item);
        } else if (item === '/') {
            ops.push(item);
        } else if (item === 'sqrt') {
            ops.push(item);
        }  else if (item === ')') {
            const oparand = ops.pop();
            if (oparand === '+') {
                result = vals.pop() + vals.pop();
            } else if (oparand === '-') {
                const val0 = vals.pop();
                const val1 = vals.pop();
                result = val1 - val0;
            } else if (oparand === '*') {
                result = vals.pop() * vals.pop();
            } else if (oparand === '/') {
                const val0 = vals.pop();
                const val1 = vals.pop();
                result = val1 / val0;
            } else if (oparand === 'sqrt') {
                result = Math.sqrt(vals.pop());
            }

            vals.push(result);
        } else {
            vals.push(+item);
        }


    };


    return !vals.isEmpty() ? vals.pop() : null;
}

function EvaluateClient() {
    let res = -1;

    let input = '( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )';
    input = input.split(" ");
    res = Evaluate(input);
    console.log(res);
    
    const input1 = ['(', '10', '+', 'sqrt', '(', '4', ')', ')']
    res = Evaluate(input1);
    console.log(res);
}

export { Evaluate, EvaluateClient };

// let input = '( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )';
// input = input.split(" ");
// const input1 = ['(', '10', '+', 'sqrt', '(', '4', ')', ')']

// console.log('Evaluate.js');
// console.log(Evaluate(input));