import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, FlaskConical, Leaf, Truck } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import Reveal from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { byCategory, byHandle, featuredFlower, featuredGear } from '@/lib/products'
import { site } from '@/lib/site'

const FLOWER_COUNT = byCategory('flower').length

const CATEGORY_TILES = [
  {
    label: 'THCa Flower',
    href: '/shop?cat=flower',
    blurb: `${FLOWER_COUNT} small-batch strains, eighths to pounds`,
    image: '/images/products/rainbow-runtz/0.webp',
  },
  {
    label: 'Drinks',
    href: '/shop?cat=drinks',
    blurb: 'Swig fast-acting shots in 6 flavors',
    image: '/images/products/swig-emotional/0.webp',
  },
  {
    label: 'Edibles',
    href: '/shop?cat=edibles',
    blurb: 'Mushroom gummies and infused snacks',
    image: '/images/products/extreme-mushroom-gummies/0.webp',
  },
  {
    label: 'Apparel',
    href: '/shop?cat=apparel',
    blurb: 'Streetwear from independent designers',
    image: '/images/products/core-tees/0.webp',
  },
]

const TRUST = [
  {
    icon: Leaf,
    title: 'Michigan Grown',
    text: 'Small-batch THCa hemp flower sourced exclusively from local Michigan cultivators.',
  },
  {
    icon: FlaskConical,
    title: 'Lab Tested',
    text: 'Every strain is third-party tested with published potency. Farm Bill compliant under 0.3% delta-9.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    text: 'Discreet packaging with standard, express, and overnight options at checkout.',
  },
]

export default function HomePage() {
  const swig = byHandle('swig-emotional')

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-moss">
        <div className="animate-drift pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-bud/10 blur-3xl" />
        <div className="animate-drift-slow pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-haze/10 blur-3xl" />
        <div className="container-page grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
          <Stagger gap={0.09} onMount>
            <StaggerItem>
              <p className="eyebrow">Michigan-grown THCa · Hemp streetwear</p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="h-display mt-4 text-4xl leading-[1.05] text-bone sm:text-5xl lg:text-6xl">
                Smoke all things <span className="text-bud">Exotics.</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
                Premium small-batch THCa flower from Michigan&apos;s finest growers, fast-acting
                drinks and gummies, and streetwear built for the hemp community.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop?cat=flower" className="btn-primary">
                  Shop Flower <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/shop" className="btn-outline">
                  Shop Everything
                </Link>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-smoke">
                <span>
                  <strong className="font-display text-lg text-bone">{FLOWER_COUNT}</strong>{' '}
                  strains
                </span>
                <span>
                  <strong className="font-display text-lg text-bone">100%</strong> lab tested
                </span>
                <span>
                  <strong className="font-display text-lg text-bone">21+</strong> only
                </span>
              </div>
            </StaggerItem>
          </Stagger>

          <Stagger
            gap={0.12}
            onMount
            className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4"
          >
            {featuredFlower.slice(0, 4).map((p, i) => (
              <StaggerItem
                key={p.handle}
                className={i % 2 === 1 ? 'translate-y-6' : ''}
              >
                <Link
                  href={`/shop/${p.handle}`}
                  className={`card-soft card-lift relative block aspect-square overflow-hidden p-3 ${
                    i % 3 === 0 ? 'animate-float' : 'animate-float-late'
                  }`}
                >
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    priority={i < 2}
                    sizes="(min-width: 1024px) 220px, 45vw"
                    className="object-contain p-3"
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-moss bg-panel">
        <Stagger gap={0.1} className="container-page grid gap-8 py-12 sm:grid-cols-3">
          {TRUST.map((t) => (
            <StaggerItem key={t.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-moss bg-ink text-bud">
                <t.icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-bone">
                  {t.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-smoke">{t.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Featured flower */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Shop by flower</p>
              <h2 className="h-display mt-2 text-3xl text-bone sm:text-4xl">Fan favorites</h2>
            </div>
            <Link
              href="/shop?cat=flower"
              className="font-display text-sm font-bold uppercase tracking-wider text-bud hover:text-bud-glow"
            >
              View all {FLOWER_COUNT} strains →
            </Link>
          </div>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredFlower.map((p) => (
            <StaggerItem key={p.handle}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Category tiles */}
      <section className="border-y border-moss bg-panel">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Browse the lineup</p>
            <h2 className="h-display mt-2 text-3xl text-bone sm:text-4xl">Shop by category</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_TILES.map((tile) => (
              <StaggerItem key={tile.href}>
                <Link
                  href={tile.href}
                  className="card-soft card-lift group block overflow-hidden bg-ink"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
                    <Image
                      src={tile.image}
                      alt={tile.label}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-5 transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-bone group-hover:text-bud">
                      {tile.label}
                    </h3>
                    <p className="mt-1 text-sm text-smoke">{tile.blurb}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Swig band */}
      {swig && (
        <section className="container-page grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <Reveal direction="right" className="order-last lg:order-first">
            <div className="card-soft relative aspect-[4/3] overflow-hidden">
              <Image
                src={swig.images[0]}
                alt="Swig fast-acting THC drink shots"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-8"
              />
            </div>
          </Reveal>
          <Reveal direction="left">
            <p className="eyebrow">New · Drinks</p>
            <h2 className="h-display mt-2 text-3xl text-bone sm:text-4xl">
              Swig. Just add water.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-smoke">
              Our proprietary full-spectrum blend, crafted for focus and well-being. 2 oz
              fast-acting shots in six flavors, available in 100mg and 300mg strengths.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop/swig-emotional" className="btn-primary">
                Shop Swig 100mg
              </Link>
              <Link href="/shop/swig-euphoric" className="btn-outline">
                Shop Swig 300mg
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      {/* Apparel strip */}
      <section className="border-t border-moss bg-panel">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Shop by apparel</p>
                <h2 className="h-display mt-2 text-3xl text-bone sm:text-4xl">
                  Wear the lifestyle
                </h2>
              </div>
              <Link
                href="/shop?cat=apparel"
                className="font-display text-sm font-bold uppercase tracking-wider text-bud hover:text-bud-glow"
              >
                View all apparel →
              </Link>
            </div>
          </Reveal>
          <Stagger className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featuredGear.map((p) => (
              <StaggerItem key={p.handle}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About band */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">About Exotics</p>
            <h2 className="h-display mt-2 text-3xl text-bone sm:text-4xl">
              An unapologetic hemp lifestyle
            </h2>
            <p className="mt-5 leading-relaxed text-smoke">{site.about[0]}</p>
            <p className="mt-3 leading-relaxed text-smoke">{site.about[2]}</p>
            <Link href="/about" className="btn-outline mt-8">
              Our story
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
