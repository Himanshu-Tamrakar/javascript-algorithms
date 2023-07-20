// const assert = require('assert')
// const readline = require('readline')
import assert from 'assert';
import readline from 'readline';
import fs from 'fs';

let reader = null
let fileReader = null;

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
  static read() {
    if (reader === null) {
      reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'OHAI> '
      })

      reader.on('close', () => {
        console.log('Stdin Reader Closed!');
        process.exit(0);
      })
    }
    return reader
  }

  static readFileAsStream(filepath) {
    const fileStream = fs.createReadStream(filepath);
    const fileReader = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    fileReader.on('close', () => {
      console.log('File Reader Closed!');
      process.exit(0);
    });
    return fileReader;
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

export {StdIn}
// module.exports = StdIn
