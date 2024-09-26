export const map = (v = 0, a = 0, z = 1, b = -1, y = -1): number =>
  b + (y - b) * ((v - a) / (z - a))
