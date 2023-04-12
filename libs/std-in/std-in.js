const assert = require('assert')
const readline = require('readline')

let reader = null

/**
 * StdIn
 * @classdesc JavaScript implementation of StdIn.
 * @see {@link https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/StdIn.java.html}
 */
class StdIn {
  /**
   * Returns a new Object with a Readline Interface as prototype.
   * @see {@link https://nodejs.org/api/readline.html}
   * @returns {EventEmitter} The reader interface.
   */
  static read () {
    if (reader === null) {
      reader = Object.create(readline.createInterface({
        input: process.stdin
      }))
    }

    return reader
  }

  /**
   * Parses a string line to a integer number.
   * @param {string} The string representing a number.
   * @returns {number} The parsed number to integer.
   */
  static readInt (line) {
    assert(typeof line === 'string', 'line should be a string')
    return parseInt(line, 10)
  }
}

module.exports = StdIn
