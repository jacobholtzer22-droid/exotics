import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about THCa, legality, shipping, lab testing, payment, and returns at Exotics.',
}

const FAQS: { q: string; a: string[] }[] = [
  {
    q: 'What is THCa?',
    a: [
      'Delta-9 tetrahydrocannabinolic acid (THCa) is a non-intoxicating cannabinoid found in the raw, unheated cannabis plant. THCa is the precursor to delta-9 THC, the primary psychoactive compound commonly associated with cannabis. Unlike delta-9 THC, THCa does not produce intoxicating effects on its own.',
      'THCa becomes psychoactive through a process called decarboxylation — heating the flower through smoking, vaporization, or cooking removes a carboxyl group and converts THCa into delta-9 THC.',
      'THCa is abundant in the trichomes of raw cannabis flower, and along with other cannabinoids and terpenes it may contribute to the entourage effect — the idea that cannabis compounds work better together than in isolation.',
    ],
  },
  {
    q: 'What are the potential benefits of THCa flower?',
    a: [
      'Research is ongoing, but studies have explored THCa for anti-inflammatory, neuroprotective, and anti-nausea properties. Users also report appetite stimulation, muscle relaxation, and relief from everyday discomfort. Individual responses vary with dosage, tolerance, and the mix of cannabinoids and terpenes in each strain.',
      'Anyone considering THCa for therapeutic purposes should consult a healthcare professional, especially with pre-existing conditions or medications. These statements have not been evaluated by the FDA.',
    ],
  },
  {
    q: 'Is THCa flower legal?',
    a: [
      site.compliance.farmBill,
      `Laws vary by state. ${site.compliance.shippingNote} We currently do not ship THCa products to: ${site.restrictedStates.join(', ')}. It is your responsibility to know the laws in your jurisdiction.`,
    ],
  },
  {
    q: 'Is your flower lab tested?',
    a: [
      'Yes. Every strain is third-party lab tested, and we publish THC and delta-9 potency on every product. Certificates of analysis (COAs) are available — see our Lab Results page or contact support for a specific batch.',
    ],
  },
  {
    q: 'How does payment work?',
    a: [
      'You add products to your cart and submit an order request at checkout — no card is charged on this site. Our team then reaches out directly to confirm your order, arrange payment, and finalize shipping. It keeps things simple and secure.',
    ],
  },
  {
    q: 'How fast is shipping?',
    a: [
      'Standard shipping typically arrives in 5 to 7 business days. Express (2 to 3 business days) and overnight options are available — we will confirm cost and options when we finalize your order. All orders ship in discreet packaging.',
    ],
  },
  {
    q: 'What is your return policy?',
    a: [
      `We have a 48-hour return policy on all merchandise. Contact ${site.emails.returns} within 48 hours of receiving your package to start a return, then ship the item back with tracking within 3 days. Items must be unworn, undamaged, and in original packaging. See the full Refund Policy for details.`,
    ],
  },
  {
    q: 'Do I have to be 21 to order?',
    a: [site.compliance.ageNotice],
  },
]

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="Everything you need to know about THCa, ordering, shipping, and returns."
      />
      <section className="container-page max-w-3xl py-16">
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details key={faq.q} className="card-soft group overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base font-bold text-bone transition hover:text-bud [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="text-bud transition group-open:rotate-45">+</span>
              </summary>
              <div className="space-y-3 px-5 pb-5 text-sm leading-relaxed text-smoke">
                {faq.a.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
