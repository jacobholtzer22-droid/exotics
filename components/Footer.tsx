import Link from 'next/link'
import { site } from '@/lib/site'

const SHOP_LINKS = [
  { label: 'THCa Flower', href: '/shop?cat=flower' },
  { label: 'Drinks', href: '/shop?cat=drinks' },
  { label: 'Edibles', href: '/shop?cat=edibles' },
  { label: 'Apparel', href: '/shop?cat=apparel' },
  { label: 'Accessories', href: '/shop?cat=accessories' },
]

const INFO_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Lab Results', href: '/lab-results' },
  { label: 'Contact', href: '/contact' },
]

const LEGAL_LINKS = [
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

export default function Footer() {
  return (
    <footer className="border-t border-moss bg-ink-soft">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-extrabold uppercase tracking-widest text-bone">
            Exo<span className="text-bud">tics</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-smoke">
            {site.tagline}. Small-batch hemp grown in {site.location}, curated for quality
            and shipped fast.
          </p>
          <p className="mt-4 text-sm text-smoke">
            <a href={site.phoneHref} className="transition hover:text-bud">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.emails.support}`} className="transition hover:text-bud">
              {site.emails.support}
            </a>
          </p>
        </div>

        {[
          { title: 'Shop', links: SHOP_LINKS },
          { title: 'Info', links: INFO_LINKS },
          { title: 'Policies', links: LEGAL_LINKS },
        ].map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-smoke transition hover:text-bud">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-moss">
        <div className="container-page space-y-3 py-8 text-xs leading-relaxed text-smoke/80">
          <p>{site.compliance.farmBill}</p>
          <p>{site.compliance.fda}</p>
          <p>
            {site.compliance.ageNotice} {site.compliance.shippingNote} Restricted states:{' '}
            {site.restrictedStates.join(', ')}.
          </p>
          <p className="pt-2 text-smoke/60">
            © {new Date().getFullYear()} Exotics. All rights reserved. · Site by Align and
            Acquire
          </p>
        </div>
      </div>
    </footer>
  )
}
