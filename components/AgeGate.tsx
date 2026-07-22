'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '@/lib/site'

const STORAGE_KEY = 'exotics-age-verified'

export default function AgeGate() {
  const [status, setStatus] = useState<'pending' | 'allowed' | 'denied' | 'hidden'>('hidden')
  const reduce = useReducedMotion()

  useEffect(() => {
    const ok = localStorage.getItem(STORAGE_KEY) === '1'
    setStatus(ok ? 'allowed' : 'pending')
  }, [])

  useEffect(() => {
    if (status === 'pending' || status === 'denied') {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [status])

  if (status === 'allowed' || status === 'hidden') return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="card-soft w-full max-w-md p-8 text-center"
      >
        <p className="font-display text-3xl font-extrabold uppercase tracking-widest text-bone">
          Exo<span className="text-bud">tics</span>
        </p>

        {status === 'pending' ? (
          <>
            <h2 id="age-gate-title" className="h-display mt-6 text-2xl text-bone">
              Are you 21 or older?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-smoke">
              {site.compliance.ageNotice} By entering, you confirm you are of legal age in
              your state.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  localStorage.setItem(STORAGE_KEY, '1')
                  setStatus('allowed')
                }}
              >
                Yes, I&apos;m 21+
              </button>
              <button type="button" className="btn-outline" onClick={() => setStatus('denied')}>
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="h-display mt-6 text-2xl text-bone">
              Sorry, come back later
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-smoke">
              You must be 21 or older to browse this site.
            </p>
            <button
              type="button"
              className="btn-outline mt-7 w-full"
              onClick={() => setStatus('pending')}
            >
              Go back
            </button>
          </>
        )}
      </motion.div>
    </div>
  )
}
