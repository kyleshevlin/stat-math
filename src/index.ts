export function add(a: number, b: number) {
  return a + b
}

export function subtract(a: number, b: number) {
  return a - b
}

export function multiply(a: number, b: number) {
  return a * b
}

export function divide(a: number, b: number) {
  return a / b
}

export function mod(a: number, b: number) {
  return a % b
}

export function getSum(numbers: number[]) {
  return numbers.reduce(add, 0)
}

export function getProduct(numbers: number[]) {
  return numbers.reduce(multiply, 1)
}

/**
 * This is the arithmetic average of the values. It's generally what people
 * mean when they say "average"
 */
export function getMean(numbers: number[]): number {
  if (numbers.length === 0) return NaN

  return getSum(numbers) / numbers.length
}

/**
 * The geometric mean is the nth root of the product of n numbers. It's
 * useful for finding the average rate of growth.
 */
export function getGeometricMean(numbers: number[]): number {
  if (numbers.length === 0) return NaN
  if (numbers.some(number => number <= 0)) return NaN

  const product = getProduct(numbers)
  const n = numbers.length

  return product ** (1 / n)
}

/**
 * The harmonic mean is the reciprocal of the arithmetic mean of the
 * reciprocals of the numbers. An example where this is useful is for
 * rates or ratios, such as finding the average speed of a journey.
 */
export function getHarmonicMean(numbers: number[]): number {
  if (numbers.length === 0) return NaN
  if (numbers.some(number => number === 0)) return NaN

  const sum = numbers.reduce((acc, num) => acc + 1 / num, 0)
  const n = numbers.length

  return n / sum
}

/**
 * If some values in your dataset are more important than others, you can
 * assign them a weight and use this function to get an adjusted average.
 */
export function getWeightedMean(items: { value: number; weight: number }[]) {
  if (items.length === 0) return NaN

  const weightedSum = getSum(items.map(item => item.value * item.weight))
  const totalWeight = getSum(items.map(item => item.weight))

  if (totalWeight === 0) return NaN

  return weightedSum / totalWeight
}

export function getMedian(numbers: number[]): number {
  if (numbers.length === 0) return NaN

  const sorted = numbers.toSorted((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2
}

export function getMode(numbers: number[]): number {
  if (numbers.length === 0) return NaN

  const distribution = getDistribution(numbers)

  const result = Object.keys(distribution).reduce(
    (a, b) => (distribution[a] > distribution[b] ? a : b),
    NaN
  )

  return Number(result)
}

export function getVariance(numbers: number[]) {
  const mean = getMean(numbers)
  const deviations = numbers.map(number => (number - mean) ** 2)
  const deviationsMean = getMean(deviations)

  return deviationsMean
}

export function getStandardDeviation(numbers: number[]) {
  return Math.sqrt(getVariance(numbers))
}

/**
 * A rounding function that allows you to specify how
 * many decimal places to return
 */
export function round(number: number, maxDecimals: number = 0) {
  if (maxDecimals === 0) return Math.round(number)

  return Math.round(number * 10 ** maxDecimals) / 10 ** maxDecimals
}

/**
 * Format the current number to a percentage string. Allows you to
 * specify how many decimal places to return
 */
export function asPercent(number: number, maxDecimals: number = 0) {
  return `${round(number * 100, maxDecimals)}%`
}

/**
 * Convert a percentage string back to a number. Inverse of `asPercent`
 */
export function fromPercent(percent: string) {
  return Number(percent.replace('%', '')) / 100
}

/**
 * Add a sign to the number if it's positive
 */
export function addSign(number: number) {
  return Math.sign(number) === 1 ? `+${number}` : `${number}`
}

/**
 * Remove the sign from the number
 */
export function removeSign(number: string) {
  return Number(number.replace('+', ''))
}

/**
 * Get the difference between the highest and lowest numbers
 */
export function getSpread(numbers: number[]) {
  if (numbers.length === 0) return NaN

  const min = Math.min(...numbers)
  const max = Math.max(...numbers)

  return max - min
}

/**
 * Get the distribution of the numbers. Numbers are the keys,
 * occurrences are the values
 */
export function getDistribution(numbers: number[]) {
  const distribution: Record<number, number> = {}

  if (numbers.length === 0) return distribution

  for (const number of numbers) {
    distribution[number] = (distribution[number] || 0) + 1
  }

  return distribution
}

/**
 * Returns an array of moving averages that evaluates a slice equal
 * to the window size over the dataset
 */
export function getTrend(numbers: number[], window: number) {
  const result: number[] = []

  if (window < 1) return result
  if (numbers.length < window) return result

  for (let i = 0; i < numbers.length - window + 1; i++) {
    const nums = numbers.slice(i, i + window)
    const mean = getMean(nums)
    result.push(mean)
  }

  return result
}

export function getQuartiles(numbers: number[]) {
  const result: Record<'q1' | 'q2' | 'q3', number> = {
    q1: NaN,
    q2: NaN,
    q3: NaN,
  }

  const sorted = numbers.toSorted((a, b) => a - b)
  const lowMid = Math.floor(sorted.length / 2)
  const highMid = Math.ceil(sorted.length / 2)
  result.q1 = getMedian(sorted.slice(0, lowMid))
  result.q2 = getMedian(sorted)
  result.q3 = getMedian(sorted.slice(highMid))

  return result
}

/**
 * A "z-score" is the measure of how many standard deviations away from 0
 * a value is.
 */
export function getZScores(numbers: number[]) {
  const mean = getMean(numbers)
  const stdDev = getStandardDeviation(numbers)

  return numbers.map(number => (number - mean) / stdDev)
}

/**
 * Returns the values whose z-score is greater than the threshold, both
 * positively and negatively
 */
export function getOutliersZScores(numbers: number[], threshold = 1) {
  const zScores = getZScores(numbers)

  return numbers.filter((_, idx) => Math.abs(zScores[idx]) > threshold)
}

/**
 * Removes the z-score outliers from the dataset, both positively and
 * negatively. Essentially the inverse of `getOutliersZScores`
 */
export function removeOutliersZScores(numbers: number[], threshold = 1) {
  const zScores = getZScores(numbers)

  return numbers.filter((_, idx) => Math.abs(zScores[idx]) <= threshold)
}

/**
 * Returns the skewness of the dataset, ie how much the distribution curve
 * favors one side or the other. Positive values mean the curve is skewed
 * right, negative values mean it's skewed left.
 */
export function getSkewness(numbers: number[]): number {
  const n = numbers.length
  if (n === 0) return NaN

  const mean = getMean(numbers)
  const stdDev = getStandardDeviation(numbers)
  const cubedDeviations = numbers.map(number => ((number - mean) / stdDev) ** 3)
  const result = (n / ((n - 1) * (n - 2))) * getSum(cubedDeviations)

  return result
}
