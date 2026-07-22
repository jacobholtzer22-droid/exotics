import type { Metadata } from 'next'
import ShopClient from './ShopClient'
import { CATEGORY_ORDER, type Category } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop All',
  description:
    'Shop premium Michigan-grown THCa flower, fast-acting drinks, gummies, streetwear, and accessories from Exotics.',
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: { cat?: string }
}) {
  const cat = CATEGORY_ORDER.includes(searchParams.cat as Category)
    ? (searchParams.cat as Category)
    : null

  return <ShopClient initialCategory={cat} />
}
