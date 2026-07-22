import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'
import ProductCard from '@/components/ProductCard'
import { byHandle, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }))
}

export function generateMetadata({ params }: { params: { handle: string } }): Metadata {
  const product = byHandle(params.handle)
  if (!product) return {}
  const desc = product.description[0]?.slice(0, 155)
  return {
    title: product.title,
    description: desc || `Shop ${product.title} from Exotics.`,
  }
}

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = byHandle(params.handle)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.handle !== product.handle)
    .slice(0, 4)

  return (
    <>
      <ProductDetailClient product={product} />
      {related.length > 0 && (
        <section className="border-t border-moss bg-panel">
          <div className="container-page py-14">
            <h2 className="h-display text-2xl text-bone sm:text-3xl">You may also like</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
