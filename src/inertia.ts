export interface Inertia {
  update: () => void
  add: (delta: number) => void
  get: () => number
  setFriction: (friction: number) => void
}

export const inertia = ({
  start = 0,
  friction = 0.97,
}: {
  start: number
  friction: number
}): Inertia => {
  const data = {
    value: start,
    velocity: 0,
    friction,
  }

  // Update every frame
  const update = () => {
    data.velocity *= data.friction
    data.value += data.velocity
  }

  return {
    update,
    get: () => data.value,
    add: (delta = 0) => {
      data.velocity += delta
    },
    setFriction: (friction) => {
      data.friction = friction
    },
  }
}
