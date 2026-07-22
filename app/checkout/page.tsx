'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Lock } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/products'
import { site } from '@/lib/site'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
]

const THCA_CATEGORIES = new Set(['flower', 'drinks', 'edibles'])

export default function CheckoutPage() {
  const { lines, subtotal, hydrated, clear } = useCart()
  const reduce = useReducedMotion()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
    smsConsent: false,
    ageConfirm: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [orderRef, setOrderRef] = useState<string | null>(null)

  const hasThca = useMemo(
    () => lines.some((l) => THCA_CATEGORIES.has(l.product.category)),
    [lines]
  )
  const stateRestricted =
    hasThca && (site.restrictedStates as readonly string[]).includes(form.state)

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting || lines.length === 0 || stateRestricted) return
    setSubmitting(true)

    const ref = `EX-${Date.now().toString(36).toUpperCase()}`
    const orderText = [
      `ORDER REQUEST ${ref}`,
      ...lines.map(
        (l) =>
          `- ${l.product.title}${
            l.variant.title !== 'Default Title' ? ` (${l.variant.title})` : ''
          } x${l.qty} = ${formatPrice(l.lineTotal)}`
      ),
      `Subtotal: ${formatPrice(subtotal)}`,
      `Ship to: ${form.address}, ${form.city}, ${form.state} ${form.zip}`,
      form.notes ? `Notes: ${form.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    // Forward the order to the CRM when a business slug is configured.
    if (!site.crm.businessSlug.startsWith('REPLACE_ME')) {
      try {
        await fetch(site.crm.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,
            message: orderText,
            smsConsent: form.smsConsent,
            businessSlug: site.crm.businessSlug,
          }),
        })
      } catch {
        // Order still shows success; the team follows up from the confirmation flow.
      }
    }

    setOrderRef(ref)
    clear()
    setSubmitting(false)
    window.scrollTo({ top: 0 })
  }

  if (orderRef) {
    return (
      <div className="container-page py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="card-soft mx-auto max-w-xl p-10 text-center"
        >
          <motion.div
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.15 }}
          >
            <CheckCircle2 className="mx-auto h-12 w-12 text-bud" />
          </motion.div>
          <h1 className="h-display mt-5 text-3xl text-bone">Order received</h1>
          <p className="mt-2 font-display text-sm font-bold uppercase tracking-widest text-bud">
            Reference {orderRef}
          </p>
          <p className="mt-4 leading-relaxed text-smoke">
            Thanks for your order. {site.checkout.paymentNote}
          </p>
          <p className="mt-3 text-sm text-smoke">
            Questions? Call{' '}
            <a href={site.phoneHref} className="text-bud hover:underline">
              {site.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${site.emails.support}`} className="text-bud hover:underline">
              {site.emails.support}
            </a>
            .
          </p>
          <Link href="/shop" className="btn-primary mt-8">
            Keep shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="eyebrow">Almost there</p>
      <h1 className="h-display mt-2 text-3xl text-bone sm:text-4xl">Checkout</h1>

      {hydrated && lines.length === 0 ? (
        <div className="card-soft mt-8 flex flex-col items-center gap-4 p-12 text-center">
          <p className="text-smoke">Your cart is empty — add something first.</p>
          <Link href="/shop" className="btn-primary">
            Back to shop
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="card-soft p-6">
              <h2 className="font-display text-lg font-bold text-bone">Contact</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  className="field sm:col-span-2"
                  placeholder="Full name *"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  autoComplete="name"
                />
                <input
                  required
                  type="email"
                  className="field"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  autoComplete="email"
                />
                <input
                  required
                  type="tel"
                  className="field"
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="card-soft p-6">
              <h2 className="font-display text-lg font-bold text-bone">Shipping address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-6">
                <input
                  required
                  className="field sm:col-span-6"
                  placeholder="Street address *"
                  value={form.address}
                  onChange={(e) => set('address', e.target.value)}
                  autoComplete="street-address"
                />
                <input
                  required
                  className="field sm:col-span-3"
                  placeholder="City *"
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  autoComplete="address-level2"
                />
                <select
                  required
                  className="field sm:col-span-2"
                  value={form.state}
                  onChange={(e) => set('state', e.target.value)}
                  autoComplete="address-level1"
                  aria-label="State"
                >
                  <option value="">State *</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  required
                  className="field sm:col-span-1"
                  placeholder="ZIP *"
                  value={form.zip}
                  onChange={(e) => set('zip', e.target.value)}
                  autoComplete="postal-code"
                />
              </div>

              {stateRestricted && (
                <p className="mt-4 flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    We can&apos;t ship THCa products to {form.state}.{' '}
                    {site.compliance.shippingNote} Remove THCa items from your cart or choose
                    a different shipping state.
                  </span>
                </p>
              )}
            </div>

            <div className="card-soft p-6">
              <h2 className="font-display text-lg font-bold text-bone">Order notes</h2>
              <textarea
                className="field mt-4 min-h-24"
                placeholder="Anything we should know? (optional)"
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
              <label className="mt-4 flex items-start gap-3 text-sm text-smoke">
                <input
                  type="checkbox"
                  required
                  checked={form.ageConfirm}
                  onChange={(e) => set('ageConfirm', e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#2E7A3C]"
                />
                <span>I confirm I am 21 years of age or older. *</span>
              </label>
              <label className="mt-3 flex items-start gap-3 text-sm text-smoke">
                <input
                  type="checkbox"
                  checked={form.smsConsent}
                  onChange={(e) => set('smsConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#2E7A3C]"
                />
                <span>
                  It&apos;s okay to text me about my order (order updates and payment
                  instructions).
                </span>
              </label>
            </div>
          </div>

          <aside className="card-soft h-fit p-6">
            <h2 className="font-display text-lg font-bold text-bone">Your order</h2>
            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li key={line.variantId} className="flex items-center gap-3 text-sm">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ink-soft">
                    {line.product.images[0] && (
                      <Image
                        src={line.product.images[0]}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    )}
                  </span>
                  <span className="flex-1 text-smoke">
                    <span className="font-semibold text-bone">{line.product.title}</span>
                    {line.variant.title !== 'Default Title' && <> · {line.variant.title}</>} ×
                    {line.qty}
                  </span>
                  <span className="font-semibold text-bone">
                    {formatPrice(line.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between border-t border-moss pt-4 text-sm">
              <span className="text-smoke">Subtotal</span>
              <span className="font-display text-lg font-bold text-bone">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              type="submit"
              disabled={submitting || stateRestricted || lines.length === 0}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? 'Placing order…' : 'Place order request'}
            </button>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-smoke">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {site.checkout.paymentNote}
            </p>
          </aside>
        </form>
      )}
    </div>
  )
}
