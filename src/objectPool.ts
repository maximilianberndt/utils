type ObjectPool<T> = {
  getNext: () => T
  get: () => T[]
}

export const objectPool = <T>(data: T[] = []): ObjectPool<T> => {
  let current = 0

  const updateCurrent = () => {
    current++
    if (current === data.length) current = 0
  }

  const getNext = () => {
    const d = data[current]

    updateCurrent()

    return d
  }

  return {
    getNext,
    get: () => data,
  }
}
