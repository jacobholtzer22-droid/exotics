'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  products,
  type Category,
} from '@/lib/products'

type Tab = Category | 'all'
type Sort = 'featured' | 'price-asc' | 'price-desc' | 'thc-desc' | 'az'

const SORTS: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'thc-desc', label: 'THC %: High to Low' },
  { value: 'az', label: 'A to Z' },
]

export default function ShopClient({ initialCategory }: { initialCategory: Category | null }) {
  const [tab, setTab] = useState<Tab>(initialCategory ?? 'all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('featured')
  const reduce = useReducedMotion()

  // Keep the tab in sync when the header links change ?cat= while already on /shop.
  useEffect(() => {
    setTab(initialCategory ?? 'all')
  }, [initialCategory])

  const filtered = useMemo(() => {
    let list = tab === 'all' ? products : products.filter((p) => p.category === tab)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.productType.toLowerCase().includes(q) ||
          (p.strainType ?? '').toLowerCase().includes(q)
      )
    }
    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.minPrice - b.minPrice)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.minPrice - a.minPrice)
        break
      case 'thc-desc':
        sorted.sort((a, b) => (b.thc ?? -1) - (a.thc ?? -1))
        break
      case 'az':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }
    return sorted
  }, [tab, query, sort])

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="eyebrow">The Exotics lineup</p>
      <h1 className="h-display mt-2 text-3xl text-bone sm:text-4xl">
        {tab === 'all' ? 'Shop everything' : CATEGORY_LABELS[tab]}
      </h1>
      <p className="mt-2 text-sm text-smoke">
        {filtered.length} product{filtered.length === 1 ? '' : 's'}
      </p>

      {/* Category tabs */}
      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
        {(['all', ...CATEGORY_ORDER] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition ${
              tab === t
                ? 'border-bud bg-bud text-ink'
                : 'border-moss text-smoke hover:border-bud hover:text-bud'
            }`}
          >
            {t === 'all' ? 'All' : CATEGORY_LABELS[t]}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search strains, gear, flavors…"
            className="field pl-11"
            aria-label="Search products"
          />
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="field sm:w-56"
          aria-label="Sort products"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div
          key={`${tab}-${sort}`}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.handle} product={p} priority={i < 4} />
          ))}
        </motion.div>
      ) : (
        <div className="card-soft mt-8 p-10 text-center text-smoke">
          No products match “{query}”. Try a different search.
        </div>
      )}
    </div>
  )
}
