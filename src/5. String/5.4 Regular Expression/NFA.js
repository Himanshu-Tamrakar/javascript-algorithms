
import { Bag } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js";
import { Stack } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Stack.js";
import { Digraph } from "../../4. Graphs/4.2Directed Graphs/Digraph.js";
import { DirectedDFS } from "../../4. Graphs/4.2Directed Graphs/DirectedDFS.js";
import { StdOut } from "../../libs/index.js";

/**
 * The following features are not supported:
 *   - The + operator
 *   - Multiway or
 *   - Metacharacters in the text
 *   - Character classes.
 */
export class NFA {
    G;  // digraph of epsilon transitions
    regexp; // regular expression
    m;      // number of characters in regular expression

    constructor(regexp) {
        this.regexp = regexp;
        this.m = regexp.length;
        const ops = new Stack();
        this.G = new Digraph(this.m+1);

        for (let i = 0; i < this.m; i++) {
            let lp = i;

            if (regexp[i] === '(' || regexp[i] === '|') {
                ops.push(i);
            } else if (regexp[i] === ')') {
                const or = ops.pop();
                if (regexp[or] === '|') {
                    lp = ops.pop();
                    this.G.addEdge(lp, or+1);
                    this.G.addEdge(or, i);
                } else if (regexp[or] === '(') {
                    lp = or;
                }
            } else {}

            // look ahead if current chat is i but i+1 is * then
            if (i < this.m-1 && regexp[i+1] === '*') {
                this.G.addEdge(lp, i+1);
                this.G.addEdge(i+1, lp);
            }


            if (regexp[i] === '(' || regexp[i] === '*' || regexp[i] === ')') {
                this.G.addEdge(i, i+1);
            }
            
        }
        if (ops.size() != 0)
            throw new Error("Invalid regular expression");
    }

    /**
     * Returns true if the text is matched by the regular expression.
     *
     * @param  txt the text
     * @return {@code true} if the text is matched by the regular expression,
     *         {@code false} otherwise
     */
    recognizes (txt) {

        let dfs = new DirectedDFS(this.G, 0);
        let pc = new Bag();
        for (let v = 0; v < this.G.V(); v++) {
            if (dfs.marked(v)) pc.add(v);
        }

        for (let i = 0; i < txt.length; i++) {
            if (txt[i] == '*' || txt[i] == '|' || txt[i] == '(' || txt[i] == ')')
                throw new TypeError("text contains the metacharacter '" + txt[i] + "'");

            const match = new Bag();
            for (const v of pc) {
                if (v === this.m) continue;
                if (this.regexp[v] === txt[i] || this.regexp[v] === '.') {
                    match.add(v+1);
                }

                if (match.isEmpty()) continue;

                dfs = new DirectedDFS(this.G, match);
                pc = new Bag();
                for (let v = 0; v < this.G.V(); v++) {
                    if (dfs.marked(v)) pc.add(v);
                }

                if (pc.size() == 0) return false; // if no state reachable. It is a optimization

            }
            
        }

        // check for accept state
        for (let v of pc)
            if (v == this.m) return true;
        return false;
        
    }


    static main() {
        
        // const txt = 'AAAABD';
        // const regex = '(A*B|AC)D'

        // const txt = 'AAAAC';
        // const regex = "(A*B|AC)D" 

        // const txt = 'abcbcd';
        // const regex = "(a|(bc)*d)*" 
        


        const txt = 'abcbcbcdaaaabcbcdaaaddd';
        const regex = "(a|(bc)*d)*" 

        const nfa = new NFA(regex);
        StdOut.println(nfa.recognizes(txt))

    }
}