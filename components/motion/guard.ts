'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Fallback for JS-driven reveals: returns a class that force-finishes the fade
 * (CSS, independent of requestAnimationFrame) if the framer animation should have
 * completed by now but the element may still be hidden.
 *
 * - `mountDelay` ms after mount (short for above-the-fold, long backstop otherwise)
 * - 1.2s after the element enters the viewport (arm via `onViewportEnter`)
 *
 * In a healthy browser the framer animation finishes first and the class is a no-op.
 */
export function useRevealGuard(mountDelay: number) {
  const [forced, setForced] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const t = setTimeout(() => setForced(true), mountDelay)
    timers.current.push(t)
    return () => timers.current.forEach(clearTimeout)
  }, [mountDelay])

  const onViewportEnter = () => {
    timers.current.push(setTimeout(() => setForced(true), 1200))
  }

  return { guardClass: forced ? 'reveal-guard-now' : '', onViewportEnter }
}
