import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: '48-hour return policy on all Exotics merchandise.',
}

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Policies" title="Refund Policy" />
      <section className="container-page max-w-3xl space-y-6 py-16 text-sm leading-relaxed text-smoke">
        <p>
          We want you to be fully satisfied with your merchandise purchase. We have a 48-hour
          return policy on all merchandise purchased on this site.
        </p>
        <ul className="card-soft list-inside list-disc space-y-3 p-6">
          <li>
            Contact{' '}
            <a href={`mailto:${site.emails.returns}`} className="text-bud hover:underline">
              {site.emails.returns}
            </a>{' '}
            within 48 hours of receiving your package to initiate a return. The day you
            receive the package is considered day 1.
          </li>
          <li>
            You then have 3 days to ship the item back to us using a postal service with
            tracking. Items not tracked and not received will not be the responsibility of
            Exotics.
          </li>
          <li>
            Items must be received unworn, free of damage, and include the original
            packaging.
          </li>
          <li>If we do not have a replacement, a store credit will be issued.</li>
        </ul>
        <p>
          We reserve the right to refuse a refund if, upon receiving the item, we determine
          that it has been damaged or altered. In that case, you will need to pay the
          shipping to have the items returned to you.
        </p>
        <p>Thank you for your help and cooperation. — Exotics</p>
      </section>
    </>
  )
}
