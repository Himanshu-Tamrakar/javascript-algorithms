import Bag from '../../1. Fundamentals/1.3 Bags, Queues and Stack/Bag.js';

/**
 * Parallel edge and self loop are allowed in this graph inplementation
 */
export class Graph {
    _adj;
    _V = 0;
    _E = 0;
    constructor(input) {
        if (typeof input === 'number') {
            this._V = input;
            this._E = 0;
            this._adj = new Array(this._V);
            for (let i = 0; i < this._V; i++) {
                this._adj[i] = new Bag();
            }
        } 

        if (typeof input === 'object') {
            const rows = input.readRawString().split('\n');
            this._V = parseInt(rows.shift());
            if (this._V < 0) throw new TypeError("number of vertices in a Graph must be non-negative");
            this._E = parseInt(rows.shift());
            if (this._E < 0) throw new TypeError("number of edges in a Graph must be non-negative");
            // this._adj = Array(this._V).fill(new Bag());
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
    }
    
    V() {
        return this._V;
    }

    E() {
        return this._E;
    }

    addEdge(v, w) {
        this.validate(v);
        this.validate(w);
        this._adj[v].add(w);
        this._adj[w].add(v);
        this._E++;
    }

    adj(v) {
        this.validate(v);
        return this._adj[v];
    }

    degree(v) {
        this.validate(v);
        return this._adj[v].size();
    }

    _toString() {
        if (this._adj.length <= 0) return '';

        let result = '';
        for (let i = 0; i < this._V; i++) {
            result += i + ' : ';

            for (const item of this.adj(i)) {
                result += item + ' ';
            }

            result += '\n';
            
        }

        return result;
    }

    validate(v) {
        if (v < 0 || v >= this._V) {
            throw new ReferenceError('vertex ' + v + ' is not between ' + (this.V-1));
        }
    }
}