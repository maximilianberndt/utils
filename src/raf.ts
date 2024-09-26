export type RafCallback = (t: number, deltaTime: number) => any

let rafId = 0
let now = 0
let renderQueue: { callback: RafCallback; priority: number }[] = []

const tick = (t = 0) => {
  rafId = requestAnimationFrame(tick)

  let deltaTime = t - now
  now = t

  // When leaving the window and switching back after a while
  // t gets really big and causes a big jump in the delta time
  if (deltaTime > 500) deltaTime = 30

  renderQueue.forEach(({ callback }) => callback(t, deltaTime))
}

const startRaf = () => {
  now = performance.now()
  tick()
}

const remove = (callback: RafCallback) => {
  renderQueue = renderQueue.filter((c) => c.callback !== callback)
  if (!renderQueue.length) cancelAnimationFrame(rafId)
}

export const raf = (callback: RafCallback, priority = 0) => {
  if (!renderQueue.length) startRaf()
  renderQueue.push({ callback, priority })
  renderQueue.sort((a, b) => a.priority - b.priority)

  return () => remove(callback)
}
