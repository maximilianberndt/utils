interface WeightedItem<T> {
  item: T
  weight: number
}

interface WeightedList<T> {
  add(item: T, weight: number): void
  remove(item: T): void
  get(): T | null
}

const get = <T>(
  items: WeightedItem<T>[],
  totalWeight: number
): T | null => {
  if (!items.length) return null

  const randomWeight = Math.random() * totalWeight
  let cumulativeWeight = 0

  for (const weightedItem of items) {
    cumulativeWeight += weightedItem.weight
    if (randomWeight <= cumulativeWeight) {
      return weightedItem.item
    }
  }

  // When no item was found, return the last item
  return items[items.length - 1].item
}

export const weightedList = <T>(
  initialItems: WeightedItem<T>[] = []
): WeightedList<T> => {
  const items: WeightedItem<T>[] = []
  let totalWeight: number = 0

  const add = (item: T, weight: number): void => {
    if (!weight) return
    const _weight = Math.max(0, weight)

    items.push({ item, weight: _weight })
    totalWeight += _weight
  }

  const remove = (item: T): void => {
    const index = items.findIndex(
      (weightedItem) => weightedItem.item === item
    )

    if (index !== -1) {
      const removedItem = items.splice(index, 1)[0]
      totalWeight -= removedItem.weight
    }
  }

  // Add initial items to the list
  initialItems.forEach(({ item, weight }) => {
    add(item, weight)
  })

  return { add, remove, get: () => get(items, totalWeight) }
}
