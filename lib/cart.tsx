'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { byHandle, findVariant, type Product, type Variant } from './products'

export interface CartItem {
  handle: string
  variantId: number
  qty: number
}

export interface CartLine extends CartItem {
  product: Product
  variant: Variant
  lineTotal: number
}

interface CartContextValue {
  items: CartItem[]
  lines: CartLine[]
  count: number
  subtotal: number
  hydrated: boolean
  addItem: (handle: string, variantId: number, qty?: number) => void
  removeItem: (variantId: number) => void
  setQty: (variantId: number, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'exotics-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        // Drop anything that no longer resolves to a real product/variant.
        setItems(
          parsed.filter((i) => {
            const p = byHandle(i.handle)
            return p && findVariant(p, i.variantId) && i.qty > 0
          })
        )
      }
    } catch {
      // corrupted storage — start fresh
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((handle: string, variantId: number, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === variantId)
      if (existing) {
        return prev.map((i) =>
          i.variantId === variantId ? { ...i, qty: Math.min(i.qty + qty, 99) } : i
        )
      }
      return [...prev, { handle, variantId, qty }]
    })
  }, [])

  const removeItem = useCallback((variantId: number) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId))
  }, [])

  const setQty = useCallback((variantId: number, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.variantId !== variantId)
        : prev.map((i) => (i.variantId === variantId ? { ...i, qty: Math.min(qty, 99) } : i))
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((item) => {
        const product = byHandle(item.handle)
        if (!product) return null
        const variant = findVariant(product, item.variantId)
        if (!variant) return null
        return { ...item, product, variant, lineTotal: variant.price * item.qty }
      })
      .filter(Boolean) as CartLine[]
  }, [items])

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines])
  const subtotal = useMemo(() => lines.reduce((n, l) => n + l.lineTotal, 0), [lines])

  const value = useMemo(
    () => ({ items, lines, count, subtotal, hydrated, addItem, removeItem, setQty, clear }),
    [items, lines, count, subtotal, hydrated, addItem, removeItem, setQty, clear]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
