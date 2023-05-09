function arrayToString (a) {
  return JSON.stringify(a)
}

function isMatrix (m) {
  if (Array.isArray(m) && m.length > 0) {
    return m.every(row => isVector(row))
  }
  return false
}

function isVector (v) {
  if (Array.isArray(v) && v.length > 0) {
    return v.every(n => !Array.isArray(n))
  }
  return false
}

/**
 * Returns an array of length `n` filled with the values
 * provided as `data` or computed if `data` is a function.
 * @param {number} n
 * @param {*|function} data `data` can be any literal value,
 * _all the array will be filled with the same value_,
 * or a function with signature `(number i)` that will compute
 * a value based on the index `i` which is `i >= 0 && i < n`.
 * @example <caption>Array of length 10 initialized to 0</caption>
 * newArrayOf(10, 0) // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
 * @example <caption>Array of length `n` with random values from 0 to `n`</caption>
 * const n = 10
 * newArrayOf(n, () => StdRandom.uniform(n)) // [0, 3, 9, 2, 2, 8, 4, 2, 4, 7]
 * @example <caption>Array of random doubles from [0, 1)</caption>
 * newArrayOf(3, () => StdRandom.uniform(0, 0.999)) // [0.712488850522207, 0.9280585621957204, 0.8184198432124032]
 * newArrayOf(3, () => StdRandom.uniform()) // this is equivalent
 * @example <caption>Array with numbers from 0 to 9</caption>
 * newArrayOf(10, i => i) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @example <caption>Array of even numbers</caption>
 * newArrayOf(5, i => (i + 1) * 2) // [2, 4, 6, 8, 10]
 */
function newArrayOf (n, data) {
  const a = []

  if (typeof data === 'function') {
    for (let i = 0; i < n; i++) {
      a[i] = data(i)
    }
  } else {
    for (let i = 0; i < n; i++) {
      a[i] = data
    }
  }

  return a
}

const numbersByAscendingOrder = (a, b) => a - b

export {
  arrayToString,
  isMatrix,
  isVector,
  newArrayOf,
  numbersByAscendingOrder
}
