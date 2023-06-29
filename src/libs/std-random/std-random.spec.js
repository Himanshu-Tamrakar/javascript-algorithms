const StdRandom = require('./std-random')

describe('StRandom Library', () => {
  beforeEach(() => {
    this.iterations = 100
  })

  describe('static uniform method', () => {
    it('should return a real number between 0 and 1', () => {
      while (this.iterations--) {
        const result = StdRandom.uniform()

        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThan(1)
        expect(Number.isInteger(result)).toBeFalse('should be a real number')
      }
    })

    it('should return an integer between 0 and n-1', () => {
      const n = 5

      while (this.iterations--) {
        const result = StdRandom.uniform(n)

        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThan(n)
        expect(Number.isInteger(result)).toBeTrue('should be an integer number')
      }
    })

    it('should return an integer number between min and max - 1', () => {
      const min = 5
      const max = 10

      while (this.iterations--) {
        const result = StdRandom.uniform(min, max)

        expect(result).toBeGreaterThanOrEqual(min)
        expect(result).toBeLessThan(max)
        expect(Number.isInteger(result)).toBeTrue('should be an integer number')
      }
    })

    it('should return a real number between min and max - 1', () => {
      const min = 5.12345
      const max = 10.98765

      while (this.iterations--) {
        const result = StdRandom.uniform(min, max)

        expect(result).toBeGreaterThanOrEqual(min)
        expect(result).toBeLessThan(max)
        expect(Number.isInteger(result)).toBeFalse('should be a real number')
      }
    })
  })

  describe('static bernoulli method', () => {
    it('should return a boolean', () => {
      while (this.iterations--) {
        expect(StdRandom.bernoulli()).toBeInstanceOf(Boolean)
      }
    })

    it('should return more `true` than `false` when probability is higher', () => {
      let pTrue = 0
      let pFalse = 0

      while (this.iterations--) {
        StdRandom.bernoulli(0.9) ? pTrue++ : pFalse++
      }

      expect(pTrue).toBeGreaterThan(pFalse)
    })

    it('should return more `false` than `true` when probability is lower', () => {
      let pTrue = 0
      let pFalse = 0

      while (this.iterations--) {
        StdRandom.bernoulli(0.1) ? pTrue++ : pFalse++
      }

      expect(pTrue).toBeLessThan(pFalse)
    })
  })

  describe('static discrete method', () => {
    it('should return a random integer number between 0 and the array.length - 1', () => {
      const a = [0.1, 0.3, 0.0, 0.4, 0.1, 0.05, 0.05]
      const len = a.length

      while (this.iterations--) {
        const result = StdRandom.discrete(a)

        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThan(len)
        expect(Number.isInteger(result)).toBeTrue('should be an integer number.')
      }
    })
  })

  describe('static shuffle method', () => {
    it('should shuffle the array of numbers', () => {
      const original = [1, 2, 3, 4, 5]
      const copy = original.slice(0)
      const expectedSum = 15

      StdRandom.shuffle(original)

      const sum = original.reduce((acc, n) => (acc += n))
      expect(sum).toBe(expectedSum)
      expect(original).not.toEqual(copy)
    })
  })
})
