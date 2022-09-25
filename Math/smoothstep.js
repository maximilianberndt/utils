import { clamp } from "./clamp";

// http://en.wikipedia.org/wiki/Smoothstep
export const smoothstep = (x = 0, min = 0, max = 1) => {
  x = clamp((x - min) / (max - min), 0.0, 1.0);

  return x * x * (3 - 2 * x);
};
