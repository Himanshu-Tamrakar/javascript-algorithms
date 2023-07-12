import { Stack } from "../Stack.js";

export default function parantheses(input) {
    if (!Array.isArray(input)) {
        throw new Error('Input is incorrect');
    } 

    const stack = new Stack();

    for (let i = 0; i < input.length; i++) {
        const val = input[i];

        if (val === '[' || val === '{' || val === '(') {
            stack.push(val);
        } else {
            const item = stack.peek();
            if (val === ')' && item === '(') {
                stack.pop();
                continue;
            } else if (val === '}' && item === '{') {
                stack.pop();
                continue;
            } else if (val === ']' && item === '[') {
                stack.pop();
                continue;
            } else {
                break;
            }
        }
    }

   return stack.isEmpty() ? true : false;

}
