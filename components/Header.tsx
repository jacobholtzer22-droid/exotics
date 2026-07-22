'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/lib/cart'

const NAV = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Flower', href: '/shop?cat=flower' },
  { label: 'Drinks', href: '/shop?cat=drinks' },
  { label: 'Edibles', href: '/shop?cat=edibles' },
  { label: 'Apparel', href: '/shop?cat=apparel' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const { count, hydrated } = useCart()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled || open
          ? 'border-moss bg-ink/95 backdrop-blur'
          : 'border-transparent bg-gradient-to-b from-ink/90 to-transparent'
      }`}
    >
      <div
        className={`container-page flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
      >
        <Link
          href="/"
          className="font-display text-xl font-extrabold uppercase tracking-widest text-bone"
        >
          Exo<span className="text-bud">tics</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-display text-[13px] font-semibold uppercase tracking-wider text-smoke transition hover:text-bud"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-bud transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-moss text-bone transition hover:border-bud hover:text-bud active:scale-95"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {hydrated && count > 0 && (
                <motion.span
                  key={count}
                  initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                  className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-bud px-1 font-display text-[11px] font-bold text-ink"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-moss text-bone transition active:scale-95 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-moss bg-ink lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="px-4 pb-6 pt-3">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-3 font-display text-sm font-semibold uppercase tracking-wider text-bone transition hover:bg-panel hover:text-bud"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
