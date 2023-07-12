import { Bag } from "../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js";
import { In } from '../../libs/index.js'
export class Digraph {
    _adj;
    _V;
    _E;
    _inDegree;
    constructor(input) {
        if (typeof input === 'number') {
            this._V = input;
            this._E = 0;
            this._inDegree = new Array(input).fill(0);
            this._adj = new Array(input);
            for (let i = 0; i < input; i++) {
                this._adj[i] = new Bag();
            }

        } else if (typeof input === "object") {
            this._constructor(input);
        }
    }
    _constructor(_in) {
        const rows = _in.readRawString().split("\n");
        this._V = parseInt(rows.shift());
        if (this._V < 0) throw new ReferenceError('number of vertices in a Digraph must be non-negetive');
        this._E = parseInt(rows.shift());
        if (this._E < 0) throw new ReferenceError('number if edges in a Digraph must be non-negetive');
        this._inDegree = new Array(this._V).fill(0);
        this._adj = new Array(this._V);
        for (let i = 0; i < this._V; i++) {
            this._adj[i] = new Bag();
        }

        rows.forEach(row => {
            const [v, w] = row.split(" ");
            this.addEdge(parseInt(v), parseInt(w));
            this._E--;
        });


    }

    /**
     * 
     */
    V() {
        return this._V;
    }

    /**
     * 
     */
    E() {
        this._E
    }

    /**
     * 
     * @param {*} v 
     * @param {*} w 
     */
    addEdge(v, w) {
        this.validate(v);
        this.validate(w);
        this._adj[v].add(w);
        this._inDegree[w]++;
        this._E++;
    }
    
    /**
     * 
     * @param {*} v 
     */
    adj(v) {
        this.validate(v);
        return this._adj[v];
    }

    /**
     * 
     * @param {*} v 
     */
    inDegree(v) {
        this.validate(v);
        return this._inDegree[v];
    }

    /**
     * 
     * @param {*} v 
     */
    outDegree(v) {
        this.validate(v);
        return this._adj[v].size();
    }

    /**
     * 
     */
    reverse() {
        const reverse = new Digraph(this._V);
        for (let v = 0; v < this._V; v++) {
            for (const w of this.adj(v)) {
                reverse.addEdge(w, v);
            }
        }
        return reverse;
    }

    _toString() {
        let s = `${this._V} vertices and ${this._E} edges;\n`;

        for (let v = 0; v < this._V; v++) {
            s += `${v} : `;
            for (const w of this.adj(v)) {
                s += `${w} `;
            }
            s += '\n';
        }

        return s;

    }

    /**
     * 
     * @param {*} v 
     */
    validate(v) {
        if (v < 0 || v >= this._V) {
            throw new ReferenceError('vertex ' + v + ' is not between 0 to ' + (this._V-1));
        }
    }

    static main() {
        const _in = new In('assets/tinyDG.txt');
        const digraph = new Digraph(_in);
        console.log(digraph._toString());
        console.log('------------');
        console.log(digraph.reverse()._toString());
        console.log('------------');
        console.log('InDegree of 4', digraph.inDegree(4));
    }
}