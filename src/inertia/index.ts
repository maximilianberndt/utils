type Options = {
  start: number
  friction: number
}

interface Inertia {
  update: (acceleration?: number) => void
  get: () => number
  getDelta: () => number
}

export const inertia = ({
  start = 0,
  friction = 0.97,
}: Options): Inertia => {
  let last = start
  let value = start
  let velocity = 0

  const update = (acceleration = 0): void => {
    last = value

    velocity += acceleration
    velocity *= friction
    value += velocity
  }

  return {
    update,
    get: () => value,
    getDelta: () => value - last,
  }
}
