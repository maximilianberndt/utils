import { useEffect } from 'react'
import { addScrollCallback, type scrollCallback } from '../scroll'

export const useScroll = (callback: scrollCallback, deps = []) => {
  useEffect(() => addScrollCallback(callback), [...deps, callback])
}
