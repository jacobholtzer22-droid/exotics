import type { Metadata } from 'next'
import { Mail, Phone, RotateCcw, Store } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Exotics. Call 800-519-0552 or email us for support, returns, wholesale, and vendor inquiries.',
}

const CHANNELS = [
  {
    icon: Phone,
    title: 'Call us',
    label: site.phone,
    href: site.phoneHref,
    note: 'For inquiries, events, and vendor information',
  },
  {
    icon: Mail,
    title: 'Support',
    label: site.emails.support,
    href: `mailto:${site.emails.support}`,
    note: 'Order questions and general support',
  },
  {
    icon: RotateCcw,
    title: 'Returns',
    label: site.emails.returns,
    href: `mailto:${site.emails.returns}`,
    note: '48-hour return window on all merchandise',
  },
  {
    icon: Store,
    title: 'Wholesale',
    label: site.emails.sales,
    href: `mailto:${site.emails.sales}`,
    note: 'Wholesale and purchasing',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We would love to hear from you"
        subtitle="Reach the right team the first time — support, returns, or wholesale."
      />
      <section className="container-page grid gap-4 py-16 sm:grid-cols-2">
        {CHANNELS.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="card-soft group flex items-start gap-4 p-6 transition hover:border-bud/60"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-moss bg-ink text-bud">
              <c.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="font-display text-sm font-bold uppercase tracking-wider text-smoke">
                {c.title}
              </span>
              <span className="mt-1 block font-display text-lg font-bold text-bone group-hover:text-bud">
                {c.label}
              </span>
              <span className="mt-1 block text-sm text-smoke">{c.note}</span>
            </span>
          </a>
        ))}
      </section>
    </>
  )
}
