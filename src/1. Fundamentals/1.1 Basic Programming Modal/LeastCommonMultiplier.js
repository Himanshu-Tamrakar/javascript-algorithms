import {StdOut} from "../../libs/index.js";
import { gcd } from "./GreatestCommonDivisor.js";
/**
 * Least Common Multiplier
 * @param {} p number
 * @param {} q number
 * @returns Least Common multiplier
 */
export function lcm(p, q) {
    if (Number.isNaN(p) || Number.isNaN(q)) {
        throw new TypeError('argument p and q in lcm() should be a number');
    }

    return p / gcd(p, q) * q;
}

export function lcm_test() {
    StdOut.println(lcm(12, 8));
}