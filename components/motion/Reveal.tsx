'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRevealGuard } from './guard'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  className,
}: {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const { guardClass, onViewportEnter } = useRevealGuard(8000)
  const { x, y } = OFFSET[direction]

  return (
    <motion.div
      className={[guardClass, className].filter(Boolean).join(' ') || undefined}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      onViewportEnter={onViewportEnter}
      transition={{ duration, delay, ease: [0.21, 0.65, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
