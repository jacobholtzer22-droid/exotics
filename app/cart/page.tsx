'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/products'
import { site } from '@/lib/site'

export default function CartPage() {
  const { lines, subtotal, hydrated, setQty, removeItem } = useCart()
  const reduce = useReducedMotion()

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="eyebrow">Your order</p>
      <h1 className="h-display mt-2 text-3xl text-bone sm:text-4xl">Cart</h1>

      {!hydrated ? (
        <div className="card-soft mt-8 p-10 text-center text-smoke">Loading your cart…</div>
      ) : lines.length === 0 ? (
        <div className="card-soft mt-8 flex flex-col items-center gap-4 p-12 text-center">
          <ShoppingBag className="h-10 w-10 text-smoke" />
          <p className="text-smoke">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.li
                key={line.variantId}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -32, transition: { duration: 0.2 } }}
                className="card-soft flex gap-4 p-4"
              >
                <Link
                  href={`/shop/${line.product.handle}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-soft"
                >
                  {line.product.images[0] && (
                    <Image
                      src={line.product.images[0]}
                      alt={line.product.title}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  )}
                </Link>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/shop/${line.product.handle}`}
                        className="font-display text-sm font-bold text-bone hover:text-bud"
                      >
                        {line.product.title}
                      </Link>
                      {line.variant.title !== 'Default Title' && (
                        <p className="mt-0.5 text-xs text-smoke">{line.variant.title}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.variantId)}
                      className="text-smoke transition hover:text-red-400"
                      aria-label={`Remove ${line.product.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-moss">
                      <button
                        type="button"
                        onClick={() => setQty(line.variantId, line.qty - 1)}
                        className="flex h-11 w-11 items-center justify-center text-bone transition hover:text-bud"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-bone">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(line.variantId, line.qty + 1)}
                        className="flex h-11 w-11 items-center justify-center text-bone transition hover:text-bud"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-display text-sm font-bold text-bone">
                      {formatPrice(line.lineTotal)}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
            </AnimatePresence>
          </ul>

          <aside className="card-soft h-fit p-6">
            <h2 className="font-display text-lg font-bold text-bone">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-smoke">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-bone">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-smoke">
                <dt>Shipping</dt>
                <dd>Calculated after order</dd>
              </div>
            </dl>
            <Link href="/checkout" className="btn-primary mt-6 w-full">
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-smoke">
              {site.checkout.paymentNote}
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}
