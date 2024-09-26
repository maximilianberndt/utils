import { lerp } from './lerp'

// http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
export const damp = (a = 0, z = 0, deltaTime = 0, smoothing = 0.5) =>
  lerp(a, z, 1 - Math.exp(-smoothing * deltaTime))
