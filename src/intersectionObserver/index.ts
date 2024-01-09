const intersectionObserver = ({
  el,
  onEnter,
  onLeave,
  once = false,
  options = {},
}: {
  el: HTMLElement
  onEnter?: () => void
  onLeave?: () => void
  once?: boolean
  options?: {
    threshold?: number | number[]
    rootMargin?: string
  }
}): IntersectionObserver => {
  // Triggers every time an intersection happens
  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ): void => {
    if (entries[0].isIntersecting) {
      // Element comes into the viewport
      if (onEnter) onEnter()
      if (once) observer.unobserve(el)
    } else {
      // Element leaves the viewport
      if (onLeave) onLeave()
    }
  }

  const observer = new IntersectionObserver(callback, {
    threshold: 0,
    ...options,
  })

  observer.observe(el)

  return observer
}

export default intersectionObserver
