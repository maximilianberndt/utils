export type Callback = (t: number, deltaTime: number) => any

let rafId = 0
let now = 0
let isRunning = false
let renderQueue: Callback[] = []

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
  isRunning = true
  now = performance.now()
  tick()
}

const stopRaf = (): void => {
  isRunning = false
  cancelAnimationFrame(rafId)
}

const remove = (callback: Callback): void => {
  renderQueue = renderQueue.filter((c) => c !== callback)

  isRunning && !renderQueue.length && stopRaf()
}

const add = (callback: Callback): void => {
  renderQueue.push(callback)

  // Start raf if it's not running yet
  !isRunning && startRaf()
}

const raf = { add, remove }

export default raf
