import type { MetadataRoute } from 'next'
import { products } from '@/lib/products'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/shop',
    '/cart',
    '/about',
    '/contact',
    '/faq',
    '/lab-results',
    '/shipping-policy',
    '/refund-policy',
    '/privacy-policy',
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }))

  const productRoutes = products.map((p) => ({
    url: `${site.url}/shop/${p.handle}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...productRoutes]
}
