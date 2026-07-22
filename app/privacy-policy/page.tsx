import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Exotics collects, uses, and protects your information.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Policies" title="Privacy Policy" />
      <section className="container-page max-w-3xl space-y-6 py-16 text-sm leading-relaxed text-smoke">
        <p>
          Exotics respects your privacy. This policy describes what we collect when you use
          this site and how we use it.
        </p>
        <div className="card-soft space-y-4 p-6">
          <div>
            <h2 className="font-display text-base font-bold text-bone">What we collect</h2>
            <p className="mt-1">
              When you place an order request, we collect the contact and shipping details
              you provide: name, email, phone number, and shipping address, along with the
              contents of your order.
            </p>
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-bone">How we use it</h2>
            <p className="mt-1">
              We use your information to confirm and fulfill your order, arrange payment and
              shipping, and respond to your questions. If you opt in to text messages, we
              may text you about your order. We do not sell your personal information.
            </p>
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-bone">Age requirement</h2>
            <p className="mt-1">{site.compliance.ageNotice}</p>
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-bone">Questions</h2>
            <p className="mt-1">
              Contact us at{' '}
              <a href={`mailto:${site.emails.support}`} className="text-bud hover:underline">
                {site.emails.support}
              </a>{' '}
              or {site.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
