import { smoothstep } from '../smoothstep'

export const smoothClamp = (x = 0, min = 0, max = 1) =>
  smoothstep(min, max, x) * (max - min) + min
