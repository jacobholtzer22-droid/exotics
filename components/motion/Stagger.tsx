'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { createContext, useContext, type ReactNode } from 'react'
import { useRevealGuard } from './guard'

/** Whether the nearest Stagger parent animates on mount (above-the-fold). */
const OnMountContext = createContext(false)

export function Stagger({
  children,
  className,
  gap = 0.06,
  onMount = false,
}: {
  children: ReactNode
  className?: string
  gap?: number
  /** Animate immediately on mount (for above-the-fold content) instead of on scroll. */
  onMount?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <OnMountContext.Provider value={onMount}>
      <motion.div
        className={className}
        initial={reduce ? false : 'hidden'}
        {...(onMount
          ? { animate: 'show' }
          : { whileInView: 'show', viewport: { once: true, margin: '-60px' } })}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: gap } },
        }}
      >
        {children}
      </motion.div>
    </OnMountContext.Provider>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const onMount = useContext(OnMountContext)
  // Above-the-fold items must never be stuck hidden — force-finish 2s after mount.
  // Scroll-revealed items get a long backstop plus a viewport-entry timer.
  const { guardClass, onViewportEnter } = useRevealGuard(onMount ? 2000 : 8000)

  return (
    <motion.div
      className={[guardClass, className].filter(Boolean).join(' ') || undefined}
      onViewportEnter={onMount ? undefined : onViewportEnter}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 0.65, 0.32, 0.98] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
