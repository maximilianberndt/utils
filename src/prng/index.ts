// Seed generating function from string
// From https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions
function xmur3(str = '') {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
    (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
      (h = (h << 13) | (h >>> 19))
  return function () {
    ;(h = Math.imul(h ^ (h >>> 16), 2246822507)),
      (h = Math.imul(h ^ (h >>> 13), 3266489909))
    return (h ^= h >>> 16) >>> 0
  }
}

// Generate random number based on seed
// From https://stackoverflow.com/a/47593316
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    var t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/*
    Generate a pseudo random number between 0 and 1 based on a seed

    #Usage:
    const generator = prng("Your seed")
    console.log(generator()) //0.093 <-- will be same for every time the seed is called 
*/
export const prng = (seed = `${Date.now()}`) =>
  mulberry32(xmur3(seed)())
