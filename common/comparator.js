/**
 * A default comparing function.
 * @param {*} a Comparable object `a`
 * @param {*} b Comparable object `b`
 * @returns {number}
 *   returns `-1` when `a` is less than `b`,
 *   returns `1` when `a` is greater than `b` or
 *   returns `0` when `a` is equal to `b`
 */
function defaultComparator(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}

/**
 * Helper function to determine if a given argument is defined.
 * @param {*} obj Single argument to be evaluated
 */
function isDefined (obj) {
    return typeof obj !== 'undefined'
}

/**
 * Helper function to inspect if a given object has the method `compareTo` implemented.
 * @param {*} obj Single argument to be inspected
 */
function hasCompareTo (obj) {
    return isDefined(obj) && typeof obj.compareTo === 'function'
}

/**
 * Generic comparator function.
 * @param {*} a Comparable object `a`
 * @param {*} b Comparable object `b`
 * @returns {number}
 *   returns `-1` when `a` is less than `b`,
 *   returns `1` when `a` is greater than `b` or
 *   returns `0` when `a` is equal to `b`.
 */
function compare(a, b) {
    if (a === b) return 0;

    if (hasCompareTo(a) && hasCompareTo(b)) {
        return a.compareTo(b);
    }

    return defaultComparator(a, b);
}


/**
 * Default equals method
 * @param {*} Comparable object a
 * @param {*} Comparable object b
 * @returns {boolean}
 *  returns `true when a and b are equal to` 
 *  returns `false when a and b are not equal`
 */
function equals(a, b) {
    return compare(a, b) === 0;
}

export { defaultComparator, compare, equals };