import Image from 'next/image'
import Link from 'next/link'
import { CATEGORY_LABELS, priceLabel, type Product } from '@/lib/products'

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const isFlower = product.category === 'flower'

  return (
    <Link
      href={`/shop/${product.handle}`}
      className="card-soft card-lift group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-soft">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-smoke">Exotics</div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-bud">
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base font-bold leading-snug text-bone group-hover:text-bud">
          {product.title}
        </h3>

        {isFlower && product.thc !== null && (
          <div className="flex flex-wrap gap-1.5">
            <span className="stat-pill text-bud">THC {product.thc}%</span>
            <span className="stat-pill text-smoke">Δ9 {product.delta9}%</span>
            {product.strainType && (
              <span className="stat-pill text-haze">{product.strainType}</span>
            )}
          </div>
        )}

        <p className="mt-auto pt-1 text-sm font-semibold text-bone/90">{priceLabel(product)}</p>
      </div>
    </Link>
  )
}
