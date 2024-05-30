export type scrollCallback = (progress: number) => void

let callbacks: scrollCallback[] = []

const globalOnScroll = () => {
  const y = window.scrollY
  callbacks.forEach((cb) => cb(y))
}

const start = () => {
  window.addEventListener('scroll', globalOnScroll)
}

const stop = () => {
  window.removeEventListener('scroll', globalOnScroll)
}

const addCallback = (callback: scrollCallback) => {
  if (!callbacks.length) start()
  callbacks.push(callback)

  return () => {
    callbacks = callbacks.filter((cb) => cb !== callback)
    if (!callbacks.length) stop()
  }
}

export const onScroll = (callback: scrollCallback) => {
  const removeCallback = addCallback(callback)

  return () => removeCallback()
}
