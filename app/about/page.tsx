import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Exotics is a cannabis-inspired, Michigan-based hemp and apparel company offering premium THCa products and streetwear from independent designers.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Exotics"
        title="Live an unapologetic hemp lifestyle"
        subtitle="Michigan-grown THCa, streetwear from independent designers, one brand."
      />

      <section className="container-page grid items-center gap-10 py-16 lg:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-smoke">
          {site.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p>
            Every harvest is meticulously curated for exceptional quality. We produce premium
            THCa hemp flower from Michigan&apos;s finest small-batch growers — pesticide-free
            flower sourced exclusively from local cultivators.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            '/images/products/gorilla-glue/0.webp',
            '/images/products/exotics-t-shirts/0.webp',
            '/images/products/swig-100mg/0.webp',
            '/images/products/rainbow-runtz/0.webp',
          ].map((src, i) => (
            <div
              key={src}
              className={`card-soft relative aspect-square overflow-hidden ${i % 2 === 1 ? 'translate-y-5' : ''}`}
            >
              <Image
                src={src}
                alt="Exotics products"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-moss bg-panel">
        <div className="container-page grid gap-8 py-16 sm:grid-cols-3">
          {[
            {
              title: 'Small-batch quality',
              text: 'Sourced exclusively from local Michigan cultivators and curated harvest by harvest.',
            },
            {
              title: 'Independent design',
              text: 'Our apparel features signature designs from emerging urban designers — no one theme, no one celebrity.',
            },
            {
              title: 'Community first',
              text: 'Built for the hemp community, from the streets up. No matter your identity, Exotics is for you.',
            },
          ].map((item) => (
            <div key={item.title} className="card-soft bg-ink p-6">
              <h2 className="font-display text-base font-bold text-bud">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-smoke">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 text-center">
        <h2 className="h-display text-3xl text-bone">Ready to try Exotics?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop?cat=flower" className="btn-primary">
            Shop Flower
          </Link>
          <Link href="/shop?cat=apparel" className="btn-outline">
            Shop Apparel
          </Link>
        </div>
      </section>
    </>
  )
}
