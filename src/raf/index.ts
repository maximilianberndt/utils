type RafCallback = (t: number, deltaTime: number) => any

let rafId = 0
let now = 0
let renderQueue: RafCallback[] = []

const tick = (t = 0): void => {
  rafId = requestAnimationFrame(tick)

  let deltaTime = t - now
  now = t

  // When leaving the window and switching back after a while
  // t gets really big and causes a big jump in the delta time
  if (deltaTime > 500) deltaTime = 30

  renderQueue.forEach((callback) => callback(t, deltaTime))
}

const startRaf = (): void => {
  now = performance.now()
  tick()
}

const stopRaf = (): void => {
  cancelAnimationFrame(rafId)
}

const remove = (callback: RafCallback): void => {
  renderQueue = renderQueue.filter((c) => c !== callback)
  !renderQueue.length && stopRaf()
}

const raf = (callback: RafCallback): (() => void) => {
  if (!renderQueue.length) startRaf()
  renderQueue.push(callback)

  // Return remove function for easier destroy
  return () => remove(callback)
}
