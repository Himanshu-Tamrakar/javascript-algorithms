/**
 * Returns a random integer number
 * with `min` inclusive and `max` exclusive [min, max - 1)
 * @param {number} min
 * @param {number} max
 */
function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * Returns if a number is integer
 * @param {number} n Number to be tested
 */
function isInteger (n) {
  return Number.isInteger(n)
}

/**
 * StdRandom
 * @classdesc JavaScript implementation of StdRandom.
 * @see {@link https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/StdRandom.java.html}
 */
class StdRandom {
  /**
   * Uniform
   *
   * @todo Somehow I need to make this function to return
   * real number values when [0.0, 1.0] are provided.
   *
   * @constructor
   * @desc Returns a random real number uniformly in [0, 1).
   * @returns {number} A random real number uniformly in [0, 1).
   *//**
  * Uniform
  *
  * @constructor
  * @desc Returns a random integer uniformly in [0, n).
  * @param {number} n Number of possible integers.
  * @returns {number} A random integer uniformly between 0 (inclusive) and `n` (exclusive).
  *//**
  * Uniform
  *
  * @constructor
  * @desc Returns a random integer uniformly in [lo, hi).
  * @param {number} lo Minimum number.
  * @param {number} hi Maximum number.
  * @returns {number} A random integer uniformly in [lo, hi).
  *//**
  * Uniform
  *
  * @constructor
  * @desc Returns a random real number uniformly in [lo, hi).
  * @param {number} lo Minimum number.
  * @param {number} hi Maximum number.
  * @returns {number} A random real number uniformly in [lo, hi).
  */
  static uniform (lo, hi) {
    if (typeof lo === 'number' && typeof hi === 'number') {
      if (isInteger(lo) && isInteger(hi)) {
        return getRandomInt(lo, hi)
      } else {
        return Math.random() * (hi - lo) + lo
      }
    } else if (isInteger(lo)) {
      return getRandomInt(0, lo)
    }

    /* NOTE: the book uses a signature like `uniform(0.0, 1.0)`
     * to generate real or double numbers from [0, 1),
     * in case you want create the same behaviour, then do
     * `uniform()` and this will make the function to get to this
     * returning value. In case you want to generate values from [0.0, 5.0)
     * then I would recommend to do `uniform(0, 4.999)`.
     */
    return Math.random()
  }

  /**
   * Bernoulli
   * @desc Returns a random boolean from a Bernoulli
   * distribution with success probability 1/2.
   * @param {number} [p=0.5] The probability of returning `true`.
   * Defaults to `0.5`.
   * @returns {boolean} `true` or `false` with probability of 1/2
   */
  static bernoulli (p = 0.5) {
    return StdRandom.uniform() < p
  }

  /**
   * @todo implementation
   */
  static gaussian () {
    throw new SyntaxError('method gaussian not implemented')
  }

  /**
   * Discrete
   * @desc Returns a random integer from the specified discrete distribution.
   * @param {[]} a Array of non-negative numbers that sum 1.
   * @returns {number} A random integer from a discrete distribution:
   * `i` with probability proportional to `frequencies[i]`.
   */
  static discrete (a) {
    const r = StdRandom.uniform()
    let sum = 0

    for (let i = 0; i < a.length; i++) {
      sum += a[i]
      if (sum >= r) return i
    }

    return -1
  }

  /**
   * Shuffle
   * @desc Rearranges the elements of the specified array in uniformly random order.
   * @param {[]} a The array to shuffle
   */
  static shuffle (a) {
    const n = a.length

    for (let i = 0; i < n; i++) {
      // exchange a[i] with random element in a[i..n-1]
      const r = i + StdRandom.uniform(n - i)
      const temp = a[i]

      a[i] = a[r]
      a[r] = temp
    }
  }
}

export  { StdRandom };
