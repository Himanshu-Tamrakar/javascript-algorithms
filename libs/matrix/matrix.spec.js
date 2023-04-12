const Matrix = require('./matrix')

describe('Matrix Library - Unit Tests', () => {
  describe('dot', () => {
    it('should return the vector dot product of two vectors', () => {
      const v1 = [9, 2, 7]
      const v2 = [4, 8, 10]
      const expected = 122

      const result = Matrix.dot(v1, v2)

      expect(result).toBe(expected)
    })
  })

  describe('transpose', () => {
    it('should transpose a matrix', () => {
      const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const expected = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

      const result = Matrix.transpose(m)

      expect(result).toEqual(expected)
    })
  })

  describe('multMatrixMatrix', () => {
    it('should return the product of two matrix', () => {
      const m1 = [[0, 4, -2], [-4, -3, 0]]
      const m2 = [[0, 1], [1, -1], [2, 3]]
      const expected = [[0, -10], [-3, -1]]

      const result = Matrix.multMatrixMatrix(m1, m2)

      expect(result).toEqual(expected)
    })
  })

  describe('multMatrixVector', () => {
    it('should return the product of a matrix and a vector', () => {
      const m = [[1, -1, 2], [0, -3, 1]]
      const v = [2, 1, 0]
      const expected = [1, -3]

      const result = Matrix.multMatrixVector(m, v)

      expect(result).toEqual(expected)
    })
  })

  describe('multVectorMatrix', () => {
    it('should return the product of a vector and a matrix', () => {
      const v = [2, 1, 3]
      const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const expected = [13, 31, 49]

      const result = Matrix.multVectorMatrix(v, m)

      expect(result).toEqual(expected)
    })
  })
})
