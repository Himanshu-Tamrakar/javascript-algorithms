import { compare } from "../../common/index.js";
import {StdOut} from "../../libs/index.js";

export class Edge {
    _v;
    _w;
    _weight;

    /**
     * Initializes an edge between vertices {@code v} and {@code w} of
     * the given {@code weight}.
     *
     * @param  v one vertex
     * @param  w the other vertex
     * @param  weight the weight of this edge
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
     * Returns the weight of this edge.
     *
     * @return the weight of this edge
     */
    weight() {
        return this._weight;
    }

    /**
     * Returns either endpoint of this edge.
     *
     * @return either endpoint of this edge
     */
    either() {
        return this._v;
    }

     /**
     * Returns the endpoint of this edge that is different from the given vertex.
     *
     * @param  vertex one endpoint of this edge
     * @return the other endpoint of this edge
     * @throws TypeError if the vertex is not one of the
     *         endpoints of this edge
     */
    other(vertex) {
        if (this._v === vertex) {
            return this._w;
        } else if (this._w === vertex) {
            return this._v;
        } else {
            throw new TypeError("Illegal endpoint");
        }
    }

    /**
     * Compares two edges by weight.
     * Note that {@code compareTo()} is not consistent with {@code equals()},
     * which uses the reference equality implementation inherited from {@code Object}.
     *
     * @param  that the other edge
     * @return a negative integer, zero, or positive integer depending on whether 
     * the weight of this is less than, equal to, or greater than that argument edge
     */
    compareTo(that) {
        return compare(this.weight(), that.weight()); 
    }

     /**
     * Returns a string representation of this edge.
     *
     * @return a string representation of this edge
     */
    _toString() {
        return `${this._v}-${this._w} ${this._weight}`;
    } 

    static main() {
        const e = new Edge(12, 34, 5.67);
        StdOut.println(e._toString());
    }
}

