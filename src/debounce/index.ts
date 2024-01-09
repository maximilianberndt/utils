export const debounce = (fn: () => void, delayMS = 0) => {
  let dt
  return function () {
    const ctx = this
    const args = arguments
    clearTimeout(dt)

    dt = setTimeout(() => fn.apply(ctx, args), delayMS)
  }
}
