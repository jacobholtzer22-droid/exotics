'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import {
  CATEGORY_LABELS,
  formatPrice,
  type Product,
  type Variant,
} from '@/lib/products'
import { site } from '@/lib/site'

function variantMatches(v: Variant, sel: (string | null)[]): boolean {
  return (
    (sel[0] === null || v.option1 === sel[0]) &&
    (sel[1] === null || v.option2 === sel[1]) &&
    (sel[2] === null || v.option3 === sel[2])
  )
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart()
  const reduce = useReducedMotion()
  const [imageIdx, setImageIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  // Selected value per option position (option1/option2/option3).
  const [selection, setSelection] = useState<(string | null)[]>(() => {
    const first = product.variants.find((v) => v.available) ?? product.variants[0]
    return [first?.option1 ?? null, first?.option2 ?? null, first?.option3 ?? null]
  })

  const selectedVariant = useMemo(
    () => product.variants.find((v) => variantMatches(v, selection)),
    [product.variants, selection]
  )

  /** Values available for an option position given the selections BEFORE it. */
  function validValues(position: number): string[] {
    const prior = selection.map((s, i) => (i < position ? s : null))
    const seen = new Set<string>()
    for (const v of product.variants) {
      if (variantMatches(v, prior)) {
        const val = [v.option1, v.option2, v.option3][position]
        if (val) seen.add(val)
      }
    }
    return Array.from(seen)
  }

  function selectValue(position: number, value: string) {
    const next = [...selection]
    next[position] = value
    // Fix any later selections that are no longer valid for this combination.
    for (let i = position + 1; i < 3; i++) {
      if (next[i] === null) continue
      const prior = next.map((s, j) => (j < i ? s : null))
      const valid = new Set(
        product.variants
          .filter((v) => variantMatches(v, prior))
          .map((v) => [v.option1, v.option2, v.option3][i])
          .filter(Boolean)
      )
      if (!valid.has(next[i])) next[i] = (valid.values().next().value as string) ?? null
    }
    setSelection(next)
  }

  function handleAdd() {
    if (!selectedVariant) return
    addItem(product.handle, selectedVariant.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const isFlower = product.category === 'flower'
  const price = selectedVariant ? selectedVariant.price * qty : null

  return (
    <section className="container-page pb-28 pt-10 sm:pt-14 lg:pb-14">
      <nav className="text-xs uppercase tracking-wider text-smoke" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-bud">
          Shop
        </Link>{' '}
        /{' '}
        <Link href={`/shop?cat=${product.category}`} className="hover:text-bud">
          {CATEGORY_LABELS[product.category]}
        </Link>{' '}
        / <span className="text-bone">{product.title}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="card-soft relative aspect-square overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {product.images[imageIdx] && (
                <motion.div
                  key={imageIdx}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <Image
                    src={product.images[imageIdx]}
                    alt={product.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-6"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setImageIdx(i)}
                  className={`card-soft relative h-20 w-20 overflow-hidden transition ${
                    i === imageIdx ? 'border-bud' : 'hover:border-bud/50'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow">{CATEGORY_LABELS[product.category]}</p>
          <h1 className="h-display mt-2 text-3xl text-bone sm:text-4xl">{product.title}</h1>

          {isFlower && product.thc !== null && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="stat-pill text-bud">THC {product.thc}%</span>
              <span className="stat-pill text-smoke">Delta-9 {product.delta9}%</span>
              {product.strainType && (
                <span className="stat-pill text-haze">{product.strainType}</span>
              )}
              <span className="stat-pill text-smoke">Farm Bill Compliant</span>
            </div>
          )}

          <p className="mt-5 font-display text-2xl font-bold text-bone">
            {selectedVariant ? formatPrice(selectedVariant.price) : '—'}
            {qty > 1 && price !== null && (
              <span className="ml-2 text-base font-semibold text-smoke">
                · {formatPrice(price)} total
              </span>
            )}
          </p>

          {/* Options */}
          {product.options.map((opt, position) => {
            const valid = validValues(position)
            return (
              <fieldset key={opt.name} className="mt-6">
                <legend className="font-display text-xs font-bold uppercase tracking-wider text-smoke">
                  {opt.name}
                </legend>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {opt.values.map((val) => {
                    const enabled = valid.includes(val)
                    const active = selection[position] === val
                    return (
                      <button
                        key={val}
                        type="button"
                        disabled={!enabled}
                        onClick={() => selectValue(position, val)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? 'border-bud bg-bud text-ink'
                            : enabled
                              ? 'border-moss text-bone hover:border-bud hover:text-bud'
                              : 'cursor-not-allowed border-moss/40 text-smoke/40'
                        }`}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )
          })}

          {/* Qty + Add */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-moss">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-bone transition hover:text-bud"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-display font-bold text-bone">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="flex h-12 w-12 items-center justify-center text-bone transition hover:text-bud"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!selectedVariant || !selectedVariant.available}
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:px-10"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {selectedVariant?.available === false ? 'Sold out' : 'Add to cart'}
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {added && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 text-sm text-bud"
              >
                {product.title} is in your cart.{' '}
                <Link href="/cart" className="underline underline-offset-4 hover:text-bud-glow">
                  View cart →
                </Link>
              </motion.p>
            )}
          </AnimatePresence>

          {isFlower && (
            <p className="mt-6 rounded-xl border border-moss bg-panel p-4 text-xs leading-relaxed text-smoke">
              {site.compliance.shippingNote} Restricted states:{' '}
              {site.restrictedStates.join(', ')}. {site.compliance.farmBill}
            </p>
          )}

          {/* Description */}
          {product.description.length > 0 && (
            <div className="mt-8 space-y-3 border-t border-moss pt-6">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-bone">
                About this {isFlower ? 'strain' : 'product'}
              </h2>
              {product.description.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-smoke">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky mobile buy bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-moss bg-ink/95 px-4 py-3 backdrop-blur lg:hidden"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-bold text-bone">{product.title}</p>
            <p className="text-sm font-semibold text-bud">
              {selectedVariant ? formatPrice(selectedVariant.price) : '—'}
              {selectedVariant?.title !== 'Default Title' && selectedVariant && (
                <span className="ml-1 text-xs font-normal text-smoke">
                  · {selectedVariant.option1}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedVariant || !selectedVariant.available}
            className="btn-primary px-6 py-2.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </section>
  )
}
