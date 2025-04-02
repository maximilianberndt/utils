export interface Inertia {
  update: (deltaTime: number) => void
  add: (delta: number) => void
  jump: (value: number) => void
  get: () => number
  setFriction: (friction: number) => void
}


export const inertia = ({ start = 0, friction = 0.97 }): Inertia => {
  const data = {
    value: start,
    velocity: 0,
    friction,
  }

  // Update every frame
  const update = (dt = 1 / 60) => {
    const timeAdjust = dt * 60
    const frameFriction = Math.pow(data.friction, timeAdjust)

    data.velocity *= frameFriction
    data.value += data.velocity * timeAdjust
  }

  // Directly update the current value and set velocity to 0
  const jump = (v = 0) => {
    data.value = v
    data.velocity = 0
  }

  return {
    update,
    get: () => data.value,
    jump,
    add: (delta = 0) => {
      data.velocity += delta
    },
    setFriction: (friction = 0.97) => {
      data.friction = friction
    },
  }
}
