const clamp = (v: number, a = 0, z = 1): number =>
  Math.min(Math.max(v, a), z)

export default clamp
