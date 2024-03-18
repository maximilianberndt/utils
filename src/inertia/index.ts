interface Inertia {
  update: () => void
  add: (delta: number) => void
  get: () => number
}

export const inertia = ({
  start = 0,
  friction = 0.97,
}: {
  start: number
  friction: number
}): Inertia => {
  let last = start
  let value = start
  let velocity = 0

  // Update every frame
  const update = () => {
    last = value

    velocity *= friction
    value += velocity
  }

  return {
    update,
    get: () => value,
    add: (delta = 0) => {
      velocity += delta
    },
  }
}
