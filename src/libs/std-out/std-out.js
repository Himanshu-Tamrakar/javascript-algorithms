
import { format } from 'util'

/**
 * StdOut
 * @classdesc JavaScript implementation of StdOut.
 * @see {@link https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/StdOut.java.html}
 */
class StdOut {
  /**
   * Prints formatted data in the `stdout`.
   * @see {@link https://nodejs.org/docs/latest-v12.x/api/util.html#util_util_format_format_args}
   * @param {*} any
   */
  static printf () {
    process.stdout.write(format(...arguments))
  }

  /**
   * Prints formatted data with a new line in the `stdout`.
   * @param {*} any
   */
  static println () {
    console.log(...arguments)
  }
}

export {StdOut}
