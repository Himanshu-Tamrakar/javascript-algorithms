const { create, all } = require('mathjs')

/**
 * @see {@link https://mathjs.org/examples/bignumbers.js.html}
 */
const math = create(all, {
  number: 'BigNumber',
  precision: 20
})

module.exports = math
