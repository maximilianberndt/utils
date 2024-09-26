import { RefObject, useCallback, useEffect, useRef } from 'react'
import { clamp } from '../clamp'
import { inverseLerp } from '../inverseLerp'
import { type scrollCallback } from '../scroll'
import { useScroll } from './useScroll'

type ScrollPositionReference = 'top' | 'center' | 'bottom'

type Options = {
  onScroll: scrollCallback
  start: ScrollPositionReference // Wrapper top hits either top, bottom or center of viewport
  end: ScrollPositionReference // Wrapper bottom hits either top, bottom or center of viewport
}

const getOffset = (offset: ScrollPositionReference): number => {
  const amount = {
    top: 0,
    center: 0.5,
    bottom: 1,
  }[offset]

  return window.innerHeight * amount
}

/*
 *  Returns scroll progress of an element from 0-1
 */
export const useScrollProgress = ({
  onScroll,
  start = 'bottom',
  end = 'top',
}: Partial<Options> = {}): RefObject<HTMLDivElement> => {
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const ref = useRef<HTMLDivElement>(null)
  const cache = useRef<{
    start: number
    end: number
    lastProgress: number
  }>({
    start: 100,
    end: 200,
    lastProgress: 0,
  })

  // Calculate scroll start and end values
  useEffect(() => {
    const wrapper = ref.current
    if (!wrapper) return

    const bounds = wrapper.getBoundingClientRect()
    const scrollStart = window.scrollY + bounds.top

    cache.current.start = clamp(
      scrollStart - getOffset(start),
      0,
      Infinity
    )
    cache.current.end = scrollStart + bounds.height - getOffset(end)
  }, [windowHeight, windowWidth, ref, start, end])

  const calcScrollProgress = useCallback<scrollCallback>(
    (y: number) => {
      if (!cache.current) return
      const { start, end, lastProgress } = cache.current
      const progress = inverseLerp(start, end, y)

      // Comparing to last progress ensures 0 and 1 progress are always fired
      // to properly put the animation on the first or last frame
      if (lastProgress <= 1 && lastProgress > 0 && onScroll) {
        const clampedProgress = clamp(progress)

        if (onScroll) onScroll(clampedProgress)
      }

      cache.current.lastProgress = progress
    },
    [cache, onScroll]
  )

  useScroll(calcScrollProgress)

  return ref
}
