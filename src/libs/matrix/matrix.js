const { newArrayOf } = require('../../utils')

/**
 * Matrix
 * @classdesc Collection of Matrix & Vectors computations
 * @see {exercise: [1.1.33]}
 */
class Matrix {
  /**
   * Vector dot product.
   * @see {@link https://www.mathsisfun.com/algebra/vectors-dot-product.html}
   * @param {[]} x Vector `x`
   * @param {[]} y Vector `y`
   * @returns {number} Vector product
   */
  static dot (x, y) {
    const n = x.length
    let sum = 0

    for (let i = 0; i < n; i++) {
      sum += x[i] * y[i]
    }

    return sum
  }

  /**
   * Transpose
   * @see {exercise: [1.1.13]}
   * @param {[][]} m Matrix
   * @returns {[][]} Transposed matrix
   */
  static transpose (m) {
    const rows = m.length
    const cols = m[0].length
    const t = []

    for (let i = 0; i < cols; i++) {
      t[i] = []
      for (let j = 0; j < rows; j++) {
        t[i][j] = m[j][i]
      }
    }

    return t
  }

  /**
   * Matrix-Matrix product.
   * @param {[][]} a Matrix `a`
   * @param {[][]} b Matrix `b`
   * @returns {[][]} Matrix-Matrix product
   */
  static multMatrixMatrix (a, b) {
    const n = a.length
    const c = newArrayOf(n, 0)
    const t = this.transpose(b)

    for (let i = 0; i < n; i++) {
      c[i] = newArrayOf(n, 0)
      for (let j = 0; j < n; j++) {
        c[i][j] += this.dot(a[i], t[j])
      }
    }

    return c
  }

  /**
   * Matrix-Vector product.
   * @see {@link https://mathinsight.org/matrix_vector_multiplication}
   * @param {[][]} m Matrix `m`
   * @param {[]} v Vector `v`
   * @returns {[]} Matrix-Vector product
   */
  static multMatrixVector (m, v) {
    const n = m.length
    const c = []

    for (let i = 0; i < n; i++) {
      c[i] = this.dot(m[i], v)
    }

    return c
  }

  /**
   * Vector-Matrix product.
   * @param {[]} v Vector `v`
   * @param {[][]} m Matrix `m`
   * @returns {[]} Vector-Matrix product
   */
  static multVectorMatrix (v, m) {
    return this.multMatrixVector(m, v)
  }
}

module.exports = Matrix
