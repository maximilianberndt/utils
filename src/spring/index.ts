interface Config {
  stiffness: number
  damping: number
  mass: number
}

interface Spring {
  update: () => void
  get: () => number
  set: (newTarget: number) => void
}

interface ArraySpring {
  update: Spring['update']
  set: Spring['set']
  get: () => number[]
}

const createDefaultSpring = (
  start = 0,
  { stiffness, damping, mass }: Config
): Spring => {
  let current = start
  let previous = start
  let target = start

  return {
    update: () => {
      const velocity = current - previous
      const acceleration =
        ((target - current) * stiffness - velocity * damping) / mass

      previous = current
      current += velocity + acceleration
    },
    get: () => current,
    set: (newTarget) => (target = newTarget),
  }
}

const createArraySpring = (
  start = [0],
  config: Config
): ArraySpring => {
  const springs = start.map((v) => createDefaultSpring(v, config))

  return {
    update: () => springs.forEach((spring) => spring.update()),
    get: () => springs.map((spring) => spring.get()),
    set: (newTarget = 1) =>
      springs.forEach((spring, i) => spring.set(newTarget[i])),
  }
}

export const createSpring = (
  start = 0,
  { stiffness = 0.1, damping = 0.8, mass = 1 } = {}
): (Spring | ArraySpring) & { config: Config } => {
  const spring = Array.isArray(start)
    ? createArraySpring(start, { stiffness, damping, mass })
    : createDefaultSpring(start, { stiffness, damping, mass })

  return {
    ...spring,
    config: { stiffness, damping, mass },
  }
}
