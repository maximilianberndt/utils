import clamp from '../clamp'

// http://en.wikipedia.org/wiki/Smoothstep - Variations
const smootherstep = (x = 0, min = 0, max = 1) => {
  // Scale, and clamp x to 0..1 range
  x = clamp((x - min) / (max - min), 0.0, 1.0)

  return x * x * x * (x * (x * 6 - 15) + 10)
}

export default smootherstep
