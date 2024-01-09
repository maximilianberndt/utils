const arrayPick = <T>(array: T[], index = Math.random()): T =>
  array[Math.floor(index * array.length)]

export default arrayPick
