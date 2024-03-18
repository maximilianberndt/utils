//https://www.youtube.com/watch?v=hvAFXU9gNcI&ab_channel=ZuluboProductions
// Random number that more likely returns the medium of the standard deviation to more closely mimic a natural randomness
const getRandomGaussian = (standardDeviation = 1) => {
  const v1 = Math.random()
  const v2 = Math.random()

  const randomStandardNormal =
    Math.sqrt(-2 * Math.log10(v1)) * Math.sin(2 * Math.PI * v2)
  return randomStandardNormal * standardDeviation
}

export const randomGaussian = (standardDeviation = 1) => {
  const randomNumber = getRandomGaussian(standardDeviation)

  return Math.abs(randomNumber) > standardDeviation
    ? randomGaussian(standardDeviation)
    : randomNumber
}
