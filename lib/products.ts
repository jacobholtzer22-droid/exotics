import catalogJson from './catalog.json'

export type Category = 'flower' | 'drinks' | 'edibles' | 'apparel' | 'accessories'

export interface Variant {
  id: number
  title: string
  price: number
  option1: string | null
  option2: string | null
  option3: string | null
  available: boolean
}

export interface Product {
  handle: string
  title: string
  category: Category
  productType: string
  description: string[]
  strainType: string | null
  thc: number | null
  delta9: number | null
  options: { name: string; values: string[] }[]
  variants: Variant[]
  images: string[]
  minPrice: number
  maxPrice: number
}

export const products = catalogJson as Product[]

export const CATEGORY_LABELS: Record<Category, string> = {
  flower: 'THCa Flower',
  drinks: 'Drinks',
  edibles: 'Edibles',
  apparel: 'Apparel',
  accessories: 'Accessories',
}

export const CATEGORY_ORDER: Category[] = [
  'flower',
  'drinks',
  'edibles',
  'apparel',
  'accessories',
]

export function byHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle)
}

export function byCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category)
}

export function findVariant(product: Product, variantId: number): Variant | undefined {
  return product.variants.find((v) => v.id === variantId)
}

const FEATURED_FLOWER = ['gorilla-glue', 'jet-fuel', 'sugar-plum', 'green-crack']
const FEATURED_GEAR = [
  'core-tees',
  'shoulder-backpack',
  'monkey-berries-tee-shirt',
  'rainbow-snapbacks',
]

export const featuredFlower = FEATURED_FLOWER.map(byHandle).filter(Boolean) as Product[]
export const featuredGear = FEATURED_GEAR.map(byHandle).filter(Boolean) as Product[]

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

/** "From $25" for multi-price products, exact price otherwise. */
export function priceLabel(product: Product): string {
  if (product.minPrice !== product.maxPrice) {
    return `From ${formatPrice(product.minPrice)}`
  }
  return formatPrice(product.minPrice)
}
