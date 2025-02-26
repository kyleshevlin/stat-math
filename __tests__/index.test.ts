import {
  add,
  addSign,
  asPercent,
  divide,
  fromPercent,
  getDistribution,
  getGeometricMean,
  getHarmonicMean,
  getMean,
  getMedian,
  getMode,
  getOutliersZScores,
  getProduct,
  getQuartiles,
  getSkewness,
  getSpread,
  getStandardDeviation,
  getSum,
  getTrend,
  getVariance,
  getWeightedMean,
  getZScores,
  mod,
  multiply,
  removeOutliersZScores,
  removeSign,
  round,
  subtract,
} from '../src/index'

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})

describe('subtract', () => {
  it('should subtract two numbers', () => {
    expect(subtract(1, 2)).toBe(-1)
  })
})

describe('multiply', () => {
  it('should multiply two numbers', () => {
    expect(multiply(1, 2)).toBe(2)
  })
})

describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(1, 2)).toBe(0.5)
  })
})

describe('mod', () => {
  it('should return the remainder of two numbers', () => {
    expect(mod(5, 3)).toBe(2)
  })
})

describe('sum', () => {
  it('should sum an array of numbers', () => {
    expect(getSum([1, 2, 3])).toBe(6)
  })

  it('empty array should return 0', () => {
    expect(getSum([])).toBe(0)
  })
})

describe('product', () => {
  it('should multiply an array of numbers', () => {
    expect(getProduct([1, 2, 3])).toBe(6)
  })

  it('empty array should return 1', () => {
    expect(getProduct([])).toBe(1)
  })
})

describe('getMean', () => {
  it('should calculate the mean of an array of numbers', () => {
    expect(getMean([1, 2, 3])).toBe(2)
  })

  it('should return NaN if the array is empty', () => {
    expect(getMean([])).toBe(NaN)
  })
})

describe('getGeometricMean', () => {
  it('should calculate the geometric mean of an array of numbers', () => {
    expect(round(getGeometricMean([1, 2, 3]), 4)).toBe(1.8171)
  })

  it('should return NaN if the array is empty', () => {
    expect(getGeometricMean([])).toBe(NaN)
  })

  it('should return NaN if the array contains negative numbers', () => {
    expect(getGeometricMean([1, 2, -3])).toBe(NaN)
  })
})

describe('getHarmonicMean', () => {
  it('should calculate the harmonic mean of an array of numbers', () => {
    expect(round(getHarmonicMean([1, 2, 3]), 4)).toBe(1.6364)
  })

  it('should return NaN if the array is empty', () => {
    expect(getHarmonicMean([])).toBe(NaN)
  })

  it('should return NaN if the array contains zero', () => {
    expect(getHarmonicMean([1, 2, 0])).toBe(NaN)
  })
})

describe('getWeightedMean', () => {
  it('should calculate the weighted mean of an array of numbers', () => {
    expect(
      round(
        getWeightedMean([
          { value: 1, weight: 1 },
          { value: 2, weight: 2 },
          { value: 3, weight: 3 },
        ]),
        4
      )
    ).toBe(round(14 / 6, 4))
  })

  it('should return NaN if the array is empty', () => {
    expect(getWeightedMean([])).toBe(NaN)
  })

  it('should return NaN if the total weight is 0', () => {
    expect(
      getWeightedMean([
        { value: 1, weight: 0 },
        { value: 2, weight: 0 },
        { value: 3, weight: 0 },
      ])
    ).toBe(NaN)
  })
})

describe('getMedian', () => {
  it('should calculate the median of an array of numbers', () => {
    expect(getMedian([1, 2, 3])).toBe(2)
  })

  it('should calculate the median of an array of numbers with an even number of elements', () => {
    expect(getMedian([1, 2, 3, 4])).toBe(2.5)
  })

  it('should return NaN if the array is empty', () => {
    expect(getMedian([])).toBe(NaN)
  })
})

describe('getMode', () => {
  it('should calculate the mode of an array of numbers', () => {
    expect(getMode([1, 2, 2, 3, 3, 3])).toBe(3)
  })

  it('should return NaN if the array is empty', () => {
    expect(getMode([])).toBe(NaN)
  })
})

describe('getVariance', () => {
  it('should calculate the variance of an array of numbers', () => {
    expect(getVariance([1, 2, 3])).toBe(0.6666666666666666)
  })

  it('should return NaN if the array is empty', () => {
    expect(getVariance([])).toBe(NaN)
  })
})

describe('getStandardDeviation', () => {
  it('should calculate the standard deviation of an array of numbers', () => {
    expect(round(getStandardDeviation([1, 2, 3]), 4)).toBe(0.8165)
  })

  it('should return NaN if the array is empty', () => {
    expect(getStandardDeviation([])).toBe(NaN)
  })
})

describe('round', () => {
  it('should round a number to the nearest integer', () => {
    expect(round(1.2345)).toBe(1)
    expect(round(1.5)).toBe(2)
  })

  it('should round a number to the nearest integer with a custom number of decimals', () => {
    expect(round(1.2345, 2)).toBe(1.23)
  })
})

describe('asPercent', () => {
  it('should convert a number to a percentage', () => {
    expect(asPercent(0.12345)).toBe('12%')
  })

  it('should round a number to a custom number of decimals', () => {
    expect(asPercent(0.12345, 2)).toBe('12.35%')
  })
})

describe('fromPercent', () => {
  it('should convert a percentage to a number', () => {
    expect(fromPercent('12%')).toBe(0.12)
    expect(fromPercent('12.34%')).toBe(0.1234)
  })

  it('should be roughly the inverse of asPercent', () => {
    const val = 0.1234
    expect(fromPercent(asPercent(val, 2))).toBe(val)
  })
})

describe('addSign', () => {
  it('should add a sign to a number', () => {
    expect(addSign(1)).toBe('+1')
    expect(addSign(-1)).toBe('-1')
  })
})

describe('removeSign', () => {
  it('should remove a sign from a number', () => {
    expect(removeSign('+1')).toBe(1)
    expect(removeSign('-1')).toBe(-1)
  })
})

describe('getSpread', () => {
  it('should calculate the spread of an array of numbers', () => {
    expect(getSpread([1, 2, 3])).toBe(2)
  })

  it('should return NaN if the array is empty', () => {
    expect(getSpread([])).toBe(NaN)
  })
})

describe('getDistribution', () => {
  it('should calculate the distribution of an array of numbers', () => {
    expect(getDistribution([1, 2, 2, 3, 3, 3])).toEqual({ 1: 1, 2: 2, 3: 3 })
  })

  it('should return an empty object if the array is empty', () => {
    expect(getDistribution([])).toEqual({})
  })
})

describe('getTrend', () => {
  it('should calculate the trend of an array of numbers', () => {
    expect(getTrend([1, 2, 3, 2], 2)).toEqual([1.5, 2.5, 2.5])
  })

  it('should return an empty array if window is less than 1', () => {
    expect(getTrend([1, 2, 3], 0)).toEqual([])
  })

  it('should return an empty array if numbers is empty', () => {
    expect(getTrend([], 2)).toEqual([])
  })

  it('should return an empty array if numbers length is less than window', () => {
    expect(getTrend([1, 2], 3)).toEqual([])
  })
})

describe('getQuartiles', () => {
  it('should calculate the quartiles of an array of numbers', () => {
    expect(getQuartiles([1, 2, 3, 4, 5])).toEqual({ q1: 1.5, q2: 3, q3: 4.5 })
  })

  it('should return NaN if the array is empty', () => {
    expect(getQuartiles([])).toEqual({ q1: NaN, q2: NaN, q3: NaN })
  })
})

describe('getZScores', () => {
  it('should calculate the z-scores of an array of numbers', () => {
    expect(getZScores([1, 2, 3]).map(n => round(n, 4))).toEqual([
      -1.2247, 0, 1.2247,
    ])
  })

  it('should return an empty array if the array is empty', () => {
    expect(getZScores([])).toEqual([])
  })
})

describe('getOutliersZScores', () => {
  it('should calculate the outliers of an array of numbers', () => {
    expect(getOutliersZScores([1, 2, 3, 4, 5])).toEqual([1, 5])
  })

  it('should return an empty array if the array is empty', () => {
    expect(getOutliersZScores([])).toEqual([])
  })
})

describe('removeOutliersZScores', () => {
  it('should remove the outliers of an array of numbers', () => {
    expect(removeOutliersZScores([1, 2, 3, 4, 5])).toEqual([2, 3, 4])
  })

  it('should return an empty array if the array is empty', () => {
    expect(removeOutliersZScores([])).toEqual([])
  })
})

describe('getSkewness', () => {
  it('should calculate the skewness of an array of numbers', () => {
    expect(getSkewness([1, 2, 3, 4, 5])).toBe(0)
    expect(getSkewness([1, 2, 3, 4, 5, 10, 20, 30])).toBeGreaterThan(0)
    expect(getSkewness([-30, -20, -10, 1, 2, 3, 4, 5])).toBeLessThan(0)
  })

  it('should return NaN if the array is empty', () => {
    expect(getSkewness([])).toBe(NaN)
  })
})
