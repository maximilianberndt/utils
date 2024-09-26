import { useEffect } from 'react'
import { raf, type RafCallback } from '../raf'

export const useRaf = (callback: RafCallback, deps = []) => {
  useEffect(() => raf(callback), [callback, ...deps])
}
