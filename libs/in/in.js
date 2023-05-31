// const path = require('path')
// const fs = require('fs')

import fs from 'fs';
import path from 'path';

/**
 * Parses a line to Integer.
 * @param {string} line String representing a number
 * @returns {number} The integer number
 */
const toInt = (line) => parseInt(line, 10)

/**
 * In
 * @classdesc JavaScript implementation of In.
 * @see {@link https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/In.java.html}
 */
class In {
  /**
   * Constructs a new File reader.
   * @param {string} fileName The name of the file to read from.
   */
  constructor (fileName) {
    this.fileName = path.resolve(fileName)
    this.content = fs.readFileSync(this.fileName, 'utf8').toString().trim()
  }

  /**
   * Returns if the In is empty.
   */
  isEmpty () {
    return this.content.length === 0
  }

  /**
   * Parse the file's content and array of strings separated bt new lines and whitespaces
   * @returns{array} array of string
   */
  readAllString() {
    let words;
    if (!this._isArrayOfStrings) {
      words = this.content.split(/[\n\r\s]/)
      this._isArrayOfStrings = true
    }

    if (this.isEmpty()) throw new ReferenceError(`stream ${this.fileName} is empty`)

    return words;
  }



  /**
   * Parses the file's content to and
   * array of strings separated by new lines and whitespace,
   * then, it returns the first element of the array.
   */
  readString () {
    if (!this._isArrayOfStrings) {
      this.content = this.content.split(/[\n\r\s]*/)
      this._isArrayOfStrings = true
    }

    if (this.isEmpty()) throw new ReferenceError(`stream ${this.fileName} is empty`)

    const string = this.content.shift()

    return string
  }

  /**
   * 
   * @returns Returns the raw content of a file
   */
  readRawString() {
    return this.content;
  }

  /**
   * Parses the file's contents to Integers
   * @returns {[number]} The array of parsed integers.
   */
  readAllInts () {
    return this.content.split('\n').map(toInt)
  }
}

export {In}
