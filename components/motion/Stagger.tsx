'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

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
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
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
