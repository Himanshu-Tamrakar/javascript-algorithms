
/** 
    1.3.9 Write a program that takes from standard input an expression without left pa-
    rentheses and prints the equivalent infix expression with the parentheses inserted. For
    example, 
    
    given the input: 1 + 2 ) * 3 - 4 ) * 5 - 6 ) ) )
    your program should print
    ( ( 1 + 2 ) * ( ( 3 - 4 ) * ( 5 - 6 ) )
* */ 

export function execute_1_3_9(input) {
    if (!Array.isArray(input)) {
        throw new Error('Invalid input');
    }

    // considering this as stack
    const vals = [];
    const opr = [];

    for (let i = 0; i < input.length; i++) {
        const ch = input[i];

        if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
            opr.push(ch);
        } else if ( ch === ')' ) {
            const v2 = vals.pop();
            const v1 = vals.pop();
            const operator = opr.pop();
            let res = '(' + v1 + operator + v2 + ')';
            vals.push(res);
        } else {
            vals.push(ch);
        }
    }

    return vals.pop()
}