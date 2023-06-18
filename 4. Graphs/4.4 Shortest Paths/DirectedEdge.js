import {compare} from "../../common/index.js";
import { StdOut } from "../../libs/index.js";

export class DirectedEdge {
    _v;
    _w;
    _weight;

    /**
     * Initializes a directed edge from vertex {@code v} to vertex {@code w} with
     * the given {@code weight}.
     * @param v the tail vertex
     * @param w the head vertex
     * @param weight the weight of the directed edge
     * @throws TypeError if either {@code v} or {@code w} is a negative integer
     * @throws TypeError if {@code weight} is {@code NaN}
     */
    constructor(v, w, weight) {
        if (v < 0) throw new TypeError("vertex index must be a non-negative integer");
        if (w < 0) throw new TypeError("vertex index must be a non-negative integer");
        if (Number.isNaN(weight)) throw new TypeError("Weight is NaN");
        this._v = v;
        this._w = w;
        this._weight = weight;
    }

    /**
     * Returns the tail vertex of the directed edge.
     * @return the tail vertex of the directed edge
     */
    from() {
        return this._v;
    }

    /**
     * Returns the head vertex of the directed edge.
     * @return the head vertex of the directed edge
     */
    to() {
        return this._w;
    }

    /**
     * returns the weight of the directed edge
     * @returns the weight of the directed edge
     */
    weight() {
        return this._weight;
    }

     /**
     * Compares two directed edges by weight.
     * Note that {@code compareTo()} is not consistent with {@code equals()},
     * which uses the reference equality implementation inherited from {@code Object}.
     *
     * @param  that the other directed edge
     * @return a negative integer, zero, or positive integer depending on whether
     * the weight of this is less than, equal to, or greater than the argument that
     */
    compareTo(that) {
        return compare(this._weight, that.weight());
    }

    /**
    * Returns a string representation of this edge.
    *
    * @return a string representation of this edge
    */
    _toString() {
        return `${this._v} -> ${this._w} ${this._weight}`;
    } 

     /**
     * Unit tests the {@code DirectedEdge} data type.
     *
     * @param args the command-line arguments
     */
     static main() {
        const e = new DirectedEdge(12, 34, 5.67);
        StdOut.println(e._toString());
    }
}