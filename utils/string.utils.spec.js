const stringUtils = require('./index')

describe('String Utils - Unit Tests', () => {
  describe('pad', () => {
    it('should add 5 white spaces to the left', () => {
      const expected = '     1.0'

      // length of string is 3
      const str = stringUtils.pad('1.0', 8)

      expect(str).toBe(expected)
    })

    it('should add 5 white spaces to the right', () => {
      const expected = '1.0     '

      // length of string is 3
      const str = stringUtils.pad('1.0', -8)

      expect(str).toBe(expected)
    })
  })
})
